// Niladri Pal Portfolio - Tab-by-Tab Controller & 3D Interactive Cybernetic Engine
// Color Grading: Obsidian Void, Prismatic Titanium, Luminous Electric Azure & Amethyst Violet

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Custom Precision Cursor
  initCustomCursor();

  // 2. Initialize 3D Cybernetic Avatar
  let avatar3D = null;
  if (document.getElementById("three-avatar-viewport")) {
    avatar3D = new Avatar3DExperience("three-avatar-viewport");
    window.avatar3DInstance = avatar3D;
  }

  // 3. Render Dynamic Content Synchronized with Official Resume
  renderProjects();
  renderSkills();
  renderExperience();

  // 4. Setup Tab Navigation System
  setupTabSystem(avatar3D);

  // 5. Setup Avatar Controls
  setupAvatarControls(avatar3D);

  // 6. Setup Unified Sound Engine & Auto-Welcome On Entry
  setupSoundAndWelcomeSystem();

  // 7. Setup Interactive Modals & Actions
  setupCaseStudyModal();
  setupResumeActions();
  setupContactConsole();
});

// ========================================================
// UNIFIED SOUND & VOICE SYSTEM (WEB AUDIO API + SPEECH SYNTHESIS)
// ========================================================
let audioCtx = null;
let soundEnabled = true;
let speechPlayed = false;
let activeChimeTimers = [];
let cachedVoices = [];
let currentUtterance = null;

// Initialize sound preference from localStorage
try {
  const savedSound = localStorage.getItem("np_portfolio_sound_enabled");
  if (savedSound !== null) {
    soundEnabled = savedSound === "true";
  }
} catch (e) {
  soundEnabled = true;
}

// Pre-fetch speech voices asynchronously
function preloadVoices() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    cachedVoices = window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }
}
preloadVoices();

// Safe AudioContext getter & un-suspender
function getAudioContext() {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
  } catch (e) {}
  return audioCtx;
}

// Global short SFX trigger
window.triggerSfx = (freq = 800, duration = 0.06) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * 0.5), ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
};

// Global Cyber Greeting Chime
window.playCyberGreetingChime = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    // Clear any previous queued notes
    activeChimeTimers.forEach(id => clearTimeout(id));
    activeChimeTimers = [];

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      const timerId = setTimeout(() => {
        if (!soundEnabled) return;
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.045, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.28);
        } catch (err) {}
      }, idx * 55);
      activeChimeTimers.push(timerId);
    });
  } catch (e) {}
};

