const modalContainer = document.querySelectorAll('.modalContainer');

modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        document.querySelector('.tasksModal').classList.remove('visible');
    }
    
});