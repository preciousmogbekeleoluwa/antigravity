/**
 * VERCEL SERVERLESS FUNCTION: /api/concierge
 * Supports:
 * - POST /api/concierge: Smart AI design advice, product recommendations, and material guidance.
 */

const fs = require('fs');
const path = require('path');

function getProducts() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    if (fs.existsSync(filePath)) return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const altPath = path.join(__dirname, '..', 'data', 'products.json');
    if (fs.existsSync(altPath)) return JSON.parse(fs.readFileSync(altPath, 'utf8'));
  } catch (e) {}
  return [];
}

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const body = req.body || {};
  const query = (body.message || '').trim().toLowerCase();

  if (!query) {
    res.status(400).json({ error: 'Message cannot be empty.' });
    return;
  }

  const catalog = getProducts();
  let recommendations = [];
  let advice = '';

  // Smart intent matching
  if (query.includes('outdoor') || query.includes('patio') || query.includes('garden') || query.includes('terrace')) {
    recommendations = catalog.filter(p => p.category === 'outdoor');
    advice = 'For outdoor living, we recommend pairing our Solstice All-Weather Sectional with the Verona Teak Daybed. Both utilize UV-inhibited synthetic wicker and QuickDry® reticulated foam engineered to shed moisture instantly while maintaining residential sofa comfort.';
  } else if (query.includes('living') || query.includes('sofa') || query.includes('sectional') || query.includes('lounge')) {
    recommendations = catalog.filter(p => p.category === 'living');
    advice = 'For primary living sanctuaries, our Aurelia Modular Sectional ($4,850) delivers deep down-blend comfort upholstered in tactile Italian bouclé. Pairing it with the Meridian Travertine Table introduces organic architectural grounding.';
  } else if (query.includes('dining') || query.includes('table') || query.includes('eat')) {
    recommendations = catalog.filter(p => p.category === 'dining');
    advice = 'Our Komorebi Dining Table ($3,920) is crafted from solid French white oak with monumental pill-shaped timber pillars, accommodating 8 to 10 guests for intimate family evenings or grand hospitality.';
  } else if (query.includes('sample') || query.includes('fabric') || query.includes('swatch')) {
    advice = 'Our flagship Manhattan studio prepares complimentary presentation boxes containing generous swatches of our Italian bouclé, Sunbrella® outdoor weaves, French oak finish blocks, and honed Italian travertine. You may request one directly via our contact form.';
  } else if (query.includes('lead time') || query.includes('delivery') || query.includes('shipping')) {
    advice = 'In-stock pieces dispatch within 1–2 weeks. Custom atelier commissions (such as bespoke dimension sectionals or rare timber finishes) require 3–6 weeks. All deliveries include complimentary White-Glove service: room-of-choice placement, uncrating, and packaging removal.';
  } else {
    recommendations = catalog.slice(0, 3);
    advice = 'JOY specializes in timeless indoor and outdoor furniture crafted with architectural honesty, natural materials, and restorative comfort. Explore our signature pieces below or connect directly with our studio concierge.';
  }

  res.status(200).json({
    success: true,
    reply: advice,
    suggestedProducts: recommendations.map(p => ({
      id: p.id,
      title: p.title,
      category: p.categoryLabel,
      priceStr: p.priceStr,
      image: p.image,
      dimensions: p.dimensions
    }))
  });
};
