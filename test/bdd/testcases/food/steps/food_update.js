const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const saveFood = require("../../../../../middleware/food/saveFood");
let { repository, Food } = require("./food_common");

When(
  "I change the name of food ID {int} to {string}",
  function (int, string) {
    let save = saveFood({
      FoodModel: Food,
    });

    let food = repository.find(
        foo => foo._id.toString() === int.toString()
    )

    save(
      {
        body: {
            name: string,
            kcal: food.kcal,
            lasts: food.lasts
        },
      },
      {
        locals: {
            food: food
        },
        redirect: (where) => {
          // redirect called
        },
      },
      () => {
        // next called
      }
    );
  }
);
