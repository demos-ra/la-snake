# LA Snake

Snake game demonstrating Living Architecture.

**Play:** [https://demos-ra.github.io/la-snake-v2/](https://demos-ra.github.io/la-snake-v2/)

## Structure

Code organized by dependency gravity:

- **R1 • Domain** - Pure game logic (snake, food, rules)
- **R2 • Database** - High score persistence
- **R3 • API** - Game loop orchestration  
- **R4 • Integrations** - Canvas rendering, keyboard/touch input

## Run locally
```bash
python3 -m http.server 8000
```

Open http://localhost:8000

## Built with Living Architecture

[https://github.com/demos-ra/living-architecture](https://github.com/demos-ra/living-architecture)
 
