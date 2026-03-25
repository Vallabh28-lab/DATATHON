// 1. MUST BE FIRST: Load environment variables immediately
import dotenv from 'dotenv';
dotenv.config(); 

import express      from 'express';
import mongoose     from 'mongoose';
import cors         from 'cors';
import bcrypt       from 'bcryptjs';
import jwt          from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

// 2. Import Models & Routes
// These imports will now successfully see process.env.OPENAI_API_KEY
import User         from './models/User.js';
import authRoutes   from './routes/auth.js';
import aiRoutes     from './routes/ai.js';

const app = express();

// --- DEBUG CHECK ---
// If you see this warning in the console, your .env file is in the wrong folder.
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERROR: OPENAI_API_KEY is missing from process.env!");
  console.log("Checking path:", process.cwd()); 
}

// --- MIDDLEWARE ---
app.use(cors({
  origin: true, 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected: DATATHON_PROJECT'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 AI Powered Legal Accessible Platform Backend is running!');
});

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    
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
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: false, 
      sameSite: 'lax', 
      maxAge: 3600000 
    });

    res.json({ message: 'Login successful', token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Error in login' });
  }
});

// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000; 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🚀 Server is live!
  📡 External IP: http://100.27.206.165:${PORT}
  🏠 Localhost:   http://localhost:${PORT}
  `);
});