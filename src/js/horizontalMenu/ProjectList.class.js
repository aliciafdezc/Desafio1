import { Project } from "./Project.class";

export class ProjectList { 
    
    constructor() {
        
        this.cargarLocalStorage();
    }

    newProject(project) {
        this.project.push(project);
        this.guardarLocalStorage();
    }

    /* eliminarTodo(id) {
        this.todo = this.todo.filter( todo => todo.id != id ); //Si pongo !== comparo también si son del mismo tipo
        //Devuelve el array excluyendo el id.
        this.guardarLocalStorage();
    }

    eliminarCompletados() {
        this.todo = this.todo.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    } */

    guardarLocalStorage() {
        localStorage.setItem('project', JSON.stringify(this.project));
    }

    cargarLocalStorage() {
        
        this.project = (localStorage.getItem('project')) 
                        ? JSON.parse(localStorage.getItem('project'))
                        :[];
        this.project = this.project.map( Project.fromJSON );
        console.log(this.project);
    }
    
}