
// const User = require('../models/userModel');
// const Customer = require('../models/customerModel');

const { User, Customer } = require('../models/associations');

const createCustomer = async (req, res) => {
    const { name, email, userId, phone } = req.body;
    try {
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        
        const newCustomer = await Customer.create({ name, email, userId, phone });

        const customerWithUser = await Customer.findOne({
            where: { id: newCustomer.id },
            include: [{ model: User, as: 'users', attributes: ['id', 'username', 'email'] }]
        });

        res.status(201).json({ message: "Customer created successfully!", customer: customerWithUser });

    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ error: "Failed to create customer", details: error.message });
    }
};



// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            include: {
                model: User,
                as: 'users',
                attributes: ['id', 'username', 'email'] 
            }
        });

        res.status(200).json({ message: 'Customers fetched successfully', customers });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers', details: error.message });
    }
};


// Get a customer by ID
const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id,{
            include: {
                model: User,
                as: 'users',
                attributes: ['id', 'username', 'email']
            }
        });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json({ message: "Customers fetched successfully", customer });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
};

// Update a customer
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.update({ name, email });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        await customer.destroy();
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};