const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['localhost:9092']
});

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner // ✅ Retain old partitioning behavior
});

const sendNotification = async (userId, message) => {
    await producer.connect();

    const payload = JSON.stringify({
        userId,
        message,
        type: 'email'
    });

    await producer.send({
        topic: 'notifications',
        messages: [{ key: userId.toString(), value: JSON.stringify({ userId, message, type: 'email' }) }]
    });
    
    console.log(`📨 Notification Sent to Kafka: ${payload}`);
};

module.exports = { sendNotification };
