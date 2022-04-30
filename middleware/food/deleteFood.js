const requireOption = require('../common/requireOption');
/**
 * Deletes food from database, using foodid param
 */
module.exports = function (objectrepository) {
    const FoodModel = requireOption(objectrepository, 'FoodModel');


    return function (req, res, next) {
        FoodModel.deleteOne({_id:req.params.foodid},next);
    };
  
  };