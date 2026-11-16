(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");

  function setMenuOpen(open) {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    mainNav.classList.toggle("is-open", open);
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });
    mainNav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) setMenuOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) setMenuOpen(false);
    });
  }

  const gallery = [];
  const galleryGrid = $("#galleryGrid");
  const galleryDialog = $("#uploadDialog");
  const galleryForm = $("#galleryForm");
  const fileInput = $("#imageFile");
  const preview = $("#imagePreview");
  const imageDialog = $("#imageDialog");
  const galleryLabels = {
    parts: ["INDIVIDUAL PART MODELS", "Add screenshots of original SolidWorks components and their modelling views."],
    drawings: ["2D ENGINEERING DRAWINGS", "Add drawing sheets and orthographic views."],
    dimensioned: ["DIMENSIONED DRAWINGS", "Add verified dimensions and drawing details."],
    assembly: ["ASSEMBLY VIEWS", "Add screenshots documenting the assembled CAD model."],
    exploded: ["EXPLODED VIEWS", "Add exploded assembly views and component arrangements."],
    prototype: ["PROTOTYPE PHOTO ARCHIVE", "Add photos documenting the physical prototype and its development."]
  };
  let selectedCategory = "parts";
  let previewUrl = null;

  function updateGalleryHeading() {
    const [label, description] = galleryLabels[selectedCategory];
    $("#galleryLabel").textContent = label;
    $("#galleryDescription").textContent = description;
    renderGallery();
  }

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.replaceChildren();
    const items = gallery.filter((item) => item.category === selectedCategory);
    if (items.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-gallery";
      empty.innerHTML = '<div class="empty-symbol">＋</div><h4>Your gallery starts here</h4><p>Add images to preview them in this browser session. Export a manifest and commit the image files to publish them permanently.</p>';
      galleryGrid.append(empty);
    } else {
      for (const item of items) {
        const card = document.createElement("article");
        card.className = "gallery-card";
        const imageButton = document.createElement("button");
        imageButton.type = "button";
        imageButton.setAttribute("aria-label", `View ${item.title}`);
        const image = document.createElement("img");
        image.src = item.url;
        image.alt = item.title;
        imageButton.append(image);
        imageButton.addEventListener("click", () => showImage(item));

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "gallery-remove";
        removeButton.setAttribute("aria-label", `Remove ${item.title}`);
        removeButton.textContent = "×";
        removeButton.addEventListener("click", () => removeGalleryItem(item));

        const copy = document.createElement("div");
        copy.className = "gallery-card-copy";
        const title = document.createElement("strong");
        title.textContent = item.title;
        const details = document.createElement("span");
        details.textContent = [item.view, item.component, item.dimensions].filter(Boolean).join(" · ");
        copy.append(title, details);
        if (item.description) {
          const description = document.createElement("p");
          description.textContent = item.description;
          copy.append(description);
        }
        card.append(imageButton, removeButton, copy);
        galleryGrid.append(card);
      }
    }

    $("#galleryCount").textContent = `${items.length} ${items.length === 1 ? "image" : "images"} in this category`;
  }

  function showImage(item) {
    $("#largeImage").src = item.url;
    $("#largeCaption").textContent = [item.title, item.view, item.dimensions, item.description].filter(Boolean).join(" · ");
    imageDialog.showModal();
  }

  function removeGalleryItem(item) {
    URL.revokeObjectURL(item.url);
    gallery.splice(gallery.indexOf(item), 1);
    renderGallery();
  }

  function clearPreview() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    preview.replaceChildren();
    const hint = document.createElement("span");
    hint.textContent = "Image preview will appear here";
    preview.append(hint);
  }

  $$(".tab[data-gallery-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      selectedCategory = tab.dataset.galleryTab;
      $$(".tab[data-gallery-tab]").forEach((button) => {
        const active = button === tab;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
      });
      updateGalleryHeading();
    });
  });

  $$("[data-gallery-target]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.galleryTarget in galleryLabels ? button.dataset.galleryTarget : "parts";
      $$(".tab[data-gallery-tab]").forEach((tab) => {
        const active = tab.dataset.galleryTab === selectedCategory;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      updateGalleryHeading();
      $("#solidworks").scrollIntoView({ behavior: "smooth" });
    });
  });

  $("#openUpload").addEventListener("click", () => {
    clearPreview();
    galleryForm.reset();
    galleryDialog.showModal();
  });
  $("#cancelUpload").addEventListener("click", () => galleryDialog.close());
  fileInput.addEventListener("change", () => {
    clearPreview();
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      fileInput.setCustomValidity("Choose a PNG, JPG, or WEBP image.");
      fileInput.reportValidity();
      fileInput.setCustomValidity("");
      fileInput.value = "";
      return;
    }
    previewUrl = URL.createObjectURL(file);
    const image = document.createElement("img");
    image.src = previewUrl;
    image.alt = "Selected screenshot preview";
    preview.replaceChildren(image);
  });
  galleryDialog.addEventListener("close", clearPreview);
  galleryDialog.addEventListener("click", (event) => {
    if (event.target === galleryDialog) galleryDialog.close();
  });
  galleryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const file = fileInput.files && fileInput.files[0];
    if (!file || !previewUrl) {
      fileInput.reportValidity();
      return;
    }
    const url = previewUrl;
    previewUrl = null;
    gallery.push({
      fileName: file.name,
      url,
      title: $("#imageTitle").value.trim(),
      component: $("#imageComponent").value.trim(),
      dimensions: $("#imageDimensions").value.trim(),
      view: $("#imageView").value,
      description: $("#imageDescription").value.trim(),
      category: selectedCategory
    });
    galleryDialog.close();
    galleryForm.reset();
    updateGalleryHeading();
  });

  $("#exportGallery").addEventListener("click", () => {
    const manifest = gallery.map(({ fileName, title, component, dimensions, view, description, category }) => ({
      file: fileName,
      title,
      component,
      dimensions,
      view,
      description,
      category
    }));
    const blob = new Blob([`${JSON.stringify(manifest, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "magic-step-gallery.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  imageDialog.addEventListener("click", (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });
  imageDialog.addEventListener("close", () => {
    $("#largeImage").removeAttribute("src");
    $("#largeCaption").textContent = "";
  });

  const bomBody = $("#bomTable tbody");
  const bomTotal = $("#bomTotal");
  const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

  function calculateBom() {
    let total = 0;
    $$("#bomTable tbody tr").forEach((row) => {
      const quantity = Number($(".bom-qty", row).value);
      const priceInput = $(".bom-price", row);
      const price = priceInput.value === "" ? null : Number(priceInput.value);
      const lineTotal = $(".line-total", row);
      if (price === null || !Number.isFinite(quantity) || !Number.isFinite(price)) {
        lineTotal.textContent = "—";
        return;
      }
      const amount = Math.max(0, quantity) * Math.max(0, price);
      total += amount;
      lineTotal.textContent = currency.format(amount);
    });
    bomTotal.textContent = currency.format(total);
  }

  function addBomRow() {
    const row = document.createElement("tr");
    const itemCell = document.createElement("td");
    const item = document.createElement("input");
    item.type = "text";
    item.setAttribute("aria-label", "Component");
    item.placeholder = "Component name";
    itemCell.append(item);

    const quantityCell = document.createElement("td");
    const quantity = document.createElement("input");
    quantity.type = "number";
    quantity.min = "0";
    quantity.value = "1";
    quantity.className = "bom-qty";
    quantity.setAttribute("aria-label", "Quantity");
    quantityCell.append(quantity);

    const priceCell = document.createElement("td");
    const price = document.createElement("input");
    price.type = "number";
    price.min = "0";
    price.step = "0.01";
    price.placeholder = "Enter price";
    price.className = "bom-price";
    price.setAttribute("aria-label", "Unit price");
    priceCell.append(price);

    const totalCell = document.createElement("td");
    totalCell.className = "line-total";
    totalCell.textContent = "—";
    const removeCell = document.createElement("td");
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-row";
    remove.setAttribute("aria-label", "Remove row");
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      row.remove();
      calculateBom();
    });
    removeCell.append(remove);
    row.append(itemCell, quantityCell, priceCell, totalCell, removeCell);
    bomBody.append(row);
    calculateBom();
  }

  $("#addBomRow").addEventListener("click", addBomRow);
  bomBody.addEventListener("input", calculateBom);
  $$(".remove-row", bomBody).forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("tr").remove();
      calculateBom();
    });
  });

  calculateBom();
  updateGalleryHeading();
})();
