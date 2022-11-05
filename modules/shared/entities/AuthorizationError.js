const ClientError = require('./ClientError')

class AuthorizationError extends ClientError {
  constructor(msg) {
    super(msg)
    this.name = 'AuthorizationError.'
  }
}

module.exports = AuthorizationError
