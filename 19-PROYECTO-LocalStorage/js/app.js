//Variables
const formulario = document.querySelector('#formulario');
const tweets = document.querySelector('#lista-tweets');

let listaTweets = [];

eventListeners();
//EventListeners
function eventListeners(){
    formulario.addEventListener('submit', agregarTweet );
    document.addEventListener('DOMContentLoaded', () =>{
        listaTweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}



//Funciones
function agregarTweet(e){
    e.preventDefault();

    const contenido = document.querySelector('#tweet').value;
    
    if(contenido === ''){
        mensajeError('Escriba un tweet válido');
        return;
    }

    const tweet = {
        id: Date.now(),
        tweet:contenido 
    }

    listaTweets = [...listaTweets, tweet];

    crearHTML();

    formulario.reset();
}

function mensajeError(mensaje){

    const tweet = document.createElement('p');
    tweet.textContent = mensaje;
    tweet.classList.add('error');

    formulario.appendChild(tweet);

    setTimeout(()=>{
        tweet.remove();
    }, 2000)

}

function crearHTML(){
    limpiarHTML();
    if(listaTweets.length > 0){
        listaTweets.forEach(tweet =>{
            
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';
            
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }
            
            const li = document.createElement('li');
            li.textContent = tweet.tweet;
            li.appendChild(btnEliminar);

            tweets.appendChild(li);
        });
    }
    sincronizarStorage();

}
function borrarTweet(id){
    listaTweets = listaTweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(listaTweets));
}

function limpiarHTML(){
    while(tweets.firstChild){
        tweets.removeChild(tweets.firstChild);
    }
}