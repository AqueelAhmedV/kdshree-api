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
    },
    BuyerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    BuyerAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    BuyerMobileNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            len: {
            msg: "Please enter a valid mobile number",
            args: [10, 10]
            },
            isNumeric: true
        }
    },
    BuyerPinCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

db.model("Product").Orders = db.model("Product").hasMany(Order, {
    foreignKey: "ProductId"
})

module.exports = Order