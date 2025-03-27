const users = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = await users.create({ username, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to create user' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.findAll();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await users.findByPk(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const user = await users.findByPk(id);
        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await users.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};