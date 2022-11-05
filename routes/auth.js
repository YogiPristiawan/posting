const express = require('express')
const AuthController = require('../modules/users/AuthController')

const router = express.Router()
const authController = new AuthController()

router.post('/register', async (req, res, next) => {
  await authController.register(req, res, next)
})

module.exports = router
