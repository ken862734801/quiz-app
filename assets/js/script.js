//DOM VARIABLES.
let startScreen = document.querySelector(".start-screen-wrapper");
let quizScreenWrapper = document.querySelector(".quiz-screen-wrapper");
let quizScreen = document.querySelector(".quiz-screen");
let endScreen = document.querySelector(".end-screen-wrapper");
let startBtn = document.querySelector(".start-btn");
let timerDisplay = document.querySelector(".timer-display");
let messageDisplay = document.querySelector(".message-display");
let highscoreDisplay = document.getElementById("highscore-display");

//GLOBAL VARIABLES.
let highscore;
let secondsLeft = 60;
let index = 0;
let currentQuestion;

function startQuiz (){
    hideStartScreen();
    setTime();
    getCurrentQuestion();
    renderCard();
};

function endQuiz (){

    endScreen.classList.remove("hide");
    quizScreenWrapper.classList.add("hide");
    highscoreDisplay.textContent = highscore;
}

startBtn.addEventListener("click", startQuiz);

function hideStartScreen(){
    startScreen.style.display = "none";
}

function setTime(){
    let timerInterval = setInterval(function(){
        secondsLeft--;
        highscore = secondsLeft;
        timerDisplay.textContent = "Timer: " + secondsLeft;

        if(secondsLeft === 0){
            clearInterval(timerInterval);
            endQuiz();
            
        }else if(index === 5){
            clearInterval(timerInterval);
            endQuiz();
            
        }else if(secondsLeft < 0){
            clearInterval(timerInterval);
            secondsLeft = 0;
            highscore = 0;
            timerDisplay.textContent = "Timer: " + secondsLeft;
        }
    }, 1000)
};

//Function to create card.
function renderCard (){
   if(index === 5){
    endQuiz();
   }else{
    quizScreen.textContent = "";

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

    quizScreen.appendChild(card);
   }
};

function incrementIndex () {
    index++
    console.log(index);
};
//Function to get question based off index.
function getCurrentQuestion () {
    currentQuestion = questions[index];
 };

 //Function to deal with answer clicks.
 function selectAnswer (event){
    let clickedBtn = event.target;
    if(clickedBtn.dataset.correct === "true"){
        console.log("Correct!");
        incrementIndex();
        getCurrentQuestion();
        renderCard();
        displayMessage(event);
    }else if(clickedBtn.dataset.correct === "false"){
        console.log("Incorrect!");
        secondsLeft = secondsLeft - 10;
        incrementIndex();
        getCurrentQuestion();
        renderCard();
        displayMessage(event);
    }
 }
 quizScreen.addEventListener("click", selectAnswer);

 //Function to display message if the user gets the question correct or incorrect.
function displayMessage (event){
    let correctMessage = ["Good Job!", "This is too easy for you!", "Wow! Are you cheating?", "Nice! You should be the one testing me!", "Correct again!", "You're a genius!", "You're making Web Dev look easy!"]
    let incorrectMessage = ["Nice try!", "Close, but not close enough.", "Maybe this one will be easier.", "We all make mistakes.", "Take your time. You got this!", "Not quite.", "No perfect score for you!"]
    if(event.target.dataset.correct === "true"){
        messageDisplay.textContent = correctMessage[Math.floor(Math.random()*correctMessage.length)];
    }if(event.target.dataset.correct === "false"){
        messageDisplay.textContent = incorrectMessage[Math.floor(Math.random()*incorrectMessage.length)];
    } 
}

//Variable for the submit button.
const submitBtn = document.getElementById("submit");

//Function to get the players score and initials through the input. 
function getHighScore(){
    let initials = document.getElementById("initials").value;
    let playerScore = {player: initials, score: highscore};
    
    console.log(playerScore);
    let savedScores = JSON.parse(localStorage.getItem("savedScores"));

    if(initials === ""){
        alert("Fill in your initials to add your score to the leaderboard.");
        return
    }else if(savedScores !== null){
        savedScores.push(playerScore);
            localStorage.setItem("savedScores",JSON.stringify(savedScores));
    }else{
        savedScores = [playerScore];
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
    }
        window.location.href = "./assets/leaderboard.html";
};

submitBtn.addEventListener("click", getHighScore);