// Cancel all active audio and speech
function stopAllAudio() {
  activeChimeTimers.forEach(id => clearTimeout(id));
  activeChimeTimers = [];
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

// Master sound toggle function
function setSoundEnabled(enabled, triggerFeedback = true) {
  soundEnabled = enabled;
  try {
    localStorage.setItem("np_portfolio_sound_enabled", String(soundEnabled));
  } catch (e) {}

  if (!soundEnabled) {
    stopAllAudio();
  } else if (triggerFeedback) {
    getAudioContext();
    window.triggerSfx(880, 0.08);
  }

  updateSoundButtonsUI();
}

// Sync UI across all sound buttons
function updateSoundButtonsUI() {
  const toggleBtns = [
    document.getElementById("sound-fx-toggle"),
    document.getElementById("mobile-sound-toggle")
  ].filter(Boolean);

  toggleBtns.forEach(btn => {
    if (soundEnabled) {
      btn.innerHTML = `
        <span class="sound-beacon"></span>
        <span class="material-symbols-outlined text-sm text-cyan-400">volume_up</span>
        <span class="sound-status-text font-semibold">AUDIO: ON</span>
      `;
      btn.classList.remove("sound-muted");
      btn.setAttribute("title", "Sound Effects & Voice Enabled (Click to Mute)");
      btn.setAttribute("aria-label", "Mute Audio FX & Voice");
    } else {
      btn.innerHTML = `
        <span class="sound-beacon"></span>
        <span class="material-symbols-outlined text-sm text-rose-400">volume_off</span>
        <span class="sound-status-text font-medium text-slate-400">AUDIO: OFF</span>
      `;
      btn.classList.add("sound-muted");
      btn.setAttribute("title", "Sound Effects & Voice Muted (Click to Enable)");
      btn.setAttribute("aria-label", "Enable Audio FX & Voice");
    }
  });
}

// Play Welcome Voice and Chime
function playWelcomeVoice(force = false) {
  // If sound is muted and this wasn't explicitly triggered by clicking a button, exit
  if (!soundEnabled && !force) return;

  // If user clicked the button while sound was off, unmute so they can hear it
  if (force && !soundEnabled) {
    setSoundEnabled(true, false);
  }

  if (speechPlayed && !force) return;
  speechPlayed = true;

  // 1. Trigger futuristic audio chime
  window.playCyberGreetingChime();

  // 2. Web Speech API Synthesized Voice
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();

    const briefingText = "System online. Welcome to Niladri Pal's engineering portfolio. 3D avatar kinematics and neural core active. Explore interactive case studies, technical competencies, and the official verified resume.";
    const utterance = new SpeechSynthesisUtterance(briefingText);
    currentUtterance = utterance;
    utterance.rate = 1.02;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang && v.lang.startsWith("en") && (
      v.name.includes("Natural") || 
      v.name.includes("Google") || 
      v.name.includes("Online") || 
      v.name.includes("David") || 
      v.name.includes("Guy") || 
      v.name.includes("Samantha") ||
      v.name.includes("Microsoft") ||
      v.name.includes("English")
    )) || voices.find(v => v.lang && v.lang.startsWith("en"));

    if (englishVoice) utterance.voice = englishVoice;

    // Visual button indicator hooks
    const avatarVoiceBtn = document.getElementById("avatar-voice-btn");
    const heroVoiceBtn = document.getElementById("hero-voice-btn");

    utterance.onstart = () => {
      if (avatarVoiceBtn) {
        avatarVoiceBtn.classList.add("border-cyan-400", "shadow-[0_0_15px_rgba(0,229,255,0.4)]", "animate-pulse");
        avatarVoiceBtn.innerHTML = `<span class="material-symbols-outlined text-xs text-cyan-400">graphic_eq</span><span>Speaking...</span>`;
      }
      if (heroVoiceBtn) {
        heroVoiceBtn.classList.add("border-cyan-400", "text-cyan-200", "animate-pulse");
        heroVoiceBtn.innerHTML = `<span class="material-symbols-outlined text-sm text-cyan-400">graphic_eq</span><span>TRANSMITTING...</span>`;
      }
    };

    const resetVoiceButtons = () => {
      if (avatarVoiceBtn) {
        avatarVoiceBtn.classList.remove("border-cyan-400", "shadow-[0_0_15px_rgba(0,229,255,0.4)]", "animate-pulse");
        avatarVoiceBtn.innerHTML = `<span class="material-symbols-outlined text-xs">record_voice_over</span><span>Voice Briefing</span>`;
      }
      if (heroVoiceBtn) {
        heroVoiceBtn.classList.remove("border-cyan-400", "text-cyan-200", "animate-pulse");
        heroVoiceBtn.innerHTML = `<span class="material-symbols-outlined text-sm text-cyan-400">volume_up</span><span>WELCOME BRIEFING</span>`;
      }
    };

    utterance.onend = resetVoiceButtons;
    utterance.onerror = resetVoiceButtons;

    // Synchronize voice with chime completion
    setTimeout(() => {
      if (!soundEnabled) {
        resetVoiceButtons();
        return;
      }
      try {
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        resetVoiceButtons();
      }
    }, 280);
  }
}

// Setup buttons and auto welcome on arrival
function setupSoundAndWelcomeSystem() {
  updateSoundButtonsUI();

  // Attach click listener to desktop and mobile sound toggles
  const soundToggle = document.getElementById("sound-fx-toggle");
  const mobileToggle = document.getElementById("mobile-sound-toggle");

  const handleToggleClick = (e) => {
    e.preventDefault();
    setSoundEnabled(!soundEnabled);
  };

  if (soundToggle) soundToggle.addEventListener("click", handleToggleClick);
  if (mobileToggle) mobileToggle.addEventListener("click", handleToggleClick);

  // Manual Voice Briefing buttons in HUD and Hero
  const voiceBtn = document.getElementById("avatar-voice-btn");
  const heroVoiceBtn = document.getElementById("hero-voice-btn");

  if (voiceBtn) {
    voiceBtn.addEventListener("click", () => {
      playWelcomeVoice(true);
      if (window.triggerSfx) window.triggerSfx(880, 0.08);
    });
  }
  if (heroVoiceBtn) {
    heroVoiceBtn.addEventListener("click", () => {
      playWelcomeVoice(true);
      if (window.triggerSfx) window.triggerSfx(880, 0.08);
    });
  }

  // Automatically start welcome sound when someone enters the website
  triggerAutoWelcomeOnEntry();
}

