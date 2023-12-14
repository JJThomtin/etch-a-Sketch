const CANVAS = document.getElementById("canvas");
const CLEAR_BTN = document.getElementById("clear-btn");
const COLOUR_WHEEL = document.getElementById("colour-wheel");
function makeRows(rows, cols) {
    CANVAS.style.setProperty('--grid-rows', rows);
    CANVAS.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      CANVAS.appendChild(cell).className = "grid-item";
    };
};

COLOUR_WHEEL.addEventListener("input", function(){ 
    document.documentElement.style.setProperty('--pen-colour', COLOUR_WHEEL.value);
})

CLEAR_BTN.onclick = function() {
    document.querySelectorAll(".grid-item").forEach((p) => {
        p.style.backgroundColor = "white"
    })
}


window.onload = () => {
    makeRows(10, 10)
}

  