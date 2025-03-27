const express = require("express");
const { connectDB } = require("./config/db");
const { consumeNotifications } = require("./service/kafkaConsumer");

const app = express();

// Middleware
app.use(express.json());

// Start Server Function
const startServer = async () => {
  try {
    await connectDB(); // Connect to Database
    await consumeNotifications(); // Start Kafka Consumer

    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () =>
      console.log(`🚀 Notification Service running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error starting Notification Service:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
