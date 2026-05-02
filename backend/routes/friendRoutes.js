const express = require("express");
const {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendsList,
  removeFriend,
} = require("../controller/friendController.js");
const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/request", protect, sendFriendRequest);
router.get("/requests", protect, getFriendRequests);
router.put("/accept/:id", protect, acceptFriendRequest);
router.put("/reject/:id", protect, rejectFriendRequest);
router.get("/list", protect, getFriendsList);
router.delete("/remove/:friendId", protect, removeFriend);

module.exports = router;
