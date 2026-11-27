# System Architecture

**Magic Step · Group 16 · Sanjivani University**

## Functional blocks

The documented functional concept is:

**Footstep pressure → Piezoelectric energy generation → Bridge rectification → Energy storage / conditioning → Charging module → Lithium-ion battery**

Project records list six piezoelectric discs, four diodes, a 50 µF capacitor, a boost converter, a TP4056 charging module, and one 3.7 V lithium-ion battery. The detailed website diagram places the listed capacitor and boost converter in the functional sequence.

The ESP32 development board is presented separately as a monitoring and control unit where implemented. No direct battery-charging role or pin-level connection is implied.

## Diagram interpretation

[`assets/media/diagrams/system-schematic.svg`](../assets/media/diagrams/system-schematic.svg) is a block-level functional diagram, **not a wiring schematic**. It does not show validated interconnections, voltage levels, current limits, or measured performance.

The diagram and component list do not establish that the harvested input is suitable for the charging module or cell. A supervisor must verify the boost-converter output, charging-module requirements, cell compatibility, and protection provisions before battery charging.
