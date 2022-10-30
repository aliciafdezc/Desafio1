import { Panel } from './';

export class PanelList {

    constructor() {
        this.loadLocalStorage();
    }


    saveLocalStorage() {
        localStorage.setItem('panel', JSON.stringify(this.panel));
    }


    loadLocalStorage() {
        this.panel = (localStorage.getItem('panel')) 
                        ? JSON.parse(localStorage.getItem('panel'))
                        : [ new Panel([], 'TO DO', 1), 
                            new Panel([], 'IN PROGRESS', 2),
                            new Panel([], 'DONE', 3)
                        ];

        this.panel = this.panel.map( Panel.fromJSON );
    }

}
