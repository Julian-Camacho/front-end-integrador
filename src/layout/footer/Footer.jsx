import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faInstagram, faSquareFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Logo from "../../assets/Fondos/logo.png";

export default function Footer() {
    return (
        <footer className="main-footer">
            <section className="footer-section footer-brand">
                <a href="/"><img src= {Logo} className="footer-logo" alt="Logo"/></a>
            </section>
            <section className="footer-section footer-social">
                <a className="footer-social-link" href="https://www.instagram.com/" target="_blank"><FontAwesomeIcon icon={faInstagram} size='2xl' /></a>
                <a className="footer-social-link" href="https://es-la.facebook.com/login/device-based/regular/login/" target="_blank"><FontAwesomeIcon icon={faSquareFacebook} size="2xl" /></a>
                <a className="footer-social-link" href="https://www.whatsapp.com/?lang=es_LA" target="_blank"><FontAwesomeIcon icon={faWhatsapp} size="2xl" /></a>
                <a className="footer-social-link" href="https://mail.google.com/mail/u/0/#inbox" target="_blank"><FontAwesomeIcon icon={faEnvelope} size="2xl" /></a>
            </section>
            <section className="footer-section footer-contact">
                <label className="newsletter">¡Suscribete al Newsletter!</label>
                <div className="suscribe">
                    <input className="email" type="email" />
                    <button className="btn-newsletter" type="submit"> <FontAwesomeIcon icon={faPaperPlane} /> </button>
                </div>
            </section>
        </footer>
    )
}