const express = require('express');
const userController = require('../controllers/userController');
const createMulterStorage = require('../config/storage');

const route = express.Router();
const uploadAvatar = createMulterStorage('avatar' , ['image/jpeg' , 'image/png'] , 2);

//method index


//method create


//method delete

//method regiseter User 
route.post('/register', uploadAvatar.single('avatar'), userController.Register);
//method login User 
route.post('/login', userController.Login);
route.get('/me', userController.Me);
route.post('/logout', userController.Logout);



module.exports = route;