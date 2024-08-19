let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');

highscoreElement.textContent = `High Score: ${highScore}`;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let question;
    let correctAnswer;

    switch (operation) {
        case '+':
            question = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2}`;
            correctAnswer = num1 - num2;
            break;
        case '*':
            question = `${num1} * ${num2}`;
            correctAnswer = num1 * num2;
            break;
        case '/':
            // Ensure no division by zero and round to 2 decimal places
            question = `${num1} / ${num2}`;
            correctAnswer = (num1 / num2).toFixed(2);
            break;
    }
    
    questionElement.textContent = question;
    return correctAnswer;
}

let correctAnswer;

submitButton.addEventListener('click', () => {
    const userAnswer = parseFloat(answerInput.value);
    
    if (userAnswer === parseFloat(correctAnswer)) {
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
    
    correctAnswer = generateQuestion();
    answerInput.value = '';
});

startButton.addEventListener('click', () => {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    feedbackElement.textContent = '';
    correctAnswer = generateQuestion();
});






let timer; // Variable to hold the timer interval
let timeElapsed = 0; // Time counter starting from 0

// Display the initial time elapsed
const timerElement = document.getElementById('timer');
timerElement.textContent = `Time Elapsed: ${timeElapsed}s`;

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        timerElement.textContent = `Time Elapsed: ${timeElapsed}s`;
    }, 1000); // Increase time every second
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Function to reset the timer for each question
function resetTimer() {
    stopTimer(); // Stop the current timer
    timeElapsed = 0; // Reset time elapsed to 0
    timerElement.textContent = `Time Elapsed: ${timeElapsed}s`;
    startTimer(); // Start the timer again
}

// Start the timer when the game starts
startButton.addEventListener('click', () => {
    timeElapsed = 0; // Reset the timer to 0 seconds
    startTimer(); // Start the timer
    correctAnswer = generateQuestion(); // Generate the first question
});

// Reset the timer every time a new question is generated
submitButton.addEventListener('click', () => {
    const userAnswer = parseFloat(answerInput.value);
    
    if (userAnswer === parseFloat(correctAnswer)) {
        feedbackElement.textContent = 'Correct!';
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        
        if (score > highScore) {
            highScore = score;
            highscoreElement.textContent = `High Score: ${highScore}`;
            localStorage.setItem('highScore', highScore);
        }
    } 
    
    correctAnswer = generateQuestion(); // Generate the next question
    resetTimer(); // Reset the timer for the new question
    answerInput.value = ''; // Clear the input field
});




// Example: Stop the timer when the game ends or at any specific event
// stopTimer();


