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


const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/website/";         // GitHub Pages repo name

url = !url.startsWith('http') ? BASE_PATH + url : url;

if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }


a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname,
); 
(() => {
    // --- Create the theme switch UI at the start of <body> ---
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
  
    const select = document.querySelector('label.color-scheme select');
  
    // --- Apply a given scheme to <html> and update UI ---
    const applyScheme = (scheme) => {
      // Set inline style on <html> so it overrides CSS defaults
      document.documentElement.style.setProperty('color-scheme', scheme);
  
      // Update the select UI
      if (select && select.value !== scheme) {
        select.value = scheme;
      }
    };
  
    // --- Initialize from localStorage (or default to "light dark") ---
    const saved = localStorage.getItem('colorScheme');
    const initial = saved || 'light dark';
    applyScheme(initial);
  
    // --- Listen for user changes and persist them ---
    select?.addEventListener('input', (event) => {
      const value = event.target.value; // "light dark" | "light" | "dark"
      applyScheme(value);
      localStorage.setItem('colorScheme', value);
    });
  
    // OPTIONAL: If OS theme changes and user is on "Automatic", keep the label hint fresh
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', (e) => {
        if ((localStorage.getItem('colorScheme') || 'light dark') === 'light dark') {
          // Update the "Automatic (Dark/Light)" label text dynamically
          const opt = select.querySelector('option[value="light dark"]');
          if (opt) opt.textContent = `Automatic${e.matches ? ' (Dark)' : ' (Light)'}`;
        }
      });
    }
  })();
