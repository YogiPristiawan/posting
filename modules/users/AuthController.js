const registerService = require('./services/RegisterService')
const loginService = require('./services/LoginService')
const ClientError = require('../shared/entities/ClientError')
const BaseResponse = require('../shared/entities/BaseResponse')

class AuthController {
  async register(req, res, next) {
    try {
      const response = await registerService(req.body)

      return res.status(200).json(response)
    } catch (err) {
      if (err instanceof ClientError) {
        const response = new BaseResponse()
        response.setMessage(err.message)

        return res.status(err.httpCode).json(response)
      }
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const response = await loginService(req.body)

      return res.status(200).json(response)
    } catch (err) {
      if (err instanceof ClientError) {
        const response = new BaseResponse()
        response.setMessage(err.message)

        return res.status(err.httpCode).json(response)
      }
      next(err)
    }
  }
}

module.exports = AuthController
