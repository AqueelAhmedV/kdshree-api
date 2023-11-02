const { Op } = require('sequelize');
const {db} = require('../db');
const { uid } = require('uid');
const bcrypt = require("bcryptjs")


// @method POST
// @route /account/edit
exports.editAccount = async (req, res) => {
    console.log(req.body)
    try {
        let editedSeller = await db.model("Seller").update(req.body, {
            where: {
                SellerId: req.body.SellerId
            },
            returning: true,
        })
        res.status(200).json({ msg: "Account edited", editedSeller })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
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