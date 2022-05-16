const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_CONNECTION_URL || ''

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose
