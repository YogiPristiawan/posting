class BaseResponse {
  #message

  #data = null

  setMessage(msg) {
    this.message = msg
  }

  getMessage() {
    return this.message
  }

  setData(data) {
    this.data = data
  }

  getData() {
    return this.data
  }
}

module.exports = BaseResponse
