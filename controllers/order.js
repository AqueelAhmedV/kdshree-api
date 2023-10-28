const { Op } = require("sequelize")
const { db } = require("../db")
const { uid } = require("uid")

// @route: /list
// @method: POST
// Seller route
exports.getOrdersBySeller = async (req, res) => {
    let { sellerId, from, to, pinCodes } = req.body

    
    try {
        // let orders = await db.model("Order").findAll({
        //     where: {
        //        SellerId: sellerId,
        //        createdAt: {
        //         [Op.between]: [from, to]
        //        },
        //        PinCode: pinCode,
        //     }
        // })
        let orders = db.model("Order").findAll({
            where: {
                createdAt: {
                    [Op.between]: [from, to]
                },
                BuyerPinCode: {
                    [Op.in]: pinCodes
                }
            },
            include: [
                {
                    model: db.model("Product"),
                    where: {
                        SellerId: sellerId
                    },
                    attributes: ["ProductName", "ProductionUnit"],
                    association: db.model("Product").Orders
                },
            ],
        })

        
        
        if (!orders)
            return res.status(404).json({msg: "No orders found"})
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
}


// @method: POST
// @route: /place-order
// Buyer route
exports.placeOrder = async (req, res) => {
    console.log(req.body)
    try {
        let newOrder = await db.model("Order").create({
            OrderId: "O" + uid(5),
            ...req.body
        })
        res.status(200).json({msg: "Succesfully placed order", newOrder})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

