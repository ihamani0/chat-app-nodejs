const multer = require('multer');
const path =require('path');

// Create 'uploads' folder if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const createMulterStorag = (storageFolderName , allowedTypes = null , limite = 1) =>{
    
    //join path togther parnetDir/uploads/storageFolderName
    const uploadFile = path.join(__dirname, '..', 'uploads',  storageFolderName);
    
    
    if (!fs.existsSync(uploadFile)) {
        fs.mkdirSync(uploadFile, { recursive: true });
        //recursive: true => create all the neccessary parnet dir to this folder if does not exists
    }

    //stirage file    
    const storage = multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null , uploadFile)
        },
        filename :(req,file,cb) =>{
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
        }
    });

    //filter mimitype of file and fileSize
    const fileFilter = (req, file, cb) => {
        
        if(allowedTypes){

            if (!allowedTypes.includes(file.mimetype)) {
                cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`), false);
            } 
        }
        cb(null, true);
    }

    //limite 

    // Limit file size
    const limits = { fileSize: limite * 1024 * 1024 }; // Convert MB to bytes

    return  multer({ storage , fileFilter , limits});

}

module.exports = createMulterStorag;








