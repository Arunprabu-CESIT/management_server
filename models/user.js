import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    firstName: {
      type: String,
      unique: true,
      min: 3,
      max: 20,
      required: true,
    },
    lastName: {
      type: String,
      unique: true,
      min: 3,
      max: 20,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      max: 50,
      required: true,
    },
    password: {
      type: String,
      min: 12,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
