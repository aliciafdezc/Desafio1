import './styles.css';

import { initChangeTheme } from './js/general';
import { initMenus } from './js/menus.js';
import { PanelList, createPanel, addDropEvents } from './js/panels';
import { initModal } from './js/modal'

/* import { TasksList } from './tasks'; */


export const panelList = new PanelList();
/* export const tasksList = new TasksList(); */
panelList.panels.forEach(createPanel); 

initMenus();
initModal();
addDropEvents();
initChangeTheme();

/* 
console.log(tasksList) */

console.log(localStorage)
/* localStorage.clear(); */