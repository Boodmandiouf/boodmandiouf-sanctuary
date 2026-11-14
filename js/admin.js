/**
 * ==========================================================================
 * BOODMANDIOUF SANCTUARY - CENTRAL CORE SYSTEM (ADMIN)
 * ==========================================================================
 */

// Variables d'état globales
var activeFilters = [];
var currentSearchQuery = '';

// --- INITIALISATION GLOBALE AU CHARGEMENT ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Gestion du Thème (Light/Dark)
    const savedTheme = localStorage.getItem("sanctuary_theme") || localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        updateSwitchIcon(true);
    }

    // 2. Initialisation des modules d'administration
    initNetworkMonitoring();
    initKernelLogs();
    setupLogbook();
    initBurgerMenu();
    
    // 3. Initialisation du Music Vault si les données existent
    if (typeof musicResources !== 'undefined') {
        renderMusicResources(musicResources);
    }
});

// --- GESTION UNIFIÉE DU MENU BURGER MOBILE ---
function initBurgerMenu() {
    const burgerBtn = document.getElementById('menuBurgerBtn') || document.querySelector(".menu-burger-btn");
    const tabsMenu = document.getElementById('adminTabsMenu') || document.querySelector(".admin-nav-right-group");

    if (burgerBtn && tabsMenu) {
        if (burgerBtn.dataset.listenerInitialized) return;
        burgerBtn.dataset.listenerInitialized = "true";

        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tabsMenu.classList.toggle('active-menu');
            
            const icon = burgerBtn.querySelector('i');
            if (icon) {
                if (tabsMenu.classList.contains('active-menu')) {
                    icon.className = "fas fa-times";
                } else {
                    icon.className = "fas fa-bars";
                }
            }
        });

        // Fermer le menu si on clique en dehors
        document.addEventListener('click', (e) => {
            if (!tabsMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                closeBurger();
            }
        });
    }
}

// Fonction globale pour refermer proprement le menu burger
function closeBurger() {
    const tabsMenu = document.getElementById('adminTabsMenu') || document.querySelector(".admin-nav-right-group");
    const burgerBtn = document.getElementById('menuBurgerBtn') || document.querySelector(".menu-burger-btn");
    
    if (tabsMenu) {
        tabsMenu.classList.remove('active-menu');
    }
    if (burgerBtn) {
        const icon = burgerBtn.querySelector('i');
        if (icon) {
            icon.className = "fas fa-bars";
        }
    }
}

// Observation du DOM au cas où le menu serait injecté dynamiquement
const burgerObserver = new MutationObserver((mutations, obs) => {
    const burgerBtn = document.getElementById('menuBurgerBtn') || document.querySelector(".menu-burger-btn");
    if (burgerBtn) {
        initBurgerMenu();
        obs.disconnect();
    }
});
if (document.body) {
    burgerObserver.observe(document.body, { childList: true, subtree: true });
}

// --- GESTION DU FORMULAIRE RÉTRACTABLE (BOUTON TOGGLE) ---
document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("#toggleAddBoxBtn");
    if (toggleBtn) {
        const addBox = document.getElementById("add-resource-box");
        if (addBox) {
            addBox.classList.toggle("open");
            
            const icon = toggleBtn.querySelector("i");
            if (addBox.classList.contains("open")) {
                toggleBtn.innerHTML = '<i class="fas fa-minus-circle"></i> Masquer le formulaire';
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Ajouter une ressource';
            }
        }
    }
});

// --- GESTION DE LA RECHERCHE & DES FILTRES MUSIC VAULT ---
document.addEventListener('input', (e) => {
    const target = e.target;
    if (target && (target.id === 'musicSearchInput' || target.classList.contains('music-search-input'))) {
        currentSearchQuery = target.value.toLowerCase();
        filterAndRenderMusic();
    }
});

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Bouton "Tout Effacer"
    if (btn.classList.contains('action-reset') || btn.id === 'resetFiltersBtn') {
        activeFilters = [];
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        document.querySelectorAll('#musicSearchInput, .music-search-input').forEach(input => {
            input.value = '';
        });
        currentSearchQuery = '';

        filterAndRenderMusic();
        return;
    }

    const filterValue = btn.getAttribute('data-filter');
    if (!filterValue) return;

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        activeFilters = activeFilters.filter(f => f !== filterValue);
    } else {
        btn.classList.add('active');
        activeFilters.push(filterValue);
    }

    filterAndRenderMusic();
});

// --- SOUMISSION DU FORMULAIRE D'AJOUT DE RESSOURCE ---
document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'addMusicForm') {
        e.preventDefault();

        const title = document.getElementById('newTitle').value.trim();
        const category = document.getElementById('newCategory').value;
        const url = document.getElementById('newUrl').value.trim();
        const description = document.getElementById('newDesc').value.trim();

        if (title && category && url) {
            if (typeof addMusicResource === 'function') {
                addMusicResource(title, category, url, description || "Aucune description.");
            }
            
            e.target.reset();
            
            if (typeof pushLog === 'function') {
                pushLog('info', `MUSIC_VAULT: Nouvelle entrée injectée -> "${title}"`);
            }
        }
    }
});

// 1. SIMULATION DU GRAPH DE MONITORING RÉSEAU (CANVAS)
function initNetworkMonitoring() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const fpsCounter = document.getElementById('fps-counter');

    function resizeCanvas() {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || 120;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let offset = 0;
    let lastFrameTime = performance.now();

    function drawGraph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(223, 22, 43, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 20;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        ctx.beginPath();
        ctx.strokeStyle = document.body.classList.contains('light-mode') ? '#00aa44' : '#00ff66';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < canvas.width; i++) {
            const y = canvas.height / 2 + 
                    Math.sin(i * 0.015 + offset) * 20 + 
                    Math.cos(i * 0.03 - offset) * 8;
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(223, 22, 43, 0.4)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < canvas.width; i++) {
            const y = canvas.height / 2 + 
                    Math.cos(i * 0.02 + offset * 1.5) * 15 + 
                    Math.sin(i * 0.005 - offset) * 12;
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }
        ctx.stroke();

        offset += 0.04;

        const now = performance.now();
        if (fpsCounter && now - lastFrameTime > 500) { 
            const dynamicFps = (Math.random() * (60.2 - 58.8) + 58.8).toFixed(1);
            fpsCounter.innerHTML = `<span class="status-online"></span>CORE_FREQ: ${dynamicFps} Hz`;
            lastFrameTime = now;
        }

        requestAnimationFrame(drawGraph);
    }
    
    drawGraph();
}

