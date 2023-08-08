const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls span");
const overLabel = document.querySelector(".over");
const refresh = document.querySelector(".over span");


let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;


let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.textContent = `High Score: ${highScore}`;


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 + 1);
    foodY = Math.floor(Math.random() * 30 + 1);
}


const handleGameOver = () => {
    clearInterval(setIntervalId);
    overLabel.classList.remove("finish");
}

const refreshGame = () => {
    overLabel.classList.add("finish");
    snakeX = 5, snakeY = 10;
    velocityX = 0, velocityY = 0;
    snakeBody = [];
    score = 0;
    gameOver = false;
    scoreElement.textContent = `Score: ${score}`;
    changeFoodPosition();
    setInterval(initGame, 200)
}


const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}


controls.forEach( key => {
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}))
})


const initGame = () => {

    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="background: red;grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.textContent = `Score: ${score}`;
        highScoreElement.textContent = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
        
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30) {
        gameOver = true;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="background: green;grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; 
        if (i != 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            gameOver=true;
        }
    }
   
    playBoard.innerHTML = htmlMarkup;
}


changeFoodPosition();
setIntervalId = setInterval(initGame, 200)

document.addEventListener("keydown", changeDirection);
refresh.addEventListener("click",refreshGame)
