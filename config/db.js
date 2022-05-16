const mongoose = require('mongoose')

const { MONGODB_USER: user, MONGODB_PASSWORD: pw } = process.env

const connectionString = `mongodb://${user}:${pw}@0.0.0.0:27017/bunkermgr?authSource=admin`

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose
