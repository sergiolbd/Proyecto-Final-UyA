const añadirTareaForm = document.getElementById("rellenar-tarea");
const listarTareasForm = document.getElementById("listar-tareas");

añadirTareaForm.addEventListener("submit", async (e) => {
    document.getElementById("nombre-usuario-listar").value = "";
    e.preventDefault();
    var nombreUsuario = añadirTareaForm["nombre-usuario"].value;
    var tituloTarea = añadirTareaForm["tarea"].value;
    var descripcion = añadirTareaForm["descripcion-tarea"].value;
    var fecha = añadirTareaForm["fecha"].value;

    const fechaAux = fecha.split("-")
    fechaAux.reverse();
    fecha = fechaAux.join("/");

    await crearTarea(nombreUsuario, tituloTarea, descripcion, fecha);
});

listarTareasForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var nombreUsuario = listarTareasForm["nombre-usuario-listar"].value;

  listarTareas(nombreUsuario);
});


function crearTarea(nombreUsuario, tituloTarea, descripcion, fecha) {
    db.collection("tareas").doc().set({
        usuario: nombreUsuario,
        tarea: tituloTarea,
        descripcion: descripcion,
        fecha: fecha
    })

    alert("Tarea añadida correctamente")
}

async function listarTareas(nombreUsuario) {  
  onGetTask((querySnapshot) => {
    document.getElementById("tareas-salida").innerHTML = '';
    let checkIsUser = false;

    querySnapshot.forEach(doc => {
      const tarea = doc.data();
      tarea.id = doc.id;
  
      if (tarea.usuario == nombreUsuario) {
        document.getElementById("tareas-salida").innerHTML += `      <div class="row">
        <div id="tareas-salida">
          <div id="tareas-tool">
            <div class="card">
              <div class="card-content">
                <span card="card-title"><b>${tarea.tarea} - ${tarea.fecha}</b></span>
                <p>${tarea.descripcion}</p>
              </div>
              <div class="card-action">
                <button type="submit" id="btn-crear-nota" class="btn btn-delete" data-id="${tarea.id}"><i class="material-icons">check_box</i> Completar Tarea</button>
              </div>
            </div>
          </div>
        </div>`;

  
        const btnsDelete = document.querySelectorAll('.btn-delete');
        btnsDelete.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            console.log()
            await borrarTarea(e.target.dataset.id);
          })
        })
        checkIsUser = true;
      }
    });
       /**Añadir estilo */
       if (!checkIsUser) {
        document.getElementById("tareas-salida").innerHTML += `
        <div id="error-lista">
          <span> Error: Nombre usuario="${nombreUsuario}" no registrado o sin tareas </span>
        </div>`;
      }
  });

}

function borrarTarea(id){
  db.collection('tareas').doc(id).delete();
}