// ==========================================================================
// CONFIGURATION DE LA GALAXIE (PARTICLES.JS) - VERSION LASER OPTIMISÉE
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 110, // Un peu plus d'étoiles pour enrichir le fond
                    "density": { "enable": true, "value_area": 900 }
                },
                "color": { "value": "#df162b" }, 
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.4, // Étoiles de base légèrement plus discrètes...
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 2.5,
                    "random": true,
                    "anim": { "enable": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 130,
                    "color": "#df162b", 
                    "opacity": 0.15, // ...pour que le contraste soit plus saisissant au survol
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.2, // Mouvement très calme, presque suspendu
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "window", // Capte les mouvements sur toute la fenêtre de manière fluide
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // Mode capture/réseau
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push" 
                    },
                    "resize": true
                },
                "modes": {
                    "grab": { 
                        "distance": 220, // Portée du laser augmentée (la souris attrape les étoiles de plus loin)
                        "line_linked": { 
                            "opacity": 0.6 // Intensité augmentée au survol : le laser s'allume nettement !
                        } 
                    },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }
});

// ==========================================================================
// CONFIGURATION CRYPTOGRAPHIQUE (REMETS TES VALEURS ICI)
// ==========================================================================
const EXPECTED_USER = "admin"; 
const EXPECTED_PASSWORD_HASH = "f3b571d6873129592c4431f86c5f1742dff89d8aaad2519463ae08858f80fc40"; 

// --- FONCTION UTILITAIRE HASH SHA-256 ---
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ==========================================================================
// LOGIQUE DE NAVIGATION ENTRE LES ONGLETS & SECTIONS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll("ul.nav-links .nav-link");
    const sections = document.querySelectorAll(".page-section");
    const logoArea = document.querySelector(".logo-area");

    // FONCTION GLOBALE D'AFFICHAGE DE SECTION
    function showSection(targetId) {
        if (!targetId) return;

        // 1. Nettoyage complet des classes actives sur les onglets du menu
        menuLinks.forEach(link => link.classList.remove("active"));

        // 2. Activation visuelle de l'onglet ciblé
        const linkToActivate = document.querySelector(`ul.nav-links .nav-link[data-target="${targetId}"]`);
        if (linkToActivate) {
            linkToActivate.classList.add("active");
        }

        // 3. Bascule de visibilité des sections
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        // 4. Remontée de page fluide automatique
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // ÉCOUTEUR SUR LES LIENS DU MENU
    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("data-target");
            showSection(targetId);

            // Fermeture automatique du menu burger sur mobile après sélection
            const navContainer = document.querySelector("nav");
            if (navContainer && navContainer.classList.contains("nav-active")) {
                toggleMenu();
            }
        });
    });

    // ÉCOUTEUR SUR LE LOGO / TITRE (RETIRE LES BUGS DE SURBRILLANCE)
    if (logoArea) {
        logoArea.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("home");
        });
    }
});
// Relance la rotation automatique du carrousel toutes les 5000ms (5 secondes)
let autoSlideInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

// Optionnel : Arrête le défilement auto si l'utilisateur clique sur Précédent/Suivant
// pour éviter que ça passe deux slides d'un coup
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });
}

// ==========================================================================
// LOGIQUE DU MENU BURGER MOBILE
// ==========================================================================
function toggleMenu() {
    const navContainer = document.querySelector("nav");
    if (navContainer) {
        navContainer.classList.toggle("nav-active");
    }
}

// ==========================================================================
// ACCÈS SÉCURISÉ & POP-UP TERMINAL ADMIN
// ==========================================================================
function openLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
    document.getElementById('vault-user').focus();
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('lock-error').style.display = 'none';
    document.getElementById('vault-user').value = "";
    document.getElementById('vault-key').value = "";
}

async function checkLogin() {
    const user = document.getElementById('vault-user').value.trim();
    const pass = document.getElementById('vault-key').value.trim();
    const errorMsg = document.getElementById('lock-error');

    const inputHash = await sha256(pass);

    if (user.toLowerCase() === EXPECTED_USER && inputHash === EXPECTED_PASSWORD_HASH) {
        closeLoginModal();
        
        // Rendre l'onglet admin visible dans la navigation
        const adminNavItem = document.getElementById('admin-nav-item');
        if (adminNavItem) adminNavItem.style.display = 'block';
        
        // Transformation visuelle du bouton cadenas (Validé)
        const lockBtn = document.getElementById('admin-lock-btn');
        if (lockBtn) {
            lockBtn.innerHTML = '<i class="fas fa-lock-open" style="color: #26de81 !important; text-shadow: 0 0 10px rgba(38,222,129,0.4);"></i>';
            lockBtn.onclick = null;
        }

        // Redirection immédiate vers la section Admin
        document.querySelectorAll('ul.nav-links .nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        
        const adminNavLink = document.querySelector('#admin-nav-item .nav-link');
        if (adminNavLink) adminNavLink.classList.add('active');
        
        const adminSection = document.getElementById('admin');
        if (adminSection) adminSection.classList.add('active');
    } else {
        if (errorMsg) errorMsg.style.display = "block";
        document.getElementById('vault-key').value = "";
    }
}

// ==========================================================================
// LOGIQUE DU CAROUSEL (HERO ACCUEIL)
// ==========================================================================
let currentSlide = 0;
function changeSlide(direction) {
    const slides = document.querySelectorAll(".carousel-slide");
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
}

// ==========================================================================
// GESTION DU BOUTON RETOUR EN HAUT
// ==========================================================================
window.addEventListener("scroll", () => {
    const scrollTopBtn = document.getElementById("scroll-to-top");
    if (scrollTopBtn) {
        // Le bouton apparaît si on a défilé de plus de 300px
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ==========================================================================
// GESTION MEMOIRE DU MODULE DARK / LIGHT MODE
// ==========================================================================
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");
    
    body.classList.toggle("light-mode");
    
    if (body.classList.contains("light-mode")) {
        if (themeIcon) themeIcon.className = "fas fa-moon"; 
        localStorage.setItem("theme", "light"); 
    } else {
        if (themeIcon) themeIcon.className = "fas fa-sun"; 
        localStorage.setItem("theme", "dark"); 
    }
}

// Persistance du thème choisi au rechargement
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const themeIcon = document.getElementById("theme-icon");
    
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        if (themeIcon) themeIcon.className = "fas fa-moon";
    }


});

