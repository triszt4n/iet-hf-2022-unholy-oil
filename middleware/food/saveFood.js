const requireOption = require('../common/requireOption');
const hasAllOptions = require('../common/hasAllOptions');


/**
 * Creates/Updates food entry in database using foodid param
 */

module.exports = function (objectrepository) {
    const FoodModel = requireOption(objectrepository, 'FoodModel');

    return function (req, res, next) {

        if (!hasAllOptions(req.body, ['name', 'kcal', 'lasts'])) return next();

        if (req.body.name === '' ||
            req.body.kcal === '' ||
            req.body.lasts === '') {
            res.locals.warning = 'Töltsd ki az összes mezőt';
            return next();
        }

        if (typeof res.locals.food === 'undefined') {
            res.locals.food = new FoodModel();
        }

        res.locals.food.name = req.body.name;
        res.locals.food.kcal = req.body.kcal;
        res.locals.food.lasts = req.body.lasts;

        res.locals.food.save(err => {
            if (err) return next(err);

            return res.redirect('/foods');
        })
    };
};