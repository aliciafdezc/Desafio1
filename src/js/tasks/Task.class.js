import { Subtask } from '.';

export class Task {

    static fromJSON( { subtasks, name, img, label, priority, id } ) {
        const task = new Task(subtasks, name, img, label, priority);
        task.id = id;
        task.loadLocalStorage();
        return task;
    }

    constructor( subtasks, name, img, label, priority ) {
        this.name = name;
        this.img = img;
        this.label = label;
        this.subtasks = subtasks;
        this.priority = priority;
        this.id = new Date().getTime();
        
    }

    emptyList() {
        this.subtasks = [];
    }
    
    /**
     * @param {any} name
     */
    set setName(name) {
        this.name = name;
    }

    /**
     * @param {any} img
     */
    set setImg(img) {
        this.img = img;
    }
    /**
     * @param {any} label
     */
    set setLabel(label) {
        this.label = label;
    }

    /**
     * @param {any} priority
     */
    set setPriority(priority) {
        this.priority = priority;
    }

    addSubtask(subtask) {
        this.subtasks.push(subtask);
    }

    delete(id) {
        this.subtasks = this.subtasks.filter( subtask => subtask.id != id );

    }

    loadLocalStorage() {
        this.subtasks = (localStorage.getItem('subtask')) 
                        ? JSON.parse(localStorage.getItem('subtask'))
                        : [  ];

        this.subtasks = this.subtasks.map( Subtask.fromJSON );
        
    }
}