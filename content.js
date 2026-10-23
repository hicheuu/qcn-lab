window.LAB_CONTENT = {
 "site": {
  "name": "UCT Laboratory",
  "tagline": "RF circuits for quantum control",
  "university": "KOOKMIN UNIVERSITY",
  "department": "School of Electrical Engineering",
  "universityUrl": "https://www.kookmin.ac.kr/",
  "logo": "assets/kookmin-logo-en.png",
  "logoOnLight": "assets/kookmin-logo-en-on-light.png"
 },
 "review": {
  "paletteSwitcher": false,
  "defaultPalette": "magenta"
 },
 "navigation": [
  {
   "label": "Research",
   "href": "research.html"
  },
  {
   "label": "Publications",
   "href": "publications.html"
  },
  {
   "label": "People",
   "href": "index.html#professor"
  },
  {
   "label": "Contact",
   "href": "index.html#contact"
  }
 ],
 "carousel": {
  "intervalMs": 6500,
  "autoplay": true
 },
 "slides": [
  {
   "eyebrow": "FREQUENCY SYNTHESIS",
   "topic": "Frequency synthesis",
   "accent": "orange",
   "titleLines": [
    "Carriers from",
    "a reference clock."
   ],
   "description": "We multiply signals generated at lower frequencies and synthesize carriers from a reference clock, implemented and measured on CMOS and SiGe chips.",
   "image": "assets/fig-dll-synthesizer-electronics2024.png",
   "imageAlt": "Block diagram of a synthesizer combining a 512-phase DLL, an intermediate-frequency generator and an RF frequency multiplier",
   "imageFit": "contain",
   "imageOrigin": "lab",
   "figureLabel": "ELECTRONICS 2024",
   "noteLabel": "DLL + FREQUENCY MULTIPLIER",
   "noteLines": [
    "No VCO on the chip; an external reference clock is still required."
   ],
   "imageCredit": "K.-H. Nam, N.-P. Hong, J.-S. Park, “A Cascade Fractional-N Synthesizer Topology of DLL and Frequency Multiplier for 5G+ Communication Systems,” Electronics, 13, 4685, 2024, Fig. 2.",
   "imageSource": "https://doi.org/10.3390/electronics13234685",
   "imageLicense": "CC BY 4.0",
   "imageLicenseUrl": "https://creativecommons.org/licenses/by/4.0/",
   "linkLabel": "Frequency synthesis",
   "link": "research.html#synthesis"
  },
  {
   "eyebrow": "CAPACITOR LADDER",
   "topic": "Capacitor ladder",
   "accent": "magenta",
   "titleLines": [
    "Capacitor ratios",
    "set the signal."
   ],
   "description": "Capacitor-ladder circuits set the amplitude and the phase of RF signals. Both were implemented as chips and measured.",
   "image": "assets/fig-ladder-amplitude-jees2024.png",
   "imageAlt": "Capacitor ladder with complementary switches that sets the output amplitude",
   "imageFit": "contain",
   "imageOrigin": "lab",
   "figureLabel": "JEES 2024",
   "noteLabel": "EVM 1.33 % · 26 GHz 256-QAM",
   "noteLines": [
    "Static measurement of SPI-set points, using two chips with external I/Q coupling."
   ],
   "imageCredit": "K.-H. Nam, N.-P. Hong, J.-S. Park, “A Novel Direct-Binary Amplitude Modulator Integrated with a 16-Times Frequency Multiplier for 5G+ Applications,” JEES, 24(6), 556–564, 2024, Fig. 6.",
   "imageSource": "https://doi.org/10.26866/jees.2024.6.r.261",
   "imageLicense": "CC BY-NC 4.0",
   "imageLicenseUrl": "https://creativecommons.org/licenses/by-nc/4.0/",
   "linkLabel": "Capacitor ladder",
   "link": "research.html#ladder"
  },
  {
   "eyebrow": "PHASED-ARRAY TRANSMITTER",
   "topic": "Phased-array transmitter",
   "accent": "green",
   "titleLines": [
    "Eight channels,",
    "one CMOS chip."
   ],
   "description": "An 8-channel, 10 GHz transmitter connects a DLL, a frequency multiplier and per-channel ladder phase shifters on a 65 nm CMOS chip.",
   "image": "assets/lab-cmos-die.png",
   "imageAlt": "Die micrograph of the JEES 2025 eight-channel phased-array transmitter",
   "imageFit": "contain",
   "imageOrigin": "lab",
   "figureLabel": "JEES 2025 PHASED-ARRAY TRANSMITTER",
   "noteLabel": "PHASE STEP 5.625°",
   "noteLines": [
    "Static phase measurement with states set over SPI."
   ],
   "imageCredit": "K.-H. Nam, N.-P. Hong, J. Park, “An 8-Channel Phased-Array CMOS Transmitter for 5G+ Application,” JEES, 25(4), 351–360, 2025, Fig. 15.",
   "imageSource": "https://doi.org/10.26866/jees.2025.4.r.306",
   "imageLicense": "CC BY-NC 4.0",
   "imageLicenseUrl": "https://creativecommons.org/licenses/by-nc/4.0/",
   "linkLabel": "See the measurements",
   "link": "research.html#ladder"
  },
  {
   "eyebrow": "DESIGN TO MEASUREMENT",
   "topic": "Chip measurement",
   "accent": "teal",
   "titleLines": [
    "From layout",
    "to measurement."
   ],
   "description": "Chips are mounted on test boards, configured over SPI and evaluated with signal generators, spectrum analyzers and network analyzers.",
   "image": "assets/fig-measurement-setup-jees2025.png",
   "imageAlt": "Measurement setup: the transmitter chip on a PCB connected to a network analyzer, a spectrum analyzer, a power supply and a laptop over SPI",
   "imageFit": "contain",
   "imageOrigin": "lab",
   "figureLabel": "MEASUREMENT SETUP",
   "noteLabel": "CHIP-ON-BOARD · SPI",
   "noteLines": [
    "RF measurement setup of the 8-channel transmitter."
   ],
   "imageCredit": "K.-H. Nam, N.-P. Hong, J. Park, “An 8-Channel Phased-Array CMOS Transmitter for 5G+ Application,” JEES, 25(4), 351–360, 2025, Fig. 16.",
   "imageSource": "https://doi.org/10.26866/jees.2025.4.r.306",
   "imageLicense": "CC BY-NC 4.0",
   "imageLicenseUrl": "https://creativecommons.org/licenses/by-nc/4.0/",
   "linkLabel": "Research infrastructure",
   "link": "research.html#infrastructure"
  }
 ],
 "professor": {
  "name": "Jun-Seok Park",
  "title": "Professor",
  "affiliation": "School of Electrical Engineering, Kookmin University",
  "image": "assets/professor-reference.png",
  "imageAlt": "Professor Jun-Seok Park",
  "crop": {
   "x": 14,
   "y": 43,
   "width": 96,
   "height": 118,
   "sourceWidth": 384
  },
  "careers": [
   "Ph.D. in Electronic Engineering, Kookmin University",
   "Postdoctoral Research, University of California, Los Angeles (UCLA)",
   "Professor, School of Electrical Engineering, Kookmin University",
   "Director, Next-Generation Communications Convergence and Open Sharing System (COSS) Program"
  ],
  "research": [
   "EBG control for improved antenna-array isolation (2020, Microwave Theory and Techniques)",
   "Frequency synthesizers and frequency multipliers for 5G/6G applications",
   "Eight-channel phased-array CMOS transmitter incorporating low-power passive phase modulators",
   "National R&D Planning Expert, National Research Foundation of Korea (2015–2016)"
  ]
 },
 "about": {
  "eyebrow": "QUANTUM-CONTROL RF LABORATORY",
  "titleLines": [
   "RF circuits",
   "for quantum control."
  ],
  "paragraphs": [
   "Professor Jun-Seok Park's research group at the UCT Laboratory, Kookmin University, has studied frequency multiplication and synthesis circuits and capacitor-ladder modulation circuits.",
   "Circuits that generate the carrier and circuits that set the amplitude and phase of a signal have each been fabricated as chips, measured and published.",
   "Building on this experience in chip design, fabrication and RF measurement, we are setting out the verification tasks for cryogenic waveform-generation structures used to control quantum systems."
  ],
  "areas": [
   {
    "title": "Frequency synthesis",
    "topic": "orange",
    "description": "Multiplying signals made at lower frequencies, and deriving the carrier from a reference clock.",
    "icon": "waves",
    "link": "research.html#synthesis",
    "meta": "IEEE TMTT 2021, 2023, 2025 · Electronics 2024"
   },
   {
    "title": "Capacitor ladder",
    "topic": "magenta",
    "description": "Setting RF amplitude and phase with capacitor ratios and complementary switches.",
    "icon": "circuit",
    "link": "research.html#ladder",
    "meta": "JEES 2024, 2025"
   },
   {
    "title": "Modulation-circuit patents",
    "topic": "purple",
    "description": "Registered patents for capacitor-and-switch modulation circuits that underlie the AWG.",
    "icon": "document",
    "link": "research.html#patents",
    "meta": "KR 10-2847135 · KR 10-2694840"
   },
   {
    "title": "Toward quantum control",
    "topic": "green",
    "description": "Open problems in cryogenic control electronics, drawn from six published control chips we reviewed.",
    "icon": "research",
    "link": "research.html#quantum",
    "meta": "Six cryogenic control chips reviewed"
   }
  ]
 },
 "home": {
  "latestCount": 3
 },
 "pages": {
  "research": {
   "eyebrow": "RESEARCH",
   "title": "RF circuits for quantum control.",
   "lede": "Frequency multiplication and synthesis circuits and capacitor-ladder modulation circuits, each fabricated as chips, measured and published, and the open problems in cryogenic control electronics they point to. Figures are shown with their measurement conditions and sources."
  },
  "publications": {
   "eyebrow": "PUBLICATIONS & PATENTS",
   "title": "Published work and patents.",
   "lede": "Journal papers in order of year, with DOI links, registered patents on record and patent application history."
  }
 },
 "themes": [
  {
   "id": "synthesis",
   "topic": "orange",
   "eyebrow": "01 / FREQUENCY SYNTHESIS",
   "title": "Carrier generation circuits",
   "intro": [
    "Oscillating directly at millimeter-wave frequencies raises phase-noise and power problems. We study multiplying a signal generated at a lower frequency instead.",
    "A PFM-based PLL synthesizer and a DLL-based synthesizer with no VCO on the chip have each been published. The DLL-based circuits still need an external reference clock, and their output jitter should be read together with the conditions of that reference."
   ],
   "figures": [
    {
     "image": "assets/fig-dll-synthesizer-electronics2024.png",
     "alt": "Block diagram of a synthesizer combining a 512-phase DLL, an intermediate-frequency generator and an RF frequency multiplier",
     "caption": "DLL, intermediate-frequency generator and frequency multiplier",
     "credit": "K.-H. Nam, N.-P. Hong, J.-S. Park, Electronics, 13, 4685, 2024, Fig. 2.",
     "doi": "10.3390/electronics13234685",
     "license": "CC BY 4.0"
    }
   ],
   "timeline": [
    {
     "when": "2021 · IEEE TMTT",
     "what": "A frequency multiplier that raises the input frequency 16 times to produce 16–28 GHz.",
     "doi": "10.1109/TMTT.2021.3103203"
    },
    {
     "when": "2023 · IEEE TMTT",
     "what": "A synthesizer that places an intermediate-frequency oscillator and a programmable multiplier inside the PLL to produce 3.2–5.6 GHz.",
     "doi": "10.1109/TMTT.2022.3223078"
    },
    {
     "when": "2024 · Electronics",
     "what": "A synthesizer with no VCO on the chip that uses a DLL and a multiplier to produce about 1.88–9.96 GHz.",
     "doi": "10.3390/electronics13234685"
    },
    {
     "when": "2025 · IEEE TMTT",
     "what": "An LO generator with no VCO on the chip that produces a 1.25–5 GHz carrier from an external reference clock.",
     "doi": "10.1109/TMTT.2025.3568403"
    }
   ],
   "metrics": [
    {
     "value": "32 fs",
     "label": "RMS jitter · TMTT 2025",
     "condition": "5 GHz output, Keysight E8257D reference clock, DLL bandwidth 100 Hz, integrated from 1 kHz to 100 MHz."
    },
    {
     "value": "107.6 fs",
     "label": "RMS jitter · Electronics 2024",
     "condition": "SiT9501 MEMS reference oscillator, average of five chips, 1 kHz–100 MHz integration, DLL 3-dB loop bandwidth 100 Hz. Includes the reference oscillator's 98.0 fs over the same range."
    },
    {
     "value": "16–28 GHz",
     "label": "Output · TMTT 2021",
     "condition": "Input 1–1.75 GHz, 16-times multiplication, chip measurement."
    },
    {
     "value": "6 mW",
     "label": "Core power · TMTT 2021",
     "condition": "Measured average. The automatic amplitude-control loop and the test driver amplifier are reported separately."
    }
   ]
  },
  {
   "id": "ladder",
   "topic": "magenta",
   "eyebrow": "02 / CAPACITOR LADDER",
   "title": "Amplitude and phase from capacitor ratios",
   "intro": [
    "In six-port direct modulation, the nonlinear relation between reflection coefficient and load impedance, and the interaction between ports, make uniform high-order constellations hard to keep at millimeter-wave frequencies. The amplitude-modulator paper proposed a ladder of capacitors and switches that sets the RF amplitude directly.",
    "The ladder's complementary switches choose which input each capacitor passes to the output, so the denominator of the ideal transfer function stays constant for every digital state. The phase-control paper sums the ladder weights of the I and Q paths to set the output phase."
   ],
   "figures": [
    {
     "image": "assets/fig-ladder-amplitude-jees2024.png",
     "alt": "Capacitor ladder with complementary switches that sets the output amplitude",
     "caption": "Complementary switches and capacitor ladder for amplitude modulation",
     "credit": "K.-H. Nam, N.-P. Hong, J.-S. Park, JEES, 24(6), 556–564, 2024, Fig. 6.",
     "doi": "10.26866/jees.2024.6.r.261",
     "license": "CC BY-NC 4.0"
    },
    {
     "image": "assets/fig-ladder-phase-jees2025.png",
     "alt": "I and Q ladders whose weights are summed to set the output phase",
     "caption": "I/Q ladders that set the phase",
     "credit": "K.-H. Nam, N.-P. Hong, J. Park, JEES, 25(4), 351–360, 2025, Fig. 12.",
     "doi": "10.26866/jees.2025.4.r.306",
     "license": "CC BY-NC 4.0"
    }
   ],
   "metrics": [
    {
     "value": "1.33 %",
     "label": "EVM · JEES 2024",
     "condition": "26 GHz, 256-QAM, input 1.625 GHz. Two chips with an external I/Q coupler and balun; static measurement of points set over SPI."
    },
    {
     "value": "5.625°",
     "label": "Phase step · JEES 2025",
     "condition": "10 GHz, 8-channel phased-array transmitter with a 156.25 MHz reference clock; static measurement of states set over SPI."
    },
    {
     "value": "7 mW",
     "label": "Power · JEES 2024",
     "condition": "Multiplier, automatic amplitude control, modulator and central reference current. Excludes the 9 mW driver amplifier for 50 Ω testing."
    },
    {
     "value": "27.8 mW",
     "label": "Chip power · JEES 2025",
     "condition": "Transmitter power including the DLL, multiplier, channel driver amplifiers, reference current and amplitude-control loop."
    }
   ],
   "lineage": "The harmonic-generator topology and design procedure of the amplitude-modulator chip build on the earlier multiplier and synthesizer papers (IEEE TMTT 2021, IEEE TMTT 2023, JEES 2022)."
  },
  {
   "id": "patents",
   "topic": "purple",
   "eyebrow": "03 / PATENTS",
   "title": "Modulation-circuit patents underlying the AWG",
   "intro": [
    "Registrations of a signal modulation device and a phase shifter by the Kookmin University Industry-Academic Cooperation Foundation are on record. The circuit descriptions below come from the specifications as filed; they do not describe the scope of the registered claims."
   ],
   "patents": [
    {
     "eyebrow": "KR 10-2847135 · REGISTERED 2025-08-12",
     "title": "Signal modulation device and I-Q signal modulation device using the same",
     "points": [
      "Capacitor groups above and below the output node, with complementarily controlled switches, set the ratio of output to input signal.",
      "Describes a structure that adjusts the I and Q channel amplitudes separately."
     ],
     "holder": "Kookmin University Industry-Academic Cooperation Foundation"
    },
    {
     "eyebrow": "KR 10-2694840 · REGISTERED 2024-08-08",
     "title": "Phase shifter",
     "points": [
      "Changes the phase of the input by adjusting the amplitudes of orthogonal I and Q signals.",
      "Describes choosing, among possible I/Q combinations, the one closest to the target phase at a constant output amplitude."
     ],
     "holder": "Kookmin University Industry-Academic Cooperation Foundation"
    }
   ]
  },
  {
   "id": "quantum",
   "topic": "green",
   "eyebrow": "04 / TOWARD QUANTUM CONTROL",
   "title": "Open problems in cryogenic control electronics",
   "intro": [
    "Building on our chip design, fabrication and RF measurement, we are setting out the verification tasks for cryogenic waveform-generation structures.",
    "The points below summarize six published cryogenic control chips that we reviewed. They describe that set of six, not the field as a whole."
   ],
   "findings": [
    "The six chips integrate different sets of functions, and five of them receive GHz-band LO or clock signals from off chip.",
    "One reviewed design integrates a synthesizer. It generates shaped pulses without a waveform memory, and its synthesizer power and phase noise are not reported together.",
    "The reviewed direct-RF DAC approach uses no mixer or LO, but it receives a high-speed clock at half the sampling rate from off chip.",
    "Power per channel or per qubit is counted with different scopes and conditions across the six, so the numbers are hard to compare, and none is confirmed to include synthesizer power.",
    "None of the six reports a measured phase noise or integrated jitter for the carrier."
   ]
  }
 ],
 "publications": [
  {
   "year": "2025",
   "authors": "K.-H. Nam, N.-P. Hong, J.-S. Park",
   "title": "An Oscillator-Free LO Generator for Beyond 5G Wireless Communication Systems",
   "venue": "IEEE TMTT, 73(10), 7391–7402",
   "doi": "10.1109/TMTT.2025.3568403"
  },
  {
   "year": "2025",
   "authors": "K.-H. Nam, N.-P. Hong, J. Park",
   "title": "An 8-Channel Phased-Array CMOS Transmitter for 5G+ Application",
   "venue": "JEES, 25(4), 351–360",
   "doi": "10.26866/jees.2025.4.r.306"
  },
  {
   "year": "2024",
   "authors": "K.-H. Nam, N.-P. Hong, J.-S. Park",
   "title": "A Cascade Fractional-N Synthesizer Topology of DLL and Frequency Multiplier for 5G+ Communication Systems",
   "venue": "Electronics, 13, Article 4685",
   "doi": "10.3390/electronics13234685"
  },
  {
   "year": "2024",
   "authors": "K.-H. Nam, N.-P. Hong, J.-S. Park",
   "title": "A Novel Direct-Binary Amplitude Modulator Integrated with a 16-Times Frequency Multiplier for 5G+ Applications",
   "venue": "JEES, 24(6), 556–564",
   "doi": "10.26866/jees.2024.6.r.261"
  },
  {
   "year": "2023",
   "authors": "N.-P. Hong, K.-H. Nam, J.-S. Park",
   "title": "A Fractional-N Synthesizer Based on Programmable Frequency Multiplier for 5G+ Communication System",
   "venue": "IEEE TMTT, 71(4), 1518–1535",
   "doi": "10.1109/TMTT.2022.3223078"
  },
  {
   "year": "2022",
   "authors": "SungWoo Im, K.-H. Nam, Junseok Park",
   "title": "A Single-Stage 12-Times Frequency Multiplier for a 5G Frequency Synthesizer",
   "venue": "JEES, 22(3), 302–308",
   "doi": "10.26866/jees.2022.3.r.91"
  },
  {
   "year": "2021",
   "authors": "K.-H. Nam, N.-P. Hong, J.-S. Park",
   "title": "A 16-Times Frequency Multiplier for 5G Synthesizer",
   "venue": "IEEE TMTT, 69(11), 4961–4976",
   "doi": "10.1109/TMTT.2021.3103203"
  },
  {
   "year": "2021",
   "authors": "C.-B. Moon, J.-W. Jeong, K.-H. Nam, Z. Xu, J.-S. Park",
   "title": "Design and Analysis of a Thinned Phased Array Antenna for 5G Wireless Applications",
   "venue": "International Journal of Antennas and Propagation, 2021, Article 3039183",
   "doi": "10.1155/2021/3039183"
  },
  {
   "year": "2020",
   "authors": "J.-W. Jeong, J.-S. Park",
   "title": "A Microcontroller Unit-Based Electromagnetic Bandgap Control Scheme: Application for Enhancing Isolation in an Antenna Array and the EMI Scanner System Speed Thereof",
   "venue": "IEEE TMTT, 68(11), 4536–4553",
   "doi": "10.1109/TMTT.2020.3015230"
  },
  {
   "year": "2018",
   "authors": "J.-H. Lee, W.-J. Jung, J.-S. Park",
   "title": "An Injection-Locked Based Voltage Boost-up Rectifier for Wireless RF Power Harvesting Applications",
   "venue": "Journal of Electrical Engineering & Technology, 13(6), 2441–2446",
   "doi": "10.5370/JEET.2018.13.6.2441"
  },
  {
   "year": "2018",
   "authors": "W.-J. Jung, N.-P. Hong, J.-E. Jang, J.-S. Kim, J.-S. Park",
   "title": "An Q-factor calibration method for compensation of the I/Q signal imbalances in 5–6 GHz beamforming receiver",
   "venue": "Microwave and Optical Technology Letters, 60, 2272–2276",
   "doi": "10.1002/mop.31329"
  }
 ],
 "registeredPatents": [
  {
   "date": "2025-09-02",
   "title": "Frequency Multiplier",
   "number": "US 12,407,298 B2"
  },
  {
   "date": "2025-08-12",
   "title": "Signal modulation device and I-Q signal modulation device using the same",
   "number": "KR 10-2847135"
  },
  {
   "date": "2024-08-08",
   "title": "Phase shifter",
   "number": "KR 10-2694840"
  },
  {
   "date": "2024-03-26",
   "title": "EMI scanning device",
   "number": "KR 10-2652651"
  },
  {
   "date": "2024-02-29",
   "title": "EMI scanning probe",
   "number": "KR 10-2644328"
  },
  {
   "date": "2023-07-25",
   "title": "Frequency multiplier",
   "number": "KR 10-2561134"
  },
  {
   "date": "2023-07-25",
   "title": "Frequency multiplier",
   "number": "KR 10-2561119"
  }
 ],
 "patentApplications": [
  {
   "date": "2024-12-19",
   "title": "10 GHz phased-array transmitter and phase-synchronized signal generation system",
   "number": "KR 10-2024-0191790"
  },
  {
   "date": "2024-12-19",
   "title": "Frequency multiplier",
   "number": "KR 10-2024-0191789"
  },
  {
   "date": "2024-01-17",
   "title": "Frequency Multiplier (European phase entry request, date signed)",
   "number": "EP 22825240.9"
  },
  {
   "date": "2023-11-29",
   "title": "Frequency synthesis apparatus and method",
   "number": "KR 10-2023-0169818"
  },
  {
   "date": "2023-11-29",
   "title": "Frequency multiplication apparatus and method",
   "number": "KR 10-2023-0169817"
  },
  {
   "date": "2022-06-13",
   "title": "Frequency Multiplier (international application)",
   "number": "PCT/KR2022/008268"
  }
 ],
 "patentApplicationsNote": "Application history from laboratory records. It does not indicate registration or current validity, and filings of the same invention in different countries are listed separately.",
 "registeredPatentsNote": "Registration records confirmed from documents, held by the Kookmin University Industry-Academic Cooperation Foundation. This list does not certify that each right is currently maintained.",
 "infrastructure": {
  "eyebrow": "RESEARCH INFRASTRUCTURE",
  "topic": "teal",
  "titleLines": [
   "From circuit design",
   "to RF measurement."
  ],
  "summary": "Our record runs from circuit design to chip fabrication, PCB evaluation and RF measurement. The equipment below is usage recorded in our papers, not a list of equipment the laboratory currently owns.",
  "rows": [
   {
    "item": "CMOS circuits for frequency multiplication, DLL synthesis and ladder modulation",
    "detail": "65 nm CMOS chips fabricated and measured in published papers"
   },
   {
    "item": "PFM-based PLL synthesizer",
    "detail": "130 nm SiGe implementation in a published paper"
   },
   {
    "item": "Test PCB and SPI configuration",
    "detail": "Chip-on-board mounting and digital configuration for circuit evaluation"
   },
   {
    "item": "Signal generation and spectrum measurement",
    "detail": "Recorded use: Keysight N5183B, E4448A"
   },
   {
    "item": "Reference clock and network analysis",
    "detail": "Recorded use: SiT9501, Keysight E8361A"
   },
   {
    "item": "EDA support",
    "detail": "Design tools supported by IDEC"
   },
   {
    "item": "Temperature chamber",
    "detail": "Recorded use of DYTH-252 (MOTL 2018). Not cryogenic equipment."
   }
  ],
  "figure": {
   "image": "assets/fig-measurement-setup-jees2025.png",
   "alt": "Measurement setup: the transmitter chip on a PCB connected to a network analyzer, a spectrum analyzer, a power supply and a laptop over SPI",
   "caption": "PCB and RF measurement setup",
   "credit": "K.-H. Nam, N.-P. Hong, J. Park, JEES, 25(4), 351–360, 2025, Fig. 16.",
   "doi": "10.26866/jees.2025.4.r.306",
   "license": "CC BY-NC 4.0"
  }
 },
 "members": [],
 "join": null,
 "contact": {
  "eyebrow": "CONTACT",
  "titleLines": [
   "Visit the",
   "laboratory."
  ],
  "address": [
   "Kookmin University",
   "77 Jeongneung-ro, Seongbuk-gu",
   "Seoul 02707, Republic of Korea"
  ],
  "office": "Room 606, Mirae Hall",
  "email": "",
  "phone": "",
  "mapUrl": "https://www.google.com/maps/search/?api=1&query=Kookmin+University"
 }
};
