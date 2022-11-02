import { Task } from '../tasks';

export class Panel {

    static fromJSON( {id, name, taskList} ) { 
        const panel = new Panel(taskList, name, id);
        panel.loadLocalStorage();
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

    updateTask(newTask) {
        this.taskList.splice(this.taskList.indexOf(newTask), 1, newTask);
        this.saveLocalStorage();
    }

    deleteTask(id) {
        this.taskList = this.taskList.filter( task => task.id != id );
        this.saveLocalStorage();
    }

    getTask(id) {
        return this.taskList.find(task => task.id == id);  
    }

    saveLocalStorage() {
        localStorage.setItem('task', JSON.stringify(this.taskList));
        localStorage.setItem('panel' + this.id, JSON.stringify(this));
    }


    loadLocalStorage() {
        this.taskList = (localStorage.getItem('task')) 
                        ? JSON.parse(localStorage.getItem('task'))
                        : [  ];

        this.taskList = this.taskList.map( Task.fromJSON );
        console.log (this.taskList);
    }
}

