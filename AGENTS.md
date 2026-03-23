# AGENTS.md — ModeSwap Project Guide

## Project Overview
ModeSwap is a swipe-based music discovery app for iconic Rock and Metal tracks across 8 extended moods.
Built with Vite + React. Mobile-first. Dark mode. Production-ready MVP.

## Architecture Rules
- ALL mock data lives in `src/data/tracks.js` only. Never hardcode track data elsewhere.
- `src/services/trackService.js` is the only file that imports from `src/data/tracks.js`.
  Components must use the service, not import data directly.
- This separation exists so the data layer can be swapped for a PHP/MySQL backend later.

## Component Responsibilities
- `StartScreen.jsx` — Landing page. Shows app title, description, Start button.
- `SwipeScreen.jsx` — Card swipe UI. Handles drag (touch + mouse). Tracks vibe scores.
- `ResultScreen.jsx` — Shows winning vibe, recommends a track, has Restart button.

## State Management
- All app-level state lives in `App.jsx` (current screen, vibe scores, swipe count).
- No external state library. React useState + props only.

## Styling Rules
- All styles in `src/styles/`. Each component has its own CSS file.
- Use CSS custom properties (variables) defined in `global.css`.
- Dark mode only. Never use light backgrounds.
- Mobile-first: base styles for mobile, media queries for desktop.

## Git Rules
- All commit messages MUST be in English.
- Commit after each phase is complete.
- Commit format: `[Phase X] Short description of what was done`

## File Path Reference
- Mock data: `src/data/tracks.js`
- Data service: `src/services/trackService.js`
- Custom swipe hook: `src/hooks/useSwipe.js`
- Global styles + CSS variables: `src/styles/global.css`

## Environment Notes
- npm is not in PowerShell PATH. Always use full absolute path: `& "C:\Program Files\nodejs\npm.cmd"`
- NEVER skip tests. If npm is not found, find its absolute path and use that.
- All commits must be preceded by a passing test run.
