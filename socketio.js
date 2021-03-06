const io = require('./server');

const startSocketIO = () => {
  io.on('connection', (socket) => {
    socket.on('new-user', ({ name, roomList }) => {
      console.log(name, roomList);
      socket.broadcast.emit('user-connected', name);
      roomList.forEach((roomId) => {
        socket
          .join(roomId)
          .emit('join-chatroom', 'A user has joined a room ' + roomId);
      });
    });

    socket.on('chat-message', ({ message, roomId, userId, username }) => {
      console.log('[socketio.js]', message, roomId);
      socket
        .to(roomId)
        .emit('chat-message', { message, roomId, userId, username });
    });

    socket.on('add-chatroom-user', (data) => {
      socket.broadcast.emit('join-chatroom-user', data);
    });

    socket.on('disconnect', () => {});
  });
};

module.exports = startSocketIO;
