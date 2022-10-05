const screen = document.querySelector('.drawing-board');

let x = prompt('What should be the resolution: ');
if (x > 512) {
    x = prompt('Value is too large. It should be under 64: ')
};

let side = 512/x ;
for (let i = 0; i < x**2; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.cssText = `background-color: green; width: ${side}px;`+ 
            ` height: ${side}px; outline: 1px solid black`;
    screen.appendChild(box);
};
//screen.addEventListener('mouseenter', () => console.log("Mouse entered"));
const boxes = document.querySelectorAll(".box");

boxes.forEach(box => box.addEventListener('mouseover', changeColor)); 
boxes.forEach(box => box.addEventListener('mousedown', changeColor));

function changeColor(e) {
    if (e.type === 'mouseover' ) {
            e.target.style.background = "gold";
    }
}
//box.addEventListener( box.style.background = 'gold');
//boxes.forEach(box => box.addEventListener('mouseover', () => box.style.background = 'gold'));
