const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const config = require('./utils/config')
const mongoose = require('mongoose')
const { info, error } = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

const mongoURI = config.MONGO_URI

mongoose
  .connect(mongoURI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((err) => {
    error('error connecting to MongoDB:', error.message)
  })

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.use('/api/users', require('./controllers/users'))
app.use('/api/login', require('./controllers/login'))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
