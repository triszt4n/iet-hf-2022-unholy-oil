const authMW = require('../middleware/common/auth')
const renderMW = require('../middleware/common/render')

const getBunkerListMW = require('../middleware/bunker/getBunkerList')
const saveBunkerMW = require('../middleware/bunker/saveBunker')
const getBunkerMW = require('../middleware/bunker/getBunker')
const deleteBunkerMW = require('..//middleware/bunker/deleteBunker')
const cleanupBunkerMw = require('../middleware/bunker/cleanupBunker')

module.exports = function (app, objectRepository) {
  app.get(
    '/bunkers',
    authMW(objectRepository),
    getBunkerListMW(objectRepository),
    renderMW(objectRepository, 'bunkers')
  )

  app.use(
    '/bunkers/new',
    authMW(objectRepository),
    saveBunkerMW(objectRepository),
    renderMW(objectRepository, 'bunkereditcreate')
  )

  app.use(
    '/bunkers/edit/:bunkerid',
    authMW(objectRepository),
    getBunkerMW(objectRepository),
    saveBunkerMW(objectRepository),
    renderMW(objectRepository, 'bunkereditcreate')
  )

  app.get(
    '/bunkers/del/:bunkerid',
    authMW(objectRepository),
    getBunkerMW(objectRepository),
    deleteBunkerMW(objectRepository),
    cleanupBunkerMw(objectRepository),
    function (req, res, next) {
      return res.redirect('/bunkers')
    }
  )

  app.get(
    '/bunkers/info/:bunkerid',
    authMW(objectRepository),
    getBunkerMW(objectRepository),
    renderMW(objectRepository, 'bunkerinfo')
  )
}
