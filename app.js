/*const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaDulces = document.querySelector("#lista-dulces");
let articulosCarrito = [];



cargarEventListeners();

function cargarEventListeners(){
  listaDulces.addEventListener("click", agregarDulce);
}


function agregarDulce(e){
    e.preventDefault(); 

      if(e.target.classList.constains('agregar-carrito')){
        const dulceSeleccionado = e.target.parentElement.parentElement;
        leerDatosDulces(dulceSeleccionado);
      }
}

function leerDatosDulces(dulce){
  //console.log(dulce);

  const infoDulce = {
    imagen: dulce.querySelector('img').src,
    titulo: dulce.querySelector('h4').textContent,
    precio: dulce.querySelector('.precio span').textContent,
    id: dulce.querySelector('a').getAttribute('data-id'),
    cantidad: 1 
}



const existe = articulosCarrito.some ( dulce => dulce.id === infoDulce.id);
  if (existe){
    const dulces = articulosCarrito.map(dulce => {
      if ( dulce.id === infoDulce.id ) {
        dulce.cantidad++;
        return dulce;
      } else {
        return dulce;
      }
    } );
    articulosCarrito = [...dulce]; 
}  else {
    articulosCarrito = [...articulosCarrito,infoDulce];
  }

  console.log(articulosCarrito);



    console.log(articulosCarrito);
    carritoHTML();
}




function carritoHTML(){

  limpiarHTML();


  articulosCarrito.forEach( dulce => {
    const {imagen, titulo, precio, cantidad, id}= dulce;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td> 
        ${titulo}
      </td>
      <td> 
        ${precio}
      </td>
      <td> 
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-dulce" data-id"${dulce.id}"> X </a>
      </td>
    `;

    contenedorCarrito.appendChild(row);
  });

}

function limpiarHTML(){
  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}
*/

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners() {
  
    listaCursos.addEventListener('click', agregarCurso);


    carrito.addEventListener('click', eliminarCurso);


    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);



    document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
          
          carritoHTML();
    });
}



function agregarCurso(e) {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          
          leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
    }


    if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
              if( curso.id === infoCurso.id ) {
                    let cantidad = parseInt(curso.cantidad);
                    cantidad++
                    curso.cantidad =  cantidad;
                    return curso;
              } else {
                    return curso;
              }
          })
          articulosCarrito = [...cursos];
    }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito)

    


    carritoHTML();
}


function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso') ) {
          const curso = e.target.parentElement.parentElement;
          const cursoId = curso.querySelector('a').getAttribute('data-id');
          

          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
    }
}


function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>  
                    <img src="${curso.imagen}" width=100>
              </td>
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td>${curso.cantidad} </td>
              <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
              </td>
          `;
          contenedorCarrito.appendChild(row);
    });


    sincronizarStorage();

}



function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


function vaciarCarrito() {

    while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

