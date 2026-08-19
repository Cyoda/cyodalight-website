/**
 * main.ts — Cyoda site JavaScript
 *
 * Handles only:
 *   1. Install panel tab switching (InstallPanel)
 *   2. Copy-to-clipboard buttons (CodeBlock)
 *   3. Mobile hamburger drawer toggle (NavBar)
 *   4. GitHub star count fetch (NavBar)
 *   5. Lightweight first-party analytics events
 *
 * Loaded deferred at end of <body>. No framework. No dependencies.
 * Estimated < 3KB gzipped.
 *
 * Spec references: sections 12, 18, 19, 23.
 */

// ---------------------------------------------------------------------------
// 1. Install Panel Tab Switching
// ---------------------------------------------------------------------------

function initInstallPanels(): void {
  const panels = document.querySelectorAll<HTMLElement>('[data-install-panel]');
  if (!panels.length) return;

  panels.forEach((panel) => {
    const tabs = panel.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    const tabPanels = panel.querySelectorAll<HTMLElement>('[role="tabpanel"]');

    function activate(index: number): void {
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.setAttribute('tabindex', active ? '0' : '-1');
        tab.classList.toggle('is-active', active);
      });

      tabPanels.forEach((tp, i) => {
        const active = i === index;
        tp.setAttribute('aria-hidden', active ? 'false' : 'true');
        tp.classList.toggle('is-active', active);
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(i));

      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        const allTabs = Array.from(tabs);
        const index = allTabs.indexOf(tab);

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = (index + 1) % allTabs.length;
          allTabs[next]?.focus();
          activate(next);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = (index - 1 + allTabs.length) % allTabs.length;
          allTabs[prev]?.focus();
          activate(prev);
        } else if (e.key === 'Home') {
          e.preventDefault();
          allTabs[0]?.focus();
          activate(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          const last = allTabs.length - 1;
          allTabs[last]?.focus();
          activate(last);
        }
      });
    });
  });
}

// ---------------------------------------------------------------------------
// 2. Lightweight Analytics Events
// ---------------------------------------------------------------------------

interface AnalyticsPayload {
  event: string;
  properties: Record<string, string>;
}

function getAnalyticsPayload(el: HTMLElement): AnalyticsPayload | null {
  const event = el.dataset.analyticsEvent;
  if (!event) return null;

  const properties: Record<string, string> = {};
  Object.entries(el.dataset).forEach(([key, value]) => {
    if (!value || !key.startsWith('analytics') || key === 'analyticsEvent') return;

    const propertyName = key
      .replace(/^analytics/, '')
      .replace(/^[A-Z]/, (match) => match.toLowerCase())
      .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);

    properties[propertyName] = value;
  });

  return { event, properties };
}

function emitAnalyticsEvent(el: HTMLElement, extra: Record<string, string> = {}): void {
  const payload = getAnalyticsPayload(el);
  if (!payload) return;

  const detail: AnalyticsPayload = {
    event: payload.event,
    properties: {
      ...payload.properties,
      ...extra,
    },
  };

  window.dispatchEvent(new CustomEvent('cyoda:analytics', { detail }));
}

function initAnalyticsEvents(): void {
  document
    .querySelectorAll<HTMLElement>('a[data-analytics-event], button[data-analytics-event]')
    .forEach((el) => {
      if (el.classList.contains('code-block__copy')) return;
      el.addEventListener('click', () => emitAnalyticsEvent(el));
    });

  document
    .querySelectorAll<HTMLElement>('[data-analytics-event$="_view"]')
    .forEach((el) => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              emitAnalyticsEvent(el);
              observer.disconnect();
            });
          },
          { threshold: 0.35 },
        );
        observer.observe(el);
      } else {
        emitAnalyticsEvent(el);
      }
    });
}

// ---------------------------------------------------------------------------
// 3. Copy-to-Clipboard Buttons
// ---------------------------------------------------------------------------

function initCopyButtons(): void {
  const liveRegion = document.getElementById('sr-copy-live');

  document.querySelectorAll<HTMLButtonElement>('.code-block__copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const source = btn.dataset.copySource;
      if (!source) return;

      try {
        await navigator.clipboard.writeText(source);
        btn.textContent = 'Copied!';
        btn.classList.add('code-block__copy--success');

        if (liveRegion) liveRegion.textContent = 'Code copied to clipboard.';
        emitAnalyticsEvent(btn);

        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('code-block__copy--success');
          if (liveRegion) liveRegion.textContent = '';
        }, 2000);
      } catch {
        btn.textContent = 'Failed';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// 4. Mobile Hamburger Drawer
// ---------------------------------------------------------------------------

function initHamburger(): void {
  const hamburger = document.getElementById('navbar-hamburger');
  const drawer = document.getElementById('navbar-drawer');
  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    drawer.classList.toggle('is-open', !isOpen);
  });

  // Close drawer on Escape
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      hamburger.focus();
    }
  });

  // Close drawer when a link is clicked
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
    });
  });
}

// ---------------------------------------------------------------------------
// 5. GitHub Star Count
// ---------------------------------------------------------------------------

async function fetchGitHubStars(): Promise<void> {
  const el = document.getElementById('github-star-count');
  if (!el) return;

  const REPO = 'Cyoda/cyoda-go';
  const CACHE_KEY = 'cyoda-github-stars';
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour

  // Try cache first
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { count, ts } = JSON.parse(cached) as { count: number; ts: number };
      if (Date.now() - ts < CACHE_TTL) {
        el.textContent = formatStars(count);
        el.style.display = '';
        return;
      }
    }
  } catch {
    // sessionStorage unavailable — continue to fetch
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) return;

    const data = (await res.json()) as { stargazers_count?: number };
    const count = data.stargazers_count ?? 0;

    el.textContent = formatStars(count);
    el.style.display = '';

    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() }));
    } catch {
      // sessionStorage unavailable — skip cache
    }
  } catch {
    // Network or parse error — silently omit star count per spec
  }
}

function formatStars(n: number): string {
  if (n >= 1000) return `★ ${(n / 1000).toFixed(1)}k`;
  return `★ ${n}`;
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initInstallPanels();
  initAnalyticsEvents();
  initCopyButtons();
  initHamburger();
  fetchGitHubStars().catch(() => {});
});
