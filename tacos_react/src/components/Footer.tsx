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
                        <img src="/LosHermanos.png" alt="Logo Los Hermanos" className="logo-image" style={{ maxHeight: '50px', width: 'auto', marginRight: '10px' }} />
                        <span className="logo-text">Taquizas <span className="logo-accent">El Hermano</span></span>
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
        </div>
    </footer>
  );
};

export default Footer;
