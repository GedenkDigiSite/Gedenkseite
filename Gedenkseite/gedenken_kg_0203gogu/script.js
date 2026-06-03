document.addEventListener("DOMContentLoaded", () => {
  // 1. SCROLL-ANIMATION FÜR DIE ZEITLEISTE
  const timelineItems = document.querySelectorAll(".timeline-item");
  const observerOptions = { root: null, threshold: 0.1, rootMargin: "0px 0px -80px 0px" };
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        timelineObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  timelineItems.forEach(item => timelineObserver.observe(item));

  // 2. LIGHTBOX BEI KLICK AUF DEN HINTERGRUND SCHLIESSEN
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target.id === 'lightbox' || e.target.classList.contains('close-btn')) {
        closeLightbox();
      }
    });
  }

  // 3. TASTATUR-SUPPORT FÜR DIE BILDERGALERIE (Enter-Taste)
  const galleryImages = document.querySelectorAll('.gallery img');
  galleryImages.forEach(img => {
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { openLightbox(img.src); }
    });
  });

  // 4. HIERHER VERSCHOBEN: MOBIL-MENÜ STEUERUNG
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('nav-active');
      menuToggle.classList.toggle('toggle-active');
      
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }
});

// LIGHTBOX ÖFFNEN (Eigenständige Funktion)
function openLightbox(imageSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox && lightboxImg) {
    lightboxImg.src = imageSrc;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

// LIGHTBOX SCHLIESSEN (Eigenständige Funktion)
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 400);
  }
}

// Hilfsfunktion für Menü-Links (Bleibt außerhalb)
function closeMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navMenu && navMenu.classList.contains('nav-active')) {
    navMenu.classList.remove('nav-active');
    menuToggle.classList.remove('toggle-active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}

// ESCAPE-TASTE ZUM SCHLIESSEN
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeLightbox(); }
});
