const listarCalendarioForm = document.getElementById("listar-calendario");

listarCalendarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var nombreUsuario = listarCalendarioForm["nombre-usuario-listar"].value;
  await listarCalendario(nombreUsuario);
});

function listarCalendario(nombreUsuario) {
  onGetTask((querySnapshot) => {
    const tareasAMostrar = [];
    document.getElementById("contenido-calendario").innerHTML = '';

    let checkIsUser = false;

    querySnapshot.forEach(doc => {
      const tarea = doc.data();
      
      if (nombreUsuario == tarea.usuario) {
        tareasAMostrar.push(tarea);
        checkIsUser = true;
      }
    });

    if (!checkIsUser) {
      document.getElementById("listar-calendario").innerHTML += `
      <div id="tareas-salida">
        <span> Error ${nombreUsuario} sin tareas </span>
      </div>`;
    }

    let fechas = [];
    tareasAMostrar.forEach((tarea) => {
      const fecha = tarea.fecha.split("/");

      fechas.push(new Date(parseInt(fecha[2]), parseInt(fecha[1]-1), parseInt(fecha[0])));
    })

    

    
    fechas = fechas.sort((a, b) => {
      if(Math.floor((a-b)*0.00000001574) > 0) {
        return 1;
      } else {
        if (Math.floor((a-b)*0.00000001574) < 0) {
          return -1;
        } else {
            return 0;
        }
      }
    });
    

    let fechaSalida = []
    fechas.forEach((fecha) => {
      let year = fecha.getFullYear();

      let month = (1 + fecha.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      let day = fecha.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      
      fechaSalida.push(day + '/' + month + '/' + year);    
    });

    fechaSalida = fechaSalida.filter((item, index) => fechaSalida.indexOf(item) === index);

    let contadores = [];
    const tareasAMostrarOrdenadas = [];
    fechaSalida.forEach((fecha) => {
      let contadorAux = 0;
      tareasAMostrar.forEach((tarea) => {
        if (fecha == tarea.fecha) {
          contadorAux++;
          tareasAMostrarOrdenadas.push(tarea);
        }
      })
      contadores.push(contadorAux);
    })

    let tarea = 0;
    for (let i = 0; i < fechaSalida.length; i++) {
      document.getElementById("contenido-calendario").innerHTML += `      <div id="tareas-dias">
        <h2 id="dias"><b>${fechaSalida[i]}</b></h2>
          <ul id="lista-tareas${i}">
          </ul>
        </div>`;
      
      for (let j = 0; j < contadores[i]; j++) {
        document.getElementById(`lista-tareas${i}`).innerHTML += `        <li id = "titulo_tarea"><b>• ${tareasAMostrarOrdenadas[tarea].tarea}</b></li>
        <p id = "descripcion_tarea">${tareasAMostrarOrdenadas[tarea].descripcion}</p>`;
        tarea++;
      }
    }
  });
}