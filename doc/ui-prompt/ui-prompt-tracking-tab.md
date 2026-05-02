# UI Implementation Prompt: Home Tracking Tab (Strivio)

## Context

The Home Tracking Tab is the **primary dashboard** of the Strivio fitness & nutrition coaching app. It serves as the user's daily command center — showing a live snapshot of their nutrition, fitness, and wellness progress. Users land here every morning to see their daily overview, track intake, and monitor how they're progressing against their personalized goals.

**Role in the app:** This is the most frequently visited screen. It must balance **information density** with **visual clarity**, giving users a quick sense of "how am I doing today?" while enabling deep dives into each metric via tap interactions.

## Platform
- **Type:** Mobile App (iOS & Android)
- **Recommended Framework:** React Native (with native UI components) or Flutter
- **Orientation:** Portrait only
- **Status Bar:** Dark status bar (dark text on white/light background)

## Screen Dimensions
- **Mobile Standard:** 375px width (iPhone 13/14) × 812px height
- **Safe Area:** Account for notch (44px top) and home indicator (34px bottom)
- **Scrollable:** Yes — vertically scrollable card-based layout (no horizontal scroll)

## Visual Design Direction
- **Style:** Clean, modern, slightly rounded cards on a light background — similar to Fitbit and Apple Health in philosophy, but with Strivio's own identity
- **Primary Color Scheme:** White background with **dark navy/dark blue** accents
- **Aesthetic:** Professional, motivating, uncluttered — avoid the generic "fitness green" cliché; differentiate with navy/blue tones
- **Card Design:** White cards with subtle shadows or borders, generous padding, rounded corners (12-16px radius)
- **Spacing:** 8px base grid; 16px padding between cards

---

## Layout Structure

### Top Bar (Sticky Header)
- **Height:** 56px (excluding status bar)
- **Background:** White or very light gray
- **Elements (Left to Right):**
  - **Welcome/Name** (Left-aligned): "Good morning, [Name]" — medium weight
  - **Today's Date** (Below name, muted color): "Tuesday, Apr 24"
  - **Streak Counter** (Right-aligned): Circular badge or pill with flame icon + streak number (e.g., "7"); tap opens motivational popup
- **Design Note:** Consider a subtle greeting that changes with time of day

### Scrollable Content Area
Below the header, a **vertically stacked card layout**. Cards are the primary organizational unit. Each card is a distinct section with clear visual separation.

**Card Stack Order (Top to Bottom):**

1. **Daily Overview Card** (Primary Hero Card)
2. **Daily Progress Score** (Motivational Hub)
3. **Weight Logging Card**
4. **Water Intake Card**
5. **Daily Steps Card**
6. **Burned Calories Card**

Each card expands to a detail view on tap. Keep descriptions, hints, and empty states clean.

---

## Card Specifications

### 1. Daily Overview Card — Hero Card

**Purpose:** Immediate at-a-glance view of today's key metrics. This is the most important card — visually dominant.

**Layout:** A large, prominent card with a **donut chart or circular progress** at the top (calories), surrounded by a **2x2 or 2x3 grid** of secondary metrics below.

**Content:**
| Element | Display | Interaction |
|---------|---------|-------------|
| **Calories Consumed** | Donut/ring: "[X] / [Y] kcal" — consumed vs target | Tap → detail calorie/macro view |
| **Macros** | Three mini-bars or horizontal bar chart: Protein / Carbs / Fat (grams and target) | Tap → macro breakdown |
| **Steps** | Step count + mini progress arc: "X / Y steps" | Tap → steps detail |
| **Water** | Water droplet icon + level: "X / Y ml" or "X / Y glasses" | Tap → water log settings |

**Live Updates:** Card content animates or highlights when user logs food, water, or activity throughout the day (subtle pulse or checkmark).

**Empty State:** Show target values with dashed/placeholder indicators and a hint: "Log your first meal to get started."

### 2. Daily Progress Score

**Purpose:** Gamified motivational element. A single composite score (0–100%) that answers "How am I doing today?" at a glance.

