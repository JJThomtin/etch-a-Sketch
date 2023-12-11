const canvas = document.getElementById("canvas");

function makeRows(rows, cols) {
    canvas.style.setProperty('--grid-rows', rows);
    canvas.style.setProperty('--grid-cols', cols);
    canvas.style.setProperty('--gridsize', 700/cols)
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      canvas.appendChild(cell).className = "grid-item";
    };
  };
  
  makeRows(100, 100);
  