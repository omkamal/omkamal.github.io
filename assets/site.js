/* ==========================================================================
   OMAR KAMAL HOSNEY — MERIDIAN MONOGRAPH INTERACTIVE ENGINE
   Zero-dependency vanilla JS for GitHub Pages
   ========================================================================== */

(function () {
  const docEl = document.documentElement;
  docEl.classList.add('js');

  const ROOT = (docEl.getAttribute('data-root') || '.').replace(/\/$/, '');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Theme Engine (Dark default, Light archival paper) ---------- */
  function getStoredTheme() {
    try {
      return localStorage.getItem('omar-theme');
    } catch (_) {
      return null;
    }
  }

  function applyTheme(theme) {
    const t = theme === 'light' ? 'light' : 'dark';
    docEl.setAttribute('data-theme', t);
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to archival paper light theme' : 'Switch to obsidian dark theme');
      btn.setAttribute('title', t === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
    window.dispatchEvent(new CustomEvent('omar:theme', { detail: { theme: t } }));
  }

  const initialTheme = getStoredTheme() || docEl.getAttribute('data-theme') || 'dark';
  applyTheme(initialTheme);

  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-theme-toggle]');
    if (!toggle) return;
    const next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('omar-theme', next); } catch (_) {}
    applyTheme(next);
  });

  /* ---------- 2. Sticky Header & Top Scroll Progress ---------- */
  function initScrollUI() {
    const header = document.querySelector('.site-header');
    const bar = document.querySelector('.scroll-progress');
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle('is-scrolled', y > 16);
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        bar.style.transform = `scaleX(${p})`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 3. Mobile Drawer ---------- */
  function initMobileDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    if (!drawer) return;
    const open = () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    document.querySelectorAll('[data-mobile-open]').forEach((b) => b.addEventListener('click', open));
    document.querySelectorAll('[data-mobile-close]').forEach((b) => b.addEventListener('click', close));
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer || e.target.closest('.mobile-links a')) close();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) close();
    });
  }

  /* ---------- 4. Spotlight Cards & 3D Hover Physics ---------- */
  function initSurfacePhysics() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.spot-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });

    if (!reduceMotion) {
      document.querySelectorAll('[data-tilt]').forEach((el) => {
        el.addEventListener('pointermove', (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          const rx = (0.5 - py) * 6;
          const ry = (px - 0.5) * 8;
          el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-3px)`;
        });
        el.addEventListener('pointerleave', () => {
          el.style.transform = '';
        });
      });
    }
  }

  /* ---------- 5. Scroll Reveal & Count-Up Telemetry ---------- */
  function initReveals() {
    const els = document.querySelectorAll('.reveal');
    if (els.length) {
      if (reduceMotion || !('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('in-view'));
      } else {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          });
        }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
        els.forEach((el) => io.observe(el));
      }
    }

    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          cio.unobserve(el);
          const target = parseFloat(el.getAttribute('data-count') || '0');
          const suffix = el.getAttribute('data-suffix') || '';
          const start = performance.now();
          const dur = 1100;
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      }, { threshold: 0.4 });
      counters.forEach((c) => cio.observe(c));
    }
  }

  /* ---------- 6. Sparse-Matrix & Knowledge-Graph Hero Canvas ---------- */
  function initMeridianCanvas() {
    const canvas = document.getElementById('meridian-canvas');
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1;
    let nodes = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(320, rect.width) * dpr;
      H = Math.max(320, rect.height) * dpr;
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const count = Math.min(64, Math.max(28, Math.floor((rect.width * rect.height) / 15000)));
      nodes = Array.from({ length: count }, (_, idx) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.32 * dpr,
        vy: (Math.random() - 0.5) * 0.32 * dpr,
        r: (idx % 7 === 0 ? 2.6 : 1.5) * dpr,
        hub: idx % 7 === 0
      }));
    }

    resize();
    window.addEventListener('resize', resize);

    canvas.parentElement.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    }, { passive: true });
    canvas.parentElement.addEventListener('pointerleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    function frame() {
      ctx.clearRect(0, 0, W, H);
      const isLight = docEl.getAttribute('data-theme') === 'light';
      const hubCol = isLight ? '11, 70, 196' : '232, 168, 56';
      const nodeCol = isLight ? '40, 46, 59' : '148, 163, 184';
      const edgeCol = isLight ? '11, 70, 196' : '96, 165, 250';
      const maxDist = 145 * dpr;

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 170 * dpr && dm > 1) {
          p.x += (dxm / dm) * 0.38 * dpr;
          p.y += (dym / dm) * 0.38 * dpr;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * (isLight ? 0.14 : 0.17);
            ctx.strokeStyle = `rgba(${edgeCol}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of nodes) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (p.hub) {
          ctx.fillStyle = `rgba(${hubCol}, ${isLight ? 0.72 : 0.85})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hubCol}, 0.12)`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${nodeCol}, ${isLight ? 0.32 : 0.42})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- 7. Universal Command Palette (⌘K) ---------- */
  let cmdkReady = false;
  let cmdkBackdrop = null;
  let cmdkInput = null;
  let cmdkResults = null;
  let cmdkFilter = 'All';
  let selectedIdx = 0;
  let currentMatches = [];

  function ensureCatalog() {
    return new Promise((resolve) => {
      if (Array.isArray(window.OMAR_CATALOG)) return resolve(window.OMAR_CATALOG);
      const s = document.createElement('script');
      s.src = `${ROOT}/assets/catalog.js`;
      s.onload = () => resolve(window.OMAR_CATALOG || []);
      s.onerror = () => resolve([]);
      document.head.appendChild(s);
    });
  }

  function resolveUrl(rel) {
    if (/^https?:\/\//.test(rel)) return rel;
    return `${ROOT}/${rel.replace(/^\//, '')}`;
  }

  function buildCmdkModal() {
    if (cmdkReady) return;
    cmdkReady = true;
    cmdkBackdrop = document.createElement('div');
    cmdkBackdrop.className = 'cmdk-backdrop';
    cmdkBackdrop.id = 'cmdk-backdrop';
    cmdkBackdrop.setAttribute('role', 'dialog');
    cmdkBackdrop.setAttribute('aria-modal', 'true');
    cmdkBackdrop.setAttribute('aria-label', 'Search site library');
    cmdkBackdrop.innerHTML = `
      <div class="cmdk-dialog">
        <div class="cmdk-head">
          <i class="fas fa-magnifying-glass" aria-hidden="true"></i>
          <input type="text" class="cmdk-input" placeholder="Search 6 books, 49 course modules, 14 articles, 30+ cheatsheets…" autocomplete="off" spellcheck="false" />
          <button type="button" class="cmdk-esc" data-cmdk-close>ESC</button>
        </div>
        <div class="cmdk-tabs" role="tablist">
          <button type="button" class="cmdk-tab active" data-type="All">All</button>
          <button type="button" class="cmdk-tab" data-type="Book">Books</button>
          <button type="button" class="cmdk-tab" data-type="Course">Courses</button>
          <button type="button" class="cmdk-tab" data-type="Module">Modules</button>
          <button type="button" class="cmdk-tab" data-type="Article">Articles</button>
          <button type="button" class="cmdk-tab" data-type="Cheatsheet">Cheatsheets</button>
        </div>
        <div class="cmdk-results"></div>
        <div class="cmdk-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate &nbsp;·&nbsp; <kbd>↵</kbd> open &nbsp;·&nbsp; <kbd>esc</kbd> close</span>
          <span id="cmdk-count">110 items indexed</span>
        </div>
      </div>
    `;
    document.body.appendChild(cmdkBackdrop);
    cmdkInput = cmdkBackdrop.querySelector('.cmdk-input');
    cmdkResults = cmdkBackdrop.querySelector('.cmdk-results');

    cmdkBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdkBackdrop || e.target.closest('[data-cmdk-close]')) closeCmdk();
      const tab = e.target.closest('.cmdk-tab');
      if (tab) {
        cmdkBackdrop.querySelectorAll('.cmdk-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        cmdkFilter = tab.getAttribute('data-type');
        selectedIdx = 0;
        renderCmdkResults();
        cmdkInput.focus();
      }
    });

    cmdkInput.addEventListener('input', () => {
      selectedIdx = 0;
      renderCmdkResults();
    });

    cmdkInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentMatches.length) {
          selectedIdx = (selectedIdx + 1) % currentMatches.length;
          updateSelectedRow();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentMatches.length) {
          selectedIdx = (selectedIdx - 1 + currentMatches.length) % currentMatches.length;
          updateSelectedRow();
        }
      } else if (e.key === 'Enter') {
        if (currentMatches[selectedIdx]) {
          e.preventDefault();
          window.location.href = resolveUrl(currentMatches[selectedIdx].url);
          closeCmdk();
        }
      }
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function renderCmdkResults() {
    const catalog = window.OMAR_CATALOG || [];
    const q = (cmdkInput.value || '').trim().toLowerCase();
    const tokens = q ? q.split(/\s+/) : [];

    const scored = [];
    for (const item of catalog) {
      if (cmdkFilter !== 'All' && item.type !== cmdkFilter) continue;
      if (!tokens.length) {
        scored.push({ item, score: item.type === 'Page' ? 10 : item.type === 'Book' ? 9 : 5 });
        continue;
      }
      const hayTitle = item.title.toLowerCase();
      const hayAll = `${hayTitle} ${(item.sub || '').toLowerCase()} ${(item.tags || '').toLowerCase()} ${item.type.toLowerCase()}`;
      let ok = true;
      let score = 0;
      for (const tok of tokens) {
        if (!hayAll.includes(tok)) {
          ok = false;
          break;
        }
        if (hayTitle.startsWith(tok)) score += 12;
        else if (hayTitle.includes(tok)) score += 7;
        else score += 3;
      }
      if (ok) scored.push({ item, score });
    }

    scored.sort((a, b) => b.score - a.score);
    currentMatches = scored.slice(0, 28).map((s) => s.item);

    const countEl = cmdkBackdrop.querySelector('#cmdk-count');
    if (countEl) countEl.textContent = `${scored.length} match${scored.length === 1 ? '' : 'es'}`;

    if (!currentMatches.length) {
      cmdkResults.innerHTML = `<div style="padding:32px 20px;text-align:center;color:var(--muted);font-size:0.9rem;">No matches found. Try searching <strong>GraphRAG</strong>, <strong>PyTorch</strong>, <strong>Docker</strong>, <strong>PPO</strong>, or <strong>Agents</strong>.</div>`;
      return;
    }

    cmdkResults.innerHTML = currentMatches.map((it, idx) => `
      <a class="cmdk-item${idx === selectedIdx ? ' selected' : ''}" href="${escapeHtml(resolveUrl(it.url))}" data-idx="${idx}">
        <div class="cmdk-item-main">
          <div class="cmdk-item-title">${escapeHtml(it.title)}</div>
          <div class="cmdk-item-sub">${escapeHtml(it.sub || '')}</div>
        </div>
        <span class="cmdk-item-badge">${escapeHtml(it.type)}</span>
      </a>
    `).join('');
  }

  function updateSelectedRow() {
    const rows = cmdkResults.querySelectorAll('.cmdk-item');
    rows.forEach((r, idx) => {
      r.classList.toggle('selected', idx === selectedIdx);
      if (idx === selectedIdx) r.scrollIntoView({ block: 'nearest' });
    });
  }

  async function openCmdk(prefill) {
    buildCmdkModal();
    await ensureCatalog();
    if (typeof prefill === 'string') cmdkInput.value = prefill;
    selectedIdx = 0;
    renderCmdkResults();
    cmdkBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => cmdkInput.focus(), 20);
  }

  function closeCmdk() {
    if (!cmdkBackdrop) return;
    cmdkBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const trig = e.target.closest('[data-cmdk-open]');
    if (trig) {
      e.preventDefault();
      openCmdk();
    }
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdkBackdrop && cmdkBackdrop.classList.contains('open')) closeCmdk();
      else openCmdk();
    } else if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && !document.activeElement?.isContentEditable) {
        const localSearch = document.querySelector('[data-local-search]');
        if (localSearch) {
          e.preventDefault();
          localSearch.focus();
        } else {
          e.preventDefault();
          openCmdk();
        }
      }
    } else if (e.key === 'Escape' && cmdkBackdrop && cmdkBackdrop.classList.contains('open')) {
      closeCmdk();
    }
  });

  window.OmarSite = { openCmdk, closeCmdk, applyTheme };

  /* ---------- Boot ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollUI();
      initMobileDrawer();
      initSurfacePhysics();
      initReveals();
      initMeridianCanvas();
    });
  } else {
    initScrollUI();
    initMobileDrawer();
    initSurfacePhysics();
    initReveals();
    initMeridianCanvas();
  }
})();
