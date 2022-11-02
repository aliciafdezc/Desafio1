export class Project {

    static fromJSON( { id, name, current } ) {
        const project = new Project(name);
        project.id = id;
        project.current = current;

        return project;
    }

    constructor( name ) {
        this.name = name;
        this.id = new Date().getTime();
        this.current = false;
        this.creationDate = new Date();
    }
}