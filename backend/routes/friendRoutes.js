const express=require("express") ;
const { sendFriendRequest,getFriendRequests } =require("../controller/friendController.js");
const protect=require("../middleware/authMiddleware.js")  ;




const router = express.Router();

router.post("/request", protect, sendFriendRequest);
router.get("/requests", protect, getFriendRequests);

module.exports = router;