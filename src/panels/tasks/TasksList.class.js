import { Task } from "./";

export class TasksList { 
    
    constructor() {
        this.loadLocalStorage();
    }


    addTask( task ) {
       this.tasks.push(task);
       this.saveLocalStorage(); 
    }

    saveLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    loadLocalStorage() {
        this.tasks = (localStorage.getItem('tasks')) 
                        ? JSON.parse(localStorage.getItem('tasks'))
                        :[];
    
       
        this.tasks = this.tasks.map( Task.fromJSON );
    }
}

