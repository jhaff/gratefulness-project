const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
  nuggetId: { type: Schema.Types.ObjectId, ref: 'Nugget' },
  author: String,
  content: String,
});

module.exports = Comment;
