export class Task {

    static fromJSON( {} ) {
        const task = new Task();

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
}