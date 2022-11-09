const createError = require('http-errors')
const express = require('express')
const path = require('path')

const authMiddleware = require('./modules/shared/middlewares/AuthMiddleware')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const blogRouter = require('./routes/blog')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/blogs', authMiddleware, blogRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    message: 'internal server error',
  })
})

module.exports = app
