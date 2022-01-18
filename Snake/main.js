let c = document.querySelector(".canvas").getContext("2d");
let moveSide = "right";
let headCords = {x1: 20, y1: 100, x2: 50, y2: 130};

let step = 15;
let speed = 0.000000001;


let body = [];
let foodCords = {};

let margin = 35;

let score = 0;

let matchVar = 25;
let colors = {fill: "cyan", stroke: "black", clean: "gray", food: "tomato"};

let length = 10;
document.addEventListener("keydown", control);

setInterval(draw, 50);
setInterval(update, 10);
setInterval(foodGenerating, 3_000);
setInterval(foodCheck, 50);

//Fill properties
c.fillStyle = colors.fill;
c.strokeStyle = colors.stroke;
foodGenerating();
function draw(){
    let trash = {x1: headCords.x1, y1: headCords.y1, x2: headCords.x2, y2: headCords.y2};
    switch(moveSide){
        case "down":
            body.shift() || null;
            body.shift() || null;
            body.push(headCords);
            [trash.y1, trash.y2] = [headCords.y1 + speed * step  + margin, headCords.y2  + speed * step + margin];
            headCords = trash;
            body.push(headCords);
            break;
        case "up":
            body.shift() || null;
            body.shift() || null;
            body.push(headCords);
            [trash.y1, trash.y2] = [headCords.y1 - speed * step  - margin, headCords.y2  - speed * step - margin];
            headCords = trash;
            body.push(headCords);
            break;
        case "right":
            body.shift() || null;
            body.shift() || null;
            body.shift() || null;
            body.push(headCords);
            [trash.x1, trash.x2] = [trash.x1 + speed * step  + margin, trash.x2 + speed * step  + margin];
            headCords = trash;
            body.push(headCords);
            break;
        case "left":
            body.shift() || null;
            body.shift() || null;
            body.push(headCords);
            [trash.x1, trash.x2] = [trash.x1 - speed * step  - margin, trash.x2 - speed * step  - margin];
            headCords = trash;
            body.push(headCords);
            break;
    }
    headCords.x2 > 900 ? (headCords.x2 = 30, headCords.x1 = 0): null;
    headCords.x1 < 0 ? (headCords.x2 = 900, headCords.x1 = 870): null;
    
    headCords.y2 > 500 ? (headCords.y2 = 30, headCords.y1 = 0): null;
    headCords.y1 < 0 ? (headCords.y2 = 500, headCords.y1 = 470): null;
}
function foodCheck(){
    if(
        headCords.y1 < foodCords.y1 + matchVar && 
        headCords.x1 < foodCords.x1 + matchVar && 
        headCords.y1 > foodCords.y1 - matchVar &&
        headCords.x1 > foodCords.x1 - matchVar
    ) {
        score+=10;
        foodCords = {};
    }
}
function cleaning(){
    c.fillStyle = colors.clean;
    c.fillRect(0,0,900,500);
    c.fill();
    c.fillStyle = colors.fill;
}
function update(){
    cleaning();
    c.fillStyle = colors.food;
    c.beginPath();
    c.moveTo(foodCords.x1, foodCords.y1);
    c.lineTo(foodCords.x1, foodCords.y2);
    c.lineTo(foodCords.x2, foodCords.y2);
    c.lineTo(foodCords.x2, foodCords.y1);
    c.closePath();
    c.fill();
    c.stroke();
    c.fillStyle = colors.fill;
    body.forEach(function (partCords){
        c.beginPath();
        c.moveTo(partCords.x1, partCords.y1);
        c.lineTo(partCords.x1, partCords.y2);
        c.lineTo(partCords.x2, partCords.y2);
        c.lineTo(partCords.x2, partCords.y1);
        c.closePath();
        c.fill();
        c.stroke();
    });
    c.fillStyle = "white";
    c.fillText("Score: " + score, 20, 20, 60);
}


function foodGenerating(){
    let x = getRandomInt(900);
    let y = getRandomInt(500);
    
    foodCords = {x1: x, x2: x + 20, y1: y, y2: y + 20};
}

function control(event){
    switch(event.key){
        case "ArrowUp":
            moveSide = "up";
            break;
        case "ArrowDown":
            moveSide = "down";
            break;
        case "ArrowRight":
            moveSide = "right";
            break;
        case "ArrowLeft":
            moveSide = "left";
            break;
    }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}