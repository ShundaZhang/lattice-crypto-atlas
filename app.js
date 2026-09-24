"use strict";

const svgNS = "http://www.w3.org/2000/svg";

function svgElement(name, attributes) {
  const node = document.createElementNS(svgNS, name);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, String(value));
  return node;
}

function initBasisExplorer() {
  const input = document.getElementById("shear");
  const grid = document.getElementById("basis-grid");
  const vectors = document.getElementById("basis-vectors");
  if (!input || !grid || !vectors) return;

  const originX = 280;
  const originY = 175;
  const unit = 33;
  for (let y = -5; y <= 5; y++) {
    for (let x = -8; x <= 8; x++) {
      const point = svgElement("circle", {
        cx: originX + x * unit,
        cy: originY - y * unit,
        r: x === 0 && y === 0 ? 5 : 2.6,
        fill: x === 0 && y === 0 ? "#30213b" : "#879490"
      });
      grid.append(point);
    }
  }

  function render() {
    const k = Number(input.value);
    vectors.replaceChildren();
    const first = svgElement("line", {
      x1: originX, y1: originY, x2: originX + unit, y2: originY,
      stroke: "#ee7653", "stroke-width": 5, "marker-end": "url(#basis-arrow-orange)"
    });
    const second = svgElement("line", {
      x1: originX, y1: originY, x2: originX + k * unit, y2: originY - unit,
      stroke: "#417d78", "stroke-width": 5, "marker-end": "url(#basis-arrow-teal)"
    });
    const labelA = svgElement("text", { x: originX + 42, y: originY + 21, fill: "#a64124", "font-size": 15, "font-weight": 800 });
    labelA.textContent = "b₁";
    const labelB = svgElement("text", { x: Math.min(originX + k * unit + 7, 526), y: originY - unit - 8, fill: "#24645e", "font-size": 15, "font-weight": 800 });
    labelB.textContent = "b₂";
    vectors.append(first, second, labelA, labelB);
    document.getElementById("shear-value").value = String(k);
    document.getElementById("basis-readout").textContent = "b₁=(1,0) · b₂=(" + k + ",1) · |det B|=1 · Λ(B)=ℤ²";
  }
  input.addEventListener("input", render);
  render();
}

function initNoiseExplorer() {
  const input = document.getElementById("noise");
  const buttons = [...document.querySelectorAll(".bit-button")];
  const marker = document.getElementById("noise-marker");
  if (!input || buttons.length !== 2 || !marker) return;
  const q = 17;
  const centerOne = 8;
  let bit = 0;
  const modularDistance = (a, b) => Math.min(Math.abs(a - b), q - Math.abs(a - b));

  function render() {
    const noise = Number(input.value);
    const center = bit ? centerOne : 0;
    const phase = ((center + noise) % q + q) % q;
    const distanceZero = modularDistance(phase, 0);
    const distanceOne = modularDistance(phase, centerOne);
    const decoded = distanceOne < distanceZero ? 1 : 0;
    const outcome = decoded === bit ? "正确" : "解码错误";
    document.getElementById("noise-value").value = noise > 0 ? "+" + noise : String(noise);
    document.getElementById("phase-label").textContent = String(phase);
    marker.style.left = String(phase / 16 * 99) + "%";
    document.getElementById("noise-readout").textContent = "phase=(" + center + (noise < 0 ? "" : "+") + noise + ") mod 17 = " + phase + " → 解出 bit " + decoded + "，" + outcome;
    marker.setAttribute("aria-label", "phase 为 " + phase + "，" + outcome);
  }
  buttons.forEach(button => button.addEventListener("click", () => {
    bit = Number(button.dataset.bit);
    buttons.forEach(item => item.setAttribute("aria-pressed", String(Number(item.dataset.bit) === bit)));
    render();
  }));
  input.addEventListener("input", render);
  render();
}

initBasisExplorer();
initNoiseExplorer();
