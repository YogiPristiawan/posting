const ClientError = require('./ClientError')

class AuthorizationError extends ClientError {
  constructor(msg) {
    super(403, msg)
    this.name = 'AuthorizationError.'
  }
}

module.exports = AuthorizationError
