const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    user_avatar: { type: String, required: true, default: 'default.png' },
    token: { type: String, required: true, default: 'undefined' },
    joined_rooms: [{ type: String }]
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model('User', userSchema);