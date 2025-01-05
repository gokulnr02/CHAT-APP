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


// Socket.IO setup
io.on('connection', (socket) => {
    const username = socket.handshake.query.username;
    const primeId = socket.handshake.query.primeId;
    console.log(`User connected: username=${username}, primeId=${primeId}`);
  
    let lastMessage = null; // Track the last sent message
  
    const intervalId = setInterval(async () => {
      try {
        const apiurl = `http://127.0.0.1:5002/chat/${primeId}`;
        const response = await fetch(apiurl);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
  
        // Compare the new message with the last sent message
        const newMessage = JSON.stringify(data);
        if (newMessage !== lastMessage) {
          io.emit('chat message', newMessage); // Send only if the message has changed
          lastMessage = newMessage; // Update the last message
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error.message);
      }
    }, 3000);
  
    socket.on('disconnect', () => {
      console.log(`User disconnected: username=${username}`);
      clearInterval(intervalId); // Clear the interval when the socket disconnects
    });
  });

// Server listener
server.listen(port, () => {
    console.log(`Server running successfully on port ${port}`);
});

module.exports = server;
