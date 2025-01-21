const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const OrderItems = sequelize.define("orderitems", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItems;
