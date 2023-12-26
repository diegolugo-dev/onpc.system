var database = evento.target.result;

function IniciarBaseDatos() {
    var BtnGuardar = document.querySelector("#btnGuardar")
    BtnGuardar.addEventListener("click", AlmacenarContacto)


    var solicitud = indexedDB.open("OnPC");

    solicitud.addEventListener("error", MostrarError);
    solicitud.addEventListener("success", Comenzar);
    solicitud.addEventListener("upgradeneeded", CrearAlmacen);
}

function MostrarError(evento) {
    var error = evento.target.error;
  
    // Muestra un mensaje de alerta con información detallada sobre el error
    alert("Tenemos un ERROR: " + error.name + " - " + error.message);
  
    // Intenta resolver el error, si es posible
    if (error.name === "ConstraintError") {
      // El valor del campo no es válido
      var campo = error.constraint;
      var valor = error.value;
      alert("El valor del campo " + campo + " (" + valor + ") no es válido.");
    }
}

function Comenzar(evento) {
    database; 

  //Maneja los errores que ocurran durante la creación de la base de datos
  solicitud.addEventListener("error", function(error) {
    alert("Tenemos un ERROR: " + error.message);
  });
}

function CrearAlmacen(evento){
    var almacen = database.createObjectStore("Clients", {keyPath: "id"});
    almacen.createIndex("BuscarNombre", "nombre", {unique: false});
      
    //almacen.addEventListener("error", MostrarError);
}

function AlmacenarContacto() {

    var N = document.querySelector("#iddocumento").value;
    var I = document.querySelector("#nombre").value;
    var E = document.querySelector("#apellido").value;
  
    var contacto = { id: I, nombre: N, edad: E };
  
    var transaccion = database.transaction(["Clients"], "readwrite");
    var almacen = transaccion.objectStore("Clients");
  
    almacen.add(contacto);
  
  // Maneja la finalización exitosa
  transaccion.oncomplete = function() {
    // Realiza acciones adicionales aquí
  };

  // Maneja el error
  almacen.add(contacto).addEventListener("error", function(error) {
    // Maneja el error aquí
  });

    document.querySelector("#iddocumento").value = "";
    document.querySelector("#nombre").value = "";
    document.querySelector("#apellido").value = "";
}

window.addEventListener("load", IniciarBaseDatos);









/*
// Abre la base de datos
const request = indexedDB.open("OnPC", 1);

db.onsuccess = function(event) {
    const objectStore = db.createObjectStore("clients", {
      keyPath: "ID",
      autoIncrement: true,
      unique: true,
    });
};




/*
// Espera a que la base de datos esté abierta
request.onsuccess = function(event) {
  // Obtiene el objeto de la base de datos
  const db = event.target.result;

  // Crea el almacén de objetos
  const objectStore = db.createObjectStore("clients");

  // Crea los índices
  objectStore.createIndex("ID", "ID", { unique: true });
  objectStore.createIndex("client", "client", { unique: false });
  objectStore.createIndex("telefono", "telefono", { unique: false });
  objectStore.createIndex("email", "email", { unique: false });
};
/*
// Variables globales
const db = indexedDB.open("Clients", 1);
const tablaProductos = document.getElementById("tbody-productos");

// Función para verificar el cliente
function verificarCliente() {
  // Obtenemos el ID del cliente
  const idCliente = document.getElementById("id-cliente").value;

  // Realizamos la consulta a la base de datos
  const transaction = db.transaction("clientes", "readonly");
  const request = transaction.objectStore("clientes").get(idCliente);

  // Procesamos la respuesta
  request.onsuccess = function() {
    // El cliente está registrado
    if (request.result) {
      // Mostramos la parte de introducción de productos
      document.getElementById("div-productos").style.display = "block";
    } else {
      // El cliente no está registrado
      // Mostramos la opción de registrarlo
      document.getElementById("div-productos").style.display = "none";
    }
  };
}

// Función para agregar un producto
function agregarProducto() {
  // Obtenemos los datos del producto
  const producto = document.getElementById("input-producto").value;
  const cantidad = document.getElementById("input-cantidad").value;
  const precio = document.getElementById("input-precio").value;

  // Creamos un nuevo elemento de tabla
  const fila = document.createElement("tr");

  // Agregamos las celdas a la fila
  fila.appendChild(document.createElement("td"));
  fila.appendChild(document.createTextNode(producto));
  fila.appendChild(document.createElement("td"));
  fila.appendChild(document.createTextNode(cantidad));
  fila.appendChild(document.createElement("td"));
  fila.appendChild(document.createTextNode(precio));

  // Agregamos la fila a la tabla
  tablaProductos.appendChild(fila);
}

// Eventos
document.getElementById("btn-verificar").addEventListener("click", verificarCliente);
document.getElementById("btn-agregar-producto").addEventListener("click", agregarProducto);
*/