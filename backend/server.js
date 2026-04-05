const connectDB=require('./config/db.js')
const authRoutes=require('./routes/authRoutes.js')

const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()

const app=express()

connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)

app.get('/',(req,res)=>{
    res.send("Dev_Sync API is running......")
})

app.listen(5000,()=>{
    console.log("Server is running on 5000 port")
})