const projectsMenu = document.querySelector('.projectList');
const settingsMenu = document.querySelectorAll(".settingsMenu li");

export const initMenus = () => {
    initSettingsMenu();
    initProjectsMenu();
}

const initSettingsMenu = () => {
    settingsMenu.forEach(option => {
        option.addEventListener("click", function(){        
            option.querySelector('i').classList.toggle('fa-caret-down');
            option.querySelector('i').classList.toggle('fa-caret-up');
            const article = option.nextElementSibling;
            article.style.display = article.style.display === 'block' ? 'none' : 'block';
        });
    });
}

const initProjectsMenu = () => {
    projectsMenu.addEventListener('click', (e) => {
        if (e.target.localName.includes('li')) {
            const currentProject = document.querySelector('.current');
            currentProject.classList.toggle('current');
            e.target.classList.toggle('current');
        }
    });
}

