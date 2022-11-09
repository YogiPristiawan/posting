const express = require('express')

const router = express.Router()
const blogController = require('../modules/blog/BlogController')

router.post('/', async (req, res, next) => {
  await blogController.createPosting(req, res, next)
})

router.get('/', async (req, res, next) => {
  await blogController.findPosting(req, res, next)
})

module.exports = router
