/**
 * JOY LUXURY FURNITURE — WEBAPP STATE & INTERACTION ENGINE
 * - Central Wishlist / Curated Collection Management (localStorage)
 * - Dynamic Itemized WhatsApp Quote Generation
 * - Catalog Multi-Facet Filter, Search & View Switcher
 * - Material / Fabric Swatch Switching
 * - Interactive Room Studio Canvas Planner (Drag & Drop)
 * - Floating Design Concierge Assistant
 * - PWA Service Worker Registration & Install Prompt
 */

// ==========================================================================
// 1. MASTER CATALOG DATASET
// ==========================================================================
const JOY_CATALOG = [
  {
    id: 'aurelia-sectional',
    title: 'Aurelia Modular Sectional',
    category: 'living',
    categoryLabel: 'Living Room',
    material: 'boucle',
    materialLabel: 'Italian Bouclé & Beech',
    status: 'custom',
    statusLabel: 'Atelier Commission',
    priceNum: 4850,
    priceStr: '$4,850',
    dimensions: '124"W x 86"D x 31"H',
    leadTime: '3–5 Weeks',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
    description: 'Generously proportioned modular sofa featuring deep channel cushioning and tactile Italian bouclé upholstery.',
    swatches: [
      { name: 'Warm Ivory Bouclé', class: 'swatch-ivory', hex: '#F3EFE7' },
      { name: 'Sand Beige Weave', class: 'swatch-sand', hex: '#D6C5AD' },
      { name: 'Muted Sage Velvet', class: 'swatch-sage', hex: '#A9A58B' }
    ]
  },
  {
    id: 'solstice-patio',
    title: 'Solstice Patio Sectional',
    category: 'outdoor',
    categoryLabel: 'Outdoor & Patio',
    material: 'wicker',
    materialLabel: 'All-Weather Wicker & Teak',
    status: 'in-stock',
    statusLabel: 'Ready to Ship',
    priceNum: 3650,
    priceStr: '$3,650',
    dimensions: '98"W x 42"D x 28"H + Ottoman',
    leadTime: '1–2 Weeks',
    image: 'assets/images/hero-outdoor-reference.webp',
    description: 'Handwoven all-weather synthetic wicker lounge with plush quick-dry cushions in soft mustard gold and sand beige.',
    swatches: [
      { name: 'Soft Mustard Gold', class: 'swatch-gold', hex: '#D5AA54' },
      { name: 'Warm Ivory Sunbrella', class: 'swatch-ivory', hex: '#F3EFE7' },
      { name: 'Deep Charcoal Weave', class: 'swatch-charcoal', hex: '#343630' }
    ]
  },
  {
    id: 'komorebi-dining',
    title: 'Komorebi Dining Table',
    category: 'dining',
    categoryLabel: 'Dining Room',
    material: 'oak',
    materialLabel: 'Solid French White Oak',
    status: 'custom',
    statusLabel: 'Atelier Commission',
    priceNum: 3920,
    priceStr: '$3,920',
    dimensions: '106"L x 42"W x 30"H (Seats 8–10)',
    leadTime: '4–6 Weeks',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=85',
    description: 'Solid white oak dining table defined by softened pill-shaped radius edges and monumental cylindrical timber legs.',
    swatches: [
      { name: 'Natural Sand Oak', class: 'swatch-sand', hex: '#D6C5AD' },
      { name: 'Smoked Charcoal Oak', class: 'swatch-charcoal', hex: '#343630' }
    ]
  },
  {
    id: 'verona-daybed',
    title: 'Verona Double Daybed',
    category: 'outdoor',
    categoryLabel: 'Outdoor & Patio',
    material: 'teak',
    materialLabel: 'Grade-A Sustainable Teak',
    status: 'in-stock',
    statusLabel: 'Ready to Ship',
    priceNum: 2890,
    priceStr: '$2,890',
    dimensions: '82"L x 68"W x 18"H',
    leadTime: '2–3 Weeks',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    description: 'Generous double-width lounger handcrafted from seasoned teak with multi-position reclining headrests.',
    swatches: [
      { name: 'Mineral Sand', class: 'swatch-sand', hex: '#D6C5AD' },
      { name: 'Ivory Sunbrella', class: 'swatch-ivory', hex: '#F3EFE7' }
    ]
  },
  {
    id: 'paloma-armchair',
    title: 'Paloma Woven Armchair',
    category: 'living',
    categoryLabel: 'Living Room',
    material: 'oak',
    materialLabel: 'Sculpted Ash & Danish Cord',
    status: 'in-stock',
    statusLabel: 'Ready to Ship',
    priceNum: 1450,
    priceStr: '$1,450',
    dimensions: '36"W x 38"D x 30"H',
    leadTime: '1–2 Weeks',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=85',
    description: 'Sculptural accent armchair pairing ergonomic ash woodwork with organic corded weave and plush cushion.',
    swatches: [
      { name: 'Muted Sage', class: 'swatch-sage', hex: '#A9A58B' },
      { name: 'Warm Ivory', class: 'swatch-ivory', hex: '#F3EFE7' },
      { name: 'Mustard Velvet', class: 'swatch-gold', hex: '#D5AA54' }
    ]
  },
  {
    id: 'seraphina-bed',
    title: 'Seraphina Low Plinth Bed',
    category: 'bedroom',
    categoryLabel: 'Bedroom Suite',
    material: 'boucle',
    materialLabel: 'Oak Core & Sand Chenille',
    status: 'custom',
    statusLabel: 'Atelier Commission',
    priceNum: 3280,
    priceStr: '$3,280',
    dimensions: 'King: 84"W x 92"L x 48"H',
    leadTime: '4–5 Weeks',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=85',
    description: 'Floating low-profile platform bed with wrapping upholstered wing headboard and concealed floating plinth.',
    swatches: [
      { name: 'Sand Chenille', class: 'swatch-sand', hex: '#D6C5AD' },
      { name: 'Warm Ivory Weave', class: 'swatch-ivory', hex: '#F3EFE7' }
    ]
  },
  {
    id: 'travertine-credenza',
    title: 'Meridian Travertine Table',
    category: 'living',
    categoryLabel: 'Living Room',
    material: 'travertine',
    materialLabel: 'Honed Roman Travertine',
    status: 'custom',
    statusLabel: 'Atelier Commission',
    priceNum: 2450,
    priceStr: '$2,450',
    dimensions: '54"L x 32"W x 14"H',
    leadTime: '3–4 Weeks',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=85',
    description: 'Low monolithic cocktail table crafted from unfilled honed Italian travertine with soft bullnose edging.',
    swatches: [
      { name: 'Warm Roman Travertine', class: 'swatch-sand', hex: '#D6C5AD' },
      { name: 'Charcoal Basalt', class: 'swatch-charcoal', hex: '#343630' }
    ]
  },
  {
    id: 'solarium-patio-bistro',
    title: 'Solarium Bistro Set',
    category: 'outdoor',
    categoryLabel: 'Outdoor & Patio',
    material: 'wicker',
    materialLabel: 'Aluminum & Synthetic Cord',
    status: 'in-stock',
    statusLabel: 'Ready to Ship',
    priceNum: 1680,
    priceStr: '$1,680',
    dimensions: 'Table: 36" Dia x 29"H + 2 Armchairs',
    leadTime: '1–2 Weeks',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=85',
    description: 'Intimate terrace dining trio combining slender dark aluminum architecture with woven all-weather backing.',
    swatches: [
      { name: 'Muted Sage Cord', class: 'swatch-sage', hex: '#A9A58B' },
      { name: 'Sand Beige Cord', class: 'swatch-sand', hex: '#D6C5AD' }
    ]
  }
];

