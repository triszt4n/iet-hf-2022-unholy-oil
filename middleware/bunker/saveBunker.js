const hasAllOptions = require('../common/hasAllOptions')
const requireOption = require('../common/requireOption')

/**
 * Creates/Updates a bunker if gets the necesary data
 * -- if get no data, calls next
 * -- if save is successful redirects to '/bunkers'
 */

module.exports = function (objectrepository) {
  const BunkerModel = requireOption(objectrepository, 'BunkerModel')

  return function (req, res, next) {
    if (!hasAllOptions(req.body, ['name', 'adress', 'capacity'])) return next()

    if (
      req.body.name === '' ||
      req.body.adress === '' ||
      req.body.capacity === ''
    ) {
      res.locals.warning = 'Töltsd ki az összes mezőt'
      return next()
    }

    if (typeof res.locals.bunker == 'undefined') {
      res.locals.bunker = new BunkerModel({
        nextExpDate: '',
        stock_dur: 0,
        stock: [],
      })
    }

    res.locals.bunker.name = req.body.name
    res.locals.bunker.adress = req.body.adress
    res.locals.bunker.capacity = req.body.capacity

    res.locals.bunker.save((err) => {
      if (err) return next(err)

      return res.redirect('/bunkers')
    })
  }
}
