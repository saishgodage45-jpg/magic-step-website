/*
 * MAGIC STEP — Interactive 3D Tile Explorer
 * Procedural 3D model of the footstep power generation platform.
 * Supports Three.js WebGL rendering with OrbitControls and automatic isometric fallback.
 */

(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const stage = $("#explorer-stage");
  const partInfo = $("#part-info");
  const partName = $("#part-name");
  const partStatus = $("#part-status");
  const partText = $("#part-text");
  const partClose = $("#part-info-close");

  // Component Information Registry
  const PARTS_DATA = {
    topPlate: {
      name: "Upper Tread Stepping Plate",
      status: "COMPLETED",
      text: "Impact-absorbing upper stepping tread plate. Distributes human footstrike forces across the six underlying damping pads without helical springs."
    },
    dampers: {
      name: "Force Distribution Damper Pads (6×)",
      status: "COMPLETED",
      text: "Six high-density neoprene buffer pads situated directly above each transducer disc. Prevents destructive point-loading and protects fragile PZT ceramic crystals from mechanical fracture."
    },
    piezo: {
      name: "Piezoelectric Discs (6× ⌀27 mm)",
      status: "COMPLETED",
      text: "Six lead zirconate titanate (PZT) active discs mounted on brass substrates in a 2-row × 3-column matrix. Converts compressive foot strain into alternating charge pulses."
    },
    basePlate: {
      name: "Wooden Base Platform (300 × 160 × 10 mm)",
      status: "COMPLETED",
      text: "Rigid hardwood foundation machined to 300 mm length, 160 mm width, and 10 mm thickness. Provides an unyielding planar reaction surface."
    },
    wiring: {
      name: "Parallel Wiring Harness",
      status: "COMPLETED",
      text: "Low-resistance AWG26 hookup wiring joining all six transducer brass substrates (+) and ceramic electrodes (-) in parallel to sum current pulses."
    },
    enclosure: {
      name: "Electronics Console & 16×2 LCD",
      status: "COMPLETED",
      text: "Modular electronics enclosure housing the ESP32 DevKit V1, DB107 rectifier, 10 µF capacitor buffer, 1S2P battery pack, and 16×2 I²C display."
    }
  };

  function showPart(key) {
    const data = PARTS_DATA[key];
    if (!data || !partInfo) return;
    if (partName) partName.textContent = data.name;
    if (partStatus) partStatus.textContent = data.status;
    if (partText) partText.textContent = data.text;
    partInfo.hidden = false;
  }

  if (partClose) {
    partClose.addEventListener("click", () => {
      if (partInfo) partInfo.hidden = true;
    });
  }

  // State
  const viewState = {
    isExploded: false,
    showDims: false,
    layers: {
      topPlate: true,
      dampers: true,
      piezo: true,
      basePlate: true,
      wiring: true,
      enclosure: false
    }
  };

  // Wire Toolbar Buttons
  $$("[data-explode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const explode = btn.dataset.explode === "1";
      viewState.isExploded = explode;
      $$("[data-explode]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      if (window.__magicStepUpdate3D) window.__magicStepUpdate3D();
    });
  });

  $$("[data-layer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const layer = btn.dataset.layer;
      if (layer in viewState.layers) {
        viewState.layers[layer] = !viewState.layers[layer];
        btn.setAttribute("aria-pressed", String(viewState.layers[layer]));
        if (window.__magicStepUpdate3D) window.__magicStepUpdate3D();
      }
    });
  });

  const dimBtn = $("[data-toggle='dims']");
  if (dimBtn) {
    dimBtn.addEventListener("click", () => {
      viewState.showDims = !viewState.showDims;
      dimBtn.setAttribute("aria-pressed", String(viewState.showDims));
      const dimOverlay = $("#explorer-dims-overlay");
      if (dimOverlay) dimOverlay.hidden = !viewState.showDims;
    });
  }

  const resetBtn = $("[data-action='reset']");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      viewState.isExploded = false;
      $$("[data-explode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.explode === "0")));
      if (window.__magicStepResetCamera) window.__magicStepResetCamera();
      if (partInfo) partInfo.hidden = true;
    });
  }

  // Three.js 3D Viewer Implementation
  function initThreeJS() {
    if (!stage || typeof THREE === "undefined") {
      initCanvasFallback();
      return;
    }

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, stage.clientWidth / stage.clientHeight, 0.1, 1000);
      camera.position.set(24, 28, 36);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(stage.clientWidth, stage.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      stage.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
      dirLight.position.set(20, 40, 25);
      scene.add(dirLight);

      const warmLight = new THREE.DirectionalLight(0xf59e0b, 0.8);
      warmLight.position.set(-20, 20, -20);
      scene.add(warmLight);

      // Model Group Hierarchy
      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      // Materials
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x855b32, roughness: 0.6, metalness: 0.1 });
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.8 });
      const silverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4, metalness: 0.6 });
      const rubberMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
      const treadMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4, transparent: true, opacity: 0.85 });
      const wireMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });

      // 1. Base Plate (300mm x 160mm x 10mm -> scaled to 15 x 8 x 0.5)
      const baseGeo = new THREE.BoxGeometry(15, 0.5, 8);
      const baseMesh = new THREE.Mesh(baseGeo, woodMat);
      baseMesh.position.y = 0;
      baseMesh.userData = { key: "basePlate" };
      rootGroup.add(baseMesh);

      // 2. Six Piezo Discs (2 rows x 3 columns)
      const piezoGroup = new THREE.Group();
      piezoGroup.userData = { key: "piezo" };
      const discBrassGeo = new THREE.CylinderGeometry(1.35, 1.35, 0.05, 32);
      const discCeramicGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.06, 32);

      const xCoords = [-4.5, 0, 4.5];
      const zCoords = [-2.0, 2.0];

      xCoords.forEach((x) => {
        zCoords.forEach((z) => {
          const brass = new THREE.Mesh(discBrassGeo, goldMat);
          brass.position.set(x, 0.3, z);
          const ceramic = new THREE.Mesh(discCeramicGeo, silverMat);
          ceramic.position.set(x, 0.33, z);
          piezoGroup.add(brass);
          piezoGroup.add(ceramic);
        });
      });
      rootGroup.add(piezoGroup);

      // 3. Force Distribution Damper Pads (6x)
      const dampersGroup = new THREE.Group();
      dampersGroup.userData = { key: "dampers" };
      const damperGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.15, 24);
      xCoords.forEach((x) => {
        zCoords.forEach((z) => {
          const d = new THREE.Mesh(damperGeo, rubberMat);
          d.position.set(x, 0.45, z);
          dampersGroup.add(d);
        });
      });
      rootGroup.add(dampersGroup);

      // 4. Upper Tread Stepping Plate
      const treadGeo = new THREE.BoxGeometry(14.8, 0.35, 7.8);
      const treadMesh = new THREE.Mesh(treadGeo, treadMat);
      treadMesh.position.y = 0.7;
      treadMesh.userData = { key: "topPlate" };
      rootGroup.add(treadMesh);

      // Controls (Drag Orbit)
      let isDragging = false;
      let prevMousePos = { x: 0, y: 0 };
      let spherical = { rotY: 0.6, rotX: 0.5, dist: 40 };

      function updateCamera() {
        camera.position.x = spherical.dist * Math.sin(spherical.rotY) * Math.cos(spherical.rotX);
        camera.position.y = spherical.dist * Math.sin(spherical.rotX) + 2;
        camera.position.z = spherical.dist * Math.cos(spherical.rotY) * Math.cos(spherical.rotX);
        camera.lookAt(0, 0, 0);
      }
      updateCamera();

      stage.addEventListener("mousedown", (e) => {
        isDragging = true;
        prevMousePos = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener("mouseup", () => { isDragging = false; });
      stage.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - prevMousePos.x;
        const dy = e.clientY - prevMousePos.y;
        spherical.rotY += dx * 0.008;
        spherical.rotX = Math.max(0.1, Math.min(1.4, spherical.rotX - dy * 0.008));
        prevMousePos = { x: e.clientX, y: e.clientY };
        updateCamera();
      });

      stage.addEventListener("wheel", (e) => {
        e.preventDefault();
        spherical.dist = Math.max(16, Math.min(65, spherical.dist + e.deltaY * 0.03));
        updateCamera();
      }, { passive: false });

      // Click Part Selection via Raycaster
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      stage.addEventListener("click", (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(rootGroup.children, true);
        if (intersects.length > 0) {
          let obj = intersects[0].object;
          while (obj && !obj.userData.key && obj.parent) {
            obj = obj.parent;
          }
          if (obj && obj.userData.key) {
            showPart(obj.userData.key);
          }
        }
      });

      // Update 3D scene when state changes
      window.__magicStepUpdate3D = () => {
        // Explode heights
        const exp = viewState.isExploded ? 1 : 0;
        treadMesh.position.y = 0.7 + exp * 4.2;
        dampersGroup.position.y = exp * 2.8;
        piezoGroup.position.y = exp * 1.4;

        // Layer visibility
        baseMesh.visible = viewState.layers.basePlate;
        piezoGroup.visible = viewState.layers.piezo;
        dampersGroup.visible = viewState.layers.dampers;
        treadMesh.visible = viewState.layers.topPlate;
      };

      window.__magicStepResetCamera = () => {
        spherical = { rotY: 0.6, rotX: 0.5, dist: 40 };
        updateCamera();
        window.__magicStepUpdate3D();
      };

      // Render loop
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener("resize", () => {
        if (!stage) return;
        camera.aspect = stage.clientWidth / stage.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(stage.clientWidth, stage.clientHeight);
      });
    } catch (err) {
      console.warn("Three.js initialization failed, using isometric fallback:", err);
      initCanvasFallback();
    }
  }

  // Fallback Canvas Isometric Renderer if WebGL / Three.js is not loaded
  function initCanvasFallback() {
    if (!stage) return;
    stage.innerHTML = `
      <div style="position:absolute;inset:0;display:grid;place-items:center;padding:20px;text-align:center;">
        <img src="assets/media/cad/isometric-view.svg" alt="Magic Step CAD Isometric Assembly" style="max-height:85%;max-width:90%;border:1px solid var(--line);border-radius:8px;background:var(--plate);" />
      </div>
    `;
    $$("[data-layer]").forEach((btn) => {
      btn.addEventListener("click", () => showPart(btn.dataset.layer));
    });
  }

  // Hero 3D Model Background Visualization
  function initHeroModel() {
    const heroHost = $("#hero-canvas-host");
    if (!heroHost) return;

    if (typeof THREE === "undefined") {
      heroHost.innerHTML = `
        <div style="position:absolute;right:4%;top:50%;transform:translateY(-50%);width:min(50%,680px);pointer-events:none;opacity:0.95;">
          <img src="assets/media/cad/isometric-view.svg" alt="Magic Step 3D CAD Isometric Tile" style="width:100%;filter:drop-shadow(0 20px 30px rgba(0,0,0,0.6));">
        </div>
      `;
      return;
    }

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, heroHost.clientWidth / heroHost.clientHeight, 0.1, 1000);
      
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(heroHost.clientWidth, heroHost.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      heroHost.appendChild(renderer.domElement);

      // Position camera so model sits nicely on the right half
      camera.position.set(window.innerWidth > 991 ? -10 : 0, 24, 38);
      camera.lookAt(window.innerWidth > 991 ? 12 : 0, 0, 0);

      const amb = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(amb);
      const dir = new THREE.DirectionalLight(0x38bdf8, 1.4);
      dir.position.set(20, 35, 20);
      scene.add(dir);
      const dir2 = new THREE.DirectionalLight(0xf59e0b, 0.9);
      dir2.position.set(-20, 20, -10);
      scene.add(dir2);

      const heroGroup = new THREE.Group();
      heroGroup.position.set(window.innerWidth > 991 ? 12 : 0, -1, 0);
      scene.add(heroGroup);

      const woodMat = new THREE.MeshStandardMaterial({ color: 0x855b32, roughness: 0.6 });
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.8 });
      const silverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4, metalness: 0.6 });
      const rubberMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
      const treadMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4, transparent: true, opacity: 0.88 });

      // Base plate
      const base = new THREE.Mesh(new THREE.BoxGeometry(16, 0.6, 9), woodMat);
      heroGroup.add(base);

      // 6 Discs
      const xC = [-4.8, 0, 4.8];
      const zC = [-2.2, 2.2];
      xC.forEach((x) => {
        zC.forEach((z) => {
          const b = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.06, 24), goldMat);
          b.position.set(x, 0.35, z);
          const c = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.07, 24), silverMat);
          c.position.set(x, 0.38, z);
          heroGroup.add(b, c);

          const d = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.15, 16), rubberMat);
          d.position.set(x, 0.5, z);
          heroGroup.add(d);
        });
      });

      // Top plate
      const topPlate = new THREE.Mesh(new THREE.BoxGeometry(15.8, 0.4, 8.8), treadMat);
      topPlate.position.y = 0.8;
      heroGroup.add(topPlate);

      // Rotate slowly
      heroGroup.rotation.x = 0.35;
      heroGroup.rotation.y = -0.6;

      function heroAnim() {
        requestAnimationFrame(heroAnim);
        heroGroup.rotation.y += 0.0025;
        renderer.render(scene, camera);
      }
      heroAnim();

      window.addEventListener("resize", () => {
        if (!heroHost) return;
        camera.aspect = heroHost.clientWidth / heroHost.clientHeight;
        camera.position.x = window.innerWidth > 991 ? -10 : 0;
        camera.lookAt(window.innerWidth > 991 ? 12 : 0, 0, 0);
        heroGroup.position.x = window.innerWidth > 991 ? 12 : 0;
        camera.updateProjectionMatrix();
        renderer.setSize(heroHost.clientWidth, heroHost.clientHeight);
      });
    } catch (e) {
      console.warn("Hero 3D model failed to load:", e);
    }
  }

  // Initialize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initThreeJS();
      initHeroModel();
    });
  } else {
    initThreeJS();
    initHeroModel();
  }
})();
