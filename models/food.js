const Schema = require('mongoose').Schema
const db = require('../config/db')

const Food = db.model('Food', {
  name: String,
  kcal: Number,
  lasts: Number,
})

module.exports = Food
