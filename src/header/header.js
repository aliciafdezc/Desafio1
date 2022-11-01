export const initMenus = () => {

    document.querySelectorAll(".settingsMenu li").forEach(option => {
        option.addEventListener("click", function(){        
            option.querySelector('i').classList.toggle('fa-caret-down');
            option.querySelector('i').classList.toggle('fa-caret-up');
            const article = option.nextElementSibling;
            article.style.display = article.style.display === 'block' ? 'none' : 'block';
        });
    });
}
