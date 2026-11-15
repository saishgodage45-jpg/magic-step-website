# Mechanical Design & Prototype Structure
## Magic Step — Footstep Power Generation System
**Group 16** · Department of Mechanical Engineering · Sanjivani University, Kopargaon

---

### 1. Dimensional Specifications
- **Base Plate Dimensions:** 300 mm (Length) × 160 mm (Width) × 10 mm (Thickness)
- **Base Material:** Seasoned hardwood / planar timber block
- **Active Area:** $48,000\text{ mm}^2$ ($0.048\text{ m}^2$)
- **Sensor Matrix:** 6 Piezoelectric Discs (2 rows × 3 columns)
- **Transducer Pitch:** Longitudinal pitch = 100 mm; Transverse pitch = 80 mm
- **Disc Diameter:** 27.0 mm (Outer brass substrate)
- **Ceramic Diameter:** 20.0 mm (Inner PZT active layer)
- **Total Assembly Height:** Approximately 18–22 mm including base, transducers, and upper tread plate.

---

### 2. Design Rationale & Springless Architecture
Many conventional footstep energy harvesters incorporate mechanical coil springs. In the Magic Step prototype:
- **No Helical Springs Are Used:** Coil springs absorb a large portion of footstep kinetic energy through mechanical compliance and elastic rebound hysteresis, reducing the peak compressive force delivered to the piezoelectric elements.
- **Direct Flexure Design:** The platform utilizes an upper tread plate supported by elastomeric neoprene damper pads. When a person steps on the tile, mechanical force is directly channeled into compressive and flexural stress across the ceramic discs.
- **Transducer Protection:** PZT ceramic is extremely brittle and vulnerable to shear stresses and point loads. The 6 force-distribution buffer pads distribute foot pressure across the entire surface of each disc, preventing localized stress concentrations that could crack the ceramic.

---

### 3. SolidWorks CAD Files
- Assembly Part: `Magic_Step_Assembly.sldasm`
- Base Plate Drawing: `Base_Plate_300x160x10.sldprt`
- Dimensioned Sheet: `Drawing_Sheet_Orthographic_1.slddrw`
- Exploded View: `Magic_Step_Exploded_Stack.sldasm`
