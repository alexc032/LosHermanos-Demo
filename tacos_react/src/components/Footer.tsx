import React, { MouseEvent } from 'react';

interface FooterProps {
  smoothScrollTo: (e: MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ smoothScrollTo }) => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-brand">
                    <a href="#" className="nav-logo" onClick={(e) => smoothScrollTo(e, '#inicio')}>
                        <span className="logo-icon">🌮</span>
                        <span className="logo-text">Taquizas <span className="logo-accent">Los Hermanos</span></span>
                    </a>
                    <p>Llevamos el auténtico sabor de México a tu evento. Calidad, tradición y sazón en cada taco.</p>
                </div>
                <div className="footer-links">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="#inicio" onClick={(e) => smoothScrollTo(e, '#inicio')}>Inicio</a></li>
                        <li><a href="#contacto" onClick={(e) => smoothScrollTo(e, '#contacto')}>Contacto</a></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h4>Servicios</h4>
                    <ul>
                        <li><a href="#">Taquizas para bodas</a></li>
                        <li><a href="#">Eventos corporativos</a></li>
                        <li><a href="#">Fiestas privadas</a></li>
                        <li><a href="#">Catering empresarial</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 El Sabor Mexicano. Todos los derechos reservados.</p>
                <p>Hecho con ❤️ y mucho chile 🌶️</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
