# Redesign 2026: "Neon Magma"

## Overview
This redesign shifts the aesthetic from a flat "brutalist" look to a more interactive, depth-oriented "digital forge" style.

## Key Changes

### 1. Visual Language
- **Noise Texture:** Added a subtle noise overlay to the background to reduce "plasticity" and add premium texture.
- **Spotlight Effect:** Cards now have a radial gradient that follows the mouse cursor, creating an interactive lighting effect.
- **Bento Grid:** The "Lab" features are now presented in a grid layout instead of a list, allowing for richer visualizations.

### 2. Components
- **`SpotlightCard`:** A new component that handles the mouse-tracking hover effect.
- **`BentoGrid`:** A flexible grid layout component.
- **`NoiseTexture`:** A reusable SVG filter component for background noise.

### 3. Sections
- **Hero:**
  - Restored the original "huge text" layout.
  - Added "Liquid" button effect (via Framer Motion).
  - Added Noise Texture.
- **Program (Lab):**
  - Completely rebuilt using the Bento Grid.
  - Added "Skeleton" visualizations for each feature (mock UI elements).

## Technical Details
- **Dependencies:** Added `framer-motion` for complex animations.
- **Performance:** Components are memoized. Animations use hardware-accelerated properties (transform, opacity).

## Next Steps
- **Optimization:** Run Lighthouse to ensure the new effects don't impact LCP/CLS.
- **Mobile:** Fine-tune the Bento Grid for smaller screens (currently stacks vertically).
