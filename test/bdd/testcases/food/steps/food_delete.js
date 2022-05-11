const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const deleteFood = require("../../../../../middleware/food/deleteFood");
let { repository } = require("./food_common");

Given("Food by ID {int} exists", function (int) {
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

Given("{int} foods exist", function (int) {
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

When("I delete food by ID {int}", function (int) {
  let del_func = deleteFood({
    FoodModel: {
      deleteOne: (obj, next) => {
        let index = repository.findIndex((food) => food._id.toString() === obj._id.toString());
        if (index != -1) {
          repository.splice(index, 1);
        }
      },
    },
  });

  del_func(
    {
      params: {
        foodid: int,
      },
    },
    {},
    () => {
      // next called
    }
  );
});
