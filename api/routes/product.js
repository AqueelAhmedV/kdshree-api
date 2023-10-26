const router = require('express').Router()
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const productFns = require("../../controllers/product")

router.post("/upload-image", upload.single("image"), productFns.uploadProductImage)
router.post("/add", productFns.addProduct)
router.get("/view-image/:imageId", productFns.viewProductImage)
router.get("/list-seller/:sellerId", productFns.listProductsSeller)
router.post("/edit", productFns.editProduct)
router.post("/update-image", upload.single("image"),productFns.updateProductImage)

module.exports = router