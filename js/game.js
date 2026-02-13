// Etymordle - Game Logic

// Game state
let gameState = {
    currentWord: null,
    guessesRemaining: 5,
    guessHistory: [],
    gameOver: false,
    won: false,
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
    topButtons: document.getElementById('top-buttons'),
    inputSection: document.getElementById('input-section'),
    shareBtn: document.getElementById('share-btn'),
    shareBtnTop: document.getElementById('share-btn-top')
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

// Rhyme dictionary - maps word endings to rhyming words
const RHYME_MAP = {
    // Common endings and their rhymes
    'gia': 'nostalgia → Georgia',
    'ic': 'panic → magic',
    'asm': 'enthusiasm → sarcasm',
    'gy': 'lethargy → energy',
    'ize': 'tantalize → surprise',
    'ial': 'jovial →rial',
    'ial2': 'mercurial → burial',
    'oly': 'melancholy → jolly',
    'ion': 'companion → onion',
    'al': 'rival → arrival',
    'ate': 'candidate → fate',
    'ain': 'villain →ain',
    'nce': 'dunce → once',
    'ott': 'boycott → hot',
    'ick': 'maverick → trick',
    'ist': 'chauvinist → fist',
    'asm2': 'sarcasm → chasm',
    'gan': 'slogan → logan',
    'ip': 'gossip → ship',
    'ue': 'clue → true',
    'ia': 'trivia → via',
    'ary': 'salary → canary',
    'upt': 'bankrupt → abrupt',
    'ee': 'fee → free',
    'ary2': 'pecuniary →iary',
    'al2': 'capital →ital',
    'ey': 'whiskey → risky',
    'ino': 'cappuccino → casino',
    'ado': 'avocado → bravado',
    'upe': 'cantaloupe → troop',
    'eans': 'jeans → means',
    'im': 'denim → him',
    'an': 'cardigan → began',
    'ants': 'pants → ants',
    'at': 'cravat → hat',
    'ine': 'quarantine → mine',
    'ula': 'peninsula → hula',
    'ano': 'volcano →rano',
    'ary3': 'canary → fairy',
    'a': 'spa → la',
    'in': 'assassin → sin',
    'erk': 'berserk → work',
    'ate2': 'decimate → late',
    'ine2': 'deadline → fine',
    'ance': 'freelance → dance',
    'ia2': 'malaria → area',
    'ine3': 'vaccine → machine',
    'ic2': 'lunatic → trick',
    'er': 'disaster → faster',
    'ine4': 'porcupine → spine',
    'us': 'hippopotamus → bus',
    'ion2': 'dandelion → lion',
    'ard': 'leopard → heard',
    'ano2': 'piano → soprano',
    'edy': 'tragedy → remedy',
    'um': 'museum → boredom',
    'ra': 'orchestra → extra',
    'ace': 'palace → malice',
    'ion3': 'pavilion → million',
    'ow': 'window → shadow',
    'or': 'corridor → door',
    'ard2': 'hazard → wizard',
    'ate3': 'checkmate → fate',
    'ump': 'trump → jump',
    'it': 'gambit → bit',
    'eer': 'buccaneer → beer',
    'er2': 'filibuster → cluster',
    'om': 'maelstrom → from',
    'al3': 'admiral → pal',
    'ict': 'verdict → strict',
    'i': 'alibi → fly',
    'it2': 'culprit → hit',
    'iz': 'quiz → fizz',
    'ity': 'serendipity → city',
    'ot': 'robot → lot',
    'ia3': 'utopia → cornucopia',
    'ame': 'nickname → fame',
    'on': 'apron → ron',
    'ire': 'umpire → fire',
    'er3': 'adder → ladder',
    'o': 'echo → go',
    'ist2': 'narcissist → mist',
    'as': 'atlas → gas',
    'eal': 'cereal → real',
    'al4': 'martial → partial'
};

// Find a rhyming word for the target
function findRhyme(word) {
    const w = word.toLowerCase();

    // Check for specific words first
    const specificRhymes = {
        'nostalgia': 'neuralgia',
        'panic': 'manic',
        'enthusiasm': 'orgasm',
        'lethargy': 'clergy',
        'tantalize': 'realize',
        'jovial': 'rial',
        'mercurial': 'burial',
        'melancholy': 'collie',
        'companion': 'canyon',
        'rival': 'survival',
        'candidate': 'date',
        'villain': 'chillin',
        'dunce': 'once',
        'boycott': 'mascot',
        'maverick': 'erick',
        'chauvinist': 'list',
        'sarcasm': 'chasm',
        'slogan': 'shogun',
        'gossip': 'fossil',
        'clue': 'blue',
        'trivia': 'Olivia',
        'salary': 'gallery',
        'bankrupt': 'corrupt',
        'fee': 'tree',
        'pecuniary': 'iary',
        'capital': 'hospital',
        'whiskey': 'frisky',
        'cappuccino': 'bambino',
        'avocado': 'desperado',
        'cantaloupe': 'elope',
        'jeans': 'beans',
        'denim': 'venom',
        'cardigan': 'Michigan',
        'pants': 'ants',
        'cravat': 'combat',
        'quarantine': 'wolverine',
        'peninsula': 'Dracula',
        'volcano': 'piano',
        'canary': 'scary',
        'spa': 'hurrah',
        'assassin': 'basin',
        'berserk': 'clerk',
        'decimate': 'imate',
        'deadline': 'headline',
        'freelance': 'romance',
        'malaria': 'hysteria',
        'vaccine': 'marine',
        'lunatic': 'fanatic',
        'disaster': 'master',
        'porcupine': 'sunshine',
        'hippopotamus': 'ignoramus',
        'dandelion': 'stallion',
        'leopard': 'shepherd',
        'piano': 'volcano',
        'tragedy': 'strategy',
        'museum': 'coliseum',
        'orchestra': 'plethora',
        'palace': 'chalice',
        'pavilion': 'civilian',
        'window': 'limbo',
        'corridor': 'matador',
        'hazard': 'blizzard',
        'checkmate': 'stalemate',
        'trump': 'bump',
        'gambit': 'rabbit',
        'buccaneer': 'pioneer',
        'filibuster': 'muster',
        'maelstrom': 'prom',
        'admiral': 'mineral',
        'verdict': 'evict',
        'alibi': 'alibi → goodbye',
        'culprit': 'permit',
        'quiz': 'whiz',
        'serendipity': 'pity',
        'robot': 'cannot',
        'utopia': 'cornucopia',
        'nickname': 'blame',
        'apron': 'patron',
        'umpire': 'empire',
        'adder': 'bladder',
        'echo': 'gecko',
        'narcissist': 'exist',
        'atlas': 'alas',
        'cereal': 'ethereal',
        'martial': 'partial',
        'aftermath': 'bath',
        'bedlam': 'jam',
        'belfry': 'selfie',
        'blackmail': 'detail',
        'blurb': 'curb',
        'brouhaha': 'ooh la la',
        'calculate': 'ulate',
        'cancel': 'chancel',
        'canter': 'banter',
        'captain': 'satin',
        'chapel': 'apple',
        'charlatan': 'caravan',
        'clinic': 'cynic',
        'clumsy': 'flimsy',
        'cobalt': 'fault',
        'coconut': 'but',
        'comrade': 'parade',
        'constable': 'unstable',
        'copper': 'hopper',
        'curfew': 'few',
        'cynic': 'clinic',
        'daisy': 'crazy',
        'glamour': 'hammer',
        'gazette': 'jet',
        'groggy': 'foggy',
        'handicap': 'trap',
        'husband': 'band',
        'infantry': 'chivalry',
        'journey': 'attorney',
        'magazine': 'routine',
        'mortgage': 'shortage',
        'noon': 'moon',
        'orange': 'door-hinge',
        'pamphlet': 'hamlet',
        'peculiar': 'familiar',
        'purple': 'turtle',
        'sandwich': 'which',
        'sideburns': 'returns',
        'silhouette': 'cigarette',
        'sincere': 'frontier',
        'tawdry': 'laundry',
        'thesaurus': 'brontosaurus',
        'threshold': 'behold',
        'trivial': 'jovial',
        'tuxedo': 'torpedo',
        'umbrella': 'Cinderella',
        'vandal': 'sandal',
        'wardrobe': 'probe',
        'abracadabra': 'algebra',
        'accolade': 'parade',
        'cabal': 'canal',
        'cadence': 'fence',
        'carousel': 'carousel → gazelle',
        'caterpillar': 'gorilla',
        'caucus': 'raucous',
        'chancellor': 'counselor',
        'chapter': 'after',
        'cockpit': 'armpit',
        'bonfire': 'vampire',
        'dachshund': 'hound',
        'fiasco': 'disco',
        'galore': 'shore',
        'goodbye': 'alibi',
        'gossamer': 'customer',
        'grotesque': 'burlesque',
        'gymnasium': 'stadium',
        'halcyon': 'carry on',
        'havoc': 'stomach',
        'hearse': 'verse',
        'hermit': 'permit',
        'hooligan': 'cardigan',
        'hypocrite': 'favorite',
        'inoculate': 'calculate',
        'insult': 'adult',
        'janitor': 'senator',
        'jeopardy': 'Jeopardy',
        'jubilee': 'referee',
        'lackadaisical': 'musical',
        'leotard': 'discard',
        'lieutenant': 'tenant',
        'limousine': 'gasoline',
        'meander': 'gander',
        'mesmerize': 'hypnotize',
        'nightmare': 'welfare',
        'ostracize': 'exercise',
        'pandemonium': 'stadium',
        'phony': 'baloney',
        'plagiarize': 'memorize',
        'prestige': 'fatigue',
        'prodigy': 'odyssey',
        'propaganda': 'veranda',
        'quarry': 'sorry',
        'sabotage': 'mirage',
        'scapegoat': 'boat',
        'shambles': 'scrambles',
        'sinister': 'minister',
        'stentorian': 'historian',
        'stoic': 'heroic',
        'tantrum': 'tantrum → phantom',
        'trophy': 'Sophie',
        'uncle': 'uncle → carbuncle',
        'vengeance': 'vengeance → sentence',
        'vernacular': 'spectacular',
        'zeal': 'deal'
    };

    if (specificRhymes[w]) {
        return specificRhymes[w];
    }

    // Fallback: return a generic rhyme based on ending
    const lastTwo = w.slice(-2);
    const lastThree = w.slice(-3);

    const endingRhymes = {
        'ly': 'free',
        'er': 'sister',
        'or': 'door',
        'al': 'pal',
        'le': 'full',
        'ty': 'free',
        'ry': 'free',
        'ny': 'funny',
        'cy': 'free',
        'gy': 'energy',
        'py': 'happy',
        'dy': 'ready',
        'by': 'baby',
        'fy': 'defy',
        'hy': 'high',
        'ky': 'lucky',
        'my': 'dummy',
        'sy': 'messy',
        'vy': 'gravy',
        'wy': 'chewy',
        'zy': 'crazy'
    };

    if (endingRhymes[lastTwo]) {
        return endingRhymes[lastTwo];
    }

    // Last resort
    return 'something';
}

// Snarky no-hint messages for hint 1
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

// Generate progressive hints based on wrong guess number (1-4)
function getProgressiveHint(word, wrongGuessNumber) {
    const w = word.toLowerCase();

    switch (wrongGuessNumber) {
        case 1:
            // Snarky non-hint
            return SNARKY_MESSAGES[Math.floor(Math.random() * SNARKY_MESSAGES.length)];
        case 2:
            // First letter
            return `It starts with the letter "${w[0].toUpperCase()}"`;
        case 3:
            // Rhymes with
            const rhyme = findRhyme(w);
            return `Rhymes with "${rhyme}"`;
        case 4:
            // Really good hint - reveal pattern
            let revealed = w[0].toUpperCase();
            for (let i = 1; i < w.length - 1; i++) {
                revealed += ' _';
            }
            revealed += ' ' + w[w.length - 1].toUpperCase();
            return `Pattern: ${revealed} (${w.length} letters)`;
        default:
            return '';
    }
}

// Toilet state
let toiletElement = null;
let flushSound = null;
let activeDragPoop = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Initialize flush sound
function initFlushSound() {
    if (!flushSound) {
        flushSound = new Audio('assets/audio/flush.mp3');
        flushSound.volume = 0.7;
    }
}

// Create the toilet element
function createToilet() {
    if (toiletElement) return; // Already exists

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

    // Initialize sound
    initFlushSound();
}

// Remove the toilet
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

// Check if there are any poops left
function checkPoopsRemaining() {
    const poops = document.querySelectorAll('.session-poop');
    if (poops.length === 0) {
        removeToilet();
    }
}

// Shake the toilet and play sound
function flushToilet(poopElement) {
    if (!toiletElement) return;

    // Play flush sound
    if (flushSound) {
        flushSound.currentTime = 0;
        flushSound.play().catch(() => {}); // Ignore autoplay errors
    }

    // Shake animation
    toiletElement.style.animation = 'none';
    toiletElement.offsetHeight; // Trigger reflow
    toiletElement.style.animation = 'toiletShake 0.5s ease-in-out';

    // Remove the poop with a flush animation
    poopElement.style.transition = 'all 0.3s ease-in';
    poopElement.style.transform = 'scale(0) rotate(720deg)';
    poopElement.style.opacity = '0';

    setTimeout(() => {
        if (poopElement.parentNode) {
            poopElement.parentNode.removeChild(poopElement);
        }
        poopCount--;
        checkPoopsRemaining();
    }, 300);
}

// Check if poop is over toilet
function isOverToilet(x, y) {
    if (!toiletElement) return false;

    const toiletRect = toiletElement.getBoundingClientRect();
    // Make hit area a bit more forgiving
    const padding = 20;
    return (
        x >= toiletRect.left - padding &&
        x <= toiletRect.right + padding &&
        y >= toiletRect.top - padding &&
        y <= toiletRect.bottom + padding
    );
}

// Start dragging a poop
function startDragPoop(poop, clientX, clientY) {
    // Show toilet when dragging starts
    createToilet();

    activeDragPoop = poop;
    const rect = poop.getBoundingClientRect();
    dragOffsetX = clientX - rect.left;
    dragOffsetY = clientY - rect.top;

    // Make poop draggable
    poop.style.cursor = 'grabbing';
    poop.style.transition = 'none';
    poop.style.zIndex = '10001';

    // Convert to absolute positioning for dragging
    poop.style.left = rect.left + 'px';
    poop.style.top = rect.top + 'px';
    poop.style.right = 'auto';
    poop.style.bottom = 'auto';
}

// Handle drag movement
function moveDragPoop(clientX, clientY) {
    if (!activeDragPoop) return;

    activeDragPoop.style.left = (clientX - dragOffsetX) + 'px';
    activeDragPoop.style.top = (clientY - dragOffsetY) + 'px';

    // Visual feedback when over toilet
    if (toiletElement) {
        if (isOverToilet(clientX, clientY)) {
            toiletElement.style.transform = 'translateX(-50%) scale(1.2)';
        } else {
            toiletElement.style.transform = 'translateX(-50%) scale(1)';
        }
    }
}

// End dragging
function endDragPoop(clientX, clientY) {
    if (!activeDragPoop) return;

    const poop = activeDragPoop;
    activeDragPoop = null;

    // Check if dropped on toilet
    if (isOverToilet(clientX, clientY)) {
        flushToilet(poop);
    } else {
        // Return poop to normal state
        poop.style.cursor = 'pointer';
        poop.style.zIndex = '9999';
        // Hide toilet if not used
        removeToilet();
    }
}

// Make a poop interactive
function makePoopDraggable(poop) {
    // Mouse events - mousedown starts drag immediately
    poop.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startDragPoop(poop, e.clientX, e.clientY);
    });

    // Touch events - also start immediately on touch
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

// Global mouse/touch move and up handlers
document.addEventListener('mousemove', (e) => {
    if (activeDragPoop) {
        moveDragPoop(e.clientX, e.clientY);
    }
});

document.addEventListener('mouseup', (e) => {
    if (activeDragPoop) {
        endDragPoop(e.clientX, e.clientY);
    }
});

document.addEventListener('touchend', (e) => {
    if (activeDragPoop) {
        const touch = e.changedTouches[0];
        endDragPoop(touch.clientX, touch.clientY);
    }
});

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
    poop.style.cursor = 'pointer';

    document.body.appendChild(poop);

    // Make it draggable
    makePoopDraggable(poop);
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
    gameState.won = false;

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
    elements.topButtons.classList.add('hidden');
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

    // Add a poop emoji to the screen!
    addPoop();

    // Check if out of guesses - end game without showing hint
    if (gameState.guessesRemaining <= 0) {
        endGame(false);
        return;
    }

    // Add to history display with progressive hint (only if game continues)
    addGuessToHistory(guess, similarity, distanceInfo, wrongGuessNumber);

    // Clear input
    elements.guessInput.value = '';
    elements.guessInput.focus();
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
    gameState.won = won;
    elements.guessInput.disabled = true;
    elements.submitBtn.disabled = true;
    elements.inputSection.style.display = 'none';

    // Show result section and top buttons
    elements.resultSection.classList.remove('hidden');
    elements.topButtons.classList.remove('hidden');

    if (won) {
        elements.resultMessage.textContent = 'Congratulations!';
        showWinAnimation();
    } else {
        showLoseAnimation(gameState.currentWord.word);
    }
}

// ============================================
// SHARE FUNCTIONALITY
// ============================================

function generateShareText() {
    const word = gameState.currentWord.word.toUpperCase();
    const etymology = gameState.currentWord.etymology;

    let text = `YOU HAVE BEEN ETYMORDLED`;

    // Add word and etymology
    text += `\n\n📚 ${word}\n${etymology}`;

    text += '\n\nhttps://samswalder.github.io/game-cousin-olive/game.html';
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

// Event Listeners
elements.submitBtn.addEventListener('click', submitGuess);

elements.guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitGuess();
    }
});

elements.playAgainBtn.addEventListener('click', startNewGame);
elements.playAgainTop.addEventListener('click', startNewGame);
elements.shareBtn.addEventListener('click', shareResults);
elements.shareBtnTop.addEventListener('click', shareResults);

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
        pointer-events: auto;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
    }
    .session-poop:hover {
        transform: scale(1.2);
    }
    @keyframes toiletAppear {
        0% {
            opacity: 0;
            transform: translateX(-50%) scale(0) rotate(-180deg);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) scale(1) rotate(0deg);
        }
    }
    @keyframes toiletDisappear {
        0% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) scale(0) translateY(50px);
        }
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
    .toilet {
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    }
`;
document.head.appendChild(shakeStyle);

// Start the game when page loads
document.addEventListener('DOMContentLoaded', startNewGame);

// Also start if DOM is already ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startNewGame();
}
