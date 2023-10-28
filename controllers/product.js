const { db } = require('../db')
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const { uid } = require('uid');


exports.addProduct = async (req, res) => {
    console.log(req)
    let newProduct = JSON.parse(req.body.newProduct)
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Create a new image record in the database
        const uploadedImage = await db.model("ProductImage").create({
            ImageId: "I" + uid(5), // You can customize this as needed
            ImageData: req.file.buffer,
            MimeType: req.file.mimetype
        });
        let addedProduct = await db.model("Product").create({
            ProductId: "P" + uid(5),
            ...newProduct,
            ImageId: uploadedImage.ImageId
        })
        res.status(200).json({msg: "Succesfully added product", addedProduct})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


// @method POST
// @route /edit
exports.editProduct = async (req, res) => {
    let newProduct = JSON.parse(req.body.newProduct)
    // console.log(req)
    try {
        if (!req.file) 
            console.log("image not updated")
        else {
            let updatedImage = await db.model("ProductImage").update({
                ImageData: req.file.buffer,
                MimeType: req.file.mimetype
            }, {
                where: {
                    ImageId: newProduct.ImageId
                }
            })
        }
        let editedProduct = await db.model("Product").update({
            ...newProduct
        }, {
            where: {
                ProductId: newProduct.ProductId
            }
        })
        res.status(200).json({msg: "Product updated", editedProduct})
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "Error: Update product", err})
    }
}

// @method POST
// @route /delete
exports.deleteProduct = async (req, res) => {
    try {
        let deleted = await db.model("Product").destroy({
            where: {
                ProductId: req.body.ProductId,
            }
        })
        let deleteImage = await db.model("ProductImage").destroy({
            where: {
                ImageId: req.body.ImageId
            }
        })
        res.status(200).json({msg: "Product deleted"})
    } catch (err) {
        console.log(err)
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
            },
        })
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
}



// @method: POST
// @route /list-buyer
exports.listProductsBuyer = async (req, res) => {
    let { searchStr, pinCode, limit } = req.body
    console.log(req.body)
    try {
        let products = await db.model("Product").findAll({
            where: {
                ProductName: {
                    [Op.like]: `%${searchStr}%`
                }
            },
            include: [
                {
                    model: db.model("Seller"),
                    where: {
                        DeliverablePinCodes: {
                            [Op.substring]: pinCode 
                        }
                    },
                    association: db.model("Seller").Products
                }
            ],
            limit: limit
        })
        res.status(200).json(products)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// // @method POST
// // @route /upload-image
// exports.uploadProductImage = async (req, res) => {
//     console.log("inside uploadProductImage")
//     console.log(req)
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         // Create a new image record in the database
//         const uploadedImage = await db.model("ProductImage").create({
//             ImageId: "I" + uid(5), // You can customize this as needed
//             ImageData: req.file.buffer,
//             MimeType: req.file.mimetype
//         });

//         return res.status(201).json({msg: "Upload Successful", ImageId: uploadedImage.ImageId});
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error uploading image' });
//     }    
// }

// @route GET
// /view-image/:imageId
exports.viewProductImage = async (req, res) => {
    try {
        let productImage = await db.model("ProductImage").findOne({
            where: {
                ImageId: req.params.imageId
            }
        })
        if (!productImage)
            return res.status(404).json({msg: "Image with given id not found"})
        res.set("Content-Type", productImage.MimeType)
        res.send(productImage.ImageData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
// // @method POST
// // @route /update-image
// exports.updateProductImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }
//         let updatedImage = await db.model("ProductImage").update({
//             ImageData: req.file.buffer,
//             MimeType: req.file.mimetype
//         },{
//             where: {
//                 ImageId: req.body.imageId
//             }
//         })
//         if (!!!updatedImage) {
//             res.status(404).json({msg: "No such image"})
//         }
//         res.status(201).json({msg: "image updated"})
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err)
//     }
// }

