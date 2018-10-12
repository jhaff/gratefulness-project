//import mongoose
const mongoose = require('mongoose');
// let mongoose = require('mongoose')

const Nugget = mongoose.model('Nugget', {
  description: String,
  //location
});

module.exports = Nugget;
