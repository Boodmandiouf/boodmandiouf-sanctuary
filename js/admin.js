/**
 * ==========================================================================
 * BOODMANDIOUF SANCTUARY - CENTRAL CORE SYSTEM (ADMIN)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // Application préventive du thème sur le body dès le chargement
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    // Initialisation des modules d'administration
    initNetworkMonitoring();
    initKernelLogs();
    setupLogbook();
    initVisitCounter();
    updateThemeIcon(); // Aligne l'icône si le panneau est déjà présent
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

    // Routine de démarrage intense
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

    // Flux continu ultra-rapide (toutes les 3.5 secondes) pour faire vivre le panel de logs
    setInterval(() => {
        const liveMsgs = [
            { type: 'info', msg: 'Gateway health-check: 200 OK (latency: 14ms).' },
            { type: 'info', msg: 'Synchronizing DOM style variables with active theme.' },
            { type: 'warn', msg: 'Minor latency detected on media assets pipeline.' },
            { type: 'info', msg: 'Clearing idle websocket connections...' },
            { type: 'info', msg: 'Ping token sent to master node. Pong received (Oms).' },
            { type: 'warn', msg: 'Sub-routine [crypto-check] reports high memory utilization.' },
            { type: 'info', msg: 'Flushing standard output buffers.' },
            { type: 'info', msg: 'Indexed static routes successfully.' },
            { type: 'crit', msg: 'Failsafe watchdogs active. Zero anomalies detected.' }
        ];
        const picked = liveMsgs[Math.floor(Math.random() * liveMsgs.length)];
        pushLog(picked.type, picked.msg);
    }, 3500);
}

// Fonction centrale pour injecter une ligne de log formatée
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
        
        // Simulations de réponses de logs suite aux boutons cliqués
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

// 4. COMPTEUR DE VISITES - LIEN DIRECT ET SÉCURISÉ VERS L'API TEXTE
function initVisitCounter() {
    const counterElement = document.getElementById('visit-count');
    const hostStatusContainer = document.getElementById('host-status-container');
    const name = "boodmandiouf_sanctuary";

    // Utilisation de l'API JSON de MoeCounter pour extraire proprement le nombre
    fetch(`https://api.moecounter.org/get/${name}/views`)
        .then(res => res.json())
        .then(data => {
            const count = data.value !== undefined ? data.value : "ONLINE";
            if (counterElement) {
                counterElement.innerText = count;
                counterElement.style.color = "#00ff66"; // Vert néon pour le chiffre
            }
            pushLog('info', `TELEMETRY: Metric [VAULT_VISITS] synced: ${count}`);
        })
        .catch(() => {
            // Failsafe en cas de problème réseau ou API
            if (hostStatusContainer) {
                hostStatusContainer.innerHTML = `<span><i class="fas fa-server"></i> HOST_STATUS</span> <span id="host-status-led" class="status-online"></span> ONLINE`;
            }
            if (counterElement) {
                counterElement.innerText = "9,854"; // Chiffre d'ambiance simulé si l'API externe bloque
                counterElement.style.color = "#26de81";
            }
            pushLog('warn', 'TELEMETRY: Failed to fetch online visit-count API. Fallback data engaged.');
        });
}

// ==========================================================================
// 5. GESTION DU COMMUTATEUR DE THÈME CORRIGÉ
// ==========================================================================
function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    
    localStorage.setItem("theme", isLight ? "light" : "dark"); 
    updateThemeIcon();
    pushLog('info', `THEME_ENGINE: ${isLight ? 'Light' : 'Matrix/Dark'} theme applied successfully.`);
}

function updateThemeIcon() {
    const themeIcon = document.getElementById("theme-icon");
    if (!themeIcon) return;
    
    if (document.body.classList.contains("light-mode")) {
        themeIcon.className = "fas fa-moon";
    } else {
        themeIcon.className = "fas fa-sun";
    }
}

// Fonction globale accessible à l'injection pour réveiller les scripts après déchiffrement
window.loadAdminScripts = function() {
    initNetworkMonitoring();
    initKernelLogs();
    setupLogbook();
    initVisitCounter();
    updateThemeIcon();
    setInterval(initVisitCounter, 10000);
};