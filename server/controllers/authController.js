import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

const sign = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email }))
      return res.status(409).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ token: sign(user), role: user.role, name: user.name });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    res.json({ token: sign(user), role: user.role, name: user.name });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMe = (req, res) => {
  res.json({ user: req.user });
};
