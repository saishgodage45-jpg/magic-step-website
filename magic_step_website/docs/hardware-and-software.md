# Hardware and Software

**Magic Step · Group 16 · Sanjivani University**

## Project hardware

The current documented inventory is listed in the [Bill of Materials](bill-of-materials.md): six piezoelectric discs, four diodes, a 50 µF capacitor, an ESP32 development board, a boost converter, a TP4056 charging module, one 3.7 V lithium-ion battery and holder, a 400-point mini breadboard, jumper wires, and a wooden platform.

The ESP32 is described separately as a monitoring and control unit where implemented. No specific firmware feature, pin mapping, or wire-level circuit is claimed without a verified project record.

## CAD and manufacturing tools

SolidWorks is identified in the project records for 3D modelling, component design, and assembly development. The Tinkerers Lab gallery documents learning with a Bambu Lab A1 FDM printer and a laser cutting/engraving machine.

## Website software

- Semantic HTML for document structure.
- CSS for responsive layout, visual styling, and themes.
- JavaScript for site interactions, image lightboxes, project data, and the 3D explorer.
- Three.js and OrbitControls are loaded from public CDNs for the interactive model.
- Google Fonts are loaded remotely; the site falls back to system fonts if unavailable.

No package manager, local database, or build step is required. A modern browser and a local HTTP server are recommended for previewing the site. Internet access is needed for the hosted Three.js scripts and fonts.
