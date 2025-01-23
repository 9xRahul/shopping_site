const mongoDb = require("mongodb");
const MongoClient = new mongoDb.MongoClient(
  "mongodb+srv://rahul:r002318p@cluster0.jr8q0.mongodb.net/shop?retryWrites=true"
);

let _db;

//CONNECTION USING CALLBACK
const mongoConnect = (callback) => {
  MongoClient.connect()
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No databases found";
};

// const mongoConnect = async () => {
//   try {
//     const client = await MongoClient.connect();
//     console.log("Connection successful");
//     return client.db(); // Replace with your actual database name
//   } catch (err) {
//     console.error("Connection failed:", err);
//     throw err;
//   }
// };

module.exports = { mongoConnect, getDb };
