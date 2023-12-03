let scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];
let timeElement = document.getElementById("timer-value");
let scoreElement = document.getElementById("score");

const questionsElement = document.getElementById("questions");
let questionElement = document.getElementById("question");

const correctIncorrectElement = document.getElementById("correct-incorrect");
const finalEL = document.getElementById("final");
let initials = document.getElementById("initials")

const highScore = document.getElementById("highscores");
let scoreEl = document.getElementById("highscore-list");

let secondsLeft = 75;
//buttons 
const startButton = document.querySelector("#start-button");
const firansButton = document.querySelector("#answer-1");
const secansButton = document.querySelector("#answer-2");
const thransButton = document.querySelector("#answer-3");
const fouransButton = document.querySelector("#answer-4");
const submitButton = document.querySelector("#score-button");
const returnButton = document.querySelector("#return");
const clearButton = document.querySelector("#clear");


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
//timer function 
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeElement.textContent = `Time: ${secondsLeft}s`;
        if (secondsLeft === 0 || questionCount === gameArray.length) {
            clearInterval(timerInterval);
            questionsElement.style.display = "none";
            if (finalEL) {
                finalEL.style.display = "block";
            }
            scoreElement.textContent = secondsLeft;
        }
    }, 1000);
}

function startGame() {
    questionsElement.style.display = "block";
    questionCount = 0;

    setTime();
    nextQuestion(questionCount);
}

function nextQuestion(id) {
    if (id < gameArray.length) {
        questionElement.textContent = gameArray[id].question;
        firansButton.textContent = gameArray[id].options[0];
        secansButton.textContent = gameArray[id].options[1];
        thransButton.textContent = gameArray[id].options[2];
        fouransButton.textContent = gameArray[id].options[3];
    }
}

//check 
function checkAnswer(event) {
    event.preventDefault();

    correctIncorrectElement.style.display = "block";
    let p = document.createElement("p");
    correctIncorrectElement.appendChild(p);

    setTimeout(function () {
        p.style.display = "none";
    }, 1000);

    if (questionCount < gameArray.length) {
        if (gameArray[questionCount].correctAnswer === event.target.value) {
            p.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - 10;
            p.textContent = "Incorrect!";
        }
        questionCount++;
        nextQuestion(questionCount);
    }
}
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    let initialsValue = initials.value; 

    if (initialsValue === '') { 
        initialsValue = 'N/A';
    }

    addUserScore(initialsValue);
});

function addUserScore(initials) {
    let init = (typeof initials === 'string') ? initials.toUpperCase() : ''; 

    if (finalEL) {
        finalEL.style.display = "none";
    }
    highScore.style.display = "block";

    scoreList.push({ initials: init, score: secondsLeft });

    scoreList.sort(function (a, b) {
        if (a.score > b.score) {
            return -1;
        } else if (a.score < b.score) {
            return 1;
        } else {
            return 0;
        }
    });

    scoreEl.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials} - ${scoreList[i].score}`;
        scoreEl.appendChild(li);
    }
    showHighScores();

    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}
const viewHighscoresButton = document.querySelector("#highscores-button");

viewHighscoresButton.addEventListener("click", function() {
    showHighScores();
});

function showHighScores() {
    const highScoresList = document.querySelector("#highscores-text");

    if (highScoresList) {
        let storageList = JSON.parse(localStorage.getItem("scoreList"));
        if (storageList !== null) {
            highScoresList.innerHTML = "";
            for (let i = 0; i < storageList.length; i++) {
                let li = document.createElement("li");
                li.textContent = `${storageList[i].initials} - ${storageList[i].score}`;

                highScoresList.appendChild(li);
            }
        }
    }
}

    scoreEl.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials} - ${scoreList[i].score}`;
        scoreEl.appendChild(li);
    }


function clearHighScores() {
    localStorage.clear();
    scoreEl.innerHTML = "";
}
clearButton.addEventListener("click", clearHighScores);
//event listener
startButton.addEventListener("click", startGame);

const answerButton = document.querySelectorAll(".answer");


answerButton.forEach(item =>
    item.addEventListener("click", checkAnswer));


returnButton.addEventListener("click", function () {
    highScore.style.display = "none";
    questionsElement.style.display = "none";
    finalEL.style.display = "none";
    startButton.style.display = "block";
    secondsLeft = 75;
    questionCount = 0;
    timeElement.textContent = timeElement.textContent = `Time: ${secondsLeft}s`;
})
