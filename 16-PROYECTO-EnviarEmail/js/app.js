document.addEventListener('DOMContentLoaded', ()=>{

 const inputEmail = document.querySelector('#email');
 const inputAsunto = document.querySelector('#asunto');
 const inputMensaje = document.querySelector('#mensaje');
 const inputCC = document.querySelector('#cc');
 const btnEnviar = document.querySelector('#botones button[type="submit"]');
 const btnReset = document.querySelector('#botones button[type="reset"]')
 const formulario = document.querySelector('#formulario');
 const spinner = document.querySelector('#spinner');

 const email = {
    email: '',
    cc: '',
    asunto: '',
    mensaje: '',
    
 }

 inputEmail.addEventListener('input', validar);
 inputAsunto.addEventListener('input', validar);
 inputMensaje.addEventListener('input', validar);
 inputCC.addEventListener('input', validar);

 formulario.addEventListener('submit', enviarEmail);

 btnReset.addEventListener('click', function(e){
    e.preventDefault();
   reiniciarFormulario();
 });

 function enviarEmail(e){
    e.preventDefault();
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(()=>{
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');
        
        reiniciarFormulario();

        //Crear una alerta
        const alertaExito = document.createElement('p');
        alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sm', 'uppercase');
        alertaExito.textContent = 'Mensaje enviado';
        //Insertar en el HTML
        formulario.appendChild(alertaExito);

        setTimeout(() => {
            alertaExito.remove();
        }, 2000);
    },2000);    
 }
 
 function validar(e){
    
    if(e.target.id !== 'cc' && e.target.value.trim() === ''){
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        email[e.target.name] = '';
        validarFormulario();
        return;
    }
    if(e.target.id === 'email' && !validarEmail(e.target.value)){
        mostrarAlerta(`El email no es válido`, e.target.parentElement);
        email[e.target.name] = '';
        validarFormulario();
        return;
    }
    if(e.target.id === 'cc' && !validarEmail(e.target.value)){
        mostrarAlerta(`El email no es válido`, e.target.parentElement);
        email[e.target.name] = '';
        validarFormulario();
        return;
    }
    eliminarAlerta(e.target.parentElement);
    email[e.target.name] = e.target.value.trim().toLowerCase();
    validarFormulario();
    
 }

 function mostrarAlerta(mensaje, referencia){
    eliminarAlerta(referencia)
    //construir html
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'text-center', 'p-2');
    //insertar en html
    referencia.appendChild(error);
 }

 function eliminarAlerta(referencia){
    const alerta = referencia.querySelector('.bg-red-600');
    if(alerta){
        alerta.remove();
    }
 }

 function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
 }

 function validarFormulario(){
   const forms = Object.values(email).filter((campo, indice) => indice !== 1);
    if(forms.includes('')){
        btnEnviar.classList.add('opacity-50');
        btnEnviar.disabled = true;
        return;
    }
    btnEnviar.classList.remove('opacity-50');
    btnEnviar.disabled = false;
 }

 function reiniciarFormulario(){
    email.email= '';
    email.cc='';
    email.asunto= '';
    email.mensaje= '';
    formulario.reset();
    validarFormulario();
 }


})