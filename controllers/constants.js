const categories = require("../constants/categories")
const {db} = require("../db")

// @method GET
// @route /sample-user
exports.getCategories = async (req, res) => {
    try {
        return res.status(200).json(categories)
    } catch (err) {
        res.status(500).json(err)
    }
}