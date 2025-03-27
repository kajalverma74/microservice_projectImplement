const express = require('express');
const sequelize = require('./config/database'); 
const userRoutes = require('./routes/userRoute');
const customerRoutes = require('./routes/customerRoute');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', customerRoutes);
app.use('/api', employeeRoutes); 


// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('USER Database connected successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});