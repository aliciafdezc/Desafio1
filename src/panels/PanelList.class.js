import { Panel } from './';

export class PanelList {

    constructor() {
        this.loadLocalStorage();
    }


    saveLocalStorage() {
        localStorage.setItem('panels', JSON.stringify(this.panels));
    }


    loadLocalStorage() {
        this.panels = (localStorage.getItem('panels')) 
                        ? JSON.parse(localStorage.getItem('panels'))
                        : [ new Panel([], 'TO DO', 1), 
                            new Panel([], 'IN PROGRESS', 2),
                            new Panel([], 'DONE', 3)
                        ];
                        
        this.panels = this.panels.map( Panel.fromJSON );
    }

}
