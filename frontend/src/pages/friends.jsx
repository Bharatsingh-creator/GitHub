import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import axios from "axios";

const Chats = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [removingFriendId, setRemovingFriendId] = useState(null);

  const token =
    JSON.parse(localStorage.getItem("user"))?.token ||
    JSON.parse(localStorage.getItem("userInfo"))?.token;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const friendsRes = await axios.get(
          "http://localhost:5000/api/friends/list",
          config,
        );

        const requestRes = await axios.get(
          "http://localhost:5000/api/friends/requests",
          config,
        );

        setFriends(friendsRes.data);
        setRequests(requestRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const sendRequest = async () => {
    if (!email) return;
    if (!token) {
      alert("Please log in again");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/friends/request",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Request sent");
      setEmail("");
    } catch (error) {
      alert(error.response?.data?.message || "Error sending request");
    }
  };

  const handleAccept = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/friends/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // remove from pending
      setRequests((prev) => prev.filter((r) => r._id !== id));

      // 🔥 ADD TO FRIENDS LIST
      setFriends((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/friends/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // remove from UI instantly
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    if (!token) {
      alert("Please log in again");
      return;
    }

    const shouldRemove = window.confirm(
      "Are you sure you want to remove this friend?"
    );

    if (!shouldRemove) return;

    try {
      setRemovingFriendId(friendId);

      await axios.delete(`http://localhost:5000/api/friends/remove/${friendId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFriends((prev) => prev.filter((f) => f._id !== friendId));
    } catch (error) {
      alert(error.response?.data?.message || "Could not remove friend");
    } finally {
      setRemovingFriendId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-black w-full overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-h-screen bg-black">
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <main className="p-4 md:p-6 text-white font-poppins">
          <h1 className="text-2xl font-bold">Friends</h1>
        </main>
        <div className="text-white font-poppins h-full flex flex-col">
          {/* Top Tabs */}
          <div className="flex items-center gap-4 border-b border-gray-800 pb-3 ">
            {["all", "pending", "add"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl capitalize ${
                  activeTab === tab
                    ? "bg-gray-700 hover:cusor-pointer"
                    : "hover:bg-gray-800 text-gray-400 hover:cursor-pointer ml-2 "
                }`}
              >
                {tab === "add" ? "Add Friend" : tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 mt-4 ml-2">
            {/* ALL FRIENDS */}
            {activeTab === "all" && (
              <div>
                <h2 className="text-lg mb-3 text-gray-400">All Friends</h2>

                {friends.length === 0 ? (
                  <p className="text-gray-500">No friends yet</p>
                ) : (
                  friends.map((f) => (
                    <div
                      key={f._id}
                      className="bg-gray-800 p-4 rounded-lg mb-2 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{f.name}</p>
                        <p className="text-sm text-gray-400">{f.email}</p>
                      </div>

                      <button
                        onClick={() => handleRemoveFriend(f._id)}
                        disabled={removingFriendId === f._id}
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {removingFriendId === f._id ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* PENDING REQUESTS */}
            {activeTab === "pending" && (
              <div>
                <h2 className="text-lg mb-3 text-gray-400">Pending Requests</h2>

                {requests.length === 0 ? (
                  <p className="text-gray-500">No requests</p>
                ) : (
                  requests.map((r) => (
                    <div
                      key={r._id}
                      className="bg-gray-800 p-4 rounded-lg mb-2 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{r.sender.name}</p>
                        <p className="text-sm text-gray-400">
                          {r.sender.email}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(r._id)}
                          className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 hover:cursor-pointer"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleReject(r._id)}
                          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ADD FRIEND */}
            {activeTab === "add" && (
              <div>
                <h2 className="text-lg mb-3 text-gray-400">Add Friend</h2>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 p-3 rounded bg-gray-800 outline-none"
                  />

                  <button
                    onClick={sendRequest}
                    className="bg-blue-600 px-4 rounded hover:cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
