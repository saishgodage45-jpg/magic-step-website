# Testing Protocols & Experimental Results
## Magic Step — Footstep Power Generation System
**Group 16** · Department of Mechanical Engineering · Sanjivani University, Kopargaon

---

### 1. Scientific Testing Policy
In accordance with academic Makerspace engineering standards:
- **No Invented Data:** Measured voltage, current, stored energy, and battery status will only be populated after formal testing with calibrated instruments.
- **Repeatable Measurement Conditions:** All readings must document:
  1. Footstep force / mass of the test subject (e.g., 60 kg, 75 kg, 90 kg).
  2. Cadence (steps per minute).
  3. Load resistance across measurement terminals.
  4. Instrument model, probe impedance, and measurement mode (DSO, True-RMS Multimeter).

---

### 2. Experimental Test Matrix
| Test ID | Objective | Parameter | Instrumentation | Nominal Expected | Measured Lab Reading | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **T01** | Open-circuit transient | Peak AC Voltage ($V_{pk}$) | Rigol DSO (10 MΩ probe) | +15 V to +35 V | *[Pending Lab Test]* | Active |
| **T02** | Rectified pulse | DC Voltage after DB107 | DSO / True RMS DMM | +12 V to +28 V | *[Pending Lab Test]* | Active |
| **T03** | Smoothing performance | Accumulated $V_c$ across 10 µF | Fluke 87V Multimeter | $V_c(t)$ curve | *[Pending Lab Test]* | Active |
| **T04** | Telemetry accuracy | Step count vs manual count | ESP32 Serial Monitor | $\ge 95\%$ accuracy | *[Pending Lab Test]* | Active |
| **T05** | Battery storage delta | Voltage before/after 500 steps | 4.5-digit Multimeter | Measurable $\Delta V$ | *[Pending Lab Test]* | Active |
| **T06** | Charger status pin | Logic state of CHRG pin | Logic Analyzer | Active LOW on pulse | *[Pending Lab Test]* | Active |

---

### 3. Energy Calculation Methodology
A detected voltage spike does not equate to stored energy. Instantaneous power and cumulative stored energy across a known load resistor $R_L$ are calculated by:

$$P(t) = \frac{V(t)^2}{R_L}$$

$$E = \int_{0}^{T} P(t) \, dt = \frac{1}{R_L} \int_{0}^{T} V(t)^2 \, dt$$

Energy accumulated in the capacitor is:

$$E_{\text{cap}} = \frac{1}{2} C V_c^2$$

For a 10 µF capacitor charged to 15 V, the stored electrostatic energy is:

$$E_{\text{cap}} = \frac{1}{2} (10 \times 10^{-6}\text{ F}) (15\text{ V})^2 = 1.125\text{ mJ per pulse sequence}$$
