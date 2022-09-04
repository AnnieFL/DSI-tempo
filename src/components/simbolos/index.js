export default function Simbolos(props) {

    return (
        <>
            {props.descricao.includes('nublado') &&
                <>
                    <td className="tempoInfo">
                        <span >{props.descricao}</span>
                    </td>
                    <td className="tempoInfo">
                        <span>☁️</span>
                    </td>
                </>
            }
            {props.descricao.includes('chuva') &&
                <>
                    <td className="tempoInfo">
                        <span>{props.descricao}</span>
                    </td>
                    <td className="tempoInfo">
                        <span>🌧️</span>
                    </td>
                </>
            }
            {!props.descricao.includes('chuva') && !props.descricao.includes('nublado') &&
                <>
                    {(props.tempo > 18 || props.tempo < 6) &&
                        <>
                            <td className="tempoInfo">
                                <span>{props.descricao}</span>
                            </td>
                            <td className="tempoInfo">
                                <span>🌙</span>
                            </td>
                        </>
                    }
                    {props.tempo >= 6 && props.tempo <= 18 &&
                        <>
                            <td className="tempoInfo">
                                <span >{props.descricao}</span>
                            </td>
                            <td className="tempoInfo">
                                <span>☀️</span>
                            </td>
                        </>
                    }
                </>
            }
        </>
    );
}