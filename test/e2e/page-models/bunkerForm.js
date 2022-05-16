import { Selector, t } from 'testcafe'

class Page {
  constructor() {
    this.nameInput = Selector('#name')
    this.addressInput = Selector('#adress')
    this.capacityInput = Selector('#capacity[type=number]')
  }

  async submitForm(name, address, capacity) {
    await t
      .typeText(this.nameInput, name)
      .typeText(this.addressInput, address)
      .typeText(this.capacityInput, capacity)
      .click('input[type=submit]')
  }
}

export default new Page()
