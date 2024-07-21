//constants and variables
let inputDir ={x:0 ,y:0};

const foodSound = new Audio('sounds/food.mp3');
const gameOverSound = new Audio('sounds/gameOver.wav');
const moveSound = new Audio('sounds/move.mp3');
// const musicSound = new Audio('');
let speed = 10;
let score=0 ;
let lastRenderTime=0;
let snakeArray =[
    {x:11 ,y:10}
];
let food = {x:5,y:15};

//button
easy = document.getElementById('easy');
medium = document.getElementById('medium');
hard = document.getElementById('hard');



//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastRenderTime)/1000 < 1/speed){
        return;
    }
    lastRenderTime =ctime;
    gameEngine();
    // console.log(ctime);
}

function isCollide(snake){
    for(let i=1;i<snake.length;i++){
        if(snake[i].x ===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0){
        return true;
    }
    return false;
}
function gameEngine(){
    // part:1 updating the snake
    if(isCollide(snakeArray)){
        //gameover sound
        
        inputDir = {x:0,y:0};
        gameOverSound.play();
        alert("Game over press any key to play again");
        location.reload();
        snakeArray =[{x:11,y:10}];
        score =0;
    }
    //if eat the food
    if(snakeArray[0].y===food.y && snakeArray[0].x===food.x){
        foodSound.play();
        score +=1;
        document.getElementById('point').textContent = score;
        snakeArray.unshift({x:snakeArray[0].x +inputDir.x, y:snakeArray[0].y+inputDir.y});
        let a =2;
        let b =18;
        food ={x:Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)* Math.random())};
    }
    //moving the snake
    for(let i =snakeArray.length-2;i>=0;i--){
        snakeArray[i+1]= {...snakeArray[i]};
        
    }
    snakeArray[0].x +=inputDir.x;
    snakeArray[0].y +=inputDir.y;



    //part:2 displaying the snake
    board.innerHTML = "";
    snakeArray.forEach((e,index)=>{
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = e.y;
       snakeElement.style.gridColumnStart = e.x;
       if(index===0){
        snakeElement.classList.add('head');
       }
       else{
        snakeElement.classList.add('snake');
       }
    board.appendChild(snakeElement);

    });
    //displaying food element
    foodElement = document.createElement('div');
       foodElement.style.gridRowStart = food.y;
       foodElement.style.gridColumnStart = food.x;
       foodElement.classList.add('food');
    board.appendChild(foodElement);

}

//game logics
window.requestAnimationFrame(main);
easy.addEventListener('click',function(){
    this.style.background = 'green';
   speed =5;
});
medium.addEventListener('click',function(){
    this.style.background = 'green';
    speed =15;
 });
 hard.addEventListener('click',function(){
    this.style.background = 'green';
    speed =30;
 });
window.addEventListener('keydown',function(event){
    moveSound.play();
inputDir = {x:0 , y:1};
switch(event.key){
    case "ArrowUp":
        
        inputDir.x =0;
        inputDir.y=-1;
        break;
    case "ArrowDown":
        // moveSound.play();
        inputDir.x =0;
        inputDir.y=1;
        break;
    case "ArrowLeft":
        // moveSound.play();
        inputDir.x =-1;
        inputDir.y=0;
        break;
    case "ArrowRight":
        // moveSound.play();
        inputDir.x =1;
        inputDir.y=0;
        break;
        default:
            break;
}
});
