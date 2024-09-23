//Variables y Selectores


//Eventos

//Funciones
eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

function preguntarPresupuesto(){

    const presupuestoUsuario = prompt('Ingresa tu presupuesto');

    if(presupuestoUsuario === null || presupuestoUsuario === '' || isNaN(presupuestoUsuario) || presupuesto >=0){3

        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    
    ui.insertarPresupuesto(presupuesto);
}
//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos = [];
    }
}
let presupuesto;

class UI{
    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
        }
}
const ui = new UI();