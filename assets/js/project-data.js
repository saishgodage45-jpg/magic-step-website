/*
 * Magic Step Website Project Data
 * Group 16 · Department of Mechanical Engineering · Sanjivani University, Kopargaon
 * Academic Year: 2026–27
 *
 * Status vocabulary:
 *   COMPLETED   — physically built, assembled, or procured
 *   IMPLEMENTED — firmware written, logic operational, or circuit verified
 *   PENDING     — planned or testing stage; actual values to be recorded
 */

window.MAGICSTEP_PROJECT = {
  title: "MAGIC STEP",
  subtitle: "Footstep Power Generation & Kinetic Energy Harvesting System",
  statusHeadline: "Prototype Assembled — Firmware Implemented — Testing In Progress",
  group: "Group 16",
  academicYear: "2026–27",
  institution: "Sanjivani University, Kopargaon",
  department: "Department of Mechanical Engineering",
  subject: "Makerspace / Capstone Project",

  teamMembers: [
    {
      name: "Saish Godage",
      role: "Student Project Member",
      programme: "B.Tech Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon",
      avatarText: "SG"
    },
    {
      name: "Ayush Jadhav",
      role: "Student Project Member",
      programme: "B.Tech Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon",
      avatarText: "AJ"
    },
    {
      name: "Gaurav Wavdhane",
      role: "Student Project Member",
      programme: "B.Tech Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon",
      avatarText: "GW"
    },
    {
      name: "Sai Gholap",
      role: "Student Project Member",
      programme: "B.Tech Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon",
      avatarText: "SG"
    }
  ],

  projectGuides: [
    {
      name: "Dr. Kiran Wakchaure",
      designation: "Project Guide",
      department: "Department of Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon"
    },
    {
      name: "Dr. Vasudeo Singh Singer",
      designation: "Project Guide",
      department: "Department of Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon"
    },
    {
      name: "Dr. Prathibha Sinha",
      designation: "Project Guide",
      department: "Department of Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon"
    }
  ],

  specifications: [
    {
      label: "Base Plate Dimensions",
      value: "300 mm (L) × 160 mm (W) × 10 mm (T)",
      note: "Confirmed physical base plate fabricated from seasoned timber/wood."
    },
    {
      label: "Sensor Configuration",
      value: "6 × Piezoelectric Discs (⌀27 mm)",
      note: "Arranged in a 2-row × 3-column matrix; brass substrate with lead zirconate titanate (PZT) active layer."
    },
    {
      label: "Sensor Attachment",
      value: "High-compliance double-sided adhesive",
      note: "Provides firm positioning while permitting necessary radial strain under flexure."
    },
    {
      label: "Mechanical Springing",
      value: "Springless Direct-Transmission Design",
      note: "Does not use mechanical coil springs; uses direct plate flexure and rubber damping buffers."
    },
    {
      label: "Power Conditioning",
      value: "Full-Wave Bridge Rectifier + 10 µF Buffer",
      note: "Converts bidirectional AC piezo pulses to unidirectional DC; buffered by 10 µF electrolytic capacitor."
    },
    {
      label: "Microcontroller Unit",
      value: "ESP32 DevKit V1 (30-pin / 38-pin)",
      note: "Dual-core Xtensa 32-bit MCU; reads piezo analog pulses, monitors battery voltage, and controls LCD."
    },
    {
      label: "Telemetry Display",
      value: "16×2 Character LCD with PCF8574 I²C",
      note: "Real-time step count, instantaneous pulse detection indicator, and battery condition readout."
    },
    {
      label: "Energy Storage Medium",
      value: "2 × 18650 Li-ion Cells in Parallel (1S2P)",
      note: "Nominal voltage 3.7 V (4.2 V peak charged); combined parallel capacity requires dedicated 1S BMS."
    },
    {
      label: "Protection Circuit",
      value: "Dedicated 1S Li-ion Charge & Protection Module",
      note: "Provides overcharge (4.25 V), over-discharge (2.8 V), and short-circuit cut-off."
    }
  ],

  components: [
    {
      name: "Piezoelectric Discs (6×)",
      status: "COMPLETED",
      tone: "done",
      spec: "⌀27 mm Brass Substrate, PZT Ceramic",
      role: "Primary electromechanical transducers. Convert mechanical compressive stress from footfalls into alternating electrical charge pulses via the direct piezoelectric effect."
    },
    {
      name: "Wooden Base Plate",
      status: "COMPLETED",
      tone: "done",
      spec: "300 × 160 × 10 mm, Seasoned Wood",
      role: "Rigid foundation supporting the 2×3 sensor matrix, ensuring stable ground contact and even reaction force distribution."
    },
    {
      name: "Full-Wave Bridge Rectifier",
      status: "COMPLETED",
      tone: "done",
      spec: "1A / 1000V Bridge (4× 1N4007 / DB107)",
      role: "Rectifies alternating bidirectional charge generated during foot strike (compression) and foot lift (release) into unidirectional DC pulses."
    },
    {
      name: "Smoothing Capacitor Buffer",
      status: "COMPLETED",
      tone: "done",
      spec: "10 µF Electrolytic / 50V Rated",
      role: "Filters high-frequency ripple, buffers discrete transient spikes, and accumulates charge before energy management routing."
    },
    {
      name: "ESP32 DevKit V1 Microcontroller",
      status: "COMPLETED",
      tone: "done",
      spec: "Xtensa 32-bit LX6, 240 MHz, ADC1 Channels",
      role: "Embedded telemetry core. Runs algorithm for step pulse detection, debouncing, battery voltage monitoring via voltage divider, and I²C LCD driver."
    },
    {
      name: "16×2 I²C Character LCD",
      status: "COMPLETED",
      tone: "done",
      spec: "HD44780 compatible + PCF8574 backpack",
      role: "Displays real-time user metrics: total step counter, dynamic pulse strike indicator, measured battery voltage, and charge state."
    },
    {
      name: "18650 Lithium-Ion Battery Pack",
      status: "COMPLETED",
      tone: "done",
      spec: "2 Cells in Parallel (1S2P Configuration)",
      role: "Energy accumulation testbed. Stores harvested energy at 3.7 V nominal. Cell matching and safe protection circuit mandatory."
    },
    {
      name: "Li-ion Charger & BMS Circuit",
      status: "PENDING",
      tone: "next",
      spec: "1S Li-ion Charger / Harvesting IC (e.g. TP4056 / LTC3588)",
      role: "Essential protection interface. Regulates trickle charge into 1S2P battery pack and protects against over-discharge. Exact model to be confirmed."
    },
    {
      name: "Telemetry Firmware Logic",
      status: "IMPLEMENTED",
      tone: "done",
      spec: "C++ / Arduino IDE, Timer Debounce, ADC Averaging",
      role: "Embedded algorithm running on ESP32: ADC peak detection, software debounce window (200 ms), battery voltage calculation, and LCD formatting."
    }
  ],

  billOfMaterials: [
    {
      item: "01",
      category: "Electrical / Sensors",
      description: "Piezoelectric Sensor Discs",
      spec: "⌀27 mm brass plate, PZT ceramic element",
      qty: 6,
      unit: "pcs",
      unitCost: 25,
      totalCost: 150,
      source: "Local Electronics / Makerspace Stock",
      status: "Procured"
    },
    {
      item: "02",
      category: "Mechanical",
      description: "Base Platform Plate",
      spec: "Seasoned wood, 300 × 160 × 10 mm",
      qty: 1,
      unit: "pc",
      unitCost: 180,
      totalCost: 180,
      source: "Carpentry Workshop / Sanjivani Makerspace",
      status: "Procured"
    },
    {
      item: "03",
      category: "Mechanical",
      description: "Top Stepping Tread Plate",
      spec: "Impact-resistant plate with force pads",
      qty: 1,
      unit: "pc",
      unitCost: 220,
      totalCost: 220,
      source: "Makerspace Workshop",
      status: "Procured"
    },
    {
      item: "04",
      category: "Electrical / Sensors",
      description: "Bridge Rectifier Module",
      spec: "Full-wave diode bridge (1A, 1000V / DB107)",
      qty: 1,
      unit: "pc",
      unitCost: 40,
      totalCost: 40,
      source: "Electronics Lab Stock",
      status: "Procured"
    },
    {
      item: "05",
      category: "Electrical / Sensors",
      description: "Electrolytic Smoothing Capacitor",
      spec: "10 µF, 50V rated radial lead",
      qty: 1,
      unit: "pc",
      unitCost: 10,
      totalCost: 10,
      source: "Lab Stock",
      status: "Procured"
    },
    {
      item: "06",
      category: "Embedded & Display",
      description: "ESP32 DevKit V1 Microcontroller",
      spec: "Xtensa Dual-Core 32-bit, WiFi + Bluetooth",
      qty: 1,
      unit: "pc",
      unitCost: 450,
      totalCost: 450,
      source: "Makerspace Inventory",
      status: "Procured"
    },
    {
      item: "07",
      category: "Embedded & Display",
      description: "16×2 I²C LCD Display Module",
      spec: "HD44780 + PCF8574 I²C backpack (0x27 / 0x3F)",
      qty: 1,
      unit: "pc",
      unitCost: 220,
      totalCost: 220,
      source: "Makerspace Inventory",
      status: "Procured"
    },
    {
      item: "08",
      category: "Electrical / Sensors",
      description: "18650 Lithium-Ion Battery Cells",
      spec: "3.7 V, 2000–2600 mAh (matched parallel pair)",
      qty: 2,
      unit: "pcs",
      unitCost: 180,
      totalCost: 360,
      source: "Energy Storage Lab",
      status: "Procured"
    },
    {
      item: "09",
      category: "Electrical / Sensors",
      description: "Dual 18650 Battery Holder",
      spec: "Parallel 1S2P wiring configuration with leads",
      qty: 1,
      unit: "pc",
      unitCost: 45,
      totalCost: 45,
      source: "Electronics Lab Stock",
      status: "Procured"
    },
    {
      item: "10",
      category: "Electrical / Sensors",
      description: "Li-ion Charging & Protection Board",
      spec: "1S Li-ion BMS / Harvesting regulator board",
      qty: 1,
      unit: "pc",
      unitCost: 65,
      totalCost: 65,
      source: "Electronics Supplier (Pending Selection)",
      status: "Pending Verification"
    },
    {
      item: "11",
      category: "Mechanical",
      description: "Force Distribution Damper Pads",
      spec: "High-density neoprene / rubber buffer discs",
      qty: 6,
      unit: "pcs",
      unitCost: 15,
      totalCost: 90,
      source: "Mechanical Lab Stock",
      status: "Procured"
    },
    {
      item: "12",
      category: "Fasteners & Mounting",
      description: "Wiring, Double-Sided Tape & Fasteners",
      spec: "AWG24 hookup wire, high-bond acrylic tape, standoffs",
      qty: 1,
      unit: "set",
      unitCost: 120,
      totalCost: 120,
      source: "Makerspace Workshop",
      status: "Procured"
    }
  ],

  journeySteps: [
    {
      number: "01",
      title: "Base Plate Dimensioning and Sizing",
      buildStage: 1,
      tools: "Band saw, surface planer, vernier calliper",
      materials: "Seasoned timber / hardwood block",
      text: "The wooden base plate was measured, marked, and machined to 300 mm length, 160 mm width, and 10 mm thickness. Edges were trued and sanded to provide an unyielding reference plane for piezoelectric mounting.",
      notes: "A rigid planar surface is essential to ensure that downward footstep energy flexes the piezoelectric ceramic against the base rather than deflecting the platform structure."
    },
    {
      number: "02",
      title: "Transducer Grid Layout & Center Punching",
      buildStage: 2,
      tools: "Steel rule, marking gauge, spring divider",
      materials: "Base plate surface",
      text: "A 2-row × 3-column matrix grid was marked on the wooden surface. Transducer centers were laid out with equal spacing across the 300 × 160 mm footprint to maximize foot strike capture across the foot's heel-to-ball strike line.",
      notes: "Grid centers ensure repeatable transducer placement and prevent mechanical point overloading on any single sensor disc."
    },
    {
      number: "03",
      title: "Piezo Disc Surface Mounting & Parallel Harness",
      buildStage: 3,
      tools: "Temperature-controlled soldering iron, tweezers",
      materials: "6× ⌀27 mm brass/PZT discs, double-sided adhesive, AWG26 wire",
      text: "The six piezoelectric discs were mounted using compliant double-sided adhesive. Lead wires were soldered carefully to the brass substrate (+) and ceramic electrode surface (-) without overheating the fragile piezoelectric crystal layer.",
      notes: "Lead zirconate titanate (PZT) ceramic loses polarization if subjected to temperatures exceeding its Curie point (~300 °C) during prolonged soldering."
    },
    {
      number: "04",
      title: "AC-DC Rectification & Capacitor Buffer Assembly",
      buildStage: 4,
      tools: "Digital multimeter, breadboard, wire stripper",
      materials: "Bridge rectifier, 10 µF 50V electrolytic capacitor, terminal blocks",
      text: "The parallel transducer output leads were connected to an AC full-wave diode bridge. The rectified positive and negative output leads were connected across a 10 µF electrolytic smoothing capacitor to buffer instantaneous voltage spikes into usable DC charge.",
      notes: "Each foot strike produces a high-voltage, low-current spike of alternating polarity. Full-wave rectification captures energy from both foot impact and release phases."
    },
    {
      number: "05",
      title: "Force Distribution Layer & Top Tread Plate Integration",
      buildStage: 5,
      tools: "Precision drill press, alignment pins",
      materials: "Top tread plate, high-density rubber buffer spacers",
      text: "Compliant force distribution pads were positioned directly above each disc. The upper footstep plate was fitted without coil springs, relying on controlled elastomeric flexure to transfer foot pressure evenly without cracking the brittle ceramic crystals.",
      notes: "Springless direct flexure avoids energy loss through mechanical spring hysteresis, channeling maximum compressive kinetic energy directly into piezoelectric strain."
    },
    {
      number: "06",
      title: "ESP32 DevKit V1 & 16×2 I²C LCD Wiring",
      buildStage: 6,
      tools: "USB logic analyzer, oscilloscope, breadboard",
      materials: "ESP32 DevKit V1, 16×2 LCD with PCF8574 backpack, voltage divider",
      text: "The ESP32 was wired on an electronics carrier board. I²C lines (SDA on GPIO 21, SCL on GPIO 22) were connected to the 16×2 LCD. An analog conditioning voltage divider was wired from the rectified buffer to ADC1 (GPIO 34) for step and voltage telemetry.",
      notes: "ESP32 ADC inputs must strictly not exceed 3.3 V. A protective resistor divider and clamping Zener diode network prevents sensor spike overvoltage."
    },
    {
      number: "07",
      title: "1S2P Li-ion Storage Pack & Power Routing",
      buildStage: 7,
      tools: "Calibrated multimeter, battery capacity tester",
      materials: "2× 18650 Li-ion cells, dual parallel cell holder, insulated leads",
      text: "Two matched 18650 lithium-ion cells were connected in parallel (1S2P arrangement) inside an insulated holder. Battery terminal voltage was routed through a high-impedance voltage divider to ESP32 ADC1 GPIO 35 for state-of-charge tracking.",
      notes: "A battery holder is not a charger. Safe lithium-ion charging requires an appropriate 1S charger circuit with CC/CV regulation and overvoltage cutoff."
    },
    {
      number: "08",
      title: "Enclosure Packaging & Test Bed Preparation",
      buildStage: 8,
      tools: "Benchtop oscilloscope, calibrated DMM, mechanical load rig",
      materials: "Enclosure housing, strain relief cable glands, testing log sheet",
      text: "All wiring runs were secured with strain relief. The electronics and display module were packaged into an adjacent protective console. The mechanical tile was mounted on a non-slip calibration mat ready for physical footfall test trials.",
      notes: "Repeatable test conditions require standardized step cadences, recorded person weights, and calibrated instrumentation."
    }
  ],

  testingProtocol: [
    {
      id: "T01",
      test: "Single-Step Open-Circuit Pulse",
      parameter: "Peak AC voltage amplitude (V_pk)",
      instrument: "Digital Storage Oscilloscope (10 MΩ probe)",
      condition: "Direct impact, 70 kg mass, no load resistor",
      expected: "15 V – 35 V transient peak",
      measured: "[Placeholder: Value to be recorded in lab]",
      status: "Pending Lab Test"
    },
    {
      id: "T02",
      test: "Rectified Output Voltage",
      parameter: "DC voltage after bridge rectifier",
      instrument: "DSO / True RMS Multimeter",
      condition: "Full-wave bridge, single step, open circuit",
      expected: "12 V – 28 V rectified DC peak",
      measured: "[Placeholder: Value to be recorded in lab]",
      status: "Pending Lab Test"
    },
    {
      id: "T03",
      test: "Capacitor Voltage Accumulation",
      parameter: "Accumulated DC voltage across 10 µF buffer",
      instrument: "High-impedance Digital Multimeter",
      condition: "10, 25, 50, and 100 consecutive footsteps",
      expected: "Exponential voltage accumulation curve V_c(t)",
      measured: "[Placeholder: Value to be recorded in lab]",
      status: "Pending Lab Test"
    },
    {
      id: "T04",
      test: "ESP32 Step Detection Accuracy",
      parameter: "Detected pulses vs physical step count",
      instrument: "ESP32 Serial Monitor vs Manual Counter",
      condition: "100 walked steps at 1 Hz cadence (60 bpm)",
      expected: "≥ 95% step detection accuracy after debouncing",
      measured: "[Placeholder: Value to be recorded in lab]",
      status: "Pending Lab Test"
    },
    {
      id: "T05",
      test: "1S2P Battery Pack Voltage Response",
      parameter: "Terminal voltage before vs after 500 steps",
      instrument: "Calibrated 4.5-digit Multimeter (mV resolution)",
      condition: "1S2P 18650 pack connected through charger IC",
      expected: "Measurable terminal voltage delta under test load",
      measured: "[Placeholder: Value to be recorded in lab]",
      status: "Pending Lab Test"
    },
    {
      id: "T06",
      test: "Charger State Indicator Verification",
      parameter: "Charger module status pin logic (CHRG/STDBY)",
      instrument: "Logic Probe / ESP32 GPIO 32 read",
      condition: "Active step generation vs resting condition",
      expected: "Active LOW on CHRG line during charge pulses",
      measured: "[Placeholder: Value to be recorded in lab]",
      status: "Pending Lab Test"
    }
  ],

  statusGroups: [
    {
      heading: "Fabricated & Assembled",
      badge: "COMPLETED",
      tone: "done",
      subgroups: [
        {
          label: "Mechanical Tile",
          items: [
            "Wooden base plate cut, surfaced and trued (300 × 160 × 10 mm).",
            "2-row × 3-column sensor layout marked and prepared.",
            "6× ⌀27 mm piezoelectric discs mounted with double-sided adhesive.",
            "Springless force-distribution tread plate fitted with rubber damper pads."
          ]
        },
        {
          label: "Electronics Hardware",
          items: [
            "Full-wave bridge rectifier and 10 µF smoothing capacitor wired.",
            "ESP32 DevKit V1 and 16×2 I²C LCD wired and bench-tested.",
            "2× 18650 cell holder wired in parallel (1S2P configuration)."
          ]
        }
      ]
    },
    {
      heading: "Firmware & Telemetry Running",
      badge: "IMPLEMENTED",
      tone: "done",
      items: [
        "ESP32 C++ firmware compiled and uploaded to DevKit V1.",
        "ADC analog threshold peak detection with 200 ms non-blocking debounce.",
        "16×2 I²C LCD driver operational at address 0x27 (displaying step counter, pulse indicator, and battery voltage).",
        "Battery voltage divider conversion formula calibrated for 3.3V ADC full scale."
      ]
    },
    {
      heading: "Next: Scientific Testing & Verification",
      badge: "NEXT",
      tone: "next",
      items: [
        "Finalize and verify dedicated 1S Li-ion charger/harvesting module.",
        "Connect digital storage oscilloscope to measure raw piezoelectric pulse waveforms under calibrated foot strikes.",
        "Execute 100-step and 500-step test cycles and record raw readings in test matrix.",
        "Complete SolidWorks 3D exploded assembly renders and engineering drawings.",
        "Prepare final Makerspace project report and conference poster for university evaluation."
      ]
    }
  ],

  esp32Pinout: [
    { pin: "GPIO 34 (ADC1_CH6)", function: "Analog Input", connectedTo: "Piezo Voltage Divider", note: "Reads rectified piezo pulse voltage (scaled ≤ 3.3V)" },
    { pin: "GPIO 35 (ADC1_CH7)", function: "Analog Input", connectedTo: "Battery Voltage Divider", note: "Monitors 1S2P Li-ion pack voltage (scaled 2:1)" },
    { pin: "GPIO 21", function: "I²C Data (SDA)", connectedTo: "16×2 LCD PCF8574 Backpack", note: "Hardware I²C data line with internal pull-up" },
    { pin: "GPIO 22", function: "I²C Clock (SCL)", connectedTo: "16×2 LCD PCF8574 Backpack", note: "Hardware I²C clock line (100 kHz standard mode)" },
    { pin: "GPIO 32", function: "Digital Input (PULLUP)", connectedTo: "Charger Module CHRG Pin", note: "Detects active charge cycle (LOW = Charging)" },
    { pin: "3V3 / VIN", function: "Power Rail", connectedTo: "System Power Distribution", note: "3.3V to ESP32 core; 5V VIN to LCD backlight" },
    { pin: "GND", function: "Common Ground", connectedTo: "Common Ground Plane", note: "Star-ground connection uniting sensor, MCU & battery" }
  ],

  codeSnippet: `/*
 * MAGIC STEP — Footstep Power Generation Telemetry Firmware
 * Group 16 · Department of Mechanical Engineering · Sanjivani University
 * Platform: ESP32 DevKit V1 | Display: 16x2 I2C LCD (0x27)
 */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Pin Definitions
#define PIN_PIEZO_ADC   34  // Analog pulse sense (ADC1_CH6)
#define PIN_BATTERY_ADC 35  // Battery divider sense (ADC1_CH7)
#define PIN_CHRG_STAT   32  // Charger IC status pin (Active LOW)

// Calibration Constants
const int PIEZO_THRESHOLD = 450;        // ADC threshold for step registration
const unsigned long DEBOUNCE_MS = 220;  // Minimum ms between consecutive steps
const float VREF = 3.30;                // ESP32 calibrated ADC reference
const float BATTERY_DIVIDER_RATIO = 2.0;// (R1 + R2) / R2 for 100k/100k divider

// Telemetry State
volatile unsigned long stepCount = 0;
unsigned long lastStepTime = 0;
float batteryVoltage = 0.0;
bool isCharging = false;
bool pulseDetected = false;

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // SDA = GPIO 21, SCL = GPIO 22

  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("  MAGIC STEP  ");
  lcd.setCursor(0, 1);
  lcd.print("Group 16 SU 26-27");
  delay(1800);
  lcd.clear();

  pinMode(PIN_CHRG_STAT, INPUT_PULLUP);
  analogReadResolution(12); // 12-bit ADC (0-4095)
}

void loop() {
  unsigned long currentMillis = millis();

  // 1. Read Rectified Piezo Voltage Pulse
  int piezoRaw = analogRead(PIN_PIEZO_ADC);
  if (piezoRaw > PIEZO_THRESHOLD && (currentMillis - lastStepTime > DEBOUNCE_MS)) {
    stepCount++;
    lastStepTime = currentMillis;
    pulseDetected = true;
    Serial.printf("[STEP] Count: %lu | Raw ADC: %d\\n", stepCount, piezoRaw);
  } else {
    pulseDetected = false;
  }

  // 2. Read Battery Voltage (every 500 ms)
  static unsigned long lastBatteryRead = 0;
  if (currentMillis - lastBatteryRead > 500) {
    lastBatteryRead = currentMillis;
    int batRaw = analogRead(PIN_BATTERY_ADC);
    batteryVoltage = (batRaw / 4095.0) * VREF * BATTERY_DIVIDER_RATIO;
    isCharging = (digitalRead(PIN_CHRG_STAT) == LOW);
  }

  // 3. Update 16x2 I2C Display
  static unsigned long lastLcdUpdate = 0;
  if (currentMillis - lastLcdUpdate > 150) {
    lastLcdUpdate = currentMillis;
    
    // Row 0: Step Counter and Live Pulse Indicator
    lcd.setCursor(0, 0);
    lcd.print("STEPS: ");
    char stepStr[8];
    sprintf(stepStr, "%-5lu", stepCount);
    lcd.print(stepStr);
    lcd.setCursor(14, 0);
    lcd.print(pulseDetected ? "[*]" : "   ");

    // Row 1: Battery Voltage & Charge State
    lcd.setCursor(0, 1);
    lcd.print("BAT: ");
    lcd.print(batteryVoltage, 2);
    lcd.print("V ");
    lcd.setCursor(11, 1);
    lcd.print(isCharging ? "CHRG" : "IDLE");
  }
}`
};
