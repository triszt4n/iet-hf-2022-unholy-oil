import { Selector, t } from 'testcafe'

class Page {
  constructor() {
    this.dropDownMenu = Selector('select')
    this.options = this.dropDownMenu.find('option')
    this.creationInput = Selector('#dop')
    this.quantityInput = Selector('#quantity')
  }

  async selectFoodType(foodType) {
    await t
      .expect(this.dropDownMenu.exists)
      .ok('A dropdown menu should exist')
      .click(this.dropDownMenu)
      .expect(this.options.withExactText(foodType).exists)
      .ok('An option should exist with new food name')
      .click(this.options.withExactText(foodType))
  }

  async submitForm(dop, quantity) {
    await t
      .typeText(this.creationInput, dop)
      .typeText(this.quantityInput, quantity)
      .click('input[type=submit]')
  }
}

export default new Page()
