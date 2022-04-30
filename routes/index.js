
const BunkerModel = require('../models/bunker');
const StorageItemModel = require('../models/storageItem')
const FoodModel = require('../models/food');

//szimplán összefogja a többi routot, hogy az express applikációban szépen egy sorba be lehessen importálni
module.exports = function (app) {


    var objectRepository = {
        BunkerModel: BunkerModel,
        StorageItemModel: StorageItemModel,
        FoodModel: FoodModel
    };

    require('./common')(app,objectRepository);
    require('./bunker')(app,objectRepository);
    require('./storage')(app,objectRepository);
    require('./foods')(app,objectRepository);




}
