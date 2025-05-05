const gridContainer = document.querySelector("#grid-container");
const sizeInput = document.querySelector("#size-input");
const sizeSubmitButton = document.querySelector("#size-submit-button");
const penModeButton = document.querySelector("#pen-mode-button");
const eraserModeButton = document.querySelector("#eraser-mode-button");
const clearAllButton = document.querySelector("#clear-all-button");
const redColor = document.querySelector("#red-color");
const blueColor = document.querySelector("#blue-color");
const greenColor = document.querySelector("#green-color");
const blackColor = document.querySelector("#black-color");
const randomColor = document.querySelector("#random-color");

let gridSize = 16;
let currentColor = 'red';
let currentMode = 'pen';
let cellPixel = document.querySelectorAll(".grid-cell");
let randomSelected = false;

document.addEventListener("DOMContentLoaded", () => {
    createGrid();
});

sizeSubmitButton.addEventListener("click", ()=>{
    let inputValue = sizeInput.value.trim();

    if (!/^\d+$/.test(inputValue)) {
        alert('Numbers only please');
        return;
    }

    let value = parseInt(inputValue, 10);

    if (value < 4 || value > 100) {
        alert('Please enter numbers between 4 and 100');
        return;
    }

    gridSize = value;
    createGrid();
});

penModeButton.addEventListener("click", ()=>{
    currentMode = 'pen';
});

eraserModeButton.addEventListener("click", ()=>{
    currentMode = 'eraser';
});

clearAllButton.addEventListener("click", ()=>{
    const cells = document.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = "white";
        // using opacity = 0 will clear the border 
        // and using opacity = 1 will make the opacity changing function disabled
        cell.style.opacity = "";
    });
});

redColor.addEventListener("click", ()=>{
    currentColor = 'red';
    randomSelected = false;
});

greenColor.addEventListener("click", ()=>{
    currentColor = 'green';
    randomSelected = false;
});

blueColor.addEventListener("click", ()=>{
    currentColor = 'blue';
    randomSelected = false;
});

blackColor.addEventListener("click", ()=>{
    currentColor = 'black';
    randomSelected = false;
});

randomColor.addEventListener("click", ()=>{
    randomSelected = true;
});

function createGrid(){
    gridContainer.innerHTML = '';
    let cellSize = 100 / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');

        cell.style.width = `${cellSize}%`;
        cell.style.height = `${cellSize}%`;
        cell.style.backgroundColor = 'white';

        cell.addEventListener("mouseover",()=>{
            let currentOpacity = Number(cell.style.opacity);
            if (currentMode == 'eraser') {
                cell.style.backgroundColor = 'white';
                cell.style.opacity = '';
            }else if (randomSelected == false) {
                    cell.style.backgroundColor = currentColor;
                    currentOpacity ? cell.style.opacity = currentOpacity + 0.1 : cell.style.opacity = 0.1;
                }else if (randomSelected == true) {
                    currentColor = randomColorGenerator();
                    cell.style.backgroundColor = currentColor;
                    currentOpacity ? cell.style.opacity = currentOpacity + 0.1 : cell.style.opacity = 0.1;
            }
        });

        gridContainer.appendChild(cell);
    }
};


function randomColorGenerator() {
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);

    return `rgb(${r}, ${g}, ${b})`
};
