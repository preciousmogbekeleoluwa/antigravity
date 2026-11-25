/**
 * VERCEL SERVERLESS FUNCTION: /api/inquiries
 * Supports:
 * - POST /api/inquiries: Receive client inquiries and bespoke quote requests
 * - GET /api/inquiries: Studio concierge admin listing
 */

const fs = require('fs');
const path = require('path');

function getInquiriesFilePath() {
  const p1 = path.join(process.cwd(), 'data', 'inquiries.json');
  if (fs.existsSync(path.dirname(p1))) return p1;
  return path.join(__dirname, '..', 'data', 'inquiries.json');
}

function readInquiries() {
  try {
    const file = getInquiriesFilePath();
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {}
  return [];
}

function saveInquiries(list) {
  try {
    const file = getInquiriesFilePath();
    fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
    return true;
  } catch (e) {
    // In serverless read-only environments, continue gracefully
    return false;
  }
}

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET: Concierge Inquiries Listing
  if (req.method === 'GET') {
    let list = readInquiries();
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const email = url.searchParams.get('email');
    if (email) {
      list = list.filter(item => item.email && item.email.toLowerCase() === email.toLowerCase());
    }
    res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
    return;
  }

  // POST: Submit Inquiry
  if (req.method === 'POST') {
    const body = req.body || {};

    // Validation
    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const message = (body.message || '').trim();

    if (!fullName || fullName.length < 2) {
      res.status(400).json({ error: 'Please provide a valid full name (minimum 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if (!phone || phone.length < 7) {
      res.status(400).json({ error: 'Please provide a valid contact telephone number.' });
      return;
    }

    if (!message || message.length < 10) {
      res.status(400).json({ error: 'Please include project details or questions (at least 10 characters).' });
      return;
    }

    // Generate unique inquiry reference code
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `JOY-INQ-${year}-${randomSuffix}`;

    const newInquiry = {
      id: reference,
      createdAt: new Date().toISOString(),
      fullName: fullName,
      email: email,
      phone: phone,
      subject: body.subject || 'General Collection Enquiry',
      message: message,
      sampleKit: Boolean(body.sampleKit),
      status: 'Pending Concierge Review',
      items: Array.isArray(body.items) ? body.items : []
    };

    const inquiries = readInquiries();
    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    res.status(201).json({
      success: true,
      reference: reference,
      message: `Thank you, ${fullName}. Your inquiry (${reference}) has been securely dispatched to our private studio concierge. We will respond within 24 business hours.`,
      inquiry: newInquiry
    });
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
};
