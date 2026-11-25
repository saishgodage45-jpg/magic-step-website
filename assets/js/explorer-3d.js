/*
 * MAGIC STEP — SolidWorks Assembly Explorer
 * Loads the exported SolidWorks GLB on demand; the separate hero model remains procedural.
 */

(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const PART_MATERIALS = Object.freeze({
    footplate: { prefix: "01_Footplate", color: "#B8692B", roughness: 0.7, metalness: 0.0 },
    piezo: { prefix: "02_Piezo_Disc", color: "#C9A227", roughness: 0.35, metalness: 0.8 },
    tray: { prefix: "04_Electronics_Tray", color: "#15181D", roughness: 0.55, metalness: 0.1 },
    breadboard: { prefix: "05_Breadboard", color: "#E6E3D8", roughness: 0.6, metalness: 0.0 },
    controller: { prefix: "06_Controller_Module", color: "#10151C", roughness: 0.5, metalness: 0.3 },
    cradle: { prefix: "07_Twin_Cell_Cradle", color: "#2B2F36", roughness: 0.6, metalness: 0.1 },
    cell: { prefix: "08_Cylindrical_Cell", color: "#1F5FD1", roughness: 0.4, metalness: 0.2 },
    capacitor: { prefix: "09_Capacitor", color: "#12306B", roughness: 0.45, metalness: 0.2 },
    externalLead: { prefix: "10_External_Lead", colors: ["#D32F2F", "#111111"], roughness: 0.5, metalness: 0.0 },
    diode: { prefix: "11_Axial_Diode", color: "#101010", roughness: 0.5, metalness: 0.1 },
    unmatched: { color: "#9AA3AD", roughness: 0.55, metalness: 0.0 }
  });

  const stage = $("#explorer-stage");
  const partInfo = $("#part-info");
  const partName = $("#part-name");
  const partStatus = $("#part-status");
  const partText = $("#part-text");
  const partClose = $("#part-info-close");

  const PARTS = [
    { key: "footplate", prefix: "01_Footplate", name: "Footplate", status: "MODEL COMPONENT", text: "300 × 160 × 10 mm platform for the Magic Step assembly.", layer: "footplate" },
    { key: "piezo", prefix: "02_Piezo_Disc", name: "Piezo Disc", status: "6 IN ASSEMBLY", text: "27 mm PZT disc, 1 of 6, arranged in a 2×3 matrix.", layer: "piezo" },
    { key: "tray", prefix: "04_Electronics_Tray", name: "Electronics Tray", status: "MODEL COMPONENT", text: "Housing tray for the electronics assembly.", layer: "electronics" },
    { key: "breadboard", prefix: "05_Breadboard", name: "400-Point Mini Breadboard", status: "MODEL COMPONENT", text: "Mini breadboard model for the electronics assembly.", layer: "electronics" },
    { key: "controller", prefix: "06_Controller_Module", name: "Controller Module", status: "ESP32 DEVKIT V1", text: "ESP32 DevKit V1 development board model.", layer: "electronics" },
    { key: "cradle", prefix: "07_Twin_Cell_Cradle", name: "Twin Cell Cradle", status: "MODEL COMPONENT", text: "Cradle designed to accommodate two cylindrical cells.", layer: "electronics" },
    { key: "cell", prefix: "08_Cylindrical_Cell", name: "Cylindrical Cell", status: "1S2P PACK", text: "Li-ion cell model; two cells form the project's 1S2P pack.", layer: "electronics" },
    { key: "capacitor", prefix: "09_Capacitor", name: "10 µF Capacitor", status: "MODEL COMPONENT", text: "10 µF capacitor model in the electronics assembly.", layer: "electronics" },
    { key: "lead", prefix: "10_External_Lead", name: "External Connecting Lead", status: "MODEL COMPONENT", text: "Insulated external electrical connecting lead.", layer: "leads" },
    { key: "diode", prefix: "11_Axial_Diode", name: "Axial Diode", status: "4 IN ASSEMBLY", text: "Axial diode model used in the rectifier circuit.", layer: "electronics" }
  ];
  const PARTS_BY_KEY = new Map(PARTS.map((part) => [part.key, part]));
  const viewState = {
    isExploded: false,
    layers: { footplate: true, piezo: true, electronics: true, leads: true }
  };
  let updateModel = () => {};
  let resetCamera = () => {};
  let clearModelSelection = () => {};

  function showPart(key) {
    const data = PARTS_BY_KEY.get(key);
    if (!data || !partInfo) return;
    if (partName) partName.textContent = data.name;
    if (partStatus) partStatus.textContent = data.status;
    if (partText) partText.textContent = data.text;
    partInfo.hidden = false;
  }

  partClose?.addEventListener("click", () => {
    if (partInfo) partInfo.hidden = true;
    clearModelSelection();
  });

  $$("[data-explode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      viewState.isExploded = btn.dataset.explode === "1";
      $$("[data-explode]").forEach((button) => {
        button.setAttribute("aria-pressed", String(button === btn));
      });
      updateModel();
    });
  });

  $$("[data-layer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const layer = btn.dataset.layer;
      if (!(layer in viewState.layers)) return;
      viewState.layers[layer] = !viewState.layers[layer];
      btn.setAttribute("aria-pressed", String(viewState.layers[layer]));
      updateModel();
    });
  });

  const dimBtn = $("[data-toggle='dims']");
  dimBtn?.addEventListener("click", () => {
    const overlay = $("#explorer-dims-overlay");
    const visible = dimBtn.getAttribute("aria-pressed") !== "true";
    dimBtn.setAttribute("aria-pressed", String(visible));
    if (overlay) overlay.hidden = !visible;
  });

  $("[data-action='reset']")?.addEventListener("click", () => {
    viewState.isExploded = false;
    $$("[data-explode]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.explode === "0"));
    });
    resetCamera();
    updateModel();
    if (partInfo) partInfo.hidden = true;
    clearModelSelection();
  });

  // SolidWorks GLB viewer. The export is fetched only after the explorer enters view.
  function initThreeJS() {
    if (!stage) return;

    const loadStatus = $("#explorer-load-status");
    const loadMessage = $("#explorer-load-message");
    const loadProgress = $("#explorer-load-progress");
    const dimensionsLabel = $("#explorer-overall-dimensions");

    function showLoadError(error) {
      console.error("Magic Step SolidWorks model load failed:", error);
      if (loadStatus) loadStatus.classList.add("is-error");
      if (loadMessage) loadMessage.textContent = "3D model could not load";
      if (loadProgress) loadProgress.hidden = true;
      if (dimensionsLabel) dimensionsLabel.textContent = "Overall model bounds unavailable.";
    }

    if (typeof THREE === "undefined" || !THREE.GLTFLoader || !THREE.OrbitControls || !THREE.RoomEnvironment) {
      showLoadError(new Error("Three.js, GLTFLoader, OrbitControls, or RoomEnvironment is unavailable."));
      return;
    }

    let scene;
    let camera;
    let renderer;
    let controls;
    let modelRoot;
    let sectionVisible = false;
    let loadStarted = false;
    let animationFrame = 0;
    let explodeProgress = 0;
    let explosionParts = [];
    let selectedMesh = null;
    let highlightedMesh = null;
    let highlightedMaterialStates = [];
    let defaultCameraPosition;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, stage.clientWidth / stage.clientHeight, 0.01, 10000);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(stage.clientWidth, stage.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      if (!THREE.SRGBColorSpace) renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      stage.appendChild(renderer.domElement);

      const hemisphereLight = new THREE.HemisphereLight(0xf4f8ff, 0x26313f, 0.32);
      scene.add(hemisphereLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
      keyLight.position.set(16, 24, 20);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -18;
      keyLight.shadow.camera.right = 18;
      keyLight.shadow.camera.top = 18;
      keyLight.shadow.camera.bottom = -18;
      keyLight.shadow.camera.near = 0.1;
      keyLight.shadow.camera.far = 80;
      keyLight.shadow.camera.updateProjectionMatrix();
      keyLight.shadow.radius = 4;
      keyLight.shadow.bias = -0.0002;
      scene.add(keyLight);

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const environmentTarget = pmremGenerator.fromScene(new THREE.RoomEnvironment(), 0.04);
      scene.environment = environmentTarget.texture;
      pmremGenerator.dispose();

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;
      controls.screenSpacePanning = false;

      function applyTheme() {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        const background = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
        scene.background = null;
        renderer.setClearColor(new THREE.Color(background || (isLight ? "#ffffff" : "#0b111a")), 0.08);
        renderer.toneMappingExposure = isLight ? 1.05 : 1;
      }

      new MutationObserver(applyTheme).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"]
      });
      applyTheme();

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      function clearHighlight() {
        highlightedMaterialStates.forEach(({ material, baseColor }) => {
          material.color.copy(baseColor);
          material.emissive.set(0x000000);
          material.emissiveIntensity = 0;
        });
        highlightedMaterialStates = [];
        highlightedMesh = null;
      }

      function setHighlight(mesh) {
        if (highlightedMesh === mesh) return;
        clearHighlight();
        if (!mesh) return;
        highlightedMesh = mesh;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        highlightedMaterialStates = materials
          .filter((material) => material && material.emissive)
          .map((material) => {
            const baseColor = material.userData.baseColor.clone();
            material.color.copy(baseColor);
            material.emissive.set(0x00e5ff);
            material.emissive.convertSRGBToLinear();
            material.emissiveIntensity = 0.35;
            return { material, baseColor };
          });
      }

      clearModelSelection = () => {
        selectedMesh = null;
        setHighlight(null);
        if (partInfo) partInfo.hidden = true;
      };

      document.addEventListener("click", (event) => {
        if (!selectedMesh || stage.contains(event.target) || partInfo?.contains(event.target)) return;
        clearModelSelection();
      });

      function findPartNode(mesh) {
        let partNode = mesh;
        while (partNode && !partNode.userData.magicStepPartKey && partNode !== modelRoot) {
          partNode = partNode.parent;
        }
        return partNode && partNode.userData.magicStepPartKey ? partNode : null;
      }

      function getPartIntersection(event) {
        if (!modelRoot || !renderer) return null;
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        return raycaster.intersectObject(modelRoot, true)
          .find((intersection) => findPartNode(intersection.object));
      }

      stage.addEventListener("pointermove", (event) => {
        if (selectedMesh) return;
        const intersection = getPartIntersection(event);
        setHighlight(intersection ? intersection.object : null);
      });

      stage.addEventListener("pointerleave", () => {
        if (!selectedMesh) setHighlight(null);
      });

      stage.addEventListener("click", (event) => {
        if (!modelRoot || !renderer) return;
        const intersection = getPartIntersection(event);
        if (!intersection) {
          selectedMesh = null;
          setHighlight(null);
          if (partInfo) partInfo.hidden = true;
          return;
        }

        const mesh = intersection.object;
        const partNode = findPartNode(mesh);
        if (selectedMesh === mesh) {
          selectedMesh = null;
          setHighlight(null);
          if (partInfo) partInfo.hidden = true;
          return;
        }
        selectedMesh = mesh;
        setHighlight(mesh);
        showPart(partNode.userData.magicStepPartKey);
      });

      function applyPartVisibility() {
        explosionParts.forEach(({ node, part }) => {
          const visible = part.layer === "leads"
            ? viewState.layers.electronics && viewState.layers.leads
            : viewState.layers[part.layer];
          node.visible = visible;
        });
      }

      updateModel = () => applyPartVisibility();

      function updateSize() {
        if (!renderer || !camera) return;
        const width = Math.max(stage.clientWidth, 1);
        const height = Math.max(stage.clientHeight, 1);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
      }
      window.addEventListener("resize", updateSize);

      function render() {
        animationFrame = 0;
        if (!sectionVisible) return;
        animationFrame = requestAnimationFrame(render);
        const target = viewState.isExploded ? 1 : 0;
        explodeProgress += (target - explodeProgress) * 0.1;
        if (Math.abs(target - explodeProgress) < 0.001) explodeProgress = target;
        explosionParts.forEach(({ node, assembledPosition, explodedPosition }) => {
          node.position.copy(assembledPosition).lerp(explodedPosition, explodeProgress);
        });
        controls.update();
        renderer.render(scene, camera);
      }

      function startRendering() {
        if (sectionVisible && !animationFrame) animationFrame = requestAnimationFrame(render);
      }

      function loadModel() {
        if (loadStarted) return;
        loadStarted = true;
        if (loadMessage) loadMessage.textContent = "Loading SolidWorks model…";
        if (loadProgress) {
          loadProgress.hidden = false;
          loadProgress.removeAttribute("value");
        }

        const loader = new THREE.GLTFLoader();
        loader.load(
          "assets/models/piezo_footstep.glb",
          (gltf) => {
            try {
              const model = gltf.scene;
              model.traverse((node) => {
                console.info("[Magic Step GLB] node:", node.name || "(unnamed)");
              });

              const sourceBounds = new THREE.Box3().setFromObject(model);
              if (sourceBounds.isEmpty()) throw new Error("The GLB contains no visible geometry.");
              const sourceSize = sourceBounds.getSize(new THREE.Vector3());
              const sourceCenter = sourceBounds.getCenter(new THREE.Vector3());
              const largestDimension = Math.max(sourceSize.x, sourceSize.y, sourceSize.z);
              if (!Number.isFinite(largestDimension) || largestDimension <= 0) {
                throw new Error("The GLB has invalid model dimensions.");
              }

              modelRoot = new THREE.Group();
              model.position.sub(sourceCenter);
              modelRoot.add(model);
              modelRoot.scale.setScalar(16 / largestDimension);
              scene.add(modelRoot);
              modelRoot.updateMatrixWorld(true);

              const bounds = new THREE.Box3().setFromObject(modelRoot);
              const size = bounds.getSize(new THREE.Vector3());
              const center = bounds.getCenter(new THREE.Vector3());
              if (dimensionsLabel) {
                const format = (value) => Number(value.toFixed(3)).toString();
                dimensionsLabel.textContent = `Overall model bounds: ${format(sourceSize.x)} × ${format(sourceSize.y)} × ${format(sourceSize.z)} GLB units`;
              }

              const partRoots = [];
              PARTS.forEach((part) => {
                const matches = [];
                model.traverse((node) => {
                  if (node.name.toLowerCase().startsWith(part.prefix.toLowerCase())) matches.push(node);
                });
                const roots = matches.filter((node) =>
                  !matches.some((candidate) => {
                    let parent = node.parent;
                    while (parent && parent !== candidate) parent = parent.parent;
                    return parent === candidate;
                  })
                );
                roots.forEach((node) => {
                  node.userData.magicStepPartKey = part.key;
                  partRoots.push({ node, part });
                });
                if (!roots.length) console.warn(`[Magic Step GLB] no node matched prefix "${part.prefix}"`);
              });

              let leadMaterialIndex = 0;
              model.traverse((node) => {
                if (!node.isMesh) return;

                let matchedConfig = null;
                let matchedNode = null;
                for (let ancestor = node; ancestor && ancestor !== modelRoot; ancestor = ancestor.parent) {
                  const name = ancestor.name.toLowerCase();
                  matchedConfig = Object.values(PART_MATERIALS).find((config) =>
                    config.prefix && name.startsWith(config.prefix.toLowerCase())
                  );
                  if (matchedConfig) {
                    matchedNode = ancestor;
                    break;
                  }
                }

                const config = matchedConfig || PART_MATERIALS.unmatched;
                let color = config.color;
                if (config.colors) {
                  const suffix = matchedNode.name.slice(config.prefix.length).match(/\d+/);
                  const index = suffix ? Math.max(Number(suffix[0]) - 1, 0) : leadMaterialIndex++;
                  color = config.colors[index % config.colors.length];
                }

                const meshName = node.name || "(unnamed)";
                const materialColor = new THREE.Color(color);
                materialColor.convertSRGBToLinear();
                const materialOptions = {
                  color: materialColor,
                  roughness: config.roughness,
                  metalness: config.metalness,
                  emissive: 0x000000,
                  emissiveIntensity: 0,
                  transparent: false,
                  opacity: 1,
                  wireframe: false,
                  envMapIntensity: 0.8
                };
                const createMaterial = () => {
                  const material = new THREE.MeshStandardMaterial(materialOptions);
                  material.userData.baseColor = material.color.clone();
                  node.castShadow = true;
                  node.receiveShadow = true;
                  return material;
                };
                node.material = Array.isArray(node.material)
                  ? node.material.map(createMaterial)
                  : createMaterial();

                const logData = {
                  mesh: meshName,
                  component: matchedNode ? matchedNode.name : "unmatched",
                  color,
                  roughness: config.roughness,
                  metalness: config.metalness
                };
                if (!matchedNode) console.warn("[Magic Step GLB] unmatched mesh assigned neutral material:", meshName);
                console.info("[Magic Step GLB] material assigned:", logData);
              });
              applyTheme();

              const maxDimension = Math.max(size.x, size.y, size.z);
              const boundingSphereRadius = size.length() / 2;
              const aspect = Math.max(stage.clientWidth / Math.max(stage.clientHeight, 1), 0.1);
              const verticalFov = THREE.MathUtils.degToRad(camera.fov);
              const limitingFov = 2 * Math.atan(Math.tan(verticalFov / 2) * Math.min(aspect, 1));
              const distance = (boundingSphereRadius / Math.sin(limitingFov / 2)) * 1.12;
              const direction = new THREE.Vector3(1, 0.72, 1.18).normalize();
              defaultCameraPosition = direction.multiplyScalar(distance);
              camera.position.copy(defaultCameraPosition);
              camera.near = Math.max(distance / 1000, 0.001);
              camera.far = distance * 100;
              camera.updateProjectionMatrix();
              controls.target.copy(center);
              controls.minDistance = Math.max(maxDimension * 0.35, 0.1);
              controls.maxDistance = distance * 5;
              controls.update();

              const explosionDistance = Math.max(maxDimension * 0.16, 0.5);
              model.updateMatrixWorld(true);
              partRoots.forEach(({ node, part }) => {
                const assembledPosition = node.position.clone();
                const worldPosition = node.getWorldPosition(new THREE.Vector3());
                const offset = new THREE.Vector3();
                if (part.key === "footplate") {
                  offset.y = size.y * 0.35;
                } else if (part.key === "piezo") {
                  offset.y = -size.y * 0.06;
                  const radial = worldPosition.clone().sub(center);
                  radial.y = 0;
                  if (radial.lengthSq() > 0) offset.add(radial.normalize().multiplyScalar(explosionDistance * 0.65));
                } else if (part.key === "lead") {
                  offset.set(size.x * 0.34, size.y * 0.12, 0);
                } else {
                  offset.set(size.x * 0.34, 0, size.z * 0.04);
                }
                const parent = node.parent;
                const explodedPosition = parent
                  ? parent.worldToLocal(worldPosition.add(offset))
                  : worldPosition.add(offset);
                explosionParts.push({ node, part, assembledPosition, explodedPosition });
              });
              applyPartVisibility();
              updateSize();
              if (loadProgress) loadProgress.value = 100;
              if (loadMessage) loadMessage.textContent = "SolidWorks model loaded.";
              window.setTimeout(() => {
                if (loadStatus) loadStatus.hidden = true;
              }, 700);
            } catch (error) {
              showLoadError(error);
            }
          },
          (event) => {
            if (!loadProgress) return;
            if (event.lengthComputable && event.total > 0) {
              loadProgress.value = Math.round((event.loaded / event.total) * 100);
            } else {
              loadProgress.removeAttribute("value");
            }
          },
          showLoadError
        );
      }

      resetCamera = () => {
        if (!defaultCameraPosition || !controls) return;
        camera.position.copy(defaultCameraPosition);
        controls.target.set(0, 0, 0);
        controls.update();
      };

      const section = $("#explorer-section") || stage;
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            sectionVisible = entry.isIntersecting;
            if (sectionVisible) {
              loadModel();
              startRendering();
            } else if (animationFrame) {
              cancelAnimationFrame(animationFrame);
              animationFrame = 0;
            }
          });
        }, { rootMargin: "80px", threshold: 0.01 });
        observer.observe(section);
      } else {
        sectionVisible = true;
        loadModel();
        startRendering();
      }
    } catch (error) {
      showLoadError(error);
    }
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
