const Message = require('../models/messageSchema');
const User = require('../models/userSchema');

module.exports = {
  chatRoom: async (req, res, next) => {
    try {
      const userName = req.cookies.user_name;
      const roomWith = req.query.room_with;
      const chatRoom = [userName, roomWith].sort().join('_');
      
      const usersList = await User.find({ 'joined_rooms': { $regex: new RegExp(userName) } });
      const msgs = await Message.find({ 'room.room_name': chatRoom })
        .populate('room.who_created', 'user_name')
        .populate('room.who_created_avatar', 'user_avatar')
        .populate('room.send_to', 'user_name')
        .sort('time_created');

      const dates = [];
      for (let i = 0; i < msgs.length; i++) {
        dates.push(msgs[i].time_created.toLocaleTimeString('ru-RU', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}))
      }

      const users = await User.find({ user_name: [userName, roomWith] });
      
      res.render('chatPage', { msgs, users, usersList, dates, user: req.cookies?.user_name });
    } catch (error) {
      next(error);
    }
  },
  users: async (req, res, next) => {
    try {
      const usersList = await User.find({});
      res.render('users_list', { usersList, user: req.cookies?.user_name })
    } catch (error) {
      next(error);
    }
  },
  addRoom: async (req, res, next) => {
    try {
      const roomWith = req.params.room_with;
      const userName = req.cookies.user_name;
      const chatRoom = [userName, roomWith].sort().join('_');

      const user = await User.findOne({ user_name: userName });

      if (user.joined_rooms.includes(chatRoom)) {
        return res.redirect(`/main?room_with=${roomWith}`);
      }

      await User.findOneAndUpdate({ user_name: userName }, { $push: { joined_rooms: chatRoom } });
      await User.findOneAndUpdate({ user_name: roomWith }, { $push: { joined_rooms: chatRoom } });

      res.redirect(`/main?room_with=${roomWith}`);
    } catch (error) {
      next(error);
    }
  },
  findUser: async (req, res, next) => {
    try {
      const user_name = req.query.user_name;
      const user = await User.find({ user_name: user_name });
      res.render('searchUsers', { user });
    } catch (error) {
      next(error)
    }
  }
}
