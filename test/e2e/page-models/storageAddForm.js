import { Selector, t } from "testcafe";


class Page {
    constructor() {
        this.dropDownMenu = Selector('select')
        this.options = this.dropDownMenu.find('option')
    }


    async selectFoodType(foodType) {
        await t
            .expect(this.dropDownMenu.exists).ok('A dropdown menu should exist')
            .click(this.dropDownMenu)
            .expect(this.options.withExactText(foodType).exists).ok('An option should exist with new food name')
            .click(this.options.withExactText(foodType));
    }

}

export default new Page();