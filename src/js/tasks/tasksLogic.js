import { panelList } from './../..';
import { clickedPanel } from './../panels';

export function createTaskHtml(task) {
    let taskHtml = `<div class="taskContainer" data-id="${(task.id)}">
                        <div class="img row">
                            <img class="columns twelve" src="${(task.img)}">
                        </div>
                            <div class="content">
                            <div class="tagsContainer u-pull-left">
                                <span class="priority ${(task.priority.toLowerCase())}">${(task.priority)}</span>
                    `;
    if (task.label['labelName'].trim().length > 0) 
        taskHtml += `<span class="label" style="background-color:${(task.label['labelColor'])};">${(task.label['labelName'])}</span>`;                 
    
    taskHtml += `</div>
                    <div class="iconsContainer u-pull-right">
                        <i class="delete fa fa-times-circle"></i>
                    </div>

                    <div class="taskName u-cf">
                        <p class="name">${(task.name)}</p>
                        <div class="line"></div>
                    </div>`;

    if (task.subtasks.length > 0) 
        taskHtml += `<div class="subtasksDropDown">
                        <i class="fa fa-caret-down"></i>
                        <span>0/${(task.subtasks.length)}</span>
                    </div>`;        
                    
    taskHtml += `<div class="subtasksContainer">${(createSubtasksHtml(task.subtasks))}</div>
                </div>
            </div>`;

    const div = document.createElement('div');
    div.innerHTML = taskHtml;
                                     
    return div.firstElementChild;
}

function createSubtasksHtml(list) {
    let letHtml = `<ul>`;
    let iconClass = '';
    list.forEach(subtask => {
        subtask.isCompleted ? iconClass = 'fa-check-square-o' : iconClass = 'fa-square-o';
        letHtml += `<li><i class="fa ${(iconClass)}"></i>${(subtask.name)}</li>`;
    });

    return letHtml += `</ul>`;
}


export function addEvents(taskContainer) {
    deleteTask(taskContainer);
    subtasksDropDown(taskContainer);
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

const subtasksDropDown = (taskContainer) => {
    const container = taskContainer.querySelector('.subtasksDropDown');

    if (container) {
        const subtasksContainer = taskContainer.querySelector('.subtasksContainer');
        container.addEventListener('click', (e) => {
            subtasksContainer.classList.toggle('visible');
            container.querySelector('i').classList.toggle('fa-caret-down');
            container.querySelector('i').classList.toggle('fa-caret-up');
        });

        const iconList = subtasksContainer.querySelectorAll('i');
        iconList.forEach(icon => {
            icon.addEventListener('click', (e) => {
                icon.classList.toggle('fa-square-o');
                icon.classList.toggle('fa-check-square-o');
            }); 
        });  
    } 
}

const makeDraggable = (taskContainer) => {
    const imgs = taskContainer.querySelectorAll('img');
    imgs.forEach(img => {
        img.draggable = false;
    });
    taskContainer.draggable = true;
    taskContainer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-id'));
        setTimeout(() => {
            e.target.classList.add('oculto');
        }, 0);
    });
}

