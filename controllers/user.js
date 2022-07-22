import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const Signup = async (req, res) => {
  const { firstName, lastName, role, email, password, confirmPassword } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exist!' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      firstName,
      lastName,
      role,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
      expiresIn: '1h',
    });

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      })
      .json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Somthing went wrong! Try again later.' });
  }
};

export const Signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Password.' });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      })
      .json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: 'Somthing went wrong! Try again later.' });
  }
};
