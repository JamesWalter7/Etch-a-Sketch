let drawing_board_resolution = 20;          //number of (custom)pixels in a row or column
let drawing_board_size = 600;               //in screen pixels 
let drawing_board_pixel_size;
let eraser_selected = false;
let multicolor_selected = false;
let drawing_active = false;
const drawing_board = document.querySelector("#drawing-board");

function draw_board() {
    drawing_board.innerHTML = '';
    drawing_board.style.width = `${drawing_board_size}px`;
    drawing_board.style.height = `${drawing_board_size}px`;
    drawing_board_pixel_size = (drawing_board_size/drawing_board_resolution);
    for(let i = 0; i < drawing_board_resolution * drawing_board_resolution; i++) {
        const div = document.createElement('div');
        div.style.flex = `0 0 ${drawing_board_pixel_size}px`;
        div.style.backgroundColor = 'white';
        div.classList.add('pixel');
        drawing_board.appendChild(div);
    }
    attach_events();
}
draw_board();
const input= document.querySelector("input");
input.addEventListener('input', () => {
    let temp = parseInt(input.value);
    if(temp === null || temp < 10) return;
    else if(temp > 100) temp = 100;
    else if(temp%2 === 1) temp++;
    drawing_board_resolution = parseInt(temp) || 20;
    draw_board();
});


function attach_events() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener("mousedown", () => {
            color_the_board(pixel);
            drawing_active = true;
        });
        pixel.addEventListener("mousemove", () => {
            color_the_board(pixel);
        });
        pixel.addEventListener('mouseup', () => drawing_active = false);
    });
}

function color_the_board(pixel) {
    if(!drawing_active) return;
    if(eraser_selected) {
        pixel.style.backgroundColor = 'white';
    }else if(multicolor_selected) {
        pixel.style.backgroundColor = get_random_color();
    }else{
        pixel.style.backgroundColor = 'black';
    }
}

function get_random_color() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

drawing_board.addEventListener("mouseleave", () => drawing_active = false);

let buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (e) => {
    if(e.target.id === 'random-color') {
        //toggle the boolean values and classList
        multicolor_selected = !multicolor_selected;
        e.target.classList.toggle('pressed');
    }else if(e.target.id === 'eraser') {
        //here too
        eraser_selected = !eraser_selected;
        e.target.classList.toggle('pressed');
    }else if(e.target.id === 'resetor') {
        reset();
    }
});
function reset() {
    (document.querySelector("#random-color")).classList.remove('pressed');
    (document.querySelector("#eraser")).classList.remove("pressed");
    resolution = 20;
    drawing_board_size = 600;
    eraser_selected = false;
    multicolor_selected = false;
    drawing_active = false;

    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
}