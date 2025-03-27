const express = require('express');
const { createEmployee, getAllEmployees, updateEmployee, deleteEmployee, getEmployeeById } = require('../controllers/employeeController');

const router = express.Router();

router.post('/employee', createEmployee); 
router.get('/employee', getAllEmployees); 
router.get('/employee/:id', getEmployeeById); 
router.put('/employee/:id', updateEmployee); 
router.delete('/employee/:id', deleteEmployee); 

module.exports = router;