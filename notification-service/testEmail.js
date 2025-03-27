const { sendEmail } = require("./service/emailService");

sendEmail("vermakajal7355@gmail.com", "Order Confirmation", "Your order has been placed successfully!")
    .then(() => console.log("✅ Email Sent!"))
    .catch(err => console.error("❌ Email Failed:", err));
