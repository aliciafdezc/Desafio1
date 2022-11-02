

export class Subtask {
    static fromJSON( { name, isCompleted, id } ) {
        const subtask = new Subtask(name, isCompleted);
        subtask.id = id;
       
        return subtask;
    }


    constructor( name, isCompleted ) {
        this.name = name;
        this.isCompleted = isCompleted;
        this.id = new Date().getTime();
    }

    
}