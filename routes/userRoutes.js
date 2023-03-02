const express = require("express");
const router = express.Router();
const { fakeDataSeed, getUserData, cleanData } = require("../controller/userController");



router.get('/test',(req,res)=>{ res.send("WELCOME TO APP")});
router.get('/getuser',getUserData)
router.get('/seedrecord',fakeDataSeed)
router.delete('/cleandb',cleanData)




module.exports = router;