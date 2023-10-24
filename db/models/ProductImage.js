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
        type: DataTypes.BLOB
    }
})


module.exports = ProductImage