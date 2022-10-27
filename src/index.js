import './styles.css';

import { PanelList } from './panels';
import { initPanels } from './panels/panelsLogic';
import { initModal } from './panels/tasksModal/modalLogic'

export const panelList = new PanelList();
panelList.panel.forEach(initPanels); 
initModal();