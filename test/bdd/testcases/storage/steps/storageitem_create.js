const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const addStorageItem = require("../../../../../middleware/storage/addStorageItem");
const updateBunkerStats = require("../../../../../middleware/storage/updateBunkerStats");
const ImportedBunker = require("../../bunker/steps/bunker_common");
const ImportedFood = require("../../food/steps/food_common");
let { repository, StorageItem, setid } = require("./storageitem_common");

let locals = {};

Given("There are no storage items", function () {
  repository.splice(0);
});

When("I create the following storage items:", function (dataTable) {
  let save = addStorageItem({
    StorageItemModel: StorageItem,
    FoodModel: {
        findOne: (obj, cb) => {
            cb(undefined, ImportedFood.repository.find(
                food => food._id.toString() === obj._id.toString()
            ))
        }
    }
  });
  let updateBunker = updateBunkerStats({
      BunkerModel: ImportedBunker.Bunker
  })

  for (let row of dataTable.hashes()) {
    let storageitem = {};
    for (let key in row) {
        storageitem[key] = row[key];
    }
    locals.bunker = ImportedBunker.repository.find(
        bunker => bunker._id.toString() === row['bunkerId'].toString()
    )
    setid(parseInt(storageitem["_id"]));
    save(
      {
        body: storageitem,
      },
      {
        locals: locals,
        redirect: (where) => {
          // redirect called
        },
      },
      () => {
        // next called
      }
    );
    updateBunker(
        {},
        {
            locals: locals
        },
        () => {
            // next called
        }
    )
    // a new storageitem is created if locals.storageitem is undefined
    locals = {};
  }
});
