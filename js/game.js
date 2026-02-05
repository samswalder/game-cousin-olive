// Etymordle - Game Logic

// Game state
let gameState = {
    currentWord: null,
    guessesRemaining: 5,
    guessHistory: [],
    gameOver: false,
    usedWords: [],
    totalWrongGuesses: 0  // Persists across games for the session
};

// Poop tracker - persists for entire session
let poopCount = 0;

// DOM Elements
const elements = {
    etymologyHint: document.getElementById('etymology-hint'),
    guessInput: document.getElementById('guess-input'),
    submitBtn: document.getElementById('submit-btn'),
    guessesLeft: document.getElementById('guesses-left'),
    guessHistory: document.getElementById('guess-history'),
    resultSection: document.getElementById('result-section'),
    resultMessage: document.getElementById('result-message'),
    elephantArt: document.getElementById('elephant-art'),
    playAgainBtn: document.getElementById('play-again-btn'),
    playAgainTop: document.getElementById('play-again-top'),
    inputSection: document.getElementById('input-section')
};

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // Create a 2D array to store distances
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Initialize first column
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }

    // Initialize first row
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // deletion
                    dp[i][j - 1],     // insertion
                    dp[i - 1][j - 1]  // substitution
                );
            }
        }
    }

    return dp[m][n];
}

// Calculate similarity percentage (0-100)
function calculateSimilarity(guess, answer) {
    const g = guess.toLowerCase();
    const a = answer.toLowerCase();

    const distance = levenshteinDistance(g, a);
    const maxLength = Math.max(g.length, a.length);

    // Convert to percentage (0 distance = 100% similar)
    const similarity = Math.round((1 - distance / maxLength) * 100);

    return Math.max(0, Math.min(100, similarity));
}

// Get distance label and class based on similarity
function getDistanceInfo(similarity) {
    if (similarity >= 90) {
        return { label: '🔥 Burning hot!', class: 'distance-burning' };
    } else if (similarity >= 70) {
        return { label: '🌡️ Very warm', class: 'distance-hot' };
    } else if (similarity >= 50) {
        return { label: '☀️ Getting warmer', class: 'distance-warm' };
    } else if (similarity >= 30) {
        return { label: '❄️ Cold', class: 'distance-cold' };
    } else {
        return { label: '🧊 Freezing', class: 'distance-freezing' };
    }
}

// Generate progressive hints based on wrong guess number (1-5)
function getProgressiveHint(word, wrongGuessNumber) {
    const w = word.toLowerCase();

    switch (wrongGuessNumber) {
        case 1:
            // Tiny hint: just the word length
            return `The word has ${w.length} letters`;
        case 2:
            // Small hint: first letter
            return `It starts with "${w[0].toUpperCase()}"`;
        case 3:
            // Medium hint: first and last letter
            return `Starts with "${w[0].toUpperCase()}", ends with "${w[w.length - 1].toUpperCase()}"`;
        case 4:
            // Bigger hint: first two and last letter
            return `Starts with "${w[0].toUpperCase()}${w[1].toUpperCase()}", ends with "${w[w.length - 1].toUpperCase()}"`;
        case 5:
            // Big hint: reveal some letters (every other letter shown)
            let revealed = '';
            for (let i = 0; i < w.length; i++) {
                if (i % 2 === 0) {
                    revealed += w[i].toUpperCase();
                } else {
                    revealed += '_';
                }
            }
            return `The word looks like: ${revealed}`;
        default:
            return '';
    }
}

// Add a poop emoji to the screen
function addPoop() {
    poopCount++;
    const poop = document.createElement('div');
    poop.className = 'session-poop';
    poop.textContent = '💩';

    // Alternate left and right sides
    const isLeft = poopCount % 2 === 1;
    poop.style.position = 'fixed';

    if (isLeft) {
        poop.style.left = Math.random() * 80 + 'px';
    } else {
        poop.style.right = Math.random() * 80 + 'px';
    }

    // Stack them from bottom to top
    const row = Math.floor((poopCount - 1) / 2);
    poop.style.bottom = (10 + row * 50) + 'px';

    // Add some randomness to rotation and size
    poop.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    poop.style.fontSize = (1.5 + Math.random() * 0.5) + 'rem';
    poop.style.zIndex = '9999';
    poop.style.animation = 'poopDrop 0.5s ease-out';

    document.body.appendChild(poop);
}

// Pick a random word (avoiding recently used)
function pickRandomWord() {
    // Filter out recently used words
    const availableWords = WORDS.filter(w => !gameState.usedWords.includes(w.word));

    // If we've used all words, reset
    if (availableWords.length === 0) {
        gameState.usedWords = [];
        return WORDS[Math.floor(Math.random() * WORDS.length)];
    }

    return availableWords[Math.floor(Math.random() * availableWords.length)];
}

