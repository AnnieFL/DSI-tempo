import { API_KEY, API_GEO, API_WEATHER, DEFAULT_COUNTRY, DEFAULT_LANG, DEFAULT_UNIT } from "./config";
import axios from 'axios';

const searchForCoordenates = async (cidade) => {
    return await axios.get(
        `${API_GEO}?q=${cidade},${DEFAULT_COUNTRY}&appid=${API_KEY}`
    ).then(
        async res => {
            if (res.data[0]) {
                const lat = res.data[0].lat;
                const lon = res.data[0].lon;

                return await searchForWeather(lat, lon);
            } else {
                return "ERRO: CIDADE INVÁLIDA"
            }
        },
        async err => {
            alert(`Erro no banco: ${JSON.stringify(err)}`)

        }
    )
}

const searchForWeather = async (lat, lon) => {
    return await axios.get(
        `${API_WEATHER}?lat=${lat}&lon=${lon}&lang=${DEFAULT_LANG}&units=${DEFAULT_UNIT}&appid=${API_KEY}`
    ).then(
        async res => {
            if (res.data) {
                return res.data.list;
            } else {
                alert(`Erro de consulta: ${JSON.stringify(res)}`)
            }
        },
        async err => {
            alert(`Erro no banco: ${JSON.stringify(err)}`)

        }
    )
}

export { searchForCoordenates }