import './styles.css';

import { initChangeTheme } from './js/general';
import { initMenus } from './js/menus.js';
import { PanelList, createPanel, addDropEvents } from './js/panels';
import { initModal } from './js/modal'


export const panelList = new PanelList();
panelList.panels.forEach(createPanel); 
initMenus();
initModal();
addDropEvents();
initChangeTheme();

console.log(localStorage)
/* localStorage.clear(); */