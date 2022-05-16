import { Selector, t } from 'testcafe'
import { pahtName } from '../utils'

class Bunker {
  constructor(name) {
    this.nameField = Selector('tr').find('td').withExactText(name)
    this.storageField = this.nameField.nextSibling('td')
    this.warning = this.storageField.nextSibling('td')
    this.actions = this.warning.nextSibling()
  }

  async toInfo() {
    const infoButton = this.actions
      .child('a')
      .withAttribute('href', /\/bunkers\/info\/*/)
    await t
      .expect(infoButton.exists)
      .ok('Info button should exist')
      .click(infoButton)

    await t
      .expect(await pahtName())
      .match(/\/bunkers\/info\/*/, 'Should navigate to info page')
  }
}

class Page {
  constructor() {
    this.newBunkerButton = Selector('a').withAttribute('href', '/bunkers/new')
    this.bunkers = Selector('tr')
  }

  async toNewBunker() {
    await t
      .expect(this.newBunkerButton.exists)
      .ok('New bunker button should be present')
      .click(this.newBunkerButton)

    await t
      .expect(await pahtName())
      .eql('/bunkers/new', 'Should navigate to /bunkers/new')
  }

  getBunker(name) {
    return new Bunker(name)
  }

  async toRandomBunkerInfo() {
    const infoButton = this.bunkers
      .find('a')
      .withAttribute('href', /\/bunkers\/info\/*/)

    await t
      .expect(infoButton.exists)
      .ok('There should be an info button to details')
      .click(infoButton)

    await t
      .expect(await pahtName())
      .match(/\/bunkers\/info\/*/, 'Should redirect to info')
  }
}

export default new Page()