// Start a new game
function startNewGame() {
    // Clear any running animations from previous game
    if (typeof clearActiveAnimation === 'function') {
        clearActiveAnimation();
    }

    // Pick a random word
    gameState.currentWord = pickRandomWord();
    gameState.guessesRemaining = 5;
    gameState.guessHistory = [];
    gameState.gameOver = false;

    // Add to used words
    gameState.usedWords.push(gameState.currentWord.word);

    // Keep only last 10 used words
    if (gameState.usedWords.length > 10) {
        gameState.usedWords.shift();
    }

    // Update UI
    elements.etymologyHint.textContent = gameState.currentWord.etymology;
    elements.guessesLeft.textContent = gameState.guessesRemaining;
    elements.guessHistory.innerHTML = '';
    elements.guessInput.value = '';
    elements.guessInput.disabled = false;
    elements.submitBtn.disabled = false;
    elements.resultSection.classList.add('hidden');
    elements.playAgainTop.classList.add('hidden');
    elements.inputSection.style.display = 'flex';
    elements.elephantArt.classList.remove('elephant-win', 'elephant-lose');
    elements.resultMessage.classList.remove('win', 'lose');
    elements.resultMessage.textContent = '';  // Clear any previous message
    elements.guessInput.focus();
}

// Add a guess to the history display with progressive hint (prepend so newest is on top)
function addGuessToHistory(guess, similarity, distanceInfo, wrongGuessNumber) {
    const hint = getProgressiveHint(gameState.currentWord.word, wrongGuessNumber);

    const guessItem = document.createElement('div');
    guessItem.className = 'guess-item';
    guessItem.innerHTML = `
        <div class="guess-main">
            <span class="guess-word">${guess}</span>
            <span class="guess-distance ${distanceInfo.class}">${similarity}% - ${distanceInfo.label}</span>
        </div>
        <div class="guess-hint">💡 HINT: ${hint}</div>
    `;
    // Prepend so newest guess appears at top
    elements.guessHistory.insertBefore(guessItem, elements.guessHistory.firstChild);
}

// Handle guess submission
function submitGuess() {
    if (gameState.gameOver) return;

    const guess = elements.guessInput.value.trim().toLowerCase();

    // Validate input
    if (!guess) {
        elements.guessInput.focus();
        return;
    }

    // Check if already guessed
    if (gameState.guessHistory.includes(guess)) {
        shakeInput();
        elements.guessInput.value = '';
        elements.guessInput.focus();
        return;
    }

    // Add to history
    gameState.guessHistory.push(guess);

    // Check if correct
    if (guess === gameState.currentWord.word.toLowerCase()) {
        // WIN!
        endGame(true);
        return;
    }

    // Wrong guess
    gameState.guessesRemaining--;
    gameState.totalWrongGuesses++;
    elements.guessesLeft.textContent = gameState.guessesRemaining;

    // Calculate which wrong guess this is (1-5)
    const wrongGuessNumber = 5 - gameState.guessesRemaining;

    // Calculate similarity
    const similarity = calculateSimilarity(guess, gameState.currentWord.word);
    const distanceInfo = getDistanceInfo(similarity);

    // Add to history display with progressive hint
    addGuessToHistory(guess, similarity, distanceInfo, wrongGuessNumber);

    // Add a poop emoji to the screen!
    addPoop();

    // Clear input
    elements.guessInput.value = '';
    elements.guessInput.focus();

    // Check if out of guesses
    if (gameState.guessesRemaining <= 0) {
        endGame(false);
    }
}

// Shake input animation for invalid guess
function shakeInput() {
    elements.guessInput.style.animation = 'none';
    elements.guessInput.offsetHeight; // Trigger reflow
    elements.guessInput.style.animation = 'shake 0.5s ease-in-out';
}

// End the game
function endGame(won) {
    gameState.gameOver = true;
    elements.guessInput.disabled = true;
    elements.submitBtn.disabled = true;
    elements.inputSection.style.display = 'none';

    // Show result section and top play again button
    elements.resultSection.classList.remove('hidden');
    elements.playAgainTop.classList.remove('hidden');

    if (won) {
        elements.resultMessage.textContent = 'Congratulations!';
        showWinAnimation();
    } else {
        showLoseAnimation(gameState.currentWord.word);
    }
}

// Event Listeners
elements.submitBtn.addEventListener('click', submitGuess);

elements.guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitGuess();
    }
});

elements.playAgainBtn.addEventListener('click', startNewGame);
elements.playAgainTop.addEventListener('click', startNewGame);

// Add shake animation CSS and poop animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
    @keyframes poopDrop {
        0% {
            opacity: 0;
            transform: translateY(-50px) rotate(0deg);
        }
        60% {
            opacity: 1;
            transform: translateY(10px) rotate(10deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotate(var(--final-rotation, 0deg));
        }
    }
    .session-poop {
        pointer-events: none;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
`;
document.head.appendChild(shakeStyle);

// Start the game when page loads
document.addEventListener('DOMContentLoaded', startNewGame);

// Also start if DOM is already ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startNewGame();
}
