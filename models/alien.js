const mongoose = require('mongoose')
alienSchema = new mongoose.Schema({
     first_name: {
          type: String
     },
     last_name: {
          type: String
     },
     contact: {
          type: Number
     },

     Username: {
          type: String,
          required: true,
          unique: [true, "email already exists"]
     },
     password: {
          type: String,
          required: true,
        unique: [true, "email already exists"]
     }
})
const mongomodel = mongoose.model('Alien', alienSchema)

module.exports = mongomodel
