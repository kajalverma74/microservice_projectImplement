require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (
  to,
  subject,
  text,
  html = null,
  replyTo = process.env.EMAIL_USER
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    //   logger: true, // Logs enable karein
    //   debug: true,
    });

    await transporter.verify();
    console.log("✅ Mail server is ready to send emails");

    const mailOptions = {
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
      replyTo,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}: ${info.response}`);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};

module.exports = { sendEmail };