**Layout:** Standalone card, visually striking but not overwhelming. Can span full width.

**Content:**
- **Large Score Display:** Prominent circular gauge or arc showing "XX%" in bold
- **Category Breakdown** (shown below or in a modal on tap):
  - Nutrition: 40% weight
  - Workout/Rest: 25% weight
  - Steps: 20% weight
  - Water: 15% weight
- **Info Icons (i)** next to each category: tap for a plain-language explanation of how that score is calculated

**Visual Variance:**
- **Score < 40%:** Subtle cool/warm accent color (e.g., light coral or amber — not red/defeatist)
- **Score 40–70%:** Neutral positive (muted blue or teal)
- **Score 70–100%:** Strong accent (Strivio brand blue with slight glow or gradient)

**Design Philosophy:** Keep it **encouraging, not punitive**. Avoid red colors that feel like failure.

### 3. Weight Logging Card

**Purpose:** Quick weight entry and trend visibility.

**Layout:** Compact card.

**Content:**
- **Current Weight:** Large number (e.g., "78.2 kg")
- **Trend Arrow:** Up/down arrow with color coding (green arrow down if goal is weight loss, red if up — configurable based on user goal)
- **Last Logged:** "Logged 2 days ago" (muted text)
- **Action Button:** "Log Weight" button or "+" icon

**Interaction — Tap Card:**
- Opens a **modal or inline expandable** view:
  - **Numeric input** with a decimal keypad
  - **Optional note** field (optional: "Feeling good today")
  - **Weight History** mini chart (line chart, scrollable by date range)
- On save, card updates with new weight + trend

### 4. Water Intake Card

**Purpose:** Fast water logging with minimal friction.

**Layout:** Horizontal card with visual progress indicator.

**Content:**
- **Visual Progress:** Water bottle or cup icon with fill level, or horizontal bar
- **Text:** "1,250 / 2,000 ml" or "5 / 8 glasses"
- **Quick Actions:** Large **"+250 ml"** button and smaller **"- 125 ml"** button (configurable amounts)
- **Settings Icon** (gear): tap to open water log settings

**First-Time User Flow:**
- Prompt modal: "Set your daily water goal" with preset options (1500ml, 2000ml, 2500ml, 3000ml) and custom input

**Interaction:** Tap + / - buttons to increment/decrement. Tap settings to adjust daily goal and per-tap amount.

### 5. Daily Steps Card

**Purpose:** Step count at a glance.

**Layout:** Horizontal card.

**Content:**
- **Steps Today:** Large number (e.g., "6,842")
- **Progress Bar:** Steps vs daily goal with filled percentage
- **Goal:** "6,842 / 10,000 steps"
- **Mini Icon:** Shoe or foot icon

**Interaction — Tap Card:**
- Opens detail view with:
  - **Hourly bar chart** (steps by hour today)
  - **7-day trend:** Horizontal or bar chart showing steps + burned calories for the past week

**Sync Status Indicator:** Small icon showing "Synced from Apple Health" (faint, unobtrusive).

### 6. Burned Calories Card

**Purpose:** Show total daily calories burned.

**Layout:** Compact card or inline section.

**Content:**
- **Total Burned:** "2,180 kcal"
- **Breakdown (in popup or expandable):**
  - BMR: 1,650 kcal
  - Activity: 530 kcal

**Interaction — Tap:**
- Opens popup with BMR vs activity calorie breakdown

---

## Typography

### Font Recommendations
- **Primary:** Inter (free, excellent weight range, highly readable)
  - Fallback: SF Pro (iOS), Roboto (Android)
- **Secondary:** Use same font family with different weights for hierarchy

### Type Scale

