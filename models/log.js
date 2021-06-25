const mongoose = require('mongoose')
loginSchema = new mongoose.Schema({
     logname: {
          type: String,
          required: true
     },
     pass: {
          type: String,
          required: true
     }
})
const model = mongoose.model('login', loginSchema)

module.exports = model
