let repository = [];
let id = 1;

function setid(newid) {
  id = newid
}

class StorageItem {
  type;
  quantity;
  expirationDate;
  sumCalories;
  _id;

  constructor(params) {
      this.quantity = parseInt(params.quantity)
  }

  save(callback) {
    if (!repository.some(storageitem => storageitem._id.toString() === this._id)) {
      this._id = id;
      repository.push(this);
    }
    callback();
  }
}

module.exports = {
  setid: setid,
  repository: repository,
  StorageItem: StorageItem
};
