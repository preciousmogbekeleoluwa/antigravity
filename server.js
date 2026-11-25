const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = path.join(__dirname);

// API Handlers
const apiProducts = require('./api/products');
const apiInquiries = require('./api/inquiries');
const apiConcepts = require('./api/concepts');
const apiConcierge = require('./api/concierge');
const apiAuth = require('./api/auth');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper to decorate res with Vercel/Express-like helpers
function decorateResponse(res) {
  res.status = function(code) {
    this.statusCode = code;
    return this;
  };
  res.json = function(data) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(data));
    return this;
  };
  res.send = function(data) {
    this.end(data);
    return this;
  };
}

const server = http.createServer((req, res) => {
  decorateResponse(res);

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // 1. ROUTE API CALLS (/api/*)
  if (pathname.startsWith('/api/')) {
    let bodyData = '';
    req.on('data', chunk => {
      bodyData += chunk;
    });

    req.on('end', () => {
      if (bodyData) {
        try {
          req.body = JSON.parse(bodyData);
        } catch (e) {
          req.body = {};
        }
      } else {
        req.body = {};
      }

      if (pathname === '/api/products') {
        return apiProducts(req, res);
      } else if (pathname === '/api/inquiries') {
        return apiInquiries(req, res);
      } else if (pathname === '/api/concepts') {
        return apiConcepts(req, res);
      } else if (pathname === '/api/concierge') {
        return apiConcierge(req, res);
      } else if (pathname === '/api/auth') {
        return apiAuth(req, res);
      } else {
        return res.status(404).json({ error: 'API Endpoint Not Found', path: pathname });
      }
    });

    return;
  }

  // 2. SERVE STATIC FILES
  let reqPath = decodeURI(pathname);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(ROOT, reqPath);

  // Security: prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`JOY Luxury Furniture WebApp & API Server running at http://localhost:${PORT}`);
});
