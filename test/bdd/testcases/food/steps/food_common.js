let repository = [];
let id = 1;

function setid(newid) {
  id = newid
}

class Food {
  name;
  kcal;
  lasts;
  _id;

  save(callback) {
    if (!repository.some(food => food._id.toString() === this._id)) {
      this._id = id;
      repository.push(this);
    }
    callback();
  }
}

module.exports = {
  setid: setid,
  repository: repository,
  Food: Food
};
