const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(
    'mongodb://localhost/db_cocktails',
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (err) return console.log(err);
      console.log('MongoDB connected');
    }
  );
};

module.exports = connectDB;
