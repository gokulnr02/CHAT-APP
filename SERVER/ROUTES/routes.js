const express = require('express');
const route = express.Router();
const {authenticateToken}= require('../auth')

const userRegister = require('../CONTROLLERS/userRegistery')

route.post('/createUser',userRegister.userSave);
route.get('/users/:id',userRegister.usersList);
route.get('/userDetails/:id',userRegister.userDetails)
route.post('/login',userRegister.login);
route.post('/Adduser',userRegister.Adduser)
route.post('/fav',userRegister.Fav);
route.post('/sendMessage',userRegister.sendMessage)
route.get('/messages/:chatId',userRegister.Messages)
route.get('/chat/:primaryUser',userRegister.chat)


module.exports =route;