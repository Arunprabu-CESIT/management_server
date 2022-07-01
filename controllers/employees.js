import mongoose from 'mongoose';
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

export const updateEmployee = async (req, res) => {
  const { id: _id } = req.params;
  const employee = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No Post with that ID');
  }

  const updatedEmployee = await EmployeeDetails.findByIdAndUpdate(
    _id,
    { ...employee, _id },
    { new: true }
  );

  res.json(updatedEmployee);
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that ID');
  }

  await EmployeeDetails.findByIdAndDelete(id);

  return res.json({ message: 'Item deleted successfully.' });
};
