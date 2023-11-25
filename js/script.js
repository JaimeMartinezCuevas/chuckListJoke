const fetchJokeButton = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const clearAllButton = document.getElementById('clearAll');


// Al cargar la página, se muestran los chistes almacenados
    cargarChistesDesdeLocalStorage()


// Al hacer clic, obtenemos un chiste con la función obtenerChiste()
fetchJokeButton.addEventListener('click', () => {
    obtenerChiste()
});


// La función obtenerChiste() fae el fetch, que contiene la función añadirChiste,
// que ye lo que realmente recoge el chiste (data.value)
function obtenerChiste() {
    fetch('https://api.chucknorris.io/jokes/random')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Texto error 1')
        }
        return response.json()
    })
    .then((data) => {
        añadirChiste(data.value)
    })
    .catch((error) => {
        console.log('Texto error 2')
    })
}

// Una vez que hemos ficimos que el chiste (data value) se recoge por esta función,
// le decimos que debe crear un li, cuyo texto sea el parámetro 'chiste',
// (el parámetro chiste de esta función hace referencia a data.value)
// y lo añadimos finalmente a jokeList con .appendChild, y le ponemos la etiqueta 'nuevo chiste'
function añadirChiste(chiste) {
    const nuevoChiste = document.createElement('li')
    nuevoChiste.textContent = chiste
    jokeList.appendChild(nuevoChiste)

    // También invocamos esta función para que lo guarde en el local
    guardarEnLocalStorage(chiste)
}

// Dicha función crea una constante 'chistes', que ye un array (obtenerChistesLocalStorage, definido a continuación)
//luego fae un push a la lista de chistes y se introduce con set item en el local store como 'chistes' nuevamente
function guardarEnLocalStorage(chiste) {
    const chistes = obtenerChistesLocalStorage() || [];//Si no se han cargado chistes puede dar error, así que se le añade el operador lógicu
    chistes.push(chiste);
    localStorage.setItem('chistes', JSON.stringify(chistes));
}

// Obtener chistes local storage emplea un JSON,parse para convertir los textos en objetos
//que se obtienen del local storage 
function obtenerChistesLocalStorage() {
    return JSON.parse(localStorage.getItem('chistes'))
}

function cargarChistesDesdeLocalStorage() {

    const chistes = obtenerChistesLocalStorage() || [];
        chistes.forEach((chiste) => {
            añadirChiste(chiste);
        });
    }

// Simplemente se vacía la UL de los chistes y se eliminan los valores de chistes del local storage
function limpiarJokes() {
    jokeList.innerHTML = ''; // Limpiar el contenido del <ul>
    localStorage.removeItem('chistes'); // Limpiar localStorage
}

// Se ejecuta la función de antes limpiar Jokes para borrar todos los chistes
clearAllButton.addEventListener('click', () => {
    limpiarJokes()
});

//Resumen: primero se hace click en el botón que activa obtenerChiste. ObtenerChiste pasa pola API de chistes ->
//El fetch pasa por la API y activa añadirChiste para añadir el chiste random a la jokeList como un li de ul ->
//Una vez pasado a la lista, se almacena en el local storage con guardarEnLocalStorage ->
//guardarEnLocalStorage transforma todo en objeto y obtenerChistesLocalStorage repasa todos los chistes ->
//Por último se añaden los botones para limpiar el storage y la UL