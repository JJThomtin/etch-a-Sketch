const MODE = {
    "Draw": 1,
    "Eraser": 2,
    "Lighten": 3,
    "Darken": 4,
    "Colour_Randomizer": 5
}
const CANVAS = document.getElementById("canvas");
const PEN_BTN = document.getElementById("pen-btn");
const CLEAR_BTN = document.getElementById("clear-btn");
const ERASER_BTN = document.getElementById("eraser-btn");
const DARKEN_BTN = document.getElementById("darken-btn");
const LIGHTEN_BTN = document.getElementById("lighten-btn");
const COLOUR_WHEEL = document.getElementById("colour-wheel");
const COLOUR_RANDOMIZER_BTN = document.getElementById("randomizer-btn");

let currentMode = MODE["Draw"];
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
};

COLOUR_WHEEL.addEventListener("input", function(){ 
    document.documentElement.style.setProperty('--pen-colour', COLOUR_WHEEL.value);
})

CLEAR_BTN.onclick = function() {
    document.querySelectorAll(".grid-item").forEach((p) => {
        p.style.backgroundColor = "white";
    })
}

LIGHTEN_BTN.onclick = function() {
    currentMode = MODE["Lighten"];
}

COLOUR_RANDOMIZER_BTN.onclick = function() {
    currentMode = MODE["Colour_Randomizer"];
}

function randomizeColour() {
    document.documentElement.style.setProperty(
        "--pen-colour",`${getRandomHexColour()}`)
    COLOUR_WHEEL.value = getComputedStyle(document.documentElement).getPropertyValue("--pen-colour")
}

function draw(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    switch (currentMode) {
        case 1:
            document.documentElement.style.setProperty('--pen-colour', COLOUR_WHEEL.value);
            break;
        case 2:
            document.documentElement.style.setProperty('--pen-colour', "#FFFFFF");
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            randomizeColour();
            break;
    }
    e.target.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--pen-colour")
} 

PEN_BTN.onclick = function() {
    currentMode = MODE["Draw"];
}

ERASER_BTN.onclick = function() {
    currentMode = MODE["Eraser"];
}

const numberToHex = (number) => {
    const hex = number.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const getRandomHexColour = () => {
    return "#" + numberToHex(getRandomInt(256)) + numberToHex(getRandomInt(256)) + numberToHex(getRandomInt(256));
}
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}
window.onload = () => {
    makeRows(16, 16)
}


  