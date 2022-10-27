/* const initModal = () => {

} */
export const initModal = () => {
    const modalContainer = document.querySelector('.modalContainer');
    modalContainer.addEventListener('click', (e) => {
        // CLOSE MODAL
        if (e.target.parentNode.classList.contains('close')) {
            document.querySelector('.tasksModal').classList.remove('visible');
        }

        //ADD TASK
        if (e.target.classList.contains('addTask') || e.target.parentNode.classList.contains('addTask')) {
            document.querySelector('.tasksModal').classList.remove('visible');
            
        }
    });
}
