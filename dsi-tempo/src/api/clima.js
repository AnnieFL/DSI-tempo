import { API_KEY, API_GEO, API_WEATHER, DEFAULT_COUNTRY, DEFAULT_LANG, DEFAULT_UNIT } from "./config";
import axios from 'axios';
import moment from 'moment';
import {saveDados} from './graficos'

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
            const dados = res.data;
            console.log(dados);

            const data = moment(dados.list.find((e) => moment(e.dt_txt).isAfter(moment())).dt_txt).format('YYYY-MM-DD');
            const temperatura = dados.list.find((e) => moment(e.dt_txt).isAfter(moment())).main.temp;
            const cidade = dados.city.name;
            const sensacaoTermica = dados.list.find((e) => moment(e.dt_txt).isAfter(moment())).main.feels_like;
            const umidade = dados.list.find((e) => moment(e.dt_txt).isAfter(moment())).main.humidity;
            const tempo = dados.list.find((e) => moment(e.dt_txt).isAfter(moment())).weather[0].description;
            
            await saveDados({data, temperatura, cidade, sensacaoTermica, umidade, tempo});


            if (res.data) {
                return res.data;
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