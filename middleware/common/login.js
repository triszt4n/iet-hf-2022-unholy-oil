
/**
 * Checks user credentials
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(req.body && req.body.username == 'admin' && req.body.password == '123456'){
            req.session.user = req.body.username;
            return next();
        }else{
            return res.redirect('/?error=wrongpass');
        }
    };
  
  };