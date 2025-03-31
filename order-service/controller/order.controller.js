const Order = require('../models/order.model');
const axios = require('axios'); 
const { sendNotification } = require('../service/kafkaProducer');

const createOrder = async (req, res) => {
    try {
        const { userId, product, quantity, totalPrice } = req.body;

        if (!userId || !product || !quantity || !totalPrice) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        // 🔹 Fetch user details from User Service API
        const userServiceUrl = 'http://localhost:4000/api/users';
        const userResponse = await axios.get(`${userServiceUrl}/${userId}`);        const user = userResponse.data;

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        // 🔹 Save Order in Database (Order Service Database)
        const newOrder = await Order.create({ userId, product, quantity, totalPrice });

        // 🔹 Kafka Notification Event Trigger
        await sendNotification(userId, `Your order for ${product} has been placed!`);

        res.status(201).json({
            message: '✅ Order created successfully!',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            order: newOrder
        });

    } catch (error) {
        console.error('❌ Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};


const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Fetch order details
        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        // Fetch user data from User Service
        const userServiceUrl = `http://localhost:3000/api/users/${order.userId}`;
        const userResponse = await axios.get(userServiceUrl);
        const userData = userResponse.data;

        res.json({ message: "Order fetched successfully", order, user: userData });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};


const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        // Fetch orders by userId
        const orders = await Order.findAll({ where: { userId } });
        res.json({ message: "Orders fetched successfully", orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};


const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deleted = await Order.destroy({ where: { id: orderId } });
        if (!deleted) return res.status(404).json({ error: 'Order not found' });

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    deleteOrder,
    getOrdersByUser
};