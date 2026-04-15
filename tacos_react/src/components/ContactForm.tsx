import React, { useState } from 'react';
import { createPedido, NuevoPedido } from '../services/pedidoService';

interface FormData {
  name: string;
  email: string;
  phone: string;
  event: string;
  guests: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success';

const EMPTY_FORM: FormData = { name: '', email: '', phone: '', event: '', guests: '', message: '' };

// ─── Componente: solo HTML y lógica de estado ──────────────────────────────
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormStatus('sending');

    const payload: NuevoPedido = {
      nombre_cliente: formData.name,
      correo: formData.email,
      descripcion: `Tel: ${formData.phone} | Evento: ${formData.event} | Personas: ${formData.guests} | Mensaje: ${formData.message}`,
    };

    try {
      await createPedido(payload);
      setFormStatus('success');
      setFormData(EMPTY_FORM);
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch {
      alert('Hubo un error al enviar. Verifica tu conexión con el servidor.');
      setFormStatus('idle');
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <section id="contacto" className="contact">
        <div className="container">
            <div className="contact-grid">
                <div className="contact-info" data-animate="fade-right">
                    <span className="section-tag">Contáctanos</span>
                    <h2 className="section-title">¡Hagamos tu evento <span className="text-gradient">inolvidable</span>!</h2>
                    <p className="contact-description">
                        Cuéntanos sobre tu evento y te preparamos una cotización personalizada.
                    </p>
                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="contact-icon">📞</div>
                            <div><h4>Teléfono</h4><p>123456789</p></div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">📧</div>
                            <div><h4>Email</h4><p>LosHermanos@gmail.com</p></div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">📍</div>
                            <div><h4>Ubicación</h4><p>Coatzacoalcos, Veracruz</p></div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">⏰</div>
                            <div><h4>Horario</h4><p>Sabado-Domingo - 1:00 PM a 7:00 PM</p></div>
                        </div>
                    </div>
                </div>
                <div className="contact-form-wrapper" data-animate="fade-left">
                    <form className="contact-form" onSubmit={handleFormSubmit}>
                        <h3 className="form-title">Solicita tu cotización</h3>
                        <div className="form-group">
                            <input type="text" id="formName" name="name" placeholder="Tu nombre" value={formData.name} onChange={handleChange} required />
                            <label htmlFor="formName">Nombre</label>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="email" id="formEmail" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
                                <label htmlFor="formEmail">Email</label>
                            </div>
                            <div className="form-group">
                                <input type="tel" id="formPhone" name="phone" placeholder="(55) 1234-5678" value={formData.phone} onChange={handleChange} required />
                                <label htmlFor="formPhone">Teléfono</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <select id="formEvent" name="event" value={formData.event} onChange={handleChange} required>
                                    <option value="" disabled>Tipo de evento</option>
                                    <option value="boda">Boda</option>
                                    <option value="cumpleanos">Cumpleaños</option>
                                    <option value="corporativo">Corporativo</option>
                                    <option value="bautizo">Bautizo</option>
                                    <option value="graduacion">Graduación</option>
                                    <option value="otro">Otro</option>
                                </select>
                                <label htmlFor="formEvent">Evento</label>
                            </div>
                            <div className="form-group">
                                <input type="number" id="formGuests" name="guests" placeholder="50" min="10" value={formData.guests} onChange={handleChange} required />
                                <label htmlFor="formGuests">No. de personas</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea id="formMessage" name="message" rows={4} placeholder="Cuéntanos sobre tu evento..." value={formData.message} onChange={handleChange}></textarea>
                            <label htmlFor="formMessage">Mensaje</label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-full"
                          disabled={formStatus === 'sending'}
                          style={formStatus === 'success' ? { background: 'linear-gradient(135deg, #2ecc71, #27ae60)' } : {}}
                        >
                            {formStatus === 'idle' && (
                              <>
                                <span>Enviar Cotización</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                              </>
                            )}
                            {formStatus === 'sending' && <span>Enviando...</span>}
                            {formStatus === 'success' && <span>✓ ¡Enviado con éxito!</span>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
};

export default ContactForm;
