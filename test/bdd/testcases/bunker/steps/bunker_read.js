const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const getBunker = require("../../../../../middleware/bunker/getBunker");
const getBunkerList = require("../../../../../middleware/bunker/getBunkerList");
let { repository } = require("./bunker_common");

function getBunkerById(id) {
  let getFunc = getBunker({
    BunkerModel: {
      findOne: (obj) => {
        let id = obj["_id"];
        let returnObj = {
          populate: (str) => {
            return {
              exec: (cb) => {
                cb(
                  undefined,
                  repository.find(
                    (bunker) => bunker._id.toString() === id.toString()
                  )
                );
              },
            };
          },
        };
        return returnObj;
      },
    },
  });
  let locals = {};
  getFunc(
    {
      params: {
        bunkerid: id,
      },
    },
    {
      locals: locals,
      redirect: () => {
          // recirect called
      }
    },
    () => {
      // next called
    }
  );
  return locals.bunker;
}

function getAllBunkers() {
  let getFunc = getBunkerList({
    BunkerModel: {
      find: (obj) => {
        return {
          exec: () => {
            return {
              then: (cb) => {
                cb(repository);
                return {
                  catch: (err) => {
                    // then catch called
                  },
                };
              },
            };
          },
        };
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
      }
    },
    () => {
      // next called
    }
  );
  return locals.bunkers;
}

Then("The bunker with ID {int} has adress {string}", function (int, string) {
  let bunker = getBunkerById(int);
  assert.equal(
    bunker["adress"],
    string,
    `Bunker with id ${int}'s adress did not equal ${string}, but ${bunker["adress"]}`
  );
});

Then("The bunker with ID {int} has name {string}", function (int, string) {
  let bunker = getBunkerById(int);
  assert.equal(
    bunker["name"],
    string,
    `Bunker with id ${int}'s name did not equal ${string}, but ${bunker["name"]}`
  );
});

Then("The bunker with ID {int} has capacity {int}", function (int, int2) {
  let bunker = getBunkerById(int);
  assert.equal(
    bunker["capacity"],
    int2,
    `Bunker with id ${int}'s capacity did not equal ${int2}, but ${bunker["capacity"]}`
  );
});

Then("The bunker with ID {int} has stock_dur {int}", function (int, int2) {
  let bunker = getBunkerById(int);
  assert.equal(
    bunker["stock_dur"],
    int2,
    `Bunker with id ${int}'s stock_dur did not equal ${int2}, but ${bunker["stock_dur"]}`
  );
});

Then("The bunker with ID {int} has nextExpDate {string}", function (int, string) {
  let bunker = getBunkerById(int);
  assert.equal(
    bunker["nextExpDate"],
    string,
    `Bunker with id ${int}'s nextExpDate did not equal ${string}, but ${bunker["nextExpDate"]}`
  );
});

Then("There are {int} bunkers", function (int) {
  assert.lengthOf(
    getAllBunkers(),
    int,
    `Repository has ${
      getAllBunkers().length
    } elements instead of the expected ${int}`
  );
});

Then("There is no bunker with ID {int}", function (int) {
  assert.notInclude(
    getAllBunkers(),
    { _id: int },
    `Repository has bunker with id ${int}`
  );
});

Then("There is a bunker with ID {int}", function (int) {
  assert(
    getAllBunkers().some(
        bunker => bunker._id.toString() === int.toString()
    ),
    `Repository has no bunker with id ${int}`
  );
});
