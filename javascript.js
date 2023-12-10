const canvas = document.getElementById("canvas");
let rows = document.getElementsByClassName("gridRow");
let cols = document.getElementsByClassName("gridCol");

function renderGrid(num_of_rows_and_col) {
    makeRows(num_of_rows_and_col);
    makeCols(num_of_rows_and_col);
}