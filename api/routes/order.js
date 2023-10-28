const router = require("express").Router()
const orderFns = require("../../controllers/order")

router.post("/place-order", orderFns.placeOrder)

module.exports = router