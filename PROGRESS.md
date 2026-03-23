# PROGRESS.md — ModeSwap Build Roadmap

## Phase 0: Scaffold & Foundation
- [x] Vite + React initialized
- [x] Folder structure created
- [x] AGENTS.md written
- [x] PROGRESS.md written
- [x] Dockerfile + docker-compose.yml created
- [x] First Git commit made

## Phase 1: Data Layer
- [x] Mock database (8 iconic rock/metal tracks) written in `src/data/tracks.js`
- [x] `trackService.js` service functions implemented
- [x] Data verified and tested

## Phase 2: Global Styles & Design System
- [ ] CSS custom properties (colors, fonts, spacing) defined in `global.css`
- [ ] Google Fonts imported
- [ ] Base reset and typography applied
- [ ] Dark mode atmosphere established

## Phase 3: Start Screen
- [ ] `StartScreen.jsx` component built
- [ ] `start.css` styled
- [ ] Smooth entrance animation

## Phase 4: Swipe Screen & Core Mechanic
- [ ] `SwipeScreen.jsx` built
- [ ] Music card UI implemented
- [ ] Mouse drag support (mousedown, mousemove, mouseup)
- [ ] Touch drag support (touchstart, touchmove, touchend)
- [ ] Swipe direction detection (left/right threshold)
- [ ] Card exit animation (translateX + rotate)
- [ ] Vibe score counter logic
- [ ] `useSwipe.js` custom hook extracted

## Phase 5: Result Screen
- [ ] `ResultScreen.jsx` built
- [ ] Winning vibe calculation logic
- [ ] Tie-breaking flow (ask user to choose between tied vibes)
- [ ] Track recommendation display
- [ ] Restart button wired up

## Phase 6: Audio Integration
- [ ] Audio preview (30s) integrated into SwipeScreen card
- [ ] Play/pause button on card
- [ ] Auto-pause on swipe

## Phase 7: Polish & Animations
- [ ] Page transition animations between screens
- [ ] Swipe hint animation on first card
- [ ] Result screen entrance animation
- [ ] All micro-interactions refined

## Phase 8: Docker & Deployment Prep
- [ ] Dockerfile verified
- [ ] docker-compose.yml verified
- [ ] Production build tested (`npm run build`)
- [ ] Final commit made
