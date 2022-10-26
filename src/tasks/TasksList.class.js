import { Task } from "./Task.class";

export class TasksList { 
    
    constructor() {
        this.loadLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem('task', JSON.stringify(this.task));
    }
    
    loadLocalStorage() {
        this.task = (localStorage.getItem('task')) 
                        ? JSON.parse(localStorage.getItem('task'))
                        :[];
    
       
        this.task = this.task.map( Task.fromJSON );
        console.log(this.task)
    }
}

