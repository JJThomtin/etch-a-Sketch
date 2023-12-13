const canvas = document.getElementById("canvas");
const clear_btn = document.getElementById("clear-btn");
function makeRows(rows, cols) {
    canvas.style.setProperty('--grid-rows', rows);
    canvas.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      canvas.appendChild(cell).className = "grid-item";
    };
};

clear_btn.onclick = function() {
    document.querySelectorAll(".grid-item").forEach((p) => {
        p.style.backgroundColor = "white"
    })
}


window.onload = () => {
    makeRows(100, 100)
}

  