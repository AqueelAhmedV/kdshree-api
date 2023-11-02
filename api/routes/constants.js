const router = require('express').Router()
const constantFns = require('../../controllers/constants')

router.get('/categories', constantFns.getCategories)

module.exports = router