| Element | Font Size | Font Weight | Line Height | Usage |
|---------|-----------|-------------|-------------|-------|
| Greeting | 20px | 600 (SemiBold) | 28px | "Good morning, [Name]" |
| Date | 13px | 400 (Regular) | 18px | "Tuesday, Apr 24" |
| Card Title | 15px | 600 (SemiBold) | 20px | Section headers within cards |
| Large Number | 28px | 700 (Bold) | 36px | Score, calorie totals |
| Metric Value | 17px | 600 (SemiBold) | 24px | Weight, steps, water |
| Body Text | 14px | 400 (Regular) | 20px | Descriptions, labels |
| Caption | 12px | 400 (Regular) | 16px | Timestamps, hints, units |
| Progress Score % | 32-36px | 700 (Bold) | 40px | Daily score number |

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary Navy | `#1A2B4A` | Main accent: icons, progress fills, buttons, score gauge |
| Primary Navy Light | `#2D4470` | Secondary accent, hover/active states |
| Primary Navy Muted | `#E8EDF5` | Light background tints, inactive progress fills |
| Background | `#F5F6FA` | Page background (very light cool gray-blue) |
| Surface (White) | `#FFFFFF` | Card backgrounds |
| Text Primary | `#1A1D26` | Main text, numbers |
| Text Secondary | `#6B7280` | Captions, labels, secondary info |
| Text Muted | `#9CA3AF` | Hints, empty states, placeholders |
| Progress Low | `#F59E0B` | Score < 40% (warm amber — encouraging) |
| Progress Mid | `#3B82F6` | Score 40-70% (blue) |
| Progress High | `#1A2B4A` | Score > 70% (brand navy — aspirational) |
| Trend Good | `#10B981` | Positive trend arrow (green) |
| Trend Bad | `#EF4444` | Negative trend arrow (red, use sparingly) |
| Water Blue | `#60A5FA` | Water intake visual element |
| Divider | `#E5E7EB` | Card borders, separators |
| Shadow | `rgba(26, 43, 74, 0.06)` | Card shadows — cool-toned to match navy |

**Design Note:** The palette avoids the typical "fitness green" and instead uses **dark navy as the primary brand color**, differentiating Strivio from competitors while feeling premium and trustworthy.

---

## Spacing System

- **Base Unit:** 8px scale
- **Values:** 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px

| Application | Value |
|-------------|-------|
| Card external gap | 12px |
| Card internal padding | 16px |
| Card corner radius | 14px |
| Section padding (screen) | 16px (horizontal), 12px (top) |
| Metric grid gap | 16px |
| Icon-to-text gap | 8px |
| Bottom safe-area padding | 24px + home indicator |

---

## Component Specifications

### Card Container
- **Background:** `#FFFFFF`
- **Border Radius:** 14px
- **Padding:** 16px internal
- **Shadow:** `0px 2px 8px rgba(26, 43, 74, 0.06)` (soft, cool-toned)
- **Border:** Optional `1px solid #E5E7EB` for extra clarity
- **Min Height:** Auto (content-driven)

### Primary Button (e.g., "Log Weight")
- **Height:** 40px
- **Padding:** 0 20px
- **Background:** `#1A2B4A` (navy)
- **Text:** White, 14px SemiBold, centered
- **Border Radius:** 10px
- **Hover/Active:** `#2D4470`
- **Disabled:** `#E8EDF5` background, `#9CA3AF` text

### Secondary Button (e.g., Water +/-)
- **Height:** 36px
- **Padding:** 0 16px
- **Background:** `#E8EDF5` (navy-muted)
- **Text:** `#1A2B4A` (navy), 14px SemiBold
- **Border Radius:** 10px
- **Active:** `#2D4470` background, white text

### Progress Bar / Ring
- **Track Color:** `#E8EDF5` (filled), transparent or `#E5E7EB` (unfilled)
- **Fill Color:** `#1A2B4A` (primary navy) — or gradient from navy to light blue
- **Height/Stroke:** 8px (bars), 6px (ring/donut)
- **Border Radius:** 4px (bars), round (ring)
- **Animation:** Smooth fill transition (300ms ease-out)

### Streak Badge
- **Shape:** Circle or pill
- **Size:** 32px diameter (circle) or auto-width (pill)
- **Background:** `#1A2B4A` (navy)
- **Text:** White, 12px Bold
- **Icon:** Flame emoji or custom flame icon (white, 14px)
- **Position:** Top-right of header

