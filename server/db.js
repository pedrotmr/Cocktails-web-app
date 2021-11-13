const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) return console.log(`Sorry, something went wrong! ${err}`);
    console.log('MongoDB connected');
  });
};

module.exports = connectDB;
