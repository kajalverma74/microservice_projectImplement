const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Your email
    pass: process.env.EMAIL_PASS,  // Use App Password
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Error:", error);
  } else {
    console.log("✅ SMTP Server is Ready");
  }
});

// Send Email Function
const sendEmail = async (to, subject, text) => {
  try {
    console.log("📧 Sending email to:", to); // Debugging log

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Email Sending Error:", error);
    throw error;
  }
};

module.exports = { sendEmail };



/// authControler iske liye hai dusra 


// const bcrypt = require("bcryptjs");
// const  AuthUser  = require("../models/authModel");  // Import Sequelize Model
// const { sendEmail } = require("../config/nodemailer"); // Import sendEmail function

// // User Registration
// const register = async (req, res) => {
//   try {
//     const { fullName, contactEmail, password } = req.body;

//     // Check if user already exists
//     const existingUser = await AuthUser.findOne({ where: { contactEmail } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const newUser = await AuthUser.create({
//       fullName,
//       contactEmail,
//       hashedPassword,
//       status: true,
//     });

//     // Send Welcome Email
//     await sendEmail(
//       contactEmail,
//       "Welcome to Our Platform!",
//       `Hello ${fullName},\n\nThank you for registering. Your account has been created successfully!\n\nBest Regards,\nTeam`
//     );

//     res.status(201).json({ message: "User registered successfully", user: newUser });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { fullName, contactEmail } = req.body;

//     console.log("🔍 Finding user with ID:", id);

//     // Find the user
//     const user = await AuthUser.findByPk(id);
//     if (!user) {
//       console.log("❌ User not found!");
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("✅ User found:", user);

//     // Update the user details
//     await user.update({ fullName, contactEmail });

//     console.log("🔄 User updated successfully!");

//     // Send email after update
//     console.log("📧 Sending email to:", contactEmail);
//     const emailResponse = await sendEmail(
//       contactEmail,
//       "Profile Updated",
//       `Hello ${fullName}, Your profile has been successfully updated.`
//     );

//     console.log("✅ Email sent successfully!", emailResponse);

//     res.status(200).json({ message: "User updated successfully", user });
//   } catch (error) {
//     console.error("❌ Update User Error:", error);
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };



// module.exports = { register,updateUser };



