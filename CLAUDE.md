# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Strivio** is a mobile-first fitness and nutrition web application. It provides personalized workout plans, nutrition tracking, and digital coaching through an intake-based onboarding flow.

The app is built with vanilla HTML, CSS, and JavaScript - no build tools or frameworks. It's designed as a mobile app prototype with a phone frame wrapper for demonstration purposes.

## Architecture

### File Organization

```
/
├── index.html              # Entry point - redirects to splash screen
├── app.js                  # Main application logic (~175KB, all state management & navigation)
├── styles.css              # All styles (~175KB, single file for entire app)
├── capture.js              # Screen capture module for exporting to Figma
├── screens/                # Screen HTML files organized by feature
│   ├── auth/               # Login, register, forgot-password, splash, welcome
│   ├── onboarding/         # Intake questions (q1-q15), coach selection, loading, reveal
│   ├── home/               # Home dashboard with tracking tab
│   ├── workout/            # Workout execution, library, exercise detail, AI coach
│   └── logbook/            # Nutrition logging, barcode scanner, macros
├── assets/                 # Static assets
│   ├── strivio_logo.svg   # App logo
│   ├── illustration/       # Onboarding illustrations (option=*.svg)
│   ├── img/                # Photos, profile images
│   ├── svg_icons/          # Custom SVG icons
│   └── vid/                # Video files
├── doc/                    # Documentation
│   ├── brief/              # Project briefs and requirements
│   └── ui-prompt/          # UI implementation prompts
└── shared/                 # Shared components (mostly empty)
```

### State Management

Global state is maintained in `window.__strivio_state` (defined in app.js:22-56) and includes:
- User profile: name, age, height, weight, gender
- Goals: fitness goals, motivations, target weight, pace
- Preferences: diet, location (gym/home), frequency, training days
- Authentication: email, password, registration data
- Workout state: premium status, rest duration, units, favorites

State persists via localStorage keys:
- `strivio_state` - Full app state
- `strivio_screen` - Current screen ID
- `strivio_screen_history` - Navigation history

### Navigation System

Navigation uses full page loads between HTML files (not SPA routing):

```javascript
// Screen IDs map to HTML file paths
const screenPaths = {
  'splash': BASE_PATH + '/screens/auth/splash.html',
  'q1': BASE_PATH + '/screens/onboarding/q1.html',
  'home': BASE_PATH + '/screens/home/home.html',
  // ... etc
};

// Navigate by calling window.navigateTo('screenId')
window.navigateTo('q2');
```

The `BASE_PATH` is auto-detected based on script location to support deployment to any subdirectory.

### Screen Structure

Each screen HTML file follows this pattern:
```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="../../styles.css?v=3">
</head>
<body>
  <div class="app-container">
    <div class="phone-frame">
      <div class="phone-notch"></div>
      <div class="screens-wrapper" id="screensWrapper">
        <div class="screen screen-[name] active" data-screen="[id]">
          <!-- Screen content -->
        </div>
      </div>
    </div>
  </div>
  <script src="../../app.js?v=3"></script>
</body>
</html>
```

Key elements:
- `.phone-frame` - Fixed 375x812px mobile viewport wrapper
- `.phone-notch` - Simulated iPhone notch
- `.screen-[name]` - Screen-specific styling hook
- `data-screen` - Screen ID for capture module

## Development Workflow

### Running the App

No build process required. Serve with any static file server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx serve)
npx serve

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` - it will redirect to the splash screen.

### CSS Conventions

- CSS Variables defined in `:root` (styles.css:4-36) for colors, typography, spacing
- Theme colors: `--navy: #7F7CF0`, `--green: #10B981`, `--amber: #F59E0B`, `--red: #EF4444`
- Font families: `--font-display: 'Outfit'`, `--font-body: 'Inter'`
- Border radius: `--radius: 12px`, `--radius-sm: 10px`, `--radius-lg: 14px`, `--radius-full: 9999px`
- Component classes: `.btn-primary`, `.option-card`, `.input-group`, `.progress-bar`

### Key JavaScript Functions

From app.js:

**Navigation**
- `window.navigateTo(screenId)` - Navigate to a screen
- `saveAndNext(screenId, key, nextScreen)` - Save form data and proceed

**Form Handling**
- `initOptionCards()` - Initialize single/multi-select option cards
- `initTextInputs()` - Text input validation
- `initNumericInputs()` - Numeric input with min/max validation
- `getSelectedValue(containerId)` / `getSelectedValues(containerId)` - Get selected options

