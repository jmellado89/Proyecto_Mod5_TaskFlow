import Task from "./classes/Task.js";
import ManageTask from "./classes/ManageTask.js";

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
const formularioTarea = document.getElementById("formTarea");

// Agregamos tareas
btnCrearTarea.addEventListener("click", () => {
  setTimeout(() => {
    crearTarea();
    alert("Tarea añadida exitósamente!");
  }, 2000);
});

// Funcionalidad agregar tarea con tecla enter
tareaInput.addEventListener("click", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    setTimeout(() => {
      crearTarea();
      alert("Tarea añadida exitósamente!");
    }, 2000);
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
    const nuevaTarea = `<li class="list-group-item d-flex justify-content-between">
                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="">
                        <p>${tareaInput.value}</p>
                        <p>Fecha a realizarse: ${fechaFormateada}</p>
                    </li>
`;

    listaTareas.innerHTML += nuevaTarea;

    //Limpiar input
    tareaInput.value = "";
    tareaFecha.value = "";
  } else {
    alert("Ingresa los campos Descripción y Fecha");
  }
}

// Tachar tareas realizadas

listaTareas.addEventListener("change", (event) => {
  if (event.target.classList.contains("form-check-input")) {
    const checkbox = event.target;

    const contenedorTarea = checkbox.parentElement;
    const textoTarea = contenedorTarea.querySelector("p"); // El primer <p> es el título

    // 3. Aplicamos o quitamos el tachado según el estado del checkbox
    if (checkbox.checked) {
      textoTarea.style.textDecoration = "line-through";
      textoTarea.style.color = "gray";
    } else {
      textoTarea.style.textDecoration = "none";
      textoTarea.style.color = "inherit";
    }
  }
});

const pokeBaseUrl = "https://pokeapi.co/api/v2";
const pokeContainer = document.getElementById("poke-container");

const getPokemonById = async (id) => {
  try {
    const response = await fetch(`${pokeBaseUrl}/pokemon/${id}`);
    if (!response.ok) throw new Error("No se encontró el Pokémon");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
  }
};

const saludoPokemon = async () => {
  // 1. Generar número aleatorio (Rango 1 a 248 según tu ejemplo)
  const pokeNumber = Math.floor(Math.random() * 248) + 1;

  // 2. Esperar a que la API responda (usando await)
  const pokemon = await getPokemonById(pokeNumber);

  // 3. Validar que recibimos datos antes de renderizar
  if (pokemon) {
    const pokeCard = `
      <div class="m-3">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}"

         style="max-height: 100px; width: auto; margin-top: 10px;"
         alt="${pokemon.name}">
          <h5 class="card-title">${pokemon.name} quiere que termines tus tareas pendientes!!</h5>

      </div>`;

    pokeContainer.innerHTML = pokeCard;
  }
};

// Llamar a la función para que se ejecute al cargar
saludoPokemon();
