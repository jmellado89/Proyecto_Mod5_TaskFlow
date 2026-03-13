// Crear clase Gestor de tareas que administre las tareas

class ManageTask {
  constructor() {
    this.tasks = [];
  }

  // CRUD --> Create, Read, Update, Delete

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log(`La tarea ${id} ha sido eliminada exitósamente!\n`);
  }

  listTasks() {
    console.log("-------- Listado de tareas ------------");
    console.table(this.tasks); // console.table lo hace ver genial
  }

  #searchTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  changeStatus(id) {
    let task = this.#searchTask(id);
    if (!task) {
      console.error("No se pudo actualizar: Tarea no encontrada\n");
      return "No se pudo actualizar: Tarea no encontrada";
    }

    task.status = !task.status;
    console.log(`Tarea con id ${id} actualizado exitósamente!\n`);
  }
}

export default ManageTask;
