const MODE = {
    "Draw": 1,
    "Eraser": 2,
    "Tint": 3,
    "Shade": 4,
    "Colour_Randomizer": 5
}
const CANVAS = document.getElementById("canvas");
const PEN_BTN = document.getElementById("pen-btn");
const CLEAR_BTN = document.getElementById("clear-btn");
const ERASER_BTN = document.getElementById("eraser-btn");
const SHADE_BTN = document.getElementById("shade-btn");
const TINT_BTN = document.getElementById("tint-btn");
const COLOUR_WHEEL = document.getElementById("colour-wheel");
const SHADING_CHECKBOX = document.getElementById("shading-chk");
const SATURATION_CHECKBOX = document.getElementById("saturation-chk");
const COLOUR_RANDOMIZER_BTN = document.getElementById("randomizer-btn");
let currentMode = MODE["Draw"];
let pen_colour;

let shadingToggle = false;
let saturationToggle = false;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeRows(rows, cols) {
    CANVAS.style.setProperty('--grid-rows', rows);
    CANVAS.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      cell.addEventListener('mouseover', draw);
      cell.addEventListener('mousedown', draw);
      CANVAS.appendChild(cell).className = "grid-item";
    };
    document.querySelectorAll(".grid-item").forEach((p) => {
        p.style.backgroundColor = "rgb(255, 255, 255)";
    })
};

SHADING_CHECKBOX.addEventListener("change", function() {
    if (this.checked) {
        shadingToggle = true;
    }
    else {
        shadingToggle = false;
    }
});

SATURATION_CHECKBOX.addEventListener("change", function() {
    if (this.checked) {
        saturationToggle = true;
    }
    else {
        saturationToggle = false;
    }
});

COLOUR_WHEEL.addEventListener("input", function(){ 
        document.documentElement.style.setProperty('--pen-colour', COLOUR_WHEEL.value);
});

CLEAR_BTN.onclick = function() {
    document.querySelectorAll(".grid-item").forEach((p) => {
        p.style.backgroundColor = "rgb(255, 255, 255)";
    })
};

TINT_BTN.onclick = function() {
    currentMode = MODE["Tint"];
};

SHADE_BTN.onclick = function() {
    currentMode = MODE["Shade"];
}
COLOUR_RANDOMIZER_BTN.onclick = function() {
    currentMode = MODE["Colour_Randomizer"];
};

function randomizeColour() {
    document.documentElement.style.setProperty("--pen-colour",`${getRandomHSLColour()}`)
    if (currentMode == MODE["Draw"]) {
        COLOUR_WHEEL.value = getComputedStyle(document.documentElement).getPropertyValue("--pen-colour")
    }
};

function draw(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    switch (currentMode) {
        case 1:
            document.documentElement.style.setProperty('--pen-colour', COLOUR_WHEEL.value);
            break;
        case 2:
            document.documentElement.style.setProperty('--pen-colour', "rgb(255, 255, 255)");
            break;
        case 3:
            document.documentElement.style.setProperty("--pen-colour", toneShift(e.target.style.backgroundColor, 0.1));
            break;
        case 4:
            document.documentElement.style.setProperty("--pen-colour", toneShift(e.target.style.backgroundColor, -0.1));
            break;
        case 5:
            randomizeColour();
            break;
    }
    e.target.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--pen-colour")
};


const hoverInk = function() {
    pen_colour = getComputedStyle(document.documentElement).getPropertyValue("--pen-colour");
    if (currentMode == MODE['Draw'] || currentMode == MODE['Colour_Randomizer']) {
    }
};
PEN_BTN.onclick = function() {
    currentMode = MODE["Draw"];
};

ERASER_BTN.onclick = function() {
    currentMode = MODE["Eraser"];
};

const numberToHex = (number) => {
    const hex = number.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

const getRandomHSLColour = () => {
    let HSLvalue = getRandomInt(360);
    let saturationValue = 100 + "%";
    let lightValue = 50 + "%";
    if (saturationToggle) {
        saturationValue = getRandomInt(100) + "%";
    }
    if (lightValue) {
        lightValue = getRandomInt(100) + "%";
    }

    return `hsl(${HSLvalue}, ${saturationValue}, ${lightValue})`;
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const toneShift = (colour, toneShiftValue) => {
    let RGBvalue = colour.substr(3);
    let lightValue;
    RGBvalue = RGBvalue.replace("(", "").replace(")", "");
    RGBvalue = RGBvalue.split(", ");
    let HSLvalue = RGBToHSL(RGBvalue[0], RGBvalue[1], RGBvalue[2]);
    if (HSLvalue[2] + toneShiftValue > 1) {
        lightValue = 1;
    }
    else if (HSLvalue[2] + toneShiftValue < 0) {
        lightValue = 0;
    }
    else {
        lightValue = HSLvalue[2] + toneShiftValue;
    }
    console.log(`hsl(${Math.floor(HSLvalue[0]*360)}, ${HSLvalue[1]*100}%, ${Math.round(lightValue*100)}%)`)
    return `hsl(${Math.floor(HSLvalue[0]*360)}, ${HSLvalue[1]*100}%, ${Math.round(lightValue*100)}%)`
};

function RGBToHSL(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    const vmax = Math.max(r, g, b), vmin = Math.min(r, g, b);
    let h, s, l = (vmax + vmin) / 2;
  
    if (vmax === vmin) {
      return [0, 0, l]; // achromatic
    }
  
    const d = vmax - vmin;
    s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
    if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (vmax === g) h = (b - r) / d + 2;
    if (vmax === b) h = (r - g) / d + 4;
    h /= 6;
  
    return [h, s, l];
};

window.onload = () => {
    makeRows(16, 16)
};


  