import 'dotenv/config';
import https        from 'https';
import fs           from 'fs';
import express      from 'express';
import mongoose     from 'mongoose';
import cors         from 'cors';
import bcrypt       from 'bcryptjs';
import jwt          from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import User         from './models/User.js';
import authRoutes   from './routes/auth.js';

const app = express();

// middleware


app.use(cors());
app.use(express.json());
app.use(cookieParser());

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));

// routes
app.use('/api/auth', authRoutes);

// signup route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // input validation
    if (!name || !email || !password)  return res.json({ message: 'All fields required' });
    if (!email.includes('@'))          return res.json({ message: 'Invalid email' });
    if (password.length < 6)           return res.json({ message: 'Password too weak — min 6 characters' });
    if (!/[0-9]/.test(password))       return res.json({ message: 'Password must contain at least one number' });

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ message: 'User already exists' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Signup successful', token, role: newUser.role || 'student', name: newUser.name });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

// login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // input validation
    if (!email || !password) return res.send('All fields required');

    // check user exists
    const user = await User.findOne({ email });
    if (!user) return res.send('User not found');

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send('Invalid password');

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // send token as cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure:   true,
      sameSite: 'strict',
      maxAge:   3600000
    });

    res.json({ message: 'Login successful', token, role: user.role, name: user.name });
  } catch (err) {
    res.send('Error in login');
  }
});

// verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.send('Invalid token');
  }
};

// protected dashboard route
app.get('/dashboard', verifyToken, (req, res) => {
  res.send(`Welcome to your dashboard, user: ${req.user.id}`);
});

// test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// start HTTPS server
const options = {
  key:  fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

https.createServer(options, app).listen(3000, () => {
  console.log('🔐 HTTPS Server running on https://localhost:3000');
});
