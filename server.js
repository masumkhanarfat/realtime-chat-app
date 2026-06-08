const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the frontend files from the "public" directory
app.use(express.static('public'));

// Handle real-time connections
io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);
  
  // Listen for incoming messages from a user
  socket.on('chat message', (data) => {
    // Broadcast the message to ALL connected users
    io.emit('chat message', data);
  });
  
  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });
});

// Use the port assigned by Render/hosting platforms, or default to 3000 locally
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});