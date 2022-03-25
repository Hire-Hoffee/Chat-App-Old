const mongoose = require('mongoose');

async function dbConnection(mongo) {
  try {
    await mongoose.connect(mongo);
    console.log('db connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;