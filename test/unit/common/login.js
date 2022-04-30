const expect = require('chai').expect;
const loginMW = require('../../../middleware/common/login');

describe('Login middleware ', function () {

    it('should call next (good user & pass)', function (done) {
        let req = {
            body: {
                username: 'admin',
                password: '123456'
            },
            session: {}
        };
        let res = {
            redirect: function (to) {
                /*nem lép be*/ }
        };
        const mw = loginMW({});
        mw(req, res, (err) => {
            expect(err).to.be.eql(undefined);
            expect(req.session.user).to.be.eql("admin");
            done();
        });
    });
    it('should redirect (wrong pass)', function (done) {
        let req = {
            body: {
                username: 'admin',
                password: '1234567'
            },
            session: {}
        };
        let res = {
            redirect: function (to) {
                expect(to).to.be.eql('/?error=wrongpass');
                done();
            }
        };
        const mw = loginMW({});
        mw(req, res, (err) => {
            //ide nem lép be
        });
    });

    describe('It should redirect when', function () {
        it('no body param is given', function (done) {
            let req = {
                session: {}
            };
            let res = {
                redirect: function (to) {
                    expect(to).to.be.eql('/?error=wrongpass');
                    done();
                }
            };
            const mw = loginMW({});
            mw(req, res, (err) => {});
        });
        it('no username given', function (done) {
            let req = {
                body: {
                    password: '1234567'
                },
                session: {}
            };
            let res = {
                redirect: function (to) {
                    expect(to).to.be.eql('/?error=wrongpass');
                    done();
                }
            };
            const mw = loginMW({});
            mw(req, res, (err) => {
                //ide nem lép be
            });
        });
        it('no password given', function (done) {
            let req = {
                body: {
                    username: 'admin'
                },
                session: {}
            };
            let res = {
                redirect: function (to) {
                    expect(to).to.be.eql('/?error=wrongpass');
                    done();
                }
            };
            const mw = loginMW({});
            mw(req, res, (err) => {
                //ide nem lép be
            });
        });
    })




});