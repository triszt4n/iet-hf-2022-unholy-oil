/**
 * Checks user credentials
 */

module.exports = function () {
  return function (req, res, next) {
    if (
      req.body &&
      req.body.username == process.env.ADMIN_USER &&
      req.body.password == process.env.ADMIN_PASSWORD
    ) {
      req.session.user = req.body.username
      return next()
    } else {
      return res.redirect('/?error=wrongpass')
    }
  }
}
