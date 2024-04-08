let arrayTask = [];
var masRapido  = Infinity;
var nombreRapido = '';


function agregar() {
    const nombreInput = document.getElementById('nombreInput').value;
    if (nombreInput == null || nombreInput == "") {
        return alert("No has ingresado nada")
    }
   else{
    var task = {
        nombre: nombreInput,
        tachado: false,
        FechaCreacion: new Date(),
        FechaEliminacion: null
    };
    arrayTask.push(task);
    actualizarTabla();
}
}

function actualizarTabla() {
    const tableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];

    tableBody.innerHTML = ''; 

    arrayTask.forEach(task => {
        const row = tableBody.insertRow();
        const nombreCell = row.insertCell(0);
        const fechaCCell = row.insertCell(1);
        const fechaECell = row.insertCell(2);
        const hechoCell = row.insertCell(3);

        nombreCell.innerText = task.nombre;
        fechaCCell.innerText = task.FechaCreacion.toLocaleString();
        fechaECell.innerText = task.FechaEliminacion ? task.FechaEliminacion.toLocaleString() : '';
        hechoCell.innerHTML = '<button type="button" onclick="hecho(' + arrayTask.indexOf(task) + ')">Hecho</button>';

        
        if (task.tachado) {
            nombreCell.style.color = 'red';
            fechaCCell.style.color = 'red';
            fechaECell.style.color = 'red';
            hechoCell.style.color = 'red';
            nombreCell.style.textDecoration = 'line-through';
            fechaCCell.style.textDecoration = 'line-through';
            fechaECell.style.textDecoration = 'line-through';
            hechoCell.style.textDecoration = 'line-through';
        }
    

        
        if (task.FechaEliminacion != null) {
            var tiempo = task.FechaEliminacion.getTime() - task.FechaCreacion.getTime();
            console.log("se elimino en " + tiempo + "" + task.nombre);
            rapido(tiempo, task.nombre);
        }
});
}

function hecho(task) {
    arrayTask[task].tachado = true;
    arrayTask[task].FechaEliminacion = new Date();
    actualizarTabla();
}


function rapido(tiempo, nombre) {
if (tiempo < masRapido) {
    masRapido = tiempo
    nombreRapido = nombre
}
}

function alertaRapido(nombreRapido) {
    if (nombreRapido !== '') {
        alert('La tarea más rápida en completarse fue: ' + nombreRapido);
    } else {
        alert('No hay tareas completadas aún.');
    }
}

 