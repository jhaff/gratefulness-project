const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gratefulness-project', { useMongoClient: true });
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
  nuggetId: { type: String, required: true },
  author: String,
  content: String,
});

module.exports = Comment;
