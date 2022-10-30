/* import { tasksList } from "../.."; */
import { Subtask, Task } from "../tasks";
import { appendTaskToPanel } from '..';

export const modal = document.querySelector('.tasksModal');
let subtaskList = [];

export const initModal = () => {
    const modalContainer = document.querySelector('.modalContainer');
    modalContainer.addEventListener('click', (e) => {
        // CLOSE MODAL
        if (e.target.parentNode.classList.contains('close')) {
            modal.classList.remove('visible');
            resetModal();
        }

        //ADD SUBTASK
        if (e.target.classList.contains('addSubtask') || e.target.parentNode.classList.contains('addSubtask')) {
            addSubtask();
        }

        //ADD TASK
        if (e.target.classList.contains('addTask') || e.target.parentNode.classList.contains('addTask')) {
            let task = createTask();
            modal.classList.remove('visible');
            resetModal();
            appendTaskToPanel(task);
        }
    });
}


const createTask = () => {
    let taskName = modal.querySelector('.taskName').querySelector('.name').value;
    const imgUrl = modal.querySelector('.img').querySelector('.url').value;
    const label = {
        'labelName': modal.querySelector('.label').querySelector('.name').value,
        'labelColor': modal.querySelector('.label').querySelector('.color').value
    }
    const priority = modal.querySelector('.priority').querySelector('select').value;
    if (!taskName) taskName = 'New task';
    const task = new Task(taskName, imgUrl, label, subtaskList, priority);

    /* tasksList.addTask(task); *///maybe it's not necessary

    return task;
}


const addSubtask = () => {
    const subtaskInput = document.querySelector('.checklist').querySelector('input');
    const subtaskName = subtaskInput.value;
    if (subtaskName) {
        const container = document.querySelector('.checklist').querySelector('.container');
        const htmlSubtask = `<div><i class="check off fa fa-square-o"></i><span class="subtask">${[subtaskName]}</span></div>`;
        container.innerHTML += htmlSubtask;
        subtaskList.push(new Subtask(subtaskName, false));
        subtaskInput.classList.remove('empty');
    } else {
        subtaskInput.classList.add('empty');
    }
}


const resetModal = () => {
    subtaskList = [];
    modal.querySelector('.checklist').querySelector('.container').innerHTML = '';
    const inputs = modal.querySelectorAll('input');
    inputs.forEach(element => {
        element.value = '';
    });
}
