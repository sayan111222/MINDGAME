// Variables to store score and high score
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

// Get HTML elements
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');

// Display initial high score
highscoreElement.textContent = `High Score: ${highScore}`;

function generateQuestion() {
    // Generate random numbers
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    
    // Display the question
    questionElement.textContent = `${num1} + ${num2}`;
    
    // Return the correct answer
    return num1 + num2;
}

let correctAnswer;

submitButton.addEventListener('click', () => {
    const userAnswer = parseInt(answerInput.value);
    
    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = 'Correct!';
        score += 10; // Increase score
        scoreElement.textContent = `Score: ${score}`;
        
        // Check for new high score
        if (score > highScore) {
            highScore = score;
            highscoreElement.textContent = `High Score: ${highScore}`;
            localStorage.setItem('highScore', highScore); // Save high score locally
        }
    } else {
        feedbackElement.textContent = `Wrong! The correct answer was ${correctAnswer}.`;
    }
    
    // Generate a new question
    correctAnswer = generateQuestion();
    answerInput.value = ''; // Clear input field
});

startButton.addEventListener('click', () => {
    // Reset score and start the game
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    feedbackElement.textContent = '';
    correctAnswer = generateQuestion();
});

