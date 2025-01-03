const express = require('express');
const cors = require('cors');
const Mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./ROUTES/routes')

const server = express();
const port = process.env.PORT || 5002;

server.use(cors('*'));
server.use(express.urlencoded({extended:true}))
server.use(express.json());
server.use('/',routes);

Mongoose.connect(process.env.MANGO_CLOUD_URI).then(()=>{console.log(`DB connected Successfully`)})

server.listen(port,()=>{
    console.log(`Server run successfully in ${port}`)
});

module.exports = server ;

