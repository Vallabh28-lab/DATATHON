import dotenv from 'dotenv';
dotenv.config();

import express      from 'express';
import mongoose     from 'mongoose';
import cors         from 'cors';
import bcrypt       from 'bcryptjs';
import jwt          from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import User         from './models/User.js';
import authRoutes   from './routes/auth.js';
import aiRoutes     from './routes/ai.js';

const app = express();

// --- MIDDLEWARE UPDATES ---
// Updated CORS to allow your Amplify frontend to send cookies and headers
app.use(cors({
  origin: true, // During the Datathon, this ensures your Amplify URL is accepted
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)  return res.status(400).json({ message: 'All fields required' });
    if (!email.includes('@'))          return res.status(400).json({ message: 'Invalid email' });
    if (password.length < 6)           return res.status(400).json({ message: 'Password too weak — min 6 characters' });
    if (!/[0-9]/.test(password))       return res.status(400).json({ message: 'Password must contain at least one number' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Signup successful', token, role: newUser.role || 'student', name: newUser.name });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields required' });
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Updated cookie settings for cross-origin (Amplify -> EC2)
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: false, // Set to false since you are using HTTP for the demo
      sameSite: 'lax', 
      maxAge: 3600000 
    });

    res.json({ message: 'Login successful', token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Error in login' });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.get('/dashboard', verifyToken, (req, res) => {
  res.send(`Welcome to your dashboard, user: ${req.user.id}`);
});

app.get('/', (req, res) => {
  res.send('🚀 AI Powered Legal Accessible Platform Backend is running!');
});

// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000; 

// Binding to '0.0.0.0' allows external connections from your Amplify frontend
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🚀 Server is live!
  📡 External URL: http://100.27.206.165:${PORT}
  🏠 Local URL:    http://localhost:${PORT}
  `);
});