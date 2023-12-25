var bd;

function IniciarBaseDatos()
  {
    var solicitud = indexedDB.open("OnPC");

    solicitud.addEventListener("error", MostrarError);
    solicitud.addEventListener("success", Comenzar);
    solicitud.addEventListener("upgradeneeded", CrearAlmacen);
  }

function MostrarError(evento)
  {
      alert("Tenemos un ERROR");
  }

function Comenzar(evento)
  {
      bd = evento.target.result;
  }

function CrearAlmacen(evento)
  {
      var basededatos = evento.target.result;
      var almacen = basededatos.createObjectStore("Contactos", {keyPath: "id"});
      almacen.createIndex("BuscarNombre", "nombre", {unique: false});
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