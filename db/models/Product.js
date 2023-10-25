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
            model: "Sellers",
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
    }
})

Product.beforeCreate(async (product, _opts) => {
    let uploadedImage = await db.model("ProductImage").findOne({
        where: {
            ImageId: product.ImageId
        }
    })
    if (!uploadedImage)
        throw new Error("Invalid Image Id, Image not found in database")
})

module.exports = Product