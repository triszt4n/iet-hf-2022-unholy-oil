const FoodModel = require('./models/food')
const BunkerModel = require('./models/bunker')
const StorageItemModel = require('./models/storageItem')

let dF = FoodModel.deleteMany({}).exec()
let dB = BunkerModel.deleteMany({}).exec()
let dS = StorageItemModel.deleteMany().exec()

Promise.all([dF, dB, dS])
  .then(fillDB)
  .catch((err) => console.log(err))
  .then((res) => {
    console.log('done')
    return process.exit()
  })

async function fillDB() {
  let food1 = new FoodModel()

  food1.name = 'Sajtos csirkefarhát'
  food1.kcal = 100
  food1.lasts = 500

  await food1.save()

  let storage1 = new StorageItemModel({
    type: food1.name,
    quantity: 50,
    dop: new Date(),
    lasts: new Date(2020, 8, 16),
  })

  await storage1.save()

  let storage2 = new StorageItemModel({
    type: food1.name,
    quantity: 500,
    dop: new Date(2019, 10, 23),
    lasts: new Date(2020, 8, 16),
  })

  await storage2.save()

  let Bunker = new BunkerModel({
    name: 'SCH',
    adress: 'Next to BME',
    capacity: 1000,
    stock_dur: 10000,
    stock: [storage1._id, storage2._id],
    nextExpDate: new Date(2020, 4, 20),
  })

  await Bunker.save()
}
