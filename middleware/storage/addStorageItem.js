const requireOption = require('../common/requireOption');
const hasAllOptions = require('../common/hasAllOptions');
const moment = require('moment');

/**
 * Ads item to a storage of a bunker
 * IMPORTANT: It only saves tthe storage item to database, saving the bunker model needs to be called in next middleware, after updateting the statisticks
 */
module.exports = function (objectrepository) {


    const StorageItemModel = requireOption(objectrepository, 'StorageItemModel');
    const FoodModel = requireOption(objectrepository, 'FoodModel');

    return function (req, res, next) {


        res.locals.today = moment().format();

        if(!hasAllOptions(req.body,['type','dop','quantity'])) return next();
       
        if (req.body.type === ''   ||
        req.body.dop === '' ||
        req.body.quantity === '' ){
        res.locals.warning = 'Töltsd ki az összes mezőt';
        return next();
    }

        let newItem = new StorageItemModel({
            quantity: req.body.quantity
        });

        FoodModel.findOne({_id:req.body.type},(err,food) =>{
            if(err) return next(err);

            if(!food) return next('No food with id: '+ req.body.type);

            let expirationDate = moment(req.body.dop);
            expirationDate.add(food.lasts,'days');

            newItem.type = food.name;
            newItem.expirationDate = expirationDate.format();
            newItem.sumCalories = newItem.quantity * food.kcal;

            res.locals.storageItem = newItem;
            res.locals.bunker.stock.push(newItem);

            return newItem.save(next);
        });
    };
  };