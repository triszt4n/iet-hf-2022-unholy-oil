import { Selector, t } from "testcafe";



const list = Selector('#bunker-data')

class Page {
    constructor() {
            this.bunkerName = list.find('li').nth(0)
            this.bunkerAddress = this.bunkerName.nextSibling()
            this.bunkerCapacity = this.bunkerAddress.nextSibling();
    }

    

}

export default new Page();