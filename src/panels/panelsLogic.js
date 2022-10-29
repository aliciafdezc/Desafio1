/* import { Task } from '../tasks'; */
import { PaneList } from './index';

const panelSize = 'four';
const panelsContainer = document.querySelector('.panelsContainer.row');

export const initPanels = (panel) => {
    createPanel(panel);
}

export const createPanel = (panel) => {
    let hmtlPanel = `
    <div class="panel columns ${(panelSize)}">
        <div class="row">
            <div class="title columns twelve">${(panel.name)}</div>
            <div class="tasks columns twelve">
                <ul class="taskList">${(panel.taskList)}</ul></div>
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
        const modal = document.querySelector('.tasksModal');
        modal.classList.add('visible')
        const inputs = modal.querySelectorAll('input');
        inputs.forEach(element => {
            element.value = '';
        });
    }   
});

/* 
divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; //Puedo identificar la parte del li a la que hice click
    //input, label o button

    const todoElemento = event.target.parentElement.parentElement; //Obtengo el li con el id del elemento
    const todoId = todoElemento.getAttribute('data-id');
    
    if ( nombreElemento.includes('input') ) {//click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')){
        //Hay que borrar el todo
        todoList.eliminarTodo( todoId );
        //La referencia html también hay que borrarla
        divTodoList.removeChild( todoElemento );
    }
}); */