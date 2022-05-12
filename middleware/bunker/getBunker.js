const requireOption = require('../common/requireOption')
const getTextClassFromDate = require('../common/TextClass')
/**
 * Gets bunker information from bunkerid param, puts info in res.locals.bunker
 *  -- if no bunker found, redirects to /bunkers
 */
module.exports = function (objectrepository) {
  const BunkerModel = requireOption(objectrepository, 'BunkerModel')

  return function (req, res, next) {
    BunkerModel.findOne({ _id: req.params.bunkerid })
      .populate('stock')
      .exec((err, bunker) => {
        if (err) return next(err)
        if (!bunker) return res.redirect('/bunkers')

        for (let item of bunker.stock)
          item.style = getTextClassFromDate(item.expirationDate).class

        res.locals.bunker = bunker

        return next()
      })
  }
}
