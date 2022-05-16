import { Selector } from 'testcafe';
import { pahtName } from './utils';

fixture`Login test`
    .page`localhost:3000`;


test('Login and log out', async t =>{

     await t
        .typeText('#username', process.env.ADMIN_USER)
        .typeText('#password', process.env.ADMIN_PASSWORD)
        .click('input[type=submit]')

        const btnLogout = Selector('#btn-logout')
        let path = await pahtName();

        await t
        .expect(path).eql('/bunkers','Login should redirect to bunkers page')
        .expect(btnLogout.exists).ok('Logout button should exists, and be visible')

        await t.click(btnLogout);

        path = await pahtName();

        await t.expect(path).eql('/', 'Logout should redirect to login page')

})