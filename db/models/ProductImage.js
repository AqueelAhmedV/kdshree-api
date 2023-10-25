const {db} = require("..")
const { DataTypes } = require("sequelize")

const ProductImage = db.define("ProductImage", {
    ImageId: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    ImageData: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    MimeType: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    } 
})


module.exports = ProductImage