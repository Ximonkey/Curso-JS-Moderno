//variables
const resultado = document.querySelector('#resultado');

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
    marca: '',
    year: '',
    min:'',
    max:'',
    puertas:'',
    transmision:'',
    color:''
}

//eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
    llenarSelect();
})

//EventListener
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})
year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
})
maximo.addEventListener('change', e =>{
    datosBusqueda.max = e.target.value;
    filtrarAuto();
})
minimo.addEventListener('change', e =>{
    datosBusqueda.min = e.target.value;
    filtrarAuto();
})
puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})
transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})
color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})


//funciones
function mostrarAutos(autos){
   
    limpiarHTML();
    
    autos.forEach(auto =>{
    const {marca, modelo, year, precio, puertas, color, transmision } = auto;
    const autoHTML = document.createElement('p');
    autoHTML.textContent = `
        ${marca} ${modelo} *${year}* $${precio} ${puertas} puertas *${color}* ${transmision}
    `;
    resultado.appendChild(autoHTML);
    });
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect(){
    for(let i = max; i >= min; i--){
        console.log(i);
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
        
    }
}

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo)
    .filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    
    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}
function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('p');
    noResultado.textContent = 'No hay resultados para la búsqueda.'

    resultado.appendChild(noResultado);
}
function filtrarMarca(auto){
    const{marca}=datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}
function filtrarYear(auto){
    const{year}=datosBusqueda;
    if(year){
        return auto.year === year;
    }
    return auto;
}
function filtrarMinimo(auto){
    const{min}=datosBusqueda;
    if(min){
        return auto.precio >= min;
    }
    return auto;
}
function filtrarMaximo(auto){
    const{max}=datosBusqueda;
    if(max){
        return auto.precio <= max;
    }
    return auto;
}
function filtrarPuertas(auto){
    const{puertas}=datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}
function filtrarTransmision(auto){
    const{transmision}=datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto){
    const{color}=datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}