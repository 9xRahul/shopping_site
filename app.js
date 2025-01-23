const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { mongoConnect } = require("./util/database");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//CONNECTION USING CALLBACK
mongoConnect(() => {
  app.listen(3000);
});

// const startServer = async () => {
//   try {
//     const db = await mongoConnect(); // Wait for DB connection
//     console.log("Database instance:", db.databaseName);

//     app.listen(3000, () => {
//       console.log("Server is running on port 3000");
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err);
//   }
// };

//startServer();
