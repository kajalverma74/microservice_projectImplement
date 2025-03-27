
const User = require('./userModel');
const Customer = require('./customerModel');
const Employee = require('./employeeModel');

// Define Associations
User.hasOne(Customer, { foreignKey: 'userId', as: 'customers' });
Customer.belongsTo(User, { foreignKey: 'userId', as: 'users' });

User.hasMany(Employee, { foreignKey: 'userId', as: 'employees' });
Employee.belongsTo(User, { foreignKey: 'userId', as: 'users' });

module.exports = { User, Customer, Employee };
