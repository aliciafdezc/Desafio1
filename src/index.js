import './styles.css';

import { ProjectList, createProjectHtml } from './projectMenu';


export const projectList = new ProjectList();
projectList.project.forEach(createProjectHtml); 
