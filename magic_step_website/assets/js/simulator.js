/*
 * MAGIC STEP — Kinetic Energy Harvesting & Telemetry Lab Simulator
 * Software simulation of piezoelectric transduction, full-wave diode bridge,
 * capacitive smoothing buffer, and ESP32 ADC sensing algorithm.
 */

(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);

  const canvas = $("#oscilloscope");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const massSlider = $("#sim-mass-slider");
  const massNumber = $("#sim-mass-number");
  const cadenceSlider = $("#sim-cadence-slider");
  const cadenceNumber = $("#sim-cadence-number");
  const stepBtn = $("#sim-step-btn");
  const autoBtn = $("#sim-auto-btn");
  const resetBtn = $("#sim-reset-btn");

  const valSteps = $("#sim-val-steps");
  const valVpeak = $("#sim-val-vpeak");
  const valVcap = $("#sim-val-vcap");
  const valVbat = $("#sim-val-vbat");
  const lcdRow0 = $("#lcd-row-0");
  const lcdRow1 = $("#lcd-row-1");

  // Simulation State
  const state = {
    massKg: 70,           // 40 kg - 100 kg
    cadenceSpm: 75,       // 30 - 150 steps/min
    stepCount: 0,
    peakVoltage: 0.0,
    capVoltage: 0.0,      // Voltage on 10 uF cap
    batteryVoltage: 3.74, // Li-ion baseline
    isAutoStepping: false,
    autoTimer: null,
    pulseActiveTimer: null,
    pulseActive: false,
    history: []           // Rolling wave data for oscilloscope
  };

  const WAVE_POINTS = 180;
  for (let i = 0; i < WAVE_POINTS; i++) {
    state.history.push({ raw: 0, rect: 0, cap: 0 });
  }

  // Bind input sliders and numbers together
  function bindPair(slider, number, key, min, max) {
    if (!slider || !number) return;
    slider.addEventListener("input", () => {
      state[key] = parseFloat(slider.value);
      number.value = slider.value;
      if (state.isAutoStepping) restartAuto();
    });
    number.addEventListener("input", () => {
      const v = parseFloat(number.value);
      if (Number.isNaN(v)) return;
      state[key] = Math.min(max, Math.max(min, v));
      slider.value = String(state[key]);
      if (state.isAutoStepping) restartAuto();
    });
  }

  bindPair(massSlider, massNumber, "massKg", 40, 100);
  bindPair(cadenceSlider, cadenceNumber, "cadenceSpm", 30, 150);

  // Trigger a physical step
  function triggerStep() {
    state.stepCount++;
    state.pulseActive = true;

    // Direct piezoelectric formula scaling:
    // Force F = m * g * dynamic_impact_factor (~1.8)
    const forceN = state.massKg * 9.81 * 1.6;
    // Base nominal voltage ~24V for 70kg; scales linearly with force
    const nominalV = (forceN / (70 * 9.81 * 1.6)) * 26.5;
    state.peakVoltage = nominalV + (Math.random() * 2.0 - 1.0);

    // Charge accumulates on capacitor: delta_V = Q / C
    // With leakage and internal resistance
    const chargeIncrement = (state.peakVoltage * 0.12) / (1 + state.capVoltage * 0.15);
    state.capVoltage = Math.min(18.5, state.capVoltage + chargeIncrement);

    // Very tiny trickle into battery (Li-ion 1S2P pack is huge, 3.7V - 4.2V)
    state.batteryVoltage = Math.min(4.20, state.batteryVoltage + 0.0003);

    // Inject transient pulse wave points into oscilloscope queue
    injectPulseWave(state.peakVoltage);

    // Clear pulse active indicator after 180ms (debouncing)
    clearTimeout(state.pulseActiveTimer);
    state.pulseActiveTimer = setTimeout(() => {
      state.pulseActive = false;
      updateUI();
    }, 220);

    updateUI();
  }

  // Inject a realistic damped sinusoidal AC transient into history
  function injectPulseWave(vPk) {
    const pulseLen = 28;
    for (let i = 0; i < pulseLen; i++) {
      const t = i / pulseLen;
      // Damped sine wave: fast attack, ringing, then decay
      const envelope = Math.exp(-t * 4.5);
      const rawAc = vPk * Math.sin(t * Math.PI * 4.0) * envelope;
      const rectDc = Math.abs(rawAc);
      state.history.shift();
      state.history.push({ raw: rawAc, rect: rectDc, cap: state.capVoltage });
    }
  }

  // Decay capacitor voltage slightly over time if idle
  function tickDecay() {
    if (!state.pulseActive && state.capVoltage > 0.05) {
      state.capVoltage *= 0.985;
      if (state.capVoltage < 0.02) state.capVoltage = 0;
    }
    // Push idle baseline point into oscilloscope
    state.history.shift();
    state.history.push({ raw: 0, rect: 0, cap: state.capVoltage });
  }

  function updateUI() {
    if (valSteps) valSteps.textContent = String(state.stepCount);
    if (valVpeak) valVpeak.textContent = `${state.peakVoltage.toFixed(1)} V`;
    if (valVcap) valVcap.textContent = `${state.capVoltage.toFixed(2)} V`;
    if (valVbat) valVbat.textContent = `${state.batteryVoltage.toFixed(2)} V`;

    // Update Virtual 16x2 LCD
    if (lcdRow0) {
      const stepStr = String(state.stepCount).padStart(4, "0");
      const pulseMark = state.pulseActive ? "[*]" : "   ";
      lcdRow0.textContent = `STEPS: ${stepStr}  ${pulseMark}`;
    }
    if (lcdRow1) {
      const vStr = state.batteryVoltage.toFixed(2);
      const chrgState = state.capVoltage > 4.5 ? "CHRG" : "IDLE";
      lcdRow1.textContent = `BAT: ${vStr}V  ${chrgState}`;
    }
  }

  // Auto-step continuous walk toggle
  function restartAuto() {
    clearInterval(state.autoTimer);
    const intervalMs = (60 / state.cadenceSpm) * 1000;
    state.autoTimer = setInterval(() => {
      triggerStep();
    }, intervalMs);
  }

  function toggleAuto() {
    state.isAutoStepping = !state.isAutoStepping;
    if (state.isAutoStepping) {
      if (autoBtn) {
        autoBtn.classList.add("active");
        autoBtn.textContent = "STOP CONTINUOUS WALK";
      }
      restartAuto();
    } else {
      if (autoBtn) {
        autoBtn.classList.remove("active");
        autoBtn.textContent = "START CONTINUOUS WALK";
      }
      clearInterval(state.autoTimer);
    }
  }

  // Reset simulator
  function resetLab() {
    if (state.isAutoStepping) toggleAuto();
    state.stepCount = 0;
    state.peakVoltage = 0.0;
    state.capVoltage = 0.0;
    state.batteryVoltage = 3.74;
    state.massKg = 70;
    state.cadenceSpm = 75;
    if (massSlider) massSlider.value = "70";
    if (massNumber) massNumber.value = "70";
    if (cadenceSlider) cadenceSlider.value = "75";
    if (cadenceNumber) cadenceNumber.value = "75";
    for (let i = 0; i < WAVE_POINTS; i++) {
      state.history[i] = { raw: 0, rect: 0, cap: 0 };
    }
    updateUI();
  }

  if (stepBtn) stepBtn.addEventListener("click", triggerStep);
  if (autoBtn) autoBtn.addEventListener("click", toggleAuto);
  if (resetBtn) resetBtn.addEventListener("click", resetLab);

  // Render Oscilloscope
  function renderOscilloscope() {
    if (!ctx || !canvas) return;
    const w = canvas.width = canvas.clientWidth * window.devicePixelRatio || 600;
    const h = canvas.height = canvas.clientHeight * window.devicePixelRatio || 220;

    // Dark screen background
    ctx.fillStyle = "#041017";
    ctx.fillRect(0, 0, w, h);

    // Oscilloscope Grid Lines (8 div horizontal, 6 div vertical)
    ctx.strokeStyle = "#0b394f";
    ctx.lineWidth = 1;
    const divX = w / 10;
    const divY = h / 6;
    for (let x = 0; x <= w; x += divX) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y <= h; y += divY) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Center baseline zero voltage (at h / 2)
    const midY = h / 2;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, midY); ctx.lineTo(w, midY);
    ctx.stroke();

    // Scale factor: ±40 V maps to canvas height
    const scaleY = (h * 0.42) / 38;

    // 1. Draw Raw AC Trace (Yellow)
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const len = state.history.length;
    for (let i = 0; i < len; i++) {
      const px = (i / (len - 1)) * w;
      const py = midY - state.history[i].raw * scaleY;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 2. Draw Rectified & Filtered Capacitor DC Trace (Cyan)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < len; i++) {
      const px = (i / (len - 1)) * w;
      const py = midY - state.history[i].cap * scaleY;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Trace Legends
    ctx.font = "12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#facc15";
    ctx.fillText("CH1: RAW PIEZO AC (±35V)", 12, 22);
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("CH2: BUFFER V_CAP (DC)", 220, 22);
  }

  // Animation Loop (60 fps)
  let lastDecayTime = 0;
  function animLoop(now) {
    if (now - lastDecayTime > 50) {
      lastDecayTime = now;
      tickDecay();
    }
    renderOscilloscope();
    requestAnimationFrame(animLoop);
  }

  updateUI();
  requestAnimationFrame(animLoop);
})();
