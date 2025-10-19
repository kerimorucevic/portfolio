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
    document.body.insertAdjacentHTML(
      'afterbegin',
      `
      <label class="color-scheme">
        Theme:
        <select>
          <option value="light dark">Automatic</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>`,
      
    );
  });
select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
  });
  
 /*   // ---- Step 4.4: Make it work (switch themes on change) ----
    const select = document.querySelector('label.color-scheme select');
  
    // 1) Apply the current select value immediately so UI reflects the state
    const applyScheme = (scheme) => {
      document.documentElement.style.setProperty('color-scheme', scheme);
      if (select && select.value !== scheme) select.value = scheme;
    };
  
    // Default to Automatic on first load
    applyScheme('light dark');
  
    // 2) Update when the user changes the dropdown
    select?.addEventListener('input', (event) => {
      const value = event.target.value; // "light dark" | "light" | "dark"
      console.log('color scheme changed to', value); // sanity check
      document.documentElement.style.setProperty('color-scheme', value);
    });
  
    // (Nice touch) If OS theme flips and user is in Automatic, refresh the label text
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', (e) => {
        const opt = select?.querySelector('option[value="light dark"]');
        if (opt && select?.value === 'light dark') {
          opt.textContent = `Automatic${e.matches ? ' (Dark)' : ' (Light)'}`;
        }
      });
    }
  })();

const saved = localStorage.getItem('colorScheme');
applyScheme(saved || 'light dark');

// Save on change
select?.addEventListener('input', (e) => {
  const value = e.target.value;
  document.documentElement.style.setProperty('color-scheme', value);
  localStorage.setItem('colorScheme', value);   // <— add this line
});


const select = document.querySelector('label.color-scheme select');
const apply = (v) => document.documentElement.style.setProperty('color-scheme', v);

apply('light dark'); // default
select?.addEventListener('input', e => apply(e.target.value));

// Sanity check the element exists
console.log('[theme.js] switch present?', !!document.querySelector('label.color-scheme'));
*/
})();
