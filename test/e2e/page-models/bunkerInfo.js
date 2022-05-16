import { Selector, t } from "testcafe";
import { pahtName } from "../utils";



const list = Selector('#bunker-data')

class Page {
    constructor() {
            this.bunkerName = list.find('li').nth(0)
            this.bunkerAddress = this.bunkerName.nextSibling()
            this.bunkerCapacity = this.bunkerAddress.nextSibling();
            this.storageAddButton = Selector('#storage-add-btn')
    }

    
    async toStorageAdd(){
        await t
        .expect(this.storageAddButton.exists).ok('Add to Storage button should be present')
        .click(this.storageAddButton)

        await t
        .expect(await(pahtName())).match(/\/bunkers\/storage\/add\/*/, 'Should navigate to storage add path')
    }


}

export default new Page();