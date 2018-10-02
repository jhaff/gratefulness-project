//import mongoose
const mongoose = require('mongoose');

const GratefulNugget = mongoose.model('GratefulNugget', {
  description: String,
  //location
});
module.exports = GratefulNugget;
