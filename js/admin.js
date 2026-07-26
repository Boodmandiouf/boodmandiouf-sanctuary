/**
 * ==========================================================================
 * BOODMANDIOUF SANCTUARY - CENTRAL CORE SYSTEM (ADMIN)
 * ==========================================================================
 */

// Variables d'état globales pour le Music Vault
let activeFilters = [];
let currentSearchQuery = '';

document.addEventListener("DOMContentLoaded", () => {
    // Application préventive du thème sur le body dès le chargement
    const savedTheme = localStorage.getItem("sanctuary_theme") || localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        updateSwitchIcon(true);
    }

    // Initialisation des modules d'administration
    initNetworkMonitoring();
    initKernelLogs();
    setupLogbook();
    initVisitCounter();
    
    // Initialisation du Music Vault si les données existent
    if (typeof musicResources !== 'undefined') {
        renderMusicResources(musicResources);
    }

    // --- GESTION DE LA RECHERCHE & DES FILTRES MUSIC VAULT ---
    const searchInput = document.getElementById('musicSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase();
            filterAndRenderMusic();
        });
    }

    // Gestion des boutons de filtres multiples (chips)
    const filterButtons = document.querySelectorAll('.filter-btn:not(.action-reset)');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterValue = e.target.getAttribute('data-filter');

            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active');
                activeFilters = activeFilters.filter(f => f !== filterValue);
            } else {
                e.target.classList.add('active');
                activeFilters.push(filterValue);
            }

            filterAndRenderMusic();
        });
    });

    // Bouton "Tout Effacer" pour les filtres
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            activeFilters = [];
            filterButtons.forEach(b => b.classList.remove('active'));
            filterAndRenderMusic();
        });
    }

    // --- GESTION DU FORMULAIRE D'AJOUT DE RESSOURCE ---
    const addForm = document.getElementById('addMusicForm');
    if (addForm) {
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('newTitle').value.trim();
            const category = document.getElementById('newCategory').value;
            const url = document.getElementById('newUrl').value.trim();
            const description = document.getElementById('newDesc').value.trim();

            if (title && category && url) {
                // Appel de la fonction d'ajout globale (définie dans music-data.js)
                if (typeof addMusicResource === 'function') {
                    addMusicResource(title, category, url, description || "Aucune description.");
                }
                
                // Réinitialisation du formulaire
                addForm.reset();
                
                // Log visuel de confirmation
                if (typeof pushLog === 'function') {
                    pushLog('info', `MUSIC_VAULT: Nouvelle entrée injectée -> "${title}"`);
                }
            }
        });
    }
});

// 1. SIMULATION DU GRAPH DE MONITORING RÉSEAU (CANVAS)
function initNetworkMonitoring() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const fpsCounter = document.getElementById('fps-counter');

    function resizeCanvas() {
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

// 2. LOGS IMMERSIFS DU NOYAU (KERNEL LOGS FEED COMPLET)
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

// 4. COMPTEUR DE VISITES - API MOECOUNTER
function initVisitCounter() {
    const counterElement = document.getElementById('visit-count');
    const hostStatusContainer = document.getElementById('host-status-container');
    const name = "boodmandiouf_sanctuary";

    fetch(`https://api.moecounter.org/get/${name}/views`)
        .then(res => res.json())
        .then(data => {
            const count = data.value !== undefined ? data.value : "ONLINE";
            if (counterElement) {
                counterElement.innerText = count;
                counterElement.style.color = "#00ff66";
            }
            pushLog('info', `TELEMETRY: Metric [VAULT_VISITS] synced: ${count}`);
        })
        .catch(() => {
            if (hostStatusContainer) {
                hostStatusContainer.innerHTML = `<span><i class="fas fa-server"></i> HOST_STATUS</span> <span id="host-status-led" class="status-online"></span> ONLINE`;
            }
            if (counterElement) {
                counterElement.innerText = "9,854";
                counterElement.style.color = "#26de81";
            }
            pushLog('warn', 'TELEMETRY: Failed to fetch online visit-count API. Fallback data engaged.');
        });
}

// 5. GESTION DU COMMUTATEUR DE THÈME
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

// Fonction globale accessible pour réveiller les scripts après déchiffrement
window.loadAdminScripts = function() {
    initNetworkMonitoring();
    initKernelLogs();
    setupLogbook();
    initVisitCounter();
    setInterval(initVisitCounter, 10000);
};

// Fonction pour changer d'onglet dans l'admin
function switchTab(tabName) {
    document.querySelectorAll('.admin-view').forEach(view => view.classList.remove('active-view'));
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));

    if (tabName === 'dashboard') {
        document.getElementById('view-dashboard').classList.add('active-view');
        document.getElementById('btn-dashboard').classList.add('active');
    } else if (tabName === 'music') {
        document.getElementById('view-music').classList.add('active-view');
        document.getElementById('btn-music').classList.add('active');
        if (typeof musicResources !== 'undefined') {
            filterAndRenderMusic();
        }
    }
}

// Fonction pour afficher les cartes dans la grille
function renderMusicResources(items) {
    const grid = document.getElementById('musicGrid');
    if (!grid) return;
    
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

// Fonction globale pour filtrer et afficher (Multi-sélection & Recherche)
function filterAndRenderMusic() {
    if (typeof musicResources === 'undefined') return;
    
    let filtered = musicResources;

    // 1. Filtrer par catégories multiples actives
    if (activeFilters.length > 0) {
        filtered = filtered.filter(item => {
            return activeFilters.some(filter => 
                item.category === filter || item.category.startsWith(filter + ' -')
            );
        });
    }

    // 2. Filtrer par texte de recherche
    if (currentSearchQuery !== '') {
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(currentSearchQuery) || 
            item.category.toLowerCase().includes(currentSearchQuery) ||
            item.description.toLowerCase().includes(currentSearchQuery)
        );
    }

    renderMusicResources(filtered);
}

// Fonction pour télécharger automatiquement le fichier music-data.js mis à jour
function exportMusicDataFile() {
    if (typeof musicResources === 'undefined') return;

    // Construction du contenu du fichier JavaScript
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

    // Création d'un lien virtuel de téléchargement
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