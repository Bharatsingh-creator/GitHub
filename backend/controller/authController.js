const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail.js");
// Token Generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register Logic
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
    });

    const registerHTML = `
<div style="font-family: Arial; padding: 20px;">
  <h2 style="color: #4CAF50;">Welcome to DevSync 🚀</h2>
  <p>Hello <b>${user.name}</b>,</p>
  <p>Your account has been successfully created.</p>

  <p><b>📅 Time:</b> ${new Date().toLocaleString()}</p>

  <p style="margin-top:20px;">
    We're excited to have you onboard 🎉
  </p>

  <hr/>
  <p style="font-size:12px;color:gray;">DevSync Team</p>
</div>
`;

    await sendEmail(
      user.email,
      "Welcome to DevSync 🚀",
      "",
      registerHTML
    );

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {res.status(500).json({ message: error.message });
  }
};

// Login Logic

const loginUser = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  let location = "Unknown";

  try {
    const response = await axios.get(
      `http://ip-api.com/json/${ip}?fields=status,city,country`,
    );
    if (response.data.status === "success") {
      location = `${response.data.city}, ${response.data.country}`;
    }
  } catch (err) {
    console.log("Location fetch failed");
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const loginTime = new Date().toLocaleString();
      const device = req.headers["user-agent"];

const loginHTML = `
<div style="font-family: Arial; padding: 20px;">
  <h2 style="color: #ff4d4f;">New Login Alert 🚨</h2>
  
  <p>Hello <b>${user.name}</b>,</p>

  <p>We detected a new login to your DevSync account.</p>

  <p><b>📅 Time:</b> ${new Date().toLocaleString()}</p>
  <p><b>🌐 IP Address:</b> ${ip}</p>
  <p><b>🌍 Location:</b> ${location}</p>
  <p><b>💻 Device:</b> ${req.headers["user-agent"]}</p>

  <div style="margin-top:20px; padding:10px; background:#fff3f3; border-left:4px solid red;">
    If this wasn't you, please secure your account immediately.
  </div>

  <hr/>
  <p style="font-size:12px;color:gray;">DevSync Security Team</p>
</div>
`;


      // ✅ Send email safely
      try {
        await sendEmail(
          user.email,
          "New Login Alert 🚨",
          "",
          loginHTML
        );
      } catch (emailError) {
        console.log("Email failed:", emailError.message);
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
