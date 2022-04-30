const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Bunker = db.model('Bunker', {
    name: String,
    adress: String,
    capacity: Number,
    stock_dur: Number,
    nextExpDate: String,
    stock:[{
            type: Schema.Types.ObjectId,
            ref: 'StorageItem'
        }]
});

module.exports = Bunker;