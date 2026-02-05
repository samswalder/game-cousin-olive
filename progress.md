# Etymology Origins Game - Progress

## What We Built
A spin-off word game where you guess the **language/country of origin** for English words. It's a multiple choice format - you see a word and pick from 4 possible origins.

## How to Play
1. Open `http://localhost:8000/origins-game.html` (run `python3 -m http.server 8000` from the project folder)
2. A word appears (e.g., "ASSASSIN")
3. Pick which language you think it comes from (Arabic, Latin, Greek, French, etc.)
4. You get 3 guesses (shown as hearts)
5. Get it right = confetti explosion + xylophone cha-ching sound
6. Get it wrong = button turns into a puke emoji

## Scoring
- 1st guess correct: **10 points**
- 2nd guess correct: **5 points**
- 3rd guess correct: **1 point**
- All wrong: **0 points** (but you learn the etymology!)

The score animates up with a floating "+10" popup when you earn points.

## Features
- 140+ words with verified etymological origins
- Origins include: Greek, Latin, Arabic, French, German, Norse, Persian, Hebrew, Gaelic, Sanskrit, and more
- After each round, the full etymology description is revealed
- Neon/cyberpunk visual theme matching the main Etymordle game
- Session-based scoring (resets on page refresh)

## Files Created
```
origins-game.html      - Main game page
css/origins-game.css   - Styling (neon theme, animations)
js/origins-game.js     - Game logic, sound effects, scoring
js/words.js            - Updated with origin data for all words
```

## Tech Stack
- Vanilla HTML/CSS/JavaScript
- No frameworks or dependencies
- Web Audio API for sound effects
- CSS animations for confetti, score popups, button states

## What's Next?
Ideas for future improvements:
- High score leaderboard
- Difficulty levels (common vs obscure origins)
- Streak bonuses
- Share score on social media
- Daily challenge mode
