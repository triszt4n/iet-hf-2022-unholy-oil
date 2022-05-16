import { Selector, t } from 'testcafe';
import { pahtName } from '../utils';

class Navigation{
    constructor(){
        this.bunkerList = Selector('a').withAttribute('href', '/bunkers');
        this.foodList = Selector('a').withAttribute('href', '/foods')
    }

    async toBunkerList(){
        await t.expect(this.bunkerList.exists).ok('There should be navigation to bunker list')
        .click(this.bunkerList)
        await t.expect(await(pahtName())).eql('/bunkers', 'Should navigate to /bunkers')
    }

    async toFoogList(){
        await t.expect(this.foodList.exists).ok('There should be navigation to Food List')
        .click(this.foodList)
        await t.expect(await(pahtName())).eql('/foods', 'Should navigate to /foods')
    }
}

export default new Navigation();