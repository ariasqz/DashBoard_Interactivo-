import { mostrarClimaActual, mostrarPronostico, mostrarNoticias, mostrarCargando, mostrarError } from "./ui.js";
import { obtenerPronostico, obtenerClimaActual } from "./weather.js";
import { obtenerNoticias } from "./news.js";
import { MESSAGES } from "./constants.js";

async function buscarClima(){

    const ciudadInput = document.getElementById('city-input')
    const ciudad = ciudadInput.value.trim();

    if (ciudad === ''){
        mostrarError('current-weather',MESSAGES.NO_CITY);
        mostrarError('forecast',MESSAGES.NO_CITY);
        return;
    }
    mostrarCargando('current-weather');
    mostrarCargando('forecast');

    try {
        const datosClima = await obtenerClimaActual(ciudad);
        const datosPronostico = await obtenerPronostico(ciudad);
        
        mostrarClimaActual(datosClima);
        mostrarPronostico(datosPronostico);
    } catch (error){
        console.error('Error', error);
        mostrarError('current-weather',MESSAGES.ERROR_WEATHER);
        mostrarError('forecast',MESSAGES.ERROR_WEATHER);
    }
}

async function cargarNoticias(categoria) {
    mostrarCargando('news-container');

    try {
        const datoNoticia = await obtenerNoticias(categoria);
        mostrarNoticias(datoNoticia);
    }catch (error){
        console.error('Error', error);
        mostrarError('news-container', MESSAGES.ERROR_NEWS);
    }
}

function inicializarEventos() {
    const botonBuscar = document.getElementById('search-btn');
    botonBuscar.addEventListener('click', buscarClima);
    
    const inputCiudad = document.getElementById("city-input");
    inputCiudad.addEventListener('keypress',(evento) => {
        if (evento.key === 'Enter'){
            buscarClima();
        }
    });

    const botonesCategorias = document.querySelectorAll('.filter-btn');
    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.dataset.category;
            botonesCategorias.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');
            cargarNoticias(categoria);
        })
    })

}
function inicializar() {
    inicializarEventos();
    cargarNoticias('general');
}

document.addEventListener('DOMContentLoaded', inicializar);