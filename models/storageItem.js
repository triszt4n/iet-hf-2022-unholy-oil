const Schema = require('mongoose').Schema;
const db = require('../config/db');

const StorageItem = db.model('StorageItem', {
    type: String,
    quantity: Number,
    expirationDate: String,
    sumCalories: Number
});

module.exports = StorageItem;