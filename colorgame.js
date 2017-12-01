var h1 = document.querySelector("h1")
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#color");
var message = document.querySelector("#message");
var newBtn = document.querySelector("#new-btn");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");
var getInt = randInt(0, 255);
var pickColor;
var modes = {easy: 3, hard: 6};
// mode essentially holds the number of squares that should be involved
var mode = modes.hard;

newBtn.addEventListener('click', function(){reset(); newGame();});
hardBtn.addEventListener('click', function(){
    reset();
    mode = modes.hard;
    this.classList.add("button-selected");
    easyBtn.classList.remove("button-selected");
    newGame();
});

easyBtn.addEventListener('click', function(){
    reset();
    mode = modes.easy;
    this.classList.add("button-selected");
    hardBtn.classList.remove("button-selected");
    newGame();
});

function reset(){
    message.textContent = "";
    h1.style.backgroundColor = "";
    newBtn.textContent = "New Colors"
}

function randInt(min, max){
    function func(){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return func;
}

function getRandomColor(){
    return "rgb(" + getInt() + ', ' + getInt() + ', ' + getInt() + ')';
}

function correct(square) {
    message.textContent = "Correct";
    newBtn.textContent = "Play Again?";

    var correctColor = square.style.backgroundColor;
    squares.forEach(function(sq){
        sq.style.backgroundColor = correctColor;
    });
    h1.style.backgroundColor = correctColor;
}

function incorrect(square) {
    square.style.backgroundColor = "";
    message.textContent = "Try Again";
}

function newGame(){
    for(var i = 0; i < squares.length; i++){
        if(i > mode - 1){
            squares[i].style.display = "none"
        }else {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = getRandomColor();

            squares[i].addEventListener('click', function(){
                if(this.style.backgroundColor === pickColor) {
                    correct(this);
                }else {
                    incorrect(this);
                }
            });
        }
    }

    pickColor = squares[Math.floor(Math.random() * mode)].style.backgroundColor;
    colorDisplay.textContent = pickColor;
}

newGame();