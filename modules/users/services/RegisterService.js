const Validator = require('validatorjs')
const BaseResponse = require('../../shared/entities/BaseResponse')
const userRepository = require('../repositories/UserRepository')
const BadRequestError = require('../../shared/entities/BadRequestError')
const auth = require('../../shared/libraries/Auth')

module.exports = async (body) => {
  // validate request
  const validation = new Validator(body, {
    username: 'required|string|max:20',
    password: 'required',
  })

  const response = new BaseResponse()

  if (!validation.check()) {
    switch (true) {
      case validation.errors.has('username'):
        throw new BadRequestError(validation.errors.first('username'))
      case validation.errors.has('password'):
        throw new BadRequestError(validation.errors.first('password'))
    }
  }

  // store data into db
  const user = await userRepository.create({
    username: body.username,
    password: await auth.encryptPassword(body.password),
  })

  // generate jwt
  const jwt = auth.generateToken({
    username: user.username,
  })

  response.setMessage('user registered')
  response.setData({
    access_token: jwt,
  })
  return response
}