// ==========================================================================
// 2. CURATED WISHLIST / COLLECTION STATE
// ==========================================================================
class JoyWishlist {
  constructor() {
    this.storageKey = 'joy_curated_collection';
    this.items = this.load();
    this.initDOM();
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {}
    this.render();
  }

  add(product, finishName) {
    const existing = this.items.find(i => i.id === product.id && i.finish === (finishName || product.swatches[0]?.name));
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        category: product.categoryLabel,
        priceNum: product.priceNum,
        priceStr: product.priceStr,
        image: product.image,
        finish: finishName || product.swatches[0]?.name || 'Standard Finish',
        quantity: 1
      });
    }
    this.save();
    this.triggerBadgeBump();
  }

  remove(id, finish) {
    this.items = this.items.filter(i => !(i.id === id && i.finish === finish));
    this.save();
  }

  updateQty(id, finish, delta) {
    const item = this.items.find(i => i.id === id && i.finish === finish);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.remove(id, finish);
    } else {
      this.save();
    }
  }

  has(id) {
    return this.items.some(i => i.id === id);
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  triggerBadgeBump() {
    const badges = document.querySelectorAll('.wishlist-badge-count');
    badges.forEach(b => {
      b.classList.add('bump');
      setTimeout(() => b.classList.remove('bump'), 400);
    });
  }

  initDOM() {
    this.render();

    // Toggle Wishlist Drawer listeners
    document.querySelectorAll('.js-open-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    const backdrop = document.querySelector('.drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.closeDrawer();
      });
    }

    const closeBtn = document.querySelector('.drawer-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    // WhatsApp Inquiry Dispatch
    const whatsappBtn = document.querySelector('.js-wishlist-whatsapp');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', (e) => {
        if (this.items.length === 0) {
          e.preventDefault();
          alert('Your curated collection is empty. Please select furniture pieces to request an itemized quotation.');
          return;
        }
        const phone = '18005694663';
        let text = `Hello JOY Luxury Furniture Concierge,\n\nI have curated the following pieces from your collection for my space:\n\n`;
        this.items.forEach((item, idx) => {
          text += `${idx + 1}. ${item.title} (${item.finish})\n   Qty: ${item.quantity} | Est: ${item.priceStr}\n`;
        });
        text += `\nTotal Guide Estimate: $${this.getTotal().toLocaleString()}\n\nKindly provide availability, lead times, and physical finish samples.`;
        whatsappBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      });
    }
  }

  openDrawer() {
    const backdrop = document.querySelector('.drawer-backdrop');
    if (backdrop) {
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const backdrop = document.querySelector('.drawer-backdrop');
    if (backdrop) {
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  render() {
    // Update Badge counts
    const count = this.getCount();
    document.querySelectorAll('.wishlist-badge-count').forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });

    // Update bookmark buttons state across the page
    document.querySelectorAll('.product-bookmark-btn').forEach(btn => {
      const pid = btn.getAttribute('data-product-id');
      if (this.has(pid)) {
        btn.classList.add('is-saved');
        btn.setAttribute('aria-label', 'Remove from Curated Collection');
      } else {
        btn.classList.remove('is-saved');
        btn.setAttribute('aria-label', 'Save to Curated Collection');
      }
    });

    // Render Drawer Content
    const container = document.querySelector('.drawer-content');
    const totalEl = document.querySelector('.drawer-subtotal-val');
    const footerEl = document.querySelector('.drawer-footer');

    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="wishlist-empty-state">
          <svg class="wishlist-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <h4>Your Curated Collection is Empty</h4>
          <p>Explore our catalog to select signature indoor and outdoor pieces for your project.</p>
          <a href="catalog.html" class="btn btn-gold btn-sm">Explore Collection</a>
        </div>
      `;
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (footerEl) footerEl.style.display = 'flex';
    if (totalEl) totalEl.textContent = `$${this.getTotal().toLocaleString()}`;

    container.innerHTML = this.items.map(item => `
      <div class="wishlist-item" data-id="${item.id}" data-finish="${item.finish}">
        <img src="${item.image}" alt="${item.title}" class="wishlist-item-img">
        <div class="wishlist-item-info">
          <span class="wishlist-item-category">${item.category}</span>
          <h4 class="wishlist-item-title">${item.title}</h4>
          <span class="wishlist-item-finish">Finish: ${item.finish}</span>
          <span class="wishlist-item-price">${item.priceStr}</span>
          <div class="wishlist-qty-ctrl">
            <button class="qty-btn js-qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn js-qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="wishlist-item-remove js-remove-item" aria-label="Remove item">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    `).join('');

    // Attach item listeners
    container.querySelectorAll('.js-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.wishlist-item');
        this.updateQty(row.dataset.id, row.dataset.finish, 1);
      });
    });

    container.querySelectorAll('.js-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.wishlist-item');
        this.updateQty(row.dataset.id, row.dataset.finish, -1);
      });
    });

    container.querySelectorAll('.js-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.wishlist-item');
        this.remove(row.dataset.id, row.dataset.finish);
      });
    });
  }
}

