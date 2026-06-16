// ==========================================================================
// CONFIGURATION DE LA GALAXIE (PARTICLES.JS) - VERSION LASER OPTIMISÉE
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 110, 
                    "density": { "enable": true, "value_area": 900 }
                },
                "color": { "value": "#df162b" }, 
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.4, 
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
                    "opacity": 0.15, 
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.2, 
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "window", 
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 220, "line_linked": { "opacity": 0.6 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }
});

// ==========================================================================
// CONFIGURATION CRYPTOGRAPHIQUE
// ==========================================================================
const EXPECTED_USER = "admin"; 
const EXPECTED_PASSWORD_HASH = "f3b571d6873129592c4431f86c5f1742dff89d8aaad2519463ae08858f80fc40"; 

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

    function showSection(targetId) {
        if (!targetId) return;

        menuLinks.forEach(link => link.classList.remove("active"));

        const linkToActivate = document.querySelector(`ul.nav-links .nav-link[data-target="${targetId}"]`);
        if (linkToActivate) {
            linkToActivate.classList.add("active");
        }

        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("data-target");
            showSection(targetId);

            const navContainer = document.querySelector("nav");
            if (navContainer && navContainer.classList.contains("nav-active")) {
                toggleMenu();
            }
        });
    });

    if (logoArea) {
        logoArea.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("home");
        });
    }
});

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
        
        const adminNavItem = document.getElementById('admin-nav-item');
        if (adminNavItem) adminNavItem.style.display = 'block';
        
        const lockBtn = document.getElementById('admin-lock-btn');
        if (lockBtn) {
            lockBtn.innerHTML = '<i class="fas fa-lock-open" style="color: #26de81 !important; text-shadow: 0 0 10px rgba(38,222,129,0.4);"></i>';
            lockBtn.onclick = null;
        }

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
// MOTEUR DU CAROUSEL CYBERPUNK UNIQUE (SYNCHRO 5 SECONDES INTERNES)
// ==========================================================================
let currentSlide = 0;
let progress = 0;          
let carouselInterval;      
let isHovered = false;     

const SLIDE_DURATION = 5000;  
const TICK_RATE = 30;         

function startCarouselClock() {
    clearInterval(carouselInterval);

    carouselInterval = setInterval(() => {
        if (isHovered) return; 

        progress += (TICK_RATE / SLIDE_DURATION) * 100;

        const activeProgress = document.querySelector(".carousel-dot.active .carousel-progress");
        if (activeProgress) {
            activeProgress.style.width = `${progress}%`;
        }

        if (progress >= 100) {
            progress = 0;
            changeSlide(1);
        }
    }, TICK_RATE);
}

function updateCarouselDOM() {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    if (slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => {
        dot.classList.remove("active");
        const progressBar = dot.querySelector(".carousel-progress");
        if (progressBar) progressBar.style.width = "0%";
    });

    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll(".carousel-slide");
    if (slides.length === 0) return;

    progress = 0; 
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    updateCarouselDOM();
}

function currentSlideTo(index) {
    progress = 0; 
    currentSlide = index;
    updateCarouselDOM();
}

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    const container = document.querySelector('.carousel-container');

    if (slides.length > 0) {
        updateCarouselDOM();
        startCarouselClock();
    }

    if (container) {
        container.addEventListener('mouseenter', () => { isHovered = true; });
        container.addEventListener('mouseleave', () => { isHovered = false; });
    }
});

// ==========================================================================
// GESTION DU BOUTON RETOUR EN HAUT
// ==========================================================================
window.addEventListener("scroll", () => {
    const scrollTopBtn = document.getElementById("scroll-to-top");
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================================================
// GESTION DARK / LIGHT MODE
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

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const themeIcon = document.getElementById("theme-icon");
    
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        if (themeIcon) themeIcon.className = "fas fa-moon";
    }
});