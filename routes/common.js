const renderMW = require('../middleware/common/render')
const handleWrongPassMW = require('../middleware/common/handleWrongPass')
const loginMW = require('../middleware/common/login')
const inversAuthMW = require('../middleware/common/inverseAuth')
const logoutMW = require('..//middleware/common/logout')

module.exports = function (app, objectRepository) {
  app.get(
    '/',
    inversAuthMW(objectRepository),
    handleWrongPassMW(objectRepository),
    renderMW(objectRepository, 'index')
  )

  app.post('/login', loginMW(objectRepository), function (req, res) {
    return res.redirect('/bunkers')
  })

  app.get('/logout', logoutMW(objectRepository), function (req, res) {
    return res.redirect('/')
  })
}
