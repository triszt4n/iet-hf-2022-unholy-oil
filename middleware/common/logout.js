//clears session
module.exports = function () {
  return function (req, res, next) {
    req.session.regenerate(function (err) {
      if (err) console.log('ERROR AT LOGOUT:' + err)
      return next()
    })
  }
}
