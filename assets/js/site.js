/*
 * MAGIC STEP — Master Website Controller
 * Group 16 · Department of Mechanical Engineering · Sanjivani University, Kopargaon
 */

(() => {
  "use strict";

  const project = window.MAGICSTEP_PROJECT || {};
  const galleryItems = Array.isArray(window.MAGICSTEP_GALLERY) ? window.MAGICSTEP_GALLERY : [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function el(tag, className, text) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // ---------------- 1. Theme Management (Dark / Light) ----------------
  const themeButton = $("#theme-toggle");
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function applyTheme(theme, save = true) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeButton) {
      const other = theme === "light" ? "dark" : "light";
      themeButton.setAttribute("aria-label", `Switch to ${other} theme`);
      const txt = $(".theme-toggle-text", themeButton);
      if (txt) txt.textContent = other === "light" ? "Light" : "Dark";
    }
    if (save) {
      try { localStorage.setItem("magicstep-theme", theme); } catch (e) {}
    }
  }

  // Apply saved theme immediately
  try {
    const saved = localStorage.getItem("magicstep-theme");
    if (saved === "light" || saved === "dark") applyTheme(saved, false);
    else applyTheme("dark", false);
  } catch (e) {
    applyTheme("dark", false);
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      applyTheme(currentTheme() === "light" ? "dark" : "light", true);
    });
  }

  // ---------------- 2. Presentation Mode (For University Projector) ----------------
  const presentationButton = $("#presentation-toggle");
  let isPresentationMode = false;
  function setPresentationMode(enable) {
    isPresentationMode = enable;
    document.body.classList.toggle("presentation-mode", enable);
    if (presentationButton) {
      presentationButton.textContent = enable ? "Exit presentation" : "Presentation mode";
      presentationButton.setAttribute("aria-pressed", String(enable));
    }
    showToast(enable ? "Presentation Mode Activated (Large Display)" : "Exited Presentation Mode");
  }
  if (presentationButton) {
    presentationButton.addEventListener("click", () => setPresentationMode(!isPresentationMode));
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isPresentationMode) setPresentationMode(false);
  });

  // ---------------- 3. Toast Notifications ----------------
  const toast = $("#toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  }

  // ---------------- 4. Share & Clipboard ----------------
  const shareBtn = $("#share-button");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const url = window.location.href;
      const shareData = {
        title: "Magic Step — Footstep Power Generation System",
        text: "Sanjivani University Mechanical Engineering Makerspace project documentation",
        url: url
      };
      if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
        try { await navigator.share(shareData); } catch (e) {}
      } else {
        try {
          await navigator.clipboard.writeText(url);
          showToast("Project link copied to clipboard");
        } catch (err) {
          showToast(`Copy link: ${url}`);
        }
      }
    });
  }

  // ---------------- 5. Mobile Navigation Menu ----------------
  const menuToggle = $("#menu-toggle");
  const nav = $("#main-nav");
  function setMenu(open) {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  }
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
    $$("a", nav).forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false);
    });
  }

  // ---------------- 6. Scroll Progress Bar & Nav Highlighting ----------------
  const progressBar = $("#scroll-progress-bar");
  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && max > 0) {
      progressBar.style.transform = `scaleX(${Math.min(1, window.scrollY / max)})`;
    }
  }
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  // Active section link highlighting
  const navLinks = $$("#main-nav a");
  const sections = $$("section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.25 });
  sections.forEach((s) => observer.observe(s));

  // ---------------- 7. Image Lightbox Dialog ----------------
  const dialog = $("#photo-dialog");
  const dialogImg = $("#dialog-image");
  const dialogWrap = $("#dialog-image-wrap");
  const dialogZoom = $("#dialog-zoom");
  const dialogTitle = $("#dialog-title");
  const dialogKind = $("#dialog-kind");
  const dialogDesc = $("#dialog-description");

  function openLightbox(item) {
    if (!dialog || !item) return;
    dialogImg.src = item.src;
    dialogImg.alt = item.alt || item.title;
    if (dialogTitle) dialogTitle.textContent = item.title;
    if (dialogKind) dialogKind.textContent = (item.kind || "Image").toUpperCase();
    if (dialogDesc) dialogDesc.textContent = item.description || "";
    if (dialogWrap) dialogWrap.classList.remove("is-zoomed");
    if (dialogZoom) dialogZoom.textContent = "Zoom";
    if (typeof dialog.showModal === "function") dialog.showModal();
  }

  if (dialogZoom) {
    dialogZoom.addEventListener("click", () => {
      const zoomed = dialogWrap.classList.toggle("is-zoomed");
      dialogZoom.textContent = zoomed ? "Fit" : "Zoom";
      dialogZoom.setAttribute("aria-pressed", String(zoomed));
    });
  }
  if (dialogImg) {
    dialogImg.addEventListener("click", () => {
      const zoomed = dialogWrap.classList.toggle("is-zoomed");
      if (dialogZoom) {
        dialogZoom.textContent = zoomed ? "Fit" : "Zoom";
        dialogZoom.setAttribute("aria-pressed", String(zoomed));
      }
    });
  }
  $("#dialog-close")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

  // Direct feature button lightboxes
  $("#open-cad-drawing")?.addEventListener("click", () => {
    openLightbox({
      title: "SolidWorks Dimensioned Drawing Sheet",
      src: "assets/media/cad/dimensioned-drawing.svg",
      description: "First-angle orthographic engineering drawing sheet with complete dimensional tolerances: 300 mm length, 160 mm width, 10 mm thickness, and 27 mm transducer pitch locations.",
      kind: "CAD Drawing"
    });
  });

  $("#open-circuit-diagram")?.addEventListener("click", () => {
    openLightbox({
      title: "Verified Electrical Circuit Schematic",
      src: "assets/media/diagrams/circuit-diagram.svg",
      description: "Detailed wiring schematic displaying DB107 diode bridge, 10 µF electrolytic smoothing capacitor, resistor voltage dividers, ESP32 GPIO pinout, and PCF8574 I²C LCD backpack connections.",
      kind: "Schematic"
    });
  });

  // ---------------- 8. Render Specifications ----------------
  const specRows = $("#spec-rows");
  if (specRows && Array.isArray(project.specifications)) {
    project.specifications.forEach((spec) => {
      const tr = el("tr");
      const th = el("th", "", spec.label);
      th.scope = "row";
      const td = el("td");
      td.append(el("strong", "", spec.value), el("span", "spec-note", spec.note));
      tr.append(th, td);
      specRows.append(tr);
    });
  }

  // ---------------- 9. Render Engineering Journey ----------------
  const journeyList = $("#journey-steps");
  if (journeyList && Array.isArray(project.journeySteps)) {
    project.journeySteps.forEach((step) => {
      const li = el("li", "journey-step");
      const head = el("div", "step-head");
      head.append(el("span", "step-number", step.number), el("h3", "step-title", step.title));
      li.append(head);

      const fig = el("figure", "step-figure");
      const photoBtn = el("button", "step-photo");
      photoBtn.type = "button";
      photoBtn.setAttribute("aria-label", `Enlarge step photo: ${step.title}`);

      // Map step to photo
      let photoSrc = "assets/media/photos/assembled-tile.svg";
      if (step.buildStage === 1) photoSrc = "assets/media/photos/base-plate.svg";
      else if (step.buildStage === 2 || step.buildStage === 3) photoSrc = "assets/media/photos/piezo-matrix.svg";
      else if (step.buildStage === 4) photoSrc = "assets/media/diagrams/circuit-diagram.svg";
      else if (step.buildStage === 5) photoSrc = "assets/media/cad/isometric-view.svg";
      else if (step.buildStage === 6) photoSrc = "assets/media/photos/esp32-bench.svg";
      else if (step.buildStage === 7) photoSrc = "assets/media/photos/battery-pack.svg";
      else if (step.buildStage === 8) photoSrc = "assets/media/photos/oscilloscope-test.svg";

      const img = el("img");
      img.src = photoSrc;
      img.alt = step.title;
      img.loading = "lazy";
      photoBtn.appendChild(img);
      photoBtn.addEventListener("click", () => {
        openLightbox({ title: step.title, src: photoSrc, description: step.notes, kind: "photo" });
      });

      fig.appendChild(photoBtn);
      fig.appendChild(el("figcaption", "step-caption", step.notes));
      li.appendChild(fig);

      const textWrap = el("div", "step-text-wrap");
      textWrap.appendChild(el("p", "step-text", step.text));
      if (step.tools) {
        const toolsP = el("p", "step-tools");
        toolsP.innerHTML = `<strong>Tools:</strong> ${step.tools} | <strong>Materials:</strong> ${step.materials}`;
        textWrap.appendChild(toolsP);
      }
      li.appendChild(textWrap);

      journeyList.appendChild(li);
    });
  }

  // ---------------- 10. Render Bill of Materials (BOM) ----------------
  const bomRows = $("#bom-rows");
  const bomTotal = $("#bom-total-amount");
  const bomSearch = $("#bom-search-input");
  let activeBomFilter = "all";

  function renderBOM() {
    if (!bomRows || !Array.isArray(project.billOfMaterials)) return;
    bomRows.replaceChildren();
    const query = bomSearch ? bomSearch.value.trim().toLowerCase() : "";
    let total = 0;

    project.billOfMaterials.forEach((item) => {
      const matchCat = activeBomFilter === "all" || item.category === activeBomFilter;
      const matchQuery = !query || item.description.toLowerCase().includes(query) || item.spec.toLowerCase().includes(query);
      if (matchCat && matchQuery) {
        total += item.totalCost;
        const tr = el("tr");
        tr.append(
          el("td", "", item.item),
          el("td", "", item.description),
          el("td", "muted", item.spec),
          el("td", "", `${item.qty} ${item.unit}`),
          el("td", "", `₹${item.unitCost}`),
          el("td", "font-mono font-bold", `₹${item.totalCost}`),
          el("td", "", item.source),
          el("td", "", item.status)
        );
        bomRows.append(tr);
      }
    });

    if (bomTotal) bomTotal.textContent = `₹${total.toLocaleString("en-IN")}`;
  }

  $$(".bom-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeBomFilter = btn.dataset.category;
      $$(".bom-filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderBOM();
    });
  });
  if (bomSearch) bomSearch.addEventListener("input", renderBOM);
  renderBOM();

  // ---------------- 11. Render Testing Protocol Matrix ----------------
  const testRows = $("#test-rows");
  if (testRows && Array.isArray(project.testingProtocol)) {
    project.testingProtocol.forEach((t) => {
      const tr = el("tr");
      tr.append(
        el("td", "font-mono font-bold", t.id),
        el("td", "font-bold", t.test),
        el("td", "", t.parameter),
        el("td", "muted", t.condition),
        el("td", "", t.expected),
        el("td", "", ""), // Placeholder slot
        el("td", "", t.status)
      );
      // Create placeholder badge in 6th column
      const span = el("span", "test-placeholder", t.measured);
      tr.cells[5].appendChild(span);
      testRows.append(tr);
    });
  }

  // ---------------- 12. Render Status Groups ----------------
  const statusContainer = $("#status-groups");
  if (statusContainer && Array.isArray(project.statusGroups)) {
    project.statusGroups.forEach((group) => {
      const art = el("article", `status-group tone-${group.tone}`);
      const head = el("div", "status-group-head");
      head.append(el("span", "label-chip label-chip-ok", group.badge), el("h3", "", group.heading));
      art.append(head);

      if (Array.isArray(group.subgroups)) {
        group.subgroups.forEach((sub) => {
          art.append(el("h4", "status-subhead", sub.label));
          const ul = el("ul");
          sub.items.forEach((it) => ul.append(el("li", "", it)));
          art.append(ul);
        });
      } else if (Array.isArray(group.items)) {
        const ul = el("ul");
        group.items.forEach((it) => ul.append(el("li", "", it)));
        art.append(ul);
      }
      statusContainer.append(art);
    });
  }

  // ---------------- 13. Render Pinout Table ----------------
  const pinoutRows = $("#pinout-rows");
  if (pinoutRows && Array.isArray(project.esp32Pinout)) {
    project.esp32Pinout.forEach((p) => {
      const tr = el("tr");
      tr.append(
        el("td", "font-mono font-bold text-energy", p.pin),
        el("td", "", p.function),
        el("td", "", p.connectedTo),
        el("td", "muted", p.note)
      );
      pinoutRows.append(tr);
    });
  }

  // ---------------- 14. Render Gallery & Filters ----------------
  const galleryGrid = $("#gallery-grid");
  const galleryCount = $("#gallery-count");
  let activeGalleryFilter = "all";

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.replaceChildren();
    const visible = galleryItems.filter((item) => activeGalleryFilter === "all" || item.category === activeGalleryFilter);
    if (galleryCount) galleryCount.textContent = `${visible.length} ${visible.length === 1 ? "item" : "items"}`;

    visible.forEach((item) => {
      const card = el("figure", "gallery-card");
      const btn = el("button", "gallery-thumb");
      btn.type = "button";
      btn.setAttribute("aria-label", `Open image: ${item.title}`);

      const img = el("img");
      img.src = item.src;
      img.alt = item.alt || item.title;
      img.loading = "lazy";
      btn.appendChild(img);
      btn.addEventListener("click", () => openLightbox(item));

      const cap = el("figcaption");
      cap.append(
        el("span", "label-chip", (item.kind || "CAD").toUpperCase()),
        el("strong", "gallery-title", item.title),
        el("p", "text-sm text-muted mt-2", item.description)
      );

      card.append(btn, cap);
      galleryGrid.append(card);
    });
  }

  $$(".gallery-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeGalleryFilter = btn.dataset.filter;
      $$(".gallery-filter").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      renderGallery();
    });
  });
  renderGallery();

  // ---------------- 15. Render Team & Guides ----------------
  const teamGrid = $("#team-grid");
  if (teamGrid && Array.isArray(project.teamMembers)) {
    project.teamMembers.forEach((m) => {
      const card = el("div", "team-card");
      const avatar = el("div", "avatar", m.avatarText);
      const info = el("div", "team-info");
      info.append(
        el("h4", "", m.name),
        el("p", "text-energy font-mono text-sm", m.role),
        el("p", "text-muted text-xs", `${m.programme} · ${m.institution}`)
      );
      card.append(avatar, info);
      teamGrid.append(card);
    });
  }

  const guidesGrid = $("#guides-grid");
  if (guidesGrid && Array.isArray(project.projectGuides)) {
    project.projectGuides.forEach((g) => {
      const card = el("div", "team-card");
      const avatar = el("div", "avatar", "DR");
      const info = el("div", "team-info");
      info.append(
        el("h4", "", g.name),
        el("p", "text-amber font-mono text-sm", g.designation),
        el("p", "text-muted text-xs", `${g.department} · ${g.institution}`)
      );
      card.append(avatar, info);
      guidesGrid.append(card);
    });
  }

  // ---------------- 16. Copy Code Button ----------------
  const copyCodeBtn = $("#copy-code-btn");
  if (copyCodeBtn && project.codeSnippet) {
    copyCodeBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(project.codeSnippet);
        copyCodeBtn.textContent = "Copied!";
        showToast("ESP32 Arduino code copied to clipboard");
        setTimeout(() => { copyCodeBtn.textContent = "Copy Code"; }, 2000);
      } catch (err) {
        showToast("Unable to copy code automatically");
      }
    });
  }

  // ---------------- 17. Download Placeholders ----------------
  $$("[data-download]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = btn.dataset.download;
      showToast(`Preparing download: ${target}...`);
    });
  });
})();
