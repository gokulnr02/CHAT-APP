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

Mongoose.connect('mongodb+srv://gokulnr02:qMAxfL1aQsp8y1q2@cluster0.b8rsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log(`DB connected Successfully`)})

server.listen(port,()=>{
    console.log(`Server run successfully in ${port}`)
});

module.exports = server ;

