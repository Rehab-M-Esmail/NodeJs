
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv =require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'ayhaga';
const users = require('./users.json');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.sendStatus(403);

    next();
  };
}

app.get('/login', async (req, res) => {
  console.log('This is a login endpoint.');
    const { username, password, email } = req.body;
const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: 'User exists' });
  const hashedPassword = await bcrypt.hash(password, 10);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
   //const existingUser = users.find((u) => u.username === username);
  users.push({ username, password: hashedPassword,email });
  res.json({ message: 'User registered' });

});
app.get('/public', async (req, res) => {
    res.send('This is a public endpoint.');
});
//Authenticated users only
app.get('protected', authenticateToken, (req, res) => {
    console.log('This is a protected endpoint.');
    const user = users.find((u) => u.username === req.user.username);
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const { password, ...userInfo } = user;
    res.json({ message: 'This is a protected endpoint.', user: userInfo });
});
app.get('admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    return (req.role =='admin'? res.send('Welcome to the admin panel.') : res.send('You are not authorized to access this page.'));
});

app.get('/moderator', authenticateToken, authorizeRole('moderator','admin'), (req, res) => {
        return ((req.role =='admin' || req.role=='moderator')) ? res.send('Welcome to the admin panel.'): res.send('You are not authorized to access this page.');

});
// Returns authenticated user's profile info
app.get('/profile', authenticateToken, (req, res) => {
    console.log('This is your profile.');
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const user = users.find((u) => u.username === req.user.username);
    if (!user) return res.status(400).json({ message: 'User not found' });
    const { password, ...userInfo } = user;
    res.json({ message: 'This is your profile.', user: userInfo });
});

app.put('/profile', authenticateToken, (req, res) => {
    const { username, password,email } = req.body;
    const user = users.find((u) => u.username === req.user.username);
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (!email && !password) return res.status(400).json({ message: 'No data provided' });
    if (email && typeof email !== 'string') return res.status(400).json({ message: 'Invalid email' });
    if (password && typeof password !== 'string') return res.status(400).json({ message: 'Invalid password' });
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);
  res.json({ message: 'Profile updated with username',username });
});
app.put('users/:id/role', authenticateToken, authorizeRole('admin'), (req, res) => {
  const { username,role,user_role } = req.body;
  if(role !== 'admin') return res.status(400).json({ message: 'Invalid role you are not an admin' })
  const user = users.find((u) => u.username === req.params.username);
  if (!user) return res.status(400).json({ message: 'User not found' });
  user.role = user_role;
  res.json({ message: 'User role updated' });
});
app.use('/api', authenticateToken, (req, res, next) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  next();
});
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
