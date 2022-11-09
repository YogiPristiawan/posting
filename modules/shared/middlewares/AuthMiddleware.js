const BaseResponse = require('../entities/BaseResponse')
const ClientError = require('../entities/ClientError')
const auth = require('../libraries/Auth')

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({
      message: 'token required',
    })
    return
  }

  // validate jwt
  try {
    auth.decodeToken(authorization)
    next()
  } catch (err) {
    if (err instanceof ClientError) {
      const response = new BaseResponse()
      response.setMessage(err.message)

      res.status(err.httpCode).json(response)
      return
    }
    next(err)
  }
}
