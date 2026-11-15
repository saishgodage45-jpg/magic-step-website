# Magic Step — Footstep Power Generation System
## Project Overview & Engineering Record
**Group 16** · Department of Mechanical Engineering · Sanjivani University, Kopargaon  
**Academic Year:** 2026–27 | **Subject:** Makerspace / Engineering Capstone

---

### 1. Abstract
Magic Step is an electro-mechanical energy-harvesting prototype designed to explore the conversion of kinetic energy dissipated during human walking into conditioned electrical energy. Using an array of six lead zirconate titanate (PZT) piezoelectric ceramic discs arranged in a 2-row × 3-column configuration beneath a 300 mm × 160 mm × 10 mm wooden platform, mechanical compressive force from foot pressure is transduced into alternating voltage pulses. 

These high-impedance AC pulses are rectified into unidirectional DC through a DB107 full-wave diode bridge and buffered by a 10 µF electrolytic smoothing capacitor. An embedded telemetry unit built around an ESP32 DevKit V1 microcontroller monitors dynamic step occurrences, samples capacitor voltage, tracks battery state via high-impedance resistive dividers, and outputs real-time metrics onto a 16×2 character LCD with a PCF8574 I²C backpack. A parallel 1S2P arrangement of two 18650 lithium-ion cells provides a storage testbed, regulated by a dedicated charge management and protection circuit.

---

### 2. Problem Statement
In urban transit environments, academic campuses, pedestrian walkways, and stairwells, millions of joules of kinetic mechanical energy are dissipated into the ground daily. Conventional energy harvesting methods either require bulky mechanical mechanisms (rack-and-pinion dynamos) with significant mechanical wear or suffer from low conversion efficiency under intermittent, non-continuous human excitation.

This project investigates a compact, springless piezoelectric footstep harvesting prototype to evaluate:
1. The instantaneous voltage and electrical energy generated per footstep under varying footfall forces.
2. The efficiency of full-wave rectification and capacitive smoothing on intermittent transient spikes.
3. The feasibility of embedded microcontroller telemetry (ESP32) for live step counting and voltage monitoring.
4. Safe charging and protection parameters for 1S2P lithium-ion storage cells.

---

### 3. Project Objectives
1. **Mechanical Transduction & Direct Flexure:** Design and fabricate a 300 × 160 × 10 mm rigid wooden base platform with a springless force-transfer upper tread plate that evenly distributes foot pressure across six 27 mm piezoelectric sensor discs without causing mechanical ceramic fracture.
2. **Power Conditioning Circuitry:** Implement a full-wave diode bridge rectifier and capacitive smoothing buffer (10 µF) to convert bidirectional alternating stress pulses into stable DC voltage.
3. **Embedded Sensing & Telemetry:** Develop an ESP32-based analog sampling firmware utilizing timer-based debouncing to accurately register footsteps and display live metrics on a 16×2 I²C LCD.
4. **Energy Storage Integration:** Establish a safe 1S2P lithium-ion battery testbed with dedicated overcharge and over-discharge protection.
5. **Repeatable Experimental Evaluation:** Conduct systematic laboratory trials with digital storage oscilloscopes (DSO) to record open-circuit voltage, rectified DC output, and cumulative energy yield.

---

### 4. Project Team & Supervision
- **Team Members:** Saish Godage, Ayush Jadhav, Gaurav Wavdhane, Sai Gholap
- **Project Guides:** Dr. Kiran Wakchaure, Dr. Vasudeo Singh Singer, Dr. Prathibha Sinha
- **Affiliation:** Department of Mechanical Engineering, Sanjivani University, Kopargaon
