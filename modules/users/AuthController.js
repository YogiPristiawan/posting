const registerService = require('./services/RegisterService')
const ClientError = require('../shared/entities/ClientError')

class AuthController {
  async register(req, res, next) {
    try {
      const response = await registerService(req.body)

      return res.status(200).json(response)
    } catch (err) {
      if (err instanceof ClientError) {
        return res.status(err.httpCode).json({
          message: err.message,
          data: null,
        })
      }
      next(err)
    }
  }
}

module.exports = AuthController
