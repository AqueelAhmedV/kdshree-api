const {db} = require("../")
const { DataTypes } = require("sequelize")
const { uid } = require("uid")

const Product = db.define("Product", {
    ProductId: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    SellerId: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
        references: {
            model: "Seller",
            key: "SellerId"
        }
    },
    ProductName: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    Description: {
        type: DataTypes.STRING,
    },
    ProductionUnit: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    Category: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    MRP: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    OfferPrice: {
        type: DataTypes.DOUBLE
    },
    Availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    ImageId: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
        references: {
            model: "ProductImage",
            key: "ImageId"
        }
    }
})



module.exports = Product