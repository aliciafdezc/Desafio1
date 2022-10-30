export class Panel {

    static fromJSON( {id, name, taskList} ) {
        const panel = new Panel(taskList, name);
        panel.id = id;
        
        return panel;
    }

    constructor( taskList, name, id ) {
        this.taskList = taskList;
        this.name = name;
        this.id = id;
    }

    addTask(task) {
       this.taskList.push(task);
       this.saveLocalStorage();
    }

    
    deleteTask(id) {
        this.taskList = this.taskList.filter( task => task.id != id );
        this.saveLocalStorage();
    }


    saveLocalStorage() {
        localStorage.setItem('panel' + this.id, JSON.stringify(this));
        console.log(localStorage);
    }


    /* loadLocalStorage() {
        this.panels = (localStorage.getItem('panels')) 
                        ? JSON.parse(localStorage.getItem('panels'))
                        : [ new Panel([], 'TO DO', 1), 
                            new Panel([], 'IN PROGRESS', 2),
                            new Panel([], 'DONE', 3)
                        ];

        this.panels = this.panels.map( Panel.fromJSON );
    } */
}

