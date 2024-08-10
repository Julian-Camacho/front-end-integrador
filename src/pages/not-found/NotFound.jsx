import './NotFound.css'

export default function NotFound(){
    return(
        <div className="not-found">
            <div className="container">
                <div className="img">
                    <img src="https://github.com/Julian-Camacho/404_page_not_found/blob/main/resources/scarecrow.png?raw=true" alt="scarecrow" />
                </div>
                <div className="info">
                    <h2>Tenemos malas noticias</h2>
                    <p>La página a la que quieres acceder está actualmente inaccesible.</p>
                    <a href="/">
                        <button>Regresar</button>
                    </a>
                </div>
            </div>
        </div>
    )
}