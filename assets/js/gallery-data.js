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
    description: "CAD-style isometric illustration of the platform concept and sensor arrangement; compare the design record with the completed physical prototype.",
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
    description: "CAD-style exploded illustration of the intended platform arrangement. Depicted interfaces are design illustrations and are not verified fabrication details.",
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
    description: "Dimensioned platform drawing with project-record dimensions of 300 mm × 160 mm × 10 mm; it does not specify verified manufacturing tolerances.",
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
    description: "Functional concept showing footstep pressure, six piezoelectric sensors, four rectifier diodes, a 50 µF capacitor, boost converter, TP4056 module, and a 3.7 V battery. The ESP32 monitoring and control unit is shown separately; this is not a wiring diagram.",
    src: "assets/media/diagrams/system-schematic.svg",
    width: 1200,
    height: 460,
    alt: "Functional component sequence with the ESP32 shown separately; not a wiring diagram"
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
    title: "Wooden Base Platform Illustration",
    description: "Illustrative vector rendering of the wooden platform used to carry the sensor array.",
    src: "assets/media/photos/base-plate.svg",
    width: 1000,
    height: 750,
    alt: "Illustrative rendering of the wooden sensor platform"
  },
  {
    id: "photo-piezo-matrix",
    category: "mechanical",
    kind: "photo",
    title: "Piezoelectric Sensor Matrix Illustration",
    description: "Illustrative vector view of six piezoelectric discs arranged on the wooden platform.",
    src: "assets/media/photos/piezo-matrix.svg",
    width: 1000,
    height: 750,
    alt: "Illustrative view of six piezoelectric discs on the platform"
  },
  {
    id: "photo-assembled-tile",
    category: "mechanical",
    kind: "photo",
    title: "Illustrative Assembly Concept",
    description: "Vector concept illustration of a footstep-energy platform; this is not a photograph or verification of the completed physical build.",
    src: "assets/media/photos/assembled-tile.svg",
    width: 1000,
    height: 750,
    alt: "Illustrative vector concept of a footstep-energy platform, not a photograph of the completed hardware"
  }
];
