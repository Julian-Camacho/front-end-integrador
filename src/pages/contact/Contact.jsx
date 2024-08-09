import './Contact.css'

export default function Contact(){
    return(
        <div className="contact-container">
            <section className="main-contact">
                <div className="contact-form-wrapper">
                    <form className="form-container" action="https://formsubmit.co/nicolasmacchioli@gmail.com" method="POST">
                        <h2>¡Contáctanos!</h2>
                        <div className="input-group">
                            <label htmlFor="fullname">Nombre completo:</label>
                            <input type="text" name="fullname" id="fullname" placeholder="Ingrese su nombre" minLength="7" maxLength="150"/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" name="email" id="email" placeholder="Ingrese su email" minLength="7" maxLength="150" pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="message">Mensaje:</label>
                            <textarea name="message" id="message" rows="6" placeholder="Ingrese su mensaje aquí" required minLength="20" maxLength="500"></textarea>
                        </div>
                        <button type="submit" className="form-button">
                            Enviar
                        </button>
                    </form>
                </div>
                <div className="contact-map-wrapper">
                    <h2>¿Dónde nos encontramos?</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.774389646576!2d-58.5231694!3d-34.50860350000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb0ee292497e9%3A0xf9a611e58747f528!2sUnicenter%20Shopping!5e0!3m2!1sen!2sar!4v1718847659085!5m2!1sen!2sar" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
        </div>
    )
}