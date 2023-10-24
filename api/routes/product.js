const router = require('express').Router()
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const productFns = require("../../controllers/product")

router.post("/upload-image", upload.single("image"), productFns.uploadProductImage)


module.exports = router