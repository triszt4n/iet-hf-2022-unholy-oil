import { Selector } from 'testcafe';
import { adminUser, dbClean, dbSeed, pahtName } from './utils.js';

fixture `Complex user action tests`
    .page `localhost:3000/bunkers`
    .after(async t =>{
        await dbClean();
    })

test.before( async t=> {
    await dbClean();
    await dbSeed();
})
('Create new bunker', async t => {

await t.useRole(adminUser)

    const testBunkerData = {
        name: 'UI test bunker',
        capacity: '10',
        address: 'Automated street, 5.'
    }

    const bunkerNavigation = Selector('a').withAttribute('href', '/bunkers');

    await t.expect(bunkerNavigation.exists).ok('A button for navigating to bunker lists should exist')
        .click(bunkerNavigation);

    await t.expect(await(pahtName())).eql( '/bunkers', 'Navigation button should navigate to bunker lists', {timeout: 1000});

    const newBunkerButton = Selector('a').withAttribute('href','/bunkers/new');

    await t.expect(newBunkerButton.exists).ok('New bunker button should exist')
    .click(newBunkerButton)

    await t.expect(await(pahtName())).eql('/bunkers/new', 'Navigation button should navigate to new bunker form', {timeout: 1000});

    const nameInput = Selector('#name');
    const addressInput = Selector('#adress');
    const capacityInput =  Selector('#capacity[type=number]');

    await t
    .expect(nameInput.exists).ok('Name input should exist')
    .expect(addressInput.exists).ok('Address input should exist')
    .expect(capacityInput.exists).ok('Number type capacity input should exist');

    await t
    .typeText(nameInput, testBunkerData.name)
    .typeText(addressInput, testBunkerData.address)
    .typeText(capacityInput, testBunkerData.capacity)
    .click('input[type=submit]')

    await t.expect(await (pahtName())).eql('/bunkers','Form should redirect back to list', {timeout: 1000});

    const newBunkerName = Selector('tr')
    .child('td')
    .withExactText(testBunkerData.name)
    


    await t
    .expect(newBunkerName.exists).ok('A line with new bunker name should exist')

    
    const infoButton = newBunkerName.sibling('td').child('a').withAttribute('href',/\/bunkers\/info\/*/);

    await t.expect(infoButton.exists).ok('Should have an info button to details page')
    .click(infoButton);

    await t
    .expect(Selector('li').withText(testBunkerData.name).exists).ok()
    .expect(Selector('li').withText(testBunkerData.address).exists).ok()
    .expect(Selector('li').withText(testBunkerData.capacity).exists).ok()

})

test.before( async t=> {
    await dbClean();
    await dbSeed();
})('Create new food', async t => {

await t.useRole(adminUser)

    const testFood = {
        name: 'UI test food',
        kcal: '2000',
        lasts: '100'
    }

    const foodsNavigation = Selector('a').withAttribute('href', '/foods');

    await t.expect(foodsNavigation.exists).ok('A button for navigating to food lists should exist')
        .click(foodsNavigation);

    await t.expect(await(pahtName())).eql('/foods','Button should navigate to foods');

    const newFoodButton = Selector('a').withAttribute('href','/foods/new');

    await t.expect(newFoodButton.exists).ok('A new food button should exist')
    .click(newFoodButton);

    // Create new food

    const nameInput = Selector('#name');
    const caloryInput = Selector('#kcal');
    const lastingInput = Selector('#lasts');

    await t.expect(nameInput.exists).ok('Name input should exist')
    .expect(caloryInput.exists).ok('Calory input should exist')
    .expect(lastingInput.exists).ok('Lasting Input should exist')

    await t
    .typeText(nameInput,testFood.name)
    .typeText(caloryInput, testFood.kcal)
    .typeText(lastingInput, testFood.lasts)
    .click('input[type=submit]')

    // check if data displayed correctly in list
    const newFoodRow = Selector('td').withExactText(testFood.name);
    const newFoodKcal = newFoodRow.sibling().withText(testFood.kcal);
    const newFoodLasts = newFoodRow.sibling().withText(testFood.lasts)

    await t
    .expect(newFoodRow.exists).ok('A new row should exist after creation')
    .expect(newFoodKcal.exists).ok('The correct calory should be displayed')
    .expect(newFoodLasts.exists).ok('The food lasting should be displayed')


    // check if new item is in the dropdown list for making a new storageitem
    await t.navigateTo('/bunkers')

    const infoButton = Selector('a').withAttribute('href',/\/bunkers\/info\/*/)
    await t.expect(infoButton.exists).ok()
    .click(infoButton);


    const storageButton = Selector('a').withAttribute('href',/\/bunkers\/storage\/add\/*/)

    await t.expect(storageButton.exists).ok()
    .click(storageButton);

    const dropDownMenu = Selector('select')
    const options = dropDownMenu.find('option')

    await t
    .expect(dropDownMenu.exists).ok('A dropdown menu should exist')
    .click(dropDownMenu)
    .expect(options.withExactText(testFood.name).exists).ok('An option should exist with new food name')
    .click(options.withExactText(testFood.name));

    const foodId = await options.withExactText(testFood.name).value;
    await t.expect(dropDownMenu.value).eql(foodId, 'The chosen food type should be the new food')


})


test.only.before( async t=> {
    await dbClean();
    await dbSeed();
})('Add food to storage', async t => {

    await t.useRole(adminUser)

    const infoButton = Selector('a').withAttribute('href',/\/bunkers\/info\/*/);

    await t
    .expect(infoButton.exists).ok('There should be an info button to details')
    .click(infoButton);

    const storageRecords = Selector('tr');
    const ogStorageRecordCount = await storageRecords.count;

    const storageButton = Selector('a').withAttribute('href',/\/bunkers\/storage\/add\/*/)
    await t
    .expect(storageButton.exists).ok('Should have an add to storage button')
    .click(storageButton)


    const typeSelect = Selector('select')
    const options = typeSelect.find('option')
    const creationInput = Selector('#dop')
    const quantityInput = Selector('#quantity')

    await t
    .expect(typeSelect.exists).ok('A type selector should exist')
    .expect(options.count).gt(0,'There should be at least one option in test database')
    .expect(creationInput.exists).ok('A date of creation input should exist')
    .expect(quantityInput.exists).ok('A quantity input should exist')
    .typeText(creationInput, '1999-12-23')
    .typeText(quantityInput, '10')
    .click('input[type=submit]')


    await t.expect(storageRecords.count).gt(ogStorageRecordCount, 'Storage records should be updated')

})