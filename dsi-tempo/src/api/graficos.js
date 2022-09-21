import { API_MONGO } from "./config";
import axios from 'axios';

const saveDados = async (body) => {
    const dadosSalvos = await axios.get(
        `${API_MONGO}`
    ).then(
        async res => {
            if (res.data) {
                return res.data
            } else {
                return "ERRO"
            }
        },
        async err => {
            alert(`Erro no banco: ${JSON.stringify(err)}`)

        }
    )

    if (dadosSalvos.find((e) => e.data == body.data && e.cidade == body.cidade)) {
        return;
    }
    
    return await axios.post(
        `${API_MONGO}`, {...body}
    ).then(
        async res => {
        },
        async err => {
            alert(`Erro no banco: ${JSON.stringify(err)}`)

        }
    )
}

const getDados = async(cidade) => {
    return await axios.get(
        `${API_MONGO}`
    ).then(
        async res => {
            if (res.data) {
                const dados = res.data.filter((e) => e.cidade == cidade)

                return dados;
            } else {
                return "ERRO"
            }
        },
        async err => {
            alert(`Erro no banco: ${JSON.stringify(err)}`)

        }
    )
}

export { saveDados, getDados }