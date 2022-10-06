let startScreen = document.querySelector(".start-screen-wrapper");
let timerDisplay = document.querySelector(".timer-display");
let container = document.getElementById("container");
let section = document.querySelector("section");
let resultDisplay = document.querySelector(".result-display");
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
    },
    {

    }
];
let score;
let secondsLeft = 60;
let index = 0;
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


function selectAnswer (event){
    let clickedBtn = event.target;
    if(clickedBtn.dataset.correct === "true"){
        console.log("Correct!");
        incrementIndex();
        getCurrentQuestion();
        renderCard();
        displayResult(event);
    }else if(clickedBtn.dataset.correct === "false"){
        console.log("Incorrect!");
        incrementIndex();
        getCurrentQuestion();
        renderCard();
        displayResult(event);
    }
}

section.addEventListener("click", selectAnswer);

function incrementIndex () {
    index++
    console.log(index);
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
    let answer1 = document.createElement("button");
    let answer2 = document.createElement("button");
    let answer3 = document.createElement("button");
    let answer4 = document.createElement("button");
    
    card.className = "card";
    cardHeader.className = "card-header";
    cardQuestion.className = "card-question";
    cardBtnContainer.className = "card-btn-container";

    

    cardQuestion.textContent = currentQuestion.question;
    answer1.textContent = currentQuestion.answers[0].choice;
    answer2.textContent = currentQuestion.answers[1].choice;
    answer3.textContent = currentQuestion.answers[2].choice;
    answer4.textContent = currentQuestion.answers[3].choice;

    answer1.className = "answer";
    answer2.className = "answer";
    answer3.className = "answer";
    answer4.className = "answer";

    answer1.setAttribute("data-correct", currentQuestion.answers[0].correct);
    answer2.setAttribute("data-correct", currentQuestion.answers[1].correct);
    answer3.setAttribute("data-correct", currentQuestion.answers[2].correct);
    answer4.setAttribute("data-correct", currentQuestion.answers[3].correct);

    card.appendChild(cardHeader);
    cardHeader.appendChild(cardNumber);
    cardHeader.appendChild(cardQuestion);
    cardBtnContainer.appendChild(answer1)
    cardBtnContainer.appendChild(answer2)
    cardBtnContainer.appendChild(answer3)
    cardBtnContainer.appendChild(answer4)
    card.appendChild(cardBtnContainer);

    section.appendChild(card);

}
function displayResult (event){
    let correctMessage = ["Good Job!", "This is too easy for you!", "Wow! Are you cheating?", "Nice! You should be the one testing me!", "Correct again!", "You're a genius!", "You're making Web Dev look easy!"]
    let incorrectMessage = ["Nice try!", "Close, but not close enough.", "Maybe this one will be easier.", "We all make mistakes.", "Take your time. You got this!", "Don't give up!", "No perfect score for you!"]
    if(event.target.dataset.correct === "true"){
        resultDisplay.textContent = correctMessage[Math.floor(Math.random()*correctMessage.length)];
    }if(event.target.dataset.correct === "false"){
        resultDisplay.textContent = incorrectMessage[Math.floor(Math.random()*incorrectMessage.length)];
    }
}

function endGame () {
    if(!gameOver || index > 3){
        console.log("The game is over!");
        score = secondsLeft;
        console.log(score);
    }
}

startBtn.addEventListener("click", startGame);