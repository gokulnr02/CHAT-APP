const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose'); // Ensure 'mongoose' casing is correct
require('dotenv').config();
const fetch = require('node-fetch')

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } }); // Setup CORS for Socket.IO
const routes = require('./ROUTES/routes');
const port = process.env.PORT || 5002;

// Middleware setup
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

// MongoDB connection
mongoose.connect(process.env.Mango_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.error('DB connection error:', err));


const userList = []

io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  const primeId = socket.handshake.query.primeId;
  userList.push({ primeId, socket })
  console.log(`User connected: username=${username}, primeId=${primeId}`);


  socket.on('sendMessage', async (msg) => {
    const { chatId, senderId, reciverId, message } = msg;
    console.log(`Message received: chatId=${chatId}, senderId=${senderId}, reciverId=${reciverId}, message=${message}`);
    await sendMessage(chatId, senderId, message);
    const filterdUser = await Promise.all([userList.filter(x => x.primeId == reciverId), userList.filter(x => x.primeId == senderId)])
    await Promise.all(filterdUser.map(async user => sendUserMessage(user, chatId)))
  })


  socket.on('disconnect', () => {
    console.log(`User disconnected: username=${username}`);
    userList.filter(x => x.primeId == primeId ? userList.splice(userList.indexOf(x), 1) : [])
  });
});

// Server listener
server.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});

module.exports = server;


async function sendUserMessage(user, chatId) {

  console.log('Sending message to user:', user);
  const apiurl = `http://127.0.0.1:5002/chat/${chatId}`;
  const response = await fetch(apiurl, {
    method: 'GET',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  });

  if (user.length) {
    await Promise.all(user.map(async u => u.socket.emit('getMessages', JSON.stringify(response.json()))))
  }
}

async function sendMessage(chatId, senderId, message) {
  const apiurl = `http://127.0.0.1:5002/sendMessage`;
  const response = await fetch(apiurl, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, senderId, message }),
  });
  return response.json();
}