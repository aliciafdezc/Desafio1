import './styles.css';

import { PanelList } from './panels';
import { initPanels } from './panels/panelsLogic';


export const panelList = new PanelList();
panelList.panel.forEach(initPanels); 