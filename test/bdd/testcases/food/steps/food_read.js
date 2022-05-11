const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const getFood = require("../../../../../middleware/food/getFood");
const getFoodList = require("../../../../../middleware/food/getFoodList");
let { repository } = require("./food_common");

function getFoodById(id) {
  let getFunc = getFood({
    FoodModel: {
      findOne: (obj, cb) => {
        let id = obj["_id"];
        cb(
          undefined,
          repository.find((food) => food._id.toString() === id.toString())
        );
      },
    },
  });
  let locals = {};
  getFunc(
    {
      params: {
        foodid: id,
      },
    },
    {
      locals: locals,
      redirect: () => {
        // recirect called
      },
    },
    () => {
      // next called
    }
  );
  return locals.food;
}

function getAllFoods() {
  let getFunc = getFoodList({
    FoodModel: {
      find: (obj, cb) => {
        cb(undefined, repository);
      },
    },
  });
  let locals = {};
  getFunc(
    {},
    {
      locals: locals,
      redirect: () => {
        // recirect called
      },
    },
    () => {
      // next called
    }
  );
  return locals.foods;
}

Then("The food by ID {int} has name {string}", function (int, string) {
  let food = getFoodById(int);
  assert.equal(
    food["name"],
    string,
    `Food with id ${int}'s name did not equal ${string}, but ${food["name"]}`
  );
});

Then("The food by ID {int} has kcal {int}", function (int, int2) {
  let food = getFoodById(int);
  assert.equal(
    food["kcal"],
    int2,
    `Food with id ${int}'s kcal did not equal ${int2}, but ${food["kcal"]}`
  );
});

Then("The food by ID {int} has lasts {int}", function (int, int2) {
  let food = getFoodById(int);
  assert.equal(
    food["lasts"],
    int2,
    `Food with id ${int}'s lasts did not equal ${int2}, but ${food["lasts"]}`
  );
});

Then("There are {int} foods", function (int) {
  assert.lengthOf(
    getAllFoods(),
    int,
    `Repository has ${
      getAllFoods().length
    } elements instead of the expected ${int}`
  );
});

Then("There is no food by ID {int}", function (int) {
  assert.notInclude(
    getAllFoods(),
    { _id: int },
    `Repository has food with id ${int}`
  );
});

Then("There is a food by ID {int}", function (int) {
  assert(
    getAllFoods().some(
        food => food._id.toString() === int.toString()
    ),
    `Repository has no food with id ${int}`
  );
});
