import { fetchJSON, renderProjects, fetchGithubData } from './global.js';
/*const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0, 3);
const projectsContainer = document.querySelector('.projects');
<div class="projects"></div>
renderProjects(latestProjects, projectsContainer, 'h2');*/


async function init() {
// Latest 3 projects
const projectsContainer = document.querySelector('.projects');
const all = await fetchJSON('./lib/projects.json');
if (projectsContainer) {
const latest = Array.isArray(all) ? all.slice(0, 3) : [];
renderProjects(latest, projectsContainer, 'h3');
}

// GitHub stats
const profileStats = document.querySelector('#profile-stats');
if (profileStats) {
try {
const githubData = await fetchGitHubData('kerimorucevic'); // ← change this
if (githubData) {
profileStats.innerHTML = `
<h2>My GitHub Stats</h2>
<dl class="stats-grid">
<dt>Followers</dt><dd>${gh.followers}</dd>
<dt>Following</dt><dd>${gh.following}</dd>
<dt>Public Repos</dt><dd>${gh.public_repos}</dd>
<dt>Public Gists</dt><dd>${gh.public_gists}</dd>
</dl>`;
}
} catch (e) {
profileStats.innerHTML = '<p class="error">Couldn\'t load GitHub data.</p>';
}
}
}

init();

