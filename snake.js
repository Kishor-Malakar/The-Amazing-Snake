let inputDirection = {x: 0,y: 0};
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
let score = 0;
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [
    { x: 5, y: 5 }
]
food = { x: 10, y: 5 }

//Functions
function main(currentTime) {
    window.requestAnimationFrame(main);
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    // console.log(currentTime)
    gameEngine();
}
function collapse(sarr) {
    //bump yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    //bump wall   
    if(sarr[0].x >= 20 || sarr[0].x <= 0 || sarr[0].y >= 20 || sarr[0].y <= 0) {
        return true;
    }
    
    return false;

}
function gameEngine() {
    //Updating Snake Array
    if(collapse(snakeArr)) {
        gameOverSound.play();
        inputDirection = { x: 0, y: 0 };
        alert("Game Over. Press Enter to play again!!!");
        let a = 3;
        let b = 17;
        snakeArr = [{ x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random()) }];
        score = 0;
    }
    //Adding snake boxdy
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
        let a = 2;
        let b = 18;
        food = { x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random()) }
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]}; //new object for not getting referencing problems
    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    //Displaying the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the Food
    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = food.y;
    FoodElement.style.gridColumnStart = food.x;
    FoodElement.classList.add('food');
    board.appendChild(FoodElement);


}

//Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 };
    switch (e.key) {

        case "ArrowUp":
            inputDirection.x = 0;
            inputDirection.y = -1;
            moveSound.play();
            break;
        case "ArrowDown":
            inputDirection.x = 0;
            inputDirection.y = 1;
            moveSound.play();
            break;
        case "ArrowLeft":
            inputDirection.x = -1;
            inputDirection.y = 0;
            moveSound.play();
            break;
        case "ArrowRight":
            inputDirection.x = 1;
            inputDirection.y = 0;
            moveSound.play();
            break;
        default:
            break;
    }
});