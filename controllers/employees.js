import EmployeeDetails from '../models/employees.js';

export const getEmployeesList = async (req, res) => {
  try {
    const employeeDetails = await EmployeeDetails.find();

    res.status(200).json(employeeDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const employee = req.body;

  const newEmployee = new EmployeeDetails(employee);

  try {
    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
