# Electronics, Sensing & Embedded Firmware
## Magic Step — Footstep Power Generation System
**Group 16** · Sanjivani University, Kopargaon

---

### 1. Circuit Architecture
The Magic Step electronic circuit is divided into three distinct operational domains:
1. **Power Generation & Rectification:** 6× piezoelectric transducers wired in parallel -> DB107 full-wave bridge rectifier -> 10 µF 50V electrolytic smoothing capacitor.
2. **Signal Conditioning & ADC Protection:** 
   - 100 kΩ / 47 kΩ voltage divider to scale peak rectified pulses down to $\le 3.30\text{ V}$.
   - 3.3 V Zener diode clamp across the ADC input to protect the ESP32 from overvoltage transients.
   - 100 kΩ / 100 kΩ voltage divider for 1S2P lithium-ion battery voltage sensing.
3. **Embedded Processing & Telemetry:** ESP32 DevKit V1 microcontroller driving an HD44780 16×2 character LCD via a PCF8574 I²C backpack.

---

### 2. ESP32 Pin Allocation
| Pin | Function | Peripheral / Mode | Connected To | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **GPIO 34** | Analog Input | ADC1_CH6 (12-bit) | Piezo Voltage Divider | Measures pulse amplitude & step detection |
| **GPIO 35** | Analog Input | ADC1_CH7 (12-bit) | Battery Voltage Divider | Monitors 1S2P battery terminal voltage |
| **GPIO 32** | Digital Input | Internal PULLUP | Charger CHRG Pin | Active LOW charge status detection |
| **GPIO 21** | Digital I/O | I²C Bus (SDA) | PCF8574 LCD Backpack | I²C Serial Data Line |
| **GPIO 22** | Digital I/O | I²C Bus (SCL) | PCF8574 LCD Backpack | I²C Serial Clock Line (100 kHz) |
| **VIN** | Power Rail | 5.0 V Supply | System 5V Bus | Powers 16×2 LCD backlight |
| **3V3** | Power Rail | 3.3 V Regulated | ESP32 Core | System logic high reference |
| **GND** | Ground Rail | Common Ground | Star Ground Plane | Common reference for sensors, MCU & storage |

---

### 3. Firmware Architecture
The embedded firmware is written in C++ for the Arduino framework on the ESP32. Key modules include:
- **Peak Pulse Detection:** Samples ADC1_CH6 at 1 kHz. When the raw reading exceeds the calibrated threshold (`PIEZO_THRESHOLD = 450`), an active footstep event is registered.
- **Timer Debouncing:** To prevent double-counting caused by mechanical vibration ringing on impact, a non-blocking `millis()` lockout window (`DEBOUNCE_MS = 220 ms`) is enforced.
- **Battery State of Charge Tracking:** Every 500 ms, ADC1_CH7 is sampled with a moving average filter to compute battery terminal voltage:
  $$V_{\text{bat}} = \left(\frac{\text{ADC}_{\text{raw}}}{4095}\right) \times 3.30\text{ V} \times \text{Ratio}$$
- **I²C Display Driver:** The 16×2 LCD is refreshed every 150 ms with formatted step counts and a live blink indicator `[*]` during footfalls.
