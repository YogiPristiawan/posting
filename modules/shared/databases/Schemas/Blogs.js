const mongoose = require('mongoose')

const { Schema } = mongoose

const BlogSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user._id',
  },
  title: String,
  body: String,
}, {
  collection: 'blogs',
})

module.exports = mongoose.model('blogs', BlogSchema)
