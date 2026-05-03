/* ------------------------------------------------------------------
   showPage(id)
   Schimbă secțiunea .page vizibilă și actualizează link-ul activ în navigație.
   De asemenea, resetează scroll-ul paginii la început la fiecare schimbare.
   ------------------------------------------------------------------ */
function showPage(id) {
  // Ascunde toate paginile
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Elimină clasa "active" de pe toate link-urile de navigație
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Afișează pagina solicitată
  document.getElementById(id).classList.add('active');

  // Marchează link-ul corespunzător din meniu ca fiind activ
  const link = document.querySelector(`.nav-links a[data-page="${id}"]`);
  if (link) link.classList.add('active');

  // Scroll către partea de sus a paginii (smooth) după schimbarea conținutului
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Închide meniul de mobil dacă este deschis
  closeMobileMenu();

  // Declanșează re-scanarea IntersectionObserver pentru noile secțiuni vizibile
  observeSections();
}

/* ------------------------------------------------------------------
   Controlul meniului hamburger pentru dispozitive mobile
   ------------------------------------------------------------------ */
function toggleMobileMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ------------------------------------------------------------------
   Animație "Scroll-reveal" pentru elementele de tip .section-block
   Folosește IntersectionObserver pentru a adăuga clasa "visible" când
   un bloc intră în fereastra de vizualizare (viewport).
   ------------------------------------------------------------------ */
function observeSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adaugă clasa "visible" pentru a activa tranziția CSS fade-up
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  // Monitorizează toate blocurile de secțiune de pe pagina activă curentă
  document.querySelectorAll('.page.active .section-block').forEach(block => {
    observer.observe(block);
  });
}

// Pornește observatorul la încărcarea inițială (pentru pagina Home)
observeSections();

// Setează "home" ca link activ implicit în meniu la încărcare
document.querySelector('.nav-links a[data-page="home"]').classList.add('active');
