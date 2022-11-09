const BaseResponse = require('../../shared/entities/BaseResponse')
const BlogRepository = require('../repositories/BlogRepository')

module.exports = async () => {
  const response = new BaseResponse()

  const blogs = await BlogRepository.findByUserId()

  response.setMessage('success')
  response.setData(blogs)
  return response
}
