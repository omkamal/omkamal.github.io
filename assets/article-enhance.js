/* ==========================================================================
   OMAR KAMAL HOSNEY — MERIDIAN ARTICLE ENHANCEMENT ENGINE
   ========================================================================== */

(function () {
  const docEl = document.documentElement;
  const ROOT = (docEl.getAttribute('data-root') || '../..').replace(/\/$/, '');

  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(fa);
  }

  function boot() {
    // 1. Reading Progress Bar
    const bar = document.createElement('div');
    bar.className = 'art-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);

    const updateProgress = () => {
      const y = window.scrollY || window.pageYOffset;
      const max = docEl.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    // 2. Upgrade Brand Mark + Add Search & Theme Controls to Nav
    const oldMark = document.querySelector('.brand-mark');
    if (oldMark) {
      const swiss = document.createElement('span');
      swiss.className = 'art-ok-mark';
      swiss.setAttribute('aria-hidden', 'true');
      swiss.innerHTML = '<span></span><span></span><span></span><span></span>';
      oldMark.replaceWith(swiss);
    }

    const navContainer = document.querySelector('.top-nav .nav-inner, nav.nav .nav-inner');
    if (navContainer && !navContainer.querySelector('.art-nav-tools')) {
      const isDark = (docEl.getAttribute('data-theme') || 'dark') === 'dark';
      const tools = document.createElement('div');
      tools.className = 'art-nav-tools';
      tools.innerHTML = `
        <button type="button" class="art-tool-btn" data-cmdk-open aria-label="Search site (⌘K)">
          <i class="fas fa-magnifying-glass"></i>
          <span>Search</span>
          <kbd>⌘K</kbd>
        </button>
        <button type="button" class="art-tool-btn icon-only" data-theme-toggle aria-label="Toggle dark/light reading mode" title="Toggle Dark/Light Reading Mode">
          <i class="fas ${isDark ? 'fa-sun' : 'fa-moon'}"></i>
        </button>
      `;
      navContainer.appendChild(tools);
    }

    // 3. Copy Buttons on <pre> blocks
    document.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.art-copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'art-copy-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code') || pre;
        const text = (code.innerText || code.textContent || '').trim();
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copied ✓';
          setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
        } catch (_) {}
      });
      pre.appendChild(btn);
    });

    // 4. Image Lightbox (if page doesn't already provide #lb)
    if (!document.getElementById('lb')) {
      const lb = document.createElement('div');
      lb.className = 'art-lightbox';
      lb.innerHTML = '<img alt="" /><div class="art-lightbox-cap"></div>';
      document.body.appendChild(lb);
      const lbImg = lb.querySelector('img');
      const lbCap = lb.querySelector('.art-lightbox-cap');

      document.addEventListener('click', (e) => {
        const img = e.target.closest('.figure img, figure img');
        if (img && !img.closest('a')) {
          lbImg.src = img.currentSrc || img.src;
          lbImg.alt = img.alt || '';
          const cap = img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt || '';
          lbCap.textContent = cap;
          lb.classList.add('open');
        } else if (e.target.closest('.art-lightbox')) {
          lb.classList.remove('open');
        }
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lb.classList.remove('open');
      });
    }

    // 5. Related Field Notes Strip before footer
    const esc = (s) => String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const renderMore = () => {
      const catalog = (window.OMAR_CATALOG || []).filter((x) => x.type === 'Article');
      if (!catalog.length || document.querySelector('.art-more-sec')) return;
      const curPath = window.location.pathname;
      const others = catalog.filter((a) => !curPath.endsWith(a.url.replace(/^articles\//, '')) && !curPath.includes(a.url));
      const picks = others.slice(0, 3);
      if (!picks.length) return;

      const sec = document.createElement('aside');
      sec.className = 'art-more-sec';
      sec.setAttribute('aria-label', 'More GPU field notes');
      sec.innerHTML = `
        <div class="art-more-kicker">Continue Reading // GPU Field Notes &amp; Books</div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <strong style="font-family:'Inter Tight',sans-serif;font-size:1.3rem;color:var(--c-ink,var(--ink));">More hands-on engineering dispatches</strong>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <a href="${ROOT}/articles/index.html" style="font-size:0.84rem;font-weight:700;color:#e8a838;text-decoration:none;">All 14 Articles →</a>
            <a href="${ROOT}/books/index.html" style="font-size:0.84rem;font-weight:700;color:var(--c-muted,var(--muted));text-decoration:none;">6 Books →</a>
          </div>
        </div>
        <div class="art-more-grid">
          ${picks.map((p) => `
            <a class="art-more-card" href="${ROOT}/${p.url}">
              <strong>${esc(p.title)}</strong>
              <span>${esc(p.sub || '')}</span>
            </a>
          `).join('')}
        </div>
      `;
      const footer = document.querySelector('footer');
      if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(sec, footer);
      } else {
        document.body.appendChild(sec);
      }
    };

    if (window.OMAR_CATALOG) renderMore();
    else window.addEventListener('load', renderMore);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
