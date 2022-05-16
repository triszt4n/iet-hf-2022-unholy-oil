import { Role } from "testcafe";
import { ClientFunction } from 'testcafe';

const BunkerModel = require('../../models/bunker')
const StorageItemModel = require('../../models/storageItem')
const FoodModel = require('../../models/food')

export const dbSeed = async () => {

    const testFood = await FoodModel.create({
        name: 'Test food',
        kcal: 2000,
        lasts: 100,
    });

    await testFood.save();

    const testBunker = await BunkerModel.create({
        name: "Test bunker",
        adress: "Test adress",
        capacity: 1,
        nextExpDate: '',
        stock_dur: 0,
        stock: [],
    })

    await testBunker.save();

}

export const dbClean = async () => {
    await StorageItemModel.deleteMany({}).exec();
    await BunkerModel.deleteMany({}).exec();
    await FoodModel.deleteMany({}).exec();
}



export const adminUser = Role('localhost:3000/', async t =>{
    await t
    .typeText('#username', process.env.ADMIN_USER)
    .typeText('#password', process.env.ADMIN_PASSWORD)
    .click('input[type=submit]')

})

export const getLocationPart = ClientFunction(locationPart => {
    return window.location[locationPart];
});

export const pahtName = async () => {
    return await getLocationPart('pathname');
}
