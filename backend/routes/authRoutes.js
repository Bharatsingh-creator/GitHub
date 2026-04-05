const express =require('express')
const{registerUSer,loginUser}=require('..controller/authController.js')


const router=express.Router()

router.post("/register",registerUSer)
router.post("/login",loginUser)

module.exports=router