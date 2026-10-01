// Niladri Pal Portfolio - Three.js 3D Interactive Cyber Avatar & WebGL Engine
// Color Grading: Obsidian Matte, Prismatic Titanium, Luminous Electric Azure & Amethyst Violet

class Avatar3DExperience {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    // Avatar Hierarchical Skeleton
    this.avatarRoot = null;
    this.torsoGroup = null;
    this.neckGroup = null;
    this.headGroup = null;
    this.visorMesh = null;
    this.scanlineMesh = null;
    this.reactorCenter = null;
    this.reactorRings = [];
    this.holoRings = [];
    this.dataNodes = [];
    this.orbitParticles = null;

    // Interaction & Animation State
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetHeadRotY = 0;
    this.targetHeadRotX = 0;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.manualBodyRotY = 0;
    this.manualBodyRotX = 0;

    // Advanced Professional Modes
    this.isHologram = false;
    this.isScanning = false;
    this.isAutoOrbit = false;
    this.isXRay = false;
    this.scanProgress = 0;
    this.colorTheme = "cyan"; // cyan, violet, emerald, amber
    this.clock = new THREE.Clock();

    // Raycasting for interactive clicks
    this.raycaster = new THREE.Raycaster();
    this.mouseVec = new THREE.Vector2();

    // Telemetry
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();
    this.fps = 60;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 570;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x080B11, 0.038);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 0.35, 5.8);

    // 3. Renderer with ACESFilmic Tone Mapping for cinematic studio grading
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.container.appendChild(this.renderer.domElement);

    // 4. Prismatic Multi-Point Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x121A2C, 0.95);
    this.scene.add(ambientLight);

    // Key Light (Crisp Neutral Titanium White)
    this.keyLight = new THREE.DirectionalLight(0xFFFFFF, 2.8);
    this.keyLight.position.set(4, 5, 5);
    this.scene.add(this.keyLight);

    // Fill Light (Cool Cyan Tone)
    this.fillLight = new THREE.DirectionalLight(0x00E5FF, 1.4);
    this.fillLight.position.set(-4, -1, 3);
    this.scene.add(this.fillLight);

    // Back / Rim Light 1 (Luminous Electric Azure Edge Glow)
    this.rimLight1 = new THREE.PointLight(0x00E5FF, 3.6, 14);
    this.rimLight1.position.set(-3.5, 3.5, -3.5);
    this.scene.add(this.rimLight1);

    // Back / Rim Light 2 (Deep Prismatic Violet Edge Glow)
    this.rimLight2 = new THREE.PointLight(0x8B5CF6, 3.2, 14);
    this.rimLight2.position.set(3.5, 3.8, -3.5);
    this.scene.add(this.rimLight2);

    // Under-glow Telemetry Light (Emerald Mint)
    this.underLight = new THREE.PointLight(0x10B981, 1.5, 8);
    this.underLight.position.set(0, -3.0, 2.0);
    this.scene.add(this.underLight);

    // 5. Build 3D Cybernetic Avatar
    this.buildAvatar();

    // 6. Build Holographic Aura
    this.buildHoloAura();

    // 7. Setup Interaction Events
    this.setupEvents();

    // 8. Start Animation Loop
    this.animate();
  }

  buildAvatar() {
    this.avatarRoot = new THREE.Group();
    this.avatarRoot.position.set(0, -0.65, 0);
    this.scene.add(this.avatarRoot);

    // Minimalist Luxury Materials: Obsidian Metal & Frosted Titanium
    this.metalMat = new THREE.MeshStandardMaterial({
      color: 0x0E1320,
      metalness: 0.94,
      roughness: 0.20,
      wireframe: false,
      transparent: true,
      opacity: 1.0
    });

    this.accentMat = new THREE.MeshStandardMaterial({
      color: 0x070A12,
      emissive: 0x00E5FF,
      emissiveIntensity: 0.45,
      metalness: 0.88,
      roughness: 0.14,
      transparent: true,
      opacity: 1.0
    });

    this.glowMat = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.88
    });

    // ------------------------------------------------
    // A. TORSO & CHESTPLATE
    // ------------------------------------------------
    this.torsoGroup = new THREE.Group();
    this.avatarRoot.add(this.torsoGroup);

    // Sculpted chest armor
    const chestGeo = new THREE.CylinderGeometry(0.95, 0.72, 1.4, 8);
    const chestMesh = new THREE.Mesh(chestGeo, this.metalMat);
    chestMesh.position.y = 0;
    this.torsoGroup.add(chestMesh);

    // Internal Neural Core for X-Ray Mode
    const coreGeo = new THREE.DodecahedronGeometry(0.42, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00E5FF,
      emissive: 0x00E5FF,
      emissiveIntensity: 2.2,
      wireframe: true
    });
    this.internalCore = new THREE.Mesh(coreGeo, coreMat);
    this.internalCore.position.set(0, 0.15, 0);
    this.torsoGroup.add(this.internalCore);

    // Precision Shoulders
    const shoulderGeo = new THREE.SphereGeometry(0.36, 22, 22);
    const leftShoulder = new THREE.Mesh(shoulderGeo, this.metalMat);
    leftShoulder.position.set(-1.22, 0.48, 0);
    this.torsoGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeo, this.metalMat);
    rightShoulder.position.set(1.22, 0.48, 0);
    this.torsoGroup.add(rightShoulder);

    // Collar Armor Rim
    const collarGeo = new THREE.TorusGeometry(0.62, 0.08, 8, 32);
    const collarMesh = new THREE.Mesh(collarGeo, this.accentMat);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = 0.68;
    this.torsoGroup.add(collarMesh);

    // Minimalist Arc Reactor
    const reactorCenterGeo = new THREE.SphereGeometry(0.18, 22, 22);
    this.reactorCenter = new THREE.Mesh(reactorCenterGeo, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
    this.reactorCenter.position.set(0, 0.15, 0.71);
    this.torsoGroup.add(this.reactorCenter);

    const rRing1Geo = new THREE.TorusGeometry(0.28, 0.025, 16, 36);
    const rRing1 = new THREE.Mesh(rRing1Geo, this.glowMat);
    rRing1.position.set(0, 0.15, 0.71);
    this.torsoGroup.add(rRing1);
    this.reactorRings.push(rRing1);

    const rRing2Geo = new THREE.TorusGeometry(0.40, 0.015, 16, 36);
    const rRing2 = new THREE.Mesh(rRing2Geo, new THREE.MeshBasicMaterial({ color: 0x8B5CF6 }));
    rRing2.position.set(0, 0.15, 0.70);
    this.torsoGroup.add(rRing2);
    this.reactorRings.push(rRing2);

    // ------------------------------------------------
    // B. NECK (Articulated hydraulic cylinder)
    // ------------------------------------------------
    this.neckGroup = new THREE.Group();
    this.neckGroup.position.set(0, 0.82, 0);
    this.torsoGroup.add(this.neckGroup);

    const neckGeo = new THREE.CylinderGeometry(0.26, 0.30, 0.42, 20);
    const neckMesh = new THREE.Mesh(neckGeo, this.metalMat);
    neckMesh.position.y = 0.14;
    this.neckGroup.add(neckMesh);

    // ------------------------------------------------
    // C. HEAD & CYBERNETIC VISOR (Rotates with Cursor)
    // ------------------------------------------------
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 0.38, 0);
    this.neckGroup.add(this.headGroup);

    // Main Cranium Helmet
    const craniumGeo = new THREE.BoxGeometry(0.82, 0.92, 0.92);
    const craniumMesh = new THREE.Mesh(craniumGeo, this.metalMat);
    craniumMesh.position.y = 0.38;
    this.headGroup.add(craniumMesh);

    // Sleek Jaw / Chin Plate
    const jawGeo = new THREE.ConeGeometry(0.48, 0.48, 6);
    const jawMesh = new THREE.Mesh(jawGeo, this.metalMat);
    jawMesh.rotation.x = Math.PI;
    jawMesh.position.set(0, 0.05, 0.14);
    this.headGroup.add(jawMesh);

    // Luminous Minimalist Visor (Cyan with high gloss)
    const visorGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.20, 24, 1, false, 0, Math.PI);
    this.visorMat = new THREE.MeshStandardMaterial({
      color: 0x00E5FF,
      emissive: 0x0099CC,
      emissiveIntensity: 1.9,
      roughness: 0.05,
      metalness: 0.95,
      transparent: true,
      opacity: 0.94
    });
    this.visorMesh = new THREE.Mesh(visorGeo, this.visorMat);
    this.visorMesh.rotation.y = -Math.PI / 2;
    this.visorMesh.position.set(0, 0.42, 0.27);
    this.headGroup.add(this.visorMesh);

    // Minimalist Crisp White Scanline
    const scanlineGeo = new THREE.PlaneGeometry(0.86, 0.03);
    this.scanlineMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.9
    });
    this.scanlineMesh = new THREE.Mesh(scanlineGeo, this.scanlineMat);
    this.scanlineMesh.position.set(0, 0.42, 0.52);
    this.headGroup.add(this.scanlineMesh);

    // Audio Earpieces (Left & Right)
    const earGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 20);
    const earLeft = new THREE.Mesh(earGeo, this.accentMat);
    earLeft.rotation.z = Math.PI / 2;
    earLeft.position.set(-0.46, 0.40, 0);
    this.headGroup.add(earLeft);

    const earRight = new THREE.Mesh(earGeo, this.accentMat);
    earRight.rotation.z = Math.PI / 2;
    earRight.position.set(0.46, 0.40, 0);
    this.headGroup.add(earRight);

    // Refined Antenna Beacon
    const antennaGeo = new THREE.CylinderGeometry(0.012, 0.018, 0.38, 8);
    const antenna = new THREE.Mesh(antennaGeo, this.glowMat);
    antenna.position.set(0.43, 0.72, -0.12);
    antenna.rotation.z = -0.25;
    this.headGroup.add(antenna);

    // Forehead Telemetry Indicator
    const nodeGeo = new THREE.BoxGeometry(0.1, 0.06, 0.03);
    const nodeMesh = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0x10B981 }));
    nodeMesh.position.set(0, 0.70, 0.46);
    this.headGroup.add(nodeMesh);
  }

  buildHoloAura() {
    // Gyroscopic Holographic Rings with Prismatic Accents
    const ring1Geo = new THREE.TorusGeometry(1.58, 0.012, 16, 96);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.5 });
    this.haloRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    this.haloRing1.rotation.x = Math.PI / 3;
    this.avatarRoot.add(this.haloRing1);
    this.holoRings.push(this.haloRing1);

    const ring2Geo = new THREE.TorusGeometry(2.1, 0.009, 16, 96);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.4 });
    this.haloRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    this.haloRing2.rotation.y = Math.PI / 4;
    this.avatarRoot.add(this.haloRing2);
    this.holoRings.push(this.haloRing2);

    const ring3Geo = new THREE.TorusGeometry(2.45, 0.007, 16, 96);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xF8FAFC, transparent: true, opacity: 0.28 });
    this.haloRing3 = new THREE.Mesh(ring3Geo, ring3Mat);
    this.haloRing3.rotation.z = Math.PI / 6;
    this.avatarRoot.add(this.haloRing3);
    this.holoRings.push(this.haloRing3);

    // Orbiting Minimalist Wireframe Data Cubes
    this.dataNodes = [];
    for (let i = 0; i < 6; i++) {
      const nodeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: (i % 2 === 0) ? 0x00E5FF : 0x8B5CF6,
        wireframe: true
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      this.avatarRoot.add(node);
      this.dataNodes.push(node);
    }

    // Floating Starlight Particles with Multi-Hue Depth
    const pCount = 850;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      pPos[i3] = (Math.random() - 0.5) * 8.5;
      pPos[i3 + 1] = (Math.random() - 0.5) * 8.5;
      pPos[i3 + 2] = (Math.random() - 0.5) * 6.5;

      const rand = Math.random();
      if (rand < 0.45) {
        // Luminous Cyan
        pCol[i3] = 0.0;
        pCol[i3 + 1] = 0.90;
        pCol[i3 + 2] = 1.0;
      } else if (rand < 0.75) {
        // Prismatic Violet
        pCol[i3] = 0.55;
        pCol[i3 + 1] = 0.36;
        pCol[i3 + 2] = 0.96;
      } else {
        // Pure Starlight White
        pCol[i3] = 0.96;
        pCol[i3 + 1] = 0.98;
        pCol[i3 + 2] = 1.0;
      }
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    this.orbitParticles = new THREE.Points(pGeo, pMat);
    this.scene.add(this.orbitParticles);
  }

  setupEvents() {
    const onPointerMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      this.mouseVec.x = x;
      this.mouseVec.y = y;

      if (!this.isAutoOrbit) {
        this.targetHeadRotY = THREE.MathUtils.clamp(x * 0.65, -0.6, 0.6);
        this.targetHeadRotX = THREE.MathUtils.clamp(-y * 0.35, -0.35, 0.35);
      }

      if (this.isDragging) {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;
        this.manualBodyRotY += deltaX * 0.007;
        this.manualBodyRotX += deltaY * 0.005;
        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    this.container.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };

      // Interactive Click Shockwave Reaction
      this.triggerClickShockwave();
    });

    window.addEventListener('pointerup', () => {
      this.isDragging = false;
    });

    this.container.addEventListener('pointermove', onPointerMove);

    window.addEventListener('resize', () => {
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      if (w > 0 && h > 0) {
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      }
    });
  }

  triggerClickShockwave() {
    this.triggerScan();
    if (this.reactorCenter) {
      this.reactorCenter.scale.set(1.5, 1.5, 1.5);
    }
    if (window.triggerSfx) window.triggerSfx(920, 0.09);
  }

  triggerScan() {
    this.isScanning = true;
    this.scanProgress = -0.5;
  }

  toggleHologram() {
    this.isHologram = !this.isHologram;
    const wire = this.isHologram;
    this.metalMat.wireframe = wire;
    this.accentMat.wireframe = wire;
    return this.isHologram;
  }

  toggleAutoOrbit() {
    this.isAutoOrbit = !this.isAutoOrbit;
    return this.isAutoOrbit;
  }

  toggleXRay() {
    this.isXRay = !this.isXRay;
    if (this.isXRay) {
      this.metalMat.opacity = 0.25;
      this.accentMat.opacity = 0.35;
      this.internalCore.material.emissiveIntensity = 3.5;
    } else {
      this.metalMat.opacity = 1.0;
      this.accentMat.opacity = 1.0;
      this.internalCore.material.emissiveIntensity = 2.2;
    }
    return this.isXRay;
  }

  cycleColorTheme() {
    const schemes = ["cyan", "violet", "emerald", "amber"];
    const nextIdx = (schemes.indexOf(this.colorTheme) + 1) % schemes.length;
    this.colorTheme = schemes[nextIdx];

    let hexColor, emissiveColor;
    if (this.colorTheme === "cyan") {
      hexColor = 0x00E5FF;
      emissiveColor = 0x0099CC;
    } else if (this.colorTheme === "violet") {
      hexColor = 0xA78BFA;
      emissiveColor = 0x7C3AED;
    } else if (this.colorTheme === "emerald") {
      hexColor = 0x10B981;
      emissiveColor = 0x059669;
    } else {
      hexColor = 0xF59E0B;
      emissiveColor = 0xD97706;
    }

    if (this.visorMat) {
      this.visorMat.color.setHex(hexColor);
      this.visorMat.emissive.setHex(emissiveColor);
    }
    if (this.glowMat) this.glowMat.color.setHex(hexColor);
    if (this.rimLight1) this.rimLight1.color.setHex(hexColor);
    if (this.haloRing1) this.haloRing1.material.color.setHex(hexColor);
    if (this.internalCore) this.internalCore.material.color.setHex(hexColor);

    return this.colorTheme;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // 1. Head Tracking or Turntable Orbit
    if (this.isAutoOrbit) {
      this.manualBodyRotY += delta * 0.8;
      this.headGroup.rotation.y = Math.sin(elapsed * 1.5) * 0.2;
      this.headGroup.rotation.x = Math.cos(elapsed * 1.2) * 0.1;
    } else if (this.headGroup) {
      this.headGroup.rotation.y += (this.targetHeadRotY - this.headGroup.rotation.y) * 0.08;
      this.headGroup.rotation.x += (this.targetHeadRotX - this.headGroup.rotation.x) * 0.08;
    }

    // 2. Idle Floating & Parallax
    if (this.avatarRoot) {
      this.avatarRoot.position.y = -0.65 + Math.sin(elapsed * 1.4) * 0.035;
      
      if (!this.isDragging && !this.isAutoOrbit) {
        this.manualBodyRotY *= 0.96;
        this.manualBodyRotX *= 0.96;
      }
      this.avatarRoot.rotation.y = this.manualBodyRotY + (Math.sin(elapsed * 0.35) * 0.04);
      this.avatarRoot.rotation.x = this.manualBodyRotX;
    }

    // 3. Torso Sub-motion (Breathing Cycle)
    if (this.torsoGroup) {
      const breathScale = 1.0 + Math.sin(elapsed * 1.8) * 0.015;
      this.torsoGroup.scale.set(breathScale, 1.0, breathScale);
    }

    // Internal Core Spinning
    if (this.internalCore) {
      this.internalCore.rotation.x = elapsed * 1.2;
      this.internalCore.rotation.y = elapsed * 1.5;
    }

    // 4. Arc Reactor Concentric Pulsing
    if (this.reactorRings.length >= 2) {
      this.reactorRings[0].rotation.z = elapsed * 1.3;
      this.reactorRings[1].rotation.z = -elapsed * 1.7;
    }
    if (this.reactorCenter) {
      const pulse = 1.0 + Math.sin(elapsed * 4.0) * 0.08;
      this.reactorCenter.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.1);
    }

    // 5. Visor Laser Scan Motion
    if (this.scanlineMesh) {
      if (this.isScanning) {
        this.scanProgress += delta * 1.8;
        this.scanlineMesh.position.y = 0.42 + Math.sin(this.scanProgress * Math.PI) * 0.12;
        if (this.scanProgress >= 2.0) {
          this.isScanning = false;
          this.scanlineMesh.position.y = 0.42;
        }
      } else {
        this.scanlineMesh.position.y = 0.42 + (Math.sin(elapsed * 2.5) * 0.03);
      }
    }

    // 6. Gyroscopic Halo Rings & Orbiting Data Nodes
    if (this.haloRing1) this.haloRing1.rotation.z = elapsed * 0.22;
    if (this.haloRing2) this.haloRing2.rotation.x = -elapsed * 0.16;
    if (this.haloRing3) this.haloRing3.rotation.y = elapsed * 0.10;

    if (this.dataNodes) {
      this.dataNodes.forEach((node, i) => {
        const angle = elapsed * 0.75 + (i * (Math.PI / 3));
        const rad = 2.15 + (i % 2) * 0.35;
        node.position.x = Math.cos(angle) * rad;
        node.position.y = 0.45 + Math.sin(angle * 1.4) * 0.7;
        node.position.z = Math.sin(angle) * rad;
        node.rotation.x = elapsed * 1.6;
        node.rotation.y = elapsed * 1.3;
      });
    }

    // 7. Ambient Particle Starfield Rotation
    if (this.orbitParticles) {
      this.orbitParticles.rotation.y = elapsed * 0.028;
    }

    // 8. FPS Telemetry Calculation
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsUpdate >= 500) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
      this.frameCount = 0;
      this.lastFpsUpdate = now;

      const fpsEl = document.getElementById("hud-fps-val");
      if (fpsEl) fpsEl.textContent = `${this.fps} FPS`;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// =====================================================================
