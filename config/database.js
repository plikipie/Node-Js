const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/note_api';
mongoose.connect(mongoDB);

module.exports=mongoose;