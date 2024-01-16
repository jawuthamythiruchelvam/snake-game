
const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText=document.getElementById('scoreVal')

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const unit = 25;

let foodX;
let foodY;
let xVal=25;
let yVal=0;
let score=0;
let active=true;
let start=false;
let snack = [
    { x: unit * 3, y: 0 },
    { x: unit * 2, y: 0 },
    { x: unit, y: 0 },
    { x: 0, y: 0 }
];
window.addEventListener('keydown',keyPress)


startGame();

function startGame() {
    context.fillStyle = "#212121";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    createFood();
    displayFood();
   // drawSnack();  // Corrected typo here
   nextTick();
}
function clearBoard(){
    context.fillStyle='#212121';
    context.fillRect(0,0,WIDTH,HEIGHT);
}

function createFood() {
    foodX = Math.floor(Math.random() * WIDTH / unit) * unit;
    foodY = Math.floor(Math.random() * HEIGHT / unit) * unit;  // Corrected to use HEIGHT
}

function displayFood() {
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, unit, unit);
}

function drawSnake() {
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121';
    
    snack.forEach((snackPart) => {
        context.fillRect(snackPart.x, snackPart.y, unit, unit);
        context.strokeRect(snackPart.x, snackPart.y, unit, unit);
        
    });
}
function moveSnake(){
        const head={x:snack[0].x+xVal,y:snack[0].y+yVal};
        snack.unshift(head);
        if(snack[0].x==foodX && snack[0].y==foodY){
            score += 1;
            scoreText.textContent= score; 
            createFood();
        }
        else
        snack.pop();
}
function nextTick(){
    if(active){
    setTimeout(() => {
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    }, 500);
}
else{
    clearBoard();
    context.font="bold 50px serif";
    context.fillStyle="white";
    context.textAlign="center";
    context.fillText("GAME OVER!",WIDTH/2,HEIGHT/2)
}
}
function keyPress(event){
    if(!start){
        start=true;
        nextTick();
    }
     const left=37;
     const up=38;
     const right=39;
     const down=40;

       switch(true){
        case(event.keyCode==left && xVal!=unit):
        xVal=-unit;
        yVal=0;
        break;
        case(event.keyCode==right && xVal!=-unit ):
        xVal=unit;
        yVal=0;
        break;
        case(event.keyCode==up && yVal!=unit):
        xVal=0;
        yVal=-unit;
        break;
        case(event.keyCode==down && yVal!=-unit):
        xVal=0;
        yVal=unit;
        break;
       }
       
}
// function checkGameOver(){
//     switch(true){
//         case(snack[0].x<0):
//         case(snack[0].x>WIDTH):
//         case(snack[0].y<0):
//         case(snack[0].y>HEIGHT):
//         active=false;
//         break;
//     }
// }
function checkGameOver() {
    if (snack[0].x < 0 || snack[0].x > WIDTH || snack[0].y < 0 || snack[0].y > HEIGHT) {
        active = false;
    }
}
