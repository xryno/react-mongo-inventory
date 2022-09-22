const {Sequelize, DataTypes} = require("sequelize")
const { db } = require("../db")

const Item = db.define("item", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING
    },

    price: {

        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    description: {

        type: DataTypes.STRING,
        allowNull: false
    },

    category:  {

        type: DataTypes.STRING,
        allowNull: false
    },

    image: {

        type: DataTypes.STRING,
        allowNull: false
    }


})

module.exports = { Item };
