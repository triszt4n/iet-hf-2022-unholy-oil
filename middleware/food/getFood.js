const requireOption = require('../common/requireOption');

/**
 * Get food from database, using foodid param
 * -- if no food found, redirects to '/foods'
 */
module.exports = function (objectrepository) {
    const FoodModel = requireOption(objectrepository, 'FoodModel');
    return function (req, res, next) {


        FoodModel.findOne({_id:req.params.foodid},(err,food)=>{
            if(err) return next(err);
            if(!food) return  res.redirect('/foods');

            res.locals.food = food;
            return  next();
        });

    };
  
  };