function triggerAutoWelcomeOnEntry() {
  let entryTriggered = false;

  const runWelcome = () => {
    if (entryTriggered || speechPlayed) return;
    entryTriggered = true;
    cleanupArrivalTriggers();

    getAudioContext();

    setTimeout(() => {
      playWelcomeVoice(false);
    }, 400);
  };

  // Immediate attempt when DOM/Page is ready
  if (document.readyState === "complete") {
    setTimeout(runWelcome, 350);
  } else {
    window.addEventListener("load", () => {
      setTimeout(runWelcome, 350);
    }, { once: true });
  }

  // Also trigger after brief timeout from DOMContentLoaded
  setTimeout(runWelcome, 500);

  // Broad arrival events: any mouse movement, touch, scroll, or keypress instantly triggers it
  // if browser policy held back unprompted audio
  const arrivalEvents = [
    "pointermove", "mousemove", "mouseenter", "touchstart", "scroll", "wheel", "pointerdown", "click", "keydown", "focus"
  ];

  const onArrival = () => {
    runWelcome();
  };

  function cleanupArrivalTriggers() {
    arrivalEvents.forEach(evt => {
      window.removeEventListener(evt, onArrival);
    });
  }

  arrivalEvents.forEach(evt => {
    window.addEventListener(evt, onArrival, { passive: true, once: true });
  });
}

// Tab-by-Tab Navigation System
function setupTabSystem(avatar3D) {
  const allTabs = document.querySelectorAll(".tab-pane");
  const navBtns = document.querySelectorAll(".tab-nav-btn");
  const triggers = document.querySelectorAll(".tab-nav-trigger");
  const mobileMenu = document.getElementById("mobile-menu");
  let miniScenesInitialized = false;

  function switchTab(tabId) {
    if (!tabId) tabId = "home";

    allTabs.forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add("active");
      } else {
        pane.classList.remove("active");
      }
    });

    navBtns.forEach(btn => {
      if (btn.dataset.tabTarget === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }

    if (tabId === "home") {
      try {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      } catch (_) {}
    } else {
      try {
        history.replaceState(null, null, `#${tabId}`);
      } catch (_) {}
    }

    if (window.triggerSfx) window.triggerSfx(750, 0.05);

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Initialize all 5 Project 3D Mini-Models on demand
    if (tabId === "projects" && !miniScenesInitialized) {
      setTimeout(() => {
        if (document.getElementById("mini-rag-canvas")) new MiniRAGGraph("mini-rag-canvas");
        if (document.getElementById("mini-traffic-canvas")) new MiniTrafficTwin("mini-traffic-canvas");
        if (document.getElementById("mini-earth-canvas")) new MiniEarthGlobe("mini-earth-canvas");
        if (document.getElementById("mini-retail-canvas")) new MiniRetailForecast("mini-retail-canvas");
        if (document.getElementById("mini-valuation-canvas")) new MiniValuationPlane("mini-valuation-canvas");
        miniScenesInitialized = true;
      }, 150);
    }

    if (tabId === "home" && avatar3D && avatar3D.renderer && avatar3D.container) {
      setTimeout(() => {
        const w = avatar3D.container.clientWidth;
        const h = avatar3D.container.clientHeight;
        if (w > 0 && h > 0) {
          avatar3D.camera.aspect = w / h;
          avatar3D.camera.updateProjectionMatrix();
          avatar3D.renderer.setSize(w, h);
        }
      }, 100);
    }
  }

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tabTarget;
      switchTab(target);
    });
  });

  triggers.forEach(trig => {
    trig.addEventListener("click", (e) => {
      e.preventDefault();
      const target = trig.dataset.tabTarget;
      switchTab(target);
    });
  });

  const mobileToggle = document.getElementById("mobile-menu-toggle");
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Always open on the landing page ("home" / 01. AVATAR CORE) first on site entry
  switchTab("home");

  // Clear any leftover hash (such as #contact) from previous session or links
  if (window.location.hash) {
    try {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    } catch (_) {}
  }

  // Handle browser back/forward navigation
  window.addEventListener("popstate", () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && document.getElementById(`tab-${hash}`)) {
      switchTab(hash);
    } else {
      switchTab("home");
    }
  });
}

