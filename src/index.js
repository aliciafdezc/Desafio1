import './styles.css';


import { initChangeTheme } from './js/general';
import { initMenus } from './js/header.js';
import { PanelList, createPanel, addDropEvents } from './js/panels';

/* import { TasksList } from './panels/tasks'; */
import { initModal } from './js/modal/modalLogic'

export const panelList = new PanelList();
/* export const tasksList = new TasksList(); */
panelList.panels.forEach(createPanel); 
addDropEvents();
initModal();
initMenus();
initChangeTheme();

/* 
console.log(tasksList) */
/* localStorage.clear(); */