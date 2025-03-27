const Employee = require('../models/employeeModel'); 
const User = require('../models/userModel'); 

const createEmployee = async (req, res) => {
    try {
        const { name, position, salary, userId } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newEmployee = await Employee.create({ name, position, salary, userId });

        const employeeWithUser = await Employee.findByPk(newEmployee.id, {
            include: {
                model: User,
                as: 'users',
                attributes: ['id', 'username', 'email'] 
            }
        });

        res.status(201).json({ message: 'Employee created successfully', employee: employeeWithUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create employee', details: error.message });
    }
};


const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: {
                model: User,
                as: 'users',
                attributes: ['id', 'username', 'email'] 
            }
        });

        res.status(200).json({ message: 'Employees fetched successfully', employees });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees', details: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, salary } = req.body;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        await employee.update({ name, position, salary });

        res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update employee', details: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        await employee.destroy();

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee', details: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByPk(id, {
            include: [{ model: User, as: 'users', attributes: ['id', 'username', 'email'] }],
        });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee', details: error.message });
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
};
