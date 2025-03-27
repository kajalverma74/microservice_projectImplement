const axios = require('axios'); // Assuming user_service is a microservice

// Get a single notification by ID with user details
const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        // Fetch user details from user_service
        const userResponse = await axios.get(`http://user_service_url/users/${notification.userId}`);
        const user = userResponse.data;

        res.status(200).json({ notification, user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notification', details: error.message });
    }
};


module.exports = { getNotificationById };