// Interactive 3D Avatar HUD Controls
function setupAvatarControls(avatar3D) {
  if (!avatar3D) return;

  const scanBtn = document.getElementById("avatar-scan-btn");
  if (scanBtn) {
    scanBtn.addEventListener("click", () => {
      avatar3D.triggerScan();
      if (window.triggerSfx) window.triggerSfx(1150, 0.12);
    });
  }

  const orbitBtn = document.getElementById("avatar-orbit-btn");
  if (orbitBtn) {
    orbitBtn.addEventListener("click", () => {
      const isOrbit = avatar3D.toggleAutoOrbit();
      orbitBtn.textContent = isOrbit ? "Manual Kinematics" : "Auto-Orbit 360°";
      orbitBtn.classList.toggle("text-cyan-300", isOrbit);
      if (window.triggerSfx) window.triggerSfx(780, 0.06);
    });
  }

  const xrayBtn = document.getElementById("avatar-xray-btn");
  if (xrayBtn) {
    xrayBtn.addEventListener("click", () => {
      const isXRay = avatar3D.toggleXRay();
      xrayBtn.textContent = isXRay ? "Armor Solid" : "X-Ray Core";
      xrayBtn.classList.toggle("text-cyan-300", isXRay);
      if (window.triggerSfx) window.triggerSfx(920, 0.08);
    });
  }

  const holoBtn = document.getElementById("avatar-holo-toggle");
  if (holoBtn) {
    holoBtn.addEventListener("click", () => {
      const isHolo = avatar3D.toggleHologram();
      holoBtn.textContent = isHolo ? "Solid Mode" : "Holo Mode";
      holoBtn.classList.toggle("text-cyan-300", isHolo);
      if (window.triggerSfx) window.triggerSfx(880, 0.06);
    });
  }

  const colorBtn = document.getElementById("avatar-color-btn");
  if (colorBtn) {
    colorBtn.addEventListener("click", () => {
      const scheme = avatar3D.cycleColorTheme();
      colorBtn.textContent = `Color: ${scheme.toUpperCase()}`;
      if (window.triggerSfx) window.triggerSfx(740, 0.06);
    });
  }
}

// Custom Precision Cursor
function initCustomCursor() {
  const dot = document.querySelector(".custom-cursor-dot");
  const ring = document.querySelector(".custom-cursor-ring");
  const ringText = ring ? ring.querySelector("span") : null;

  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function updateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(updateRing);
  }
  requestAnimationFrame(updateRing);

  document.body.addEventListener("pointerover", (e) => {
    const target = e.target.closest("button, a, .interactive-card, .hud-btn, input, textarea");
    if (target) {
      ring.classList.add("active-hover");
      if (target.dataset.cursor) {
        ringText.textContent = target.dataset.cursor;
      } else if (target.tagName === "A" && target.target === "_blank") {
        ringText.textContent = "EXT ↗";
      } else if (target.classList.contains("tab-nav-btn")) {
        ringText.textContent = "TAB";
      } else {
        ringText.textContent = "SELECT";
      }
    }

    const is3D = e.target.closest("#three-avatar-viewport, #mini-rag-canvas, #mini-traffic-canvas, #mini-earth-canvas, #mini-retail-canvas, #mini-valuation-canvas");
    if (is3D) {
      ring.classList.add("active-3d");
      ringText.textContent = "3D DRAG";
    }
  });

  document.body.addEventListener("pointerout", (e) => {
    const target = e.target.closest("button, a, .interactive-card, .hud-btn, input, textarea, #three-avatar-viewport, #mini-rag-canvas, #mini-traffic-canvas, #mini-earth-canvas, #mini-retail-canvas, #mini-valuation-canvas");
    if (target) {
      ring.classList.remove("active-hover", "active-3d");
      ringText.textContent = "";
    }
  });
}

