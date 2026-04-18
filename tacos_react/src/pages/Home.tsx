import { useEffect, useRef, useState } from 'react';
import '../index.css';

// Component Imports
import Header from '../components/Header';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

function App() {
  // --- Global States ---
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // --- Refs for UI Effects ---
  const trackRef = useRef(null);
  const heroImageRef = useRef(null);
  const particlesContainerRef = useRef(null);

  const totalSlides = 3;

  // -- Global UI Effects (Preloader, Scroll, Animations) --

  useEffect(() => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    const timer = setTimeout(() => {
      if (preloader) {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
      }
      initScrollReveal();
    }, 1200);

    // 2. Scroll & Active Section Listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY + 120;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // 3. Hero Particles Animation
    const container = particlesContainerRef.current;
    if (!container) return;
    const createParticle = () => {
      if (!container) return;
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 4 + 2;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;background:hsl(${Math.random()>0.5?25:45},90%,55%);animation-duration:${Math.random()*8+6}s;animation-delay:${Math.random()*4}s;box-shadow:0 0 ${size*2}px hsl(25,90%,55%);position:absolute;border-radius:50%;opacity:0;animation-name:particle-float;animation-timing-function:linear;animation-iteration-count:infinite;`;
      container.appendChild(p);
      setTimeout(() => container.contains(p) && p.remove(), 12000);
    };
    const interval = setInterval(createParticle, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 4. Counter & Stat Animations
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            entry.target.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // 5. Hero Image Tilt Effect
    const heroImg = heroImageRef.current;
    if (!heroImg) return;
    const move = (e) => {
      const r = heroImg.getBoundingClientRect();
      heroImg.style.transform = `perspective(800px) rotateY(${((e.clientX-r.left)/r.width-0.5)*8}deg) rotateX(${((e.clientY-r.top)/r.height-0.5)*-8}deg)`;
    };
    const reset = () => { heroImg.style.transform = 'perspective(800px) rotateY(0) rotateX(0)'; heroImg.style.transition = 'transform 0.5s ease'; };
    heroImg.addEventListener('mousemove', move);
    heroImg.addEventListener('mouseleave', reset);
    return () => { heroImg.removeEventListener('mousemove', move); heroImg.removeEventListener('mouseleave', reset); };
  }, []);

  // -- Helper Functions --

  const initScrollReveal = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  };

  const smoothScrollTo = (e, targetId) => {
    e.preventDefault();
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    setIsNavOpen(false);
    document.body.style.overflow = '';
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${index * 100}%)`;
  };

  return (
    <>
      {/* 1. Global Preloader */}
      <div id="preloader">
          <div className="loader">
              <img src="/LosHermanos.png" alt="Logo Los Hermanos" className="loader-icon" style={{ maxHeight: '50px', width: 'auto', marginRight: '10px' }} />
              <p className="loader-text">Preparando el sabor...</p>
          </div>
      </div>

      {/* 2. Modular Components */}
      <Header 
        isScrolled={isScrolled} 
        isNavOpen={isNavOpen} 
        setIsNavOpen={setIsNavOpen} 
        activeSection={activeSection} 
        smoothScrollTo={smoothScrollTo} 
      />

      <main>
        <Hero 
          particlesContainerRef={particlesContainerRef} 
          heroImageRef={heroImageRef} 
          smoothScrollTo={smoothScrollTo} 
        />
        
        <Testimonials 
          trackRef={trackRef} 
          currentSlide={currentSlide} 
          totalSlides={totalSlides} 
          goToSlide={goToSlide} 
        />
        
        <ContactForm />
      </main>

      <Footer 
        smoothScrollTo={smoothScrollTo} 
      />
    </>
  );
}

export default App;
