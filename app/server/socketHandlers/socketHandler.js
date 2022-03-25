const User = require('../models/userSchema');

const handlers = require('./handlers');

const onConnection = (socket) => {
  console.log(`- connected: ${socket.id} -`);

  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_msg:client', async (data, room) => {
    handlers.saveMessage(data);

    const user = await User.findOne({ user_name: data.room.who_created_avatar });
    data.room.who_created_avatar = user.user_avatar;
  
    socket.to(room).emit('send_msg:server', data);
  });

  socket.on('disconnect', () => console.log(`- disconnected: ${socket.id} -`));
}

module.exports = onConnection;