/* const initModal = () => {

} */
export const initModal = () => {
    const modalContainer = document.querySelector('.modalContainer');
    modalContainer.addEventListener('click', (e) => {
        // CLOSE MODAL
        if (e.target.parentNode.classList.contains('close')) {
            document.querySelector('.tasksModal').classList.remove('visible');
        }


        //ADD SUBTASK
        if (e.target.classList.contains('addSubtask') || e.target.parentNode.classList.contains('addSubtask')) {
            addSubtask(); 
        }


        //ADD TASK
        if (e.target.classList.contains('addTask') || e.target.parentNode.classList.contains('addTask')) {
            document.querySelector('.tasksModal').classList.remove('visible');
            const taskName = document.querySelector('.taskName').querySelector('.name').value;
            const imgRoute = document.querySelector('.img').querySelector('input').value;
            const labelName = document.querySelector('.label').querySelector('div.name').querySelector('input').value;
            const labelColor = document.querySelector('.label').querySelector('div.color').querySelector('input').value;
           /*  const subtaskList;
            const priority = document.querySelector('select.priority') */
            console.log(labelColor);
            /* const task = new task(taskName.name.value, img.input.value, checklist.container.value, priority.select.value); */
          /*   panel.addTask(task) */



            /* txtInput.addEventListener('keyup', (event) => {
                if(event.keyCode === 13 && txtInput.value.length > 0) { //Cuando pulso intro
                    const nuevoTodo = new Todo(txtInput.value);
                    todoList.nuevoTodo(nuevoTodo);
                    crearTodoHtml(nuevoTodo);
                    txtInput.value = '';
                }
            }); */


        }
    });

    const addSubtask = () => {
        const subtaskInput = document.querySelector('.checklist').querySelector('input');
        const subtaskName = subtaskInput.value;
        if (subtaskName) {
            const container = document.querySelector('.checklist').querySelector('.container');
            const htmlSubtask = `<div class="subtask"><i class="check off fa fa-square-o"></i><span class="subtask">${[subtaskName]}</span></div>`;
            container.innerHTML += htmlSubtask;
            subtaskInput.classList.remove('empty');
        } else {
            subtaskInput.classList.add('empty');
        }
    }
}
