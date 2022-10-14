const screen = document.querySelector('.drawing-board');

let x = prompt('What should be the resolution: ');

checkX(x);
function checkX(resolution) {
    if (resolution > 100) {
        x = prompt("Value is too large please select anything up to 100")
        checkX(x);
    } else {
        return;
    };
}

let side = 512/x ;
for (let i = 0; i < x**2; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.cssText = `background-color: green; width: ${side}px;`+ 
            `height: ${side}px; outline: 1px solid black`;
    screen.appendChild(box);
};
//screen.addEventListener('mouseenter', () => console.log("Mouse entered"));
const boxes = document.querySelectorAll(".box");
const erasor = document.querySelector('.erasor');

let erasorActive = false;
let penActive = false;

screen.addEventListener('mousedown', () => {
    penActive = true;
    boxes.forEach(box => box.addEventListener('mouseover', colorChanger));

})
screen.addEventListener('click', (e) => {
    penActive = false;
    colorChanger(e);
})

const buttons = document.querySelectorAll('.buttons');

buttons.forEach(button => button.addEventListener('click', transform));

erasor.addEventListener('click', (e) =>  {
    penActive = false;
    screen.addEventListener('click', (e) => {
        if (erasorActive) {
            erasorActive = false;
        } else {
            erasorActive = true;
    }});
}); 

let randomColorOpacity= 1;
function getRandomColorValues() {
    let rang = '';
    for (let i = 0; i < 3; i++) {
        if (i != 2) {
            rang += `${Math.floor(Math.random() * 256)}, `;
        } else {
            rang += Math.floor(Math.random() * 100);
        };
    };
    return rang;
};

let color = getRandomColorValues();


function colorChanger(e) {
    if (erasorActive ) {
        changeColortoGreen(e);
    } else if (penActive) {
        changeColortoGold(e);
    }
};
let pickedColor = 'gold';
function changeColortoGold(e) {
    if (pickedColor == 'gold') {
        e.target.style.background = 'gold';
    } else {
        e.target.style.background = "rgba(" + color+ "," + randomColorOpacity +")";
    }
    if (randomColorOpacity > 0) {
        randomColorOpacity -= 0.001;
    };
    console.log("rgba(" + color+ " " + randomColorOpacity +")")
};

function changeColortoGreen(e) {
    e.target.style.background = 'green';
    if(randomColorOpacity < 1) {
        randomColorOpacity += 0.001;
    };
};
function transform(event) {
    if (event.target.textContent == 'Reset' || event.target.classList == 'buttons') {
        return;
    }else{
    event.target.classList.toggle('selected');
    };
};

const reset = document.querySelector('.resetor');
reset.addEventListener('mouseover', (e) => {
    e.target.classList.add('reset');
    e.target.addEventListener('mouseleave', removeReset);
    e.target.addEventListener('click', (e) =>{
        randomColorOpacity = 1;
        resetAll(e);
    });
});

function resetAll(e) {
    boxes.forEach(box => box.style.background = 'green');
};

function removeReset(e) {
    e.target.classList.remove('reset');
};

const colorPicker = document.querySelector('.color');

colorPicker.addEventListener('click', (e) => {
    if (e.target.classList.length !== 2) {
    pickedColor = 'gold';
    } else {
        pickedColor = 'blue';
    }
});