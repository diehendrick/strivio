# Strivio — Design Brief Analysis & Inspiration

## Project Overview
- **App Name:** Strivio
- **Category:** Fitness & Nutrition Tracking Mobile App
- **Platform:** iOS & Android
- **Target Users:** Beginners to fitness, goal-oriented athletes, people who can't afford personal trainers

## Problem Statement
- Most people lack knowledge on organizing nutrition and training properly
- Existing apps focus on only one area (either fitness OR nutrition)
- Personal coaching is expensive and time-consuming

## Solution
A personalized, adaptive digital coaching app combining nutrition, workouts, and recovery tracking into one platform — a cheaper alternative to personal trainers.

---

## Core Features

| Feature | Description |
|---------|-------------|
| **Onboarding** | Intake questionnaire (personal info, goals, preferences) + coach selection |
| **Personalized Plans** | Auto-generated nutrition (calorie/macro targets) + 2-week workout schedule |
| **In-App Workouts** | Guided exercises with explanations, images, videos |
| **Daily Tracking** | Personal log with automatic training data + manual food logging |
| **Digital Coach** | Chat functionality, daily/weekly feedback across nutrition, activity, recovery |
| **Health Integration** | Apple Health / Google Fit sync (steps, sleep) |
| **Progress Monitoring** | Weight, sleep, recovery, streak tracking |

---

## App Navigation

```
┌─────────────────────────────────────────────┐
│  [Home]  [Logbook]  [Coach]  [More]        │
└─────────────────────────────────────────────┘
```

