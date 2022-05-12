/**
 * If there is an error message, gives it to the render engine
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (
      typeof req.query.error != 'undefined' &&
      req.query.error === 'wrongpass'
    ) {
      res.locals.error = {
        type: 'Wrong username or password.',
        message: 'Try admin/123456 combination ;)',
      }
    }

    return next()
  }
}
