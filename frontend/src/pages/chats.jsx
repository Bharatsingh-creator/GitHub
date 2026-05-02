import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import axios from "axios";
import socket from "../socket";

const Chats = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");

  const userDataRaw =
    localStorage.getItem("user") || localStorage.getItem("userInfo");
  const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
  const token = userData?.token;
  const userId = userData?._id;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // 🔥 Fetch friends
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (!token) {
          setFriends([]);
          return;
        }

        const { data } = await axios.get(
          "http://localhost:5000/api/friends/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFriends(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFriends();
  }, [token]);

  // 🔌 Socket setup
  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
    }

    socket.on("receiveMessage", (data) => {
      const { senderId } = data;

      setMessages((prev) => ({
        ...prev,
        [senderId]: [...(prev[senderId] || []), data],
      }));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId]);

  // 📤 Send message
  const sendMessage = () => {
    if (!message || !selectedFriend) return;

    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: selectedFriend._id,
      message,
    });

    // ✅ correct structure
    setMessages((prev) => ({
      ...prev,
      [selectedFriend._id]: [
        ...(prev[selectedFriend._id] || []),
        { senderId: userId, message },
      ],
    }));

    setMessage("");
  };

  return (
    <div className="flex min-h-screen bg-black w-full overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-h-screen bg-black">
        <Navbar onMenuClick={toggleSidebar} />

        <main className="p-4 md:p-6 text-white font-poppins flex flex-col md:flex-row gap-4 h-full">

          {/* LEFT: Friends */}
          <div className="w-full md:w-1/4 bg-gray-900 rounded-xl p-4">
            <h2 className="mb-4 text-lg font-semibold">Friends</h2>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {friends.length === 0 ? (
                <p className="text-gray-400">No friends yet</p>
              ) : (
                friends.map((friend) => (
                  <div
                    key={friend._id}
                    onClick={() => setSelectedFriend(friend)} // ❌ removed reset
                    className={`p-2 rounded cursor-pointer transition-all ${
                      selectedFriend?._id === friend._id
                        ? "bg-blue-600"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {friend.name}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: Chat */}
          <div className="flex-1 flex flex-col bg-gray-900 rounded-xl p-4">
            
            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
              {!selectedFriend ? (
                <p className="text-gray-400">
                  Select a friend to start chatting
                </p>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">
                    Chat with {selectedFriend.name}
                  </h3>

                  {(messages[selectedFriend._id] || []).map((msg, index) => (
                    <div
                      key={index}
                      className={`${
                        msg.senderId === userId
                          ? "text-blue-400 text-right"
                          : "text-green-400"
                      }`}
                    >
                      {msg.message}
                    </div>
                  ))}
                </>
              )}
            </div>

            {selectedFriend && (
              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-3 bg-gray-800 rounded outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 px-4 rounded"
                >
                  Send
                </button>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Chats;
