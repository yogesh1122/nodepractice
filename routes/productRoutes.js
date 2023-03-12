const router = require('express').Router()
const { createproduct } = require("../controller/productController")

// Product router

router.post('/createproduct',createproduct)

module.exports = router;