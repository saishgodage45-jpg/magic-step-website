# MAGIC STEP — Footstep Power Generation System
### Project Documentation Website & Engineering Journal
**Group 16** · Department of Mechanical Engineering · Sanjivani University, Kopargaon  
**Academic Year:** 2026–27 | **Subject:** Makerspace / Engineering Capstone

---

## 📌 Project Overview
Magic Step is an electro-mechanical energy-harvesting prototype that converts human footstep pressure into conditioned electrical energy using piezoelectric transducers.

- **Base Platform:** 300 mm × 160 mm × 10 mm (Seasoned Hardwood)
- **Sensor Array:** 6× ⌀27 mm Piezoelectric Discs (Brass substrate with Lead Zirconate Titanate [PZT] ceramic) arranged in a 2-row × 3-column matrix
- **Mechanical Architecture:** Springless direct-flexure design with neoprene force-distribution damper pads
- **Power Conditioning:** DB107 full-wave diode bridge rectifier + 10 µF electrolytic smoothing capacitor buffer
- **Embedded Telemetry:** ESP32 DevKit V1 microcontroller with ADC peak detection and timer-based debouncing
- **Display Module:** 16×2 Character LCD with PCF8574 I²C backpack (Address 0x27)
- **Energy Storage Testbed:** 2× 18650 Lithium-Ion cells in parallel (1S2P arrangement) with dedicated charge protection circuit

---

## 👥 Team & Faculty Supervision
### Student Project Members (Group 16)
- **Saish Godage** — Student Project Member
- **Ayush Jadhav** — Student Project Member
- **Gaurav Wavdhane** — Student Project Member
- **Sai Gholap** — Student Project Member

### Project Guides
- **Dr. Kiran Wakchaure** — Project Guide, Dept. of Mechanical Engineering, Sanjivani University
- **Dr. Vasudeo Singh Singer** — Project Guide, Dept. of Mechanical Engineering, Sanjivani University
- **Dr. Prathibha Sinha** — Project Guide, Dept. of Mechanical Engineering, Sanjivani University

---

## 🌐 Website Features (Redesigned to ClayBreeze Presentation Standards)
- **Modern Engineering Blueprint Theme:** Space Grotesk, Inter, and JetBrains Mono typography with blueprint grid accents.
- **Dual Theme Support:** Dark ("Night Lab") and Light ("Daylight / High-contrast projector") with instant persistence.
- **Presentation Mode:** One-click projector mode enlarging typography and diagrams for university Makerspace evaluation panels.
- **Interactive 3D Assembly Explorer:** Procedural 3D WebGL model with orbit rotation, zoom, layer toggles (Top Plate, Dampers, Piezo Discs, Base Plate), exploded view slider, and clickable component inspector.
- **Kinetic Energy Harvesting Lab (Simulator):** Real-time theoretical simulation with footstep weight and cadence sliders, single-step and continuous walk modes, animated oscilloscope drawing AC and DC waveforms, and virtual 16×2 I²C LCD display emulator.
- **SolidWorks CAD Showcase:** Dimensioned orthographic drawing sheets, isometric views, exploded stacks, and mechanical tolerances.
- **Interactive Bill of Materials (BOM):** Searchable and filterable component inventory with unit and total costs.
- **Verified Electronics & Firmware:** ESP32 pinout allocation table and production-ready Arduino C++ firmware with one-click copy.
- **Testing Protocol & Results Matrix:** Scientific testing protocol with clearly designated measurement placeholders (no fabricated test results).
- **Deliverables & Downloads:** Clean download cards for Project Report PDF, A1 Conference Poster, SolidWorks CAD package, and ESP32 firmware source.
- **Print / Save as PDF:** Custom `@media print` stylesheet formatted for clean A4/Letter PDF evaluation handouts.

---

## 🚀 How to Run Locally & Deploy to GitHub Pages

### Option 1: Preview Locally
Simply double-click `index.html` in your web browser (Chrome, Edge, Firefox, or Safari). No local web server or build process required!

### Option 2: Deploy to GitHub Pages
1. Push this folder to your GitHub repository (e.g., `https://github.com/<username>/magic-step-website`).
2. Navigate to **Settings** → **Pages**.
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or `master`), folder: `/ (root)`
4. Click **Save**. Your site will be live within seconds!