// Global Wishlist instance
window.joyWishlist = null;

// ==========================================================================
// 3. CATALOG FILTER & EXPLORER (FOR catalog.html)
// ==========================================================================
class JoyCatalogApp {
  constructor() {
    this.products = JOY_CATALOG;
    this.searchQuery = '';
    this.selectedCategories = [];
    this.selectedMaterials = [];
    this.selectedStatus = [];
    this.sortMode = 'featured';
    this.viewMode = 'grid'; // 'grid' | 'editorial'

    this.container = document.querySelector('#catalogProductsGrid');
    if (!this.container) return;

    this.initControls();
    this.render();
    this.fetchRemoteProducts();
  }

  fetchRemoteProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(result => {
        if (result && Array.isArray(result.data) && result.data.length > 0) {
          this.products = result.data;
          this.render();
        }
      })
      .catch(() => {});
  }

  initControls() {
    // Search input
    const searchInput = document.querySelector('#catalogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.render();
      });
    }

    // Category checkboxes
    document.querySelectorAll('.js-filter-category').forEach(cb => {
      cb.addEventListener('change', () => {
        this.selectedCategories = Array.from(document.querySelectorAll('.js-filter-category:checked')).map(el => el.value);
        this.render();
      });
    });

    // Material checkboxes
    document.querySelectorAll('.js-filter-material').forEach(cb => {
      cb.addEventListener('change', () => {
        this.selectedMaterials = Array.from(document.querySelectorAll('.js-filter-material:checked')).map(el => el.value);
        this.render();
      });
    });

    // Status checkboxes
    document.querySelectorAll('.js-filter-status').forEach(cb => {
      cb.addEventListener('change', () => {
        this.selectedStatus = Array.from(document.querySelectorAll('.js-filter-status:checked')).map(el => el.value);
        this.render();
      });
    });

    // Reset Filters link
    const resetBtn = document.querySelector('#catalogResetFilters');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.searchQuery = '';
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.js-filter-category, .js-filter-material, .js-filter-status').forEach(cb => cb.checked = false);
        this.selectedCategories = [];
        this.selectedMaterials = [];
        this.selectedStatus = [];
        this.render();
      });
    }

    // Sort selector
    const sortSelect = document.querySelector('#catalogSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortMode = e.target.value;
        this.render();
      });
    }

    // View mode switch
    const btnGrid = document.querySelector('#btnViewGrid');
    const btnEditorial = document.querySelector('#btnViewEditorial');
    if (btnGrid && btnEditorial) {
      btnGrid.addEventListener('click', () => {
        this.viewMode = 'grid';
        btnGrid.classList.add('is-active');
        btnEditorial.classList.remove('is-active');
        this.container.className = 'catalog-products-container mode-grid';
      });
      btnEditorial.addEventListener('click', () => {
        this.viewMode = 'editorial';
        btnEditorial.classList.add('is-active');
        btnGrid.classList.remove('is-active');
        this.container.className = 'catalog-products-container mode-editorial';
      });
    }
  }

  getFiltered() {
    return this.products.filter(item => {
      // Search check
      if (this.searchQuery) {
        const matchesQuery = item.title.toLowerCase().includes(this.searchQuery) ||
                             item.categoryLabel.toLowerCase().includes(this.searchQuery) ||
                             item.materialLabel.toLowerCase().includes(this.searchQuery) ||
                             item.description.toLowerCase().includes(this.searchQuery);
        if (!matchesQuery) return false;
      }

      // Category check
      if (this.selectedCategories.length > 0 && !this.selectedCategories.includes(item.category)) {
        return false;
      }

      // Material check
      if (this.selectedMaterials.length > 0 && !this.selectedMaterials.includes(item.material)) {
        return false;
      }

      // Status check
      if (this.selectedStatus.length > 0 && !this.selectedStatus.includes(item.status)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.sortMode === 'price-low') return a.priceNum - b.priceNum;
      if (this.sortMode === 'price-high') return b.priceNum - a.priceNum;
      if (this.sortMode === 'name') return a.title.localeCompare(b.title);
      return 0; // featured default
    });
  }

  render() {
    const items = this.getFiltered();

    // Update count display
    const countEl = document.querySelector('#catalogResultCount');
    if (countEl) {
      countEl.textContent = `Showing ${items.length} of ${this.products.length} bespoke pieces`;
    }

    // Render active filter pills
    const pillsRow = document.querySelector('#activeFilterPills');
    if (pillsRow) {
      let pillsHtml = '';
      [...this.selectedCategories, ...this.selectedMaterials, ...this.selectedStatus].forEach(val => {
        pillsHtml += `<span class="active-filter-pill">${val}</span>`;
      });
      pillsRow.innerHTML = pillsHtml;
    }

    if (items.length === 0) {
      this.container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 1rem; background-color: var(--color-white); border: 1px solid var(--border-subtle); border-radius: 4px;">
          <h3 style="font-size:1.8rem; margin-bottom:0.75rem;">No Furnishings Match Your Criteria</h3>
          <p style="color:var(--color-warm-taupe); margin-bottom:1.5rem;">Try relaxing your filters or search keywords.</p>
          <button class="btn btn-gold btn-sm" onclick="document.querySelector('#catalogResetFilters').click()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    this.container.innerHTML = items.map(p => `
      <article class="product-card" data-product-id="${p.id}">
        <div class="product-image-box">
          <img src="${p.image}" alt="${p.title}" class="product-image" loading="lazy">
          <span class="product-badge ${p.status === 'in-stock' ? 'gold' : ''}">${p.statusLabel}</span>
          <button class="product-bookmark-btn ${window.joyWishlist?.has(p.id) ? 'is-saved' : ''}" 
                  data-product-id="${p.id}" 
                  title="Save to Curated Collection">
            <svg viewBox="0 0 24 24" fill="${window.joyWishlist?.has(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>
        <div class="product-content">
          <span class="product-category">${p.categoryLabel} &bull; ${p.materialLabel}</span>
          <h3 class="product-title">${p.title}</h3>
          
          <!-- Swatches Selector -->
          <div class="swatch-group">
            <span class="swatch-label">Finish:</span>
            ${p.swatches.map((s, idx) => `
              <button class="swatch-dot ${s.class} ${idx === 0 ? 'is-active' : ''}" 
                      data-finish-name="${s.name}" 
                      title="${s.name}"></button>
            `).join('')}
          </div>

          <p class="product-description">${p.description}</p>
          <div class="product-price-box">
            <span class="product-price">${p.priceStr}</span>
            <span class="product-price-hint">Sample Estimate</span>
          </div>
          <div class="product-actions">
            <button class="btn btn-outline btn-sm js-catalog-quickview" data-product-id="${p.id}">Specifications</button>
            <button class="btn btn-gold btn-sm js-catalog-add-wishlist" data-product-id="${p.id}">+ Add to List</button>
          </div>
        </div>
      </article>
    `).join('');

    this.attachCardEvents();
  }

  attachCardEvents() {
    // Swatch clicking
    this.container.querySelectorAll('.swatch-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        const group = dot.closest('.swatch-group');
        group.querySelectorAll('.swatch-dot').forEach(d => d.classList.remove('is-active'));
        dot.classList.add('is-active');
      });
    });

    // Bookmark Wishlist Toggle
    this.container.querySelectorAll('.product-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pid = btn.dataset.productId;
        const prod = this.products.find(p => p.id === pid);
        if (!prod || !window.joyWishlist) return;

        if (window.joyWishlist.has(pid)) {
          window.joyWishlist.remove(pid, prod.swatches[0]?.name);
        } else {
          const card = btn.closest('.product-card');
          const activeSwatch = card?.querySelector('.swatch-dot.is-active')?.dataset.finishName;
          window.joyWishlist.add(prod, activeSwatch);
        }
      });
    });

    // Add to wishlist action button
    this.container.querySelectorAll('.js-catalog-add-wishlist').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.productId;
        const prod = this.products.find(p => p.id === pid);
        if (!prod || !window.joyWishlist) return;

        const card = btn.closest('.product-card');
        const activeSwatch = card?.querySelector('.swatch-dot.is-active')?.dataset.finishName;
        window.joyWishlist.add(prod, activeSwatch);
        window.joyWishlist.openDrawer();
      });
    });

    // Quick View Specifications
    this.container.querySelectorAll('.js-catalog-quickview').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.productId;
        const prod = this.products.find(p => p.id === pid);
        if (!prod) return;

        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (!modalBackdrop) return;

        modalBackdrop.querySelector('.modal-title').textContent = prod.title;
        modalBackdrop.querySelector('.modal-category').textContent = `${prod.categoryLabel} — ${prod.materialLabel}`;
        modalBackdrop.querySelector('.modal-price-val').textContent = prod.priceStr;
        modalBackdrop.querySelector('.modal-desc').textContent = prod.description;
        modalBackdrop.querySelector('.modal-image-pane img').src = prod.image;
        modalBackdrop.querySelector('.modal-spec-dimensions').textContent = prod.dimensions;
        modalBackdrop.querySelector('.modal-spec-materials').textContent = prod.materialLabel;
        modalBackdrop.querySelector('.modal-spec-leadtime').textContent = prod.leadTime;

        const waLink = modalBackdrop.querySelector('.modal-whatsapp-link');
        if (waLink) {
          waLink.href = `https://wa.me/18005694663?text=${encodeURIComponent('Hello JOY Concierge, I would like to inquire about specifications for ' + prod.title)}`;
        }

        modalBackdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
  }
}

