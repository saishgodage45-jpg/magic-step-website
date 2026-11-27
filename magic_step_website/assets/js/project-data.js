/*
 * Magic Step Website Project Data
 * Group 16 · Department of Mechanical Engineering · Sanjivani University, Kopargaon
 * Academic Year: 2026–27
 *
 * Electrical behavior and battery charging have not been independently verified.
 */

window.MAGICSTEP_PROJECT = {
  title: "MAGIC STEP",
  subtitle: "Footstep Power Generation & Kinetic Energy Harvesting System",
  statusHeadline: "Prototype documented — Electrical validation pending",
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
  ],

  projectGuides: [
    {
      name: "Dr. K. C. Bhosale",
      designation: "Head of Department (HOD)",
      department: "Department of Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon",
      avatarText: "KB"
    },
    {
      name: "Dr. Kiran Wakchaure",
      designation: "Project Guide",
      department: "Department of Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon",
      avatarText: "KW"
    },
    {
      name: "Dr. Vasudeo Singh Singer",
      designation: "Project Guide",
      department: "Department of Mechanical Engineering",
      institution: "Sanjivani University, Kopargaon",
      avatarText: "VS"
    }
  ],

  specifications: [
    {
      label: "Base Plate Dimensions",
      value: "300 mm (L) × 160 mm (W) × 10 mm (T)",
      note: "Wooden sensor platform; physically separate from the breadboard electronics."
    },
    {
      label: "Sensor Configuration",
      value: "6 × Piezoelectric Discs (⌀27 mm)",
      note: "Six piezoelectric discs are mounted on the separate wooden platform."
    },
    {
      label: "Electronics Platform",
      value: "400-point mini breadboard",
      note: "The electronics assembly is separate from the wooden sensor platform."
    },
    {
      label: "Documented Conversion Path",
      value: "Four diodes → 50 µF capacitor → boost converter → TP4056 module",
      note: "Functional sequence only; exact wiring and charger compatibility are not verified."
    },
    {
      label: "Monitoring & Control",
      value: "ESP32 development board",
      note: "Used as the monitoring and control unit where implemented; pin mapping is not specified."
    },
    {
      label: "Energy Storage Medium",
      value: "One 3.7 V lithium-ion battery and holder",
      note: "Confirm the cell requirements and required protection with the project supervisor before charging."
    }
  ],

  components: [
    {
      name: "Piezoelectric Discs (6×)",
      spec: "Quantity 6",
      role: "Mounted on the separate wooden platform to convert applied footstep pressure into electrical output."
    },
    {
      name: "Wooden Platform",
      spec: "Quantity 1",
      role: "Separate platform carrying the six piezoelectric discs."
    },
    {
      name: "Rectifier Diodes",
      spec: "Quantity 4",
      role: "Used as the bridge-rectification stage in the documented conversion concept."
    },
    {
      name: "Capacitor",
      spec: "50 µF · Quantity 1",
      role: "Included after rectification in the documented energy-conversion concept."
    },
    {
      name: "ESP32 Development Board",
      spec: "Quantity 1",
      role: "Monitoring and control unit where implemented; no pin-level wiring is documented here."
    },
    {
      name: "Boost Converter",
      spec: "Quantity 1",
      role: "Voltage-conditioning stage in the documented conversion sequence."
    },
    {
      name: "TP4056 Charging Module",
      spec: "Quantity 1",
      role: "Listed in the charging arrangement; compatibility and protection requirements need supervisor verification."
    },
    {
      name: "3.7 V Lithium-Ion Battery",
      spec: "Quantity 1",
      role: "Listed energy-storage component; confirm cell chemistry, charging limits, and protection requirements."
    },
    {
      name: "Battery Holder",
      spec: "Quantity 1",
      role: "Holds the single listed lithium-ion battery."
    },
    {
      name: "400-Point Mini Breadboard",
      spec: "Quantity 1",
      role: "Separate prototyping base for the electronics assembly."
    },
    {
      name: "Jumper Wires",
      spec: "As required",
      role: "Wiring stock for the electronics assembly; exact connections are not specified here."
    }
  ],

  billOfMaterials: [
    {
      serial: "01",
      category: "Sensors",
      name: "Piezoelectric Discs",
      quantity: "6",
      purpose: "Convert applied mechanical strain into electrical output.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "02",
      category: "Mechanical",
      name: "Wooden Platform",
      quantity: "1",
      purpose: "Supports the six piezoelectric discs as a separate sensor platform.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "03",
      category: "Electronics",
      name: "Diodes",
      quantity: "4",
      purpose: "Form the listed bridge-rectification stage in the functional concept.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "04",
      category: "Electronics",
      name: "Capacitor · 50 µF",
      quantity: "1",
      purpose: "Included after rectification in the documented energy-conversion concept.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "05",
      category: "Electronics",
      name: "ESP32 Development Board",
      quantity: "1",
      purpose: "Monitoring and control unit where implemented; pin-level connections are not specified.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "06",
      category: "Electronics",
      name: "Boost Converter",
      quantity: "1",
      purpose: "Listed voltage-conditioning stage; output and compatibility require verification.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "07",
      category: "Electronics",
      name: "TP4056 Charging Module",
      quantity: "1",
      purpose: "Listed battery-charging module; compatibility and protection are unverified.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "08",
      category: "Storage",
      name: "3.7 V Lithium-Ion Battery",
      quantity: "1",
      purpose: "Listed energy-storage component; confirm cell requirements before charging.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "09",
      category: "Storage",
      name: "Battery Holder",
      quantity: "1",
      purpose: "Holds the single listed lithium-ion battery.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "10",
      category: "Prototyping",
      name: "400-Point Mini Breadboard",
      quantity: "1",
      purpose: "Separate prototyping base for the electronics assembly.",
      approximatePrice: "Not recorded"
    },
    {
      serial: "11",
      category: "Prototyping",
      name: "Jumper Wires",
      quantity: "As required",
      purpose: "Interconnect stock for the electronics assembly; exact connections are not documented.",
      approximatePrice: "Not recorded"
    }
  ],

  journeySteps: [
    {
      stage: "Stage 1",
      stageTitle: "Initial Prototype Integration",
      title: "Initial Prototype Integration",
      description: "Initial hands-on development of the Magic Step platform, involving the arrangement of electronic components and prototype wiring.",
      alt: "Student arranging components and wiring on the Magic Step prototype platform at a workshop bench.",
      src: "assets/images/engineering-journey/prototype-integration-1.jpg",
      width: 768,
      height: 1024
    },
    {
      stage: "Stage 2",
      stageTitle: "Electronics Development",
      title: "Electronics Assembly and Wiring",
      description: "Working on the physical arrangement and electrical connections of the prototype as part of the system integration process.",
      alt: "Close view of a student connecting components on the Magic Step prototype platform.",
      src: "assets/images/engineering-journey/prototype-integration-2.jpg",
      width: 768,
      height: 1024
    },
    {
      stage: "Stage 3",
      stageTitle: "Team Collaboration",
      title: "Collaborative Prototype Development",
      description: "Team members working together on the prototype in the workshop, inspecting the assembly and coordinating the mechanical and electronic integration.",
      alt: "Team members collaborating on and inspecting the Magic Step prototype in the workshop.",
      src: "assets/images/engineering-journey/team-development.jpg",
      width: 768,
      height: 1024
    },
    {
      stage: "Stage 4",
      stageTitle: "Piezoelectric Sensor Preparation",
      title: "Piezoelectric Sensor Preparation",
      description: "Preparing the piezoelectric sensor connections through soldering as part of the electrical development and integration process.",
      alt: "Hands soldering an electrical connection to a round piezoelectric sensor at the workshop bench.",
      src: "assets/images/engineering-journey/piezo-sensor-soldering.jpg",
      width: 768,
      height: 1024
    }
  ],

  testingProtocol: [
    {
      id: "T01",
      test: "Piezoelectric Output",
      parameter: "Voltage waveform under a recorded footstep condition",
      instrument: "Suitable rated meter or oscilloscope, selected with supervisor",
      condition: "Record sensor configuration, applied force, and instrument settings",
      expected: "No nominal result assumed",
      measured: "To be recorded",
      status: "Pending Lab Test"
    },
    {
      id: "T02",
      test: "Rectifier Stage",
      parameter: "Output waveform after the four-diode stage",
      instrument: "Suitable rated meter or oscilloscope, selected with supervisor",
      condition: "Use a reviewed test setup; document all measurement points",
      expected: "No nominal result assumed",
      measured: "To be recorded",
      status: "Pending Lab Test"
    },
    {
      id: "T03",
      test: "50 µF Capacitor Stage",
      parameter: "Voltage response during a documented test sequence",
      instrument: "Suitable rated meter or oscilloscope, selected with supervisor",
      condition: "Record starting condition, step count, timing, and measurement points",
      expected: "No nominal result assumed",
      measured: "To be recorded",
      status: "Pending Lab Test"
    },
    {
      id: "T04",
      test: "Boost Converter Stage",
      parameter: "Input and output behavior under reviewed conditions",
      instrument: "Suitable rated meter, selected with supervisor",
      condition: "Verify module limits and test arrangement before applying power",
      expected: "No nominal result assumed",
      measured: "To be recorded",
      status: "Pending Lab Test"
    },
    {
      id: "T05",
      test: "Charging Arrangement Compatibility",
      parameter: "TP4056, boost-converter, cell, and protection compatibility",
      instrument: "Manufacturer specifications and supervisor review",
      condition: "Do not connect the cell until the input and protection design is reviewed",
      expected: "Written verification before any charging test",
      measured: "Pending supervisor verification",
      status: "Pending Lab Test"
    },
    {
      id: "T06",
      test: "ESP32 Monitoring & Control",
      parameter: "Functions actually implemented in the prototype",
      instrument: "Documented firmware and reviewed test procedure",
      condition: "Record confirmed behavior without assuming a pin map",
      expected: "No behavior assumed",
      measured: "To be recorded",
      status: "Pending Lab Test"
    }
  ],

  statusGroups: [
    {
      heading: "Prototype Components",
      badge: "DOCUMENTED",
      tone: "done",
      subgroups: [
        {
          label: "Separate Mechanical Platform",
          items: [
            "One wooden platform.",
            "Six piezoelectric discs mounted on the platform."
          ]
        },
        {
          label: "Separate Breadboard Electronics",
          items: [
            "400-point mini breadboard, four diodes, 50 µF capacitor, boost converter, and TP4056 module.",
            "One 3.7 V lithium-ion battery, one holder, jumper wires, and one ESP32 development board."
          ]
        }
      ]
    },
    {
      heading: "Electrical Validation & Safety",
      badge: "TO VERIFY",
      tone: "next",
      items: [
        "Confirm the exact diode bridge, boost converter, TP4056 module, and battery arrangement.",
        "Verify whether the selected module provides required cell protection.",
        "Review intermittent-source compatibility with the project supervisor before connecting the battery.",
        "Record measured electrical behavior only after a reviewed, supervised test."
      ]
    },
    {
      heading: "Project Development",
      badge: "IN PROGRESS",
      tone: "next",
      items: [
        "Document the ESP32 monitoring and control features that are implemented.",
        "Complete supervised characterization of the piezoelectric energy-conversion stages.",
        "Expand the manufacturing gallery when original Tinkerers Lab photographs are available."
      ]
    }
  ],

};
