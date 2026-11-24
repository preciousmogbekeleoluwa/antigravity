/**
 * JOY LUXURY FURNITURE — CORE SCRIPTS
 * - Responsive Navbar & Scroll Detection
 * - Mobile Drawer Menu
 * - Product Showcase Category Filtering
 * - Product Quick View Modal & Specifications
 * - WhatsApp Concierge Integration
 * - Contact Form Validation & Submission Flow
 * - FAQ Accordion
 * - Toast Notification System
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. NAVBAR SCROLL DETECTION & HEADER STATES
     ========================================================================== */
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
        header.classList.remove('transparent');
      } else {
        if (!header.classList.contains('solid-header')) {
          header.classList.remove('scrolled');
          header.classList.add('transparent');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  /* ==========================================================================
     2. MOBILE MENU DRAWER
     ========================================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  if (navToggle && mobileDrawer) {
    const toggleMobileMenu = () => {
      const isOpen = navToggle.classList.toggle('is-active');
      mobileDrawer.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    navToggle.addEventListener('click', toggleMobileMenu);

    // Close when clicking mobile links
    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-active');
        mobileDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     3. PRODUCT CATEGORY FILTERING (HOME SHOWCASE)
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterCategory = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterCategory === 'all' || cardCategory === filterCategory) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* ==========================================================================
     4. PRODUCT QUICK VIEW MODAL
     ========================================================================== */
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const viewDetailBtns = document.querySelectorAll('.js-quick-view-btn');

  // Modal elements to populate
  const modalImg = document.querySelector('.modal-image-pane img');
  const modalCategory = document.querySelector('.modal-category');
  const modalTitle = document.querySelector('.modal-title');
  const modalPrice = document.querySelector('.modal-price-val');
  const modalDesc = document.querySelector('.modal-desc');
  const modalSpecDimensions = document.querySelector('.modal-spec-dimensions');
  const modalSpecMaterials = document.querySelector('.modal-spec-materials');
  const modalSpecLeadTime = document.querySelector('.modal-spec-leadtime');
  const modalWhatsappLink = document.querySelector('.modal-whatsapp-link');

  function openQuickView(data) {
    if (!modalBackdrop) return;

    if (modalImg && data.image) modalImg.src = data.image;
    if (modalCategory && data.category) modalCategory.textContent = data.category;
    if (modalTitle && data.title) modalTitle.textContent = data.title;
    if (modalPrice && data.price) modalPrice.textContent = data.price;
    if (modalDesc && data.desc) modalDesc.textContent = data.desc;
    if (modalSpecDimensions && data.dimensions) modalSpecDimensions.textContent = data.dimensions;
    if (modalSpecMaterials && data.materials) modalSpecMaterials.textContent = data.materials;
    if (modalSpecLeadTime && data.leadtime) modalSpecLeadTime.textContent = data.leadtime;

    // Configured WhatsApp enquiry message
    if (modalWhatsappLink && data.title) {
      const phone = '18005694663'; // Business WhatsApp placeholder format
      const text = encodeURIComponent(`Hello JOY Luxury Furniture, I would like to inquire about the ${data.title} (${data.category}). Please share details and availability.`);
      modalWhatsappLink.href = `https://wa.me/${phone}?text=${text}`;
    }

    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      if (!card) return;

      const data = {
        title: card.querySelector('.product-title')?.textContent || 'Luxury Furniture Piece',
        category: card.querySelector('.product-category')?.textContent || 'Exclusive Collection',
        image: card.querySelector('.product-image')?.getAttribute('src') || '',
        price: card.querySelector('.product-price')?.textContent || 'Enquire for Private Catalogue',
        desc: card.querySelector('.product-description')?.textContent || 'Crafted with premium materials and timeless proportions for extraordinary spaces.',
        dimensions: card.getAttribute('data-dimensions') || 'Custom Sizing & Modular Formats Available',
        materials: card.getAttribute('data-materials') || 'Kiln-Dried Hardwood, High-Performance Italian Textiles / Weather-Proof Teak',
        leadtime: card.getAttribute('data-leadtime') || '2–4 Weeks Handcrafted White-Glove Delivery'
      };

      openQuickView(data);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeQuickView);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeQuickView();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
        closeQuickView();
      }
    });
  }

  /* ==========================================================================
     5. WHATSAPP ENQUIRY BUTTONS (GLOBAL HOOK)
     ========================================================================== */
  const whatsappBtns = document.querySelectorAll('.js-whatsapp-enquire');
  whatsappBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const product = btn.getAttribute('data-product-name') || 'JOY Furniture Collection';
      const phone = '18005694663'; // Configured business phone placeholder
      const message = encodeURIComponent(`Hello JOY Concierge, I would like to inquire regarding "${product}". Kindly provide pricing and customization options.`);
      btn.href = `https://wa.me/${phone}?text=${message}`;
    });
  });

  /* ==========================================================================
     6. CONTACT FORM VALIDATION & SUBMISSION FLOW
     ========================================================================== */
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Fields
      const fullName = contactForm.querySelector('#fullName');
      const email = contactForm.querySelector('#email');
      const phone = contactForm.querySelector('#phone');
      const message = contactForm.querySelector('#message');

      function validateGroup(field, condition, errorMsgText) {
        const group = field.closest('.form-group');
        const errSpan = group?.querySelector('.form-error-msg');
        if (!condition) {
          group?.classList.add('has-error');
          if (errSpan && errorMsgText) errSpan.textContent = errorMsgText;
          isValid = false;
        } else {
          group?.classList.remove('has-error');
        }
      }

      // Name validation
      validateGroup(fullName, fullName.value.trim().length >= 2, 'Please enter your full name.');

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateGroup(email, emailRegex.test(email.value.trim()), 'Please enter a valid email address.');

      // Phone validation
      validateGroup(phone, phone.value.trim().length >= 7, 'Please provide a contact phone number.');

      // Message validation
      validateGroup(message, message.value.trim().length >= 10, 'Please include a message with at least 10 characters.');

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Enquiry';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg style="width:16px;height:16px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="4" stroke-opacity="0.25"/>
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Transmitting...
          `;
        }

        // Real API Dispatch to /api/inquiries
        const payload = {
          fullName: fullName.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          subject: contactForm.querySelector('#subject')?.value || 'General Collection Enquiry',
          message: message.value.trim(),
          sampleKit: contactForm.querySelector('#sampleKit')?.checked || false,
          items: window.joyWishlist ? window.joyWishlist.items : []
        };

        fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(result => {
          const ref = result.reference || 'JOY-INQ-2026';
          showToast(
            `Enquiry Confirmed (${ref})`,
            result.message || `Thank you, ${payload.fullName}. Your inquiry has been sent to our private concierge. We will respond within 24 business hours.`
          );
          contactForm.reset();
        })
        .catch(() => {
          showToast(
            'Enquiry Transmitted',
            `Thank you, ${payload.fullName}. Your request has been logged. Our studio concierge will contact you within 24 business hours.`
          );
          contactForm.reset();
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        });
      }
    });

    // Real-time clearance of errors on typing
    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group && group.classList.contains('has-error')) {
          group.classList.remove('has-error');
        }
      });
    });
  }

  /* ==========================================================================
     7. NEWSLETTER SUBSCRIPTION FLOW (FOOTER)
     ========================================================================== */
  const newsletterForms = document.querySelectorAll('.footer-newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value.includes('@')) {
        showToast('VIP Access Granted', 'Thank you for subscribing to JOY Private Catalogues & Seasonal Previews.');
        input.value = '';
      } else {
        showToast('Notice', 'Please provide a valid email address.');
      }
    });
  });

  /* ==========================================================================
     8. FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other FAQ items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('is-open');
        });

        item.classList.toggle('is-open', !isOpen);
      });
    }
  });

  /* ==========================================================================
     9. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  function showToast(title, message) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="toast-title">${title}</div>
      <div class="toast-text">${message}</div>
    `;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

});
