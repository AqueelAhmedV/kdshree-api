const {db} = require("../")
const { DataTypes } = require("sequelize")
const { uid } = require("uid")

const Order = db.define("Order", {
    OrderId: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    BuyerId: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
        references: {
            model: "Buyers",
            key: "BuyerId"
        }
    },
    ProductId: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
        references: {
            model: "Products",
            key: "ProductId"
        }
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})



module.exports = Order