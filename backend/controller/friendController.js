const FriendRequest =require("../models/FriendRequest.js");
const User=require("../models/user.js") ;


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

 const acceptFriendRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Only receiver can accept
    if (request.receiver.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update status
    request.status = "accepted";
    await request.save();

    // Add to friends list
    await User.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: request.receiver },
    });

    await User.findByIdAndUpdate(request.receiver, {
      $addToSet: { friends: request.sender },
    });

    res.json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const rejectFriendRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.user._id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.receiver.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFriendsList = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate(
      "friends",
      "name email"
    );

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={sendFriendRequest,getFriendRequests,acceptFriendRequest,rejectFriendRequest,getFriendsList}
