const mongoose = require('mongoose')

class MongoDB {
  #conn = null

  async connect() {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(process.env.MONGODB_CONN_URL, {
        maxPoolSize: 150,
        minPoolSize: 10,
      })
    }

    this.conn = mongoose.connection

    return this
  }

  async close() {
    if (this.conn) {
      await this.conn.close()
    }
  }
}

module.exports = new MongoDB()