// 1. 3D Neural Vector Space & RAG Graph Visualizer (ai-study-assistant)
// =====================================================================
class MiniRAGGraph {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.container.innerHTML = "";

    const w = this.container.clientWidth || 320;
    const h = this.container.clientHeight || 200;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.set(0, 1.2, 4.5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Root Group
    this.root = new THREE.Group();
    this.scene.add(this.root);

    // Bounding Coordinate Hologram Cage
    const cageGeo = new THREE.BoxGeometry(2.4, 2.0, 2.4);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.22 });
    const cageMesh = new THREE.LineSegments(cageEdges, cageMat);
    this.root.add(cageMesh);

    // Central Query Vector Nucleus (Glowing White/Cyan)
    const queryGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const queryMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    this.queryNode = new THREE.Mesh(queryGeo, queryMat);
    this.root.add(this.queryNode);

    // Vector Cluster Nodes (FAISS / ChromaDB Chunks)
    this.chunkNodes = [];
    this.connectingLines = [];

    const clusterColors = [0x00E5FF, 0x8B5CF6, 0x10B981];
    for (let i = 0; i < 28; i++) {
      const col = clusterColors[i % 3];
      const nodeGeo = new THREE.SphereGeometry(0.065, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: col });
      const node = new THREE.Mesh(nodeGeo, nodeMat);

      const rad = 0.8 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      node.position.set(
        rad * Math.cos(theta) * Math.cos(phi),
        rad * Math.sin(phi) + 0.1,
        rad * Math.sin(theta) * Math.cos(phi)
      );
      this.root.add(node);
      this.chunkNodes.push(node);

      // Connect top nearest neighbors with dynamic cosine rays
      if (i < 8) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          node.position
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.55 });
        const line = new THREE.Line(lineGeo, lineMat);
        this.root.add(line);
        this.connectingLines.push(line);
      }
    }

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const time = performance.now() * 0.001;

    this.root.rotation.y = time * 0.4;
    this.root.rotation.x = Math.sin(time * 0.3) * 0.15;

    const pulse = 1.0 + Math.sin(time * 4.0) * 0.12;
    this.queryNode.scale.set(pulse, pulse, pulse);

    this.renderer.render(this.scene, this.camera);
  }
}

