const express=require('express');
const router = express.Router();

const  getUserProfile =require("../controller/userController.js") ;
const protect=require("../middleware/authMiddleware.js");

router.get('/profile', protect, getUserProfile);

module.exports=router