import React from "react";
import logo from "../assets/icons8-github-copilot-94.png";
import photo from "../assets/Hand coding.gif";
import apple from "../assets/icons8-apple-logo-50.png";
import google from "../assets/icons8-google-logo-48.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password,
          confirmPassword,
        },
      );
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen w-full font-poppins">
      {/* LEFT SECTION (GIF)
        
      */}
      <div className="hidden md:flex md:w-1/2 h-screen items-center justify-center p-10  sticky top-0">
        <img
          src={photo}
          alt="illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>

      {/* RIGHT SECTION (FORM)
    
      */}
      <div className="flex-1 flex flex-col items-center  px-4 overflow-y-auto">
        {/* Your Logo */}
        <img src={logo} alt="logo" className="w-16 md:w-24 h-auto" />

        {/* Your Heading */}
        <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-center mt-4">
          Welcome to
          <span className="text-[#64748B]"> &lt;</span>
          <span className="text-[#308cc5]">Dev</span>
          <span className="text-[#C1121F]">Sync</span>
          <span className="text-[#64748B]">/&gt;</span>
        </h1>

        <h5 className="text-gray-400 text-sm md:text-lg mb-8">
          Let's register your account first
        </h5>

        {/* Form Inputs (Grouped for easier management) */}
        <div className="w-full max-w-sm flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold text-gray-700 text-sm md:text-base">
              Full Name
            </h5>
            <input
              type="email"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 outline-0 p-3 md:p-4 rounded-md focus:border-[#308cc5] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold text-gray-700 text-sm md:text-base">
              Email Address
            </h5>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 outline-0 p-3 md:p-4 rounded-md focus:border-[#308cc5] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="font-semibold text-gray-700 text-sm md:text-base">
              Password
            </h5>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 outline-0 p-3 md:p-4 rounded-md focus:border-[#308cc5] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold text-gray-700 text-sm md:text-base">
              Confirm Password
            </h5>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-200 outline-0 p-3 md:p-4 rounded-md focus:border-[#308cc5] transition-all"
            />
          </div>

          <button
            disabled={loading}
            onClick={handlesubmit}
            className="w-full bg-[#0015ff] text-white font-bold py-3 md:py-4 rounded-md mt-4 hover:brightness-110 transition-all hover:cursor-pointer"
          >
            {loading ? "Logging in..." : "Register"}
          </button>
        </div>

        <div className="flex flex-col  w-full max-w-sm">
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have account?
            <Link to="/" className="text-[#ff0000] font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
