const screen = document.querySelector('.drawing-board');

let x = prompt('What should be the resolution: ');
let side = 512/x ;
for (let i = 0; i < x**2; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.cssText = `background-color: green; width: ${side}px;`+ 
            ` height: ${side}px; outline: 1px solid black`;
    screen.appendChild(box);
};
//screen.addEventListener('mouseenter', () => console.log("Mouse entered"));
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => box.addEventListener('mouseenter', () => box.style.cssText = 'background-color: gold;'));
