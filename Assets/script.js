let game = document.querySelector("#game");
let startButton = document.querySelector("#start-button");
let questionHeader = document.querySelector("#question-header");
let answerSection = document.querySelector("#answer-section");
let results = document.querySelector("#results");
let highScore = document.querySelector("#high-score");
let initials = document.querySelector("#initials");
let submitButton = document.querySelector("#submit-button");
localStorage.setItem("highscore", initials);



//global 
let totalSeconds = 75;
let timeRemaining = totalSeconds;
let secondsElasped = 0;
let discountSeconds = 0;
let currentQuestion = 0;
let correctAnswers = 0;
let correctScore = 0;
let localHighScoreArray = [];
let time = setInterval(timer, 1000);
clearInterval(time);

//quiz array

const gameArray = [
    {
        question: "Commonly used data types do NOT include",
        options:
            ["strings", "boolean", "alerts", "numbers"],
        correctAnswer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugging is...",
        options:
            ["JavaScript", "terminal/bash", "for loop", "console.log"],
        correctAnswer: 1
    },
    {
        question: "The condition in an if/else statement is enclosed within ....",
        options:
            ["quotes", "parentheses", "curly brackets", "square brackets"],
        correctAnswer: 1
    },
    {
        question: "String values must be enclosed within ... when being assigned to variables",
        options:
            ["commas", "quotes", "curly-brackets", "parentheses"],
        correctAnswer: 1
    },
    {
        question: "arrays in javascript can be used to store ...",
        options:
            ["numbers and strings", "booleans", "other arrays", "all the above"],
        correctAnswer: 3
    },

];


//the function for checking the answer^^
function assessSelection() {
    if (userAnswer === nextQuestion.correctAnswer) {
        highScore++;
    }
    else {
        (timeRemaining === timeRemaining - 5)
    }

}
var qI = -1
function nextQuestion() {
    qI++
    // assessSelection();
    if (qI >= gameArray.length) {
        let initials = prompt("Enter your initials")
        let score = timeRemaining
        localStorage.setItem("highscore", initials + ": " + score)
        //so somehow add the part where it checks if it is correct here 
        // assessSelection
    } else {


        document.querySelector("#question").textContent = gameArray[qI].question
        document.querySelector("#option1").textContent = gameArray[qI].options[0]
        document.querySelector("#option2").textContent = gameArray[qI].options[1]
        document.querySelector("#option3").textContent = gameArray[qI].options[2]
        document.querySelector("#option4").textContent = gameArray[qI].options[3]
    }



}
//tutor helped with this below

document.querySelector("#option1").addEventListener("click", nextQuestion)
document.querySelector("#option2").addEventListener("click", nextQuestion)
document.querySelector("#option3").addEventListener("click", nextQuestion)
document.querySelector("#option4").addEventListener("click", nextQuestion)
/// listeners
startButton.addEventListener("click", startGame);

// submitButton.addEventListener("click", addToHighScores);
// clearHighScores.addEventListener("click", clearHighScores);
//functions
submitButton.addEventListener("click", function () {
    document.querySelector("#scores").style = "display: block"
    document.querySelector("#score").textContent = localStorage.getItem("highscore")
    nextQuestion()
})
function timer() {
    label.textContent = timeRemaining;
    //    document.querySelector("label").textContent(timeRemaining);
    document.getElementById("label").innerHTML = totalSeconds;
    display.textContent = totalSeconds;
    // startButton.style.display = "block";

    totalSeconds = 250;
    timeRemaining = totalSeconds;
    secondsElasped = 0;
    currentQuestion = 0;
    correctAnswers = 0
    currentScore = 0;

    if (localStorage.getItem("highScore")) {
        localHighScoreArray = localStorage.getItem("highScore").split(",");
    }
    clearInterval(time);
}





//   start game
function startGame() {
    // startButton.style.display = "none";
    // game.style.display = "none";
    time = setInterval(timer, 1000);
    document.getElementById("start-button").innerHTML = highScore;
}



document.querySelector("#start-button").onclick = function () {
    document.getElementById("start-button").innerHTML = highScore;
}
