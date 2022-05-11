const { When, Then, Given } = require("@cucumber/cucumber");
const { assert } = require("chai");
const saveBunker = require("../../../../../middleware/bunker/saveBunker");
let { repository, Bunker } = require("./bunker_common");

When(
  "I change the name of bunker ID {int} to {string}",
  function (int, string) {
    let save = saveBunker({
      BunkerModel: Bunker,
    });

    let bunker = repository.find(
        bunk => bunk._id.toString() === int.toString()
    )

    save(
      {
        body: {
            name: string,
            adress: bunker.adress,
            capacity: bunker.capacity
        },
      },
      {
        locals: {
            bunker: bunker
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
