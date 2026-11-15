# Working Principle & Transduction Physics
## Magic Step — Footstep Power Generation System
**Group 16** · Sanjivani University, Kopargaon

---

### 1. The Direct Piezoelectric Effect
Piezoelectricity is an electromechanical interaction exhibited by non-centrosymmetric crystalline materials such as Lead Zirconate Titanate ($\text{Pb}[\text{Zr}_x\text{Ti}_{1-x}]\text{O}_3$, or PZT). When an external mechanical force is applied along the polarization axis (the 33-direction), the positive and negative charge centers within the perovskite crystal lattice shift, generating a macroscopic electric dipole moment and a potential difference across opposite conductive faces:

$$V = -g_{33} \cdot \sigma \cdot t$$

Where:
- $V$ is the open-circuit output voltage (V)
- $g_{33}$ is the piezoelectric voltage coefficient ($\text{V}\cdot\text{m}/\text{N}$)
- $\sigma$ is the applied compressive stress ($\text{N}/\text{m}^2 = F / A$)
- $t$ is the thickness of the active piezoelectric ceramic layer (m)

---

### 2. Transduction Under Footfall Excitation
Human walking exerts an impact force typically between 1.2× and 2.0× body weight due to dynamic heel strike. For a 70 kg individual ($F_g \approx 686\text{ N}$), dynamic peak force reaches 800–1200 N.

1. **Foot Strike (Compression Phase):** The foot exerts sudden compressive force on the upper platform. Force is transferred through the rubber damping pads to the six piezoelectric discs, producing a sharp positive voltage transient (up to +35 V open circuit).
2. **Foot Lift (Release Phase):** As the person steps off the platform, mechanical strain is released, and the elastic rebound creates an opposing negative polarity voltage spike (up to -25 V).
3. **Full-Wave Bridge Rectification:** Because the output oscillates between positive and negative polarities, a diode bridge (DB107) rectifies both half-cycles into unidirectional DC pulses, ensuring energy from both foot strike and release is captured.
4. **Capacitive Buffering:** A 10 µF electrolytic capacitor absorbs the high-impedance transient pulses, smoothing voltage ripple according to the exponential charging relationship:

$$V_c(t) = V_{\text{peak}} \left(1 - e^{-t / RC}\right)$$

5. **Energy Storage:** The smoothed DC voltage is regulated through a single-cell lithium-ion charging management board and stored into a 1S2P parallel pack of two 18650 cells (3.7 V nominal).
6. **ESP32 Telemetry:** An analog voltage divider steps down the voltage to within the safe 0–3.3 V full scale of the ESP32 ADC1 (GPIO 34), enabling the microcontroller to count steps and report live status on a 16×2 I²C LCD.
