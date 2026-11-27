/*
 * MAGIC STEP — Interactive procedural assembly explorer.
 * The scene is built from local Three.js geometry; it does not fetch a model file.
 */

(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const componentInfo = {
    footplate: {
      name: "Wooden Footplate",
      status: "PLATFORM",
      text: "300 × 160 × 10 mm wooden platform. It receives foot pressure and transfers force to the six piezoelectric discs."
    },
    piezo: {
      name: "Piezoelectric Disc",
      status: "6 × Ø27 MM · 2 × 3 ARRAY",
      text: "A 27 mm piezoelectric sensor bonded to the underside of the wooden plate converts footstep-induced mechanical strain into an electrical charge."
    },
    tray: {
      name: "Electronics Tray",
      status: "SEPARATE ENCLOSURE",
      text: "Black enclosure beside the wooden platform. It holds the electrical conditioning, charging, controller, and storage components."
    },
    breadboard: {
      name: "400-Point Mini Breadboard",
      status: "CIRCUIT PROTOTYPING",
      text: "Solderless board for arranging and connecting the prototype circuit during development."
    },
    controller: {
      name: "ESP32 Development Board",
      status: "ESP32 CONTROLLER",
      text: "Microcontroller board for reading conditioned electrical signals and running the project firmware."
    },
    diode: {
      name: "Bridge Rectifier Diode",
      status: "4-DIODE RECTIFIER",
      text: "Four diodes arranged to rectify the piezoelectric output into a single-polarity supply."
    },
    capacitor: {
      name: "50 µF Capacitor",
      status: "ENERGY BUFFER",
      text: "Buffers and smooths rectified electrical output before it reaches downstream circuit stages."
    },
    boost: {
      name: "Boost Converter",
      status: "DC–DC CONVERSION",
      text: "A DC–DC conversion stage in the electronics assembly for conditioning harvested electrical energy."
    },
    charger: {
      name: "TP4056 Charging Module",
      status: "CELL CHARGING",
      text: "Charging module listed in the prototype inventory; compatibility and protection requirements need supervisor verification."
    },
    holder: {
      name: "Battery Holder",
      status: "ONE CELL",
      text: "Holds the single listed 3.7 V lithium-ion battery."
    },
    cell: {
      name: "3.7 V Lithium-Ion Battery",
      status: "RECHARGEABLE STORAGE",
      text: "Single listed energy-storage component; confirm the cell and protection requirements before charging."
    },
    wire: {
      name: "External Connecting Wire",
      status: "PLATFORM TO ENCLOSURE",
      text: "Insulated leads carry the piezoelectric output from the footplate assembly to the separate electronics tray."
    }
  };

  const stage = $("#explorer-stage");
  if (!stage) return;

  const partInfo = $("#part-info");
  const partName = $("#part-name");
  const partStatus = $("#part-status");
  const partText = $("#part-text");
  const partClose = $("#part-info-close");
  const loadStatus = $("#explorer-load-status");
  const loadMessage = $("#explorer-load-message");
  const loadProgress = $("#explorer-load-progress");
  const dimensionsOverlay = $("#explorer-dims-overlay");
  const dimensionsLabel = $("#explorer-overall-dimensions");

  let clearSelection = () => {};
  let resetView = () => {};
  const viewState = {
    exploded: false,
    layers: { footplate: true, piezo: true, electronics: true, leads: true }
  };

  function showComponent(key) {
    const data = componentInfo[key];
    if (!data || !partInfo) return;
    if (partName) partName.textContent = data.name;
    if (partStatus) partStatus.textContent = data.status;
    if (partText) partText.textContent = data.text;
    partInfo.hidden = false;
  }

  $$("[data-explode]").forEach((button) => {
    button.addEventListener("click", () => {
      viewState.exploded = button.dataset.explode === "1";
      $$("[data-explode]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
    });
  });

  $$("[data-layer]").forEach((button) => {
    button.addEventListener("click", () => {
      const layer = button.dataset.layer;
      if (!(layer in viewState.layers)) return;
      viewState.layers[layer] = !viewState.layers[layer];
      button.setAttribute("aria-pressed", String(viewState.layers[layer]));
    });
  });

  const dimensionsButton = $("[data-toggle='dims']");
  dimensionsButton?.addEventListener("click", () => {
    const visible = dimensionsButton.getAttribute("aria-pressed") !== "true";
    dimensionsButton.setAttribute("aria-pressed", String(visible));
    if (dimensionsOverlay) dimensionsOverlay.hidden = !visible;
  });

  $("[data-action='reset']")?.addEventListener("click", () => {
    viewState.exploded = false;
    $$("[data-explode]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.explode === "0"));
    });
    resetView();
    clearSelection();
  });

  partClose?.addEventListener("click", () => clearSelection());

  function initThreeJS() {
    if (typeof THREE === "undefined" || !THREE.OrbitControls) {
      showError(new Error("Three.js or OrbitControls was unavailable."));
      return;
    }

    let renderer;
    let animationFrame = 0;
    let sectionVisible = true;
    let selectedPart = null;
    let hoveredMesh = null;
    const animatedParts = [];
    const allParts = [];

    function showError(error) {
      console.error("Magic Step 3D viewer initialization failed:", error);
      if (loadStatus) loadStatus.classList.add("is-error");
      if (loadMessage) loadMessage.textContent = "3D model could not load";
      if (loadProgress) loadProgress.hidden = true;
    }

    if (loadMessage) loadMessage.textContent = "Building the interactive 3D prototype…";
    if (loadProgress) {
      loadProgress.hidden = false;
      loadProgress.removeAttribute("value");
    }

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 100);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(Math.max(stage.clientWidth, 1), Math.max(stage.clientHeight, 1));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      if ("outputColorSpace" in renderer && THREE.SRGBColorSpace) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
      } else if (THREE.sRGBEncoding) {
        renderer.outputEncoding = THREE.sRGBEncoding;
      }
      if (THREE.ACESFilmicToneMapping !== undefined) {
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
      }
      stage.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xe4f2ff, 0x342618, 0.34));
      const keyLight = new THREE.DirectionalLight(0xffffff, 0.52);
      keyLight.position.set(-0.25, 0.55, 0.4);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -0.7;
      keyLight.shadow.camera.right = 0.7;
      keyLight.shadow.camera.top = 0.7;
      keyLight.shadow.camera.bottom = -0.7;
      keyLight.shadow.bias = -0.0001;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x55bdf2, 0.85);
      fillLight.position.set(0.45, 0.22, -0.35);
      fillLight.intensity = 0.12;
      scene.add(fillLight);

      const model = new THREE.Group();
      scene.add(model);

      const themeObserver = new MutationObserver(() => {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        scene.background = null;
        renderer.setClearColor(new THREE.Color(isLight ? "#f5f8fc" : "#0b111a"), 0);
        renderer.toneMappingExposure = isLight ? 0.9 : 0.82;
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"]
      });
      const isLightTheme = document.documentElement.getAttribute("data-theme") === "light";
      renderer.setClearColor(new THREE.Color(isLightTheme ? "#f5f8fc" : "#0b111a"), 0);
      renderer.toneMappingExposure = isLightTheme ? 0.9 : 0.82;

      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = true;
      controls.screenSpacePanning = true;
      controls.minDistance = 0.24;
      controls.maxDistance = 2.4;
      controls.target.set(0.08, 0.018, 0);
      const initialCameraPosition = new THREE.Vector3(0.47, 0.39, 0.52);
      camera.position.copy(initialCameraPosition);
      controls.update();

      const makeMaterial = (color, roughness = 0.55, metalness = 0) => {
        const material = new THREE.MeshStandardMaterial({
          color,
          roughness,
          metalness,
          emissive: 0x000000,
          emissiveIntensity: 0
        });
        return material;
      };

      const wood = makeMaterial("#8a491f", 0.78);
      const woodEdge = makeMaterial("#70401f", 0.82);
      const brass = makeMaterial("#c9a227", 0.35, 0.72);
      const ceramic = makeMaterial("#e5e0d1", 0.42, 0.05);
      const adhesive = makeMaterial("#4b3020", 0.88);
      const blackPlastic = makeMaterial("#171b22", 0.58, 0.08);
      const trayInterior = makeMaterial("#090c11", 0.8);
      const pcb = makeMaterial("#14533c", 0.55, 0.12);
      const breadboardMaterial = makeMaterial("#e7e4dc", 0.68);
      const holeMaterial = makeMaterial("#737c84", 0.72, 0.12);
      const blue = makeMaterial("#1763cb", 0.42, 0.16);
      const metal = makeMaterial("#9ba6af", 0.32, 0.7);
      const red = makeMaterial("#d32f2f", 0.5);
      const wireBlack = makeMaterial("#17191c", 0.65);
      const capBlue = makeMaterial("#183a78", 0.48, 0.12);
      const whitePrint = makeMaterial("#dce6e8", 0.42, 0.18);
      const gold = makeMaterial("#d0aa45", 0.38, 0.65);

      const box = (parent, size, position, material, options = {}) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
        mesh.position.set(...position);
        mesh.castShadow = options.castShadow !== false;
        mesh.receiveShadow = true;
        mesh.userData.selectable = options.selectable !== false;
        parent.add(mesh);
        return mesh;
      };

      const cylinder = (parent, radiusTop, radiusBottom, height, position, material, segments = 28, rotationX = 0) => {
        const mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments),
          material
        );
        mesh.position.set(...position);
        mesh.rotation.x = rotationX;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
      };

      const makePart = (key, layer, position, explodedOffset = [0, 0, 0]) => {
        const group = new THREE.Group();
        group.position.set(...position);
        group.userData.partKey = key;
        group.userData.layer = layer;
        group.userData.explodedOffset = new THREE.Vector3(...explodedOffset);
        model.add(group);
        allParts.push(group);
        animatedParts.push({
          group,
          assembled: group.position.clone(),
          exploded: group.position.clone().add(group.userData.explodedOffset)
        });
        return group;
      };

      const piezoPositions = [];
      [-0.082, 0, 0.082].forEach((x) => {
        [-0.038, 0.038].forEach((z) => piezoPositions.push([x, z]));
      });

      const footplate = makePart("footplate", "footplate", [0, 0.023, 0], [0, 0.065, 0]);
      box(footplate, [0.3, 0.01, 0.16], [0, 0, 0], wood);
      box(footplate, [0.3, 0.002, 0.16], [0, -0.0058, 0], woodEdge, { selectable: false });
      [-0.145, 0.145].forEach((x) => {
        [-0.072, 0.072].forEach((z) => {
          cylinder(footplate, 0.0017, 0.0017, 0.0005, [x, 0.00525, z], woodEdge, 12);
        });
      });

      piezoPositions.forEach(([x, z], index) => {
        const disc = makePart("piezo", "piezo", [x, 0.0167, z], [x * 0.14, -0.03, z * 0.18]);
        cylinder(disc, 0.0135, 0.0135, 0.002, [0, 0, 0], brass, 36);
        cylinder(disc, 0.0126, 0.0126, 0.0003, [0, 0.00115, 0], adhesive, 36);
        cylinder(disc, 0.0105, 0.0105, 0.0008, [0, -0.0014, 0], ceramic, 36);
        const label = new THREE.Object3D();
        label.name = `piezo-disc-${index + 1}`;
        disc.add(label);
      });

      const tray = makePart("tray", "electronics", [0.258, 0.012, 0], [0, -0.027, 0]);
      box(tray, [0.15, 0.008, 0.1], [0, 0, 0], blackPlastic);
      box(tray, [0.137, 0.0015, 0.087], [0, 0.0048, 0], trayInterior, { selectable: false });
      box(tray, [0.15, 0.018, 0.004], [0, 0.009, -0.048], blackPlastic);
      box(tray, [0.15, 0.018, 0.004], [0, 0.009, 0.048], blackPlastic);
      box(tray, [0.004, 0.018, 0.1], [-0.073, 0.009, 0], blackPlastic);
      box(tray, [0.004, 0.018, 0.1], [0.073, 0.009, 0], blackPlastic);
      [-0.066, 0.066].forEach((x) => {
        [-0.041, 0.041].forEach((z) => {
          cylinder(tray, 0.002, 0.002, 0.001, [x, 0.019, z], metal, 12);
        });
      });

      const breadboard = makePart("breadboard", "electronics", [0.224, 0.0215, -0.012], [0, 0.045, -0.012]);
      box(breadboard, [0.06, 0.003, 0.038], [0, 0, 0], breadboardMaterial);
      box(breadboard, [0.058, 0.0008, 0.004], [0, 0.0019, -0.015], red, { selectable: false });
      box(breadboard, [0.058, 0.0008, 0.004], [0, 0.0019, 0.015], blue, { selectable: false });
      for (let column = 0; column < 16; column += 1) {
        for (let row = 0; row < 4; row += 1) {
          cylinder(
            breadboard,
            0.00072,
            0.00072,
            0.0004,
            [-0.025 + column * 0.0033, 0.0019, -0.008 + row * 0.0053],
            holeMaterial,
            6
          );
        }
      }

      const controller = makePart("controller", "electronics", [0.222, 0.025, -0.012], [0, 0.055, 0]);
      box(controller, [0.044, 0.003, 0.022], [0, 0, 0], pcb);
      box(controller, [0.019, 0.0035, 0.014], [0, 0.0031, 0], blackPlastic);
      box(controller, [0.009, 0.002, 0.013], [-0.015, 0.003, 0], metal);
      for (let pin = 0; pin < 8; pin += 1) {
        const x = -0.018 + pin * 0.0052;
        box(controller, [0.0012, 0.0012, 0.002], [x, 0.0021, -0.010], gold, { selectable: false });
        box(controller, [0.0012, 0.0012, 0.002], [x, 0.0021, 0.010], gold, { selectable: false });
      }

      const rectifier = makePart("diode", "electronics", [0.225, 0.016, 0.032], [-0.015, 0.038, 0.012]);
      const diodePositions = [[-0.007, -0.004, 0], [0.007, -0.004, 0], [-0.007, 0.004, 0], [0.007, 0.004, 0]];
      diodePositions.forEach(([x, z]) => {
        cylinder(rectifier, 0.0018, 0.0018, 0.012, [x, 0.0018, z], wireBlack, 12, Math.PI / 2);
        box(rectifier, [0.0012, 0.0016, 0.0016], [x, 0.0018, z - 0.004], metal, { selectable: false });
      });

      const capacitor = makePart("capacitor", "electronics", [0.253, 0.018, 0.032], [0, 0.042, 0]);
      cylinder(capacitor, 0.0055, 0.0055, 0.012, [0, 0, 0], capBlue, 24);
      cylinder(capacitor, 0.0057, 0.0057, 0.001, [0, 0.0065, 0], metal, 24);
      box(capacitor, [0.001, 0.004, 0.0005], [0, 0.002, 0.0056], whitePrint, { selectable: false });

      const boost = makePart("boost", "electronics", [0.275, 0.017, -0.024], [0, 0.045, -0.012]);
      box(boost, [0.026, 0.003, 0.018], [0, 0, 0], pcb);
      cylinder(boost, 0.004, 0.004, 0.005, [-0.006, 0.004, 0], metal, 18);
      box(boost, [0.007, 0.003, 0.007], [0.007, 0.003, 0], blackPlastic);

      const charger = makePart("charger", "electronics", [0.285, 0.017, 0.013], [0, 0.045, 0.012]);
      box(charger, [0.025, 0.003, 0.016], [0, 0, 0], pcb);
      box(charger, [0.008, 0.003, 0.007], [0, 0.003, 0], blackPlastic);
      box(charger, [0.004, 0.002, 0.004], [-0.008, 0.0025, 0], red);

      const holder = makePart("holder", "electronics", [0.296, 0.017, -0.012], [0.025, 0.025, 0]);
      box(holder, [0.046, 0.004, 0.077], [0, 0, 0], blackPlastic);
      [-0.019, 0.019].forEach((z) => {
        box(holder, [0.003, 0.007, 0.062], [-0.020, 0.005, z], blackPlastic);
        box(holder, [0.003, 0.007, 0.062], [0.020, 0.005, z], blackPlastic);
      });

      const cell = makePart("cell", "electronics", [0.296, 0.0255, -0.012], [0, 0.045, 0]);
      cylinder(cell, 0.0088, 0.0088, 0.065, [0, 0, 0], blue, 28, Math.PI / 2);
      cylinder(cell, 0.0075, 0.0075, 0.001, [0, 0, 0.033], metal, 24, Math.PI / 2);
      cylinder(cell, 0.002, 0.002, 0.001, [0, 0, 0.034], gold, 16, Math.PI / 2);
      cell.name = "3.7V-lithium-ion-cell";

      const wires = makePart("wire", "leads", [0, 0, 0], [0.014, 0.012, 0]);
      const addWire = (parent, points, material) => {
        const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
        const mesh = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 32, 0.00135, 8, false),
          material
        );
        mesh.castShadow = true;
        mesh.userData.selectable = true;
        parent.add(mesh);
        return mesh;
      };
      addWire(wires, [[0.15, 0.031, -0.024], [0.166, 0.041, -0.024], [0.177, 0.041, -0.018], [0.183, 0.026, -0.018]], red);
      addWire(wires, [[0.15, 0.031, 0.024], [0.165, 0.037, 0.024], [0.176, 0.035, 0.018], [0.183, 0.026, 0.018]], wireBlack);

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(1.3, 0.85),
        new THREE.ShadowMaterial({ opacity: 0.18 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0.08, -0.003, 0);
      ground.receiveShadow = true;
      ground.userData.selectable = false;
      scene.add(ground);

      function partForMesh(mesh) {
        let current = mesh;
        while (current && current !== model) {
          if (current.userData.partKey) return current;
          current = current.parent;
        }
        return null;
      }

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      function intersectPart(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObject(model, true);
        return hits.find((hit) => hit.object.userData.selectable !== false && partForMesh(hit.object));
      }

      function setHighlight(mesh, active) {
        if (!mesh || !mesh.material || !mesh.material.emissive) return;
        if (active) {
          mesh.material.emissive.set(0x00a9c5);
          mesh.material.emissiveIntensity = 0.28;
        } else {
          mesh.material.emissive.set(0x000000);
          mesh.material.emissiveIntensity = 0;
        }
      }

      clearSelection = () => {
        if (selectedPart) setHighlight(selectedPart, false);
        selectedPart = null;
        if (partInfo) partInfo.hidden = true;
      };

      let pointerStart = null;
      renderer.domElement.addEventListener("pointerdown", (event) => {
        pointerStart = { x: event.clientX, y: event.clientY };
      });
      renderer.domElement.addEventListener("pointerup", (event) => {
        if (!pointerStart) return;
        const moved = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
        pointerStart = null;
        if (moved > 5) return;
        const hit = intersectPart(event);
        const part = hit && partForMesh(hit.object);
        if (!part) {
          clearSelection();
          return;
        }
        clearSelection();
        selectedPart = hit.object;
        setHighlight(selectedPart, true);
        showComponent(part.userData.partKey);
      });
      renderer.domElement.addEventListener("pointermove", (event) => {
        if (selectedPart || (event.buttons & 1)) return;
        const hit = intersectPart(event);
        const nextMesh = hit ? hit.object : null;
        if (hoveredMesh !== nextMesh) {
          if (hoveredMesh) setHighlight(hoveredMesh, false);
          hoveredMesh = nextMesh;
          if (hoveredMesh) setHighlight(hoveredMesh, true);
        }
      });
      renderer.domElement.addEventListener("pointerleave", () => {
        if (!selectedPart && hoveredMesh) setHighlight(hoveredMesh, false);
        hoveredMesh = null;
      });
      document.addEventListener("pointerdown", (event) => {
        if (selectedPart && !stage.contains(event.target) && !partInfo?.contains(event.target)) clearSelection();
      });

      resetView = () => {
        camera.position.copy(initialCameraPosition);
        controls.target.set(0.08, 0.018, 0);
        controls.update();
        viewState.exploded = false;
        if (dimensionsOverlay) dimensionsOverlay.hidden = true;
        if (dimensionsButton) dimensionsButton.setAttribute("aria-pressed", "false");
        $$("[data-explode]").forEach((button) => {
          button.setAttribute("aria-pressed", String(button.dataset.explode === "0"));
        });
      };

      $$("[data-layer]").forEach((button) => {
        button.addEventListener("click", () => {
          allParts.forEach((part) => {
            part.visible = viewState.layers[part.userData.layer];
          });
        });
      });

      function updateSize() {
        const width = Math.max(stage.clientWidth, 1);
        const height = Math.max(stage.clientHeight, 1);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
      }
      const resizeObserver = "ResizeObserver" in window
        ? new ResizeObserver(updateSize)
        : null;
      if (resizeObserver) resizeObserver.observe(stage);
      else window.addEventListener("resize", updateSize);

      function render() {
        animationFrame = 0;
        if (!sectionVisible) return;
        animationFrame = requestAnimationFrame(render);
        const target = viewState.exploded ? 1 : 0;
        animatedParts.forEach(({ group, assembled, exploded }) => {
          const desired = target ? exploded : assembled;
          group.position.lerp(desired, 0.12);
          if (group.position.distanceToSquared(desired) < 0.0000001) group.position.copy(desired);
          group.visible = viewState.layers[group.userData.layer];
        });
        controls.update();
        renderer.render(scene, camera);
      }

      function startRenderLoop() {
        if (sectionVisible && !animationFrame) animationFrame = requestAnimationFrame(render);
      }

      const section = $("#explorer-section") || stage;
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          sectionVisible = entries.some((entry) => entry.isIntersecting);
          if (sectionVisible) startRenderLoop();
          else if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = 0;
          }
        }, { rootMargin: "100px", threshold: 0.01 });
        observer.observe(section);
      }

      updateSize();
      if (loadProgress) {
        loadProgress.value = 100;
        loadProgress.hidden = true;
      }
      if (loadMessage) loadMessage.textContent = "Interactive 3D prototype ready.";
      window.setTimeout(() => {
        if (loadStatus) loadStatus.hidden = true;
      }, 900);
      startRenderLoop();

      if (dimensionsLabel) {
        dimensionsLabel.textContent = "Platform: 300 × 160 × 10 mm · Piezoelectric discs: 6 × Ø27 mm · Electronics tray: separate enclosure";
      }
    } catch (error) {
      showError(error);
    }
  }

  // The hero visualization remains independent of the interactive assembly.
  function initHeroModel() {
    const heroHost = $("#hero-canvas-host");
    if (!heroHost || typeof THREE === "undefined") return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        38,
        Math.max(heroHost.clientWidth, 1) / Math.max(heroHost.clientHeight, 1),
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(heroHost.clientWidth, heroHost.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      heroHost.appendChild(renderer.domElement);
      camera.position.set(window.innerWidth > 991 ? -10 : 0, 24, 38);
      camera.lookAt(window.innerWidth > 991 ? 12 : 0, 0, 0);
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
      keyLight.position.set(20, 35, 20);
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0xf59e0b, 0.9);
      fillLight.position.set(-20, 20, -10);
      scene.add(fillLight);

      const heroGroup = new THREE.Group();
      heroGroup.position.set(window.innerWidth > 991 ? 12 : 0, -1, 0);
      scene.add(heroGroup);
      const wood = new THREE.MeshStandardMaterial({ color: 0x855b32, roughness: 0.6 });
      const gold = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.8 });
      const silver = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4, metalness: 0.6 });
      const rubber = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
      const tread = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4, transparent: true, opacity: 0.88 });

      heroGroup.add(new THREE.Mesh(new THREE.BoxGeometry(16, 0.6, 9), wood));
      [-4.8, 0, 4.8].forEach((x) => {
        [-2.2, 2.2].forEach((z) => {
          const brassDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.06, 24), gold);
          brassDisc.position.set(x, 0.35, z);
          const piezo = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.07, 24), silver);
          piezo.position.set(x, 0.38, z);
          const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.15, 16), rubber);
          pad.position.set(x, 0.5, z);
          heroGroup.add(brassDisc, piezo, pad);
        });
      });
      const topPlate = new THREE.Mesh(new THREE.BoxGeometry(15.8, 0.4, 8.8), tread);
      topPlate.position.y = 0.8;
      heroGroup.add(topPlate);
      heroGroup.rotation.set(0.35, -0.6, 0);

      let heroFrame = 0;
      let heroVisible = true;
      const animateHero = () => {
        heroFrame = 0;
        if (!heroVisible) return;
        heroFrame = requestAnimationFrame(animateHero);
        heroGroup.rotation.y += 0.0025;
        renderer.render(scene, camera);
      };
      const heroObserver = new IntersectionObserver((entries) => {
        heroVisible = entries.some((entry) => entry.isIntersecting);
        if (heroVisible && !heroFrame) heroFrame = requestAnimationFrame(animateHero);
        else if (!heroVisible && heroFrame) {
          cancelAnimationFrame(heroFrame);
          heroFrame = 0;
        }
      });
      heroObserver.observe(heroHost);
      animateHero();

      const resizeHero = () => {
        camera.aspect = Math.max(heroHost.clientWidth, 1) / Math.max(heroHost.clientHeight, 1);
        camera.position.x = window.innerWidth > 991 ? -10 : 0;
        camera.lookAt(window.innerWidth > 991 ? 12 : 0, 0, 0);
        heroGroup.position.x = window.innerWidth > 991 ? 12 : 0;
        camera.updateProjectionMatrix();
        renderer.setSize(heroHost.clientWidth, heroHost.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      };
      window.addEventListener("resize", resizeHero);
    } catch (error) {
      console.warn("Hero 3D visualization could not initialize:", error);
    }
  }

  function showError(error) {
    console.error("Magic Step 3D viewer initialization failed:", error);
    if (loadStatus) loadStatus.classList.add("is-error");
    if (loadMessage) loadMessage.textContent = "3D model could not load";
    if (loadProgress) loadProgress.hidden = true;
  }

  function initialize() {
    initThreeJS();
    initHeroModel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
