
console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
const navLinks = $$('nav a');
let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname,
  );

currentLink?.classList.add('current');
let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    // add the rest of your pages here
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);


for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // next step: create link and add it to nav

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a); 
    const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "/"                  // Local server
    : "/website/"; 

    url = !url.startsWith('http') ? BASE_PATH + url : url; 
    a.classList.toggle(
        'current',
        a.host === location.host && a.pathname === location.pathname,
      );
}





document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select aria-label="Color scheme">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
    `
);
const select = document.querySelector('.color-scheme select');

select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    if (event.target.value === 'dark') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
      } else if (event.target.value === 'light') {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
      } else {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
      }

  });

export async function fetchJSON(url) {
    try {
        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
          }
      const response = await fetch(url);
    } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
    }
}

export function renderProjects(project, containerElement) {
    containerElement.innerHTML = '';
    for (const p of project) {
        const article = document.createElement('article');
    
        // graceful fallbacks for missing fields
        const title = p?.title ?? 'Untitled project';
        const image = p?.image ?? 'images/empty.svg';
        const description = p?.description ?? '';
    
        article.innerHTML = `
          <h3>${title}</h3>
          <img src="${image}" alt="${title}">
          <p>${description}</p>
        `;
    
        containerElement.appendChild(article);
      }
}
export async function fetchGitHubData(username) {
    return fetchJSON(`https://api.github.com/users/${username}`);

}



