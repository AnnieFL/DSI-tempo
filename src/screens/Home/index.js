import { useState } from "react";
import moment from "moment";

import './styles.css'
import { searchForCoordenates } from '../../api/get'
import Simbolos from "../../components/simbolos";


export default function Home() {
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [tempo, setTempo] = useState([]);


    return (
        <div>
            <h1 className="tempoTitulo">VER O TEMPO</h1>
            <div className="tempoForm">
                <input
                    className="tempoInput"
                    value={cidade}
                    onChange={(e) => setCidade(e.currentTarget.value)} />
                <input
                    className="tempoInput"
                    value={estado}
                    onChange={(e) => setEstado(e.currentTarget.value)} />
                <button
                    className="tempoButton"
                    onClick={async () => estado && cidade ? setTempo(await searchForCoordenates(cidade, estado)) : {}}>Ver o tempo</button>
            </div>

            {tempo[0] &&
                <>
                    {tempo[0].main &&
                        <div className="tempoLista">
                            <table>
                                <tr>
                                    <td colSpan={2} className="tempoInfo">Tempo</td>
                                    <td className="tempoInfo">Temperatura</td>
                                    <td className="tempoInfo">Sensação Term</td>
                                    <td className="tempoInfo">Temp Mínima</td>
                                    <td className="tempoInfo">Temp Máxima</td>
                                    <td className="tempoInfo">Umidade</td>
                                    <td colSpan={2} className="tempoInfo">Hora e Data</td>
                                </tr>
                                {tempo.filter((e) => moment(e.dt_txt).isBetween(moment().subtract(), moment().add(3, 'days'), 'days', '[)')).map((e) => {
                                    return (
                                        <tr className="text-left">
                                            <Simbolos
                                                descricao={e.weather[0].description}
                                                tempo={moment(e.dt_txt).format('HH')}
                                            />
                                            <td className="tempoInfo">
                                                {e.main.temp}°C
                                                {e.main.temp < 15 && <span>❄️</span>}
                                                {e.main.temp > 15 && e.main.temp < 30 && <span>🌡️</span>}
                                                {e.main.temp > 30 && <span>🔥</span>}
                                            </td>
                                            <td className="tempoInfo">
                                                {e.main.feels_like}°C
                                                {e.main.feels_like < 15 && <span>❄️</span>}
                                                {e.main.feels_like > 15 && e.main.temp < 30 && <span>🌡️</span>}
                                                {e.main.feels_like > 30 && <span>🔥</span>}
                                            </td>
                                            <td className="tempoInfo">
                                                {e.main.temp_min}°C
                                                {e.main.temp_min < 15 && <span>❄️</span>}
                                                {e.main.temp_min > 15 && e.main.temp < 30 && <span>🌡️</span>}
                                                {e.main.temp_min > 30 && <span>🔥</span>}
                                            </td>
                                            <td className="tempoInfo">
                                                {e.main.temp_max}°C
                                                {e.main.temp_max < 15 && <span>❄️</span>}
                                                {e.main.temp_max > 15 && e.main.temp < 30 && <span>🌡️</span>}
                                                {e.main.temp_max > 30 && <span>🔥</span>}
                                            </td>
                                            <td className="tempoInfo">
                                                {e.main.humidity}%
                                            </td>
                                            <td className="tempoInfo">
                                                {moment(e.dt_txt).format('HH:mm')}
                                            </td>
                                            <td className="tempoInfo text-right">
                                                {moment(e.dt_txt).format('DD/MM/YYYY')}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    }
                    {!tempo[0].main &&
                        <h2 className="tempoTitulo">{tempo}</h2>
                    }
                </>
            }
        </div>
    );
}