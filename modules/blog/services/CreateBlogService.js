const Validator = require('validatorjs')
const BadRequestError = require('../../shared/entities/BadRequestError')
const BaseResponse = require('../../shared/entities/BaseResponse')
const blogRepository = require('../repositories/BlogRepository')

module.exports = async (userId, body) => {
  const response = new BaseResponse()

  // validate request body
  const validation = new Validator(body, {
    title: 'required|string|max:100',
    body: 'required|string|max:500',
  })

  if (!validation.check()) {
    switch (true) {
      case validation.errors.has('title'):
        throw new BadRequestError(validation.errors.first('title'))
      case validation.errors.has('body'):
        throw new BadRequestError(validation.errors.first('body'))
      default:
        throw new BadRequestError('request body validation failed')
    }
  }

  const blog = await blogRepository.createBlog({
    user_id: userId,
    title: body.title,
    body: body.body,
  })

  response.setMessage('blog created')
  response.setData({
    id: blog._id.toString(),
    title: blog.title,
    body: blog.body,
  })

  return response
}
