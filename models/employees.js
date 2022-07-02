import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
  name: String,
  email: String,
  employeeId: String,
  mobile: String,
  address: String,
  designation: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const EmployeeDetails = mongoose.model('EmployeeDetails', employeeSchema);

export default EmployeeDetails;
