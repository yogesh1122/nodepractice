const router = require('express').Router()
const { createproduct, addToCart, cartShow, checkOut } = require("../controller/productController")

// Product router

router.post('/createproduct',createproduct)
router.post('/addtocart',addToCart) 
router.get('/cartshow',cartShow) 
router.post('/checkout',checkOut) 


module.exports = router;