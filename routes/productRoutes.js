const router = require('express').Router()
const { createproduct, addToCart, cartShow } = require("../controller/productController")

// Product router

router.post('/createproduct',createproduct)
router.post('/addtocart',addToCart) 
router.get('/cartshow',cartShow) 

module.exports = router;