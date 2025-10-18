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
