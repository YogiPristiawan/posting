class ClientError extends Error {
  httpCode = 400

  constructor(httpCode, msg) {
    super(msg)
    this.httpCode = httpCode
    this.name = 'ClientError'
  }
}

module.exports = ClientError
