# Snake Battle - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from competitive multiplayer games like Slither.io, Agar.io, and modern indie games with retro aesthetics. The design balances nostalgic arcade vibes with contemporary competitive gaming UI patterns.

**Core Principle**: Create an intense, competitive atmosphere with crystal-clear visual feedback for fast-paced decision-making. Every element should communicate game state instantly.

---

## Color Palette

### Dark Mode (Primary)
- **Background**: 220 15% 8% (deep navy-black for game arena)
- **Surface**: 220 12% 12% (UI panels/cards)
- **Primary (Player 1)**: 142 76% 45% (electric green - high visibility)
- **Enemy (Player 2)**: 0 84% 60% (danger red)
- **Accent**: 280 75% 60% (cyber purple for power-ups)
- **Warning**: 38 92% 50% (amber for traps/hazards)
- **Success**: 142 71% 45% (match primary for wins)
- **Text**: 0 0% 95% (primary text), 0 0% 70% (secondary)

### Game Elements
- **Food**: 48 100% 50% (bright yellow - classic Snake callback)
- **Speed Boost**: 200 90% 55% (electric blue)
- **Traps**: 355 85% 45% (dark red with glow)
- **Grid Lines**: 220 10% 25% (subtle, non-distracting)

---

## Typography

**Font Stack**: 
- Headers: 'Press Start 2P' (Google Fonts) for retro gaming feel - use sparingly for titles
- UI/HUD: 'Inter' or 'Rajdhani' (Google Fonts) - modern, readable at small sizes
- Stats/Numbers: 'Orbitron' (Google Fonts) for futuristic digital readout aesthetic

**Scales**:
- Game Title: text-5xl font-bold (Press Start 2P)
- Section Headers: text-2xl font-semibold (Rajdhani)
- HUD Stats: text-lg font-medium (Orbitron)
- Body/Instructions: text-base (Inter)
- Small Labels: text-sm (Inter)

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4 to p-8
- Section gaps: gap-6 to gap-12
- Icon margins: m-2 to m-4

**Screen Structure**:
- **Pre-Game Lobby**: Centered modal-style room join interface (max-w-md)
- **Game Arena**: Full viewport canvas with fixed HUD overlay
- **Post-Game**: Centered results overlay with replay options

---

## Component Library

### A. Game Canvas
- Full-viewport game board with 2px neon border (primary color)
- Dark background (220 15% 8%) with subtle grid pattern
- Glow effects on snakes (box-shadow with color-matched blur)
- Particle effects for attacks (CSS animations, 300ms duration)

### B. HUD Elements
**Top Bar**:
- Translucent background (220 12% 12% with 80% opacity, backdrop-blur-md)
- Player stats in corners: Length counter with icon, Speed boost indicator with progress bar
- Center: Round timer or match status
- Glass-morphism effect for modern feel

**Mini-map** (optional enhancement):
- Bottom-right corner, 150x150px
- Simplified view showing player positions
- Semi-transparent overlay

### C. Lobby/Menu Screens
**Room Join Interface**:
- Centered card (max-w-md) with elevated shadow (shadow-2xl)
- Neon-bordered input field for room code
- Large CTA button with glow-on-hover effect
- Control instructions as collapsible accordion

**Waiting Room**:
- Split-screen preview showing both player slots
- Animated "Waiting for opponent..." state
- Ready status indicators with pulsing animation

### D. Combat Feedback
- **Attack Animation**: Radial slash visual (SVG or CSS), 200ms duration
- **Hit Confirmation**: Screen shake (transform: translate), red flash on victim
- **Tail Cut**: Segment fade-out animation with particle burst
- **Death**: Snake dissolve effect with explosion particles

### E. Power-Up Indicators
- Floating icons above items with gentle bounce animation
- Speed boost: Lightning bolt icon with pulsing glow
- Trap: Skull icon with danger pulse
- Glowing border on collection (0-300ms transition)

### F. Match Results Overlay
- Full-screen modal with backdrop blur
- Large trophy/skull icon for win/loss
- Animated stat breakdown (length reached, kills, etc.)
- "Play Again" and "Change Room" CTAs
- Confetti animation for winner (canvas-confetti library)

---

## Game-Specific Interactions

### Snake Rendering
- Head: Distinct shape (rounded square) with eye indicators showing direction
- Body: Gradient from head to tail (lighter to darker)
- Glow effect: box-shadow 0 0 10px currentColor for neon aesthetic
- Trail fade: Tail segments at 80% opacity

### Power-Up Effects
- Speed boost: Snake glows brighter, slight motion blur trail
- During attack cooldown: Head flashes (pulse animation)

### Audio-Visual Sync (prepare hooks)
- Attack: Sharp slash sound + screen flash
- Food eat: Classic 8-bit beep + grow animation
- Death: Explosion sound + particle burst
- Background: Subtle electronic ambient loop

---

## Responsive Considerations
- Mobile: Stack HUD vertically, larger touch targets for controls
- Desktop: Optimal at 1200x800px canvas, scale proportionally
- Touch controls: Virtual joystick + attack button overlay (mobile only)

---

## Animation Philosophy
**Use Sparingly but Impactfully**:
- Critical feedback only (attacks, deaths, power-ups)
- Duration: 150-300ms for responsiveness
- Easing: ease-out for entries, ease-in for exits
- No idle animations that distract from gameplay

---

## Images
**Hero/Lobby Background**: Abstract digital grid pattern or neon circuit board aesthetic (dark with glowing lines). Use as background-image with overlay for depth.
- No large hero image needed - game is the hero
- Tutorial screens: Simple diagrams showing controls and mechanics (SVG illustrations)

This design creates a competitive, visually striking gaming experience that honors Snake's retro roots while delivering modern multiplayer intensity.