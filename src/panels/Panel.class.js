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
       /* this.saveLocalStorage(); */
    }

    
    deleteTask(id) {
        this.taskList = this.taskList.filter( task => task.id != id );
        /* this.saveLocalStorage(); */
    }
}

