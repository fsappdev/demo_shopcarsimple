//variables
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

//funciones
//leer datos curso.
const leerDatosCurso = (curso) => {
  //console.log(curso);
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
  };
  insertarCarrito(infoCurso);
};

//func que añade el curso al cart
const comprarcurso = (e) => {
  e.preventDefault();
  //delegation para agregar-carrito
  if (e.target.classList.contains("agregar-carrito")) {
    //console.log("si");
    const curso = e.target.parentElement.parentElement;
    //enviamos el curso seleccionado para tomar sus datos
    leerDatosCurso(curso);
  }
};

//eliminar curso del carrito del DOM
const eliminarCurso = (e) => {
  e.preventDefault();
  let curso, cursoId;
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector("a").getAttribute("data-id");
    //console.log(cursoId);
  }
  eliminarCursoLS(cursoId);
};

//muestra el curso selec. en el carrito
const insertarCarrito = (curso) => {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>
         <img src="${curso.imagen}" width=100; >
      </td>
      <td>
         ${curso.titulo}
      </td>
      <td>
         ${curso.precio}
      </td>
      <td>
         <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
      </td>
   `;
  listaCursos.appendChild(row);
  ///aqui se inserta al localstorage
  guardarCursoLocalStorage(curso);
};

//vaciar el carrito en el DOM
const vaciarCarrito = () => {
  //FORMA LENTA
  //listaCursos.innerHTML = ''
  //recomendada y rapida
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }

  //vaciar el localstorage
  localStorage.clear();
  return false;
};

//insertar en el localstorage
const guardarCursoLocalStorage = (curso) => {
  let cursos = obtenerCursosLocalStorage();
  console.log(cursos);
  //se agrega al arreglo
  cursos.push(curso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
};

//comprueba que haya cursos almacenados en localStorage
const obtenerCursosLocalStorage = () => {
  let cursosLS;
  if (localStorage.getItem("cursos") === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }
  return cursosLS;
};

//leer el LOCAL STORAGE
const leerLocalStorage = () => {
  cursosLS = obtenerCursosLocalStorage();
  //console.log(cursosLS);
  cursosLS.map((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
     <td>
         <img src="${curso.imagen}" width=100; >
      </td>
      <td>
         ${curso.titulo}
      </td>
      <td>
         ${curso.precio}
      </td>
      <td>
         <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
      </td>
     `;
    listaCursos.appendChild(row);
  });
};

//eliminar curso de LS
const eliminarCursoLS = (cursoId) => {
  //console.log(cursoId);
  let cursosLS = obtenerCursosLocalStorage();
  /* console.log(cursosLS); */
  const index = cursosLS.findIndex((curso) => curso.id === cursoId);
  //console.log(index);
  /* cursosLS.map((curso) => {
    if (curso.id === cursoId) {
      //cursosLS.splice(cursoId, 1);
      console.log(cursosLS.indexOf(curso));
      //console.log("found");
      return;
    }
    //console.log(cursosLS.indexOf(curso));
  }); */
  //console.log(cursosLS);
  cursosLS.splice(index, 1);
  /* console.log(cursosLS); */
  localStorage.setItem("cursos", JSON.stringify(cursosLS));
};
////listeners
const cargarEventListeners = () => {
  //se inicia al clickear en agregar carrito
  cursos.addEventListener("click", comprarcurso);
  //eliminar un curso del carrito
  carrito.addEventListener("click", eliminarCurso);
  //vaciasr el carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  //al cargar el dom mostrar LS
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
};

cargarEventListeners();
