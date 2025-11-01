/*import { fetchJSON, renderProjects } from '../global.js';
async function init() {
    const projectsContainer = document.querySelector('.projects');
    if (!projectsContainer) return;
   
    const projects = await fetchJSON('../lib/projects.json');
    if (projects) {
    renderProjects(projects, projectsContainer, 'h3'); // use <h3> inside page sections
    updateCount({ projects }); // sets the <h1 class="projects-title">12 Projects</h1>
    } else {
    projectsContainer.innerHTML = '<p class="error">Couldn\'t load projects.json.</p>';
    }
    
}
/*const projectsContainer = document.querySelector('.projects'); */
/*init();
/*renderProjects(projects, projectsContainer, 'h2');*/
