const grid = document.getElementById('grid')
const slider = document.getElementById('slider')
const sliderLabel = document.getElementById('sliderValue');
const reset = document.getElementById('reset');
const staticBtn = document.getElementById('static');
const rainbowBtn = document.getElementById('rainbow');
const shaderBtn = document.getElementById('shader');
const eraserBtn = document.getElementById('eraser');
const picker = document.getElementById('picker');

let static = true;
let random = false;
let eraser = false;
let shader = false;

let color = '#2aa198'
sliderLabel.innerHTML = `Grid Size: ${slider.value} x ${slider.value}`

function sizeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (i=0; i < size**2; i++){
        const pixel = document.createElement('div')
        pixel.className = 'pixel';
        pixel.addEventListener('mouseover', changeColor)
        pixel.addEventListener('touchmove', changeColor);
        grid.appendChild(pixel);
    }
}

function changeColor(e) {
    let pix = e.target;
    if (random) pix.style.backgroundColor = randomColor();
    else if (eraser) pix.style.backgroundColor = '#fdf6e3'
    else pix.style.backgroundColor = color;
}

function updateSize() {
    grid.innerHTML= "";
    sliderLabel.textContent = `Grid Size: ${slider.value} x ${slider.value}`;
    sizeGrid(slider.value);
}

function updateColor(e) {
    color = e.target.value;
    picker.style.backgroundColor = color;
}

function randomColor() {
    solarized = ['#859900', '#2aa198', '#268bd2', '#6c71c4', '#d33682', 
            '#dc322f', '#cb4b16', '#b58900']
    console.log(color)
    return color = solarized[Math.floor(Math.random()*solarized.length)]
}

function setStatic () {
    static = true;
    random = false;
    eraser = false;
}

function setRandom () {
    static = false;
    random = true;
    eraser = false;
}

function setEraser () {
    eraser = true;
    random = false;
    static = false;
}

function startUp() {
    sizeGrid(slider.value);
    picker.value = color;
    picker.style.backgroundColor = color;
    picker.addEventListener("input", updateColor, false);
    picker.select();
    slider.addEventListener('input', updateSize);
    reset.addEventListener('click', updateSize);
    staticBtn.addEventListener('click', setStatic)
    eraserBtn.addEventListener('click', setEraser)
    rainbowBtn.addEventListener('click', setRandom)

}

startUp();