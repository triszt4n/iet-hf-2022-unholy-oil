const mongoose = require('mongoose')

const connectionString = ''

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose
