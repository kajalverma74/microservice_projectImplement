// User verification process to ensure authenticity and security
// This step includes email verification
// USME SIRF USERVERIFICATION KA HAI OTHER KESE TABLE SE KUCH REALATED NHI HAI

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/authModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//  User Signup with Email Verification
const register = async (req, res) => {
  try {
    const { fullName, contactEmail, password } = req.body;
    const existingUser = await AuthUser.findOne({ where: { contactEmail } });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AuthUser.create({
      fullName,
      contactEmail,
      hashedPassword,
    });

    // Generate Email Verification Token
    const token = jwt.sign({ email: contactEmail }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactEmail,
      subject: "Verify Your Email",
      text: `Click here to verify your account: http://localhost:4000/api/auth/verify/${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "User registered. Check email for verification link.",
      newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Email Verification
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Invalid verification link." });
    }

    // Decode JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AuthUser.findOne({
      where: { contactEmail: decoded.email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    //  Update user status to verified
    user.status = true;
    await user.save();

    //  Generate new JWT token for auto login
    const authToken = jwt.sign(
      { email: user.contactEmail, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } ///  24h
    );

    res.json({ message: "Email verified successfully!", token: authToken });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

//  Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check if user exists
    const user = await AuthUser.findOne({ where: { contactEmail: email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.status) {
      return res
        .status(401)
        .json({ message: "Please verify your email first." });
    }

    //  Compare password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    //  Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.contactEmail },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.contactEmail,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// UPDTAEUSER

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, contactEmail } = req.body;

    console.log("🔍 Finding user with ID:", id);
    const user = await AuthUser.findByPk(id);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🛠 Updating User Data...");
    await user.update({
      fullName: fullName || user.fullName,
      contactEmail: contactEmail || user.contactEmail,
    });

    console.log("📧 Preparing Email to Send...");
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.contactEmail,
      subject: "Profile Updated Successfully",
      text: `Hello ${user.fullName},\n\nYour profile details have been successfully updated.\n\nIf you did not request this change, please contact support immediately.`,
    };

    console.log("📨 Sending Email to:", user.contactEmail);
    const emailResponse = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully:", emailResponse.response);

    res
      .status(200)
      .json({ message: "User updated successfully & email sent", user });
  } catch (error) {
    console.error("❌ Error in updateUser:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { register, verifyEmail, login, updateUser };
