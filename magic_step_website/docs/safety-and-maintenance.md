# Safety Protocols & System Maintenance
## Magic Step — Footstep Power Generation System
**Group 16** · Sanjivani University, Kopargaon

---

### 1. Electrical Safety Guidelines
1. **Never Connect Raw Piezo Outputs Directly to MCU Pins:** Raw piezoelectric transducers produce high open-circuit voltage spikes ($\pm 35\text{ V}$ or higher) that will permanently destroy ESP32 GPIO input gates rated for maximum 3.6 V. All signals must pass through full-wave rectification, filtering, resistive division, and Zener diode clamping before connecting to ADC pins.
2. **Lithium-Ion Battery Safety (1S2P Pack):**
   - A dual 18650 cell holder is purely a physical carrier; it provides no electrical protection.
   - Cells in parallel must be capacity-matched and voltage-balanced before insertion.
   - Charging must be managed by a dedicated 1S lithium-ion charge controller providing CC/CV regulation and overvoltage cutoff at 4.20 V.
   - Under no circumstances should unconditioned piezo rectifier pulses be routed directly into lithium-ion cell terminals.
3. **Common Ground Connection:** Establish a star-ground configuration to prevent ground loops between the analog sensor divider, ESP32 ground, and battery negative lead.

---

### 2. Mechanical Maintenance & Inspection
1. **Ceramic Crystal Inspection:** PZT ceramic discs are brittle. Periodically inspect discs for hairline fractures or electrode delamination after repeated stepping test runs.
2. **Elastomeric Buffer Alignment:** Verify that all six neoprene rubber pads remain centered above their respective piezoelectric discs to guarantee uniform force distribution.
3. **Wire Strain Relief:** Secure all soldered leads with silicone or hot-melt adhesive at the solder pads to prevent wire fatigue from continuous mechanical flexure.
4. **Base Plate Surface Check:** Inspect the 300 × 160 × 10 mm wooden platform for warping, cracks, or loose fasteners.
