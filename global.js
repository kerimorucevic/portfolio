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