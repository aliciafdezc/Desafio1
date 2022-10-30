import { panelList } from '../..';
import { clickedPanel } from '..';

export function createTaskHtml(task) {
    let taskHtml = `<div class="taskContainer" data-id="${(task.id)}">
                        <div class="tagsContainer u-pull-left">
                            <span class="priority ${(task.priority.toLowerCase())}">${(task.priority)}</span>
                    `;
    if (task.label['labelName'].trim().length > 0) 
        taskHtml += `<span class="label" style="background-color:${(task.label['labelColor'])};">${(task.label['labelName'])}</span>`;                 
    
    taskHtml += `</div>
                    <div class="iconsContainer u-pull-right">
                        <i class="edit fa fa-pencil-square-o"></i>
                        <i class="delete fa fa-times-circle"></i>
                    </div>

                    <div class="taskName u-cf">
                        <p class="name">${(task.name)}</p>
                        <div class="line"></div>
                    </div>`;

    if (task.subtasks.length > 0) 
        taskHtml += `<div class="subtasksDropDown u-pull-left">
                        <i class="fa fa-caret-down check"></i>
                        <span>0/${(task.subtasks.length)}</span>
                    </div>`;        
                    
    taskHtml += `<div class="deadline">7 days</div>
                    <div class="subtasksContainer u-cf">${(createSubtasksHtml(task.subtasks))}</div>
            </div>`;

                                     
    return taskHtml;
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
}

const deleteTask = (taskContainer) => {
    const deleteIcon = taskContainer.querySelector('.delete');
    deleteIcon.addEventListener('click', (e) => {
        taskContainer.remove();
        const panel = panelList.panel.find(element => element.id == clickedPanel.getAttribute('data-id'));
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