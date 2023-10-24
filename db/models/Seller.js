const {db} = require("../")
const { DataTypes } = require("sequelize")
const bcrypt = require("bcrypt-nodejs")
const validator = require("validator")


const Seller = db.define('Seller', {
    // Model attributes are defined here
    SellerId: {
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
      },
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
    DeliverablePinCodes: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue("DeliverablePinCodes", JSON.stringify(val))
      },
      get() {
        return JSON.parse(this.getDataValue("DeliverablePinCodes"))
      },
      validate: {
        notEmpty: true,
        not: {
          msg: "Please Enter Deliverable PIN codes",
          args: '[]'
        },
        isPinCodeArr(val) {
          let arr = JSON.parse(val)
          for (let p of arr ) {
            if (!validator.default.isNumeric(p) || !validator.default.isLength(p, {
              max: 6, min: 6
            })) {
             throw new Error("Please Enter Valid PIN code(s)")
            }
          }
        }
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
      },
      unique: true
    },
    Password: {
      type: DataTypes.STRING,
      set(val) {
        if (!val || typeof val !== 'string' || val === '') {
          return this.setDataValue('Password', null)
        }
        const salt = bcrypt.genSaltSync(10)
        this.setDataValue('Password', bcrypt.hashSync(val, salt))
      },
      validate: {
        notEmpty: true,
      }
    },
  }, {

  })



  module.exports = Seller