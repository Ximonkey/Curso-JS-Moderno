//Selectores
const inputMascota = document.querySelector('#mascota');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');

const listaCitas = document.querySelector('#citas');

const formulario = document.querySelector('#nueva-cita');
formulario.addEventListener('submit', generarCita);

const formularioInput = document.querySelector('#nueva-cita button');

let editando = false;

eventListeners();
function eventListeners() {
    inputMascota.addEventListener('change', datosCita);
    inputPropietario.addEventListener('change', datosCita);
    inputTelefono.addEventListener('change', datosCita);
    inputFecha.addEventListener('change', datosCita);
    inputHora.addEventListener('change', datosCita);
    inputSintomas.addEventListener('change', datosCita);
}

const objCita = {
    id: generarId(),
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

class AdminCitas {
    constructor() {
        this.citas = [];
    }
    agregar(cita) {
        this.citas = [...this.citas, cita];
        this.mostrar();
    }
    eliminar(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
        this.mostrar();
    }
    mostrar() {
        while (listaCitas.firstChild) {
            listaCitas.removeChild(listaCitas.firstChild);
        }

        this.citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas } = cita;
            const divCitas = document.createElement('div');
            divCitas.classList.add('m-5', 'bh-light', 'shadow-md', 'px-5', 'pg-10', 'rounded-xl');

            const infoPaciente = document.createElement('p');
            infoPaciente.classList.add('font-normal', 'mb-3', 'text-gray-700');
            infoPaciente.innerHTML = `<span class="font-bold uppercase"> Paciente: </span> ${mascota}`;
            const infoPropietario = document.createElement('p');
            infoPropietario.classList.add('font-normal', 'mb-3', 'text-gray-700');
            infoPropietario.innerHTML = `<span class="font-bold uppercase"> Propietario: </span> ${propietario}`;
            const infoTelefono = document.createElement('p');
            infoTelefono.classList.add('font-normal', 'mb-3', 'text-gray-700');
            infoTelefono.innerHTML = `<span class="font-bold uppercase"> Telefono: </span> ${telefono}`;
            const infoFecha = document.createElement('p');
            infoFecha.classList.add('font-normal', 'mb-3', 'text-gray-700');
            infoFecha.innerHTML = `<span class="font-bold uppercase"> Fecha: </span> ${fecha}`;
            const infoHora = document.createElement('p');
            infoHora.classList.add('font-normal', 'mb-3', 'text-gray-700');
            infoHora.innerHTML = `<span class="font-bold uppercase"> Hora: </span> ${hora}`;
            const infoSintomas = document.createElement('p');
            infoSintomas.classList.add('font-normal', 'mb-3', 'text-gray-700');
            infoSintomas.innerHTML = `<span class="font-bold uppercase"> Sintomas: </span> ${sintomas}`;

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            const clone = structuredClone(cita);
            btnEditar.onclick = () => {
                cargarEdicion(clone);
                console.log(clone);
            }
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            btnEliminar.onclick = () => {
                this.eliminar(cita.id);
            }

            divCitas.appendChild(infoPaciente);
            divCitas.appendChild(infoPropietario);
            divCitas.appendChild(infoTelefono);
            divCitas.appendChild(infoFecha);
            divCitas.appendChild(infoHora);
            divCitas.appendChild(infoSintomas);
            divCitas.appendChild(btnEditar);
            divCitas.appendChild(btnEliminar);

            listaCitas.appendChild(divCitas);
        });
    }
    editar(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        this.mostrar();
    }
}

class Notificacion {
    constructor({ mensaje, tipo }) {
        this.mensaje = mensaje;
        this.tipo = tipo;
        this.mostrar();
    }
    mostrar() {
        const divNotificacion = document.createElement('div');
        divNotificacion.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');
        const notificacionPrevia = document.querySelector('.alert');
        notificacionPrevia?.remove();
        this.tipo === 'error' ? divNotificacion.classList.add('bg-danger') : divNotificacion.classList.add('bg-success');
        divNotificacion.textContent = this.mensaje;
        formulario.appendChild(divNotificacion);
        setTimeout(() => {
            divNotificacion.remove();
        }, 2000);
    }
}

const citas = new AdminCitas();

function datosCita(e) {
    e.preventDefault();
    objCita[e.target.name] = e.target.value;
}

function generarCita(e) {
    e.preventDefault();
    if (Object.values(objCita).some(valor => valor.trim() === '')) {
        new Notificacion({
            mensaje: 'Todos los campos son obligatorios',
            tipo: 'error'
        });
        return;
    }
    if (editando) {
        citas.editar({ ...objCita });
        new Notificacion({
            mensaje: 'Cita editada con éxito',
            tipo: 'exito'
        });
    } else {
        citas.agregar({ ...objCita });
        new Notificacion({
            mensaje: 'Paciente añadido con éxito',
            tipo: 'exito'
        });
    }
    formulario.reset();
    reiniciarObjetoCita();
    formularioInput.textContent = 'Crear Cita';
    editando = false;
}

function reiniciarObjetoCita() {
    Object.assign(objCita, {
        id: generarId(),
        mascota: '',
        propietario: '',
        telefono: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })
}

function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

function cargarEdicion(cita) {
    Object.assign(objCita, cita)
    inputMascota.value = cita.paciente
    inputPropietario.value = cita.propietario
    inputTelefono.value = cita.telefono
    inputFecha.value = cita.fecha
    inputHora.value = cita.hora
    inputSintomas.value = cita.sintomas

    editando = true;
    formularioInput.textContent = 'Guardar Cambios';
}