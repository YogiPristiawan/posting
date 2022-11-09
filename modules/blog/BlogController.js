const BaseResponse = require('../shared/entities/BaseResponse')
const ClientError = require('../shared/entities/ClientError')
const createBlogService = require('./services/CreateBlogService')
const findBlogService = require('./services/FindBlogService')
const auth = require('../shared/libraries/Auth')

class BlogController {
  async createPosting(req, res, next) {
    try {
      const decoded = auth.decodeToken(req.headers.authorization)
      const response = await createBlogService(decoded.user_id, req.body)

      return res.status(201).json(response)
    } catch (err) {
      if (err instanceof ClientError) {
        const response = new BaseResponse()
        response.setMessage(err.message)

        return res.status(err.httpCode).json(response)
      }
      next(err)
    }
  }

  async findPosting(req, res, next) {
    try {
      const response = await findBlogService()

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

module.exports = new BlogController()
