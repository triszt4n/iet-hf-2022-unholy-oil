/**
 * Deletes food from database, using foodid param
 */
module.exports = function () {
  return function (req, res, next) {
    if (res.locals.foods.length == 0) {
      return res.redirect('/foods/new?nofood=1')
    }
    return next()
  }
}
