// Crear clase Tarea con ID, descripcion, estado y fechaCreacion

class Task {
  constructor(id, description, status, createDate, endDate) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createDate = createDate;
    this.endDate = endDate;
  }
}

export default Task;