// =====================================================================
// 2. 3D Urban Digital Twin Intersection Visualizer (urban-twin)
// =====================================================================
class MiniTrafficTwin {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.container.innerHTML = "";

    const w = this.container.clientWidth || 320;
    const h = this.container.clientHeight || 200;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.set(2.8, 3.2, 3.8);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.root = new THREE.Group();
    this.scene.add(this.root);

    // 3D Road Grid Ground
    const grid = new THREE.GridHelper(4, 16, 0x00E5FF, 0x1E293B);
    grid.position.y = -0.01;
    this.root.add(grid);

    // Cross-Road Surface
    const roadMat = new THREE.MeshBasicMaterial({ color: 0x0A0F1D });
    const r1 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 4), roadMat);
    r1.rotation.x = -Math.PI / 2;
    this.root.add(r1);

    const r2 = new THREE.Mesh(new THREE.PlaneGeometry(4, 1.2), roadMat);
    r2.rotation.x = -Math.PI / 2;
    this.root.add(r2);

    // Camera Sensor Frustum (Transparent Cyan LiDAR pyramid)
    const pyrGeo = new THREE.ConeGeometry(1.6, 2.6, 4, 1, true);
    const pyrMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF, wireframe: true, transparent: true, opacity: 0.35 });
    this.frustum = new THREE.Mesh(pyrGeo, pyrMat);
    this.frustum.position.set(0, 2.2, 0);
    this.frustum.rotation.x = Math.PI;
    this.root.add(this.frustum);

    // Vehicle Bounding Boxes with Velocity Trails
    this.vehicles = [];
    const carMat = new THREE.MeshStandardMaterial({ color: 0x10B981, emissive: 0x10B981, emissiveIntensity: 0.5 });
    const carGeo = new THREE.BoxGeometry(0.35, 0.20, 0.65);

    for (let i = 0; i < 4; i++) {
      const car = new THREE.Mesh(carGeo, carMat);
      car.position.y = 0.12;
      this.root.add(car);
      this.vehicles.push({
        mesh: car,
        axis: i % 2 === 0 ? "z" : "x",
        speed: 0.02 + Math.random() * 0.02,
        offset: (i * 1.8) - 2.5
      });
    }

    const light = new THREE.DirectionalLight(0xFFFFFF, 2.0);
    light.position.set(2, 4, 3);
    this.scene.add(light);

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const time = performance.now() * 0.001;

    this.root.rotation.y = time * 0.25;

    this.vehicles.forEach(v => {
      v.offset += v.speed;
      if (v.offset > 2.2) v.offset = -2.2;

      if (v.axis === "z") {
        v.mesh.position.set(0.3, 0.12, v.offset);
        v.mesh.rotation.y = 0;
      } else {
        v.mesh.position.set(v.offset, 0.12, -0.3);
        v.mesh.rotation.y = Math.PI / 2;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}

// =====================================================================
// 3. 3D Earth Globe with Satellite Orbit Visualizer (earth-satellite)
// =====================================================================
class MiniEarthGlobe {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.container.innerHTML = "";

    const w = this.container.clientWidth || 320;
    const h = this.container.clientHeight || 200;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.z = 4.3;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Globe: Matte Titanium Slate with Electric Cyan Wireframe
    const globeGeo = new THREE.SphereGeometry(1.6, 28, 28);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x080C16,
      emissive: 0x00E5FF,
      emissiveIntensity: 0.22,
      roughness: 0.35,
      metalness: 0.92,
      wireframe: true
    });
    this.globe = new THREE.Mesh(globeGeo, globeMat);
    this.scene.add(this.globe);

    // Atmospheric Glow Halo
    const atmoGeo = new THREE.RingGeometry(1.75, 1.84, 40);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.42
    });
    this.atmo = new THREE.Mesh(atmoGeo, atmoMat);
    this.scene.add(this.atmo);

    // Orbital Ring 1: Inclined Orbit (Emerald)
    const orbit1Geo = new THREE.TorusGeometry(2.3, 0.014, 16, 72);
    const orbit1Mat = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.7 });
    this.orbit1 = new THREE.Mesh(orbit1Geo, orbit1Mat);
    this.orbit1.rotation.x = Math.PI / 3;
    this.scene.add(this.orbit1);

    // Satellite 1 Beacon
    const sat1Geo = new THREE.SphereGeometry(0.08, 16, 16);
    const sat1Mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    this.sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    this.scene.add(this.sat1);

    // Orbital Ring 2: Polar Orbit (Violet)
    const orbit2Geo = new THREE.TorusGeometry(2.1, 0.009, 16, 72);
    const orbit2Mat = new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.45 });
    this.orbit2 = new THREE.Mesh(orbit2Geo, orbit2Mat);
    this.orbit2.rotation.y = Math.PI / 3;
    this.scene.add(this.orbit2);

    const light = new THREE.DirectionalLight(0xF8FAFC, 2.4);
    light.position.set(5, 3, 5);
    this.scene.add(light);

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const time = performance.now() * 0.001;
    this.globe.rotation.y = time * 0.35;
    this.atmo.rotation.z = time * 0.08;

    const angle = time * 1.5;
    this.sat1.position.x = Math.cos(angle) * 2.3;
    this.sat1.position.y = Math.sin(angle) * 2.3 * Math.sin(Math.PI / 3);
    this.sat1.position.z = Math.sin(angle) * 2.3 * Math.cos(Math.PI / 3);

    this.renderer.render(this.scene, this.camera);
  }
}

