import './AboutUs.css'

export default function AboutUs(){
    return(
        <div className="about-us">
            <div className="perfil">
                <img className='perfil-img' src="https://imgur.com/OyTz80z.jpg" alt="Julián Camacho" />
                <h2 className='perfil-name' >Julián Camacho</h2>
            </div>
            <div className="about">
                <h2>¿Quiénes somos?</h2>
                <p>
                    Soy un estudiante de Ingeniería Informática en la UBA. Estoy cursando el Bootcamp de Full Stack en EducaciónIT.
                </p>
                <p>
                    En nuestra empresa, nos dedicamos a diseñar y fabricar ropa que combina estilo, comodidad y sostenibilidad. Cada pieza es creada con materiales de alta calidad y con un enfoque en la responsabilidad ambiental. Creemos en la moda como una forma de expresión personal y nos esforzamos por ofrecer colecciones que se adapten a la vida moderna sin comprometer la ética ni el medio ambiente. Nuestro compromiso es brindar a nuestros clientes una experiencia de compra excepcional, con diseños exclusivos y un servicio al cliente inigualable.
                </p>
                <h2>¿Dónde estamos?</h2>
                <p>
                    Nos encontramos en la ciudad de Buenos Aires, en la calle Av. Siempre Viva 123.
                </p>
            </div>
        </div>
    )
}