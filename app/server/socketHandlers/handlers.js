const Messages = require('../models/messageSchema');
const Users = require('../models/userSchema');

module.exports = {
  saveMessage: async (msg) => {
    try {
      const whoCreated = await Users.findOne({user_name: msg.room.who_created});
      const sendTo = await Users.findOne({user_name: msg.room.send_to});

      msg.room.who_created = whoCreated._id;
      msg.room.send_to = sendTo._id;
      msg.room.who_created_avatar = whoCreated._id;
      
      await Messages.create(msg);
    } catch (error) {
      console.log(error);
    }
  }
}