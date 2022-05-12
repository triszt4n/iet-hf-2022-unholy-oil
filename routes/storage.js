const renderMW = require('../middleware/common/render')
const authMW = require('../middleware/common/auth')

const getBunkerMW = require('../middleware/bunker/getBunker')

const getFoodListMW = require('../middleware/food/getFoodList')

const addStorageItemMW = require('../middleware/storage/addStorageItem')
const deletStorageItemMW = require('../middleware/storage/deleteStorageItem')
const updateBunkerStatsMW = require('../middleware/storage/updateBunkerStats')
const checkFoodListMW = require('../middleware/storage/checkFoodList')

module.exports = function (app, objectRepository) {
  app.use(
    '/bunkers/storage/add/:bunkerid',
    authMW(objectRepository),
    getBunkerMW(objectRepository),
    getFoodListMW(objectRepository),
    checkFoodListMW(objectRepository),
    addStorageItemMW(objectRepository),
    updateBunkerStatsMW(objectRepository),
    function (req, res, next) {
      if (typeof res.locals.storageItem === 'undefined') return next()
      else return res.redirect(`/bunkers/info/${req.params.bunkerid}`)
    },
    renderMW(objectRepository, 'storageadd')
  )

  app.get(
    '/bunkers/storage/del/:bunkerid/:itemid',
    authMW(objectRepository),
    getBunkerMW(objectRepository),
    deletStorageItemMW(objectRepository),
    updateBunkerStatsMW(objectRepository),
    function (req, res) {
      return res.redirect(`/bunkers/info/${req.params.bunkerid}`)
    }
  )
}
