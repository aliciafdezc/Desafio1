export class Subtask {
    constructor( name, isCompleted ) {
        this.name = name;
        this.isCompleted = isCompleted;
        this.id = new Date().getTime();
    }
}