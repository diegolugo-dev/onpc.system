var database;

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
}

function Comenzar(evento) { database = evento.target.result; }

function CrearAlmacen(evento){
    database = evento.target.result;
    var almacen = database.createObjectStore("Clients", {keyPath: "id"});
    almacen.createIndex("BuscarID", "nombre", {unique: false});
      
    //almacen.addEventListener("error", MostrarError);
}

function AlmacenarContacto() {

    var I = document.querySelector("#id").value;
    var N = document.querySelector("#nombre").value;
    var A = document.querySelector("#apellido").value;
  
    var contacto = {id: I, nombre: N, apellido: A};
  
    var transaccion = database.transaction(["Clients"], "readwrite");
    var almacen = transaccion.objectStore("Clients");
  
    almacen.add(contacto);

    document.querySelector("#id").value = "";
    document.querySelector("#nombre").value = "";
    document.querySelector("#apellido").value = "";

    alert("Registrado");
}

window.addEventListener("load", IniciarBaseDatos);