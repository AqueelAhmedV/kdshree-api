const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
// const mailRoutes = require('./routes/mail') 
// const analyticsRoutes = require("./api/routes/analytics")
const productRoutes = require("./api/routes/product")
const sellerRoutes = require("./api/routes/seller")
const bodyParser = require('body-parser')
const {db, intializeDb} = require("./db")
const fs = require("fs")

app.use(cors({
    origin: "*",
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
})



app.use('/api/seller', (_,_res,next) => {console.log("here"); next()}, sellerRoutes)
app.use("/api/product", productRoutes)

app.get("/version", (req, res) => {
    res.send({version: "1.0.0"})
})

for (model of ["Product.js", "Seller.js", "Buyer.js", "ProductImage.js" , "Order.js", ])
  require(`./db/models/${model}`)

// sync all models and insert sample data
intializeDb(db, true)
.then(({msg}) => {
    console.info(msg)
    app.listen(port, () => {
        console.info(`Server listening on port ${port}`)
    })
    
})
.catch(console.log)
