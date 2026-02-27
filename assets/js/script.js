// Crear clase Tarea con ID, descripcion, estado y fechaCreacion

class Task {
  constructor(id, description, status, createDate) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createDate = createDate;
  }
}

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

// Crear instancias de GestorTareas y Tareas
const manageTask = new ManageTask();

// Agregar tareas

manageTask.addTask(new Task(1, "Tarea 1", true, new Date()));
manageTask.addTask(new Task(2, "Tarea 2", false, new Date()));
manageTask.addTask(new Task(3, "Tarea 3", true, new Date()));
manageTask.addTask(new Task(4, "Tarea 4", false, new Date()));
manageTask.addTask(new Task(5, "Tarea 5", true, new Date()));

// Mostrar tareas

manageTask.listTasks();

// Cambiar estado de tarea

manageTask.changeStatus(1);
manageTask.listTasks();
manageTask.changeStatus(16);

// Eliminar tarea

manageTask.deleteTask(5);
manageTask.listTasks();
