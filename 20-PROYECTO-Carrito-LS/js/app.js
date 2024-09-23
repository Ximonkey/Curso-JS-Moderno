//Variables
const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventsListeners();

function cargarEventsListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    } );
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML();
    }
}

function leerDatosCurso(curso){
    const datoscurso = {
        imagen: curso.querySelector('.imagen-curso').src,
        titulo: curso.querySelector('h4').textContent,
        autor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    const existe = articulosCarrito.some( curso => curso.id === datoscurso.id );
    if(existe){
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === datoscurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito=[...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, datoscurso];
    }

   carritoHTML();
}

function carritoHTML(){
    limpiarHTML();

    articulosCarrito.forEach( curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;
        listaCarrito.appendChild(row);
    });

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    
}

function limpiarHTML(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}