console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
let navLinks = $$("nav a");

// Step 2.2: Find the link that matches the current page
let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

// Step 2.3: Add the 'current' class if found
currentLink?.classList.add("current");

let pages = [
    { url: '',title: 'Home' },
    { url: 'projects/',    title: 'Projects' },
    { url: 'about/',       title: 'About' },
    { url: 'contact/',     title: 'Contact' },
    { url: 'https://github.com/yourusername', title: 'GitHub' },
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // next step: create link and add it to nav
  }

let a = document.createElement('a');
a.href = url;
a.textContent = title;
nav.append(a);




if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }


a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname,
); 
(() => {

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const autoLabel = `Automatic${prefersDark ? ' (Dark)' : ' (Light)'}`;
document.addEventListener('DOMContentLoaded', () => {
    // Helper: create the switcher only if it's missing
    const ensureSwitcher = () => {
      let select = document.querySelector('label.color-scheme select');
      if (!select) {
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        const autoLabel = `Automatic${prefersDark ? ' (Dark)' : ' (Light)'}`;
        document.body.insertAdjacentHTML(
          'afterbegin',
          `
          <label class="color-scheme">
            Theme:
            <select aria-label="Color scheme">
              <option value="light dark">${autoLabel}</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          `
        );
        select = document.querySelector('label.color-scheme select');
      } else {
        // Page already has HTML — make sure the "Automatic" option reads correctly
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        const autoOpt = document.querySelector('label.color-scheme select option[value="light dark"]');
        if (autoOpt) autoOpt.textContent = `Automatic${prefersDark ? ' (Dark)' : ' (Light)'}`;
      }
      return select;
    };
  
    const selects = () => Array.from(document.querySelectorAll('label.color-scheme select'));
    const apply = (scheme) => {
      document.documentElement.style.setProperty('color-scheme', scheme);
      // keep all switchers (if any) in sync
      for (const s of selects()) if (s.value !== scheme) s.value = scheme;
    };
  
    // 1) Ensure there is a switcher on the page (use existing or inject)
    const select = ensureSwitcher();
  
    // 2) Initialize from storage (site-wide) or default to Automatic
    const saved = localStorage.getItem('colorScheme') || 'light dark';
    apply(saved);
  
    // 3) Respond to user changes & persist
    select?.addEventListener('input', (e) => {
      const scheme = e.target.value; // "light dark" | "light" | "dark"
      apply(scheme);
      localStorage.setItem('colorScheme', scheme);
    });
  
    // 4) Keep the "Automatic" label accurate if OS theme flips (nice-to-have)
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', (e) => {
        const opt = document.querySelector('label.color-scheme select option[value="light dark"]');
        if (opt && (localStorage.getItem('colorScheme') || 'light dark') === 'light dark') {
          opt.textContent = `Automatic${e.matches ? ' (Dark)' : ' (Light)'}`;
        }
      });
    }
  });
 

})();
export async function fetchJSON(url) {
    try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    return await response.json();
    } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
    return null; // callers can guard against null
    }
    }
    
    /**
    * Render an array of project objects into a container.
    * Supports dynamic heading levels; validates input; graceful fallbacks.
    */
    export function renderProjects(projects, containerElement, headingLevel = 'h2') {
    if (!containerElement) return; // nothing to render into
    
    const isValidHeading = /^(h[1-6])$/i.test(String(headingLevel));
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
    
    /** Update the count in an element like <h1 class="projects-title"> */
    export function updateCount({ projects, selector = '.projects-title' } = {}) {
    const el = document.querySelector(selector);
    if (!el) return;
    const n = Array.isArray(projects) ? projects.length : 0;
    el.textContent = `${n} Projects`;
    }
    
    /** Fetch public GitHub profile JSON for a username */
    export async function fetchGitHubData(username) {
    if (!username) throw new Error('GitHub username required');
    return fetchJSON(`https://api.github.com/users/${encodeURIComponent(username)}`);
    }
export async function fetchGitHubData(username) {
    // return statement here
    return fetchJSON(`https://api.github.com/users/${username}`);

  }