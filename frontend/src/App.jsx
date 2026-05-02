import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Friends from "./pages/friends";
import Chat from "./pages/chats";
import Tasks from "./pages/task";
import Notes from "./pages/notes";
import OAuthSuccess from "./pages/oath-success";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/friends" element={<Friends />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/task" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
    </Routes>
  );
}

export default App;
