const moment = require('moment')
const globalConfig = require('../../config/globalConfig')

/**
 * Updates the bunkers statistics, like estimated days or next expiration date
 */
module.exports = function () {
  return function (req, res, next) {
    let sumCalories = 0
    let expDates = []

    for (let item of res.locals.bunker.stock) {
      sumCalories += item.sumCalories
      expDates.push(moment(item.expirationDate, moment.defaultFormat))
    }

    if (expDates.length > 0) {
      res.locals.bunker.nextExpDate = expDates
        .sort((a, b) => a.diff(b))[0]
        .format()
    }
    res.locals.bunker.stock_dur = Math.round(
      sumCalories /
        (res.locals.bunker.capacity * globalConfig.avarageCalorieIntake)
    )
    return res.locals.bunker.save(next)
  }
}
