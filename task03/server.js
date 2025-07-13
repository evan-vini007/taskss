const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let documentContent = "";  // In-memory document
let users = {};  // Track connected users

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  users[socket.id] = `User-${socket.id.slice(0, 4)}`;

  // Notify all clients about new user list
  io.emit('userList', Object.values(users));

  // Send current document to new user
  socket.emit('loadDocument', documentContent);

  socket.on('edit', (data) => {
    documentContent = data;  // Update the master copy
    socket.broadcast.emit('update', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];
    io.emit('userList', Object.values(users));
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
