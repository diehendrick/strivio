# Strivio Log Book Site Map

## Overview
This document maps the navigation structure and screen relationships within the Strivio Log Book module.

---

## File Structure

```
📁 project/starvio/screens/logbook/
│
├── 📄 logbook.html          (Screen 1: Daily Log View - Main Entry Point)
├── 📄 macro-overview.html   (Screen 2: Daily Macro Overview)
├── 📄 micronutrients.html   (Screen 3: Full Daily Nutrients)
├── 📄 barcode-scanner.html  (Screen 5: Barcode Scanner)
├── 📄 manual-entry.html     (Screen 6: Manual / AI Photo Food Entry)
└── 📄 custom-meals.html     (Screen 9: Custom Meals)
```

---

## Screen Details

### 📄 logbook.html (Main Screen - Daily Log View)
**Primary entry point for the Log Book module.**

#### Navigation FROM logbook.html:
| Action | Destination | Notes |
|--------|-------------|-------|
| Tap Macro Overview Card | macro-overview.html | Shows expanded macro breakdown |
| Tap "Full Nutrients" | micronutrients.html | Premium check required |
| Tap "Macro Overview" (Quick Action) | macro-overview.html | Alternative access |
| Tap "Add Manually" (Quick Action) | manual-entry.html | Create custom food entry |
| Tap "My Meals" (Quick Action) | custom-meals.html | Manage custom meals |
| Tap Barcode Icon (in Food Search) | barcode-scanner.html | Premium check required |
| Bottom Nav: Home | ../home/home.html | Navigate to Home tab |
| Bottom Nav: Coach | ../coach/workout.html | Navigate to Coach tab |

#### Bottom Sheets (Contained within logbook.html):
- **Food Search Sheet** - Search/add foods from database
- **Assign Food Sheet** - Set quantity, serving, meal assignment
- **Copy Yesterday Sheet** - Review and copy previous day's log
- **Calendar Picker Sheet** - Date navigation
- **Premium Paywall Sheet** - Upgrade prompts for gated features

---

### 📄 macro-overview.html (Screen 2: Daily Macro Overview)
**Expanded view of daily macro progress with visual breakdowns.**

#### Features:
- Large calorie donut chart (140px)
- Detailed macro progress bars with percentages
- Remaining targets display
- Per-meal breakdown (collapsible)

#### Navigation:
- ← Back button → logbook.html

---

### 📄 micronutrients.html (Screen 3: Full Daily Nutrients)
**Detailed micronutrient tracking with RDV comparisons (Premium feature).**

#### Features:
- Vitamins section (A, C, D, E, K, B-complex)
- Minerals section (Calcium, Iron, Magnesium, etc.)
- Other nutrients (Fiber, Sugar, Saturated Fat, Cholesterol)
- Color-coded progress indicators
- Sorting by % RDV (deficiencies first)

#### Navigation:
- ← Back button → logbook.html
- **Premium Gate**: Shows paywall if user is not subscribed

---

### 📄 barcode-scanner.html (Screen 5: Barcode Scanner)
**Quick food entry via barcode scanning (Premium feature).**

#### Features:
- Camera viewfinder with scanner overlay
- Animated laser line
- Alignment guides (corner brackets)
- Manual entry fallback button

#### Navigation:
- ← Back button → logbook.html
- Manual Entry button → manual-entry.html
- **Premium Gate**: Redirects to logbook if not subscribed

#### States:
- Scanning (active camera view)
- Success (product found)
- Not Found (product not in database)

---

### 📄 manual-entry.html (Screen 6: Manual / AI Photo Food Entry)
**Fallback entry when food not found via search or barcode.**

#### Features:
- AI Photo upload option (simulated)
- Food name input
- Serving size selector (quantity + unit)
- Macro inputs (Calories, Protein, Carbs, Fat)
- Collapsible micronutrients section

#### Navigation:
- ← Back button → logbook.html
- Save & Log → logbook.html (with success toast)
- Save to My Foods → logbook.html

---

### 📄 custom-meals.html (Screen 9: Custom Meals)
**Create and manage reusable meal templates.**

#### Features:
- List of saved custom meals
- Create new meal (1 free for non-Premium)
- Edit existing meals
- Add/remove foods from meals
- Auto-calculated meal totals

#### Navigation:
- ← Back button → logbook.html
- Create Meal → Create/Edit form view
- Add Food → (simulated - would open Food Search in full app)

#### Premium Gate:
- Free users: 1 custom meal max
- Premium users: Unlimited custom meals

---

## Navigation Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    logbook.html                         │
│                (Daily Log View)                         │
│                      [Main]                             │
└────────┬────────┬────────┬────────┬─────────────────────┘
         │        │        │        │
         ▼        ▼        ▼        ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  macro-  │ │ micronu- │ │ barcode- │ │  manual- │
│ overview │ │trients   │ │ scanner  │ │  entry   │
│  .html   │ │  .html   │ │  .html   │ │  .html   │
└────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │            │
     └────────────┴────────────┴────────────┘
                    │
                    ▼
            ┌──────────┐
            │  custom- │
            │  meals   │
            │  .html   │
            └──────────┘

All screens link back to logbook.html via ← Back button
```

---

## Quick Access Guide

| Screen | Access Method | Premium Required? |
|--------|--------------|-------------------|
| Macro Overview | Tap Macro Card OR Quick Actions → Macro Overview | No |
| Daily Nutrients | Quick Actions → Full Nutrients | Yes |
| Barcode Scanner | Food Search → Barcode Icon | Yes |
| Manual Entry | Quick Actions → Add Manually | No |
| Custom Meals | Quick Actions → My Meals | Partial (1 free) |

---

## State Management

All screens share state via **localStorage**:

```javascript
// Key data structures
{
  strivio_state: {
    isPremium: boolean,
    favorites: array,
    // user preferences
  },
  strivio_logs: {
    "YYYY-MM-DD": {
      breakfast: [...foods],
      lunch: [...foods],
      dinner: [...foods],
      snacks: [...foods]
    }
  },
  strivio_custom_meals: [...meals],
  strivio_custom_foods: [...foods]
}
```

---

## Screen Relationships

### Parent-Child Hierarchy
```
logbook.html (Parent)
├── macro-overview.html (Sibling)
├── micronutrients.html (Sibling)
├── barcode-scanner.html (Sibling)
├── manual-entry.html (Sibling)
└── custom-meals.html (Sibling)
```

### Modal/Bottom Sheet Hierarchy (within logbook.html)
```
logbook.html
├── Food Search Sheet
│   └── Assign Food Sheet
├── Copy Yesterday Sheet
├── Calendar Picker Sheet
└── Premium Paywall Sheet
```

---

## Notes

- All screens use consistent styling from `../../styles.css`
- Navigation uses standard `window.location.href` for screen transitions
- Premium features check `localStorage.strivio_state.isPremium` before access
- Screens are designed for mobile viewport (375x812px) within `.phone-frame`
- Back buttons provide intuitive return navigation to the main logbook screen
