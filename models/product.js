const { mongoConnect, getDb } = require("../util/database.js");

const { mongoDB, ObjectId } = require("mongodb");

class Product {
  constructor(title, description, price, imageUrl, id) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      console.log("****************");
      let objId = this._id;
      console.log("****************");
      console.log(objId);
      dbOp = db
        .collection("products")
        .updateOne({ _id: objId }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    const objId = ObjectId.createFromHexString(id);
    console.log(objId);
    return db
      .collection("products")
      .find({ _id: objId })
      .next()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
