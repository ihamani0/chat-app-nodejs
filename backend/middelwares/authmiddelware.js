const jwt = require("jsonwebtoken");

const User = require("../models/userModel")

const authMiddleware = async (req,res,next)=>{

    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({error: 'Not authenticated'});
    }
    try {
        let decod = jwt.verify(token , process.env.JWT_SECRET);
        
        const user = await User.findById(decod.userId)

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach the user object to the request
        req.user = user;
        next();


    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({ message: 'Error in server' });
    }

}
module.exports = authMiddleware;