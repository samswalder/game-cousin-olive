// Etymology Origins Game Logic

// Win sound - using HTML5 Audio with a free sound effect
const winSound = new Audio('https://cdn.freesound.org/previews/270/270402_5123851-lq.mp3');
winSound.volume = 0.5;

// Preload the sound
winSound.load();

// Play win sound
function playWinSound() {
    // Reset and play
    winSound.currentTime = 0;
    winSound.play().catch(e => console.log('Audio play failed:', e));
}

// Pool of possible origins for generating wrong answers
const ALL_ORIGINS = [
    "Arabic", "Latin", "Greek", "French", "Spanish", "German", "Italian",
    "Japanese", "Chinese", "Hindi", "Dutch", "Portuguese", "Norse",
    "Sanskrit", "Persian", "Hebrew", "Czech", "English", "Gaelic",
    "Nahuatl", "Algonquian", "Aramaic", "Belgian", "Turkish", "Russian"
];

// Game State
let gameState = {
    currentWord: null,
    guessesUsed: 0,
    maxGuesses: 3,
    score: 0,
    gameOver: false,
    usedWords: [],
    correctOrigin: null,
    choices: []
};

// DOM Elements
const wordText = document.getElementById('word-text');
const scoreDisplay = document.getElementById('score');
const guessesContainer = document.getElementById('guesses-remaining');
const actionSection = document.getElementById('action-section');
const restartBtn = document.getElementById('restart-btn');
const choicesGrid = document.getElementById('choices-grid');
const choiceButtons = document.querySelectorAll('.choice-btn');
const confettiContainer = document.getElementById('confetti-container');
const etymologyReveal = document.getElementById('etymology-reveal');
const etymologyText = document.getElementById('etymology-text');

// Initialize game
function initGame() {
    gameState.guessesUsed = 0;
    gameState.gameOver = false;
    gameState.choices = [];

    // Reset UI
    actionSection.classList.add('hidden');
    etymologyReveal.classList.add('hidden');
    resetChoiceButtons();
    resetHearts();

    // Pick a new word
    selectNewWord();

    // Generate choices
    generateChoices();

    // Update display
    updateDisplay();
}

// Select a new word that hasn't been used recently
function selectNewWord() {
    let availableWords = WORDS.filter(w => !gameState.usedWords.includes(w.word));

    // If we've used most words, reset the used list
    if (availableWords.length < 10) {
        gameState.usedWords = [];
        availableWords = WORDS;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    gameState.currentWord = availableWords[randomIndex];
    gameState.correctOrigin = gameState.currentWord.origin;
    gameState.usedWords.push(gameState.currentWord.word);
}

// Generate 4 choices (1 correct + 3 wrong)
function generateChoices() {
    const correct = gameState.correctOrigin;
    const wrongOptions = ALL_ORIGINS.filter(o => o !== correct);

    // Shuffle and pick 3 wrong answers
    const shuffledWrong = shuffleArray(wrongOptions).slice(0, 3);

    // Combine with correct answer and shuffle
    gameState.choices = shuffleArray([correct, ...shuffledWrong]);
}

// Update the display
function updateDisplay() {
    wordText.textContent = gameState.currentWord.word.toUpperCase();
    scoreDisplay.textContent = gameState.score;

    // Update choice buttons
    choiceButtons.forEach((btn, index) => {
        const btnText = btn.querySelector('.btn-text') || btn;
        if (btn.querySelector('.btn-text')) {
            btn.querySelector('.btn-text').textContent = gameState.choices[index];
        } else {
            // Wrap text in span for easier manipulation
            btn.innerHTML = `<span class="btn-text">${gameState.choices[index]}</span><span class="puke-emoji">🤮</span>`;
        }
    });
}

// Reset choice buttons to default state
function resetChoiceButtons() {
    choiceButtons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('wrong', 'correct', 'revealed');
        btn.innerHTML = `<span class="btn-text">Loading...</span><span class="puke-emoji">🤮</span>`;
    });
}

// Reset hearts display
function resetHearts() {
    const hearts = guessesContainer.querySelectorAll('.guess-heart');
    hearts.forEach(heart => heart.classList.remove('used'));
}

// Mark a heart as used
function useHeart() {
    const hearts = guessesContainer.querySelectorAll('.guess-heart');
    const unusedHeart = Array.from(hearts).find(h => !h.classList.contains('used'));
    if (unusedHeart) {
        unusedHeart.classList.add('used');
    }
}

// Handle choice selection
function handleChoice(index) {
    if (gameState.gameOver) return;

    const selectedOrigin = gameState.choices[index];
    const button = choiceButtons[index];

    if (selectedOrigin === gameState.correctOrigin) {
        // Correct answer!
        handleCorrectAnswer(button);
    } else {
        // Wrong answer
        handleWrongAnswer(button, index);
    }
}

// Handle correct answer
function handleCorrectAnswer(button) {
    gameState.gameOver = true;

    // Calculate points
    const guessNumber = gameState.guessesUsed + 1;
    const points = calculatePoints(guessNumber);

    // Update UI
    button.classList.add('correct');

    // Disable all buttons
    choiceButtons.forEach(btn => btn.disabled = true);

    // Trigger confetti from button position
    const rect = button.getBoundingClientRect();
    createConfettiExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // Play win sound
    playWinSound();

    // Animate score
    animateScore(gameState.score, gameState.score + points, points);
    gameState.score += points;

    // Show etymology description
    showEtymologyReveal();

    // Show restart button
    restartBtn.textContent = 'RUN IT BACK';
    actionSection.classList.remove('hidden');
}

// Animate the score counting up
function animateScore(fromScore, toScore, points) {
    const duration = 600; // ms
    const startTime = performance.now();
    const scoreElement = document.getElementById('score');
    const scoreContainer = document.querySelector('.score-display');

    // Add animating class
    scoreElement.classList.add('animating');

    // Create floating points popup
    const popup = document.createElement('span');
    popup.className = 'points-popup';
    popup.textContent = `+${points}`;
    scoreContainer.appendChild(popup);

    // Remove popup after animation
    setTimeout(() => popup.remove(), 1000);

    // Animate the number counting up
    function updateScore(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentScore = Math.round(fromScore + (toScore - fromScore) * easeProgress);

        scoreElement.textContent = currentScore;

        if (progress < 1) {
            requestAnimationFrame(updateScore);
        } else {
            scoreElement.classList.remove('animating');
        }
    }

    requestAnimationFrame(updateScore);
}

// Handle wrong answer
function handleWrongAnswer(button, index) {
    gameState.guessesUsed++;

    // Mark button as wrong (puke emoji)
    button.classList.add('wrong');
    button.disabled = true;

    // Use a heart
    useHeart();

    // Check if out of guesses
    if (gameState.guessesUsed >= gameState.maxGuesses) {
        // Game over - reveal correct answer
        handleGameOver();
    }
}

// Handle game over (all guesses used)
function handleGameOver() {
    gameState.gameOver = true;

    // Find and highlight correct answer
    choiceButtons.forEach((btn, index) => {
        if (gameState.choices[index] === gameState.correctOrigin) {
            btn.classList.add('revealed');
        }
        btn.disabled = true;
    });

    // Show etymology description
    showEtymologyReveal();

    // Show restart button with alternate text
    restartBtn.textContent = 'YES SIR CAN I HAVE ANOTHER';
    actionSection.classList.remove('hidden');
}

// Show the etymology description
function showEtymologyReveal() {
    etymologyText.textContent = gameState.currentWord.etymology;
    etymologyReveal.classList.remove('hidden');
}

// Calculate points based on guess number
function calculatePoints(guessNumber) {
    if (guessNumber === 1) return 10;
    if (guessNumber === 2) return 5;
    if (guessNumber === 3) return 1;
    return 0;
}

// Create confetti explosion effect
function createConfettiExplosion(x, y) {
    const emojis = ['🎉', '✨', '⭐', '🎊', '💫', '🌟', '🔥', '💥'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('span');
        confetti.className = 'confetti';
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        // Random direction
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5);
        const distance = 100 + Math.random() * 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 50; // Bias upward

        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.setProperty('--tx', tx + 'px');
        confetti.style.setProperty('--ty', ty + 'px');

        confettiContainer.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 1500);
    }
}

// Event Listeners
choiceButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => handleChoice(index));
});

restartBtn.addEventListener('click', initGame);

// Start the game when page loads
document.addEventListener('DOMContentLoaded', initGame);
