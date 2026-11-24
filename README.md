# JOY — Luxury Indoor & Outdoor Furniture WebApp & Backend

A premium, sophisticated, fully responsive web application and serverless backend for **JOY**, specializing in luxury indoor and outdoor furniture.

---

## 🏛️ Brand Aesthetic & Palette

The visual identity is inspired by quiet international luxury, organic architectural minimalism, and sunlit natural textures:

- **Warm Ivory** (`#F3EFE7` / `#FAF8F5`): Primary backgrounds and luminous canvas.
- **Sand Beige** (`#D6C5AD` / `#E8DFD3`): Secondary sections and editorial cards.
- **Muted Sage** (`#A9A58B`): Subtle botanical accents and highlight badges.
- **Soft Mustard Gold** (`#D5AA54`): Signature CTAs, active indicators, and icons.
- **Warm Taupe** (`#777365`): Refined body copy, captions, and hairline rules.
- **Deep Charcoal** (`#343630` / `#222320`): High-contrast serif headlines, primary buttons, and dark surfaces.
- **White** (`#FFFFFF`): Clean spacing and crisp container contrast.

---

## 📱 WebApp Features

1. **Catalog & Multi-Facet Filter Studio (`catalog.html`)**:
   - Real-time keyword search across names, categories, materials, and descriptions.
   - Faceted filters for room category, raw materiality, and production status (In-Stock vs. Atelier Commission).
   - Dynamic view mode switcher: 3-column Studio Grid vs. 2-column Editorial Spread.
   - Interactive finish swatch color circles that visually switch finishes on each piece.
   - Sorting by price, featured atelier, and alphabetical order.

2. **3D Room Studio & Spatial Visualizer (`studio.html`)**:
   - Visual spatial canvas with ambient templates (*Sunlit Patio*, *Living Sanctuary*, *Penthouse Dining*).
   - Interactive drag-and-drop piece placement to test architectural flow.
   - Real-time placed piece counter and estimated total investment calculator.
   - One-click room concept dispatch to WhatsApp.

3. **Global Curated Collection / Wishlist Drawer**:
   - Persisted across sessions via `localStorage`.
   - Quantity adjustment, finish selection, and subtotal calculation.
   - One-click itemized WhatsApp quotation generator.

4. **Progressive Web App (PWA)**:
   - Web App Manifest (`manifest.json`) and Service Worker (`sw.js`) for offline caching and fast load.
   - Mobile app bottom navigation bar and home screen install banner.

---

## ⚙️ Backend Architecture & Serverless API

The backend is built with native Node.js and zero external dependencies, running both locally on `server.js` and in production as Vercel Serverless Functions in `/api/`.

### API Endpoints:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/products` | `GET` | Query catalog products with filters (`category`, `material`, `status`, `search`, `sort`, `limit`). |
| `/api/products?id=<id>` | `GET` | Retrieve single product with full specifications, frame joinery, and care guides. |
| `/api/inquiries` | `POST` | Validates and logs client inquiries/bespoke quotes; returns reference code `JOY-INQ-YYYY-XXXX`. |
| `/api/inquiries` | `GET` | Concierge listing of recent client inquiries. |
| `/api/concepts` | `POST` | Saves spatial room layouts created on the 3D Studio canvas; returns `JOY-CONCEPT-XXXX`. |
| `/api/concepts?id=<id>` | `GET` | Retrieves a saved room concept for client or designer review. |
| `/api/concierge` | `POST` | Semantic design advisor endpoint that processes natural language requests and returns matching catalog pieces and styling notes. |

---

## 🚀 Running Locally

```bash
npm start
# or: node server.js
```

Open your browser to:
```
http://localhost:3000
```

---

## 🌐 Production Deployment (Vercel)

The backend and frontend are configured for automatic deployment on Vercel:
- **Repository**: `https://github.com/preciousmogbekeleoluwa/antigravity`
- **Live URL**: `https://antigravity-sigma-liard.vercel.app/`

---

## 📜 License

&copy; 2026 JOY Luxury Furniture. All rights reserved.
