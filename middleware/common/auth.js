
const global = require('../../config/globalConfig');

/**
 * If the user is not logged in, redirects to '/'
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(global.useAuthentication && !req.session.user)
            return res.redirect('/');

        next();
    };
  
  };