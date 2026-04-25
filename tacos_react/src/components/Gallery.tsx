import React, { useState, useEffect, useCallback } from 'react';

// ─── Media catalogue (all files live in /public) ──────────────────────────
interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumb?: string; // used only for videos (poster frame)
  caption: string;
  category: 'taquiza' | 'platillos' | 'video';
}

const MEDIA: MediaItem[] = [
  { id: 1,  type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.37 PM.jpeg',   caption: 'Taquiza en evento familiar' ,       category: 'taquiza'   },
  { id: 2,  type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.37 PM (1).jpeg', caption: 'Tacos al pastor recién servidos',    category: 'platillos' },
  { id: 3,  type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.37 PM (2).jpeg', caption: 'Variedad de guisados',               category: 'platillos' },
  { id: 4,  type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.37 PM (3).jpeg', caption: 'Montaje completo en celebración',    category: 'taquiza'   },
  { id: 5,  type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.37 PM (4).jpeg', caption: 'Tortillas calientitas a mano',       category: 'platillos' },
  { id: 6,  type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.38 PM.jpeg',     caption: 'Cocinando en vivo para tu evento', category: 'taquiza'   },
  { id: 7,  type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.41 PM.jpeg',     caption: 'Salsas artesanales y acompañamientos', category: 'platillos' },
  { id: 8,  type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.41 PM (1).jpeg', caption: 'Preparación del trompo al pastor',  category: 'taquiza'   },
  { id: 9,  type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.41 PM (2).jpeg', caption: 'Tacos servidos con estilo',          category: 'platillos' },
  { id: 10, type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.41 PM (3).jpeg', caption: 'Evento corporativo exitoso',         category: 'taquiza'   },
  { id: 11, type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.41 PM (4).jpeg', caption: 'Fiesta de quince años',              category: 'taquiza'   },
  { id: 12, type: 'image', src: '/WhatsApp Image 2026-04-15 at 6.32.41 PM (5).jpeg', caption: 'Tacos de birria estilo Jalisco',     category: 'platillos' },
  { id: 13, type: 'video', src: '/WhatsApp Video 2026-04-15 at 6.32.37 PM.mp4',     caption: 'Taquero en acción – Trompo al pastor', category: 'video'  },
  { id: 14, type: 'video', src: '/WhatsApp Video 2026-04-15 at 6.32.38 PM.mp4',     caption: 'Ambiente de la taquiza en evento',     category: 'video'  },
];

type Filter = 'all' | 'taquiza' | 'platillos' | 'video';

const FILTER_LABELS: Record<Filter, string> = {
  all:      'Todo',
  taquiza:  'Taquizas',
  platillos:'Platillos',
  video:    'Videos',
};

// ─── Component ─────────────────────────────────────────────────────────────
const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const filtered = filter === 'all'
    ? MEDIA
    : MEDIA.filter(m => m.category === filter);

  // ── Lightbox helpers ─────────────────────────────────────────────────────
  const openLightbox = (item: MediaItem) => {
    const idx = filtered.findIndex(m => m.id === item.id);
    setLightboxIndex(idx);
    setLightbox(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = '';
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    setLightboxIndex(prev => {
      const next = (prev + dir + filtered.length) % filtered.length;
      setLightbox(filtered[next]);
      return next;
    });
  }, [filtered]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowRight')  navigate(1);
      if (e.key === 'ArrowLeft')   navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, navigate, closeLightbox]);

  return (
    <>
      {/* ── Gallery Section ─────────────────────────────────────────── */}
      <section id="galeria" className="gallery-section">
        {/* Decorative top border */}
        <div className="gallery-top-line"></div>

        <div className="container">
          {/* Header */}
          <div className="section-header" data-animate="fade-up">
            <span className="section-tag">Nuestro Trabajo</span>
            <h2 className="section-title">
              Momentos que <span className="text-gradient">saben a México</span>
            </h2>
            <p className="section-subtitle">
              Cada taquiza es una experiencia única. Aquí te mostramos algunos de
              los eventos que hemos tenido el gusto de animar.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="gallery-filters" data-animate="fade-up" data-delay="100">
            {(Object.keys(FILTER_LABELS) as Filter[]).map(f => (
              <button
                key={f}
                id={`gallery-filter-${f}`}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid" data-animate="fade-up" data-delay="200">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="gallery-card"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => openLightbox(item)}
                role="button"
                tabIndex={0}
                aria-label={`Ver ${item.caption}`}
                onKeyDown={e => e.key === 'Enter' && openLightbox(item)}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="gallery-thumb"
                    loading="lazy"
                  />
                ) : (
                  <div className="gallery-video-thumb">
                    <video
                      src={item.src}
                      className="gallery-thumb"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="gallery-play-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="gallery-card-overlay">
                  <span className="gallery-card-icon">
                  </span>
                </div>

                {item.type === 'video' && (
                  <span className="gallery-video-badge">VIDEO</span>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="gallery-cta" data-animate="fade-up" data-delay="400">
            <p className="gallery-cta-text">
              ¿Listo para que tu evento sea el próximo en nuestra galería?
            </p>
            <a
              href="#contacto"
              className="btn btn-primary"
              onClick={e => {
                e.preventDefault();
                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>¡Cotiza tu Taquiza!</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="gallery-lightbox"
          onClick={e => e.target === e.currentTarget && closeLightbox()}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada"
        >
          {/* Close */}
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Cerrar"
            id="lightbox-close-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="lightbox-nav lightbox-prev"
            onClick={() => navigate(-1)}
            aria-label="Anterior"
            id="lightbox-prev-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Media */}
          <div className="lightbox-content">
            {lightbox.type === 'image' ? (
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="lightbox-media"
              />
            ) : (
              <video
                src={lightbox.src}
                className="lightbox-media"
                controls
                autoPlay
                playsInline
                key={lightbox.src}
              />
            )}
            <span className="lightbox-counter">
              {lightboxIndex + 1} / {filtered.length}
            </span>
          </div>

          {/* Next */}
          <button
            className="lightbox-nav lightbox-next"
            onClick={() => navigate(1)}
            aria-label="Siguiente"
            id="lightbox-next-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
