const htmlProjectList = document.querySelector('.projectList');


export const createProjectHtml = (project) => {
   
    const htmlProject = `
        <li class="project ${(project.current)?'active':''}" data-id="abc">
        <a href="#">${(project.name)}</a></li>
    `;
    const div = document.createElement('div'); 
    div.innerHTML = htmlProject;
    htmlProjectList.append(div.firstElementChild);

    return div;
}


htmlProjectList.addEventListener('click', (event) => {
    const currentProject = document.querySelector('.current');
    currentProject.classList.toggle('current');
    event.target.classList.toggle('current');
});