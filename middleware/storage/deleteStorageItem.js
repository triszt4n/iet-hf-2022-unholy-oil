const requireOption = require('../common/requireOption')
/**
 * Deletes item from the storage of a bunker using itemid param
 * IMPORTANT: It only deletes storage item to database, saving the bunker model needs to be called in next middleware, after updateting the statisticks
 */
module.exports = function (objectrepository) {
  const StorageItemModel = requireOption(objectrepository, 'StorageItemModel')
  return function (req, res, next) {
    StorageItemModel.deleteOne({ _id: req.params.itemid }, (err) => {
      if (err) return next(err)

      res.locals.bunker.stock = res.locals.bunker.stock.filter(
        (item) => item._id != req.params.itemid
      )

      return next()
    })
  }
}
