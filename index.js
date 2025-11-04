// ===== VARIABLES GLOBALES =====
let currentTheme = 'light';

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeCurrentYear();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeTimeline();
    initializeEventListeners();
    initializeSmoothScroll();
    initializeFilterButtons();
});

// ===== GESTION DU THÈME =====
function initializeTheme() {
    currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (currentTheme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
        themeIcon.title = 'Passer au mode clair';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
        themeIcon.title = 'Passer au mode sombre';
    }
}

// ===== ANNÉE COURANTE =====
function initializeCurrentYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// ===== ANIMATIONS AU SCROLL =====
function initializeScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => observer.observe(element));
}

// ===== BARRES DE COMPÉTENCES =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level + '%';
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===== TIMELINE INTERACTIVE =====
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => timelineObserver.observe(item));
}

// ===== FILTRAGE DES COMPÉTENCES =====
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            skillCategories.forEach(category => {
                if (filter === 'all') {
                    category.classList.remove('hidden');
                } else {
                    if (category.getAttribute('data-category') === filter) {
                        category.classList.remove('hidden');
                    } else {
                        category.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// ===== NAVIGATION FLUIDE =====
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== GÉNÉRATION PDF =====
function generatePDF() {
    const element = document.getElementById('cv-content') || document.body;
    
    // Options pour html2pdf
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'CV_Fakher_Neila.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        pagebreak: { 
            mode: ['avoid-all', 'css', 'legacy'] 
        }
    };
    
    // Afficher un indicateur de chargement
    const originalText = document.querySelector('#download-pdf').innerHTML;
    document.querySelector('#download-pdf').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Génération...';
    document.querySelector('#download-pdf').disabled = true;
    
    // Générer le PDF
    html2pdf().set(opt).from(element).save().then(() => {
        // Restaurer le bouton
        document.querySelector('#download-pdf').innerHTML = originalText;
        document.querySelector('#download-pdf').disabled = false;
    });
}

// ===== AFFICHAGE CONDITIONNEL DES DÉTAILS =====
function toggleDetails(button) {
    const details = button.previousElementSibling;
    const isHidden = details.classList.contains('hidden');
    
    if (isHidden) {
        details.classList.remove('hidden');
        button.textContent = 'Voir moins';
    } else {
        details.classList.add('hidden');
        button.textContent = 'Voir plus';
    }
}

function toggleProjectDetails(button) {
    const projectItem = button.closest('.project-item');
    const details = projectItem.querySelector('.project-details');
    const summary = projectItem.querySelector('.project-summary');
    const isHidden = details.classList.contains('hidden');
    
    if (isHidden) {
        details.classList.remove('hidden');
        summary.style.display = 'none';
        button.textContent = 'Voir moins';
    } else {
        details.classList.add('hidden');
        summary.style.display = 'block';
        button.textContent = 'Voir les détails';
    }
}

// ===== ÉCOUTEURS D'ÉVÉNEMENTS =====
function initializeEventListeners() {
    // Bouton de changement de thème
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Bouton de téléchargement PDF
    document.getElementById('download-pdf').addEventListener('click', generatePDF);
    
    // Boutons "Voir plus" pour les expériences
    document.querySelectorAll('.btn-more').forEach(button => {
        button.addEventListener('click', function() {
            toggleDetails(this);
        });
    });
    
    // Boutons "Voir les détails" pour les projets
    document.querySelectorAll('.btn-project-more').forEach(button => {
        button.addEventListener('click', function() {
            toggleProjectDetails(this);
        });
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        // Ctrl+D pour télécharger le PDF
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            generatePDF();
        }
        
        // Ctrl+E pour changer le thème
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// ===== OBSERVATEUR DE VISIBILITÉ POUR TOUS LES ÉLÉMENTS =====
function initializeAllAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .timeline-item, .skill-progress');
    
    const globalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                }
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('visible');
                }
                if (entry.target.classList.contains('skill-progress') && !entry.target.classList.contains('animated')) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = level + '%';
                    entry.target.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => globalObserver.observe(element));
}

// ===== GESTION DES ERREURS =====
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// ===== OPTIMISATION DES PERFORMANCES =====
// Délai pour les animations initiales
setTimeout(() => {
    initializeAllAnimations();
}, 100);

// Export des fonctions principales pour un usage externe si nécessaire
window.CVApp = {
    toggleTheme,
    generatePDF,
    toggleDetails,
    toggleProjectDetails
};