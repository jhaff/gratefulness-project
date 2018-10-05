//import mongoose
const mongoose = require('mongoose');
// let mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gratefulness-project', {useNewUrlParser: true});

const Nugget = mongoose.model('Nugget', {
  description: String,
  //location
});
module.exports = Nugget;
