const mongoose = require('mongoose')

const connectionString = process.env.MONGO_CONNECTION_URL || ''

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose
