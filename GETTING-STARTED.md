# LA Snake - Getting Started

**For:** Vibe coders, curious developers, anyone new to Living Architecture

---

## What is This?

A snake game built with **Living Architecture v1.1** (minimal setup).

Shows how LA works on real projects, even small ones.

---

## Quick Start (3 Steps)

### Step 1: Clone & Setup (2 minutes)

```bash
git clone https://github.com/demos-ra/la-snake-v2.git
cd la-snake-v2

# Initialize LA submodule
git submodule init
git submodule update

# Run the game (pick one)
open index.html                    # macOS
xdg-open interface/index.html     # Linux
start interface/index.html        # Windows

# OR use Python server
python3 -m http.server 8000
# Then open http://localhost:8000/interface/
```

### Step 2: Play

- **Arrow Keys** or **WASD** to move snake
- **Eat food** (white squares)
- **Don't hit walls** or yourself
- **High scores saved** locally

### Step 3: Understand the Code (Optional)

Open `interface/index.html` and look at the three folders:

```
application/        ← Game logic (pure)
interface/          ← HTML entry point
infrastructure/     ← Rendering, input, storage
```

---

## The Three Responsibilities

### APPLICATION/ - Game Logic
Pure code, no browser knowledge.

**File:** `game-loop.js`

```javascript
new GameLoop(
  gridWidth, gridHeight,           // Input: screen size
  keyboardHandler,                 // Input: user input
  (state) => renderer.draw(state), // Output: render callback
  (score) => showGameOver(score)   // Output: game over callback
)
```

**What it does:**
- Moves snake based on input
- Detects food collision
- Detects wall collision
- Tracks score

**What it doesn't know:**
- How to display things
- How keyboard works
- Where high scores are stored

### INTERFACE/ - Connection Point
HTML file that wires everything together.

**File:** `index.html`

```html
<canvas id="game"></canvas>

<script type="module">
  import { GameLoop } from '../application/game-loop.js'
  import { CanvasRenderer } from '../infrastructure/canvas.js'
  import { KeyboardHandler } from '../infrastructure/keyboard.js'

  // Wire: GameLoop + CanvasRenderer + KeyboardHandler
</script>
```

**What it does:**
- Sets up the page
- Imports game and infrastructure
- Connects them together

### INFRASTRUCTURE/ - Implementation
How things actually work (can be replaced).

**Files:**
- `canvas.js` - Renders to HTML5 Canvas
- `keyboard.js` - Listens to keyboard events
- `responsive-scale.js` - Scales game to screen size (living skin)

**What it does:**
- Takes game state, draws it
- Listens for user input, passes to game
- Scales canvas to fit screen

---

## The Flow

```
User presses arrow key
         ↓
KeyboardHandler detects it
         ↓
GameLoop updates snake position
         ↓
CanvasRenderer draws new state
         ↓
Screen updates
```

---

## Validate Architecture

Living Architecture validates that code follows the rules:

```bash
python3 tools/test-runner.py
```

**What it checks:**
- `APPLICATION` doesn't import `INTERFACE` (✅)
- `INFRASTRUCTURE` doesn't import `APPLICATION` (✅)
- All imports flow downward (✅)

**Result:**
```
✅ PASSED: 7/7
```

---

## Modify the Game

Want to change something?

### Add a feature: Speed increases with score
**Location:** `application/game-loop.js`

```javascript
// In game loop, after score increases:
this.speed = Math.max(500, 1000 - score * 10) // Faster as score goes up
```

### Change colors
**Location:** `infrastructure/canvas.js`

```javascript
drawSnake(snake) {
  this.ctx.fillStyle = '#00FF00' // Green instead of white
  // ... rest of code
}
```

### Change canvas size
**Location:** `interface/index.html`

```javascript
const cellSize = 20 // Was 30, now smaller cells = bigger grid
```

---

## Why This Structure Matters

**Without LA:**
```
Where do I put snake movement code?
Where do I put rendering code?
If I change rendering, will the game break?
```

**With LA:**
```
APPLICATION = game logic
INFRASTRUCTURE = rendering
They're separate, so changes are safe.
```

---

## Read More

- `CONSTITUTION.md` - The philosophy
- `README.md` - Project details
- `.arch/docs/specs/00-framework.md` - Full Living Architecture

---

## Questions?

This is a **minimal LA demo**.

If you understand:
1. Game logic is separate from rendering
2. INTERFACE connects them
3. Each folder has one job

**You understand Living Architecture.**

Congrats! 🚀
