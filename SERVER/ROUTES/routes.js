const express = require('express');
const route = express.Router();
const {authenticateToken}= require('../auth')

const userRegister = require('../CONTROLLERS/userRegistery')

route.post('/createUser',userRegister.userSave);
route.get('/users/:id',userRegister.usersList);
route.post('/login',userRegister.login);
route.post('/Adduser',userRegister.Adduser)

module.exports =route;