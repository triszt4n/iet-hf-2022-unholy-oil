const mongoose = require('mongoose')

const { MONGODB_USER: user, MONGODB_PASSWORD: pw } = process.env

const connectionString = `mongodb://${user}:${pw}@mongodb:27017`

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error('CATCHED MONGOOSE', err))

module.exports = mongoose
