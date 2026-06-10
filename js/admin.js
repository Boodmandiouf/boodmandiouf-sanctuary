/**
 * ==========================================================================
 * BOODMANDIOUF SANCTUARY - CENTRAL CORE SYSTEM (ADMIN)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialisation des modules d'administration
    initNetworkMonitoring();
    initKernelLogs();
    setupLogbook();
    loadMockVisits();
});

// 1. SIMULATION DU GRAPH DE MONITORING RÉSEAU (CANVAS)
function initNetworkMonitoring() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const fpsCounter = document.getElementById('fps-counter');

    // Ajustement de la résolution interne
    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || 150;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let offset = 0;
    function drawGraph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessin de la grille cyber de fond
        ctx.strokeStyle = 'rgba(223, 22, 43, 0.03)';
        ctx.lineWidth = 1;
        const gridSize = 20;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // Onde réseau 1 (Principale - Rouge Accent)
        ctx.beginPath();
        ctx.strokeStyle = '#df162b';
        ctx.lineWidth = 2;
        for (let i = 0; i < canvas.width; i++) {
            const y = canvas.height / 2 + 
                      Math.sin(i * 0.015 + offset) * 20 + 
                      Math.cos(i * 0.03 - offset) * 10;
            if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y);
        }
        ctx.stroke();

        // Onde réseau 2 (Secondaire - Vert Matrice)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 255, 102, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i++) {
            const y = canvas.height / 2 + 
                      Math.sin(i * 0.02 - offset) * 15 + 
                      Math.cos(i * 0.01 + offset) * 5;
            if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y);
        }
        ctx.stroke();

        offset += 0.05;
        if (fpsCounter) {
            fpsCounter.innerText = `GRID: ACTIVE // LATENCY: ${(Math.random() * 12 + 18).toFixed(1)}ms`;
        }
        requestAnimationFrame(drawGraph);
    }
    drawGraph();
}

// 2. DISPATCHER DE KERNEL LOGS DYNAMIQUES
function initKernelLogs() {
    const logFeed = document.getElementById('logFeed');
    if (!logFeed) return;

    const phrases = [
        { text: "CORE::KERNEL_LOADED... successfully initiated.", type: "info" },
        { text: "HANDSHAKE::TLS_V1.3 established with GitHub Pages Proxy.", type: "info" },
        { text: "SECURITY::CHECKING Jeton Cryptographique Integrity...", type: "info" },
        { text: "SYSTEM::STATUS operational. Core v2.4.0 running.", type: "info" },
        { text: "CACHE::Checking filesystem descriptors status...", type: "info" },
        { text: "DB_ROUTER::Simulated JSON configurations modules ready.", type: "info" },
        { text: "WARNING::API_GATEWAY minor delay detected on SoundCloud proxy fetch.", type: "warn" },
        { text: "NET_FLOW::Archipelago tracking node synced successfully.", type: "info" },
        { text: "OVERRIDE::Central Core monitoring hooks active.", type: "danger" }
    ];

    function pushLog(text, type = "info") {
        const time = new Date().toLocaleTimeString();
        const logItem = document.createElement('div');
        logItem.className = 'log-item';
        
        let colorClass = '';
        if (type === 'warn') colorClass = 'log-warning';
        if (type === 'danger') colorClass = 'log-danger';

        logItem.innerHTML = `<span class="log-time">[${time}]</span><span class="${colorClass}">${text}</span>`;
        logFeed.appendChild(logItem);
        logFeed.scrollTop = logFeed.scrollHeight;

        // On garde uniquement les 30 derniers logs pour les performances
        if (logFeed.children.length > 30) {
            logFeed.removeChild(logFeed.firstChild);
        }
    }

    // Premier chargement massif
    phrases.slice(0, 5).forEach((p, idx) => {
        setTimeout(() => pushLog(p.text, p.type), idx * 400);
    });

    // Flux de logs infini
    setInterval(() => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        pushLog(randomPhrase.text, randomPhrase.type);
    }, 4500);

    window.systemPushLog = pushLog; // Export global pour interactions externes
}

// 3. LOGBOOK (WORKFLOW) LOCALSTORAGE BINDING
function setupLogbook() {
    const textarea = document.getElementById('admin-notes');
    if (!textarea) return;

    // Récupération de la note sauvegardée
    const savedNotes = localStorage.getItem('stemon_admin_notes');
    if (savedNotes) textarea.value = savedNotes;

    // Sauvegarde en continu
    textarea.addEventListener('input', (e) => {
        localStorage.setItem('stemon_admin_notes', e.target.value);
    });
}

function clearNotes() {
    const textarea = document.getElementById('admin-notes');
    if (textarea) {
        textarea.value = '';
        localStorage.removeItem('stemon_admin_notes');
        if (window.systemPushLog) window.systemPushLog("WORKFLOW_LOGBOOK cleared manually by terminal administrator.", "warn");
    }
}

// 4. COMPTEUR DE VISITES SIMULÉ
function loadMockVisits() {
    const counter = document.getElementById('visit-count');
    if (!counter) return;
    
    let currentVisits = parseInt(localStorage.getItem('stemon_core_visits')) || 1042;
    currentVisits += 1;
    localStorage.setItem('stemon_core_visits', currentVisits);
    
    counter.innerText = `${currentVisits} CONNECTIONS`;
}

// 5. ACTIONS DIRECTES TERMINAL
function triggerAction(actionType) {
    if (!window.systemPushLog) return;
    
    switch (actionType) {
        case 'PURGE_CACHE':
            window.systemPushLog("EXEC::PURGE_CACHE executing... Flushing browser buffers.", "warn");
            setTimeout(() => {
                window.systemPushLog("EXEC::PURGE_CACHE -> SUCCESS. Buffers are clear.", "info");
                alert("Cache système nettoyé avec succès !");
            }, 1000);
            break;
            
        case 'EMERGENCY_LOCK':
            window.systemPushLog("CRITICAL::EMERGENCY_LOCK TRIGGERED. LockDown activated.", "danger");
            setTimeout(() => {
                location.reload(); // Re-verrouille la session via ton script.js existant
            }, 800);
            break;
            
        default:
            window.systemPushLog(`EXEC::UNKNOWN_DIRECTIVE [${actionType}]`, "warn");
    }
}
        /* ==========================================================================
           CONTENU DE LA ZONE ADMIN CHIFFRÉ EN AES
           Remplace la chaîne ci-dessous par ton code HTML d'administration chiffré.
           ========================================================================== */
       /* const ENCRYPTED_VAULT_DATA = "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";

        function unlockVault() {
    const password = document.getElementById('vault-key').value;
    const errorBox = document.getElementById('error-box');
    
    if (!password) return;

    try {
        // Tentative de déchiffrement de la chaîne brute
        const decrypted = CryptoJS.AES.decrypt(ENCRYPTED_VAULT_DATA, password);
        const decryptedHTML = decrypted.toString(CryptoJS.enc.Utf8);

        // Analyse du résultat obtenu
        if (decryptedHTML && decryptedHTML.trim().startsWith("<")) {
            // SUCCESS : Tout concorde !
            errorBox.style.display = 'none';
            document.getElementById('auth-screen').style.display = 'none';
            
            const slot = document.getElementById('admin-vault-slot');
            slot.innerHTML = decryptedHTML;
            slot.style.display = 'block';

            loadAdminScripts();
        } else {
            // Le mot de passe n'a pas réussi à décoder le HTML en texte lisible
            console.warn("Déchiffrement échoué : Clé incorrecte ou format corrompu.");
            showError();
        }
    } catch (e) {
        console.error("Erreur critique lors du traitement cryptographique :", e);
        showError();
    }
}

        function showError() {
            const errorBox = document.getElementById('error-box');
            errorBox.style.display = 'block';
        }

        function loadAdminScripts() {
            // Création et injection asynchrone du fichier de scripts d'administration
            const script = document.createElement('script');
            script.src = 'js/admin.js';
            script.async = true;
            document.body.appendChild(script);
        }

        // Synchronisation native avec le mode Light/Dark existant du site
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-mode');
        }

*/