### Info Icon (i)
- **Size:** 16px × 16px
- **Color:** `#9CA3AF`
- **Action:** Tap opens tooltip/modal

---

## Iconography

**Style:** Outlined, 2px stroke, consistent with SF Symbols or Material Icons.

| Metric | Icon Suggestion |
|--------|----------------|
| Calories | Flame or bowl |
| Protein | Egg or chicken |
| Carbs | Wheat or grain |
| Fat | Drop |
| Steps | Foot/shoe print |
| Water | Water drop |
| Weight | Scale |
| Calories Burned | Fire or lightning bolt |
| Streak | Flame |
| Settings | Gear/cog |
| Info | Circle with "i" |

---

## Interactions & Animations

- **Card Tap:** Subtle scale-down (0.98) on press, navigate to detail view
- **Live Update Pulse:** When user logs food/water, the affected metric briefly pulses (scale 1.05 → 1.0) with a checkmark
- **Progress Fill:** Smooth 300ms ease-out animation when card loads (bars fill, ring rotates)
- **Score Reveal:** If progress score animates on load, count up from 0 to current score (200ms duration, ease-out)
- **Water +/- Button:** Quick scale bounce on tap (0.9 → 1.0)
- **Scroll:** Cards have slight parallax fade-in when scrolled into view (optional, keep subtle)
- **Streak Popup:** Modal slides up from bottom (300ms ease-out)

---

## Empty States & Onboarding

**First-Day User (No Data Yet):**
- Show all cards with placeholder content
- Calorie card: dashed ring with "2,000 kcal target"
- Steps: "0 / 10,000 steps" with "Syncing from Apple Health..."
- Weight: "No weight logged" with prominent "Log Weight" button
- Water: Modal on first view — "Set your daily water goal"
- Progress Score: Show a friendly "Start your day — your score will update as you log" message
- **Onboarding hint:** A subtle "Get Started" banner or tooltip pointing to first actions

---

## Accessibility Requirements

- **Contrast:** Minimum 4.5:1 for all text (body text on white); 3:1 for large numbers and UI components
- **Text Scaling:** Support dynamic type up to 150% without layout breaking
- **Touch Targets:** All tappable elements minimum 44×44px
- **ARIA Labels:** Screen reader labels for all icons, progress bars, and score elements
- **Color Independence:** Don't rely on color alone for trend indication (use arrows + text alongside color)
- **Focus Order:** Logical top-to-bottom, left-to-right tab order

---

## Dashboard Layout Wireframe (Text Representation)

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│  Good morning, Alex              🔥  7  │  ← Header + Streak
│  Tuesday, Apr 24                      │
├─────────────────────────────────────────┤
│                                         │
│  ┌─── Daily Overview ───────────────┐  │
│  │        🔥 840 / 2,000 kcal       │  │  ← Donut chart
│  │                                  │  │
│  │  Protein  Carbs   Fat            │  │  ← Macro mini-bars
│  │  █████░░  ████░░  ██░░░░         │  │
│  │                                  │  │
│  │  👣 6,842 steps    💧 1,250 ml   │  │  ← Steps + Water row
│  │  █████░░░          ███████░      │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌─── Daily Progress Score ─────────┐  │
│  │           72%                    │  │  ← Large circular gauge
│  │      [████████░░]                │  │
│  │  🥗 Nutrition 40%  ⓘ            │  │  ← Category breakdown
│  │  🏋️ Workout  25%  ⓘ            │  │
│  │  👣 Steps     20%  ⓘ            │  │
│  │  💧 Water     15%  ⓘ            │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌─── Weight ─────────────────────┐    │
│  │  78.2 kg  ↓  0.3 kg           │    │  ← Weight + trend
│  │                    [Log]       │    │  ← Button
│  └────────────────────────────────┘    │
│                                         │
│  ┌─── Water ──────────────────────┐    │
│  │  💧 5 / 8 glasses  ███████░    │    │
│  │              [+250ml] [-125ml] │⚙️  │  ← Quick actions + settings
│  └────────────────────────────────┘    │
│                                         │
│  ┌─── Steps ──────────────────────┐    │
│  │  👣 6,842 / 10,000 steps       │    │
│  │  ██████░░░░                     │    │  ← Progress bar
│  └────────────────────────────────┘    │
│                                         │
│  ┌─── Calories Burned ────────────┐    │
│  │  🔥 2,180 kcal                 │    │
│  │  BMR: 1,650  |  Activity: 530  │    │
│  └────────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│  [Home]  [Workouts]  [Logbook]  [More]  │  ← Bottom Tab Bar
└─────────────────────────────────────────┘
```

---

## Bottom Tab Bar

| Tab | Icon | Active Icon | Label |
|-----|------|-------------|-------|
| Home (Active) | Filled house | Filled house + navy fill | Home |
| Workouts | Dumbbell outline | Filled dumbbell | Workouts |
| Logbook | Clipboard outline | Filled clipboard | Logbook |
| More | Grid/dots outline | Filled grid | More |

- **Height:** 60px (excluding home indicator)
- **Background:** White with top border `1px solid #E5E7EB` or subtle shadow
- **Inactive Color:** `#9CA3AF`
- **Active Color:** `#1A2B4A` (navy)
- **Label Font:** 10px, 500 (Medium)

