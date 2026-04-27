require("dotenv").config();

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const friendRoutes =require("./routes/friendRoutes.js")
const dns = require("node:dns/promises").setServers(["8.8.8.8", "8.8.4.4"]);
const passport = require("./config/passport.js");
const session = require("express-session");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Dev_Sync API is running......");
});

app.listen(5000, () => {
  console.log("Server is running on 5000 port");
});
