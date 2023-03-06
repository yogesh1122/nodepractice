const express = require("express");
const router = express.Router();
const { fakeDataSeed, getUserData, cleanData, getCityWise } = require("../controller/userController");



router.get('/test',(req,res)=>{ res.send("WELCOME TO APP")});
router.get('/getuser',getUserData)
router.get('/getfilter',getCityWise)
router.get('/seedrecord',fakeDataSeed)
router.delete('/cleandb',cleanData)




module.exports = router;