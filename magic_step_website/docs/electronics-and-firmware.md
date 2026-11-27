# Electronics and Circuit Documentation

**Magic Step · Group 16 · Sanjivani University**

## Component roles

The electronics are documented as a separate assembly from the wooden platform carrying six piezoelectric discs.

| Component | Quantity | Documented purpose |
|---|---:|---|
| Rectifier diodes | 4 | Listed as a bridge-rectification stage in the functional concept. |
| Capacitor, 50 µF | 1 | Included after rectification in the project record. |
| Boost converter | 1 | Listed voltage-conditioning stage; output suitability is not verified. |
| TP4056 charging module | 1 | Listed charging module; input and cell compatibility are not verified. |
| 3.7 V lithium-ion battery | 1 | Listed energy-storage component; requirements need supervisor review. |
| Battery holder | 1 | Holds the listed battery. |
| ESP32 development board | 1 | Monitoring and control unit where implemented; pin mapping is not specified. |
| 400-point mini breadboard | 1 | Separate electronics prototyping base. |
| Jumper wires | As required | Interconnect stock; exact connections are not documented. |

The complete inventory, including the piezoelectric discs and wooden platform, is in the [Bill of Materials](bill-of-materials.md).

## Functional energy flow

Footstep pressure → piezoelectric generation → four-diode bridge rectification → 50 µF capacitor → boost converter → TP4056 module → one 3.7 V lithium-ion battery.

The ESP32 is shown separately. The block diagram is a functional concept, not a wire-level circuit; it does not establish electrical connections or imply that the ESP32 charges the battery.

## Circuit and firmware status

A verified wire-level circuit diagram, pin map, and firmware feature record are not available. Do not infer wiring from the block diagram or claim unconfirmed monitoring behavior.

Before connecting or charging the battery, have the project supervisor check the boost-converter output, the charging module's input requirements, the specific cell's charging requirements, and any required cell protection. A module name or component list alone does not establish a safe or compatible charging circuit.
