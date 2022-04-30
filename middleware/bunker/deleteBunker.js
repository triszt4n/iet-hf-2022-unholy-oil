const requireOption = require('../common/requireOption');


/**
 * Deletes bunker from database
 */
module.exports = function (objectrepository) {

    const BunkerModel = requireOption(objectrepository, 'BunkerModel');

    return function (req, res, next) {

        BunkerModel.deleteOne({_id: req.params.bunkerid},next);

    };
  
  };