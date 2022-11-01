import './styles.css';

import { initMenus } from './header/header.js';
import { PanelList, createPanel, addDropEvents } from './panels';
/* import { TasksList } from './panels/tasks'; */
import { initModal } from './panels/tasksModal/modalLogic'

export const panelList = new PanelList();
/* export const tasksList = new TasksList(); */
panelList.panels.forEach(createPanel); 
addDropEvents();
initModal();
initMenus();
/* 
console.log(tasksList) */
/* localStorage.clear(); */