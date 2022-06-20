import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const EmployeeDetails = mongoose.model('EmployeeDetails', employeeSchema);

export default EmployeeDetails;
