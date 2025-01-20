const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false, // It is a good practice to set allowNull explicitly
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
});

module.exports = Product;
