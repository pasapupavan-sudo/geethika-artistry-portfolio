import { artworks, createArtworkCard } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initGallery();
    initLightbox();
    initAnimations();
    initNavbar();
});

function initPreloader() {
    const preloader = document.querySelector('.preloader');

    // Simulate loading time or wait for window load
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('loaded');
                // Allow scroll after load
                document.body.style.overflow = 'auto';
            }
        }, 1200);
    });
}

/* Custom Cursor */
function initCursor() {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    let clientX = -100;
    let clientY = -100;

    document.addEventListener('mousemove', (e) => {
        clientX = e.clientX;
        clientY = e.clientY;
    });

    const render = () => {
        cursor.style.left = `${clientX}px`;
        cursor.style.top = `${clientY}px`;
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Hover effects
    const addHoverListeners = () => {
        const hoverables = document.querySelectorAll('a, button, .artwork-card');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    };

    // Initial and delayed to catch dynamic elements
    addHoverListeners();
    setTimeout(addHoverListeners, 1000);
}

function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    // Render cards
    const galleryHTML = artworks.map(art => createArtworkCard(art)).join('');
    galleryGrid.innerHTML = galleryHTML;
}

/* Animations (Scroll Reveal & Parallax) */
function initAnimations() {
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe text elements
    document.querySelectorAll('h1, h2, p').forEach(el => {
        el.classList.add('reveal-text');
        observer.observe(el);
    });

    // Parallax Logic
    const parallaxImages = document.querySelectorAll('.parallax-img');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                parallaxImages.forEach(img => {
                    const speed = 0.1;
                    const rect = img.closest('.artwork-card').getBoundingClientRect();

                    // Only animate if in view
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const offset = (window.innerHeight - rect.top) * speed * -1;
                        img.style.transform = `translateY(${offset}px)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!lightbox) return;

    // Open Lightbox
    document.getElementById('gallery-grid')?.addEventListener('click', (e) => {
        const card = e.target.closest('.artwork-card');
        if (card) {
            const id = parseInt(card.dataset.id);
            const art = artworks.find(a => a.id === id);

            if (art) {
                lightboxImg.src = art.image;
                lightboxCaption.innerHTML = `
                    <h3 class="artwork-title" style="margin-bottom:0.5rem; color:#fff">${art.title}</h3>
                    <p class="artwork-medium">${art.medium}, ${art.year}</p>
                 `;
                lightbox.classList.add('active');
            }
        }
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightboxImg.src = '';
        }, 500);
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

function initNavbar() {
    // Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Toggle body scroll
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Smooth Scroll & Close Menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);

            // Close mobile menu if open
            if (menuBtn && navLinks && navLinks.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