---

## Reference Apps & Design Patterns

### Competitor Apps
| Reference | What to Learn |
|-----------|--------------|
| **MyFitnessPal** | Calorie/macro card layout, donut chart approach to daily intake |
| **Fitbit** | Card-based dashboard layout, step tracking, sleep/recovery integration |
| **Apple Health** | Clean card hierarchy, ring/arc progress visualizations, minimalist typography |
| **Lose It!** | Engaging but non-punitive progress feedback, water logging UX |
| **Strong / Hevy** | Workout logging clarity, trend arrows for weight |
| **Cronometer** | Macro breakdown visualization, nutrient grid display |
| **Samsung Health** | Composite score concept, multi-metric dashboard with progress rings |

### Pinterest Design References (Captured via Opera Neon Browser)

| Pin / Designer | Key Elements to Reference |
|----------------|--------------------------|
| **Noot — AI cal & macro track** | Large donut calorie counter ("741 calories left"), 3-color macro bars below (green protein, orange carbs, blue fat), "Recently logged" meal list with thumbnails and macros (515 cal, 515g protein/carbs/fat) |
| **CIPHERSLAB NutritionHub** | 3-screen flow: onboarding → home with weekly progress ring (6 days) → stats with bar charts; side-by-side steps (5,500) + water (12 glass) cards; breakfast/lunch entries with fire icons |
| **FitBite** | "Good morning!" greeting header, 6-day progress ring, meal entries with fire icons + calorie ranges (456-512 kcal), bottom nav: Home, Progress, [FAB], Rewards, Menu |
| **Nutrisee** | Large green arc (1,515 cal / 1,010 left), 3 mini circles for macros (742 carbs / 197 fat / 575 protein), weekly bar chart with color-coded macro breakdown per day (S-M-T-W-T-F-S) |
| **NutriMate (dark mode)** | Dark charcoal theme with lime green accents, circular meal customizer, "Monday, May 22" date header with calendar icon, segmented tabs: Calories/Protein/Fat/Carbs |
| **AI Nutrition & Calorie Tracking App** | Circular progress (2200 kcal goal) with colored segments (blue/orange/green), water intake as cup icons filling up, mood tracking toggle, clean cream/off-white background |
| **QuadFit — Fitness App UI Kit** | Navy/dark blue primary color scheme, 4-panel dashboard layout, white text on blue gradient cards, clean outlined iconography, dark mode variant |
| **Kenko — Workout tracker** | Blue-themed cards with white backgrounds, activity summary with rings, exercise checklist with checkmarks, weekly progress visualization |

### Color Inspiration from Pinterest Research

Most fitness apps use **green** as the primary color (health association). Strivio differentiates with **dark navy**:

