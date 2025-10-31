export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
export const $  = (sel, ctx = document) => ctx.querySelector(sel);

// ------------------------------------------------------------
// Dark-mode switcher (Steps 4.2–4.5)
(() => {
  const KEY = 'colorScheme';

  const autoLabel = () =>
    `Automatic ${matchMedia('(prefers-color-scheme: dark)').matches ? '(Dark)' : '(Light)'}`;

  const buildSwitcher = () => {
    // If page already has one, reuse & refresh Automatic label
    let select = $('label.color-scheme select');
    if (!select) {
      document.body.insertAdjacentHTML(
        'afterbegin',
        `
        <label class="color-scheme">
          Theme:
          <select aria-label="Color scheme">
            <option value="light dark">${autoLabel()}</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>`
      );
      select = $('label.color-scheme select');
    } else {
      const autoOpt = $('label.color-scheme select option[value="light dark"]');
      if (autoOpt) autoOpt.textContent = autoLabel();
    }
    return select;
  };

  const setScheme = (scheme) =>
    document.documentElement.style.setProperty('color-scheme', scheme);

  const init = () => {
    const select = buildSwitcher();

    // init from storage or default to Automatic
    const saved = localStorage.getItem(KEY) || 'light dark';
    setScheme(saved);
    select.value = saved;

    // persist on change
    select.addEventListener('input', (e) => {
      const scheme = e.target.value; // 'light dark' | 'light' | 'dark'
      setScheme(scheme);
      localStorage.setItem(KEY, scheme);
    });

    // keep Automatic label in sync with OS changes
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', () => {
      const autoOpt = $('label.color-scheme select option[value="light dark"]');
      if (autoOpt && (localStorage.getItem(KEY) || 'light dark') === 'light dark') {
        autoOpt.textContent = autoLabel();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ------------------------------------------------------------
// Navigation (Step 3)
// Change this to your repo name when deploying to GitHub Pages:
const BASE_PATH =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? '/'
    : '/YOUR_REPO_NAME/';

const pages = [
  { url: '',           title: 'Home' },
  { url: 'projects/',  title: 'Projects' },
  { url: 'about/',     title: 'About' },
  { url: 'contact/',   title: 'Contact' },
  { url: 'https://github.com/yourusername', title: 'GitHub' },
];

(function buildNav() {
  const nav = document.createElement('nav');
  document.body.prepend(nav);

  for (const p of pages) {
    let href = p.url;
    if (!href.startsWith('http')) href = BASE_PATH + href;

    const a = document.createElement('a');
    a.href = href;
    a.textContent = p.title;

    // external links open in new tab
    if (a.host !== location.host) a.target = '_blank';

    // highlight current page
    a.classList.toggle(
      'current',
      a.host === location.host && a.pathname === location.pathname
    );

    nav.append(a);
  }
})();

// ------------------------------------------------------------
// Data helpers (Steps 1.x)
export async function fetchJSON(url) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching or parsing JSON data:', err);
    return null;
  }
}

// Render an array of projects into a container; supports dynamic heading level
export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!containerElement) return;

  const isValidHeading = /^h[1-6]$/i.test(String(headingLevel));
  const H = isValidHeading ? String(headingLevel).toLowerCase() : 'h2';

  containerElement.innerHTML = '';

  if (!Array.isArray(projects) || projects.length === 0) {
    containerElement.innerHTML = '<p class="empty">No projects to show yet.</p>';
    return;
  }

  const frag = document.createDocumentFragment();

  for (const p of projects) {
    const article = document.createElement('article');

    const title = p?.title ?? 'Untitled project';
    const image = p?.image ?? 'images/empty.svg';
    const description = p?.description ?? '';
    const year = p?.year ?? '';

    article.innerHTML = `
      <${H}>${title}</${H}>
      <img src="${image}" alt="${title}">
      <p>${description}</p>
      ${year ? `<p class="project-meta"><small>${year}</small></p>` : ''}
    `;

    frag.appendChild(article);
  }

  containerElement.appendChild(frag);
}

export function updateCount({ projects, selector = '.projects-title' } = {}) {
  const el = document.querySelector(selector);
  if (!el) return;
  const n = Array.isArray(projects) ? projects.length : 0;
  el.textContent = `${n} Projects`;
}

// ------------------------------------------------------------
// GitHub API (Step 3)
export async function fetchGitHubData(username) {
  if (!username) throw new Error('GitHub username required');
  return fetchJSON(`https://api.github.com/users/${encodeURIComponent(username)}`);
}