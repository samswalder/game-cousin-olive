// ASCII Elephant Art and Animations

const ELEPHANTS = {
    // Victory elephant - curtsying with top hat
    win: `
         🎩
        ,---.
       /     \\___/~
      | ^   ^     |
       \\   __    /
        |      |
       /|  ()  |\\    *tips hat*
      (_|      |_)
         \\    /
          ~~~~
    ✨ Well played, old chap! ✨
`,

    // Alternative win frames for animation
    winFrames: [
        `
         🎩
        ,---.
       /     \\___/~
      | ^   ^     |
       \\   __    /
        |      |
       /|  ()  |\\
      (_|      |_)
         \\    /
          ~~~~
`,
        `
           🎩
        ,---.
       /     \\___/~
      | ^   ^     |
       \\   __    /
        |      |    *curtsy*
       /|  ()  |\\
      (_|      |_)
         \\  \\ /
          ~~~~
`,
        `
         🎩
        ,---.
       /     \\___/~
      | -   -     |
       \\   ω     /
        |      |
       /|  ()  |\\    *bow*
      (_|      |_)
         \\    /
          ~~~~
`
    ],

    // Defeat elephant - angry stare
    lose: `
        ,---.
       /     \\___/~
      | >   <     | 💢
       \\   ‸‸    /
        |      |    *STARES*
       /|  ()  |\\
      (_|      |_)
         \\    /
          ~~~~

       😤 Hmph. Disappointing.
`,

    // Alternative lose frames for animation
    loseFrames: [
        `
        ,---.
       /     \\___/~
      | >   <     | 💢
       \\   ‸‸    /
        |      |
       /|  ()  |\\
      (_|      |_)
         \\    /
          ~~~~
`,
        `
        ,---.
       /     \\___/~
      | ಠ   ಠ     | 💢💢
       \\   n     /
        |      |
       /|  ()  |\\
      (_|      |_)
         \\    /
          ~~~~
`,
        `
        ,---.
       /     \\___/~
      | >   <     | 💢
       \\   ‸‸    /
        |      |
       /|  ()  |\\
      (_|      |_)
         \\    /
          ~~~~
`
    ]
};

// Confetti characters for win celebration
const CONFETTI_CHARS = ['✨', '🎉', '⭐', '🎊', '💫', '🌟', '✦', '✧'];

// Track active animation intervals so we can clear them
let activeAnimationInterval = null;

// Clear any running animation
function clearActiveAnimation() {
    if (activeAnimationInterval) {
        clearInterval(activeAnimationInterval);
        activeAnimationInterval = null;
    }
}

// Create confetti animation
function createConfetti() {
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.className = 'confetti';
            confetti.textContent = CONFETTI_CHARS[Math.floor(Math.random() * CONFETTI_CHARS.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            document.body.appendChild(confetti);

            // Remove after animation
            setTimeout(() => confetti.remove(), 4000);
        }, i * 100);
    }
}

// Animate elephant (cycle through frames)
function animateElephant(elementId, frames, interval = 500) {
    const element = document.getElementById(elementId);
    let frameIndex = 0;

    const animation = setInterval(() => {
        element.textContent = frames[frameIndex];
        frameIndex = (frameIndex + 1) % frames.length;
    }, interval);

    // Return function to stop animation
    return () => clearInterval(animation);
}

// Show win animation
function showWinAnimation() {
    // Clear any previous animation
    clearActiveAnimation();

    const elephantArt = document.getElementById('elephant-art');
    const resultMessage = document.getElementById('result-message');

    // Clear previous state
    elephantArt.classList.remove('elephant-lose');
    resultMessage.classList.remove('lose');

    elephantArt.textContent = ELEPHANTS.win;
    elephantArt.classList.add('elephant-win');
    resultMessage.classList.add('win');
    resultMessage.textContent = 'Congratulations!';

    // Start confetti
    createConfetti();

    // Animate through frames
    let frameIndex = 0;
    activeAnimationInterval = setInterval(() => {
        const baseArt = ELEPHANTS.winFrames[frameIndex];
        elephantArt.textContent = baseArt + '\n    ✨ Well played, old chap! ✨';
        frameIndex = (frameIndex + 1) % ELEPHANTS.winFrames.length;
    }, 600);
}

// Show lose animation
function showLoseAnimation(correctWord) {
    // Clear any previous animation
    clearActiveAnimation();

    const elephantArt = document.getElementById('elephant-art');
    const resultMessage = document.getElementById('result-message');

    // Clear previous state
    elephantArt.classList.remove('elephant-win');
    resultMessage.classList.remove('win');

    elephantArt.textContent = ELEPHANTS.lose;
    elephantArt.classList.add('elephant-lose');
    resultMessage.classList.add('lose');
    resultMessage.innerHTML = `The word was: <strong>${correctWord.toUpperCase()}</strong>`;

    // Animate through frames
    let frameIndex = 0;
    activeAnimationInterval = setInterval(() => {
        const baseArt = ELEPHANTS.loseFrames[frameIndex];
        elephantArt.textContent = baseArt + '\n       😤 Hmph. Disappointing.';
        frameIndex = (frameIndex + 1) % ELEPHANTS.loseFrames.length;
    }, 400);
}

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ELEPHANTS, showWinAnimation, showLoseAnimation, createConfetti, clearActiveAnimation };
}
