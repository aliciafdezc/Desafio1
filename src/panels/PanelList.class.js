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
                        : [ new Panel([], 'TO DO'), 
                            new Panel([], 'IN PROGRESS'),
                            new Panel([], 'DONE')
                        ];

        this.panel = this.panel.map( Panel.fromJSON );
    }

}