// ==========================================================================
// 4. INTERACTIVE ROOM STUDIO CANVAS PLANNER (FOR studio.html)
// ==========================================================================
class JoyRoomStudio {
  constructor() {
    this.viewport = document.querySelector('#studioViewport');
    if (!this.viewport) return;

    this.placedItems = [];
    this.bgImage = this.viewport.querySelector('.studio-viewport-bg');

    this.roomPresets = {
      'patio': {
        name: 'Sunlit Outdoor Patio',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85'
      },
      'living': {
        name: 'Modern Living Sanctuary',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85'
      },
      'dining': {
        name: 'Penthouse Dining Room',
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85'
      }
    };

    this.init();
  }

  init() {
    // Room Preset Switching
    document.querySelectorAll('.js-room-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.js-room-preset').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const presetKey = btn.dataset.room;
        if (this.roomPresets[presetKey] && this.bgImage) {
          this.bgImage.src = this.roomPresets[presetKey].image;
        }
      });
    });

    // Palette tab switching
    document.querySelectorAll('.palette-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.palette-tab').forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        const cat = tab.dataset.category;
        document.querySelectorAll('.palette-item-card').forEach(item => {
          if (cat === 'all' || item.dataset.category === cat) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Add piece from palette to canvas
    document.querySelectorAll('.palette-item-card').forEach(item => {
      item.addEventListener('click', () => {
        const pid = item.dataset.productId;
        const prod = JOY_CATALOG.find(p => p.id === pid);
        if (prod) {
          this.addPiece(prod);
        }
      });
    });

    // Clear Canvas
    const clearBtn = document.querySelector('#studioClearCanvas');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.placedItems = [];
        this.renderCanvas();
      });
    }

    // Send Concept to WhatsApp
    const sendBtn = document.querySelector('#studioSendConcept');
    if (sendBtn) {
      sendBtn.addEventListener('click', (e) => {
        if (this.placedItems.length === 0) {
          e.preventDefault();
          alert('Please add at least one furniture piece to your room concept.');
          return;
        }
        const activeRoom = document.querySelector('.js-room-preset.is-active')?.textContent || 'Custom Room';
        let text = `Hello JOY Studio Designer,\n\nI created a room layout concept on your 3D Studio Planner for [${activeRoom}]:\n\n`;
        this.placedItems.forEach((item, idx) => {
          text += `${idx + 1}. ${item.title} (${item.priceStr})\n`;
        });
        text += `\nEstimated Investment: $${this.getTotal().toLocaleString()}\n\nCan your spatial design team review this layout and advise on dimensions and finishes?`;
        sendBtn.href = `https://wa.me/18005694663?text=${encodeURIComponent(text)}`;
      });
    }

    // Add default initial piece
    const defaultPiece = JOY_CATALOG[0];
    if (defaultPiece) {
      this.addPiece(defaultPiece, 35, 45);
    }
  }

  addPiece(product, customX, customY) {
    const x = customX !== undefined ? customX : Math.floor(Math.random() * 40 + 20);
    const y = customY !== undefined ? customY : Math.floor(Math.random() * 40 + 30);

    const instanceId = `${product.id}_${Date.now()}`;
    this.placedItems.push({
      instanceId: instanceId,
      productId: product.id,
      title: product.title,
      priceNum: product.priceNum,
      priceStr: product.priceStr,
      image: product.image,
      x: x,
      y: y
    });

    this.renderCanvas();
  }

  removePiece(instanceId) {
    this.placedItems = this.placedItems.filter(i => i.instanceId !== instanceId);
    this.renderCanvas();
  }

  getTotal() {
    return this.placedItems.reduce((sum, item) => sum + item.priceNum, 0);
  }

  renderCanvas() {
    // Remove existing pins
    this.viewport.querySelectorAll('.placed-furniture-item').forEach(el => el.remove());

    // Render new pins
    this.placedItems.forEach(item => {
      const pin = document.createElement('div');
      pin.className = 'placed-furniture-item';
      pin.style.left = `${item.x}%`;
      pin.style.top = `${item.y}%`;
      pin.dataset.instanceId = item.instanceId;

      pin.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="placed-item-thumb">
        <span class="placed-item-title">${item.title}</span>
        <button class="placed-item-remove-btn" title="Remove piece">&times;</button>
      `;

      // Dragging logic
      this.makeDraggable(pin, item);

      // Remove button
      pin.querySelector('.placed-item-remove-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.removePiece(item.instanceId);
      });

      this.viewport.appendChild(pin);
    });

    // Update Stats Summary
    const countEl = document.querySelector('#studioPlacedCount');
    const totalEl = document.querySelector('#studioPlacedTotal');
    if (countEl) countEl.textContent = this.placedItems.length;
    if (totalEl) totalEl.textContent = `$${this.getTotal().toLocaleString()}`;
  }

  makeDraggable(el, item) {
    let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;
    const viewport = this.viewport;

    const onPointerDown = (e) => {
      startX = e.clientX || e.touches[0].clientX;
      startY = e.clientY || e.touches[0].clientY;
      initialLeft = parseFloat(el.style.left);
      initialTop = parseFloat(el.style.top);

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const dx = clientX - startX;
      const dy = clientY - startY;

      const rect = viewport.getBoundingClientRect();
      const pctX = initialLeft + (dx / rect.width) * 100;
      const pctY = initialTop + (dy / rect.height) * 100;

      // Bound within canvas
      const clampedX = Math.max(5, Math.min(85, pctX));
      const clampedY = Math.max(10, Math.min(80, pctY));

      el.style.left = `${clampedX}%`;
      el.style.top = `${clampedY}%`;

      item.x = clampedX;
      item.y = clampedY;
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    el.addEventListener('pointerdown', onPointerDown);
  }
}

// ==========================================================================
// 5. FLOATING DESIGN CONCIERGE ASSISTANT
// ==========================================================================
class JoyConciergeWidget {
  constructor() {
    this.btn = document.querySelector('.concierge-widget-btn');
    this.modal = document.querySelector('.concierge-modal');
    if (!this.btn || !this.modal) return;

    this.init();
  }

  init() {
    this.btn.addEventListener('click', () => {
      this.modal.classList.toggle('is-open');
    });

    const closeBtn = this.modal.querySelector('.concierge-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.modal.classList.remove('is-open');
      });
    }

    // Quick Prompts
    this.modal.querySelectorAll('.quick-prompt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const promptKey = btn.dataset.prompt;
        this.handlePrompt(promptKey);
      });
    });
  }

  handlePrompt(key) {
    const body = this.modal.querySelector('.concierge-body');
    if (!body) return;

    let userLabel = '';
    let queryPayload = '';
    if (key === 'outdoor') {
      userLabel = 'Recommend an outdoor patio set';
      queryPayload = 'outdoor patio furniture';
    } else if (key === 'living') {
      userLabel = 'Living room modular sectional recommendation';
      queryPayload = 'living room modular sofa';
    } else if (key === 'samples') {
      userLabel = 'Request fabric & timber samples';
      queryPayload = 'fabric samples';
    }

    body.insertAdjacentHTML('beforeend', `<div class="concierge-msg user">${userLabel}</div>`);
    body.insertAdjacentHTML('beforeend', `
      <div class="concierge-msg bot js-concierge-thinking" style="color:var(--color-warm-taupe);">
        Consulting JOY Studio Atelier...
      </div>
    `);
    body.scrollTop = body.scrollHeight;

    // Call Backend API: POST /api/concierge
    fetch('/api/concierge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: queryPayload })
    })
    .then(res => res.json())
    .then(data => {
      body.querySelector('.js-concierge-thinking')?.remove();
      let suggestionsHtml = '';
      if (data.suggestedProducts && data.suggestedProducts.length > 0) {
        suggestionsHtml = `
          <div style="margin-top:0.75rem; display:flex; flex-direction:column; gap:0.4rem;">
            ${data.suggestedProducts.slice(0, 2).map(sp => `
              <div style="padding:0.45rem 0.65rem; background:rgba(214,197,173,0.25); border-radius:2px; font-size:0.78rem; display:flex; justify-content:space-between; align-items:center;">
                <span><strong>${sp.title}</strong> (${sp.priceStr})</span>
                <a href="catalog.html" class="link-editorial" style="font-size:0.7rem;">View</a>
              </div>
            `).join('')}
          </div>
        `;
      }

      body.insertAdjacentHTML('beforeend', `
        <div class="concierge-msg bot">
          ${data.reply}
          ${suggestionsHtml}
        </div>
      `);
      body.scrollTop = body.scrollHeight;
    })
    .catch(() => {
      body.querySelector('.js-concierge-thinking')?.remove();
      body.insertAdjacentHTML('beforeend', `
        <div class="concierge-msg bot">
          Our studio curators specialize in tailored living and outdoor sanctuaries. You may explore our interactive catalog or speak with a concierge on WhatsApp.
        </div>
      `);
      body.scrollTop = body.scrollHeight;
    });
  }
}

// ==========================================================================
// 6. PWA INSTALL & SERVICE WORKER SETUP
// ==========================================================================
function initPWA() {
  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  // PWA Install Prompt Banner
  let deferredPrompt;
  const banner = document.querySelector('.pwa-install-banner');
  const installBtn = document.querySelector('#pwaInstallBtn');
  const dismissBtn = document.querySelector('#pwaDismissBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (banner && !sessionStorage.getItem('pwa_dismissed')) {
      banner.classList.add('is-visible');
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', () => {
      if (banner) banner.classList.remove('is-visible');
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
      }
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      if (banner) banner.classList.remove('is-visible');
      sessionStorage.setItem('pwa_dismissed', 'true');
    });
  }
}

// ==========================================================================
// 8. CLIENT AUTHENTICATION & VIP PORTAL (JoyAuth)
// ==========================================================================
class JoyAuth {
  constructor() {
    this.currentUser = null;
    this.token = null;
    this.init();
  }

  init() {
    this.loadSession();
    this.bindEvents();
    this.renderHeaderAuth();
    this.renderOnPageAuth();
  }

  loadSession() {
    try {
      const storedUser = localStorage.getItem('joy_auth_user');
      const storedToken = localStorage.getItem('joy_auth_token');
      if (storedUser && storedToken) {
        this.currentUser = JSON.parse(storedUser);
        this.token = storedToken;
      }
    } catch (e) {
      this.currentUser = null;
      this.token = null;
    }
  }

  saveSession(user, token) {
    this.currentUser = user;
    this.token = token;
    try {
      localStorage.setItem('joy_auth_user', JSON.stringify(user));
      localStorage.setItem('joy_auth_token', token);
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('joy-auth-changed', { detail: { user } }));
    this.renderHeaderAuth();
    this.renderOnPageAuth();
    this.prefillContactForms();
  }

  logout() {
    try {
      localStorage.removeItem('joy_auth_user');
      localStorage.removeItem('joy_auth_token');
    } catch (e) {}
    this.currentUser = null;
    this.token = null;
    window.dispatchEvent(new CustomEvent('joy-auth-changed', { detail: { user: null } }));
    this.renderHeaderAuth();
    this.renderOnPageAuth();
    if (window.location.pathname.includes('account.html')) {
      window.location.href = 'index.html';
    } else {
      this.showToast('Signed out of JOY Private Client Services');
    }
  }

  openModal(mode = 'login') {
    const modal = document.querySelector('#authModal');
    if (!modal) return;
    this.switchTab(mode);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.querySelector('#authModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const loginErr = document.querySelector('#authLoginError');
    const regErr = document.querySelector('#authRegisterError');
    if (loginErr) loginErr.style.display = 'none';
    if (regErr) regErr.style.display = 'none';
  }

  switchTab(tabName) {
    const tabs = document.querySelectorAll('.auth-tab-btn');
    const panes = document.querySelectorAll('.auth-form-pane');
    tabs.forEach(t => {
      const isActive = t.getAttribute('data-tab') === tabName;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panes.forEach(p => {
      const isActive = p.id === `authFormPane${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`;
      p.classList.toggle('is-active', isActive);
    });
  }

  async handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = (form.querySelector('[name="email"]')?.value || '').trim();
    const password = (form.querySelector('[name="password"]')?.value || '').trim();
    const errorEl = form.querySelector('.auth-error-banner') || form.closest('.home-auth-pane')?.querySelector('.auth-error-banner') || document.querySelector('#authLoginError');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!email || !password) {
      if (errorEl) {
        errorEl.textContent = 'Please enter both your client email and passcode.';
        errorEl.style.display = 'block';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="width:16px;height:16px;animation:spin 1s linear infinite;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="4" stroke-opacity="0.25"/>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg> Signing In...
      `;
    }
    if (errorEl) errorEl.style.display = 'none';

    try {
      const res = await fetch('/api/auth?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication unverified.');
      }
      this.saveSession(data.user, data.token);
      this.closeModal();
      this.showToast(`Welcome back, ${data.user.fullName}`);
      form.reset();
      if (typeof window.renderAccountPortal === 'function') {
        window.renderAccountPortal();
      }
    } catch (err) {
      if (errorEl) {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In to Client Account';
      }
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const fullName = (form.querySelector('[name="fullName"]')?.value || '').trim();
    const email = (form.querySelector('[name="email"]')?.value || '').trim();
    const phone = (form.querySelector('[name="phone"]')?.value || '').trim();
    const clientType = form.querySelector('[name="clientType"]')?.value || 'Private Residence';
    const street = (form.querySelector('[name="street"]')?.value || '').trim();
    const city = (form.querySelector('[name="city"]')?.value || '').trim();
    const state = (form.querySelector('[name="state"]')?.value || '').trim();
    const zip = (form.querySelector('[name="zip"]')?.value || '').trim();
    const password = (form.querySelector('[name="password"]')?.value || '').trim();
    const errorEl = form.querySelector('.auth-error-banner') || form.closest('.home-auth-pane')?.querySelector('.auth-error-banner') || document.querySelector('#authRegisterError');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!fullName || !email || !password) {
      if (errorEl) {
        errorEl.textContent = 'Please complete all required fields (Name, Email, Passcode).';
        errorEl.style.display = 'block';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="width:16px;height:16px;animation:spin 1s linear infinite;display:inline-block;vertical-align:middle;margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="4" stroke-opacity="0.25"/>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg> Registering Account...
      `;
    }
    if (errorEl) errorEl.style.display = 'none';

    try {
      const res = await fetch('/api/auth?action=register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          clientType,
          password,
          address: { street, city, state, zip }
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed.');
      }
      this.saveSession(data.user, data.token);
      this.closeModal();
      this.showToast(`Welcome to JOY Private Client Services, ${data.user.fullName}`);
      form.reset();
      if (typeof window.renderAccountPortal === 'function') {
        window.renderAccountPortal();
      }
    } catch (err) {
      if (errorEl) {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Details & Register VIP Access';
      }
    }
  }

  loginAsDemoVIP() {
    const emailInputs = [
      document.querySelector('#homeLoginForm [name="email"]'),
      document.querySelector('#authLoginForm [name="email"]')
    ].filter(Boolean);

    const passInputs = [
      document.querySelector('#homeLoginForm [name="password"]'),
      document.querySelector('#authLoginForm [name="password"]')
    ].filter(Boolean);

    if (emailInputs.length > 0 && passInputs.length > 0) {
      emailInputs[0].value = 'eleanor@vance-residence.com';
      passInputs[0].value = 'password123';
      const form = emailInputs[0].closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  }

  renderOnPageAuth() {
    const signedOutEl = document.getElementById('homeAuthSignedOut');
    const signedInEl = document.getElementById('homeAuthSignedIn');
    if (!signedOutEl || !signedInEl) return;

    if (this.currentUser) {
      signedOutEl.style.display = 'none';
      signedInEl.style.display = 'block';

      const avatarEl = document.getElementById('homeClientAvatar');
      const nameEl = document.getElementById('homeClientFullName');
      const idEl = document.getElementById('homeClientIdBadge');

      const initials = this.currentUser.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'VIP';
      if (avatarEl) avatarEl.textContent = initials;
      if (nameEl) nameEl.textContent = this.currentUser.fullName;
      if (idEl) idEl.textContent = this.currentUser.id || 'JOY-CLIENT-1001';
    } else {
      signedOutEl.style.display = 'block';
      signedInEl.style.display = 'none';
    }
  }

  renderHeaderAuth() {
    const authContainers = document.querySelectorAll('.js-header-auth-container');
    authContainers.forEach(container => {
      if (this.currentUser) {
        const initials = this.currentUser.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'VIP';
        const firstName = this.currentUser.fullName.split(' ')[0] || 'Client';
        container.innerHTML = `
          <div class="client-profile-pill" tabindex="0" role="button" aria-haspopup="true" aria-label="Client Account Menu">
            <div class="client-avatar-circle">${initials}</div>
            <span class="client-name">${firstName}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
            <div class="client-menu-dropdown" role="menu">
              <div style="padding: 0.5rem 1.25rem 0.25rem; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-mustard-gold-hover); font-weight:700;">
                ${this.currentUser.id || 'JOY VIP CLIENT'}
              </div>
              <div style="padding: 0 1.25rem 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--color-deep-charcoal); border-bottom: 1px solid var(--border-subtle); margin-bottom: 0.35rem;">
                ${this.currentUser.fullName}
              </div>
              <a href="account.html" class="client-menu-item" role="menuitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Client Portal & Sanctuary
              </a>
              <a href="account.html#inquiries" class="client-menu-item" role="menuitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                My Inquiries & Quotes
              </a>
              <a href="studio.html" class="client-menu-item" role="menuitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                Room Studio 3D Canvas
              </a>
              <div class="client-menu-divider"></div>
              <button class="client-menu-item js-auth-logout" style="width:100%; border:none; background:none; text-align:left; color:#b91c1c; cursor:pointer;" role="menuitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <button class="btn btn-outline client-auth-btn js-open-auth-btn" aria-label="Client Sign In">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Client Sign In</span>
          </button>
        `;
      }
    });

    // Mobile drawer auth triggers
    const mobileAuthContainers = document.querySelectorAll('.js-mobile-auth-container');
    mobileAuthContainers.forEach(container => {
      if (this.currentUser) {
        container.innerHTML = `
          <div style="padding: 1rem 0; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 1rem;">
            <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-mustard-gold); margin-bottom: 0.25rem; font-weight:700;">VIP Client</div>
            <div style="font-weight: 600; font-size: 1rem; color: #fff; margin-bottom: 0.75rem;">${this.currentUser.fullName}</div>
            <a href="account.html" class="btn btn-gold" style="width:100%; justify-content:center; margin-bottom:0.5rem; text-decoration:none;">Open Client Portal</a>
            <button class="btn btn-outline js-auth-logout" style="width:100%; justify-content:center; border-color:rgba(255,255,255,0.25); color:#fff;">Sign Out</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="padding: 1rem 0; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 1rem;">
            <button class="btn btn-gold js-open-auth-btn" style="width:100%; justify-content:center;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Client Sign In / Register
            </button>
          </div>
        `;
      }
    });

    this.bindDynamicAuthElements();
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.js-open-auth-btn');
      if (openBtn) {
        e.preventDefault();
        const mode = openBtn.dataset.authMode || 'login';
        this.openModal(mode);
        return;
      }

      const closeBtn = e.target.closest('.auth-modal-close-btn') || e.target.closest('.js-close-auth-modal');
      if (closeBtn) {
        e.preventDefault();
        this.closeModal();
        return;
      }

      if (e.target.classList.contains('auth-modal-backdrop')) {
        this.closeModal();
        return;
      }

      const tabBtn = e.target.closest('.auth-tab-btn');
      if (tabBtn) {
        e.preventDefault();
        this.switchTab(tabBtn.getAttribute('data-tab'));
        return;
      }

      const demoBtn = e.target.closest('#authDemoVipBtn');
      if (demoBtn) {
        e.preventDefault();
        this.loginAsDemoVIP();
        return;
      }

      const logoutBtn = e.target.closest('.js-auth-logout');
      if (logoutBtn) {
        e.preventDefault();
        this.logout();
        return;
      }
    });

    const loginForm = document.querySelector('#authLoginForm');
    if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));

    const registerForm = document.querySelector('#authRegisterForm');
    if (registerForm) registerForm.addEventListener('submit', (e) => this.handleRegister(e));

    // On-Page Homepage Client Portal Forms
    const homeRegForm = document.getElementById('homeRegisterForm');
    if (homeRegForm) homeRegForm.addEventListener('submit', (e) => this.handleRegister(e));

    const homeLogForm = document.getElementById('homeLoginForm');
    if (homeLogForm) homeLogForm.addEventListener('submit', (e) => this.handleLogin(e));

    // On-Page Tabs Switcher
    const homeTabBtns = document.querySelectorAll('.home-auth-tab-btn');
    homeTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.homeTab;
        homeTabBtns.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const paneReg = document.getElementById('homeAuthPaneRegister');
        const paneLog = document.getElementById('homeAuthPaneLogin');
        if (paneReg && paneLog) {
          paneReg.classList.toggle('is-active', target === 'register');
          paneLog.classList.toggle('is-active', target === 'login');
        }
      });
    });

    // On-Page Demo Access Buttons
    const demoHome1 = document.getElementById('homeDemoAccessBtn');
    const demoHome2 = document.getElementById('homeDemoAccessBtn2');
    if (demoHome1) demoHome1.addEventListener('click', () => this.loginAsDemoVIP());
    if (demoHome2) demoHome2.addEventListener('click', () => this.loginAsDemoVIP());

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });

    this.prefillContactForms();
  }

  bindDynamicAuthElements() {
    const pills = document.querySelectorAll('.client-profile-pill');
    pills.forEach(pill => {
      pill.onclick = (e) => {
        if (!e.target.closest('.client-menu-dropdown')) {
          pill.classList.toggle('is-open');
        }
      };
    });
  }

  prefillContactForms() {
    if (!this.currentUser) return;
    const contactName = document.querySelector('#fullName') || document.querySelector('#contactName');
    const contactEmail = document.querySelector('#email') || document.querySelector('#contactEmail');
    const contactPhone = document.querySelector('#phone') || document.querySelector('#contactPhone');
    if (contactName && !contactName.value) contactName.value = this.currentUser.fullName || '';
    if (contactEmail && !contactEmail.value) contactEmail.value = this.currentUser.email || '';
    if (contactPhone && !contactPhone.value) contactPhone.value = this.currentUser.phone || '';
  }

  showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'wishlist-toast is-visible';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
}

// Global Auth instance
window.joyAuth = null;

// ==========================================================================
// 7. BOOTSTRAP ON LOAD
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  window.joyWishlist = new JoyWishlist();
  window.joyCatalogApp = new JoyCatalogApp();
  window.joyRoomStudio = new JoyRoomStudio();
  window.joyConcierge = new JoyConciergeWidget();
  window.joyAuth = new JoyAuth();
  initPWA();
});
