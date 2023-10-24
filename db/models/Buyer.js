const { db } = require("../")
const { DataTypes } = require("sequelize")
const { uid } = require("uid");


const Buyer = db.define("Buyer", {
    BuyerId: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    Name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    District: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    },
    Address: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    },
    PinCode: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            len: {
                msg: "Please enter a valid PIN code",
                args: [6, 6]
            },
            isNumeric: true
        }
    },
    MobileNumber: {
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
}, {
    
})



module.exports = Buyer