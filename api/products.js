/**
 * VERCEL SERVERLESS FUNCTION: /api/products
 * Supports:
 * - GET /api/products (filters: category, material, status, search, sort, limit)
 * - GET /api/products?id=<productId>
 */

const fs = require('fs');
const path = require('path');

function getProducts() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {}

  // Fallback if data file path varies
  try {
    const altPath = path.join(__dirname, '..', 'data', 'products.json');
    if (fs.existsSync(altPath)) {
      return JSON.parse(fs.readFileSync(altPath, 'utf8'));
    }
  } catch (e) {}

  return [];
}

module.exports = function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const query = Object.fromEntries(url.searchParams.entries());

  const allProducts = getProducts();

  // Single Product by ID
  if (query.id) {
    const product = allProducts.find(p => p.id === query.id);
    if (!product) {
      res.status(404).json({ error: 'Product Not Found', id: query.id });
      return;
    }
    res.status(200).json({ success: true, data: product });
    return;
  }

  let filtered = [...allProducts];

  // Search filter
  if (query.search) {
    const term = query.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.categoryLabel.toLowerCase().includes(term) ||
      p.materialLabel.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }

  // Category filter
  if (query.category && query.category !== 'all') {
    const cats = query.category.split(',').map(c => c.trim().toLowerCase());
    filtered = filtered.filter(p => cats.includes(p.category.toLowerCase()));
  }

  // Material filter
  if (query.material && query.material !== 'all') {
    const mats = query.material.split(',').map(m => m.trim().toLowerCase());
    filtered = filtered.filter(p => mats.includes(p.material.toLowerCase()));
  }

  // Status filter (in-stock vs custom)
  if (query.status && query.status !== 'all') {
    const stats = query.status.split(',').map(s => s.trim().toLowerCase());
    filtered = filtered.filter(p => stats.includes(p.status.toLowerCase()));
  }

  // Max price filter
  if (query.maxPrice) {
    const max = parseFloat(query.maxPrice);
    if (!isNaN(max)) {
      filtered = filtered.filter(p => p.priceNum <= max);
    }
  }

  // Sorting
  const sort = query.sort || 'featured';
  if (sort === 'price-low') {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (sort === 'price-high') {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  } else if (sort === 'name') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Limit / Pagination
  const total = filtered.length;
  if (query.limit) {
    const limit = parseInt(query.limit, 10);
    if (!isNaN(limit) && limit > 0) {
      filtered = filtered.slice(0, limit);
    }
  }

  res.status(200).json({
    success: true,
    total: total,
    count: filtered.length,
    data: filtered
  });
};
