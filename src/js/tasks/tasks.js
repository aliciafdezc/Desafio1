import { panelList } from '../..';
import { clickedPanel } from '../panels';
import { modal, setModal } from '../modal';

export function createTaskHtml(task) {
    let taskHtml = `<div class="taskContainer" data-id="${(task.id)}">
                        <div class="img row">
                            <img class="columns twelve" src="${(task.img)}">
                        </div>
                            <div class="content">
                            <div class="tagsContainer u-pull-left">
                                <span class="priority ${(task.priority.toLowerCase())}">${(task.priority)}</span>
                                <span class="label" style="background-color:${(task.label['labelColor'])};">${(task.label['labelName'])}</span>                 
                            </div>
                            <div class="iconsContainer u-pull-right">
                                <i class="delete fa fa-times-circle"></i>
                            </div>

                            <div class="taskName u-cf">
                                <p class="name">${(task.name)}</p>
                                <div class="line"></div>
                            </div>
                            <div class="subtasksDropDown">
                                <i class="fa fa-caret-down"></i>
                                <span>0/${(task.subtasks.length)}</span>
                            </div>       
                           <div class="subtasksContainer">${(createSubtasksHtml(task.subtasks))}</div>
                        </div>
                    </div>`;

    const div = document.createElement('div');
    div.innerHTML = taskHtml;     
    if (task.label['labelName'].trim().length == 0) div.querySelector('.tagsContainer .label').classList.add('hide');
    if (task.subtasks.length == 0) div.querySelector('.subtasksDropDown').classList.add('hide');
    
    return div.firstElementChild;
}

function createSubtasksHtml(list) {
    let letHtml = `<ul class="subtasksList">`;
    let iconClass = '';
    list.forEach(subtask => {
        subtask.isCompleted ? iconClass = 'fa-check-square-o' : iconClass = 'fa-square-o';
        letHtml += `<li class="subtasksList" data-id="${(subtask.id)}"><i class="fa ${(iconClass)}"></i>${(subtask.name)}</li>`;
    });

    return letHtml += `</ul>`;
}


export function addEvents(taskContainer) {
    deleteTask(taskContainer);
    editTask(taskContainer);
    addDropDown(taskContainer);
    addCheck(taskContainer);
    makeDraggable(taskContainer);
}

const deleteTask = (taskContainer) => {
    const deleteIcon = taskContainer.querySelector('.delete');
    deleteIcon.addEventListener('click', (e) => {
        taskContainer.remove();
        const panel = panelList.panels.find(element => element.id == clickedPanel.getAttribute('data-id'));
        const taskId = taskContainer.getAttribute('data-id');
        panel.deleteTask(taskId);
    });
};

const editTask = (taskContainer) => {
    taskContainer.addEventListener('click', (e) => {
        const classes = ['subtasksContainer', 'subtasksDropDown', 'subtasksList', 'delete'];

        if (!classes.some(c => e.target.classList.contains(c)) && !classes.some(c => e.target.parentNode.classList.contains(c))) {
            modal.classList.add('visible');
            modal.querySelector('.modalBottom').classList.add('saveTask');
            const panel = panelList.panels.find(p => p.id == taskContainer.closest('.panel').getAttribute('data-id'));
            const task = panel.taskList.find(t => t.id == taskContainer.getAttribute('data-id'));
            setModal(task);
        }
    });
}

export const editTaskHtml = (task) => {
    const taskContainer = document.querySelector(`[data-id ="${(task.id)}"]`);
    taskContainer.querySelector('img').src = task.img;
    const priority = taskContainer.querySelector('.priority');
    priority.innerHTML = task.priority;
    priority.className = '';
    priority.classList.add('priority', task.priority.toLowerCase());
    taskContainer.querySelector('.taskName').querySelector('.name').innerHTML = task.name;
    const label = taskContainer.querySelector('.label');
    checkEditLabel(task, label);
    const subtasksDropDown = taskContainer.querySelector('.subtasksDropDown');
    checkEditSubtasks(task, subtasksDropDown);
}

const checkEditLabel = (task, label) => {
    if (task.label['labelName'] != '') {
        label.style.backgroundColor = task.label['labelColor'];
        label.innerHTML = task.label['labelName'];
        if (label.classList.contains('hide')) label.classList.remove('hide');
    } else {
        label.classList.add('hide');
    }
}

const checkEditSubtasks = (task, subtasksDropDown) => {
    if (task.subtasks.length > 0) {
        subtasksDropDown.querySelector('span').innerHTML = '0/' + task.subtasks.length;
        document.querySelector('.subtasksContainer').innerHTML = createSubtasksHtml(task.subtasks);
        if (subtasksDropDown.classList.contains('hide')) subtasksDropDown.classList.remove('hide');
    } else {
        subtasksDropDown.classList.add('hide');
        document.querySelector('.subtasksContainer').innerHTML = '';
    }
}

const addDropDown = (taskContainer) => {
    const container = taskContainer.querySelector('.subtasksDropDown');
    if (container) {
        const subtasksContainer = taskContainer.querySelector('.subtasksContainer');
        
        container.addEventListener('click', (e) => {
            subtasksContainer.classList.toggle('visible');
            container.querySelector('i').classList.toggle('fa-caret-down');
            container.querySelector('i').classList.toggle('fa-caret-up');
        });
    }
};

export const addCheck = (taskContainer) => {
    const container = taskContainer.querySelector('.subtasksDropDown');
    if (container) {
        const subtasksContainer = taskContainer.querySelector('.subtasksContainer');
        
        const iconList = subtasksContainer.querySelectorAll('i');
        iconList.forEach(icon => {
            icon.addEventListener('click', (e) => {
                const panel = panelList.panels.find(p => p.id == icon.closest('.panel').getAttribute('data-id'));
                const task = panel.taskList.find(t => t.id == icon.closest('.taskContainer').getAttribute('data-id'));
                const subtask = task.subtasks.find(st => st.id == icon.closest('.subtasksList').getAttribute('data-id'));
                subtask.isCompleted = !subtask.isCompleted;
                icon.classList.toggle('fa-square-o');
                icon.classList.toggle('fa-check-square-o');
            }); 
        });  
    } 
};


const makeDraggable = (taskContainer) => {
    const imgs = taskContainer.querySelectorAll('img');
    imgs.forEach(img => { img.draggable = false; });
    taskContainer.draggable = true;
    taskContainer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-id'));
    });
}

