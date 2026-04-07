// ============================================================
// CLAW4SCIENCE — Main JS
// ============================================================

// ── Nav toggle ──────────────────────────────────────────────
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // close on link click
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
    })
  );

  // active link
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const normHref = href.replace(/\/$/, '') || '/';
    if (normHref === path || (path === '/' && normHref === 'index.html'))
      a.classList.add('active');
    if (path.includes('blog') && href.includes('blog'))
      a.classList.add('active');
    if (path.includes('about') && href.includes('about'))
      a.classList.add('active');
    if (path.includes('skill-hubs') && href.includes('skill-hubs'))
      a.classList.add('active');
  });
})();

// ── FAQ accordion ────────────────────────────────────────────
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ── Animate on scroll ────────────────────────────────────────
(function () {
  if (!window.IntersectionObserver) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .stat-card, .blog-card, .skill-hub-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });
})();

// ── Particle background ──────────────────────────────────────
(function () {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = (0.2 + Math.random() * 0.5).toString();
    const size = 1 + Math.random() * 3;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    container.appendChild(p);
  }
})();

// ── Project Grid (index page) ────────────────────────────────
(function () {
  const grid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('search-input');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const noResults = document.getElementById('no-results');
  const resultCount = document.getElementById('result-count');

  if (!grid || typeof PROJECTS === 'undefined') return;

  let activeCategory = 'all';
  let searchQuery = '';

  function getLangColor(cls) {
    const map = {
      'lang-typescript': '#2b7489',
      'lang-javascript': '#f1e05a',
      'lang-python': '#3572A5',
      'lang-rust': '#dea584',
      'lang-go': '#00ADD8',
      'lang-shell': '#89e051',
      'lang-zig': '#ec915c'
    };
    return map[cls] || '#8BAAC8';
  }

  function renderCard(p) {
    const badge = p.badge === 'new' ? `<span class="badge-new">🔥 New</span>` : '';
    const tags = p.tags.slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('');
    const links = p.links.map(l =>
      `<a class="card-link" href="${l.url}" target="_blank" rel="noopener noreferrer">
        ${l.label === 'GitHub' ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.9 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>' : '🔗'} ${l.label}
      </a>`
    ).join('');

    return `
      <div class="project-card" data-category="${p.category}" data-name="${p.name.toLowerCase()}" data-tags="${p.tags.join(' ').toLowerCase()}" data-desc="${p.desc.toLowerCase()}">
        <div class="card-header">
          <div class="project-icon-placeholder">${p.icon}</div>
          <div class="card-title-row">
            <div class="card-name">${p.name} ${badge}</div>
            <div class="card-meta">
              <span class="card-stars">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="color:#f0c040"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ${p.stars}
              </span>
              <span class="card-lang">
                <span class="lang-dot" style="background:${getLangColor(p.langClass)}"></span>
                ${p.lang}
              </span>
            </div>
          </div>
        </div>
        <p class="card-desc">${p.desc}</p>
        <div class="card-tags">${tags}</div>
        <div class="card-links">${links}</div>
      </div>`;
  }

  function renderWatching() {
    const watchSection = document.getElementById('watching-grid');
    if (!watchSection || typeof WATCHING === 'undefined') return;
    watchSection.innerHTML = WATCHING.map(w =>
      `<a class="watching-item" href="${w.url}" target="_blank" rel="noopener noreferrer">
        ${w.name}
        <span class="watching-stars">★ ${w.stars}</span>
      </a>`
    ).join('');
  }

  function render() {
    const filtered = PROJECTS.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.categoryLabel.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    grid.innerHTML = filtered.map(renderCard).join('');

    if (noResults) {
      noResults.style.display = filtered.length === 0 ? 'block' : 'none';
    }

    if (resultCount) {
      resultCount.textContent = `${filtered.length} project${filtered.length !== 1 ? 's' : ''}`;
    }

    // update tab counts
    filterTabs.forEach(tab => {
      const cat = tab.dataset.category;
      const countEl = tab.querySelector('.count');
      if (!countEl) return;
      if (cat === 'all') {
        countEl.textContent = PROJECTS.length;
      } else {
        const n = PROJECTS.filter(p => p.category === cat).length;
        countEl.textContent = n;
      }
    });

    renderWatching();

    // re-trigger scroll animations
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.05 });

      grid.querySelectorAll('.project-card').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.35s ease ${i * 0.03}s, transform 0.35s ease ${i * 0.03}s`;
        observer.observe(el);
      });
    }
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category;
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value;
      render();
    });
  }

  render();
})();
