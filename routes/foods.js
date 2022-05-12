const authMW = require('../middleware/common/auth')
const renderMW = require('../middleware/common/render')

const getFoodListMW = require('../middleware/food/getFoodList')
const saveFoodMW = require('../middleware/food/saveFood')
const getFoodMW = require('../middleware/food/getFood')
const deleteFoodMW = require('../middleware/food/deleteFood')
const handleNoFoodMW = require('../middleware/food/handleNoFood')
module.exports = function (app, objectRepository) {
  app.get(
    '/foods',
    authMW(objectRepository),
    getFoodListMW(objectRepository),
    renderMW(objectRepository, 'foodtable')
  )

  app.use(
    '/foods/new',
    authMW(objectRepository),
    handleNoFoodMW(objectRepository),
    saveFoodMW(objectRepository),
    renderMW(objectRepository, 'foodeditcreate')
  )

  app.use(
    '/foods/edit/:foodid',
    authMW(objectRepository),
    getFoodMW(objectRepository),
    saveFoodMW(objectRepository),
    renderMW(objectRepository, 'foodeditcreate')
  )

  app.use(
    '/foods/del/:foodid',
    authMW(objectRepository),
    getFoodMW(objectRepository),
    deleteFoodMW(objectRepository),
    function (req, res) {
      return res.redirect('/foods')
    }
  )
}
