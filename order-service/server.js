const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, connectDB } = require('./config/db'); 

const orderRoutes = require('./routes/order.routes');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use('/api', orderRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Order Service is running!');
});

connectDB(); 

// Start the server
app.listen(PORT, () => {
    console.log(`Order Service is running on http://localhost:${PORT}`);
    console.log('API is available at /api/orders');
});
