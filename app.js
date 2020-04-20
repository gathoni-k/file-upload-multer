const express = require('express')
const app = express()

const routes = require('./routes/index')

app.use(express.urlencoded({extended: true}))
app.use('/api', routes)

module.exports = app