/* import { tasksList } from "../.."; */
import { Subtask, Task, editTaskHtml } from "../tasks";
import { appendTaskToPanel } from '../panels';

export const modal = document.querySelector('.modal');
let subtaskList = [];
let clickedTask;

export const initModal = () => {
    const modalContainer = document.querySelector('.modalContainer');
    modalContainer.addEventListener('click', (e) => {
        // CLOSE MODAL
        if (e.target.parentNode.classList.contains('close')) {
            modal.classList.remove('visible');
            resetModal();
        } //ADD SUBTASK
        else if (e.target.classList.contains('addSubtask') || e.target.parentNode.classList.contains('addSubtask')) {
            addSubtask();
        } //ADD TASK
        else if (e.target.classList.contains('addTask') || e.target.parentNode.classList.contains('addTask')) {
            let task = createTask();
            modal.classList.remove('visible');
            modal.querySelector('.modalBottom').classList.remove('addTask');
            resetModal();
            appendTaskToPanel(task);
        } //SAVE EDITED TASK
        else if (e.target.classList.contains('saveTask') || e.target.parentNode.classList.contains('saveTask')) {
            modal.classList.remove('visible');
            modal.querySelector('.modalBottom').classList.remove('saveTask');
            const elements = selectTaskElements();
            clickedTask.setName = elements['taskName'];
            clickedTask.setImg = elements['imgUrl'];
            clickedTask.setLabel = elements['label'];
            clickedTask.setPriority = elements['priority'];
            subtaskList.forEach(subtask => {
                clickedTask.addSubtask(subtask);
            });
            editTaskHtml(clickedTask);
            resetModal();
        }
    });
}

const selectTaskElements = () => {
    let taskName = modal.querySelector('.taskName').querySelector('.name').value;
    if (!taskName) taskName = 'New task';
    const imgUrl = modal.querySelector('.img').querySelector('.url').value;
    const label = {
        'labelName': modal.querySelector('.label').querySelector('.name').value,
        'labelColor': modal.querySelector('.label').querySelector('.color').value
    }
    const priority = modal.querySelector('.priority').querySelector('select').value;
    return {'taskName': taskName, 'imgUrl': imgUrl, 'label': label, 'priority': priority};
}

const createTask = () => {
    const elements = selectTaskElements();
    const task = new Task(subtaskList, elements['taskName'], elements['imgUrl'], elements['label'], elements['priority']);
    /* tasksList.addTask(task); *///may not be necessary

    return task;
}


const addSubtask = () => {
    const subtaskInput = document.querySelector('.checklist').querySelector('input');
    const subtaskName = subtaskInput.value;
    if (subtaskName) {
        const container = document.querySelector('.checklist').querySelector('.container');
        const htmlSubtask = `<div><i class="check fa fa-square-o"></i><span class="subtask">${[subtaskName]}</span></div>`;
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

export const setModal = (task) => {
    clickedTask = task;
    let iconClass = '';
    modal.querySelector('.taskName').querySelector('.name').value = task.name;
    modal.querySelector('.img').querySelector('.url').value = task.img;
    modal.querySelector('.label').querySelector('.name').value = task.label['labelName'];
    modal.querySelector('.label').querySelector('.color').value = task.label['labelColor'];
    const container = document.querySelector('.checklist').querySelector('.container');
    task.subtasks.forEach(subtask => {
        subtask.isCompleted ? iconClass = 'fa-check-square-o' : iconClass = 'fa-square-o';
        container.innerHTML += `<div><i class="check fa ${[iconClass]}"></i><span class="subtask">${[subtask.name]}</span></div>`;
    });
    const completed = task.subtasks.filter( subtask => subtask.isCompleted );
    const barProgress = 100 * completed.length / task.subtasks.length ;
    modal.querySelector('.progressBar').style.width = barProgress + '%';
    modal.querySelector('.priority').querySelector('select').value = task.priority;
}
