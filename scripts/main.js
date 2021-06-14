document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, {
      duration: 2000,
      interval: 8000,
    });

    // var instance = M.Slider.getInstance(document.querySelectorAll('.slider'));
    // instance.pause();
});

var boton = 0;

const db = firebase.firestore();

const onGetTask = (callback) => db.collection("tareas").onSnapshot(callback);

function pararTransicion() {
  var elem = document.querySelector(".slider");
  var instance = M.Slider.getInstance(elem);
  instance.pause();

  if (boton == 0) {
    document.getElementById('botonTransicion').innerHTML = '<i class="material-icons">play_arrow</i>';
    instance.pause();
    boton = 1;
  } else {
    document.getElementById('botonTransicion').innerHTML = '<i class="material-icons">pause</i>';
    instance.start();
    boton = 0;
  }
}

function izqTransicion() {
  var elem = document.querySelector(".slider");
  var instance = M.Slider.getInstance(elem);
  instance.prev();
}

function derTransicion() {
  var elem = document.querySelector(".slider");
  var instance = M.Slider.getInstance(elem);
  instance.next();
}

function redirigir(enlace) {
  window.location.href = enlace;
} 