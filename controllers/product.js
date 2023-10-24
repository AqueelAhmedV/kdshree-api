const { db } = require('../db')
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const { uid } = require('uid');


exports.addProduct = async (req, res) => {
    try {
        let newProduct = await db.model("Product").create({
            ProductId: "P" + uid(5),
            ...req.body,
        })
        res.status(200).json({msg: "Succesfully placed order", newProduct})
    } catch (err) {
        res.status(500).json(err)
    }
}

// @method GET
// @route /list-seller/:sellerId
exports.listProductsSeller = async (req, res) => {
    try {
        let products = await db.model("Product").findAll({
            where: {
                SellerId: req.params.sellerId
            }
        })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.editProduct = async (req, res) => {
    try {
        let editedProduct = await db.model("Product").update({
            ...req.body
        }, {
            where: {
                ProductId: req.body.ProductId
            }
        })
        res.status(200).json({msg: "Product updated", editedProduct})
    } catch (err) {
        res.status(500).json({msg: "Error: Update product", err})
    }
}


// @method: POST
// @route /list-buyer
exports.listProductsBuyer = async (req, res) => {
    let { searchStr, pinCode, limit } = req.body
    try {
        let products = await db.model("Product").findAll({
            where: {
                ProductName: {
                    [Op.like]: `%${searchStr}%`
                }
            },
            include: [
                {
                    model: "Seller",
                    where: {
                        DeliverablePinCodes: {
                            [Op.substring]: pinCode 
                        }
                    }
                }
            ],
            limit: limit
        })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
}

// @method POST
// @route /image-upload
exports.uploadProductImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Create a new image record in the database
        const uploadedImage = await db.model("ProductImage").create({
            ImageId: "I" + uid(5), // You can customize this as needed
            Data: req.file.buffer,
        });

        return res.status(201).json({msg: "Upload Successful", ImageId: uploadedImage.ImageId});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error uploading image' });
    }    
}
 

