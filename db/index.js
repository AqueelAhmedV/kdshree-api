const { Sequelize,  } = require("sequelize")
const fs = require("fs")
const sqlite = require("sqlite3");
const path = require("path");
const { uid } = require("uid");


const db = new Sequelize({
  dialect: 'sqlite',
  storage: "./db/db.sqlite",
  dialectModule: sqlite,
});


function intializeDb(db, isForced) {
  return new Promise(async (resolve, reject) => {
      try {
          let syncedDb = await db.sync({force: isForced, logging: false})
          const { Seller } = syncedDb.models
          try {
         let testSeller =  await Seller.create({
            SellerId: "S"+uid(5),
            Name: "Sam",
            District: "Malappuram",
            Address: "XYZ",
            DeliverablePinCodes: ["676123", "123456"],
            MobileNumber: "1234567890",
            Password: "homeshop"
        }, {
            // logging: false
          })} catch (error) {console.log(error)}
          resolve({msg: "All models synced"})
      } catch (err) {
          reject(err)
      }
  })
}

module.exports = {db, intializeDb};