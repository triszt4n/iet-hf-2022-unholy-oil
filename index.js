const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const moment = require('moment')
require('dotenv').config()

moment.defaultFormat = 'YYYY-MM-DD'

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(
  session({
    secret: 'topscecret123456',
    resave: false,
    name: 'sessionId',
    saveUninitialized: true,
    cookie: {},
  })
)

//routing
require('./routes')(app)

//404route
app.use((req, res) => {
  return res.render('notfound')
})

//error-handle
app.use((err, req, res) => {
  console.log('error: ', err)
  return res.render('notfound')
})

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Server listening on ${port}`)
})
