const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const saveBunker = require("../../../../../middleware/bunker/saveBunker");
let { repository, Bunker, setid } = require("./bunker_common");

let locals = {};

Given("There are no bunkers", function () {
  repository.splice(0);
});

When("I create the following bunkers:", function (dataTable) {
  let save = saveBunker({
    BunkerModel: Bunker,
  });

  for (let row of dataTable.hashes()) {
    let bunker = {};
    for (let key in row) {
      bunker[key] = row[key];
    }
    setid(bunker["_id"]);
    save(
      {
        body: bunker,
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
    // a new bunker is created if locals.bunker is undefined
    locals = {};
  }
});
