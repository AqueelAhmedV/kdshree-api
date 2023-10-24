const {db} = require("../db")

// @method GET
// @route /sample-user
exports.getSampleUser = async (req, res) => {
    try {
        let user = await db.model("User").findOne({where: {
            Email: "test.aqueel.v@gmail.com"
        }})
        console.log(user)
        if (!user) 
            return res.status(404).json({msg: "No sample user"})
        return res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}