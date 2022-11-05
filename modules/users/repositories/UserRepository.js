const mongo = require('../../shared/databases/MongoDB')
const UserModel = require('../../shared/databases/Schemas/Users')
const BadRequestError = require('../../shared/entities/BadRequestError')

const create = async (data) => {
  await mongo.connect()

  // first, check if user exists
  let user = await UserModel.findOne({ username: data.username })
  if (user) {
    throw new BadRequestError('username already exists')
  }

  user = new UserModel({
    username: data.username,
    password: data.password,
  })

  const savedUser = await user.save()
  return savedUser
}

module.exports = {
  create,
}
