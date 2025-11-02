import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');

renderProjects(projects, projectsContainer, 'h2');


    if (projects) {
    renderProjects(projects, projectsContainer, 'h3'); // use <h3> inside page sections
    updateCount({ projects }); // sets the <h1 class="projects-title">12 Projects</h1>
    } else {
    projectsContainer.innerHTML = '<p class="error">Couldn\'t load projects.json.</p>';
}
    
const projectsContainer = document.querySelector('.projects');
const searchInput = document.querySelector('.searchBar');
const svg = d3.select('#projects-pie-plot');
const legend = d3.select('.legend');

if (!Array.isArray(projects)) projects = [];

renderProjects(projects, projectsContainer, 'h2');


const arcGenerator = d3.arc().innerRadius(0).outerRadius(50); 
const sliceGenerator = d3.pie().value((d) => d.value);        
const colors = d3.scaleOrdinal(d3.schemeTableau10);


function projectsPerYear(list) {
  const rolled = d3.rollups(
    list,
    (v) => v.length,
    (d) => d.year
  );
  // rolled: [ [year, count], ... ]
  return rolled.map(([year, count]) => ({ label: String(year), value: count }));
}

/* -----------------------------------------------------------
   Step 4.4: Refactor plotting into a function and call it
----------------------------------------------------------- */
let selectedIndex = -1; // Step 5.2: -1 means “no selection”

function renderPieChart(projectsGiven) {
  // 1) Recalculate data
  const data = projectsPerYear(projectsGiven);

  // 2) Generate arcs from data
  const arcData = sliceGenerator(data);
  const arcs = arcData.map((d) => arcGenerator(d));

  // 3) Clear previous wedges and legend (Step 4.4 cleanup)
  svg.selectAll('path').remove();
  legend.selectAll('li').remove();

  // 4) Draw wedges (Step 1.4 / 1.5 + Step 5.1 + 5.2)
  arcs.forEach((arc, i) => {
    svg
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(i))
      .attr('class', i === selectedIndex ? 'selected' : null)
      .on('click', () => {
        // Toggle selection (Step 5.2)
        selectedIndex = selectedIndex === i ? -1 : i;

        // Update wedge highlight
        svg
          .selectAll('path')
          .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : null));

        // Update legend highlight
        legend
          .selectAll('li')
          .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : null));

        // Step 5.3: Filter projects list by selected year (or reset)
        if (selectedIndex === -1) {
          renderProjects(projects, projectsContainer, 'h2');
        } else {
          const selectedYear = data[selectedIndex].label;
          const filtered = projects.filter((p) => String(p.year) === selectedYear);
          renderProjects(filtered, projectsContainer, 'h2');
        }
      });
  });

  // 5) Build legend (Step 2.2)
  data.forEach((d, idx) => {
    legend
      .append('li')
      .attr('style', `--color:${colors(idx)}`)
      .attr('class', idx === selectedIndex ? 'selected' : null)
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`)
      .on('click', () => {
        // Clicking legend behaves same as clicking wedge
        selectedIndex = selectedIndex === idx ? -1 : idx;

        svg
          .selectAll('path')
          .attr('class', (_, i) => (i === selectedIndex ? 'selected' : null));

        legend
          .selectAll('li')
          .attr('class', (_, i) => (i === selectedIndex ? 'selected' : null));

        if (selectedIndex === -1) {
          renderProjects(projects, projectsContainer, 'h2');
        } else {
          const selectedYear = data[selectedIndex].label;
          const filtered = projects.filter((p) => String(p.year) === selectedYear);
          renderProjects(filtered, projectsContainer, 'h2');
        }
      });
  });
}

// First render of the chart
renderPieChart(projects);

/* -----------------------------------------------------------
   Step 4.1–4.3: Search (case-insensitive, across all fields)
----------------------------------------------------------- */
let query = '';

searchInput?.addEventListener('change', (event) => {
  query = event.target.value;

  const filteredProjects = projects.filter((project) => {
    const values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });

  // Render filtered projects
  renderProjects(filteredProjects, projectsContainer, 'h2');

  // Re-render pie chart and legend with filtered data (Step 4.4)
  // (We also keep whatever selection state is set in selectedIndex;
  //  you can reset it here if desired.)
  renderPieChart(filteredProjects);
});
/*const projectsContainer = document.querySelector('.projects'); */
/*init();
/*renderProjects(projects, projectsContainer, 'h2');*/
