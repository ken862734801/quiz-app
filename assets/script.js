let startScreen = document.querySelector(".start-screen-wrapper");
let container = document.getElementById("container");
let startBtn = document.querySelector(".start-btn");
let btnContainer = document.querySelector(".card-btn-container");

let questions = [
    {
        question: "Arrays in JavaScript can be used to store _______ .",
        answers: [
            { choice: "booleans", correct: false},
            { choice: "strings", correct: false},
            { choice: "arrays", correct: false},
            { choice: "all of the above", correct:true}
        ]
    }, 
    {
        question: "The condition in an if/ else statement is enclosed within _______ .",
        answers: [
            {choice: "quotes", correct: false},
            { choice: "curly brackets", correct: false},
            { choice: "parentheses", correct: true},
            { choice: "square brackets", correct: false}
        ]
    }
];
let score = 0;

function startGame (){

    hideStartScreen();
  
}

function hideStartScreen (){
    startScreen.style.display = "none";
    document.body.style.display = "block";
    container.style.display = "block";
}

function renderQuestion (){
    
}

function endGame () {

}

startBtn.addEventListener("click", startGame);