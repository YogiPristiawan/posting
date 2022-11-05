const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
}, {
  collection: 'users',
})

module.exports = mongoose.model('user', userSchema)
