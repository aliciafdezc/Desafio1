/* import { Task } from '../tasks'; */
import { panelList } from './..';
import { createTaskHtml, addEvents } from "./tasks";

const panelSize = 'four';
const panelsContainer = document.querySelector('.panelsContainer.row');
export let clickedPanel;


export const createPanel = (panel) => {
    let hmtlPanel = `
    <div class="panel columns ${(panelSize)}" data-id="${(panel.id)}">
        <div class="row">
            <div class="title columns twelve">${(panel.name)}</div>
            <div class="tasks columns twelve">${(panel.taskList)}</div>
            <div class="addTask columns twelve">
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
        document.querySelector('.tasksModal').classList.add('visible');
        clickedPanel = e.target.closest('.panel');
    }   
});


export const appendTaskToPanel = (task) => {
    panelList.panels.find(element => element.id == clickedPanel.getAttribute('data-id')).addTask(task);
    clickedPanel.querySelector('.tasks').innerHTML += createTaskHtml(task);
    addEvents(clickedPanel.querySelector('.tasks').lastChild);
}

