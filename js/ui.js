import { MESSAGES } from './constants.js';

export function mostrarCargando(contenedorId){
    const contenedor = document.getElementById(contenedorId);

    contenedor.innerHTML = `
    <p class="loading">${MESSAGES.LOADING}</p>
    `;
}
export function mostrarError(contenedorId, mensaje){
    const contenedor = document.getElementById(contenedorId);

    contenedor.innerHTML = `
    <p class="error">${mensaje}</p>
    `
}

export function mostrarClimaActual(datos){
    //extraccion de datos
    const ciudad = datos.name;
    const temperatura = Math.round(datos.main.temp);
    const sensacion = Math.round(datos.main.feels_like);
    const descripcion = datos.weather[0].description;
    const humedad = datos.main.humidity;
    const viento = datos.wind.speed;
    const iconoUrl = `https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png`;

    const contenedor = document.getElementById('current-weather');
    contenedor.innerHTML = `
    <div class="weather-card">
        <h3>${ciudad}</h3>
        <div class="weather-main">
            <img src="${iconoUrl}" alt="${descripcion}">
            <div class="temperature">${temperatura}°C</div>
        </div>
        <p class="description">${descripcion}</p>
        <div class="weather-details">
            <p>Sensación: ${sensacion}°C</p>
            <p>Humedad: ${humedad}%</p>
            <p>Viento: ${viento} m/s</p>
        </div>
    </div>`;

}

export function mostrarPronostico(datos){
    const contenedor = document.getElementById('forecast');

    let tarjetasHTML = '';

    for (let i = 0; i < 40; i+= 8){
        const dia = datos.list[i];
        const fecha = new Date(dia.dt * 1000);
        const nombreDia = fecha.toLocaleDateString('es-ES', {weekday: 'short'});
        const temperatura = Math.round(dia.main.temp);
        const descripcion = dia.weather[0].description;
        const iconoUrl = `https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`;
        tarjetasHTML += `
        <div class="forecast-card">
            <p class="day">${nombreDia}</p>
            <img src="${iconoUrl}" alt="${descripcion}">
            <p class="temp">${temperatura}°C</p>
            <p class="desc">${descripcion}</p>
        </div>
        `;

    } 
    contenedor.innerHTML = tarjetasHTML;
}

export function mostrarNoticias(datos) {
    const contenedor = document.getElementById('news-container');
    let noticiasHTML = '';
    
    datos.articles.forEach(noticia => {

        const titulo = noticia.title;
        const descripcion = noticia.description;
        const url = noticia.url;
        const imagenUrl = noticia.urlToImage;

        if (!titulo || !url) return;

        noticiasHTML += `
        <article class="news-card">
            ${imagenUrl ? `<img src="${imagenUrl}" alt="${titulo}">` : ''}
            <div class="news-content">
                <h3>${titulo}</h3>
                <p>${descripcion || 'Sin descripción disponible'}</p>
                <a href="${url}" target="_blank" rel="noopener noreferrer">Leer más</a>
            </div>
        </article>
        `;
    });   
    contenedor.innerHTML = noticiasHTML;
}