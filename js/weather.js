import API_CONFIG from './config.js';
import { DEFAULT_UNIT, UNITS } from './constants.js';

export async function obtenerClimaActual(ciudad) {

    try {
        const url = `${API_CONFIG.WEATHER_BASE_URL}${'weather'}?q=${ciudad}&appid=${API_CONFIG.WEATHER_API_KEY}&units=${UNITS}&lang=es`;

        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
    }
    catch (error){
        console.error('Error al obtener el clima: ',error)
        throw new Error('No se pudo obtener el clima');

    }
}

export async function obtenerPronostico(ciudad) {

    const url = `${API_CONFIG.WEATHER_BASE_URL}forecast?q=${ciudad}&appid=${API_CONFIG.WEATHER_API_KEY}&units=${DEFAULT_UNIT}&lang=es&cnt=40`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
    }
    catch (error) {
        console.error('Error al obtener pronóstico: ',error);
        throw new Error('No se pudo obtener el pronóstico');
    }

}
