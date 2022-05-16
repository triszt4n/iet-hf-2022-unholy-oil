import { Selector, t } from 'testcafe'

class Page {
  constructor() {
    this.nameInput = Selector('#name')
    this.caloryInput = Selector('#kcal')
    this.lastingInput = Selector('#lasts')
  }

  async submitForm(name, calory, lasting) {
    await t
      .typeText(this.nameInput, name)
      .typeText(this.caloryInput, calory)
      .typeText(this.lastingInput, lasting)
      .click('input[type=submit]')
  }
}

export default new Page()