// 2. LOGS IMMERSIFS DU NOYAU
function initKernelLogs() {
    const logFeed = document.getElementById('logFeed');
    if (!logFeed) return;

    const initialLogs = [
        { type: 'info', msg: 'Connecting to main network backbone...' },
        { type: 'info', msg: 'Handshake complete. Credentials verified under token st3mon_ed.' },
        { type: 'info', msg: 'Core system parameters loaded into volatile memory.' },
        { type: 'warn', msg: 'Streaming APIs running close to daily quota limits.' },
        { type: 'info', msg: 'Initializing encrypted database sync...' },
        { type: 'info', msg: 'Database connection established: 127.0.0.1:5432.' },
        { type: 'crit', msg: 'Unauthorized sync block dropped successfully from subnet.' },
        { type: 'info', msg: 'All core modules initialized. Terminal monitoring standby.' }
    ];

    initialLogs.forEach((l, i) => {
        setTimeout(() => pushLog(l.type, l.msg), i * 350);
    });

    setInterval(() => {
        const liveMsgs = [
            { type: 'info', msg: 'Gateway health-check: 200 OK (latency: 14ms).' },
            { type: 'info', msg: 'Synchronizing DOM style variables with active theme.' },
            { type: 'warn', msg: 'Minor latency detected on media assets pipeline.' },
            { type: 'info', msg: 'Clearing idle websocket connections...' },
            { type: 'info', msg: 'Ping token sent to master node. Pong received (0ms).' },
            { type: 'warn', msg: 'Sub-routine [crypto-check] reports high memory utilization.' },
            { type: 'info', msg: 'Flushing standard output buffers.' },
            { type: 'info', msg: 'Indexed static routes successfully.' },
            { type: 'crit', msg: 'Failsafe watchdogs active. Zero anomalies detected.' }
        ];
        const picked = liveMsgs[Math.floor(Math.random() * liveMsgs.length)];
        pushLog(picked.type, picked.msg);
    }, 3500);
}

function pushLog(type, message) {
    const logFeed = document.getElementById('logFeed');
    if (!logFeed) return;

    const timeStr = new Date().toTimeString().split(' ')[0];
    let tag = '<span class="info">[INFO]</span>';
    
    if (type === 'crit') tag = '<span class="crit">[CRIT]</span>';
    if (type === 'warn') tag = '<span class="warn">[WARN]</span>';

    const row = document.createElement('div');
    row.innerHTML = `<span class="time">[${timeStr}]</span> ${tag} ${message}`;
    logFeed.appendChild(row);
    logFeed.scrollTop = logFeed.scrollHeight;
}

function triggerAction(actionName) {
    const timeStr = new Date().toTimeString().split(' ')[0];
    const logFeed = document.getElementById('logFeed');
    
    if (logFeed) {
        logFeed.innerHTML += `<div><span class="time">[${timeStr}]</span> <span class="crit">[EXEC]</span> EXECUTION_REQUEST: [${actionName}] dispatch down to main thread.</div>`;
        logFeed.scrollTop = logFeed.scrollHeight;
        
        if (actionName === 'PURGE_CACHE') {
            setTimeout(() => pushLog('warn', 'CACHE_ENGINE: 1,420 entries purged from redis storage.'), 600);
        }
        if (actionName === 'EMERGENCY_LOCK') {
            setTimeout(() => pushLog('crit', 'SECURITY: Core locks engaged. Admin terminal access restricted.'), 500);
        }
    }
}

// 3. LOGIQUE ET PERSISTANCE DU BLOC-NOTES (LOGBOOK)
function setupLogbook() {
    const notesArea = document.getElementById('admin-notes');
    if (!notesArea) return;

    const savedNotes = localStorage.getItem('st3mon_admin_notes');
    if (savedNotes) {
        notesArea.value = savedNotes;
    }

    notesArea.addEventListener('input', () => {
        localStorage.setItem('st3mon_admin_notes', notesArea.value);
    });
}

function clearNotes() {
    const notesArea = document.getElementById('admin-notes');
    if (notesArea) {
        notesArea.value = '';
        localStorage.removeItem('st3mon_admin_notes');
        pushLog('warn', 'LOGBOOK: Storage cache has been purged manually.');
    }
}

// 4. GESTION DU COMMUTATEUR DE THÈME
function toggleLightMode() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('sanctuary_theme', isLight ? 'light' : 'dark');
    updateSwitchIcon(isLight);
}

function updateSwitchIcon(isLight) {
    const icon = document.querySelector('#themeSwitchBtn i');
    if (icon) {
        if (isLight) {
            icon.className = "fas fa-moon";
        } else {
            icon.className = "fas fa-sun";
        }
    }
}

window.loadAdminScripts = function() {
    initNetworkMonitoring();
    initKernelLogs();
    setupLogbook();
};

function switchTab(tabName) {
    document.querySelectorAll('.admin-view').forEach(view => view.classList.remove('active-view'));
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));

    if (tabName === 'dashboard') {
        const viewDashboard = document.getElementById('view-dashboard');
        const btnDashboard = document.getElementById('btn-dashboard');
        if (viewDashboard) viewDashboard.classList.add('active-view');
        if (btnDashboard) btnDashboard.classList.add('active');
    } else if (tabName === 'music') {
        const viewMusic = document.getElementById('view-music');
        const btnMusic = document.getElementById('btn-music');
        if (viewMusic) viewMusic.classList.add('active-view');
        if (btnMusic) btnMusic.classList.add('active');
        if (typeof musicResources !== 'undefined') {
            filterAndRenderMusic();
        }
    } else if (tabName === 'mao') {
        const viewMao = document.getElementById('view-mao');
        const btnMao = document.getElementById('btn-mao');
        if (viewMao) viewMao.classList.add('active-view');
        if (btnMao) btnMao.classList.add('active');
    } else if (tabName === 'tools') {
        const viewMao = document.getElementById('view-tools');
        const btnMao = document.getElementById('btn-tools');
        if (viewMao) viewMao.classList.add('active-view');
        if (btnMao) btnMao.classList.add('active');
    }
}

