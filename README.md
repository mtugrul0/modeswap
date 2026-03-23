# ModeSwap 🤘

A music discovery app that finds your sonic mood through swiping.
Swipe through iconic Rock and Metal tracks — find out if you're **Aggressive**,
**Chill**, **Party**, or **Melancholic**.

---

## About This Project

ModeSwap was built as a homework project for the **App-preneurship** module
as part of the **Future Talent Program** — a program supported by
**Citi Foundation** and carried out in collaboration with **YGA** and **UP School**.

The app was designed and developed with the assistance of AI tools,
demonstrating how modern AI-assisted development workflows can be used
to build production-ready web applications rapidly and systematically.

---

## Features

- Swipe-based music discovery (touch and mouse support)
- Mood detection across 4 vibes: Aggressive, Chill, Party, Melancholic
- Audio preview on each card
- Automatic tie-breaking via extra swipe rounds
- Personalized track recommendation based on your dominant mood
- Mobile-first, fully responsive design
- Dark mode UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vite + React |
| Styling | Pure CSS with CSS custom properties |
| State | React useState (no external library) |
| Testing | Vitest |
| Container | Docker + Nginx |
| Version Control | Git + GitHub |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Run Locally

```bash
# Clone the repository
git clone https://github.com/TugraMert42/modeswap.git
cd modeswap

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Run with Docker

```bash
# Build and start the container
docker-compose up --build

# The app will be available at:
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/       # React components (StartScreen, SwipeScreen, ResultScreen)
├── data/             # Mock database (tracks.js)
├── hooks/            # Custom React hooks (useSwipe.js)
├── services/         # Data access layer (trackService.js)
├── styles/           # Component-scoped CSS files
├── utils/            # Pure utility functions (calculateWinner.js)
└── __tests__/        # Vitest unit tests
```

---

## Running Tests

```bash
npm test
```

---

## License

MIT
