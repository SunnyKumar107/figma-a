const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')
    request.token = token[1]
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY)
  const user = await User.findById(decodedToken.id)
  request.user = user

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).send({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(400).send({ error: 'token expired' })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor
}