function renderMusicResources(items) {
    const grid = document.getElementById('musicGrid');
    const countDisplay = document.getElementById('searchResultCount');
    
    if (!grid) return;
    
    // Mise à jour du compteur de résultats
    if (countDisplay) {
        const count = items.length;
        countDisplay.textContent = `${count} résultat${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`;
    }
    
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = '<p style="color: #64748b; font-size: 0.9rem;">Aucune ressource trouvée.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `
            <div>
                <span class="resource-tag" data-category="${item.category}">${item.category}</span>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
            <a href="${item.url}" target="_blank">ACCÉDER ↗</a>
        `;
        grid.appendChild(card);
    });
}

function filterAndRenderMusic() {
    if (typeof musicResources === 'undefined') return;
    
    let filtered = musicResources;

    if (activeFilters.length > 0) {
        filtered = filtered.filter(item => {
            return activeFilters.some(filter => 
                item.category === filter || item.category.startsWith(filter + ' -')
            );
        });
    }

    if (currentSearchQuery !== '') {
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(currentSearchQuery) || 
            item.category.toLowerCase().includes(currentSearchQuery) ||
            item.description.toLowerCase().includes(currentSearchQuery)
        );
    }

    renderMusicResources(filtered);
}

function exportMusicDataFile() {
    if (typeof musicResources === 'undefined') return;

    let fileContent = `/**\n * ==========================================================================\n * SANCTUARY - MUSIC VAULT DATABASE (music-data.js)\n * ==========================================================================\n */\n\n`;
    fileContent += `const defaultMusicResources = ` + JSON.stringify(musicResources, null, 4) + `;\n\n`;
    fileContent += `let musicResources = JSON.parse(localStorage.getItem('sanctuary_music_vault')) || defaultMusicResources;\n\n`;
    fileContent += `function addMusicResource(title, category, url, description) {\n`;
    fileContent += `    const newEntry = { title, category, url, description };\n`;
    fileContent += `    musicResources.unshift(newEntry);\n`;
    fileContent += `    localStorage.setItem('sanctuary_music_vault', JSON.stringify(musicResources));\n`;
    fileContent += `    if (typeof filterAndRenderMusic === 'function') {\n`;
    fileContent += `        filterAndRenderMusic();\n`;
    fileContent += `    }\n`;
    fileContent += `    return newEntry;\n`;
    fileContent += `}\n\n`;
    fileContent += `function resetMusicVault() {\n`;
    fileContent += `    localStorage.removeItem('sanctuary_music_vault');\n`;
    fileContent += `    musicResources = [...defaultMusicResources];\n`;
    fileContent += `    if (typeof filterAndRenderMusic === 'function') filterAndRenderMusic();\n`;
    fileContent += `}`;

    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'music-data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (typeof pushLog === 'function') {
        pushLog('info', 'SYSTEM: Fichier music-data.js exporté avec succès.');
    }
}

// --- GESTION DU BOUTON GO TO TOP ---
window.addEventListener('scroll', () => {
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (!goToTopBtn) return;

    // Affiche le bouton après 300px de scroll
    if (window.scrollY > 300) {
        goToTopBtn.classList.add('show');
    } else {
        goToTopBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sauvegarde automatique du bloc-notes (textarea)
  const notesTextarea = document.getElementById("mao-project-notes");
  if (notesTextarea) {
    const savedNotes = localStorage.getItem("mao_project_notes");
    if (savedNotes !== null) {
      notesTextarea.value = savedNotes;
    }
    notesTextarea.addEventListener("input", () => {
      localStorage.setItem("mao_project_notes", notesTextarea.value);
    });
  }

  // 2. Sauvegarde automatique de toutes les checkboxes de la section MAO
  const checkboxes = document.querySelectorAll(".mao-checkbox");
  checkboxes.forEach((checkbox, index) => {
    const storageKey = `mao_checkbox_${index}`;

    // Restaurer l'état enregistré
    const savedState = localStorage.getItem(storageKey);
    if (savedState === "true") {
      checkbox.checked = true;
    }

    // Sauvegarder dès qu'on clique dessus
    checkbox.addEventListener("change", () => {
      localStorage.setItem(storageKey, checkbox.checked);
    });
  });
});

// --- GESTION DU FILTRE ET DE LA RECHERCHE POUR LA SECTION TOOLS ---
let currentToolCategory = 'ALL';

function setToolFilter(category, btnElement) {
    currentToolCategory = category;
    
    // Gestion des classes active sur les boutons de filtre Tools
    const chipsContainer = document.getElementById('toolsFilterChips');
    if (chipsContainer) {
        chipsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    }
    if (btnElement) {
        btnElement.classList.add('active');
    }
    
    filterTools();
}

function filterTools() {
    const searchInput = document.getElementById('toolsSearchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const cards = document.querySelectorAll('#toolsGrid .tool-card');
    const countDisplay = document.getElementById('toolsResultCount');
    
    let visibleCount = 0;

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const keywords = card.getAttribute('data-keywords') || '';
        const title = card.querySelector('h4').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();

        // Vérification de la correspondance du filtre par catégorie
        const matchesCategory = (currentToolCategory === 'ALL' || category === currentToolCategory);
        
        // Vérification de la recherche textuelle (titre, description ou mots-clés)
        const matchesSearch = (query === '' || title.includes(query) || desc.includes(query) || keywords.includes(query));

        if (matchesCategory && matchesSearch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Mise à jour du compteur de résultats dynamique
    if (countDisplay) {
        countDisplay.textContent = `${visibleCount} résultat(s) trouvé(s)`;
    }
}

// ==========================================================================
// 5. MODULE APPLICATION : ACCORDS GUITARE (BLOC 2 INSTRUMENTS)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const appRoot = document.getElementById('guitar-chords-app');
    if (!appRoot) return;

    const FR=['Do','Do#','Ré','Ré#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Si'],
    FRb=['Do','Réb','Ré','Mib','Mi','Fa','Solb','Sol','Lab','La','Sib','Si'],
    EN=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
    ENb=['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'],
    TUN=[
     {n:'Standard — EADGBE',k:'Std',p:[4,9,2,7,11,4],s:1},
     {n:'Demi-ton plus bas — Eb',k:'Eb',p:[3,8,1,6,10,3],s:1},
     {n:'Ton plus bas — D',k:'D',p:[2,7,0,5,9,2],s:1},
     {n:'Drop D — DADGBE',k:'Drop D',p:[2,9,2,7,11,4]},
     {n:'Drop C# — C#G#C#F#A#D#',k:'Drop C#',p:[1,8,1,6,10,3]},
     {n:'Drop C — CGCFAD',k:'Drop C',p:[0,7,0,5,9,2]},
     {n:'Drop B — BF#BEG#C#',k:'Drop B',p:[11,6,11,4,8,1]},
     {n:'DADGAD',k:'DADGAD',p:[2,9,2,7,9,2],o:1},
     {n:'Open G — DGDGBD',k:'Open G',p:[2,7,2,7,11,2],o:1},
     {n:'Open D — DADF#AD',k:'Open D',p:[2,9,2,6,9,2],o:1}
    ],
    QS=['','m','7','maj7','m7','6','9','m9','sus2','sus4','add9','5','dim','aug','m7b5','13'],
    STYLES={
     triade:{g:'Bases',n:'Triades',d:'Les 3 notes de base : majeur, mineur, diminué, augmenté, sus.',q:['','m','dim','aug','sus2','sus4']},
     classique:{g:'Bases',n:'Classique',d:'Musique tonale classique : triades, septième de dominante, diminués.',q:['','m','7','6','m6','dim','dim7','aug','sus4']},
     moderne:{g:'Bases',n:'Moderne / Pop',d:'Pop actuelle : triades, sus2/sus4, add9 et maj7.',q:['','m','sus2','sus4','add9','5','maj7','m7','6']},
     rock:{g:'Rock & Métal',n:'Rock',d:'Rock : power chords (5), triades, sus et septièmes.',q:['5','','m','sus4','sus2','7','add9']},
     emo:{g:'Rock & Métal',n:'Emo / Math rock',d:'Accords aérés : add9, maj7, sus2, mineurs 9.',q:['add9','maj7','sus2','sus4','m9','9','6']},
     metal:{g:'Rock & Métal',n:'Métal',d:'Métal : power chords (5), mineurs, sus, diminués. Un accordage Drop simplifie les power chords à un doigt.',q:['5','m','sus2','sus4','dim','m7','madd9','7']},
     djent:{g:'Rock & Métal',n:'Djent / Prog',d:'Djent : power chords et mineurs étendus (add9, 9, 11), souvent en accordage grave (Drop C, Drop B).',q:['5','m','madd9','m7','m9','sus2','m11','m6','m7b5']},
     blues:{g:'Blues & Jazz',n:'Blues',d:'Blues : septièmes et neuvièmes de dominante, 13e, 7#9.',q:['7','9','13','m','m7','7#9','dim7']},
     jazz:{g:'Blues & Jazz',n:'Jazz',d:'Jazz : accords de 4 sons et plus, demi-diminués, altérés.',q:['maj7','m7','7','m7b5','dim7','9','13','6','m6','maj9','mmaj7','7b9','7#9']},
     bossa:{g:'Blues & Jazz',n:'Bossa nova',d:'Bossa nova : maj7, m7, 6, m6, 9 et diminués.',q:['maj7','m7','7','6','m6','9','m9','dim7']},
     funk:{g:'Groove',n:'Funk',d:'Funk : septièmes et neuvièmes de dominante, mineurs 7/9/11, 7sus4.',q:['7','9','13','m7','m9','m11','7sus4','11','m6']},
     soul:{g:'Groove',n:'Soul / R&B',d:'Soul / R&B : maj7, m7, 9, m9, add9, sus4, 11.',q:['maj7','m7','9','m9','add9','sus4','7','11']},
     lofi:{g:'Chill & Japon',n:'Lo-fi',d:'Lo-fi : accords « jazzy » doux (maj7, m7, maj9, m9, add9).',q:['maj7','m7','maj9','m9','9','add9','6','m6','m11']},
     japonais:{g:'Chill & Japon',n:'Japonais (city pop / J-pop)',d:'City pop / J-pop : maj7, m7, 7, 9, 7sus4, demi-diminués.',q:['maj7','m7','7','9','7sus4','sus4','add9','maj9','m7b5','6']}
    },
    OD={C:'x32010',C7:'x32310',Cmaj7:'x32000',Cadd9:'x32030',D:'xx0232',Dm:'xx0231',D7:'xx0212',Dmaj7:'xx0222',Dsus2:'xx0230',Dsus4:'xx0233',Dm7:'xx0211',E:'022100',Em:'022000',E7:'020100',Em7:'020000',Emaj7:'021100',Esus4:'022200',G:'320003',G7:'320001',Gmaj7:'320002',G6:'320000',A:'x02220',Am:'x02210',A7:'x02020',Am7:'x02010',Amaj7:'x02120',Asus2:'x02200',Asus4:'x02230',Aadd9:'x02420',B7:'x21202',Fmaj7:'xx3210'},
    SH={e:{'':'022100',m:'022000',7:'020100',m7:'020000',maj7:'021100',sus4:'022200',m6:'022020',5:'022xxx'},
     a:{'':'x02220',m:'x02210',7:'x02020',m7:'x02010',maj7:'x02120',sus4:'x02230',sus2:'x02200',m7b5:'x0101x',dim:'x0121x',5:'x022xx'}};

    const $ = s => document.querySelector(s);
    let OPEN, TI = 0, CAPO = 0;
    const setOpen = () => { OPEN = TUN[TI].p.map(x => (x + CAPO) % 12); };
    setOpen();

    const BASES={do:0,re:2,mi:4,fa:5,sol:7,la:9,si:11,c:0,d:2,e:4,f:5,g:7,a:9,b:11},
    TE=['C','Db','D','Eb','E','F','F#','G','Ab','A','Bb','B'],
    TON=[['Do',0],['Réb',1],['Ré',2],['Mib',3],['Mi',4],['Fa',5],['Fa#',6],['Sol',7],['Lab',8],['La',9],['Sib',10],['Si',11]],
    PR={
     '':[['Pop','I V vi IV'],['Cadence simple','I IV V I'],['II–V–I','ii7 V7 Imaj7']],
     triade:[['Cadence simple','I IV V I'],['Pop','I V vi IV'],['Années 50','I vi IV V'],['Pop inversé','vi IV I V']],
     classique:[['Cadence parfaite','I IV V7 I'],['Canon (Pachelbel)','I V vi iii IV I IV V'],['Mineur classique','i iv V i'],['Cadence andalouse','i bVII bVI V']],
     moderne:[['Pop','I V vi IV'],['Pop inversé','vi IV I V'],['Années 50','I vi IV V'],['Pop colorée','Iadd9 V vi7 IVmaj7']],
     rock:[['Rock mixolydien','I bVII IV'],['Rock classique','I bIII IV I'],['Power chords','I5 IV5 V5 I5'],['Rock mineur','i bVII bVI bVII']],
     emo:[['Pop colorée','Iadd9 Vsus4 vi7 IVmaj7'],['Pop colorée inversée','vi7 IVmaj7 Iadd9 Vsus4']],
     metal:[['Éolien (i–bVI–bVII)','I5 bVI5 bVII5 I5'],['Phrygien','I5 bII5 I5 bIII5'],['Triton','I5 bV5 I5 bVII5']],
     djent:[['Mineur étendu','i9 bVImaj7 bIIImaj7 bVII'],['Power chords graves','I5 bVI5 bIII5 bVII5'],['Phrygien coloré','iadd9 bII iadd9 bIII']],
     blues:[['Blues 12 mesures','I7 I7 I7 I7 IV7 IV7 I7 I7 V7 IV7 I7 V7'],['Blues mineur 12 mesures','i7 i7 i7 i7 iv7 iv7 i7 i7 bVI7 V7 i7 i7']],
     jazz:[['II–V–I majeur','ii7 V7 Imaj7'],['II–V–I mineur','iim7b5 V7b9 i'],['Turnaround','Imaj7 vi7 ii7 V7']],
     bossa:[['II–V–I–VI','ii7 V7 Imaj7 vi7'],['Passage diminué','Imaj7 #idim7 ii7 V7']],
     funk:[['Vamp dominante','I9 IV9'],['Vamp dorien','i7 IV7'],['Vamp mineur','i9 iv7']],
     soul:[['I–vi–ii–V','Imaj7 vi7 ii7 V7'],['IV–iii–ii–I','IVmaj7 iii7 ii7 Imaj7']],
     lofi:[['II–V–I–VI','ii7 V7 Imaj7 vi7'],['I–iii–vi–ii','Imaj7 iii7 vi7 ii7']],
     japonais:[['Royal road (王道進行)','IVmaj7 V7 iii7 vi7'],['Marunouchi (丸サ進行)','IVmaj7 III7 vi7 v7 I7'],['Komuro (小室進行)','vi IV V I']]
    };

    function note(t){
     const m=t.match(/^(do|r[eé]|mi|fa|sol|la|si|[a-g])/i);if(!m)return null;
     let len=m[0].length,acc=0;
     const a=t.slice(len).match(/^(bémol|bemol|dièse|diese|#|♯|♭|b)/i);
     if(a){const x=a[1].toLowerCase();acc=(x==='b'||x==='♭'||x.startsWith('bé')||x==='bemol')?-1:1;len+=a[1].length}
     return{pc:(BASES[m[1].toLowerCase().replace('é','e')]+acc+12)%12,flat:acc<0,len};
    }

    function parse(inp){
     const t=inp.trim().replace(/\s+/g,'');if(!t)return null;
     const parts=t.split('/'),n=note(parts[0]);if(!n||parts.length>2)return null;
     let bn=null;if(parts[1]){bn=note(parts[1]);if(!bn||bn.len!==parts[1].length)return null}
     let maj=0,dim=0,aug=0,sus='',add='',alt='',a9='';
     let r=parts[0].slice(n.len).replace(/maj/ig,'§').replace(/M/g,'§').toLowerCase()
      .replace(/§/g,()=>{maj=1;return''})
      .replace(/dim|°/g,()=>{dim=1;return''})
      .replace(/aug|\+/g,()=>{aug=1;return''})
      .replace(/sus(2|4)?/g,(x,d)=>{sus=d||'4';return''})
      .replace(/add(\d+)/g,(x,d)=>{add=d;return''})
      .replace(/[b#]9/g,x=>{a9=x;return''})
      .replace(/[b#]5/g,x=>{alt=x;return''});
     const nm=r.match(/13|11|9|7|6|5/),num=nm?nm[0]:'';if(num)r=r.replace(num,'');
     const minor=/[m-]/.test(r);r=r.replace(/[m-]/g,'');if(r)return null;
     const third=sus==='2'?2:sus?5:(dim||minor?3:4);
     let fifth=dim?6:aug?8:7;if(alt==='b5')fifth=6;if(alt==='#5')fifth=8;
     let iv=[0,third,fifth];const power=num==='5'&&!sus&&!dim&&!aug;if(power)iv=[0,7];
     const sev=(dim&&num==='7')?9:maj?11:10;
     if(num==='6')iv.push(9);
     if(['7','9','11','13'].includes(num))iv.push(sev);
     if(['9','11','13'].includes(num))iv.push(2);
     if(num==='11')iv.push(5);if(num==='13')iv.push(9);
     if(add){const x={9:2,2:2,11:5,4:5,13:9}[add];if(x!=null)iv.push(x)}
     if(a9==='b9')iv.push(1);if(a9==='#9')iv.push(3);
     const root=n.pc,flat=n.flat,bass=bn?bn.pc:null;
     const S=new Set(iv.map(x=>(x+root)%12));if(bass!==null)S.add(bass);
     const pcs=[...S],req=new Set(pcs),drop=x=>{if(x!==bass)req.delete(x)};
     if(iv.length>3&&!power)drop((fifth+root)%12);
     if(num==='11'||num==='13')drop((2+root)%12);
     const sfx=(dim?'dim':aug?'aug':minor?'m':'')+(num?(maj?'maj':'')+num:'')+(sus?'sus'+sus:'')+(add?'add'+add:'')+alt+a9;
     const rf=(flat?FRb:FR)[root],re=(flat?ENb:EN)[root];
     const bf=bn?'/'+(bn.flat?FRb:FR)[bass]:'',be=bn?'/'+(bn.flat?ENb:EN)[bass]:'';
     return{root,flat,sfx,pcs,req,rf,bass,fr:rf+(sfx?' '+sfx:'')+bf,en:re+sfx+be,min:power?3:4};
    }

    function roman(tok,tonic){
     const m=tok.match(/^([b#]?)(VII|VI|IV|V|III|II|I|vii|vi|iv|v|iii|ii|i)(.*)$/);if(!m)return null;
     const up=m[2]===m[2].toUpperCase(),deg={i:0,ii:2,iii:4,iv:5,v:7,vi:9,vii:11}[m[2].toLowerCase()];
     const pc=(tonic+deg+(m[1]==='b'?-1:m[1]==='#'?1:0)+12)%12;
     const sfx=up?m[3]:((/^(dim|m7b5)/.test(m[3])?'':'m')+m[3]);
     return((m[1]==='b'||[1,3,5,8,10].includes(tonic))?FRb:FR)[pc]+sfx;
    }

    function stdSet(p){
     const S=new Set();if(!TUN[TI].s||p.bass!==null)return S;
     const sh=(OPEN[0]-4+12)%12,cv=s=>[...s].map(c=>c==='x'?-1:+c);
     const od=OD[EN[(p.root-sh+12)%12]+p.sfx];if(od)S.add(cv(od).join(','));
     [['e',0],['a',1]].forEach(([k,i])=>{const sp=SH[k][p.sfx];if(!sp)return;const r=(p.root-OPEN[i]+12)%12;S.add(cv(sp).map(f=>f<0?-1:f+r).join(','))});
     return S;
    }

    const cache={};
    function voicings(p){
     const key=TI+'|'+CAPO+'|'+p.root+'|'+p.sfx+'|'+p.bass;if(cache[key])return cache[key];
     const set=new Set(p.pcs),out=new Map(),std=stdSet(p),bp=p.bass!==null?p.bass:p.root;
     for(let b=0;b<=12;b++){
      const lo=b===0?1:b,opts=[];
      for(let s=0;s<6;s++){const o=[-1];if(b===0&&set.has(OPEN[s]))o.push(0);
       for(let f=lo;f<lo+4;f++)if(set.has((OPEN[s]+f)%12))o.push(f);opts.push(o)}
      const c=[];
      (function rec(s){
       if(s<6){for(const f of opts[s]){c[s]=f;rec(s+1)}return}
       const pl=c.map((f,i)=>f>=0?i:-1).filter(i=>i>=0);if(!pl.length)return;
       const a=pl[0],z=pl[pl.length-1];if(z-a+1!==pl.length||pl.length<p.min)return;
       const bassOk=(OPEN[a]+c[a])%12===bp;if(!bassOk&&(p.bass!==null||!TUN[TI].o))return;
       const got=new Set(pl.map(i=>(OPEN[i]+c[i])%12));
       for(const x of p.req)if(!got.has(x))return;
       const fr=pl.filter(i=>c[i]>0),opens=pl.length-fr.length;
       if(b===0&&!opens)return;
       if(p.min===3&&opens&&c[a]!==0)return;
       if(b>0&&Math.min(...fr.map(i=>c[i]))!==b)return;
       let fingers=fr.length,barre=null;
       if(fr.length){const mn=Math.min(...fr.map(i=>c[i])),bs=fr.filter(i=>c[i]===mn);
        if(bs.length>=2&&bs[bs.length-1]-bs[0]>=2){let ok=true;for(let i=bs[0];i<=bs[bs.length-1];i++)if(c[i]<mn)ok=false;
         if(ok){barre={f:mn,a:bs[0],b:bs[bs.length-1]};fingers=1+fr.filter(i=>c[i]>mn).length}}}
       if(fingers>4)return;
       const k=c.join(','),isStd=std.has(k);
       if(!out.has(k))out.set(k,{f:[...c],barre,std:isStd,score:b*2.5+fingers*1.2-(p.min===3?(pl.length===3?3:1.5):pl.length*1.3)-opens*.6+(barre&&p.min!==3?1:0)-(isStd?12:0)+(bassOk?0:1.5),pos:fr.length?Math.min(...fr.map(i=>c[i])):0});
      })(0);
     }
     const kept=[];
     for(const v of [...out.values()].sort((x,y)=>x.score-y.score)){
      if(p.min!==3&&kept.some(k=>v.f.every((f,i)=>f<0||f===k.f[i])))continue;
      kept.push(v);if(kept.length===8)break;
     }
     return cache[key]=kept;
    }
    function vFor(p,t){const a=TI;TI=t;setOpen();const r=voicings(p);TI=a;setOpen();return r}

    function fing(v){
     const f=v.f,out=[0,0,0,0,0,0],idx=[];f.forEach((x,i)=>{if(x>0)idx.push(i)});
     if(!idx.length)return out;
     const mn=Math.min(...idx.map(i=>f[i])),hb=!!v.barre,sh=(!hb&&f.includes(0)&&mn>=2)?1:0;
     let n=hb?1:0;
     if(hb)idx.forEach(i=>{if(f[i]===v.barre.f&&i>=v.barre.a&&i<=v.barre.b)out[i]=1});
     idx.filter(i=>!out[i]).sort((a,b)=>f[a]-f[b]||a-b).forEach(i=>{n=Math.max(n+1,f[i]-mn+1+sh);out[i]=Math.min(n,4)});
     return out;
    }

    function svg(v){
     const pl=v.f.filter(x=>x>0),mx=Math.max(0,...pl),mn=pl.length?Math.min(...pl):1,base=mx>4?mn:1,fg=fing(v);
     const X=i=>18+i*13,Y=r=>28+r*20,cy=f=>Y(f-base)+10;
     const tx=(x,y,t)=>`<text x="${x}" y="${y+3}" text-anchor="middle" font-size="8" font-weight="700" fill="var(--gc-dotink)" stroke="none">${t}</text>`;
     let s='<svg viewBox="0 0 100 114" aria-hidden="true" stroke="currentColor" fill="none">';
     for(let r=0;r<=4;r++)s+=`<line x1="${X(0)}" x2="${X(5)}" y1="${Y(r)}" y2="${Y(r)}" stroke-width="${r===0&&base===1?3:1}" opacity="${r===0&&base===1?1:.45}"/>`;
     for(let i=0;i<6;i++)s+=`<line x1="${X(i)}" x2="${X(i)}" y1="${Y(0)}" y2="${Y(4)}" stroke-width="1" opacity=".7"/>`;
     v.f.forEach((f,i)=>{
      if(f<0)s+=`<path d="M${X(i)-3.5} 11l7 7m0-7l-7 7" stroke-width="1.6"/>`;
      else if(f===0)s+=`<circle cx="${X(i)}" cy="14.5" r="3.6" stroke-width="1.4"/>`;
      else if(!(v.barre&&f===v.barre.f&&i>=v.barre.a&&i<=v.barre.b))s+=`<circle cx="${X(i)}" cy="${cy(f)}" r="5.2" fill="var(--gc-dot)" stroke="none"/>`+(fg[i]?tx(X(i),cy(f),fg[i]):'');
     });
     if(v.barre)s+=`<rect x="${X(v.barre.a)-5.2}" y="${cy(v.barre.f)-5.2}" width="${X(v.barre.b)-X(v.barre.a)+10.4}" height="10.4" rx="5.2" fill="var(--gc-dot)" stroke="none"/>`+tx(X(v.barre.a),cy(v.barre.f),1);
     if(base>1)s+=`<text x="2" y="${cy(base)+4}" font-size="11" fill="currentColor" stroke="none" opacity=".8">${base}</text>`;
     return s+'</svg>';
    }

    let prog=[],cur=null,edit=-1,style='',suiteVis=false,ft;
    try{prog=JSON.parse(localStorage.getItem('gc_prog')||'[]');CAPO=+localStorage.getItem('gc_capo')||0;setOpen()}catch(e){}
    const save=()=>{try{localStorage.setItem('gc_prog',JSON.stringify(prog));localStorage.setItem('gc_capo',CAPO)}catch(e){}};
    function flash(m){const e=$('#gc-tm');if(!e)return;e.textContent=m;clearTimeout(ft);ft=setTimeout(()=>{e.textContent=''},6000)}
    const item=(p,v,t)=>({fr:p.fr,en:p.en,f:v.f,barre:v.barre,t:t});

    function showSearch(){
     const val=$('#gc-q').value,S=STYLES[style];cur=parse(val);$('#gc-x').hidden=!val;
     $('#gc-sd').hidden=!S;if(S)$('#gc-sd').textContent=S.d+' (repère courant, pas une règle)';
     $('#gc-roots').innerHTML=FR.map((n,i)=>`<button type="button" class="gc-chip${cur&&cur.root===i?' on':''}" data-r="${i}">${n}<small>${EN[i]}</small></button>`).join('');
     const chips=$('#gc-chips'),res=$('#gc-res');
     showPg();
     if(!cur){chips.innerHTML='';res.innerHTML=val.trim()?'<p class="gc-note">Accord non reconnu. Exemples : Do, Ré7, Mi9m, A, Em, F#m7, Do/Sol.</p>':'<p class="gc-empty">Choisis une note ou tape un accord pour voir ses positions.</p>';return}
     chips.innerHTML=(S?S.q:QS).map(q=>`<button type="button" class="gc-chip${q===cur.sfx?' on':''}" data-q="${q}">${cur.rf}${q?' '+q:''}</button>`).join('');
     const vs=voicings(cur),tones=cur.pcs.filter(x=>x!==cur.root),nf=x=>(cur.flat?FRb:FR)[x];
     res.innerHTML=`<div class="gc-hd"><div class="gc-nm">${cur.fr}<small>${cur.en}</small></div>${tones.length?`<select id="gc-bs" aria-label="Basse"><option value="">Basse : fondamentale</option>${tones.map(x=>`<option value="${x}"${x===cur.bass?' selected':''}>Basse : ${nf(x)}</option>`).join('')}</select>`:''}</div>`+
      (CAPO?`<p class="gc-mut">Capo case ${CAPO} : les cases sont comptées à partir du capo.</p>`:'')+
      (edit>=0?`<p class="gc-note">Choisis la position qui remplacera l’accord n°${edit+1} de ta suite.</p>`:'')+
      (vs.length?`<div class="gc-grid">${vs.map((v,i)=>`<button type="button" class="gc-v" data-i="${i}" aria-label="Ajouter ${cur.fr}, position ${i+1}">${v.std?'<i title="Forme classique">★</i>':''}${svg(v)}<b>${v.pos?'Case '+v.pos:'Position ouverte'}</b><span>${edit>=0?'Remplacer':'Ajouter'}</span></button>`).join('')}</div>${vs.some(v=>v.std)?'<p class="gc-mut">★ forme classique. Les chiffres indiquent les doigts proposés (1 = index).</p>':'<p class="gc-mut">Les chiffres indiquent les doigts proposés (1 = index).</p>'}`:'<p class="gc-empty">Aucune position trouvée pour cet accord dans cet accordage.</p>');
    }

    function showPg(){
     const S=STYLES[style],list=PR[style]||PR[''],tn=+$('#gc-tn').value;
     $('#gc-pgt').innerHTML='<i class="fas fa-layer-group"></i> Progressions types'+(S?' ('+S.n+')':'');
     $('#gc-pgl').innerHTML=list.map((p,i)=>{const t=p[1].split(' ');return`<div class="gc-pr"><div><b>${p[0]}</b><span>${t.join(' – ')}</span><span>${t.map(x=>roman(x,tn)).join(' – ')}</span></div><button type="button" class="gc-btn" data-p="${i}">Ajouter</button></div>`}).join('');
    }

    function showProg(){
     $('#gc-empty').hidden=!prog.length;$('#gc-tb').hidden=!prog.length;
     $('#gc-ci').textContent=CAPO?'Capo case '+CAPO:'';
     $('#gc-prog').innerHTML=prog.length?prog.map((c,i)=>`<div class="gc-v${i===edit?' ed':''}" data-e="${i}" tabindex="0" role="button" aria-label="Modifier ${c.fr}">${svg(c)}<b>${c.fr}</b><span>${c.en}${c.t?' ('+TUN[c.t].k+')':''}</span><button type="button" class="gc-rm" data-d="${i}" aria-label="Retirer ${c.fr}">×</button></div>`).join(''):'<p class="gc-empty">Ajoute des accords depuis les résultats ou les progressions : ils s’afficheront ici, dans l’ordre.</p>';
     showBar();
    }

    function showBar(){
     const b=$('#gc-bar');if(!b)return;
     const maoView=document.getElementById('view-mao');
     const inMaoView=maoView?maoView.classList.contains('active-view'):true;
     b.hidden=!prog.length||suiteVis||!inMaoView;
     b.innerHTML=`<button type="button" aria-label="Voir ma suite d’accords"><b>${prog.length}</b><span>${prog.map(c=>c.fr).join(', ')}</span>↓</button>`;
    }

    function revoice(fn,msg){
     const miss=[];
     prog=prog.map(it=>{const p=parse(fn(it)),vs=p?vFor(p,it.t||0):[];if(!vs.length){miss.push(it.fr);return it}return item(p,vs[0],it.t||0)});
     save();showProg();showSearch();
     flash(miss.length?'Aucune position pour : '+miss.join(', ')+' (accord laissé tel quel).':msg);
    }
    function shift(it,n){const p=parse(it.en),L=n<0?ENb:EN;return L[(p.root+n+12)%12]+p.sfx+(p.bass!==null?'/'+L[(p.bass+n+12)%12]:'')}

    const g={};for(const[k,s]of Object.entries(STYLES)){(g[s.g]=g[s.g]||[]).push(`<option value="${k}">${s.n}</option>`)}
    $('#gc-st').innerHTML='<option value="">Tous les styles</option>'+Object.entries(g).map(([n,o])=>`<optgroup label="${n}">${o.join('')}</optgroup>`).join('');
    $('#gc-tu').innerHTML=TUN.map((t,i)=>`<option value="${i}">${t.n}</option>`).join('');
    $('#gc-cp').innerHTML='<option value="0">Aucun</option>'+[1,2,3,4,5,6,7,8,9].map(i=>`<option value="${i}">${i}</option>`).join('');$('#gc-cp').value=CAPO;
    $('#gc-tn').innerHTML=TON.map(([n,pc])=>`<option value="${pc}">${n} (${TE[pc]})</option>`).join('');

    $('#gc-st').onchange=e=>{style=e.target.value;showSearch()};
    $('#gc-tu').onchange=e=>{TI=+e.target.value;setOpen();showSearch()};
    $('#gc-cp').onchange=e=>{CAPO=+e.target.value;setOpen();revoice(it=>it.en,CAPO?'Suite recalculée pour un capo case '+CAPO+'.':'Suite recalculée sans capo.')};
    $('#gc-tn').onchange=showPg;
    $('#gc-dn').onclick=()=>revoice(it=>shift(it,-1),'Suite transposée de − ½ ton (position la plus classique choisie).');
    $('#gc-up').onclick=()=>revoice(it=>shift(it,1),'Suite transposée de + ½ ton (position la plus classique choisie).');
    $('#gc-q').addEventListener('input',()=>{edit=-1;showProg();showSearch()});
    $('#gc-x').onclick=()=>{$('#gc-q').value='';edit=-1;showProg();showSearch();$('#gc-q').focus()};
    $('#gc-roots').onclick=e=>{const b=e.target.closest('.gc-chip');if(!b)return;
     $('#gc-q').value=FR[+b.dataset.r]+(cur?cur.sfx:(STYLES[style]?STYLES[style].q[0]:''));showSearch()};
    $('#gc-chips').onclick=e=>{const b=e.target.closest('.gc-chip');if(!b||!cur)return;$('#gc-q').value=cur.rf+b.dataset.q;showSearch()};
    $('#gc-res').onchange=e=>{if(e.target.id!=='gc-bs'||!cur)return;const v=e.target.value;
     $('#gc-q').value=cur.rf+cur.sfx+(v===''?'':'/'+(cur.flat?FRb:FR)[+v]);showSearch()};
    $('#gc-res').onclick=e=>{
     const b=e.target.closest('.gc-v');if(!b||!cur)return;
     const it=item(cur,voicings(cur)[+b.dataset.i],TI);
     if(edit>=0){prog[edit]=it;edit=-1}else prog.push(it);
     save();showProg();showSearch();
    };
    $('#gc-pgl').onclick=e=>{
     const b=e.target.closest('[data-p]');if(!b)return;
     const tn=+$('#gc-tn').value,miss=[],added=[];
     (PR[style]||PR['']) [+b.dataset.p][1].split(' ').forEach(t=>{
      const p=parse(roman(t,tn)||''),v=p&&voicings(p)[0];
      if(!v){miss.push(t);return}prog.push(item(p,v,TI));added.push(p.fr)});
     save();showProg();showSearch();
     flash(miss.length?'Aucune position pour : '+miss.join(', ')+'.':'Ajouté à ta suite : '+added.join(', ')+'.');
    };
    $('#gc-prog').onclick=e=>{
     const d=e.target.closest('[data-d]');
     if(d){prog.splice(+d.dataset.d,1);edit=-1;save();showProg();showSearch();return}
     const c=e.target.closest('[data-e]');if(!c)return;
     edit=+c.dataset.e;TI=prog[edit].t||0;setOpen();$('#gc-tu').value=TI;$('#gc-q').value=prog[edit].en;
     showProg();showSearch();$('#gc-q').scrollIntoView({behavior:'smooth',block:'start'});
    };
    $('#gc-prog').onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&e.target.dataset.e!==undefined){e.preventDefault();e.target.click()}};
    $('#gc-empty').onclick=()=>{prog=[];edit=-1;save();showProg();showSearch()};
    if($('#gc-bar'))$('#gc-bar').onclick=()=>$('#gc-suite').scrollIntoView({behavior:'smooth',block:'start'});

    if('IntersectionObserver' in window){
        new IntersectionObserver(([e])=>{suiteVis=e.isIntersecting;showBar()}).observe($('#gc-suite'));
    }
    const maoView=document.getElementById('view-mao');
    if(maoView && 'MutationObserver' in window){
        new MutationObserver(()=>showBar()).observe(maoView,{attributes:true,attributeFilter:['class']});
    }

    showProg();
    showSearch();
});
