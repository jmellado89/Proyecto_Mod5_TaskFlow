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

// Leccion 3
// Capturar elementos del DOM
const tareaInput = document.getElementById("tareaInput");
const tareaFecha = document.getElementById("tareaFecha");
const btnCrearTarea = document.getElementById("btnCrearTarea");
const listaTareas = document.getElementById("listaTareas");

// Agregamos tareas
btnCrearTarea.addEventListener("click", () => {
  crearTarea();
});

// Funcionalidad agregar tarea con tecla enter
tareaInput.addEventListener("click", (event) => {
  if (event.key === "Enter") {
    crearTarea();
  }
});

// Deshabilitar botón cuando hay menos de 3 caracteres con keyup
tareaInput.addEventListener("keyup", (event) => {
  if (tareaInput.value.length < 3) {
    btnCrearTarea.disabled = true;
  } else {
    btnCrearTarea.disabled = false;
  }
});

// Eliminar tarea con delegacion de eventos
listaTareas.addEventListener("click", (event) => {
  //Verificamos si target es li
  if (event.target.tagName === "LI") {
    event.target.remove();
  }
});

//Realizar hover de tarea con mouseover
listaTareas.addEventListener("mouseover", (event) => {
  if (event.target.tagName === "LI") {
    event.target.style.backgroundColor = "#0d6efd";
    event.target.style.color = "white";
  }
});
listaTareas.addEventListener("mouseout", (event) => {
  if (event.target.tagName === "LI") {
    event.target.style.backgroundColor = "white";
    event.target.style.color = "black";
  }
});

// Función para añadir tareas a la lista
function crearTarea() {
  // Formatear el campo de Fecha
  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
  const fechaFormateada = new Date(tareaFecha.value).toLocaleDateString(
    "es-ES",
    opciones,
  );
  // Validar campo vacío
  if (tareaInput.value.trim() !== "" && tareaFecha.value.trim() !== "") {
    const nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = `${tareaInput.value}\n a realizarse el: ${fechaFormateada}`;
    nuevaTarea.classList.add("list-group-item");

    listaTareas.appendChild(nuevaTarea);

    //Limpiar input
    tareaInput.value = "";
    tareaFecha.value = "";
  } else {
    alert("Ingresa los campos Descripción y Fecha");
  }
}
