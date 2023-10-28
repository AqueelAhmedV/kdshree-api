const router = require("express").Router()
const orderFns = require("../../controllers/order")

router.post("/place-order", orderFns.placeOrder)
router.post("/list", orderFns.getOrdersBySeller)

module.exports = router