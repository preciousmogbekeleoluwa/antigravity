/**
 * VERCEL SERVERLESS FUNCTION: /api/auth
 * Handles Client Portal Authentication & Profile Management:
 * - POST /api/auth?action=register
 * - POST /api/auth?action=login
 * - GET  /api/auth?action=me
 * - PUT  /api/auth?action=profile
 */

const fs = require('fs');
const path = require('path');

function getUsersFilePath() {
  const p1 = path.join(process.cwd(), 'data', 'users.json');
  if (fs.existsSync(path.dirname(p1))) return p1;
  return path.join(__dirname, '..', 'data', 'users.json');
}

function readUsers() {
  try {
    const file = getUsersFilePath();
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {}
  return [];
}

function saveUsers(users) {
  try {
    const file = getUsersFilePath();
    fs.writeFileSync(file, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const action = url.searchParams.get('action') || (req.body && req.body.action) || 'login';

  const users = readUsers();

  // 1. REGISTER
  if (req.method === 'POST' && action === 'register') {
    const body = req.body || {};
    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const phone = (body.phone || '').trim();
    const password = (body.password || '').trim();
    const clientType = body.clientType || 'Private Residence';

    if (!fullName || fullName.length < 2) {
      res.status(400).json({ error: 'Please provide your full legal or design firm name.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ error: 'Please provide a valid business or residential email.' });
      return;
    }

    if (!password || password.length < 6) {
      res.status(400).json({ error: 'Security passcode must be at least 6 characters.' });
      return;
    }

    if (users.some(u => u.email === email)) {
      res.status(409).json({ error: 'A private client account with this email already exists. Please sign in.' });
      return;
    }

    const address = {
      street: (body.street || (body.address && body.address.street) || '').trim(),
      city: (body.city || (body.address && body.address.city) || '').trim(),
      state: (body.state || (body.address && body.address.state) || '').trim(),
      zip: (body.zip || (body.address && body.address.zip) || '').trim()
    };

    const clientId = `JOY-CLIENT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser = {
      id: clientId,
      fullName: fullName,
      email: email,
      phone: phone || '+1 (555) 000-0000',
      password: password,
      clientType: clientType,
      createdAt: new Date().toISOString(),
      address: address,
      projectScope: body.projectScope || 'Residential interior & outdoor styling'
    };

    users.push(newUser);
    saveUsers(users);

    const safeUser = { ...newUser };
    delete safeUser.password;

    res.status(201).json({
      success: true,
      message: `Welcome to JOY Private Client Services, ${fullName}.`,
      token: `joy_token_${Buffer.from(email).toString('base64')}`,
      user: safeUser
    });
    return;
  }

  // 2. LOGIN
  if (req.method === 'POST' && action === 'login') {
    const body = req.body || {};
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    if (!email || !password) {
      res.status(400).json({ error: 'Please enter both your client email and password.' });
      return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      res.status(401).json({ error: 'Invalid client credentials. Please check your email or password.' });
      return;
    }

    const safeUser = { ...user };
    delete safeUser.password;

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.fullName}.`,
      token: `joy_token_${Buffer.from(email).toString('base64')}`,
      user: safeUser
    });
    return;
  }

  // 3. GET CURRENT USER PROFILE (ME)
  if (req.method === 'GET' && action === 'me') {
    const email = (url.searchParams.get('email') || '').trim().toLowerCase();
    const authHeader = req.headers.authorization || '';

    let targetEmail = email;
    if (!targetEmail && authHeader.startsWith('Bearer joy_token_')) {
      try {
        targetEmail = Buffer.from(authHeader.replace('Bearer joy_token_', ''), 'base64').toString('utf8');
      } catch (e) {}
    }

    if (!targetEmail) {
      res.status(401).json({ error: 'Unauthorized. No active client session.' });
      return;
    }

    const user = users.find(u => u.email === targetEmail);
    if (!user) {
      res.status(404).json({ error: 'Client account not found.' });
      return;
    }

    const safeUser = { ...user };
    delete safeUser.password;

    res.status(200).json({
      success: true,
      user: safeUser
    });
    return;
  }

  // 4. UPDATE CLIENT PROFILE
  if (req.method === 'PUT' && action === 'profile') {
    const body = req.body || {};
    const email = (body.email || '').trim().toLowerCase();

    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) {
      res.status(404).json({ error: 'Client account not found.' });
      return;
    }

    if (body.fullName) users[userIndex].fullName = body.fullName.trim();
    if (body.phone) users[userIndex].phone = body.phone.trim();
    if (body.clientType) users[userIndex].clientType = body.clientType;
    if (body.projectScope) users[userIndex].projectScope = body.projectScope;
    if (body.address) users[userIndex].address = { ...users[userIndex].address, ...body.address };

    saveUsers(users);

    const safeUser = { ...users[userIndex] };
    delete safeUser.password;

    res.status(200).json({
      success: true,
      message: 'Client profile and residence details updated successfully.',
      user: safeUser
    });
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
};
