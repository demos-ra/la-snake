# LA Snake V2 - Living Architecture Demo

**Framework:** Living Architecture v1.1 (R1-6 minimal)  
**Active Layers:** APPLICATION, INTERFACE, INFRASTRUCTURE  
**Skipped:** CONFIG, DOMAIN, PRESENTATION

---

## Architecture

Three folders, three responsibilities:

### APPLICATION/
**Game Logic** (pure, no side effects)
- `game-loop.js` - Core game loop, state management
- No knowledge of HTML, canvas, or browser

### INTERFACE/
**Entry Point** (connects game to browser)
- `index.html` - HTML + setup code
- Imports game logic and renders infrastructure

### INFRASTRUCTURE/
**Implementation Details** (can be swapped)
- `canvas.js` - Render using HTML5 Canvas
- `keyboard.js` - Keyboard input handling
- `responsive-scale.js` - Display scaling (living skin)

---

## Dependency Rule (D2)

```
INTERFACE (index.html)
  ↓
APPLICATION (game-loop.js)
  ↓
INFRASTRUCTURE (canvas.js, keyboard.js)
```

- ✅ INTERFACE can call APPLICATION
- ✅ APPLICATION can use INFRASTRUCTURE services
- ❌ APPLICATION never imports INTERFACE
- ❌ INFRASTRUCTURE never imports APPLICATION

---

## Why This Structure?

**Separation:** Test game logic without browser  
**Flexibility:** Swap canvas for WebGL, terminal, or server  
**Clarity:** Everyone knows where code belongs  
**Scalability:** Easy to add features without breaking things

---

## Validation

Run:
```bash
python3 tools/test-runner.py
```

Checks that imports follow the rules above.

---

## Next: GETTING-STARTED.md

For step-by-step how to use this.
