const express = require('express');

const router = express.Router();
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerControllers');

// Route to create a new customer
router.post('/customer', createCustomer);

// Route to get all customers
router.get('/customer', getAllCustomers);

// Route to get a customer by ID
router.get('/customer/:id', getCustomerById);

// Route to update a customer
router.put('/customer/:id', updateCustomer);


router.delete('/customer/:id', deleteCustomer);

module.exports = router;