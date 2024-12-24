const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const Register = async (req,res)=>{
    try {
        
        const {name , email , password} = req.body;
        const avatarPath = req.file.path;

        //hashPassword
        const hashPassword = await bcrypt.hash(password, 10);

        //Store data in mongoDB 
        const newUser = new User(
            { email, name, password: hashPassword, avatar: avatarPath }
        )

        // Save the user to MongoDB
        await newUser.save();

        
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        res.status(500).json({ error: 'Error Register in: ' + error.message });
    }
}


const Login = async (req,res)=>{
    try {
        const { email , password} = req.body;

        // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            //update user status
            user.isOnline = true;
            await user.save();
            
            
            
            // Generate JWT
            const token = jwt.sign( {userId: user._id,
                                    name: user.name,
                                    email: user.email,
                                    avatar: user.avatar, // Adjust path as needed
                                    isOnline: user.isOnline,
                                    },process.env.JWT_SECRET, { expiresIn: '1h' });
            
             // Send JWT in HttpOnly cookie
                return res.cookie('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production', // Use Secure flag in production
                            maxAge: 3600000, // 1 hour
                            sameSite: 'Strict',
                        }).status(200).json({ message: 'Login successful!'});
            
                

    } catch (error) {
            return res.status(500).json({ error: 'Error logging in: ' + error.message });
    }
}

const Me = async (req,res)=>{

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error: 'Not authenticated'});
    }

    try {
        const user = jwt.verify(token,process.env.JWT_SECRET);
        return res.status(200).json({user});
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' , error:error.message });;
    }
}

const Logout = async (req,res)=>{
    const token = req.cookies.token;

    if (token) {
        try {
            const { userId } = jwt.verify(token, 'K1ZibR13wTExt9zK');

            // Update user status to offline
            const user = await User.findById(userId);
            if (user) {
                user.isOnline = false;
                await user.save();
            }
        } catch (error) {
            console.log('Error during logout:', error.message);
        }
    }

    res.clearCookie('token').status(200).json({ message: 'Logged out!' });
    
}
module.exports = {
    Register,
    Login,
    Logout,
    Me
}