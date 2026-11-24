/**
 * VERCEL SERVERLESS FUNCTION: /api/concepts
 * Supports:
 * - POST /api/concepts: Save a spatial room concept from the 3D Studio Planner
 * - GET /api/concepts?id=<conceptId>: Retrieve a saved room concept
 */

const fs = require('fs');
const path = require('path');

function getConceptsFilePath() {
  const p1 = path.join(process.cwd(), 'data', 'concepts.json');
  if (fs.existsSync(path.dirname(p1))) return p1;
  return path.join(__dirname, '..', 'data', 'concepts.json');
}

function readConcepts() {
  try {
    const file = getConceptsFilePath();
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {}
  return [];
}

function saveConcepts(list) {
  try {
    const file = getConceptsFilePath();
    fs.writeFileSync(file, JSON.stringify(list, null, 2), 'utf8');
    return true;
  } catch (e) {
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

  // GET: Retrieve a concept by id or list recent
  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const id = url.searchParams.get('id');

    const concepts = readConcepts();

    if (id) {
      const match = concepts.find(c => c.id === id);
      if (!match) {
        res.status(404).json({ error: 'Room Concept Not Found', id: id });
        return;
      }
      res.status(200).json({ success: true, data: match });
      return;
    }

    res.status(200).json({ success: true, count: concepts.length, data: concepts });
    return;
  }

  // POST: Save a new Room Concept
  if (req.method === 'POST') {
    const body = req.body || {};
    const placedItems = Array.isArray(body.placedItems) ? body.placedItems : [];

    if (placedItems.length === 0) {
      res.status(400).json({ error: 'Please place at least one furniture piece on the canvas to save a concept.' });
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const conceptId = `JOY-CONCEPT-${randomSuffix}`;

    const newConcept = {
      id: conceptId,
      createdAt: new Date().toISOString(),
      roomPreset: body.roomPreset || 'patio',
      roomName: body.roomName || 'Custom Room',
      totalEstimate: typeof body.totalEstimate === 'number' ? body.totalEstimate : 0,
      clientNote: (body.clientNote || '').trim(),
      placedItems: placedItems
    };

    const concepts = readConcepts();
    concepts.unshift(newConcept);
    saveConcepts(concepts);

    res.status(201).json({
      success: true,
      conceptId: conceptId,
      shareUrl: `/studio.html?concept=${conceptId}`,
      message: `Room concept (${conceptId}) successfully saved.`,
      data: newConcept
    });
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
};
