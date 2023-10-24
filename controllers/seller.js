const { Op } = require('sequelize');
const {db} = require('../db');
const { uid } = require('uid');
const bcrypt = require("bcrypt")

// @method GET
// @route /list/:userId
exports.listAllUserClients = async (req, res) => {
    try {
        console.log("here", req.params)
        let clients = await db.model("Client").findAll({
            where: {
                UserId: req.params.userId
            }
        })
        // console.log(clients)
        // console.log(db.models)
        if (!clients || clients.length === 0)
            return res.status(404).json({msg: "No clients yet"})
        return res.status(200).json(clients.map(c => c.dataValues))
    } catch (err) {
        res.status(500).json(err)
    }
}


// @method POST
// @route /login
exports.login = async (req, res) => {
    try {
        let seller = await db.model("Seller").findOne({
            where: {
                MobileNumber: req.body.mobileNumber
            }
        })
        let passwordMatch = await bcrypt.compare(req.body.password, seller.Password)
        if (passwordMatch) {
            res.status(200).json({msg: "Login Successfull", seller})
        } else {
            res.status(401).json({msg: "Authentication failed"})
        }
    } catch (err) {
        res.status(500).json(err)
    }
} 

// @method POST
// @route /register
exports.register = async (req, res) => {
    try {
        console.log(req.body)
        let newSeller = await db.model("Seller").create({
            SellerId: "S"+uid(5),
            ...req.body
        })
        res.status(200).json({msg: "Succesfully registered seller", newSeller})
    } catch (err) {
        res.status(500).json(err)
    }
}



// @method: POST
// @route: /verify-phone
exports.verifyPhoneNumber = async (req, res) => {
    try {
        console.log(req.body)
        let existingUser = await db.model("Seller").findOne({
            where: {
                MobileNumber: req.body.mobileNumber
            }
        })
        if (!existingUser)
            return res.status(404).json({msg: "No existing seller"})
        else {
            return res.status(200).json({msg: "Seller found"})
        }        
    } catch (err) {
        res.status(500).json(err)
    }
}