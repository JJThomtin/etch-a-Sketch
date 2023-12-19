const CANVAS = document.getElementById("canvas");
const CLEAR_BTN = document.getElementById("clear-btn");
const ERASER_BTN = document.getElementById("eraser-btn");
const COLOUR_WHEEL = document.getElementById("colour-wheel");
const COLOUR_RANDOMIZER_BTN = document.getElementById("randomizer-btn");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeRows(rows, cols) {
    CANVAS.style.setProperty('--grid-rows', rows);
    CANVAS.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      cell.addEventListener('mouseover', draw)
      cell.addEventListener('mousedown', draw)
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

COLOUR_RANDOMIZER_BTN.onclick = function() {
    randomizeColour();
}

function randomizeColour() {
    document.documentElement.style.setProperty(
        "--pen-colour",`${getRandomHexColour()}`)
    COLOUR_WHEEL.value = getComputedStyle(document.documentElement).getPropertyValue("--pen-colour")
}

function draw(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--pen-colour")
} 
ERASER_BTN.onclick = function() {
    document.documentElement.style.setProperty('--pen-colour', "#FFFFFF");
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
    makeRows(10, 10)
}

  