var database;

function StartDatabase() {
    var BtnGuardar = document.querySelector("#btnGuardar")
    BtnGuardar.addEventListener("click", AlmacenarContacto)


    var request = indexedDB.open("OnPC");

    request.addEventListener("error", MostrarError);
    request.addEventListener("success", Start);
    request.addEventListener("upgradeneeded", CreateWarehouse);
}

function MostrarError(event) {
    var error = event.target.error;
}

function Start(event) { database = event.target.result; }

function CreateWarehouse(event){
    database = event.target.result;
    var warehouse = database.createObjectStore("Clients", {keyPath: "id"});
    warehouse.createIndex("BuscarID", "nombre", {unique: false});
      
    //warehouse.addEventListener("error", MostrarError);
}

function AlmacenarContacto() {

    var I = document.querySelector("#id").value;
    var N = document.querySelector("#nombre").value;
    var A = document.querySelector("#apellido").value;
    var P = document.querySelector("#phone").value;
  
    var client = {id: I, nombre: N, apellido: A, phone: P};
  
    var transaccion = database.transaction(["Clients"], "readwrite");
    var warehouse = transaccion.objectStore("Clients");
  
    warehouse.add(client);

    document.querySelector("#id").value = "";
    document.querySelector("#nombre").value = "";
    document.querySelector("#apellido").value = "";
    document.querySelector("#phone").value = "";

    alert("Registrado");
}

window.addEventListener("load", StartDatabase);