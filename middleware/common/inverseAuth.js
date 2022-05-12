const globalConfig = require('../../config/globalConfig')

/**
 * If the user is logged in, redirects to '/bunkers'
 */

module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (
      !globalConfig.useAuthentication ||
      typeof req.session.user != 'undefined'
    ) {
      return res.redirect('/bunkers')
    }
    return next()
  }
}
