const mongoose = require('mongoose')

const connectionString =
  process.env.MONGO_CONNECTION_URL ||
  `mongodb://localhost:27017/bunkermgr?authSource=admin`

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose
