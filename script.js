let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');
const timerElement = document.getElementById('timer');
const modeToggleButton = document.getElementById('mode-toggle');

let correctAnswer;
let timer;
let timeElapsed = 0;

highscoreElement.textContent = `High Score: ${highScore}`;
timerElement.textContent = `Time Elapsed: ${timeElapsed}s`;

// Function to generate a new question
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 9000) + 100;
    const num2 = Math.floor(Math.random() * 9000) + 100;
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question;
    if (operation === '+') {
        question = `${num1} + ${num2}`;
        correctAnswer = num1 + num2;
    } else {
        question = `${num1} - ${num2}`;
        correctAnswer = num1 - num2;
    }
    
    questionElement.textContent = question;
}

// Function to start the game
function startGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    feedbackElement.textContent = '';
    timeElapsed = 0;
    startTimer();
    generateQuestion();
}

// Function to handle answer submission
submitButton.addEventListener('click', () => {
    const userAnswer = parseFloat(answerInput.value);
    
    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = 'Correct!';
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        
        if (score > highScore) {
            highScore = score;
            highscoreElement.textContent = `High Score: ${highScore}`;
            localStorage.setItem('highScore', highScore);
        }
    } else {
        feedbackElement.textContent = `Wrong! The correct answer was ${correctAnswer}.`;
    }
    
    answerInput.value = '';
    generateQuestion();
    resetTimer();
});

// Start game button click event
startButton.addEventListener('click', () => {
    startGame();
});

// Timer functions
function startTimer() {
    stopTimer(); // Stop any existing timers
    timer = setInterval(() => {
        timeElapsed++;
        timerElement.textContent = `Time Elapsed: ${timeElapsed}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    stopTimer();
    timeElapsed = 0;
    timerElement.textContent = `Time Elapsed: ${timeElapsed}s`;
    startTimer();
}

// Dark/Light Mode Toggle Functionality
modeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelectorAll('button').forEach(button => button.classList.toggle('dark-mode'));
    document.querySelectorAll('input').forEach(input => input.classList.toggle('dark-mode'));
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelectorAll('footer a').forEach(link => link.classList.toggle('dark-mode'));
    
    // Update button text based on mode
    if (document.body.classList.contains('dark-mode')) {
        modeToggleButton.textContent = 'Switch to Light Mode';
    } else {
        modeToggleButton.textContent = 'Switch to Dark Mode';
    }
});
