const requireOption = require('../common/requireOption')
const getTextClassFromDate = require('../common/TextClass')

/**
 *Gets list of bunkers, puts list on res.locals.bunkers
 */
module.exports = function (objectrepository) {
  const BunkerModel = requireOption(objectrepository, 'BunkerModel')

  return function (req, res, next) {
    BunkerModel.find({})
      .exec()
      .then((bunkers) => {
        for (let bunker of bunkers)
          bunker.warning = getTextClassFromDate(bunker.nextExpDate)
        res.locals.bunkers = bunkers
        return next()
      })
      .catch((err) => next(err))
  }
}
