const requireOption = require('../common/requireOption')

/**
 * Gets the list of foods from database
 */

module.exports = function (objectrepository) {
  const FoodModel = requireOption(objectrepository, 'FoodModel')

  return function (req, res, next) {
    FoodModel.find({}, (err, foods) => {
      if (err) return next(err)

      res.locals.foods = foods

      return next()
    })
  }
}
