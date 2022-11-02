export const initChangeTheme = () => {
    const toggle = document.querySelector('footer .toggle span');
    
    toggle.addEventListener('click', (e) => {
        const body = document.querySelector('.theme');
        body.classList.toggle('dark');
        body.classList.toggle('light');
    });
}