**Onboarding**
- `checkConflicts()` - Validate intake responses for inconsistencies
- `startLoadingAnimation()` - Animate plan generation steps
- `populateReveal()` - Calculate and display personalized plan

**State Utilities**
- State is accessed directly via `window.__strivio_state`
- localStorage used for persistence across page loads

### Screen Capture Module

The capture.js module provides screenshot functionality for design handoff:

```javascript
// Auto-initializes on DOM ready
Capture.captureCurrentScreen();    // Screenshot current screen
Capture.captureAllScreens();       // Batch capture all screens
Capture.downloadCapture();         // Download last capture
Capture.pushToFigma();            // Prepare for Figma MCP import
```

A floating capture button appears in bottom-right corner when running the app.

## User Flows

### Onboarding Flow
1. `splash` → `onboarding` (intro) → `welcome`
2. Login/Register or continue as guest
3. Intake questions `q1` through `q15`:
   - q1: Name
   - q2-q3: Goals & motivations (multi-select)
   - q4: Gender
   - q5: Activity level
   - q6-q9: Age, height, weight, target weight
   - q10: Weight loss/gain pace (slider)
   - q11: Diet type
   - q12: Fitness experience
   - q13: Workout location
   - q14: Training frequency (slider)
   - q15: Training days selection
4. `conflicts` - Validation warnings if intake is inconsistent
5. `coach` - Select digital coach (Marcus, Sara, Lena, David)
6. `loading` - Plan generation animation
7. `reveal` - Personalized plan display
8. `home` - Main app entry

### Main App Sections

**Home (`screens/home/home.html`)**
- Tracking tab (default): Daily overview, calories, macros, water
- Workouts tab: Today's workout, weekly schedule

**Logbook (`screens/logbook/`)**
- Daily nutrition logging
- Barcode scanner (UI only)
- Macro/micronutrient breakdown
- Custom meals

**Workout (`screens/workout/`)**
- Workout library
- Exercise library with video demonstrations
- In-workout execution (timer, rest periods)
- AI coach workout generation

### Data Model

User state is calculated using:
- BMR: Mifflin-St Jeor equation
- TDEE: BMR × activity multiplier
- Calorie target: TDEE ± deficit/surplus based on goal
- Protein: 2g per kg bodyweight
- Fat: 25% of calories / 9
- Carbs: Remaining calories / 4

## Design System

**Colors**
- Primary: `#7F7CF0` (navy purple)
- Success: `#10B981` (green)
- Warning: `#F59E0B` (amber)
- Error: `#EF4444` (red)
- Background: `#FFFFFF` / `#F5F6FA`
- Text: `#0f172a` (primary), `#525252` (secondary)

**Typography**
- Display: Outfit (headings, large text)
- Body: Inter (UI elements, body text)
- Weights: 300-700

**Components**
- Option cards: `.option-card` with `.selected` state
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- Inputs: `.text-input` with `.input-underline`
- Sliders: Custom styled range inputs

## Common Tasks

### Adding a New Screen

1. Create HTML file in appropriate `screens/[category]/` directory
2. Copy boilerplate from existing screen
3. Add screen path to `screenPaths` object in app.js
4. Add navigation function if needed
5. Add screen-specific JavaScript initialization in `DOMContentLoaded` handler

### Modifying Styles

- All styles are in `styles.css` - no CSS preprocessors
- Use CSS variables for colors/spacing to maintain consistency
- Screen-specific styles use `.screen-[name]` prefix
- Component styles are organized by section in the file

### Adding Form Fields

1. Add input to HTML with appropriate ID
2. Add state property to `window.__strivio_state`
3. Add extraction logic in `saveAndNext()` switch statement
4. Add initialization in `DOMContentLoaded` if complex interaction needed

## Testing

Manual testing workflow:
1. Clear localStorage to test fresh onboarding
2. Navigate through entire flow
3. Test responsive behavior (designed for 375x812 viewport)
4. Test both auth and guest flows

Browser DevTools mobile device emulation recommended (iPhone 12/13 dimensions).

## External Dependencies

- Google Fonts: Inter, Nunito, Outfit
- Iconify: Icons via `<iconify-icon>` web component
- html2canvas (loaded dynamically by capture.js)

No package.json - all dependencies loaded via CDN.
