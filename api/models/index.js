const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: {
    index: {
      unique: true
    },
    type: String,
    min: 6,
    max: 12,
    required: true
  },
  password: {
    type: String,
    min: 8,
    required: true
  }
})

let barSchema = new mongoose.Schema({
  title: String,
  location: String,
  going: [String]
})

let userModel = mongoose.model('User', userSchema)
let barModel = mongoose.model('Bar', barSchema)

module.exports = {
  User: userModel,
  Bar: barModel
}
