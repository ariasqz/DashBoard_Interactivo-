import API_CONFIG from "./config.js";
import { NEWS_LIMIT, NEWS_COUNTRY} from "./constants.js";

export async function obtenerNoticias(categoria){

    try {
        const url = `${API_CONFIG.NEWS_BASE_URL}top-headlines?category=${categoria}&lang=es&country=${NEWS_COUNTRY}&max=${NEWS_LIMIT}&apikey=${API_CONFIG.NEWS_API_KEY}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos;
    }

    catch (error) {
        console.error('Error al obtener noticias:',error);
        throw new Error('No se pudieron obtener noticias');
    }

}
