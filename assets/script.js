let startScreen = document.querySelector(".start-screen-wrapper");
let timerDisplay = document.querySelector(".timer-display");
let container = document.getElementById("container");
let section = document.querySelector("section");
let startBtn = document.querySelector(".start-btn");
let btnContainer = document.querySelector(".card-btn-container");

//Array of questions and their answer choices.
let questions = [
    {
        question: "Arrays in JavaScript can be used to store _____ .",
        answers: [
            { choice: "booleans", correct: false},
            { choice: "strings", correct: false},
            { choice: "arrays", correct: false},
            { choice: "all of the above", correct:true}
        ]
    }, 
    {
        question: "The condition in an if/ else statement is enclosed within _____ .",
        answers: [
            { choice: "quotes", correct: false},
            { choice: "curly brackets", correct: false},
            { choice: "parentheses", correct: true},
            { choice: "square brackets", correct: false}
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is _____ . ",
        answers: [
            { choice: "JavaScript", correct: false},
            { choice: "console.log", correct: true},
            { choice: "terminal", correct: false},
            { choice: "GitHub Pages", correct: true}
        ]
    },
    {
        question: "How often should you commit changes to your code?",
        answers: [
            { choice: "early and often", correct: true},
            { choice: "never", correct: false},
            { choice: "once a month", correct: false},
            { choice: "twice a week", correct: false}
        ]
    }
];

let score = 0;
let secondsLeft = 60;
let index = 1;
let gameOver = false;
let currentQuestion;

function startGame (){

    hideStartScreen();
    setTime();
    getCurrentQuestion();
    renderCard();
  
}

function hideStartScreen (){
    startScreen.style.display = "none";
    document.body.style.display = "block";
    container.style.display = "block";
}


function getCurrentQuestion () {
   currentQuestion = questions[index];
}

function setTime(){
    let timerInterval = setInterval(function(){
        secondsLeft--;
        timerDisplay.textContent = "Timer: " + secondsLeft;

        if(secondsLeft === 0){
            clearInterval(timerInterval);
            gameOver = true;
        }
    }, 1000)
}

function renderCard (){

    section.textContent = "";

    let card = document.createElement("div");
    let cardNumber = document.createElement("div");
    let cardHeader = document.createElement("div");
    let cardQuestion = document.createElement("div");
    let cardBtnContainer = document.createElement("div");
    let question1 = document.createElement("button");
    let question2 = document.createElement("button");
    let question3 = document.createElement("button");
    let question4 = document.createElement("button");
    
    card.className = "card";
    cardHeader.className = "card-header";
    cardQuestion.className = "card-question";
    cardBtnContainer.className = "card-btn-container";

    cardQuestion.textContent = currentQuestion.question;
    question1.textContent = currentQuestion.answers[0].choice;
    question2.textContent = currentQuestion.answers[1].choice;
    question3.textContent = currentQuestion.answers[2].choice;
    question4.textContent = currentQuestion.answers[3].choice;

    card.appendChild(cardHeader);
    cardHeader.appendChild(cardNumber);
    cardHeader.appendChild(cardQuestion);
    cardBtnContainer.appendChild(question1)
    cardBtnContainer.appendChild(question2)
    cardBtnContainer.appendChild(question3)
    cardBtnContainer.appendChild(question4)
    card.appendChild(cardBtnContainer);

    section.appendChild(card);
}


function endGame () {

}

startBtn.addEventListener("click", startGame);