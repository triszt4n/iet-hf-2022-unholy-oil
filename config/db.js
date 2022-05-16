const mongoose = require('mongoose')

const { MONGODB_USER: user, MONGODB_PASSWORD: pw } = process.env

const connectionString = `mongodb://${user}:${pw}@localhost:27017`

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose
