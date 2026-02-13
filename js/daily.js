// Daily Etymordle - Game Logic

// ============================================
// STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
    DAILY_STATE: 'etymordle_daily_state',
    DAILY_STATS: 'etymordle_daily_stats'
};

// ============================================
// DATE & SEEDING FUNCTIONS
// ============================================

// Get days since epoch (Feb 11, 2026 - launch day!)
function getDayNumber() {
    const epoch = new Date('2026-02-11T00:00:00');
    const now = new Date();
    const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((localMidnight - epoch) / (1000 * 60 * 60 * 24)) + 1; // +1 so today is Puzzle #1
}

// Seeded PRNG (mulberry32)
function seededRandom(seed) {
    let t = seed + 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

// Get today's date string (YYYY-MM-DD)
function getLocalDateString() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

// Get yesterday's date string
function getYesterdayDateString() {
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    return `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
}

// Get today's daily word from the curated list
function getDailyWord() {
    const dayNumber = getDayNumber();
    // Use curated DAILY_WORDS list (day 1 = index 0)
    const wordIndex = (dayNumber - 1) % DAILY_WORDS.length;
    return DAILY_WORDS[wordIndex];
}

// ============================================
// LOCAL STORAGE FUNCTIONS
// ============================================

function loadDailyState() {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_STATE);
    return data ? JSON.parse(data) : null;
}

function saveDailyState(state) {
    localStorage.setItem(STORAGE_KEYS.DAILY_STATE, JSON.stringify(state));
}

function clearDailyState() {
    localStorage.removeItem(STORAGE_KEYS.DAILY_STATE);
}

function loadDailyStats() {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_STATS);
    return data ? JSON.parse(data) : getDefaultStats();
}

function saveDailyStats(stats) {
    localStorage.setItem(STORAGE_KEYS.DAILY_STATS, JSON.stringify(stats));
}

function getDefaultStats() {
    return {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastPlayedDate: null,
        guessDistribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
    };
}

// ============================================
// GAME STATE
// ============================================

let gameState = {
    currentWord: null,
    guessesRemaining: 5,
    guessHistory: [],
    similarityHistory: [],
    gameOver: false,
    won: null
};

// Poop tracker
let poopCount = 0;

// DOM Elements
const elements = {
    dayNumber: document.getElementById('day-number'),
    etymologyHint: document.getElementById('etymology-hint'),
    guessInput: document.getElementById('guess-input'),
    submitBtn: document.getElementById('submit-btn'),
    guessesLeft: document.getElementById('guesses-left'),
    guessesRemaining: document.getElementById('guesses-remaining'),
    guessHistory: document.getElementById('guess-history'),
    resultSection: document.getElementById('result-section'),
    resultMessage: document.getElementById('result-message'),
    elephantArt: document.getElementById('elephant-art'),
    inputSection: document.getElementById('input-section'),
    shareBtn: document.getElementById('share-btn'),
    countdownTimer: document.getElementById('countdown-timer'),
    statsBtn: document.getElementById('stats-btn'),
    statsModal: document.getElementById('stats-modal'),
    modalClose: document.getElementById('modal-close'),
    helpBtn: document.getElementById('help-btn'),
    helpModal: document.getElementById('help-modal'),
    helpClose: document.getElementById('help-close')
};

// ============================================
// LEVENSHTEIN DISTANCE (from game.js)
// ============================================

function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }
    return dp[m][n];
}

function calculateSimilarity(guess, answer) {
    const g = guess.toLowerCase();
    const a = answer.toLowerCase();
    const distance = levenshteinDistance(g, a);
    const maxLength = Math.max(g.length, a.length);
    const similarity = Math.round((1 - distance / maxLength) * 100);
    return Math.max(0, Math.min(100, similarity));
}

function getDistanceInfo(similarity) {
    if (similarity >= 90) return { label: '🔥 Burning hot!', class: 'distance-burning' };
    if (similarity >= 70) return { label: '🌡️ Very warm', class: 'distance-hot' };
    if (similarity >= 50) return { label: '☀️ Getting warmer', class: 'distance-warm' };
    if (similarity >= 30) return { label: '❄️ Cold', class: 'distance-cold' };
    return { label: '🧊 Freezing', class: 'distance-freezing' };
}

// ============================================
// RHYME & HINT SYSTEM (from game.js)
// ============================================

const SNARKY_MESSAGES = [
    "You wish I'd give you a hint, wouldn't you? 😏",
    "A hint? Already? How bold of you.",
    "Nope. You're on your own for this one.",
    "Hints are for the weak. Keep guessing!",
    "The elephant is watching. No hints yet.",
    "🐘 *stares judgmentally* ...no hint.",
    "Try harder. The word isn't going anywhere.",
    "Hint? What hint? I don't see any hints here.",
    "You've got 4 more guesses. Figure it out.",
    "The etymology IS the hint. Read it again!",
    "Nice try, but you'll have to earn your hints.",
    "Patience, grasshopper. Hints come to those who fail.",
    "Error 404: Hint not found.",
    "🎩 The elephant tips his hat... but offers no hint."
];

function findRhyme(word) {
    const w = word.toLowerCase();
    const specificRhymes = {
        'nostalgia': 'neuralgia', 'panic': 'manic', 'enthusiasm': 'orgasm',
        'lethargy': 'clergy', 'tantalize': 'realize', 'jovial': 'trivial',
        'mercurial': 'burial', 'melancholy': 'collie', 'companion': 'canyon',
        'rival': 'survival', 'candidate': 'date', 'villain': 'chillin',
        'dunce': 'once', 'boycott': 'mascot', 'maverick': 'trick',
        'chauvinist': 'list', 'sarcasm': 'chasm', 'slogan': 'shogun',
        'gossip': 'fossil', 'clue': 'blue', 'trivia': 'Olivia',
        'salary': 'gallery', 'bankrupt': 'corrupt', 'fee': 'tree',
        'capital': 'hospital', 'whiskey': 'frisky', 'cappuccino': 'bambino',
        'avocado': 'desperado', 'cantaloupe': 'elope', 'jeans': 'beans',
        'denim': 'venom', 'cardigan': 'Michigan', 'pants': 'ants',
        'quarantine': 'wolverine', 'peninsula': 'Dracula', 'volcano': 'piano',
        'canary': 'scary', 'spa': 'hurrah', 'assassin': 'basin',
        'berserk': 'clerk', 'disaster': 'master', 'porcupine': 'sunshine',
        'hippopotamus': 'ignoramus', 'dandelion': 'stallion', 'leopard': 'shepherd',
        'piano': 'volcano', 'tragedy': 'strategy', 'museum': 'coliseum',
        'orchestra': 'plethora', 'palace': 'chalice', 'pavilion': 'civilian',
        'window': 'limbo', 'corridor': 'matador', 'hazard': 'blizzard',
        'checkmate': 'stalemate', 'trump': 'bump', 'gambit': 'rabbit',
        'buccaneer': 'pioneer', 'filibuster': 'muster', 'maelstrom': 'prom',
        'admiral': 'mineral', 'verdict': 'evict', 'alibi': 'goodbye',
        'culprit': 'permit', 'quiz': 'whiz', 'serendipity': 'pity',
        'robot': 'cannot', 'utopia': 'cornucopia', 'nickname': 'blame',
        'apron': 'patron', 'umpire': 'empire', 'adder': 'bladder',
        'echo': 'gecko', 'narcissist': 'exist', 'atlas': 'alas',
        'cereal': 'ethereal', 'martial': 'partial', 'aftermath': 'bath',
        'bedlam': 'jam', 'belfry': 'selfie', 'blackmail': 'detail',
        'calculate': 'late', 'cancel': 'chancel', 'canter': 'banter',
        'captain': 'satin', 'chapel': 'apple', 'charlatan': 'caravan',
        'clinic': 'cynic', 'clumsy': 'flimsy', 'cobalt': 'fault',
        'coconut': 'but', 'comrade': 'parade', 'constable': 'unstable',
        'copper': 'hopper', 'curfew': 'few', 'daisy': 'crazy',
        'glamour': 'hammer', 'gazette': 'jet', 'groggy': 'foggy',
        'handicap': 'trap', 'husband': 'band', 'infantry': 'chivalry',
        'journey': 'attorney', 'magazine': 'routine', 'mortgage': 'shortage',
        'noon': 'moon', 'orange': 'door-hinge', 'pamphlet': 'hamlet',
        'peculiar': 'familiar', 'purple': 'turtle', 'sandwich': 'which',
        'sideburns': 'returns', 'silhouette': 'cigarette', 'sincere': 'frontier',
        'tawdry': 'laundry', 'thesaurus': 'brontosaurus', 'threshold': 'behold',
        'trivial': 'jovial', 'tuxedo': 'torpedo', 'umbrella': 'Cinderella',
        'vandal': 'sandal', 'wardrobe': 'probe', 'zeal': 'deal'
    };

    if (specificRhymes[w]) return specificRhymes[w];

    const endingRhymes = {
        'ly': 'free', 'er': 'sister', 'or': 'door', 'al': 'pal',
        'le': 'full', 'ty': 'free', 'ry': 'free', 'ny': 'funny',
        'cy': 'free', 'gy': 'energy', 'py': 'happy', 'dy': 'ready'
    };
    const lastTwo = w.slice(-2);
    if (endingRhymes[lastTwo]) return endingRhymes[lastTwo];

    return 'something';
}

function getProgressiveHint(word, wrongGuessNumber) {
    const w = word.toLowerCase();
    switch (wrongGuessNumber) {
        case 1:
            return SNARKY_MESSAGES[Math.floor(Math.random() * SNARKY_MESSAGES.length)];
        case 2:
            return `It starts with the letter "${w[0].toUpperCase()}"`;
        case 3:
            return `Rhymes with "${findRhyme(w)}"`;
        case 4:
            let revealed = w[0].toUpperCase();
            for (let i = 1; i < w.length - 1; i++) revealed += ' _';
            revealed += ' ' + w[w.length - 1].toUpperCase();
            return `Pattern: ${revealed} (${w.length} letters)`;
        case 5:
            let pattern = '';
            for (let i = 0; i < w.length; i++) {
                pattern += (i % 2 === 0) ? w[i].toUpperCase() : '_';
            }
            return `Almost there: ${pattern}`;
        default:
            return '';
    }
}

// ============================================
// TOILET/POOP SYSTEM (from game.js)
// ============================================

let toiletElement = null;
let flushSound = null;
let activeDragPoop = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function initFlushSound() {
    if (!flushSound) {
        flushSound = new Audio('assets/audio/flush.mp3');
        flushSound.volume = 0.7;
    }
}

function createToilet() {
    if (toiletElement) return;
    toiletElement = document.createElement('div');
    toiletElement.className = 'toilet';
    toiletElement.innerHTML = '🚽';
    toiletElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 4rem;
        z-index: 10000;
        cursor: default;
        transition: transform 0.1s ease;
        animation: toiletAppear 0.5s ease-out;
    `;
    document.body.appendChild(toiletElement);
    initFlushSound();
}

function removeToilet() {
    if (toiletElement) {
        toiletElement.style.animation = 'toiletDisappear 0.3s ease-in forwards';
        setTimeout(() => {
            if (toiletElement && toiletElement.parentNode) {
                toiletElement.parentNode.removeChild(toiletElement);
            }
            toiletElement = null;
        }, 300);
    }
}

function checkPoopsRemaining() {
    const poops = document.querySelectorAll('.session-poop');
    if (poops.length === 0) removeToilet();
}

function flushToilet(poopElement) {
    if (!toiletElement) return;
    if (flushSound) {
        flushSound.currentTime = 0;
        flushSound.play().catch(() => {});
    }
    toiletElement.style.animation = 'none';
    toiletElement.offsetHeight;
    toiletElement.style.animation = 'toiletShake 0.5s ease-in-out';
    poopElement.style.transition = 'all 0.3s ease-in';
    poopElement.style.transform = 'scale(0) rotate(720deg)';
    poopElement.style.opacity = '0';
    setTimeout(() => {
        if (poopElement.parentNode) poopElement.parentNode.removeChild(poopElement);
        poopCount--;
        checkPoopsRemaining();
    }, 300);
}

function isOverToilet(x, y) {
    if (!toiletElement) return false;
    const rect = toiletElement.getBoundingClientRect();
    const padding = 20;
    return x >= rect.left - padding && x <= rect.right + padding &&
           y >= rect.top - padding && y <= rect.bottom + padding;
}

function startDragPoop(poop, clientX, clientY) {
    createToilet();
    activeDragPoop = poop;
    const rect = poop.getBoundingClientRect();
    dragOffsetX = clientX - rect.left;
    dragOffsetY = clientY - rect.top;
    poop.style.cursor = 'grabbing';
    poop.style.transition = 'none';
    poop.style.zIndex = '10001';
    poop.style.left = rect.left + 'px';
    poop.style.top = rect.top + 'px';
    poop.style.right = 'auto';
    poop.style.bottom = 'auto';
}

function moveDragPoop(clientX, clientY) {
    if (!activeDragPoop) return;
    activeDragPoop.style.left = (clientX - dragOffsetX) + 'px';
    activeDragPoop.style.top = (clientY - dragOffsetY) + 'px';
    if (toiletElement) {
        toiletElement.style.transform = isOverToilet(clientX, clientY)
            ? 'translateX(-50%) scale(1.2)'
            : 'translateX(-50%) scale(1)';
    }
}

function endDragPoop(clientX, clientY) {
    if (!activeDragPoop) return;
    const poop = activeDragPoop;
    activeDragPoop = null;
    if (isOverToilet(clientX, clientY)) {
        flushToilet(poop);
    } else {
        poop.style.cursor = 'pointer';
        poop.style.zIndex = '9999';
        removeToilet();
    }
}

function makePoopDraggable(poop) {
    poop.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startDragPoop(poop, e.clientX, e.clientY);
    });
    poop.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        startDragPoop(poop, touch.clientX, touch.clientY);
    }, { passive: false });
    poop.addEventListener('touchmove', (e) => {
        if (activeDragPoop === poop) {
            e.preventDefault();
            const touch = e.touches[0];
            moveDragPoop(touch.clientX, touch.clientY);
        }
    }, { passive: false });
}

document.addEventListener('mousemove', (e) => {
    if (activeDragPoop) moveDragPoop(e.clientX, e.clientY);
});
document.addEventListener('mouseup', (e) => {
    if (activeDragPoop) endDragPoop(e.clientX, e.clientY);
});
document.addEventListener('touchend', (e) => {
    if (activeDragPoop) {
        const touch = e.changedTouches[0];
        endDragPoop(touch.clientX, touch.clientY);
    }
});

function addPoop() {
    poopCount++;
    const poop = document.createElement('div');
    poop.className = 'session-poop';
    poop.textContent = '💩';
    const isLeft = poopCount % 2 === 1;
    poop.style.position = 'fixed';
    if (isLeft) {
        poop.style.left = Math.random() * 80 + 'px';
    } else {
        poop.style.right = Math.random() * 80 + 'px';
    }
    const row = Math.floor((poopCount - 1) / 2);
    poop.style.bottom = (10 + row * 50) + 'px';
    poop.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    poop.style.fontSize = (1.5 + Math.random() * 0.5) + 'rem';
    poop.style.zIndex = '9999';
    poop.style.animation = 'poopDrop 0.5s ease-out';
    poop.style.cursor = 'pointer';
    document.body.appendChild(poop);
    makePoopDraggable(poop);
}

// ============================================
// GAME INITIALIZATION
// ============================================

function initDailyGame() {
    const today = getLocalDateString();
    const dayNumber = getDayNumber();
    const savedState = loadDailyState();

    // Update puzzle number
    elements.dayNumber.textContent = dayNumber;

    if (savedState && savedState.date === today) {
        // Restore previous session
        restoreGameState(savedState);
        if (savedState.gameOver) {
            showCompletedGameUI(savedState.won);
        }
    } else {
        // New day, new game
        clearDailyState();
        startNewDailyGame();
    }

    // Start countdown
    startCountdown();
}

function startNewDailyGame() {
    if (typeof clearActiveAnimation === 'function') {
        clearActiveAnimation();
    }

    gameState.currentWord = getDailyWord();
    gameState.guessesRemaining = 5;
    gameState.guessHistory = [];
    gameState.similarityHistory = [];
    gameState.gameOver = false;
    gameState.won = null;

    // Update UI
    elements.etymologyHint.textContent = gameState.currentWord.etymology;
    elements.guessesLeft.textContent = gameState.guessesRemaining;
    elements.guessHistory.innerHTML = '';
    elements.guessInput.value = '';
    elements.guessInput.disabled = false;
    elements.submitBtn.disabled = false;
    elements.resultSection.classList.add('hidden');
    elements.inputSection.style.display = 'flex';
    elements.elephantArt.classList.remove('elephant-win', 'elephant-lose');
    elements.resultMessage.classList.remove('win', 'lose');
    elements.resultMessage.textContent = '';
    elements.guessInput.focus();

    // Save initial state
    saveDailyState({
        date: getLocalDateString(),
        guessHistory: [],
        similarityHistory: [],
        guessesRemaining: 5,
        gameOver: false,
        won: null
    });
}

