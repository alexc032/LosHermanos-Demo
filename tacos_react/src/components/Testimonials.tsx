import React, { RefObject } from 'react';

interface TestimonialsProps {
  trackRef: RefObject<HTMLDivElement | null>;
  currentSlide: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ trackRef, currentSlide, totalSlides, goToSlide }) => {
  return (
    <section id="testimonios" className="testimonials">
        <div className="container">
            <div className="section-header" data-animate="fade-up">
                <span className="section-tag">Testimonios</span>
                <h2 className="section-title">Lo que dicen nuestros <span className="text-gradient">clientes</span></h2>
            </div>

            <div className="testimonials-slider" data-animate="fade-up" data-delay="200">
                <div className="testimonial-track" ref={trackRef}>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p className="testimonial-text">"¡Los mejores tacos que hemos probado! Contratamos la taquiza para nuestra boda y todos los invitados quedaron encantados. El servicio fue impecable."</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">MR</div>
                            <div>
                                <h4>María Rodríguez</h4>
                                <p>Boda - Diciembre 2025</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p className="testimonial-text">"Excelente relación calidad-precio. La carne estaba increíble y las salsas artesanales le dieron un toque especial. ¡100% recomendados!"</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">CG</div>
                            <div>
                                <h4>Carlos García</h4>
                                <p>Evento corporativo - Enero 2026</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p className="testimonial-text">"Pedimos el paquete VIP para el cumpleaños de mi abuelita y fue todo un éxito. Los taqueros son profesionales y muy amables. ¡Repetiremos seguro!"</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">AL</div>
                            <div>
                                <h4>Ana López</h4>
                                <p>Cumpleaños - Febrero 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="testimonial-controls">
                    <button className="testimonial-btn" aria-label="Anterior" onClick={() => goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </button>
                    <div className="testimonial-dots">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className={`testimonial-dot ${currentSlide === i ? 'active' : ''}`} onClick={() => goToSlide(i)}></div>
                      ))}
                    </div>
                    <button className="testimonial-btn" aria-label="Siguiente" onClick={() => goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Testimonials;
