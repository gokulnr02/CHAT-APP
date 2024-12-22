const express = require('express');
const route = express.Router();
const {authenticateToken}= require('../auth')

const userRegister = require('../CONTROLLERS/userRegistery')

route.post('/userRegister',authenticateToken,userRegister.userSave);
route.post('/login',userRegister.login)

module.exports =route;