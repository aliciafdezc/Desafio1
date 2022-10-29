export class Task {

    static fromJSON( {} ) {
        const task = new Task();

        return task;
    }

    constructor( name, img, label, subtasks, priority ) {
        this.name = name;
        this.img = img;
        this.label = label;
        this.subtasks = subtasks;
        this.priority = priority;
        this.id = new Date().getTime();
    }
}