function restoreGameState(savedState) {
    if (typeof clearActiveAnimation === 'function') {
        clearActiveAnimation();
    }

    gameState.currentWord = getDailyWord();
    gameState.guessesRemaining = savedState.guessesRemaining;
    gameState.guessHistory = savedState.guessHistory || [];
    gameState.similarityHistory = savedState.similarityHistory || [];
    gameState.gameOver = savedState.gameOver;
    gameState.won = savedState.won;

    // Update UI
    elements.etymologyHint.textContent = gameState.currentWord.etymology;
    elements.guessesLeft.textContent = gameState.guessesRemaining;
    elements.guessHistory.innerHTML = '';

    // Rebuild guess history display
    gameState.guessHistory.forEach((guess, index) => {
        const similarity = gameState.similarityHistory[index] || 0;
        const distanceInfo = getDistanceInfo(similarity);
        const wrongGuessNumber = index + 1;
        addGuessToHistoryDisplay(guess, similarity, distanceInfo, wrongGuessNumber);
        // Add poops for wrong guesses
        if (guess.toLowerCase() !== gameState.currentWord.word.toLowerCase()) {
            addPoop();
        }
    });

    if (!gameState.gameOver) {
        elements.guessInput.disabled = false;
        elements.submitBtn.disabled = false;
        elements.inputSection.style.display = 'flex';
        elements.resultSection.classList.add('hidden');
        elements.guessInput.focus();
    }
}

function showCompletedGameUI(won) {
    elements.guessInput.disabled = true;
    elements.submitBtn.disabled = true;
    elements.inputSection.style.display = 'none';
    elements.guessesRemaining.style.display = 'none';
    elements.resultSection.classList.remove('hidden');

    if (won) {
        elements.resultMessage.textContent = 'Congratulations!';
        elements.resultMessage.classList.add('win');
        showWinAnimation();
    } else {
        elements.resultMessage.textContent = `The word was: ${gameState.currentWord.word.toUpperCase()}`;
        elements.resultMessage.classList.add('lose');
        showLoseAnimation(gameState.currentWord.word);
    }
}

// ============================================
// GUESS SUBMISSION
// ============================================

function addGuessToHistoryDisplay(guess, similarity, distanceInfo, wrongGuessNumber) {
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
    elements.guessHistory.insertBefore(guessItem, elements.guessHistory.firstChild);
}

function submitGuess() {
    if (gameState.gameOver) return;

    const guess = elements.guessInput.value.trim().toLowerCase();

    if (!guess) {
        elements.guessInput.focus();
        return;
    }

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
        gameState.gameOver = true;
        gameState.won = true;

        // Calculate similarity for the winning guess (100%)
        gameState.similarityHistory.push(100);

        // Update stats
        const stats = loadDailyStats();
        stats.gamesPlayed++;
        stats.gamesWon++;
        const guessesUsed = 5 - gameState.guessesRemaining + 1;
        stats.guessDistribution[guessesUsed.toString()]++;
        updateStreak(true, stats);
        saveDailyStats(stats);

        // Save state
        saveDailyState({
            date: getLocalDateString(),
            guessHistory: gameState.guessHistory,
            similarityHistory: gameState.similarityHistory,
            guessesRemaining: gameState.guessesRemaining,
            gameOver: true,
            won: true
        });

        showCompletedGameUI(true);
        return;
    }

    // Wrong guess
    gameState.guessesRemaining--;
    elements.guessesLeft.textContent = gameState.guessesRemaining;

    const wrongGuessNumber = 5 - gameState.guessesRemaining;
    const similarity = calculateSimilarity(guess, gameState.currentWord.word);
    const distanceInfo = getDistanceInfo(similarity);

    gameState.similarityHistory.push(similarity);
    addGuessToHistoryDisplay(guess, similarity, distanceInfo, wrongGuessNumber);
    addPoop();

    elements.guessInput.value = '';
    elements.guessInput.focus();

    // Save state
    saveDailyState({
        date: getLocalDateString(),
        guessHistory: gameState.guessHistory,
        similarityHistory: gameState.similarityHistory,
        guessesRemaining: gameState.guessesRemaining,
        gameOver: false,
        won: null
    });

    // Check if out of guesses
    if (gameState.guessesRemaining <= 0) {
        gameState.gameOver = true;
        gameState.won = false;

        // Update stats
        const stats = loadDailyStats();
        stats.gamesPlayed++;
        updateStreak(false, stats);
        saveDailyStats(stats);

        // Save final state
        saveDailyState({
            date: getLocalDateString(),
            guessHistory: gameState.guessHistory,
            similarityHistory: gameState.similarityHistory,
            guessesRemaining: 0,
            gameOver: true,
            won: false
        });

        showCompletedGameUI(false);
    }
}

