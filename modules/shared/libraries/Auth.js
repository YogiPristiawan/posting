const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AuthorizationError = require('../entities/AuthorizationError')

class Auth {
  generateToken(data) {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (3600 * 24),
      user_id: data.user_id,
    }, process.env.JWT_SECRET)
  }

  decodeToken(authorization) {
    const token = authorization.split(' ')
    if (token.length < 2) {
      throw new AuthorizationError('required a Bearer token')
    }
    try {
      const decoded = jwt.verify(token[1], process.env.JWT_SECRET)

      return decoded
    } catch (err) {
      throw new AuthorizationError('token invalid')
    }
  }

  async encryptPassword(plain) {
    const hash = await bcrypt.hash(plain, 10)
    return hash
  }

  async comparePassword(plain, hash) {
    const match = await bcrypt.compare(plain, hash)
    return match
  }
}

module.exports = new Auth()
