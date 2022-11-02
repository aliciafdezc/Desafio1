/* import { tasksList } from "../.."; */
import { Subtask, Task, editTaskHtml, addCheck } from "./tasks";
import { appendTaskToPanel, PanelList } from './panels';
import { panelList } from "..";

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
            clickedTask.emptyList();
            subtaskList.forEach(subtask => {
                clickedTask.addSubtask(subtask);
            });
            
            editTaskHtml(clickedTask);
            const clickedTaskHtml = document.querySelector('[data-id="' + clickedTask.id + '"]');
            addCheck(clickedTaskHtml);
            const panel = clickedTaskHtml.closest('.panel');
            panelList.panels.find(p => p.id == panel.getAttribute('data-id')).updateTask(clickedTask);
            resetModal();
            panelList.save();
        }
    });
}

const selectTaskElements = () => {
    let taskName = modal.querySelector('.taskName .name').value;
    if (!taskName) taskName = 'New task';
    const imgUrl = modal.querySelector('.img .url').value;
    const label = {
        'labelName': modal.querySelector('.label .name').value,
        'labelColor': modal.querySelector('.label .color').value
    }
    const priority = modal.querySelector('.priority select').value;
    return {'taskName': taskName, 'imgUrl': imgUrl, 'label': label, 'priority': priority};
}

const createTask = () => {
    const elements = selectTaskElements();
    const task = new Task(subtaskList, elements['taskName'], elements['imgUrl'], elements['label'], elements['priority']);
    /* tasksList.addTask(task); *///may not be necessary

    return task;
}

const addSubtask = () => {
    const subtaskInput = document.querySelector('.checklist input');
    const subtaskName = subtaskInput.value;
    if (subtaskName) {
        const container = document.querySelector('.checklist .container');
        const subtask = new Subtask(subtaskName, false);
        container.append(createSubtaskHtml(subtask, 'fa-square-o'));
        addEventsSubtask(container.lastChild);
        subtaskList.push(subtask);
        subtaskInput.classList.remove('empty');
    } else {
        subtaskInput.classList.add('empty');
    }
}

const addEventsSubtask = (container) => {
    const check = container.querySelector('.check');
    const deleteSubtask = container.querySelector('.delete');
    const id = container.querySelector('.subtask').getAttribute('data-id');

    check.addEventListener('click', (e) => {
        const subtask = subtaskList.find(subtask => subtask.id == id);
        subtask.isCompleted = !subtask.isCompleted;
        check.classList.toggle('fa-square-o');
        check.classList.toggle('fa-check-square-o');
    });
    deleteSubtask.addEventListener('click', (e) => {
        subtaskList = subtaskList.filter( subtask => subtask.id != id );
        e.currentTarget.parentNode.remove();
    });
}

const createSubtaskHtml = (subtask, icon) => {
    const html = `<div class="subtasksList">
                    <i class="check fa ${[icon]}"></i>
                    <span class="subtask" data-id="${[subtask.id]}">${[subtask.name]}</span>
                    <i class="delete fa fa-times-circle"></i>
                </div>`; 
    const div = document.createElement('div');
    div.innerHTML = html;   
    return div.firstElementChild;   
}

const resetModal = () => {
    subtaskList = [];
    modal.querySelector('.checklist .container').innerHTML = '';
    const inputs = modal.querySelectorAll('input');
    inputs.forEach(element => {
        element.value = '';
    });
}

export const setModal = (task) => {
    clickedTask = task;
    let iconClass = '';
    modal.querySelector('.taskName .name').value = task.name;
    modal.querySelector('.img .url').value = task.img;
    modal.querySelector('.label .name').value = task.label['labelName'];
    modal.querySelector('.label .color').value = task.label['labelColor'];
    const container = document.querySelector('.checklist .container');
    task.subtasks.forEach(subtask => {
        subtaskList.push(subtask);
        subtask.isCompleted ? iconClass = 'fa-check-square-o' : iconClass = 'fa-square-o';
        container.append(createSubtaskHtml(subtask, iconClass));
        addEventsSubtask(container.lastChild);
    });
    const completed = task.subtasks.filter( subtask => subtask.isCompleted );
    const barProgress = 100 * completed.length / task.subtasks.length ;
    modal.querySelector('.progressBar').style.width = barProgress + '%';
    modal.querySelector('.priority select').value = task.priority;
}
