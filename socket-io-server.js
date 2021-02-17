const SocketMethods = require('./src/app/models/socket-methods-export').module
const express = require('express')
// const cors = require('cors')
const app = express()
//allow OPTIONS on all resources
// app.use(cors({
//   origin: 'http://localhost:4200'
// }));
const server = app.listen(3000)

app.get('/', (req, res) => {

  res.send(`Hi! Server is listening on port ${3000}`)
});

// register socket with enabling cors
const io = require('socket.io')(server, {
  cors: {
    // allowed origin
    origin: "http://localhost:4200",
    // to any method
    methods:"*"
  }
});

// endpoints
io.on('connection', (socket) => {
  socket.on(SocketMethods.ADD_OR_UPDATE_USER, (data) => {
    console.log('an user is created: ', data)
    socket.broadcast.emit(SocketMethods.USER_ADDED_OR_UPDATED, data);
  });
  socket.on(SocketMethods.DELETE_USER, (id) => {
    console.log('an user is deleted: ',id)
    socket.broadcast.emit(SocketMethods.USER_DELETED, id);
  });

  socket.on(SocketMethods.SYNC_USERS, (payload) => {
    console.log('user synced: ',payload)
    socket.broadcast.emit(SocketMethods.USER_SYNCED, payload);
  });
  socket.on('disconnect', () => {
  });
});
