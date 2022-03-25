const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message_data: { type: String, required: true },
    room: {
      who_created: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
      who_created_avatar: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
      send_to: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
      room_name: { type: String, required: true },
    },
    time_created: { type: Date, required: true, default: Date.now }
  },
  {
    timestamps: false,
    collection: "messages",
  }
);

module.exports = mongoose.model('Message', messageSchema);