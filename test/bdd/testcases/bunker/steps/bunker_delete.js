const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const deleteBunker = require("../../../../../middleware/bunker/deleteBunker");
let { repository } = require("./bunker_common");

Given("Bunker by ID {int} exists", function (int) {
  repository.push({
    _id: int,
    name: `name${int}`,
    adress: `adress${int}`,
    capacity: int,
    stock_dur: int,
    nextExpDate: Date.now().toString(),
    stock: null,
  });
});

Given("{int} bunkers exist", function (int) {
  for (let i = 0; i < int; i++)
    repository.push({
      _id: i,
      name: `name${i}`,
      adress: `adress${i}`,
      capacity: i,
      stock_dur: i,
      nextExpDate: Date.now().toString(),
      stock: null,
    });
});

When("I delete bunker by ID {int}", function (int) {
  let del_func = deleteBunker({
    BunkerModel: {
      deleteOne: (obj, next) => {
        let index = repository.findIndex((bunker) => bunker._id === obj._id);
        if (index != -1) {
          repository.splice(index, 1);
        }
      },
    },
  });

  del_func(
    {
      params: {
        bunkerid: int,
      },
    },
    {},
    () => {
      // next called
    }
  );
});
