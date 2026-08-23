import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    function initSiteLogic() {
      try {

function initTheme() {
    const savedTheme = localStorage.getItem('qxchat-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if (savedTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
    }
}
initTheme();

const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
} as any);

if (typeof window !== 'undefined') {
  (window as any).lenis = lenis;
}

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader && typeof gsap !== 'undefined') {
    gsap.set('.reveal-text, .reveal-text-delay', { opacity: 0, y: 30 });
    gsap.to(preloader, {
      opacity: 0, duration: 0.8, ease: "power3.inOut", delay: 0.2,
      onComplete: () => { (preloader as HTMLElement).style.display = 'none'; }
    });
    gsap.utils.toArray('.reveal-text').forEach((el: any, index: number) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 + (index * 0.1) });
    });
    gsap.utils.toArray('.reveal-text-delay').forEach((el: any, index: number) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1, delay: 0.6 + (index * 0.1), ease: 'power3.out' });
    });
  } else if (preloader) {
    (preloader as HTMLElement).style.display = 'none';
  }
});

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links') as HTMLElement;
const mobileOverlay = document.querySelector('.mobile-nav-overlay') as HTMLElement;

function closeMobileNav() {
  if (navLinks) navLinks.classList.remove('active');
  if (navToggle) navToggle.classList.remove('active');
  if (mobileOverlay) mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('active');
    if (isOpen) {
      closeMobileNav();
    } else {
      navLinks.classList.add('active');
      navToggle.classList.add('active');
      if (mobileOverlay) mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
}
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

const scrollTopWrapper = document.querySelector('.scroll-top-wrapper');
if (scrollTopWrapper) {
  scrollTopWrapper.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  });
}

if (typeof (window as any).ScrollTrigger !== 'undefined') {
  gsap.registerPlugin((window as any).ScrollTrigger);
  lenis.on('scroll', (window as any).ScrollTrigger.update);
  gsap.ticker.add((time: number) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0, 0);

  gsap.utils.toArray('.bento-item').forEach((el: any) => {
    if (!el.classList.contains('reveal-text-delay')) {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: el, start: 'top 85%', toggleActions: 'play none none none'
          }
        }
      );
    }
  });
}

      } catch(e) { console.error('[QxChat Site Logic]', e); }
    }

    ;(window as any).initSiteLogic = initSiteLogic;
    initSiteLogic();
  });
});
