const router = require('express').Router()
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const productFns = require("../../controllers/product")

router.post("/add", upload.single("image"), productFns.addProduct)
router.get("/view-image/:imageId", productFns.viewProductImage)
router.get("/list-seller/:sellerId", productFns.listProductsSeller)
router.post("/edit", upload.single("image"), productFns.editProduct)
router.post("/delete", productFns.deleteProduct)

module.exports = router