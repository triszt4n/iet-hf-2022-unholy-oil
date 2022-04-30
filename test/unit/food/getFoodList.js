const expect = require('chai').expect;
const getFoodListMW = require('../../../middleware/food/getFoodList');

describe('getFoodList middleware ', function () {
    it('should return foods', function (done) {
        let req = {};
        let res = {
            locals: {}
        };
        const fakeFoodModel = {
            find: function (query, cb) {
                cb(undefined, ['food1', 'food2'])
            }
        };

        const mw = getFoodListMW({
            FoodModel: fakeFoodModel
        })

        mw(req, res, (err) => {
            expect(err).to.eql(undefined);
            expect(res.locals.foods).to.eql(['food1', 'food2']);
            done();
        });
    });
    it('should call next with db error', function (done) {
        let req = {};
        let res = {
            locals: {}
        };
        const fakeFoodModel = {
            find: function (query, cb) {
                cb('Adatbazis hiba', null)
            }
        };

        const mw = getFoodListMW({
            FoodModel: fakeFoodModel
        });

        mw(req, res, (err) => {
            expect(err).to.eql('Adatbazis hiba');
            done();
        });
    });
});