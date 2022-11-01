const htmlProjectList = document.querySelector('.projectList');

export const initMenus = () => {

    document.querySelectorAll(".settingsMenu li").forEach(option => {
        option.addEventListener("click", function(){        
            option.querySelector('i').classList.toggle('fa-caret-down');
            option.querySelector('i').classList.toggle('fa-caret-up');
            const article = option.nextElementSibling;
            article.style.display = article.style.display === 'block' ? 'none' : 'block';
        });
    });


    htmlProjectList.addEventListener('click', (e) => {
        if (e.target.localName.includes('li')) {
            const currentProject = document.querySelector('.current');
            currentProject.classList.toggle('current');
            e.target.classList.toggle('current');
        }
    });
}
