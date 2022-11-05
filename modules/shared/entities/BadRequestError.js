const ClientError = require('./ClientError')

class BadRequestError extends ClientError {
  constructor(msg) {
    super(400, msg)
    this.name = 'BadRequestError'
  }
}

module.exports = BadRequestError