### Home Page (2 tabs)
- **Tracking** — Daily metrics dashboard (this document's focus)
- **Workouts** — Scheduled exercises

### Logbook
- Overview of all daily logs

### Coach (3 tabs)
- **Nutrition** — Daily and weekly feedback
- **Activity** — Training insights
- **Recovery** — Sleep and rest guidance

### More
- Settings, profile, secondary pages

---

## Pinterest Design Inspiration

Based on extensive research from Pinterest fitness/nutrition app designs, here are the key patterns and inspiration:

### Visual Style Trends Identified

| Trend | Description | Application to Strivio |
|-------|-------------|----------------------|
| **Card-based dashboards** | Metrics organized in rounded white cards with subtle shadows | Primary layout pattern for tracking tab |
| **Circular progress indicators** | Donut charts for calories, rings for progress scores | Use for Daily Overview (calories) and Progress Score |
| **Color-coded macros** | Protein (green), Carbs (orange), Fat (blue) mini bars | Adopt for macro breakdown in overview card |
| **Large hero numbers** | Main metric (calories/score) displayed prominently (28-36px) | Use for Daily Progress Score and calorie display |
| **Grid layouts** | 2x2 or 2x3 metric grids within cards | Use in Daily Overview Card |
| **Minimal iconography** | Outlined 2px stroke icons, consistent style | All metric icons (flame, drop, foot, scale) |

### Color Palette Insights

**Most Common in Fitness Apps:**
- Green dominant (health association) — *Strivio will differentiate*
- White/light backgrounds with colored accents
- Dark mode variants with deep charcoal backgrounds

**Strivio's Differentiated Palette:**
- **Primary:** Dark Navy (`#1A2B4A`) — professional, trustworthy, premium
- **Accent:** Light blue (`#60A5FA`) — water, energy
- **Background:** White (`#FFFFFF`) + light cool gray (`#F5F6FA`)
- **Progress colors:** Amber (low), Blue (mid), Navy (high) — encouraging, not punitive

### Layout Patterns from Inspiration

#### Pattern 1: Noot App (Pinterest Reference)
- Clean calorie counter with circular progress
- Macro bars below with color coding
- Recently logged meals as list items
- Floating action button for quick add

**Takeaway for Strivio:** Adopt the donut chart + macro bar combination

#### Pattern 2: CIPHERSLAB NutritionHub
- Three-screen flow: onboarding → home dashboard → statistics
- Home shows weekly progress ring, steps, water, meals
- Calendar integration for weekly view
- Bar chart for daily calorie breakdown

**Takeaway:** Weekly progress context, calendar view option

#### Pattern 3: FitBite (Pinterest Reference)
- Hero section: "Your Daily Guide to Smarter Eating"
- Weekly progress at top with 6-day ring
- Steps and water side-by-side
- Meal entries with fire icons and calorie counts
- Bottom navigation: Home, Progress, [FAB], Rewards, Menu

**Takeaway:** Progress ring + quick metrics row layout

#### Pattern 4: Nutrisee
- Large calorie arc (1,515 cal with ring)
- Three mini circles: Carbs / Fat / Protein with values
- Weekly bar chart with color-coded macro breakdown
- Clean, light green accent palette

**Takeaway:** Macro breakdown as three circles, weekly bar chart

#### Pattern 5: Fitbit (Official App)
- Dashboard with stacked cards
- Activity rings (3 colored rings)
- Sleep score card
- Heart rate zones
- Exercise minutes
- All tap-to-expand pattern

**Takeaway:** Card stacking, tap-to-expand interactions

#### Pattern 6: Kenko / Luxoa (Blue-themed Fitness Apps)
- Deep blue primary color
- White text on blue cards
- Gradient backgrounds
- Clean data visualization

**Takeaway:** Navy can work as primary — use white text on navy for contrast

---

## Key Design Elements for Strivio Tracking Tab

### Must-Have Components
1. **Daily Overview Card** — Donut chart for calories, 3 macro bars, steps + water row
2. **Progress Score Card** — Large circular gauge (0-100%), 4 weighted categories
3. **Weight Card** — Current weight + trend arrow + "Log" button
4. **Water Card** — Progress bar, +/- quick buttons, settings gear
5. **Steps Card** — Step count + progress bar + 7-day chart on tap
6. **Calories Burned Card** — Total + BMR/activity breakdown

### Interaction Patterns
- **Tap card → Bottom sheet modal** with detail view
- **Tap +/- → Quick increment** with visual feedback
- **Tap info icon → Tooltip** with plain-language explanation
- **Pull to refresh** → Sync Apple Health / Google Fit
- **Live updates** → Subtle pulse animation when data changes

### Typography Hierarchy
| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| Greeting | 20px | SemiBold | "Good morning, [Name]" |
| Score Display | 32-36px | Bold | "72%" |
| Metric Value | 17px | SemiBold | "78.2 kg", "6,842 steps" |
| Card Title | 15px | SemiBold | Section headers |
| Body | 14px | Regular | Labels, descriptions |
| Caption | 12px | Regular | Timestamps, units |

---

## Competitive Analysis

| App | Strengths | Weaknesses | Strivio Opportunity |
|-----|-----------|------------|---------------------|
| **MyFitnessPal** | Huge food database, macro tracking | Cluttered UI, too many features | Cleaner, more focused dashboard |
| **Fitbit** | Great activity tracking, community | Requires hardware for full experience | Works standalone, no hardware needed |
| **Lose It!** | Fun, gamified experience | Focused only on calories/weight | Holistic: nutrition + workouts + recovery |
| **Apple Health** | Beautiful data viz, auto-sync | Passive tracking, no coaching | Active coaching + personalized plans |
| **Cronometer** | Detailed micronutrient data | Overwhelming for beginners | Beginner-friendly with depth on demand |

---

## Design Recommendations

### Visual Direction
1. **Go with clean, card-based layout** — proven pattern from Fitbit, Apple Health
2. **Use dark navy as primary** — differentiates from green-dominant competitors
3. **Circular progress for hero metrics** — calories, progress score
4. **Color-coded macros** — green/orange/blue convention
5. **Encouraging microcopy** — "Great job today!" not "You failed"

### Layout Priorities
1. **Hero card first** — Daily Overview with calories + macros + steps + water
2. **Progress Score second** — Motivational hub, answers "How am I doing?"
3. **Quick-log cards** — Weight, water with +/- buttons for friction-free logging
4. **Insight cards** — Steps, calories burned with tap-to-expand details

### Interaction Guidelines
1. **Bottom sheets over full screens** — Maintain context, reduce navigation depth
2. **Live update feedback** — Pulse/checkmark when logging updates data
3. **Empty states with guidance** — "Log your first meal to get started"
4. **Skeleton loading states** — Show card outlines while data loads

---

## Reference Screenshots Captured

| Pinterest Pin | Key Elements to Reference |
|---------------|--------------------------|
| Noot — AI cal & macro track | Donut calorie counter, 3-color macro bars, recently logged list |
| CIPHERSLAB NutritionHub | Weekly progress ring, side-by-side steps/water, bar chart stats |
| FitBite | Greeting header, 6-day progress ring, meal cards with fire icons |
| Nutrisee | Large calorie arc, 3-circle macro breakdown, weekly bar chart |
| NutriMate (dark mode) | Dark theme with lime accents, circular meal customizer |

---

## Next Steps

- [x] Capture Pinterest design references
- [x] Analyze competitive patterns
- [x] Document design recommendations
- [x] Create UI prompt for Tracking Tab
- [ ] Create UI prompts for other screens (Workouts, Logbook, Coach, More)
- [ ] Design high-fidelity mockups in Figma
- [ ] Create component library with navy color system

---

## File Outputs

- `doc/strivio/brief-analysis.md` — This document
- `doc/strivio/ui-prompt-tracking-tab.md` — Detailed UI implementation prompt
- `doc/strivio/brief.md` — Original brief summary
- `doc/strivio/homescreen - tracking tab.jpg` — Original flowchart reference
