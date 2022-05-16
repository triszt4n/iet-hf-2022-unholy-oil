import { Selector, t } from "testcafe";
import { pahtName } from "../utils";

class Food{
    constructor(name){
        this.nameField = Selector('tr').find('td').withExactText(name);
        this.kcalField = this.nameField.nextSibling('td');
        this.lastingField = this.kcalField.nextSibling('td');
        this.actions = this.lastingField.nextSibling('td');
    }

}

class Page {
    constructor(){
        this.newFoodButton = Selector('a').withAttribute('href','/foods/new');
        this.foods = Selector('tr');
    }



    async toNewFood(){
        await t
        .expect(this.newFoodButton.exists).ok('New Food button should be present')
        .click(this.newFoodButton)
        
        await t.expect(await(pahtName())).eql('/foods/new', 'Should navigate to /foods/new')
    }

    getFood(name){ 
        return new Food(name);
    }

}

export default new Page();