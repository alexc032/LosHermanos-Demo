import React from 'react';
import { MouseEvent } from 'react';

interface HeaderProps {
  isScrolled: boolean;
  isNavOpen: boolean;
  setIsNavOpen: (open: boolean) => void;
  activeSection: string;
  smoothScrollTo: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, isNavOpen, setIsNavOpen, activeSection, smoothScrollTo }) => {
  return (
    <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-container">
            <a href="#" className="nav-logo" onClick={(e) => smoothScrollTo(e, '#inicio')}>
                <img src="/LosHermanos.png" alt="Logo Los Hermanos" className="logo-image" style={{ maxHeight: '50px', width: 'auto', marginRight: '10px' }} />
                <span className="logo-text">Taquizas <span className="logo-accent">El Hermano</span></span>
            </a>
            <ul className={`nav-links ${isNavOpen ? 'open' : ''}`}>
                <li><a href="#inicio" className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`} onClick={(e) => smoothScrollTo(e, '#inicio')}>Inicio</a></li>
                <li><a href="#testimonios" className={`nav-link ${activeSection === 'testimonios' ? 'active' : ''}`} onClick={(e) => smoothScrollTo(e, '#testimonios')}>Testimonios</a></li>
                <li><a href="#contacto" className={`nav-link nav-cta ${activeSection === 'contacto' ? 'active' : ''}`} onClick={(e) => smoothScrollTo(e, '#contacto')}>¡Cotiza Ahora!</a></li>
            </ul>
            <button className={`nav-toggle ${isNavOpen ? 'active' : ''}`} id="navToggle" onClick={() => {
              setIsNavOpen(!isNavOpen);
              document.body.style.overflow = !isNavOpen ? 'hidden' : '';
            }}>
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
  );
};

export default Header;
