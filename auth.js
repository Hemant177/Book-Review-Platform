
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed });
    console.log("✅ New user created:", user.toJSON()); // <-- ADD THIS
    res.json(user);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: 'Email already exists' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  const user = await User.findOne({ where: { email } });
  console.log("Found user:", user ? user.toJSON() : "NO USER");

  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  console.log("Password match:", valid);

  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user });
});


export default router;
