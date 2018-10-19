//import mongoose
const mongoose = require('mongoose');
// let mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const Nugget = mongoose.model('Nugget', {
  description: {
      type: String
  },
  location: pointSchema
});

module.exports = Nugget;
