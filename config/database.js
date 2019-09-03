const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/note_api';
mongoose.connect(mongoDB);

//
if (process.env.NODE_ENV === 'test') {
    mongoose.connect(mongoDBTest);
  } else {
    mongoose.connect(mongoDB);
  }
  
  module.exports = mongoose;