// =====================================================================
// 4. 3D Time-Series Demand Ribbon & Wave Visualizer (retail-sales-forecast)
// =====================================================================
class MiniRetailForecast {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.container.innerHTML = "";

    const w = this.container.clientWidth || 320;
    const h = this.container.clientHeight || 200;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.set(2.2, 2.4, 4.0);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.root = new THREE.Group();
    this.scene.add(this.root);

    // Floor Reference Grid
    const grid = new THREE.GridHelper(3.5, 14, 0x8B5CF6, 0x1E293B);
    grid.position.y = -0.6;
    this.root.add(grid);

    // 3D Forecast Wave Surface Curves
    this.curves = [];
    const curveColors = [0x00E5FF, 0x8B5CF6, 0x10B981, 0xF59E0B];

    for (let c = 0; c < 4; c++) {
      const pts = [];
      const zOffset = (c * 0.5) - 0.75;
      for (let x = -1.6; x <= 1.6; x += 0.15) {
        pts.push(new THREE.Vector3(x, 0, zOffset));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: curveColors[c], linewidth: 2 });
      const line = new THREE.Line(geo, mat);
      this.root.add(line);
      this.curves.push({ line, zOffset, freq: 1.5 + c * 0.4 });
    }

    // Glowing Reorder Threshold Markers (Vertical Pillars)
    const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
    const pillarMat = new THREE.MeshBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.8 });
    const p1 = new THREE.Mesh(pillarGeo, pillarMat);
    p1.position.set(0.6, 0, 0);
    this.root.add(p1);

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const time = performance.now() * 0.001;

    this.root.rotation.y = time * 0.3;

    this.curves.forEach((c) => {
      const positions = c.line.geometry.attributes.position.array;
      let idx = 0;
      for (let x = -1.6; x <= 1.6; x += 0.15) {
        const y = Math.sin(x * c.freq + time * 2.0) * 0.35 + Math.cos(x * 1.2 - time) * 0.15;
        positions[idx * 3 + 1] = y;
        idx++;
      }
      c.line.geometry.attributes.position.needsUpdate = true;
    });

    this.renderer.render(this.scene, this.camera);
  }
}

