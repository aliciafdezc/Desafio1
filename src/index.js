import './styles.css';

import { PanelList } from './panels';
import { TasksList } from './panels/tasks';
import { initPanels } from './panels/panelsLogic';
import { initModal } from './panels/tasksModal/modalLogic'

export const panelList = new PanelList();
export const tasksList = new TasksList();
panelList.panel.forEach(initPanels); 
initModal();