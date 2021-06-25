const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/data'
const app = express()

const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true }, (err) => {
    if (err) { console.log(err) } else {
        console.log('conected')
    }
})

const con = mongoose.connection
con.on('open', () => {
    console.log('db conected...')
})

const alienRouter = require('./routes/aliens')
app.use('/', alienRouter)

app.listen(4000, () => {
    console.log('server started');
})
mongoose.model('Alien', alienSchema)
