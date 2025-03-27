const Notification = require("../models/notifModel");
const { Kafka } = require('kafkajs');
const axios = require('axios');
const { sendEmail } = require('../service/emailService');

const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

const getUserEmail = async (userId) => {
    try {
        const userServiceUrl = `http://localhost:4000/api/users/${userId}`;
        console.log(`🔍 Fetching email for User ID: ${userId}`);
        const response = await axios.get(userServiceUrl);
        return response.data.email;
    } catch (error) {
        console.error(`❌ Error fetching email for User ID ${userId}:`, error.message);
        return null;
    }
};

const consumeNotifications = async () => {
    try {
        await consumer.connect();
        console.log('✅ Kafka Consumer Connected...');
        await consumer.subscribe({ topic: 'notifications', fromBeginning: true });
        console.log('📩 Subscribed to notifications topic...');

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    console.log(`📥 Raw Message Received:`, message.value.toString()); // 👈 Log raw message
                    
                    // ✅ Validate JSON
                    let parsedMessage;
                    try {
                        parsedMessage = JSON.parse(message.value.toString());
                    } catch (error) {
                        console.error(`❌ Invalid JSON received: ${message.value.toString()}`);
                        return; // Skip processing invalid JSON
                    }

                    const { userId, message: msg, type } = parsedMessage;
                    console.log(`📩 Processing Notification - User: ${userId}, Type: ${type}, Message: ${msg}`);

                    // ✅ **Save Notification Models in MySQL**
                    const newNotification = await Notification.create({ userId, message: msg, type });
                    console.log("✅ Notification saved in MySQL!", newNotification.dataValues);

                    // ✅ **Send Email if Type is Email**
                    if (type === 'email') {
                        const userEmail = await getUserEmail(userId);
                        if (userEmail) {
                            await sendEmail(userEmail, "Order Notification", msg);
                            console.log(`📧 Email sent to ${userEmail}`);
                        } else {
                            console.log(`❌ Email not found for User ID: ${userId}`);
                        }
                    }
                } catch (error) {
                    console.error('❌ Error processing Kafka message:', error.message);
                }
            },
        });
    } catch (error) {
        console.error('❌ Error in Kafka Consumer:', error);
    }
};

module.exports = { consumeNotifications };