function shakeInput() {
    elements.guessInput.style.animation = 'none';
    elements.guessInput.offsetHeight;
    elements.guessInput.style.animation = 'shake 0.5s ease-in-out';
}

// ============================================
// STREAK TRACKING
// ============================================

function updateStreak(won, stats) {
    const today = getLocalDateString();
    const yesterday = getYesterdayDateString();

    if (won) {
        if (stats.lastPlayedDate === yesterday) {
            stats.currentStreak++;
        } else if (stats.lastPlayedDate !== today) {
            stats.currentStreak = 1;
        }
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
    } else {
        stats.currentStreak = 0;
    }

    stats.lastPlayedDate = today;
    return stats;
}

// ============================================
// COUNTDOWN TIMER
// ============================================

function startCountdown() {
    function updateCountdown() {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = tomorrow - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        elements.countdownTimer.textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// SHARE FEATURE
// ============================================

function generateShareText() {
    const dayNumber = getDayNumber();
    const word = gameState.currentWord.word.toUpperCase();
    const etymology = gameState.currentWord.etymology;

    let text = `ETYMORDLE #${dayNumber} `;
    text += gameState.won ? `${6 - gameState.guessesRemaining}/5` : 'X/5';

    // Add streak indicator
    const stats = loadDailyStats();
    if (stats.currentStreak >= 3) text += ' 🔥';

    // Add word and etymology
    text += `\n\n📚 ${word}\n${etymology}`;

    text += '\n\nhttps://etymordle.samuelwalder.com/daily.html';
    return text;
}

function shareResults() {
    const shareText = generateShareText();

    if (navigator.share) {
        navigator.share({
            title: 'ETYMORDLE',
            text: shareText
        }).catch(() => copyToClipboard(shareText));
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied to clipboard!');
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ============================================
// STATS MODAL
// ============================================

function showStatsModal() {
    const stats = loadDailyStats();

    document.getElementById('stat-played').textContent = stats.gamesPlayed;
    document.getElementById('stat-win-pct').textContent =
        stats.gamesPlayed > 0 ? Math.round(stats.gamesWon / stats.gamesPlayed * 100) : 0;
    document.getElementById('stat-streak').textContent = stats.currentStreak;
    document.getElementById('stat-max-streak').textContent = stats.maxStreak;

    renderDistributionChart(stats.guessDistribution);

    elements.statsModal.classList.remove('hidden');
}

function hideStatsModal() {
    elements.statsModal.classList.add('hidden');
}

function renderDistributionChart(distribution) {
    const container = document.getElementById('distribution-chart');
    const maxValue = Math.max(...Object.values(distribution), 1);

    container.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        const count = distribution[i.toString()] || 0;
        const percentage = (count / maxValue) * 100;

        const row = document.createElement('div');
        row.className = 'distribution-row';
        row.innerHTML = `
            <span class="dist-label">${i}</span>
            <div class="dist-bar-container">
                <div class="dist-bar" style="width: ${Math.max(percentage, 7)}%">
                    <span class="dist-count">${count}</span>
                </div>
            </div>
        `;
        container.appendChild(row);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

elements.submitBtn.addEventListener('click', submitGuess);

elements.guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitGuess();
});

elements.shareBtn.addEventListener('click', shareResults);

elements.statsBtn.addEventListener('click', showStatsModal);
elements.modalClose.addEventListener('click', hideStatsModal);

elements.helpBtn.addEventListener('click', () => {
    elements.helpModal.classList.remove('hidden');
});
elements.helpClose.addEventListener('click', () => {
    elements.helpModal.classList.add('hidden');
});

// Close modals on outside click
elements.statsModal.addEventListener('click', (e) => {
    if (e.target === elements.statsModal) hideStatsModal();
});
elements.helpModal.addEventListener('click', (e) => {
    if (e.target === elements.helpModal) {
        elements.helpModal.classList.add('hidden');
    }
});

// ============================================
// CSS ANIMATIONS (injected)
// ============================================

const dailyStyles = document.createElement('style');
dailyStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
    @keyframes poopDrop {
        0% { opacity: 0; transform: translateY(-50px) rotate(0deg); }
        60% { opacity: 1; transform: translateY(10px) rotate(10deg); }
        100% { opacity: 1; transform: translateY(0) rotate(var(--final-rotation, 0deg)); }
    }
    .session-poop {
        pointer-events: auto;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
    }
    .session-poop:hover { transform: scale(1.2); }
    @keyframes toiletAppear {
        0% { opacity: 0; transform: translateX(-50%) scale(0) rotate(-180deg); }
        100% { opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); }
    }
    @keyframes toiletDisappear {
        0% { opacity: 1; transform: translateX(-50%) scale(1); }
        100% { opacity: 0; transform: translateX(-50%) scale(0) translateY(50px); }
    }
    @keyframes toiletShake {
        0%, 100% { transform: translateX(-50%) rotate(0deg); }
        10% { transform: translateX(-50%) rotate(-10deg); }
        20% { transform: translateX(-50%) rotate(10deg); }
        30% { transform: translateX(-50%) rotate(-10deg); }
        40% { transform: translateX(-50%) rotate(10deg); }
        50% { transform: translateX(-50%) rotate(-5deg); }
        60% { transform: translateX(-50%) rotate(5deg); }
        70% { transform: translateX(-50%) rotate(-5deg); }
        80% { transform: translateX(-50%) rotate(5deg); }
        90% { transform: translateX(-50%) rotate(-2deg); }
    }
    .toilet { filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); }
`;
document.head.appendChild(dailyStyles);

// ============================================
// START GAME
// ============================================

document.addEventListener('DOMContentLoaded', initDailyGame);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initDailyGame();
}