| App | Primary Color | Takeaway for Strivio |
|-----|---------------|---------------------|
| Noot, FitBite, Nutrisee, Nutrisee | Green (`#4ADE80`, `#86EFAC`, `#22C55E`) | Avoid — too generic in fitness space |
| QuadFit, Kenko, Luxoa | Blue/Navy (`#2563EB`, `#1E3A8A`, `#3B82F6`) | Adopt — premium, trustworthy, differentiated |
| NutriMate (dark) | Charcoal (`#1F2937`) + Lime (`#D9F99D`) | Consider for dark mode variant |

### Layout Wireframes from Pinterest Inspiration

**From Noot (Calorie + Macros):**
```
┌─────────────────────────────┐
│    741 calories left   🔥   │  ← Donut chart right-aligned
│                             │
│  134g    134g    134g      │
│  Protein Carbs  Fat         │  ← 3 colored bars
│  ████░   ████░   ████░     │
│  (green) (orange) (blue)   │
│                             │
│  Recently logged            │
│  🍝 Pasta with salmon...   │
│  🥘 Sizzling Beef Stir...  │  ← List with thumbnails
│  🥗 Hearty Quinoa and...   │
│                      [+]    │  ← FAB
└─────────────────────────────┘
```

**From FitBite (Greeting + Weekly Progress):**
```
┌─────────────────────────────┐
│  Good morning! 👋      [🔔] │
│  Your Weekly Progress   6   │  ← Week ring (green)
│  days                       │
│                             │
│  Step to walk   Drink Water │
│  5,500 steps    12 glass    │  ← Side-by-side metrics
│  👣             💧          │
│  ████░░░░░░   ████████░░    │
│                             │
│  August 2025                │
│  S  M  T  W  T  F  S        │
│     07 08 09 10 11 12 13    │  ← Mini calendar
│                             │
│  Breakfast  456-512 kcal [+]│
│  Lunch time 456-512 kcal [+]│
└─────────────────────────────┘
```

**From Nutrisee (Progress Arc + Macro Circles):**
```
┌─────────────────────────────┐
│  Keep it up! ✌️             │
│  You've tracked 6 meals     │
│  for today                  │
│                             │
│    ╭───────────╮            │
│    │ 1,515 cal │            │  ← Large green arc
│    │ 1,010 left│            │
│    ╰───────────╯            │
│                             │
│   742    197    575        │
│  Carbs  Fat   Protein      │  ← 3 circles with rings
│   ███░   ██░   ████░       │
│                             │
│  [🏠] [📋] [🥗] [] [⋮]  │  ← Bottom nav
└─────────────────────────────┘
```

**From NutriMate (Dark Mode):**
```
┌─────────────────────────────┐
│  Monday, May 22      [📅]  │
│  [Calories][Protein][Fat]  │  ← Segmented tabs
│        [Carbs]              │
│                             │
│      ╭─────────╮            │
│      │ 1700 kcal│           │  ← Lime arc on dark
│      │ 730 left │           │
│      ╰─────────╯            │
│                             │
│  Meals 5           🥣       │
│  [image of granola bowl]    │
│  with berries floating      │
└─────────────────────────────┘
```

---

## Implementation Notes

1. **Data Freshness:** All card data should pull from a single state management source (e.g., Redux, Zustand, or Riverpod). Cards update reactively when data changes.

2. **Modals:** Detail views (calorie breakdown, progress score explanation, weight history) should open as **bottom sheet modals** rather than full-screen pages — keeps context and reduces navigation depth.

3. **Sync Handling:** Apple Health / Google Fit sync should be indicated with a subtle, non-blocking status indicator. Failed syncs show a gentle "Tap to retry" — never a blocking error.

4. **Performance:** Cards should render with placeholder/skeleton states while data loads. Show skeleton cards on cold start, then animate in real data.

5. **Dark Mode:** All colors should have dark mode equivalents. Navy primary becomes lighter on dark backgrounds (`#3B82F6` or similar). Card background shifts to `#1E293B`, page background to `#0F172A`.

6. **Personalization:** The progress score weights (Nutrition 40%, Workout 25%, Steps 20%, Water 15%) should be configurable in settings if user goals differ (e.g., someone focused purely on weight loss may want Nutrition weighted higher).
