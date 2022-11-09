const Validator = require('validatorjs')
const AuthorizationError = require('../../shared/entities/AuthorizationError')
const BadRequestError = require('../../shared/entities/BadRequestError')
const BaseResponse = require('../../shared/entities/BaseResponse')
const auth = require('../../shared/libraries/Auth')
const userRepository = require('../repositories/UserRepository')

module.exports = async (body) => {
  const response = new BaseResponse()

  const validation = new Validator(body, {
    username: 'required|string|max:20',
    password: 'required|string',
  })

  // validate request body
  if (!validation.check()) {
    switch (true) {
      case validation.errors.has('username'):
        throw new BadRequestError(validation.errors.first('username'))
      case validation.errors.has('password'):
        throw new BadRequestError(validation.errors.first('password'))
      default:
        throw new BadRequestError('request body validation failed')
    }
  }

  // get user by given username
  const user = await userRepository.getByUsername(body.username)
  if (!user) {
    throw new AuthorizationError('username not registered')
  }

  // compare password
  if (!(await auth.comparePassword(body.password, user.password))) {
    throw new AuthorizationError('password not match')
  }

  // generate access token
  const accessToken = auth.generateToken({
    username: user.username,
    user_id: user._id.toString(),
  })

  response.setMessage('login success')
  response.setData({
    access_token: accessToken,
  })
  return response
}
