const requireOption = require('../common/requireOption');


/**
 * Deletes cleans up database after deleting a bunker
 */
module.exports = function (objectrepository) {

    const BunkerModel = requireOption(objectrepository, 'BunkerModel');
    const StorageItemModel = requireOption(objectrepository, 'StorageItemModel');

    return function (req, res, next) {

        if(typeof res.locals.bunker === 'undefined') return next();

        let storageItems = [];
        for(item of res.locals.bunker.stock){
            storageItems.push(StorageItemModel.deleteOne({_id: item._id}).exec());
        }

        Promise.all(storageItems).
        then(res=>{
            return next();
        }).
        catch(next);


    };
  };