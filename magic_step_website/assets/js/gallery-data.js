/*
 * Magic Step Gallery Data
 * Project Group 16 · Makerspace · Sanjivani University, Kopargaon
 */

window.MAGICSTEP_GALLERY = [
  {
    id: "cad-isometric",
    category: "cad",
    kind: "cad-render",
    title: "SolidWorks Assembly Isometric View",
    description: "Full isometric 3D CAD render of the Magic Step footstep generation tile showing upper tread plate, 2x3 transducer matrix, wooden base plate, and mounting perimeter.",
    src: "assets/media/cad/isometric-view.svg",
    width: 1200,
    height: 800,
    alt: "SolidWorks 3D isometric model of the assembled Magic Step power generating platform"
  },
  {
    id: "cad-exploded",
    category: "cad",
    kind: "cad-render",
    title: "Exploded Assembly CAD View",
    description: "SolidWorks exploded assembly illustrating vertical component stack: top tread plate, force-damping rubber pads, six piezoelectric ceramic discs, wiring channels, and 300x160x10mm timber base plate.",
    src: "assets/media/cad/exploded-view.svg",
    width: 1200,
    height: 800,
    alt: "Exploded CAD model view detailing layered assembly of the footstep tile"
  },
  {
    id: "cad-drawing",
    category: "cad",
    kind: "cad-drawing",
    title: "Dimensioned Engineering Drawing (300 × 160 mm)",
    description: "First-angle orthographic engineering drawing sheet with full dimensional tolerances: 300 mm length, 160 mm width, 10 mm thickness, and 27 mm transducer pitch locations.",
    src: "assets/media/cad/dimensioned-drawing.svg",
    width: 1400,
    height: 950,
    alt: "Dimensioned mechanical CAD drawing of the footstep power platform"
  },
  {
    id: "schematic-system",
    category: "electronics",
    kind: "diagram",
    title: "System Architecture & Energy Pathway",
    description: "Complete electro-mechanical block schematic: Kinetic foot pressure -> 6x Piezo array -> Full-wave bridge rectifier -> 10 uF buffer -> 1S charge manager -> 18650 Li-ion -> ESP32 & 16x2 LCD telemetry.",
    src: "assets/media/diagrams/system-schematic.svg",
    width: 1200,
    height: 675,
    alt: "Vector system architecture schematic showing energy and telemetry flows"
  },
  {
    id: "schematic-circuit",
    category: "electronics",
    kind: "diagram",
    title: "Verified Electrical Circuit Diagram",
    description: "Detailed wiring schematic displaying DB107 diode bridge, 10 uF electrolytic smoothing capacitor, resistor voltage dividers, ESP32 GPIO pinout, and PCF8574 I2C LCD backpack connections.",
    src: "assets/media/diagrams/circuit-diagram.svg",
    width: 1200,
    height: 750,
    alt: "Verified circuit diagram of the power conditioning and ESP32 telemetry interface"
  },
  {
    id: "piezo-principle",
    category: "mechanical",
    kind: "diagram",
    title: "Direct Piezoelectric Effect Working Principle",
    description: "Atomic lattice diagram illustrating mechanical dipole displacement and electric dipole moment generation in lead zirconate titanate (PZT) crystal under direct axial compressive stress.",
    src: "assets/media/diagrams/piezo-working.svg",
    width: 1100,
    height: 650,
    alt: "Cross-sectional scientific illustration of piezoelectric charge generation under mechanical stress"
  },
  {
    id: "photo-base-plate",
    category: "mechanical",
    kind: "photo",
    title: "Machined Wooden Base Platform (300 × 160 × 10 mm)",
    description: "Workshop photograph of the hardwood base platform after precision dimensioning, surface planing, and edge chamfering in the carpentry shop.",
    src: "assets/media/photos/base-plate.svg",
    width: 1000,
    height: 750,
    alt: "Workshop photograph of the machined timber base plate"
  },
  {
    id: "photo-piezo-matrix",
    category: "mechanical",
    kind: "photo",
    title: "Piezoelectric Transducer Matrix (2 × 3 Grid)",
    description: "Top-down view of six 27 mm piezoelectric sensor discs adhered in a two-row by three-column matrix across the base plate with compliant double-sided tape.",
    src: "assets/media/photos/piezo-matrix.svg",
    width: 1000,
    height: 750,
    alt: "Photograph of the six piezoelectric discs mounted in two rows and three columns"
  },
  {
    id: "photo-esp32-breadboard",
    category: "electronics",
    kind: "photo",
    title: "ESP32 & 16×2 LCD Telemetry Bench Setup",
    description: "Laboratory bench integration showing the ESP32 DevKit V1, PCF8574 I2C LCD module displaying live step count, and resistor divider signal conditioning network.",
    src: "assets/media/photos/esp32-bench.svg",
    width: 1000,
    height: 750,
    alt: "Bench test setup of the ESP32 microcontroller wired to the 16x2 LCD display"
  },
  {
    id: "photo-battery-pack",
    category: "electronics",
    kind: "photo",
    title: "1S2P 18650 Li-ion Storage Experiment",
    description: "Dual 18650 cell parallel arrangement in battery holder with terminal leads and voltage monitoring taps prepared for energy storage trials.",
    src: "assets/media/photos/battery-pack.svg",
    width: 1000,
    height: 750,
    alt: "1S2P 18650 lithium-ion battery pack with parallel wiring"
  },
  {
    id: "photo-oscilloscope-test",
    category: "testing",
    kind: "photo",
    title: "DSO Pulse Response & Voltage Measurement Setup",
    description: "Digital storage oscilloscope connected to the bridge rectifier output during calibrated impact testing, showing transient AC pulse peaks.",
    src: "assets/media/photos/oscilloscope-test.svg",
    width: 1000,
    height: 750,
    alt: "Digital oscilloscope screen capturing piezoelectric voltage response during foot strike"
  },
  {
    id: "photo-assembled-tile",
    category: "mechanical",
    kind: "photo",
    title: "Fully Assembled Magic Step Footstep Tile",
    description: "Complete physical prototype with upper force tread plate, internal transducer array, and wiring conduit ready for human footfall evaluation.",
    src: "assets/media/photos/assembled-tile.svg",
    width: 1000,
    height: 750,
    alt: "Fully assembled footstep generation tile prototype"
  }
];
