const router = require('express').Router()
const sellerFns = require("../../controllers/seller")

router.post("/verify-phone", sellerFns.verifyPhoneNumber)
router.post("/register", sellerFns.register)
router.post("/login", sellerFns.login)

module.exports = router