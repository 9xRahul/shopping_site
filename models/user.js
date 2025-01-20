const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const { type } = require('os')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = User;