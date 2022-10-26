export class Panel {

    static fromJSON( {id, name, taskList} ) {
        const panel = new Panel(taskList, name);
        panel.id = id;
        
        return panel;
    }

    constructor( taskList, name ) {
        this.taskList = taskList;
        this.name = name;
        this.id = new Date().getTime();
    }


    addTask() {
       
    }

    
    deleteTask() {
       
    }

}

