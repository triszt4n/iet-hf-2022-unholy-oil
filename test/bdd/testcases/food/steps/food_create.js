const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const saveFood = require("../../../../../middleware/food/saveFood");
let { repository, Food, setid } = require("./food_common");

let locals = {};

Given("There are no foods", function () {
  repository.splice(0);
});

When("I create the following foods:", function (dataTable) {
  let save = saveFood({
    FoodModel: Food
  });

  for (let row of dataTable.hashes()) {
    let food = {};
    for (let key in row) {
        food[key] = row[key];
    }
    setid(parseInt(food["_id"]));
    save(
      {
        body: food,
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
    // a new food is created if locals.food is undefined
    locals = {};
  }
});