// =====================================================================
// 5. 3D Regression Hyperplane & Outlier Visualizer (real-estate-valuation)
// =====================================================================
class MiniValuationPlane {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.container.innerHTML = "";

    const w = this.container.clientWidth || 320;
    const h = this.container.clientHeight || 200;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    this.camera.position.set(2.8, 2.2, 3.6);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.root = new THREE.Group();
    this.scene.add(this.root);

    // Translucent Regression Best-Fit Plane (R² = 0.88)
    const planeGeo = new THREE.PlaneGeometry(2.6, 2.2);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      wireframe: true
    });
    this.plane = new THREE.Mesh(planeGeo, planeMat);
    this.plane.rotation.x = Math.PI / 4;
    this.plane.rotation.y = -Math.PI / 6;
    this.root.add(this.plane);

    // 3D Point Cloud Samples
    const count = 75;
    const ptsGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 2.4;
      const z = (Math.random() - 0.5) * 2.0;
      // Regression line plus minor noise
      const y = (x * 0.45) + (z * 0.3) + (Math.random() - 0.5) * 0.35;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      // Color: Cyan for normal, Amber/Red for outliers
      const isOutlier = Math.random() > 0.88;
      col[i3] = isOutlier ? 1.0 : 0.0;
      col[i3 + 1] = isOutlier ? 0.35 : 0.9;
      col[i3 + 2] = isOutlier ? 0.2 : 1.0;
    }

    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    ptsGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const ptsMat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true });
    this.points = new THREE.Points(ptsGeo, ptsMat);
    this.root.add(this.points);

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const time = performance.now() * 0.001;

    this.root.rotation.y = time * 0.35;
    this.root.rotation.z = Math.sin(time * 0.4) * 0.08;

    this.renderer.render(this.scene, this.camera);
  }
}
