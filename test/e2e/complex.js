import { adminUser, dbClean, dbSeed, pahtName } from './utils.js'
import bunkerListPM from './page-models/bunkerList'
import navigationPM from './page-models/navigation'
import bunkerFormPM from './page-models/bunkerForm'
import bunkerInfoPM from './page-models/bunkerInfo'
import foodListPM from './page-models/foodList'
import foodFormPM from './page-models/foodForm'
import storageAddFormPM from './page-models/storageAddForm'

fixture`Complex user action tests`.page`localhost:3000/bunkers`.after(
  async (t) => {
    await dbClean()
  }
)

test.before(async (t) => {
  await dbClean()
  await dbSeed()
})('Create new bunker', async (t) => {
  // test data for new bunker
  const testBunkerData = {
    name: 'UI test bunker',
    capacity: '10',
    address: 'Automated street, 5.',
  }

  await t.useRole(adminUser)

  //navigate to bunker list
  await navigationPM.toBunkerList()

  //navigate to new bunker form
  await bunkerListPM.toNewBunker()

  //check if form has all fields
  await t
    .expect(bunkerFormPM.nameInput.exists)
    .ok('Name input should exist')
    .expect(bunkerFormPM.addressInput.exists)
    .ok('Address input should exist')
    .expect(bunkerFormPM.capacityInput.exists)
    .ok('Number type capacity input should exist')

  // submit form
  await bunkerFormPM.submitForm(
    testBunkerData.name,
    testBunkerData.address,
    testBunkerData.capacity
  )

  // check redirect
  await t
    .expect(await pahtName())
    .eql('/bunkers', 'Form should redirect back to list')

  const bunker = bunkerListPM.getBunker(testBunkerData.name)

  // check if bunker has all fields in list
  await t
    .expect(bunker.nameField.exists)
    .ok('New bunker name field should exist')
    .expect(bunker.storageField.exists)
    .ok()
    .expect(bunker.warning.exists)
    .ok()
    .expect(bunker.actions.exists)
    .ok()

  // navigate to bunker info
  await bunker.toInfo()

  // check if info is correct
  await t
    .expect(bunkerInfoPM.bunkerName.innerText)
    .match(new RegExp(testBunkerData.name))
    .expect(bunkerInfoPM.bunkerAddress.innerText)
    .match(new RegExp(testBunkerData.address))
    .expect(bunkerInfoPM.bunkerCapacity.innerText)
    .match(new RegExp(testBunkerData.capacity))
})

test.before(async (t) => {
  await dbClean()
  await dbSeed()
})('Create new food', async (t) => {
  const testFood = {
    name: 'UI test food',
    kcal: '2000',
    lasts: '100',
  }

  // navigate to new food form
  await t.useRole(adminUser)

  await navigationPM.toFoodList()

  await foodListPM.toNewFood()

  // Create new food
  await t
    .expect(foodFormPM.nameInput.exists)
    .ok('Name input should exist')
    .expect(foodFormPM.caloryInput.exists)
    .ok('Calory input should exist')
    .expect(foodFormPM.lastingInput.exists)
    .ok('Lasting Input should exist')

  // submit newfood form
  await foodFormPM.submitForm(testFood.name, testFood.kcal, testFood.lasts)

  // test if it shows up in list
  const foodRow = foodListPM.getFood(testFood.name)

  await t
    .expect(foodRow.nameField.innerText)
    .match(new RegExp(testFood.name))
    .expect(foodRow.kcalField.innerText)
    .match(new RegExp(testFood.kcal))
    .expect(foodRow.lastingField.innerText)
    .match(new RegExp(testFood.lasts))

  // check if new item is in the dropdown list for making a new storageitem

  // navigate to a storage add form
  await navigationPM.toBunkerList()

  await bunkerListPM.toRandomBunkerInfo()

  await bunkerInfoPM.toStorageAdd()

  // select the new food type in the dropdonw menu
  await storageAddFormPM.selectFoodType(testFood.name)

  // check if its selected correctly
  const foodId = await storageAddFormPM.options.withExactText(testFood.name)
    .value
  await t
    .expect(storageAddFormPM.dropDownMenu.value)
    .eql(foodId, 'The chosen food type should be the new food')
})

test.before(async (t) => {
  await dbClean()
  await dbSeed()
})('Add food to storage', async (t) => {
  await t.useRole(adminUser)

  // navigate to a bunker info page
  await navigationPM.toBunkerList()
  await bunkerListPM.toRandomBunkerInfo()

  // count the number of storage items it has
  const ogStorageRecordCount = await bunkerInfoPM.storageRecords.count

  // navigate to add storage items path
  await bunkerInfoPM.toStorageAdd()

  // check if form has all inputs
  await t
    .expect(storageAddFormPM.dropDownMenu.exists)
    .ok('A type selector should exist')
    .expect(storageAddFormPM.options.count)
    .gt(0, 'There should be at least one option in test database')
    .expect(storageAddFormPM.creationInput.exists)
    .ok('A date of creation input should exist')
    .expect(storageAddFormPM.quantityInput.exists)
    .ok('A quantity input should exist')

  // submit form
  await storageAddFormPM.submitForm('1999-12-23', '100')

  //check if number of records is greater than previous
  await t
    .expect(bunkerInfoPM.storageRecords.count)
    .eql(ogStorageRecordCount + 1, 'Storage records should be updated')
})
