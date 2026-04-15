import React, { RefObject, MouseEvent } from 'react';

interface HeroProps {
  particlesContainerRef: RefObject<HTMLDivElement | null>;
  heroImageRef: RefObject<HTMLDivElement | null>;
  smoothScrollTo: (e: MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ particlesContainerRef, heroImageRef, smoothScrollTo }) => {
  return (
    <section id="inicio" className="hero">
        <div className="hero-bg-overlay"></div>
        <div className="hero-particles" ref={particlesContainerRef}></div>
        <div className="hero-content">
            <p className="hero-subtitle" data-animate="fade-up">🔥 Auténtico sabor mexicano</p>
            <h1 className="hero-title" data-animate="fade-up" data-delay="200">
                <span className="title-line">Tacos &amp;</span>
                <span className="title-line title-accent">Taquizas</span>
                <span className="title-line title-script">para tu evento</span>
            </h1>
            <p className="hero-description" data-animate="fade-up" data-delay="400">
                Llevamos el auténtico sabor de México a tu fiesta. Ingredientes frescos,
                recetas tradicionales y la mejor sazón para eventos inolvidables.
            </p>
            <div className="hero-buttons" data-animate="fade-up" data-delay="600">
                <a href="#contacto" className="btn btn-primary" onClick={(e) => smoothScrollTo(e, '#contacto')}>
                    <span>Cotizar Taquiza</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </div>
        </div>
        <div className="hero-image-wrapper" ref={heroImageRef} data-animate="fade-left">
            <div className="hero-image-glow"></div>
            <img src="/LosHermanos.png" alt="Delicioso taco al pastor" className="hero-image" loading="eager" />
        </div>
        <div className="hero-scroll-indicator">
            <span>Descubre más</span>
            <div className="scroll-arrow"></div>
        </div>
    </section>
  );
};

export default Hero;
