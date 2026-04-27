const FriendRequest =require("../models/FriendRequest.js");
const User=require("../models/User.js") ;


const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await FriendRequest.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "name email");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send Friend Request
 const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { email } = req.body;

    // Find receiver
    const receiver = await User.findOne({ email });

    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent self request
    if (receiver._id.toString() === senderId.toString()) {
      return res.status(400).json({ message: "You cannot add yourself" });
    }

    // Check existing request
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiver._id,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    // Create request
    const request = await FriendRequest.create({
      sender: senderId,
      receiver: receiver._id,
    });

    res.status(201).json({
      message: "Friend request sent",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={sendFriendRequest,getFriendRequests}