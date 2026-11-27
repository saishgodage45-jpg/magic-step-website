# Working Principle

**Magic Step · Group 16 · Sanjivani University**

## Piezoelectric energy conversion

Piezoelectric materials develop an electrical response when mechanically strained. The project explores applying footstep pressure to six piezoelectric discs mounted on a separate wooden platform. The discs' output is listed as the source for the conceptual energy-conversion path.

## Intended energy path

1. A footstep applies mechanical pressure to the wooden sensor platform.
2. The six piezoelectric discs generate electrical output under mechanical strain.
3. Four diodes are listed for bridge rectification.
4. A 50 µF capacitor is included after rectification in the documented concept.
5. A boost converter is listed as a voltage-conditioning stage.
6. A TP4056 module and one 3.7 V lithium-ion battery are listed in the charging and storage arrangement.
7. An ESP32 development board is identified separately for monitoring and control where implemented.

This sequence describes the intended functional concept only. It is not a wiring schematic, does not establish that the parts are electrically compatible, and does not mean the ESP32 directly charges the battery. No generated voltage, stored energy, charging efficiency, or commercial performance is claimed as measured.

## Verification note

The exact wiring, boost-converter output, charging-module input suitability, cell requirements, and protection provisions must be reviewed by the project supervisor before connecting or charging the battery.
