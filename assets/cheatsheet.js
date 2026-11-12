/* ==========================================================================
   OMAR KAMAL HOSNEY — MERIDIAN CHEATSHEET INTERACTIVE TOOLBAR & COPY ENGINE
   ========================================================================== */

(function () {
  const docEl = document.documentElement;
  const ROOT = (docEl.getAttribute('data-root') || '..').replace(/\/$/, '');

  // Ensure FontAwesome 6 is available for toolbar & CmdK icons
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(fa);
  }

  function boot() {
    const body = document.body;
    if (!body || body.classList.contains('cs-enhanced')) return;

    body.classList.add('cs-enhanced');
    if (document.querySelector('.classic-style, .elegant-slate, .elegant-read')) {
      body.classList.add('cs-tutorial');
    }

    // Restore density preference
    try {
      if (localStorage.getItem('omar-cs-density') === 'compact') {
        body.classList.add('cs-compact');
      }
    } catch (_) {}

    const rawTitle = (document.querySelector('h1')?.textContent || document.title || 'Cheatsheet')
      .replace(/\s+/g, ' ')
      .trim();

    const isDark = (docEl.getAttribute('data-theme') || 'dark') === 'dark';
    const isCompact = body.classList.contains('cs-compact');

    // Inject Sticky Meridian Toolbar
    const topbar = document.createElement('header');
    topbar.className = 'cs-topbar';
    topbar.setAttribute('aria-label', 'Reference toolbar');
    topbar.innerHTML = `
      <div class="cs-topbar-left">
        <a class="cs-back-btn" href="${ROOT}/cheatsheets/index.html">
          <i class="fas fa-arrow-left"></i> <span>All Cheatsheets</span>
        </a>
        <span class="cs-crumb-title" title="${rawTitle.replace(/"/g, '&quot;')}">${rawTitle}</span>
      </div>

      <div class="cs-filter-wrap">
        <i class="fas fa-filter cs-f-icon" aria-hidden="true"></i>
        <input type="search" id="cs-live-filter" data-local-search placeholder="Filter commands or sections (/ to focus)…" aria-label="Filter commands on this page" autocomplete="off" />
        <span class="cs-f-count" id="cs-f-count"></span>
      </div>

      <div class="cs-topbar-actions">
        <button type="button" class="cs-tool-btn" id="cs-density-btn" title="Toggle compact wall-chart density">
          <i class="fas fa-compress"></i>
          <span class="btn-txt">${isCompact ? 'Comfort' : 'Compact'}</span>
        </button>
        <button type="button" class="cs-tool-btn" data-cmdk-open title="Global site search (⌘K)">
          <i class="fas fa-magnifying-glass"></i>
          <span class="btn-txt">Search</span>
          <kbd>⌘K</kbd>
        </button>
        <button type="button" class="cs-tool-btn" id="cs-print-btn" title="Print or Save as PDF">
          <i class="fas fa-print"></i>
          <span class="btn-txt">PDF</span>
        </button>
        <button type="button" class="cs-tool-btn icon-only" data-theme-toggle aria-label="Toggle dark/light theme" title="Toggle Theme">
          <i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
        </button>
      </div>
    `;
    body.prepend(topbar);

    // Inject Footer Colophon
    const footer = document.createElement('footer');
    footer.className = 'cs-footer';
    footer.innerHTML = `
      <span><strong>Omar Kamal Hosney</strong> · Click any code block or command to copy</span>
      <span>
        <a href="${ROOT}/index.html">Home</a> &nbsp;·&nbsp;
        <a href="${ROOT}/cheatsheets/index.html">All 29 Cheatsheets</a> &nbsp;·&nbsp;
        <a href="${ROOT}/books/index.html">Books</a> &nbsp;·&nbsp;
        <a href="${ROOT}/courses/index.html">Free Courses</a> &nbsp;·&nbsp;
        <a href="${ROOT}/articles/index.html">Articles</a>
      </span>
    `;
    body.appendChild(footer);

    // Toast element
    const toast = document.createElement('div');
    toast.className = 'cs-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    body.appendChild(toast);

    let toastTimer = null;
    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
    }

    // Density toggle
    const densityBtn = document.getElementById('cs-density-btn');
    if (densityBtn) {
      densityBtn.addEventListener('click', () => {
        const nextCompact = !body.classList.contains('cs-compact');
        body.classList.toggle('cs-compact', nextCompact);
        const txt = densityBtn.querySelector('.btn-txt');
        if (txt) txt.textContent = nextCompact ? 'Comfort' : 'Compact';
        try { localStorage.setItem('omar-cs-density', nextCompact ? 'compact' : 'comfort'); } catch (_) {}
      });
    }

    // Print button
    const printBtn = document.getElementById('cs-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    // Live in-sheet command & section filter
    const filterInput = document.getElementById('cs-live-filter');
    const countSpan = document.getElementById('cs-f-count');
    const blocks = Array.from(document.querySelectorAll('.section, .card, .tip, .classic-style, .elegant-slate, .elegant-read'));
    const subItems = Array.from(document.querySelectorAll('.section li, .card .cmd, .tip li'));

    if (filterInput) {
      filterInput.addEventListener('input', () => {
        const q = (filterInput.value || '').trim().toLowerCase();
        if (!q) {
          blocks.forEach((b) => { b.hidden = false; });
          subItems.forEach((li) => li.classList.remove('cs-match-item'));
          if (countSpan) countSpan.textContent = '';
          return;
        }
        const tokens = q.split(/\s+/);
        let matchedBlocks = 0;
        blocks.forEach((b) => {
          const hay = b.textContent.toLowerCase();
          const ok = tokens.every((t) => hay.includes(t));
          b.hidden = !ok;
          if (ok) matchedBlocks++;
        });
        subItems.forEach((li) => {
          const hay = li.textContent.toLowerCase();
          li.classList.toggle('cs-match-item', tokens.every((t) => hay.includes(t)));
        });
        if (countSpan) countSpan.textContent = `${matchedBlocks}/${blocks.length}`;
      });
    }

    // Click-to-copy on code, pre, .cmd, or command <strong>
    document.addEventListener('click', async (e) => {
      if (e.target.closest('.cs-topbar, .cs-footer, .cmdk-backdrop, a')) return;
      const target = e.target.closest('pre, code, .cmd, .section li > strong:first-child');
      if (!target) return;
      const codeNode = target.classList.contains('cmd') ? (target.querySelector('code') || target) : target;
      const text = (codeNode.innerText || codeNode.textContent || '').trim();
      if (!text || text.length > 4000) return;
      try {
        await navigator.clipboard.writeText(text);
        const preview = text.length > 32 ? `${text.slice(0, 32)}…` : text;
        showToast(`Copied: ${preview}`);
      } catch (_) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
