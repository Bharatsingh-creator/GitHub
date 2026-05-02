require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const friendRoutes = require("./routes/friendRoutes.js");
const passport = require("./config/passport.js");
const session = require("express-session");
const cors = require("cors");

// 🔥 CREATE APP FIRST
const app = express();

// 🔥 THEN create server
const server = http.createServer(app);

// 🔥 THEN socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Dev_Sync API is running......");
});

// 🔌 Socket logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    io.to(receiverId).emit("receiveMessage", {
      senderId,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 🔥 Start server
server.listen(5000, () => {
  console.log("Server running on port 5000");
});