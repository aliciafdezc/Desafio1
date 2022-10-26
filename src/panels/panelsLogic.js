import { Panel } from './index';
import { PaneList } from './index';

const panelSize = 'four';

export const initPanels = (panel) => {
    createPanel(panel);
    addModalOpener();
}

export const createPanel = (panel) => {
    let hmtlPanel = `
    <div class="panel columns ${(panelSize)}">
        <div class="row">
            <div class="panelTitle twelve">${(panel.name)}</div>
            <div class="panelTasks twelve">
                <ul class="taskList">${(panel.taskList)}</ul></div>
            <div class="panelBottom twelve">
                <span class="addTask"><i class="fa fa-plus-circle"></i></span>
                <span class="addTask">ADD TASK</span>
            </div>
        </div>    
    </div>`;
    
    const panelsContainer = document.querySelector('.panelsContainer.row');
    panelsContainer.innerHTML += hmtlPanel;
};


const addModalOpener = () => {
    const taskList = document.querySelector('.taskList');
    taskList.addEventListener('click', (e) => {
        document.querySelector('tasksModal').style.display = block;
    });
};
