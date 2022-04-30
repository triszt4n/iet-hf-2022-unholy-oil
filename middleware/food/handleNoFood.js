const requireOption = require('../common/requireOption');


/**
 * Handles the no food error (When one ants to add storage item, but there are no food types in database)
 */

module.exports = function (objectrepository) {

    const FoodModel = requireOption(objectrepository, 'FoodModel');

    return function (req, res, next) {
       if(req.query.nofood) res.locals.warning = "Először létre kell hozni egy étel típust az adatbázisban!";

        return next();
        
    }
  };