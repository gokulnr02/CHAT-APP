const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*', allowedHeaders: ['Content-Type', 'Accept'] } });
const routes = require('./ROUTES/routes');
const port = process.env.PORT || 5002;


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);


mongoose.connect(process.env.Mango_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.error('DB connection error:', err));


const userList = []

io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  const primeId = socket.handshake.query.primeId;

  userList.push({ primeId, socket });
  console.log(`User connected: username=${username}, primeId=${primeId}`);

  socket.on('sendMessage', async (msg) => {
    try {
      const { chatId, senderId, reciverId, message } = msg;
      await sendMessage(chatId, senderId, message);
      const filteredUsers = userList.filter(user => [reciverId, senderId].includes(user.primeId));
      await Promise.all(filteredUsers.map(user => sendUserMessage(user, user.primeId)));
    } catch (err) {
      console.error('Error in sendMessage handler:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: username=${username}`);
    const index = userList.findIndex(user => user.primeId === primeId);
    if (index !== -1) userList.splice(index, 1);
  });
});

server.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});

module.exports = server;


async function sendUserMessage(user, primeId) {
  try {
    const apiurl = `http://127.0.0.1:5002/chat/${primeId}`;
    const response = await fetch(apiurl, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    user.socket.emit('getMessages', data);
    console.log('Message sent successfully');
  } catch (err) {
    console.error('Error in sendUserMessage:', err.message);
  }
}

async function sendMessage(chatId, senderId, message) {
  try {
    const apiurl = `http://127.0.0.1:5002/sendMessage`;
    const response = await fetch(apiurl, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, senderId, message }),
    });

    return await response.json();
  } catch (err) {
    console.error('Error in sendMessage:', err.message);
    throw err;
  }
}
