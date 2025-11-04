// Met à jour l'année dans le footer avec l'année courante automatiquement
document.getElementById("year").textContent = new Date().getFullYear();

// Sélectionne tous les éléments qui doivent avoir une animation d'apparition au défilement
const faders = document.querySelectorAll('.fade-in');

// Configuration de l'Intersection Observer : déclenche l'animation quand 10% de l'élément est visible
const appearOptions = { threshold: 0.1 };

// Crée un observer pour gérer l'apparition des éléments au défilement
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  // Pour chaque élément qui change d'état de visibilité
  entries.forEach(entry => {
    // Si l'élément n'est pas visible, on ne fait rien
    if (!entry.isIntersecting) return;
    
    // Quand l'élément devient visible, on ajoute la classe 'visible' pour déclencher l'animation CSS
    entry.target.classList.add('visible');
    
    // On arrête d'observer cet élément pour optimiser les performances (animation déjà déclenchée)
    observer.unobserve(entry.target);
  });
}, appearOptions);

// Applique l'observation à tous les éléments fade-in
faders.forEach(fade => appearOnScroll.observe(fade));

// Sélectionne tous les éléments de la timeline pour une animation spécifique
const timelineItems = document.querySelectorAll('.timeline-item');

// Crée un observer spécifique pour la timeline avec un seuil de visibilité à 20%
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Quand un élément de timeline devient visible
    if (entry.isIntersecting) {
      // Active l'animation de la timeline
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 }); // Nécessite que 20% de l'élément soit visible

// Applique l'observation à tous les éléments de timeline
timelineItems.forEach(item => timelineObserver.observe(item));

// Événement pour supprimer le contour de focus quand on clique sur une section
document.addEventListener('click', function(e) {
  // Vérifie si l'élément cliqué est une section ou se trouve dans une section
  if (e.target.tagName === 'SECTION' || e.target.closest('section')) {
    // Supprime le contour de focus par défaut du navigateur
    e.target.style.outline = 'none';
  }
});

// Pour chaque section, on ajoute des écouteurs d'événements supplémentaires
document.querySelectorAll('section').forEach(section => {
  // Quand on appuie sur le bouton de la souris sur une section
  section.addEventListener('mousedown', function() {
    // Supprime immédiatement le contour pour prévenir son apparition
    this.style.outline = 'none';
  });
  
  // Quand une section reçoit le focus (navigation au clavier)
  section.addEventListener('focus', function() {
    // Supprime le contour de focus
    this.style.outline = 'none';
  });
});