document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, {
      duration: 2000,
      interval: 6000
    });

    var instance = M.Slider.getInstance(elem);
    instance.pause();
});

const db = firebase.firestore();

const onGetTask = (callback) => db.collection("tareas").onSnapshot(callback);




      /*
      if (tarea.usuario == nombreUsuario) {
        document.getElementById("contenido-calendario").innerHTML += `      <div class="row">
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
      }*/
      
      /*fecha[0] = parseInt(fecha[0]);
      fecha[1] = parseInt(fecha[1]);
      fecha[2] = parseInt(fecha[2]);
      
      fecha.sort(function(a,b) {
        if (a[3]>b[3]) {
          return 1
        }
      })
      fechas.push(fecha);*/
      
      
      /*
    fechas = fechas.sort((a, b) => {
      if (a.getFullYear() == b.getFullYear()) {
        if(a.getMonth() > b.getMonth()) {
          return 1;
        } else {
          if (a.getMonth() < b.getMonth()) {
            return -1;
          } else {
              return 0;
          }
        }
      }
    });

    fechas = fechas.sort((a, b) => {
      if (a.getFullYear() == b.getFullYear() && a.getMonth() && b.getMonth()) {
        if(a.getDay() > b.getDay()) {
          return 1;
        } else {
          if (a.getDay() < b.getDay()) {
            return -1;
          } else {
              return 0;
          }
        }
      }
    });*/