// Render Selected Projects Grid with Dedicated 3D Interactive Models for Each
function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  const canvasMap = {
    "ai-study-assistant": {
      canvasId: "mini-rag-canvas",
      titleBadge: "3D NEURAL VECTOR EMBEDDING // ACTIVE",
      colorClass: "text-cyan-300 border-cyan-500/30"
    },
    "urban-twin": {
      canvasId: "mini-traffic-canvas",
      titleBadge: "3D DIGITAL TWIN LIDAR // ACTIVE",
      colorClass: "text-emerald-300 border-emerald-500/30"
    },
    "earth-satellite": {
      canvasId: "mini-earth-canvas",
      titleBadge: "3D ORBIT TRACKER & NDVI // ACTIVE",
      colorClass: "text-cyan-300 border-cyan-500/30"
    },
    "retail-sales-forecast": {
      canvasId: "mini-retail-canvas",
      titleBadge: "3D TIME SERIES DEMAND RIBBON // ACTIVE",
      colorClass: "text-violet-300 border-violet-500/30"
    },
    "real-estate-valuation": {
      canvasId: "mini-valuation-canvas",
      titleBadge: "3D REGRESSION HYPERPLANE // R²=0.88",
      colorClass: "text-cyan-300 border-cyan-500/30"
    }
  };

  container.innerHTML = PROJECTS_DATA.map((p, idx) => {
    const hasLiveUrl = p.liveDemoUrl && p.liveDemoUrl.startsWith("http");
    const cMeta = canvasMap[p.id] || {
      canvasId: `mini-canvas-${idx}`,
      titleBadge: "3D WEBGL ENGINE // ACTIVE",
      colorClass: "text-cyan-300 border-cyan-500/30"
    };

    return `
      <div class="cyber-card p-6 md:p-8 flex flex-col justify-between group interactive-card project-card" data-project-id="${p.id}" data-cursor="EXPLORE">
        <div class="hud-corner hud-tl"></div>
        <div class="hud-corner hud-tr"></div>
        <div class="hud-corner hud-bl"></div>
        <div class="hud-corner hud-br"></div>

        <div>
          <div class="flex items-center justify-between gap-3 mb-4">
            <span class="text-xs font-mono px-3 py-1 rounded-full bg-slate-900/80 text-sky-300 border border-white/10 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              ${p.badge}
            </span>
            ${hasLiveUrl ? `
              <a href="${p.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="live-beacon hover:brightness-125 transition-all" title="View Live Deployed System">
                <span class="dot"></span>
                <span>LIVE SYSTEM ↗</span>
              </a>
            ` : `
              <span class="text-xs font-mono text-slate-500">PRJ-0${idx + 1} // SYS</span>
            `}
          </div>

          <h3 class="text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-3">
            ${p.title}
          </h3>

          <p class="text-slate-300 text-sm leading-relaxed mb-6 font-light">
            ${p.overview}
          </p>

          <!-- Interactive 3D Model Viewport (No Static Placeholders) -->
          <div class="relative w-full h-44 rounded-lg bg-[#0B101D] border border-cyan-500/20 mb-6 overflow-hidden flex items-center justify-center shadow-inner group-hover:border-cyan-500/40 transition-all">
            <div id="${cMeta.canvasId}" class="w-full h-full cursor-grab active:cursor-grabbing"></div>
            <div class="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-slate-950/85 font-mono text-[10px] ${cMeta.colorClass} border pointer-events-none flex items-center gap-1.5 backdrop-blur-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>${cMeta.titleBadge}</span>
            </div>
            <div class="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 font-mono text-[9px] text-slate-400 border border-white/10 pointer-events-none">
              3D INTERACTIVE
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-6 font-mono">
            ${p.metrics.map(m => `
              <div class="p-2.5 rounded-lg bg-[#0E1524]/70 border border-white/10 group-hover:border-white/20 transition-colors">
                <div class="text-[10px] text-slate-400 uppercase tracking-wider">${m.label}</div>
                <div class="text-sm font-bold text-white mt-0.5">${m.value}</div>
              </div>
            `).join('')}
          </div>

          <div class="flex flex-wrap gap-1.5 mb-6">
            ${p.tags.map(t => `
              <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-900/60 text-slate-300 border border-white/10">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
          <div class="flex items-center gap-2">
            ${hasLiveUrl ? `
              <a href="${p.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn-cyber-primary text-xs" data-cursor="LAUNCH">
                <span class="material-symbols-outlined text-sm">launch</span>
                <span>Live App</span>
              </a>
            ` : ''}
            <button class="btn-cyber-secondary text-xs open-case-study" data-project-id="${p.id}" data-cursor="DEEP DIVE">
              <span class="material-symbols-outlined text-sm">architecture</span>
              <span>Architecture</span>
            </button>
          </div>
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-cyber-ghost text-xs" data-cursor="CODE">
            <span class="material-symbols-outlined text-sm">code</span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// Case Study Modal Logic
function setupCaseStudyModal() {
  const modal = document.getElementById("case-study-modal");
  const modalBody = document.getElementById("modal-content-container");
  const closeBtn = document.getElementById("close-modal-btn");

  if (!modal || !modalBody) return;

  document.body.addEventListener("click", (e) => {
    const trigger = e.target.closest(".open-case-study");
    if (trigger) {
      const prjId = trigger.dataset.projectId;
      const project = PROJECTS_DATA.find(p => p.id === prjId);
      if (project) {
        populateModal(project);
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        if (window.triggerSfx) window.triggerSfx(820, 0.06);
      }
    }
  });

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });

  function populateModal(p) {
    const hasLiveUrl = p.liveDemoUrl && p.liveDemoUrl.startsWith("http");

    modalBody.innerHTML = `
      <div class="p-6 md:p-10 font-body">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            ${p.badge}
          </span>
          <span class="text-xs font-mono text-slate-400">ENGINEERING CASE STUDY</span>
        </div>

        <h2 class="text-3xl md:text-4xl font-bold font-display text-white mb-3">
          ${p.title}
        </h2>
        <p class="text-base text-slate-300 font-light mb-8">
          ${p.tagline}
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 font-mono">
          ${p.metrics.map(m => `
            <div class="p-4 rounded-lg bg-[#0B101D] border border-white/10">
              <div class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">${m.label}</div>
              <div class="text-xl font-bold text-white">${m.value}</div>
            </div>
          `).join('')}
        </div>

        <div class="space-y-6">
          <section>
            <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">report_problem</span>
              The Engineering Challenge
            </h4>
            <p class="text-slate-300 leading-relaxed bg-[#0E1524]/70 p-4 rounded-lg border border-white/10 text-sm font-light">
              ${p.problem}
            </p>
          </section>

          <section>
            <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">auto_fix_high</span>
              Architectural Solution
            </h4>
            <p class="text-slate-300 leading-relaxed bg-[#0E1524]/70 p-4 rounded-lg border border-white/10 mb-4 text-sm font-light">
              ${p.solution}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${p.architecture.map((a, i) => `
                <div class="p-4 rounded-lg bg-[#0E1524]/50 border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <div class="text-xs font-mono text-white font-semibold mb-1">STAGE 0${i + 1} // ${a.title}</div>
                  <div class="text-xs text-slate-400 leading-relaxed">${a.desc}</div>
                </div>
              `).join('')}
            </div>
          </section>

          <section class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-4 rounded-lg bg-[#0E1524]/50 border border-white/10">
              <h5 class="text-[11px] font-mono text-slate-300 uppercase tracking-wider mb-1.5 font-semibold">Key Bottleneck Resolved</h5>
              <p class="text-xs text-slate-400 leading-relaxed">${p.challenges}</p>
            </div>
            <div class="p-4 rounded-lg bg-[#0E1524]/50 border border-white/10">
              <h5 class="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5 font-semibold">Measurable Impact</h5>
              <p class="text-xs text-slate-400 leading-relaxed">${p.results}</p>
            </div>
          </section>

          <div class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap gap-2">
              ${p.tags.map(t => `
                <span class="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-white/10">
                  ${t}
                </span>
              `).join('')}
            </div>

            <div class="flex items-center gap-3">
              ${hasLiveUrl ? `
                <a href="${p.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn-cyber-primary text-xs">
                  <span class="material-symbols-outlined text-sm">rocket_launch</span>
                  <span>Launch Live System ↗</span>
                </a>
              ` : ''}
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-cyber-secondary text-xs">
                <span class="material-symbols-outlined text-sm">code</span>
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Render Skills Matrix (6 Categories from Resume)
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  container.innerHTML = SKILLS_DATA.map((cat, idx) => `
    <div class="cyber-card p-6 md:p-8 relative">
      <div class="hud-corner hud-tl"></div>
      <div class="hud-corner hud-tr"></div>
      <div class="hud-corner hud-bl"></div>
      <div class="hud-corner hud-br"></div>

      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <span class="material-symbols-outlined text-xl">${cat.icon}</span>
        </div>
        <div>
          <h4 class="text-xl font-bold font-display text-white">${cat.category}</h4>
          <span class="text-xs font-mono text-cyan-400">DOMAIN 0${idx + 1}</span>
        </div>
      </div>

      <p class="text-sm text-slate-400 mb-6 leading-relaxed font-light">
        ${cat.description}
      </p>

      <div class="space-y-2.5 font-mono">
        ${cat.skills.map(s => `
          <div class="p-3 rounded-lg bg-[#0E1524]/70 border border-white/10 flex items-center justify-between hover:border-cyan-500/40 hover:bg-[#121B2F] transition-all">
            <div>
              <div class="text-sm font-semibold text-white">${s.name}</div>
              <div class="text-[11px] text-slate-400 font-normal">${s.highlight}</div>
            </div>
            <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
              ${s.level}
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Render Experience & Education
function renderExperience() {
  const expContainer = document.getElementById("experience-timeline");
  if (expContainer) {
    expContainer.innerHTML = EXPERIENCE_DATA.map((exp) => `
      <div class="relative pl-7 pb-8 border-l border-cyan-500/30 last:border-transparent last:pb-0">
        <div class="absolute -left-[7px] top-0 w-3.5 h-3.5 rounded-full bg-[#080B11] border-2 border-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.8)]"></div>
        
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <h4 class="text-lg font-bold font-display text-white">${exp.role}</h4>
          <span class="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-900 text-cyan-300 border border-cyan-500/30">
            ${exp.period}
          </span>
        </div>

        <div class="text-xs font-mono text-cyan-400 font-semibold mb-3">${exp.company} • ${exp.location}</div>

        <ul class="space-y-1.5 text-xs text-slate-300 mb-3 list-disc list-inside font-light">
          ${exp.bullets.map(b => `<li class="leading-relaxed">${b}</li>`).join('')}
        </ul>

        <div class="flex flex-wrap gap-1 font-mono">
          ${exp.tech.map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-[#0E1524] text-slate-400 border border-white/10">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  const eduContainer = document.getElementById("education-container");
  if (eduContainer) {
    eduContainer.innerHTML = EDUCATION_DATA.map(edu => `
      <div class="p-4 rounded-lg bg-[#0E1524]/80 border border-white/10 hover:border-cyan-500/30 transition-colors">
        <div class="flex justify-between items-start gap-2 mb-1 font-mono">
          <span class="text-xs text-cyan-400 font-semibold">${edu.period}</span>
          <span class="text-[11px] text-slate-500">${edu.location}</span>
        </div>
        <h4 class="text-sm font-bold font-display text-white mb-0.5">${edu.degree}</h4>
        <div class="text-xs text-slate-400 mb-1">${edu.institution}</div>
        <div class="text-[11px] text-slate-500 font-mono">${edu.focus}</div>
      </div>
    `).join('');
  }
}

// Resume View Switcher & Printable Trigger
function setupResumeActions() {
  const printBtn = document.getElementById("print-resume-page-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  const btnShowPdf = document.getElementById("btn-show-pdf-view");
  const btnShowWeb = document.getElementById("btn-show-web-view");
  const pdfSection = document.getElementById("pdf-viewer-section");
  const webSection = document.getElementById("web-viewer-section");

  if (btnShowPdf && btnShowWeb && pdfSection && webSection) {
    btnShowPdf.addEventListener("click", () => {
      pdfSection.classList.remove("hidden");
      webSection.classList.add("hidden");

      btnShowPdf.className = "px-3 py-1.5 rounded text-xs font-semibold bg-white text-slate-950 shadow transition-all";
      btnShowWeb.className = "px-3 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-white transition-all";
      if (window.triggerSfx) window.triggerSfx(800, 0.05);
    });

    btnShowWeb.addEventListener("click", () => {
      webSection.classList.remove("hidden");
      pdfSection.classList.add("hidden");

      btnShowWeb.className = "px-3 py-1.5 rounded text-xs font-semibold bg-white text-slate-950 shadow transition-all";
      btnShowPdf.className = "px-3 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-white transition-all";
      if (window.triggerSfx) window.triggerSfx(800, 0.05);
    });
  }
}

// Recruiter Contact Console & End-to-End Email Dispatch Engine
function setupContactConsole() {
  const targetEmail = "niladri6202@gmail.com";

  // 1. Direct Email Copy Button in sidebar
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(targetEmail).then(() => {
        const origText = copyBtn.innerHTML;
        copyBtn.innerHTML = `<span class="material-symbols-outlined text-xs">done</span> Copied!`;
        copyBtn.classList.add("border-emerald-500", "text-emerald-400");
        if (window.triggerSfx) window.triggerSfx(880, 0.08);
        setTimeout(() => {
          copyBtn.innerHTML = origText;
          copyBtn.classList.remove("border-emerald-500", "text-emerald-400");
        }, 2200);
      });
    });
  }

  // 2. Form Submission with Multi-Channel Email Routing
  const contactForm = document.getElementById("recruiter-contact-form");
  const feedback = document.getElementById("contact-feedback-msg");
  const quickGmailBtn = document.getElementById("direct-gmail-quick-btn");

  if (contactForm && feedback) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (window.triggerSfx) window.triggerSfx(950, 0.1);

      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");
      const engagementInput = document.getElementById("contact-engagement");
      const messageInput = document.getElementById("contact-message");

      const name = (nameInput ? nameInput.value.trim() : "") || "Hiring Partner";
      const senderEmail = (emailInput ? emailInput.value.trim() : "") || "Not specified";
      const engagement = (engagementInput ? engagementInput.value : "") || "Engineering Opportunity";
      const message = (messageInput ? messageInput.value.trim() : "") || "";

      const subject = `[Portfolio Inquiry] ${engagement} - from ${name}`;
      const emailBody = `Dear Niladri,

${message}

--------------------------------------------------
Sender Dossier:
• Name: ${name}
• Work Email: ${senderEmail}
• Engagement Type: ${engagement}
• Destination Mailbox: ${targetEmail}
• Sent via Portfolio Interactive Dossier
--------------------------------------------------`;

      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(emailBody);

      const mailtoUrl = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodedSubject}&body=${encodedBody}`;
      const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${targetEmail}&subject=${encodedSubject}&body=${encodedBody}`;

      // Update quick Gmail link with current filled draft
      if (quickGmailBtn) {
        quickGmailBtn.href = gmailUrl;
      }

      // Copy text to clipboard as safety buffer
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailBody).catch(() => {});
      }

      // Launch default email client
      const mailtoAnchor = document.createElement("a");
      mailtoAnchor.href = mailtoUrl;
      mailtoAnchor.target = "_blank";
      mailtoAnchor.rel = "noopener noreferrer";
      document.body.appendChild(mailtoAnchor);
      mailtoAnchor.click();
      setTimeout(() => mailtoAnchor.remove(), 1000);

      // Render interactive Dispatch Hub in UI
      feedback.classList.remove("hidden");
      feedback.innerHTML = `
        <div class="p-4 rounded-xl bg-[#080C14] border border-cyan-400/40 shadow-[0_0_25px_rgba(0,229,255,0.18)] space-y-3.5 animate-fadeIn">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div class="flex items-center gap-2 text-cyan-300 font-bold text-xs">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>EMAIL TRANSMISSION READY // 1-CLICK SEND</span>
            </div>
            <span class="text-[10px] text-slate-400 font-mono">TARGET: <span class="text-white font-semibold">${targetEmail}</span></span>
          </div>

          <p class="text-xs text-slate-300 leading-relaxed font-body">
            Your inquiry from <strong class="text-white">${name}</strong> (${senderEmail}) is prepared for <strong class="text-cyan-300">${targetEmail}</strong>. Your device's mail client was triggered. You can also send or open directly via webmail below:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-xs">
            <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn-cyber-primary text-xs py-2.5 justify-center" data-cursor="GMAIL">
              <span class="material-symbols-outlined text-sm text-slate-950">open_in_new</span>
              <span>OPEN IN GMAIL</span>
            </a>
            <a href="${outlookUrl}" target="_blank" rel="noopener noreferrer" class="btn-cyber-secondary text-xs py-2.5 justify-center" data-cursor="OUTLOOK">
              <span class="material-symbols-outlined text-sm text-cyan-400">mail</span>
              <span>OPEN IN OUTLOOK</span>
            </a>
            <a href="${mailtoUrl}" class="btn-cyber-secondary text-xs py-2.5 justify-center" data-cursor="MAIL APP">
              <span class="material-symbols-outlined text-sm text-emerald-400">send</span>
              <span>DEFAULT APP</span>
            </a>
          </div>

          <div class="pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
            <span class="flex items-center gap-1.5 text-emerald-400">
              <span class="material-symbols-outlined text-xs">check_circle</span>
              <span>Draft text copied to clipboard as backup</span>
            </span>
            <div class="flex items-center gap-3">
              <button type="button" id="copy-draft-btn" class="text-cyan-400 hover:underline cursor-pointer">Re-copy text</button>
              <button type="button" id="clear-contact-form-btn" class="text-slate-500 hover:text-slate-300 cursor-pointer">Clear Form</button>
            </div>
          </div>
        </div>
      `;

      // Setup re-copy and clear buttons
      const recopyBtn = document.getElementById("copy-draft-btn");
      if (recopyBtn) {
        recopyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(emailBody).then(() => {
            recopyBtn.textContent = "Copied!";
            if (window.triggerSfx) window.triggerSfx(880, 0.06);
            setTimeout(() => { recopyBtn.textContent = "Re-copy text"; }, 2000);
          });
        });
      }

      const clearBtn = document.getElementById("clear-contact-form-btn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          contactForm.reset();
          feedback.classList.add("hidden");
          feedback.innerHTML = "";
          if (quickGmailBtn) {
            quickGmailBtn.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=Engineering%20Inquiry%20from%20Portfolio`;
          }
        });
      }
    });
  }
}

