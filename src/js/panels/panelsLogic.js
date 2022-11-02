/* import { Task } from '../tasks'; */
import { panelList } from './../..';
import { createTaskHtml, addEvents } from "./../tasks";

const panelSizeBig = 'b-four';
const panelSizeSmall = 's-twelve';
const panelsContainer = document.querySelector('.panelsContainer.row');
export let clickedPanel;


export const createPanel = (panel) => {
    let hmtlPanel = `
    <div class="panel columns ${(panelSizeSmall)} ${(panelSizeBig)}" data-id="${(panel.id)}">
        <div class="row">
            <div class="title columns twelve">${(panel.name)}</div>
            <div class="tasks columns twelve">${(panel.taskList)}</div>
            <div class="addTask columns ${(panelSizeSmall)}">
                <i class="fa fa-plus-circle add"></i>
                <span class="add">NEW TASK</span>
            </div>
        </div>    
    </div>`;
    
    const panelsContainer = document.querySelector('.panelsContainer.row');
    panelsContainer.innerHTML += hmtlPanel;
};


panelsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('addTask') || e.target.parentNode.classList.contains('addTask')) {
        const modal = document.querySelector('.modal');
        modal.classList.add('visible');
        modal.querySelector('.modalBottom').classList.add('addTask');
        clickedPanel = e.target.closest('.panel');
    }   
});


export const appendTaskToPanel = (task) => {
    const panel = panelList.panels.find(element => element.id == clickedPanel.getAttribute('data-id'));
    panel.addTask(task);
    clickedPanel.querySelector('.tasks').append(createTaskHtml(task));
    addEvents(clickedPanel.querySelector('.tasks').lastChild);
}

export const addDropEvents = () => {
    const panels = document.querySelectorAll('.tasks');
    panels.forEach(p => {
        p.addEventListener('dragenter', dragEnter);
        p.addEventListener('dragover', dragOver);
        p.addEventListener('drop', drop);
        p.addEventListener('dragleave', dragLeave);
    });
}

const dragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
}

const dragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
}

const dragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();
}

const drop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.querySelector('[data-id="' + id + '"]');
    const oldPanelId = draggable.closest('.panel').getAttribute('data-id');
    const newPanelId = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
    const oldPanel = panelList.panels.find(element => element.id == oldPanelId);
    const newPanel = panelList.panels.find(element => element.id == newPanelId);
    const task = oldPanel.getTask(id);
    oldPanel.deleteTask(id);
    newPanel.addTask(task);
    e.currentTarget.append(draggable);
}