# UI Implementation Prompt: Workout Tab (Strivio)

## Context

The Workout Tab is the **core activity hub** of the Strivio fitness & nutrition coaching app. It is where users view today's scheduled workout, browse libraries, build custom workouts, execute training sessions, and manage their fitness routine.

**Role in the app:** This is the most frequently used tab during active training days. It must balance **quick access** (tap → start workout) with **deep functionality** (library browsing, custom building, scheduling). The freemium model is deeply woven into this tab — core execution is Free, but exploration, customization, and coaching are Premium-gated.

**Key differentiator:** Strivio's "Build with Coach" feature where the user provides parameters and the digital coach generates a structured plan. This is collaborative AI, not just auto-generation. The user retains full editing freedom.

---

## Platform
- **Type:** Mobile App (iOS & Android)
- **Recommended Framework:** React Native (with native UI components) or Flutter
- **Orientation:** Portrait only
- **Status Bar:** Dark status bar (dark text on white/light background)

## Screen Dimensions
- **Mobile Standard:** 375px width (iPhone 13/14) x 812px height
- **Safe Area:** Account for notch (44px top) and home indicator (34px bottom)
- **Scrollable:** Yes — vertically scrollable card-based layout (default view)

## Visual Design Direction
- **Style:** Clean, modern card-based layout consistent with the Tracking Tab — same design language, same spacing, same components
- **Primary Color Scheme:** White background with **dark navy** accents (matching the rest of the app)
- **Aesthetic:** Professional, motivating, uncluttered — navy/blue tones, no "fitness green" cliché
- **Card Design:** White cards with subtle shadows, generous padding, 14px border radius
- **Spacing:** 8px base grid; 12px gap between cards; 16px screen padding
- **During Workout Execution:** Shift to high-contrast, full-screen, one-handed layout with arm's-length readability

---

## Shared Design Tokens

Consistent with Tracking Tab, Onboarding, and Auth screens.

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary Navy | `#1A2B4A` | Buttons, selected states, progress fills, active icons |
| Primary Navy Light | `#2D4470` | Hover/active button states, pressed states |
| Primary Navy Muted | `#E8EDF5` | Unselected card backgrounds, inactive elements |
| Background | `#F5F6FA` | Page background |
| Surface (White) | `#FFFFFF` | Card backgrounds |
| Text Primary | `#1A1D26` | Main text, labels, numbers |
| Text Secondary | `#6B7280` | Captions, descriptions, secondary info |
| Text Muted | `#9CA3AF` | Hints, placeholders, disabled text |
| Premium Gold | `#F59E0B` | Premium/upgrade badges, lock icons, paywall accents |
| Success Green | `#10B981` | Completed checkmarks, favorite active state |
| Error Red | `#EF4444` | Error states, validation failures |
| Water Blue | `#60A5FA` | Accent color for secondary elements |
| Divider | `#E5E7EB` | Card borders, list separators |
| Shadow | `rgba(26, 43, 74, 0.06)` | Card shadows (cool-toned) |
| Workout Execution BG | `#1A2B4A` | Background during workout execution (dark mode style) |
| Workout Execution Text | `#FFFFFF` | Text on dark workout execution background |

### Typography

| Element | Font Size | Font Weight | Line Height | Usage |
|---------|-----------|-------------|-------------|-------|
| Screen Title | 22px | 700 (Bold) | 28px | "Workout", "Workout Library" |
| Card Title | 16px | 600 (SemiBold) | 22px | Exercise names, workout names |
| Body Text | 14px | 400 (Regular) | 20px | Descriptions, labels |
| Body Text Bold | 14px | 600 (SemiBold) | 20px | Emphasized labels |
| Metric Value | 18px | 600 (SemiBold) | 24px | Duration, difficulty |
| Large Number | 28px | 700 (Bold) | 36px | Execution screen exercise numbers |
| Caption | 12px | 400 (Regular) | 16px | Timestamps, hints, tags |
| Button Text | 15px | 600 (SemiBold) | 20px | CTA buttons |
| Execution Label | 16px | 600 (SemiBold) | 22px | Sets/reps labels in workout mode |
| Execution Value | 20px | 700 (Bold) | 28px | Weight/reps input in workout mode |

**Font:** Inter (primary), SF Pro (iOS fallback), Roboto (Android fallback)

### Spacing System

| Application | Value |
|-------------|-------|
| Screen horizontal padding | 16px |
| Screen top padding | 12px |
| Card gap | 12px |
| Card internal padding | 16px |
| Card corner radius | 14px |
| Section gap | 20px |
| Icon-to-text gap | 8px |
| Element-to-element gap | 12px |
| Bottom safe-area padding | 24px + home indicator |

---

## Component Specifications

### Card Container
- **Background:** `#FFFFFF`
- **Border Radius:** 14px
- **Padding:** 16px internal
- **Shadow:** `0px 2px 8px rgba(26, 43, 74, 0.06)`
- **Border:** `1px solid #E5E7EB` (optional)

### Primary Button
- **Height:** 44px
- **Padding:** 0 24px
- **Background:** `#1A2B4A`
- **Text:** White, 15px SemiBold, centered
- **Border Radius:** 12px
- **Active State:** `#2D4470`
- **Disabled:** `#E8EDF5` bg, `#9CA3AF` text

### Secondary Button
- **Height:** 40px
- **Padding:** 0 20px
- **Background:** `#E8EDF5`
- **Text:** `#1A2B4A`, 14px SemiBold
- **Border Radius:** 10px
- **Active:** Navy bg, white text

### Filter Chip
- **Height:** 32px
- **Padding:** 0 14px
- **Unselected:** `#F5F6FA` bg, `#6B7280` text, `#E5E7EB` border
- **Selected:** `#1A2B4A` bg, white text
- **Border Radius:** 16px (pill)
- **Font:** 12px, 500 (Medium)
- **Gap:** 8px between chips

### Tag/Muscle Group Chip
- **Height:** 26px
- **Padding:** 0 10px
- **Background:** `#E8EDF5`
- **Text:** `#1A2B4A`, 11px, 600 (SemiBold)
- **Border Radius:** 6px

### Difficulty Badge
- **Padding:** 4px 10px
- **Beginner:** `#10B981` bg, white text
- **Intermediate:** `#3B82F6` bg, white text
- **Advanced:** `#EF4444` bg, white text
- **Border Radius:** 6px
- **Font:** 11px, 600 (SemiBold)

### Premium Badge (Lock/Upgrade)
- **Icon:** Lock icon, 14px
- **Color:** `#F59E0B` (gold/amber)
- **Background:** `#FEF3C7` (light amber tint)
- **Border Radius:** 6px
- **Label Text:** "Premium", 11px, `#B45309`

### Heart/Favorite Icon
- **Unfilled:** Outline heart, 20px, `#9CA3AF`
- **Filled:** Solid heart, 20px, `#EF4444` or `#10B981`
- **Touch Target:** 44x44px

### Exercise List Item
- **Height:** 64px min
- **Background:** White
- **Border Bottom:** `1px solid #E5E7EB`
- **Left:** Exercise thumbnail (40x40px square, rounded)
- **Center:** Name (14px SemiBold), sets x reps (12px muted)
- **Right:** Equipment icon (16px), drag handle for edit mode (Premium)

### Search Bar
- **Height:** 40px
- **Background:** `#F5F6FA`
- **Border Radius:** 10px
- **Padding:** 0 14px
- **Placeholder:** "Search workouts..." or "Search exercises..."
- **Icon:** Search icon, 16px, `#9CA3AF` (left)
- **Clear Button:** X icon, 14px, `#9CA3AF` (right, visible when text entered)

### Rest Timer Badge
- **Shape:** Circular
- **Size:** 60px diameter
- **Background:** `#1A2B4A` (navy)
- **Text:** White, 24px Bold (remaining seconds)
- **Border:** 3px solid `#60A5FA` (blue progress arc)
- **Pulse Animation:** Scale 1.0 -> 1.1 -> 1.0 when timer < 5 seconds

### Progress Bar (Workout Execution)
- **Height:** 4px
- **Track:** `rgba(255,255,255,0.2)` on dark bg
- **Fill:** `#60A5FA` (blue)
- **Border Radius:** 2px

---

## Screen-by-Screen Specifications

---

### Screen 1: Workout Tab — Default View (Today's Workout Card)

**Purpose:** The first screen users see when opening the Workout Tab. Shows what's scheduled for today.

#### Layout

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│  Workout                          [⚙️]  │  ← Title + Settings icon
│                                          │
│  Today's Workout                         │  ← Section label
│  ┌───────────────────────────────────┐  │
│  │ 📅 Tuesday, Apr 25                │  │  ← Day + date
│  │                                   │  │
│  │  Upper Body Strength              │  │  ← Workout name (20px Bold)
│  │  45 min  Intermediate  Dumbbells  │  │  ← Metadata row
│  │  [Chest] [Back] [Shoulders]       │  │  ← Muscle group tags
│  │                                   │  │
│  │  6 exercises                      │  │  ← Quick summary
│  │                                   │  │
│  │  [  ▶  Start Workout  ]           │  │  ← Primary CTA
│  │  [Mark Complete] [Mark Rest Day]  │  │  ← Secondary actions
│  └───────────────────────────────────┘  │
│                                          │
│  ┌─── Quick Actions ───────────────┐    │
│  │  [📚 Workout Lib] [💪 Exercise Lib] │  │  ← Premium icons with locks
│  │  [➕ Build Custom] [📝 Log Activity] │  │  ← Free icon
│  └──────────────────────────────────┘    │
│                                          │
│  [Home] [Workouts] [Logbook] [More]      │  ← Bottom Tab Bar
└─────────────────────────────────────────┘
```

#### Three View States

**State A: Scheduled Workout (Default)**
- Prominent workout card with full details
- Primary CTA: "Start Workout" (navy, full-width)
- Secondary actions below: "Mark as Complete" and "Mark as Rest Day"
- Shows: workout name, duration, difficulty, equipment, muscle group tags, exercise count

**State B: Rest Day**
- Calm, minimal card
- Icon: relaxed figure or moon/leaf icon
- Text: "Rest Day — Recovery is part of the plan"
- Subtext: "Your next workout: Upper Body Strength — Wed, Apr 26"
- Option: "Start a workout anyway" → opens Workout Library (Premium)
- Background tint: `#E8EDF5` (navy-muted) to differentiate from scheduled card

**State C: Recommended Workout (Premium only)**
- Similar to State A but with coach recommendation badge
- Badge: "Coach Recommended" with coach avatar
- Additional actions: "Replace Workout" and "Choose Different Day"
- If user taps "Replace" → opens Workout Library pre-filtered

#### Quick Actions Row
- Horizontal row of 4 icon buttons (or 2x2 grid on narrow screens)
- Each button: icon + label
- Premium buttons have a small lock icon (`#F59E0B`)
- Buttons:
  - Workout Library (📚) — Premium
  - Exercise Library (💪) — Premium
  - Build Custom (➕) — Premium
  - Log Activity (📝) — Free

#### Top Right: Settings Icon
- Gear icon (`#6B7280`)
- Opens Workout Settings (Premium) or a simple settings notice for Free users

---

### Screen 2: Workout Library (Premium)

**Purpose:** Browse the full catalog of pre-built workouts with search and filtering.

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Back    Workout Library         🔍   │  ← Search trigger
├─────────────────────────────────────────┤
│  [Search bar]                           │  ← "Search workouts..."
│                                          │
│  Filter Chips (horizontal scroll):       │
│  [All] [Chest] [Back] [Legs] [Shoulders] │  ← Muscle group
│  [Arms] [Core] [Full Body]               │
│                                          │
│  Secondary filters (expandable row):     │
│  [Beginner] [All Durations ▼] [All Equip ▼] │
│                                          │
│  ┌─── Workout Card ────────────────┐    │
│  │  Upper Body Strength     ❤️     │    │  ← Heart/favorite
│  │  Build overall upper body...    │    │  ← Description (1 line)
│  │  45 min  ⚡ Intermediate        │    │
│  │  [Chest] [Back] [Shoulders]     │    │
│  │  Dumbbells                     │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Workout Card ────────────────┐    │
│  │  Core Crusher             ❤️    │    │
│  │  Sculpt your midsection...      │    │
│  │  30 min  🟢 Beginner            │    │
│  │  [Core]                         │    │
│  │  Bodyweight                    │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ... (scrollable list continues)          │
│                                          │
│  [Home] [Workouts] [Logbook] [More]      │
└─────────────────────────────────────────┘
```

#### Workout Card Specification
- **Padding:** 16px
- **Top Row:** Workout name (16px SemiBold) + Heart icon (right-aligned)
- **Description:** 1 line max, truncate with ellipsis, 13px `#6B7280`
- **Metadata Row:** Duration + Difficulty badge + Equipment text, 12px
- **Tags Row:** Muscle group chips (scrollable if >3), 11px
- **Bottom:** Equipment icon + text, 12px `#9CA3AF`

#### Filter Behavior
- Primary filter (muscle group): single-select horizontal chips
- Secondary filters (difficulty, duration, equipment): dropdown/popup menus
- "All" chip resets all filters
- Filter count badge shown when filters active (e.g., "3 filters")
- Results count shown: "12 workouts"

#### Exercise History (Premium — from Workout Card)
- Accessible via "View History" link on workout card detail
- Shows: "Last 30 Days" with line chart (weight trend)
- "Previous Sessions" — scrollable list of past workouts with date, weight, reps
- Each session entry: date, total volume, duration

---

### Screen 3: Exercise Library (Premium)

**Purpose:** Browse individual exercises for reference or when building custom workouts.

#### Layout
Same card-list pattern as Workout Library, but with exercise-specific details:

- **Card Content:** Exercise name, thumbnail image (40x40px), target muscle tags, equipment type, difficulty
- **Tap → Exercise Detail View:**
  - Large exercise image/GIF at top
  - Name (20px Bold)
  - Description / form tips (14px)
  - Target muscle group (visual diagram or tag)
  - Equipment required
  - Difficulty badge
  - "Add to Workout" button (when in Build flow)

#### Exercise Detail Header
```
┌─────────────────────────────────────────┐
│  ← Back    Exercise Detail        ❤️    │
├─────────────────────────────────────────┤
│  [Exercise Image / GIF - full width]    │
│                                          │
│  Barbell Bench Press                    │  ← 20px Bold
│  Compound  Dumbbells  Intermediate      │  ← Metadata
│                                          │
│  Form Tips                              │  ← Section header
│  Lie flat on bench, feet planted.       │  ← Body text
│  Lower bar to mid-chest, press up...    │
│                                          │
│  Target Muscles                         │
│  [Chest] [Triceps] [Shoulders]          │  ← Tags
│                                          │
│  [  + Add to Workout  ]                 │  ← CTA (contextual)
└─────────────────────────────────────────┘
```

---

### Screen 4: Build Custom Workout — "Build Your Own" (Premium)

**Purpose:** Multi-step wizard for creating workouts from scratch.

#### Step 1: Add Exercises
- Full Exercise Library view with "Add" buttons on each exercise
- "Added Exercises" collapsible panel at top showing current selections
- Each added exercise shows: name, sets x reps, remove (X) button
- "Done" button appears when at least 1 exercise is added

#### Step 2: Configure (Inline with Step 1)
- Tap an added exercise → expand to show:
  - Sets input (numeric stepper: 1-10)
  - Reps input (numeric keypad or preset: 5, 8, 10, 12, 15)
  - Duration input (for timed exercises)
  - Rest time override (optional)

#### Step 3: Review & Save
- Full list of exercises with all configurations
- "Edit" button to return to Step 1/2
- "Save Workout" CTA (navy)
- "Discard" secondary button
- On save: prompt for workout name + optional description

```
┌─────────────────────────────────────────┐
│  ← Back    Build Your Own         [Done] │
├─────────────────────────────────────────┤
│  Added Exercises (3)                    │  ← Collapsible
│  ┌─────────────────────────────────┐    │
│  │  1. Barbell Bench Press         │    │
│  │     4 sets x 10 reps            │    │
│  │     [ - 4 + ]  [ - 10 + ]       │    │  ← Stepper controls
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  2. Bent Over Row               │    │
│  │     3 sets x 12 reps            │    │
│  │     [ - 3 + ]  [ - 12 + ]       │    │
│  └─────────────────────────────────┘    │
│                                          │
│  ┌─── Exercise Library ──────────┐      │
│  │  [Search bar]                  │      │
│  │  💪 Incline Dumbbell Press  [+] │     │  ← Add button
│  │  💪 Dumbbell Fly           [+] │     │
│  │  ...                           │     │
│  └─────────────────────────────────┘      │
│                                          │
│  [  💾  Save Workout  ] [Discard]        │
└─────────────────────────────────────────┘
```

---

### Screen 5: Build with Coach (Premium)

**Purpose:** Guided parameter input → AI coach generates workout → user reviews and saves. Follows the same one-question-per-screen pattern as the onboarding flow.

#### Step 1-6: Parameter Input (One Question Per Screen)

Each screen follows the Typeform-style pattern (matching onboarding):

**Screen A — Time Available**
```
┌─────────────────────────────────────────┐
│  ◀                    Coach Plans   [✕] │
├─────────────────────────────────────────┤
│                                          │
│  How much time do you have?             │  ← Question
│  Build a workout that fits your schedule │  ← Subtext
│                                          │
│  ┌───────────────────────────────────┐  │
│  │  ⏱  30 minutes                   │  │  ← Option card
│  │  Quick session                    │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  ⏱  45 minutes                   │  │
│  │  Standard session                 │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  ⏱  60 minutes                   │  │
│  │  Extended session                 │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  ⏱  90 minutes                   │  │
│  │  Long session                     │  │
│  └───────────────────────────────────┘  │
│                                          │
│  [  Continue  ]                          │  ← Primary CTA
└─────────────────────────────────────────┘
```

**Screen B — Target (Goal)**
- Options: Strength, Hypertrophy, Endurance, Fat Loss
- Each with icon + short description

**Screen C — Goals (Multi-select)**
- Options: Build muscle, Improve mobility, Increase power, Tone up, etc.
- Multi-select (max 3)

**Screen D — Fitness Level**
- Options: Beginner, Intermediate, Advanced
- Each with description

**Screen E — Weekly Volume (Slider)**
- Slider: 1-7 workouts per week
- Shows selected value prominently

**Screen F — Custom Days (Multi-select)**
- Day chips: Mon, Tue, Wed, Thu, Fri, Sat, Sun
- Multi-select (matching weekly volume)

#### Step 2: Coach Generates
- Loading screen: coach avatar with pulsing animation
- Sequential checklist:
  - "Analyzing your goals..." (check ✓)
  - "Selecting exercises..." (check ✓)
  - "Balancing volume..." (check ✓)
  - "Building your plan..." (check ✓)
- Duration: ~3-5 seconds total

#### Step 3: Review & Save
```
┌─────────────────────────────────────────┐
│  ← Back    Coach's Plan            [✕]  │
├─────────────────────────────────────────┤
│  🧠 Your coach put this together       │  ← Coach intro
│  based on your 45-min strength goals   │
│                                          │
│  Upper Body Power Day                  │  ← Generated title
│  45 min  Intermediate  Barbell         │  ← Metadata
│                                          │
│  1. Barbell Bench Press     4 x 8      │  ← Exercise list
│  2. Barbell Row             4 x 10     │     (tappable to edit)
│  3. Overhead Press          3 x 10     │
│  4. Pull-Ups                3 x 8      │
│  5. Barbell Curl            3 x 12     │
│  6. Skull Crushers          3 x 12     │
│                                          │
│  [  ✏️  Edit Workout  ]                 │  ← Opens edit mode
│  [  💾  Save to Library  ] [Discard]    │
└─────────────────────────────────────────┘
```

**Paywall Logic:** If user is not subscribed, "Save to Library" triggers a modal:
- "Subscribe to save this workout"
- Brief value proposition of Premium
- "Subscribe" CTA + "Maybe Later" secondary

---

### Screen 6: Edit Existing Workout (Premium)

**Purpose:** Modify any saved or scheduled workout after creation.

#### Layout
```
┌─────────────────────────────────────────┐
│  ← Back    Edit Workout           [Done] │
├─────────────────────────────────────────┤
│  Workout name (editable text field)      │
│  Optional description (editable)         │
│                                          │
│  Exercise Order (drag to reorder):       │
│  ┌─────────────────────────────────┐    │
│  │  ☰  1. Barbell Bench Press     │    │  ← Drag handle
│  │     4 sets x 10 reps           │    │     Tap → edit
│  │              [🗑️] [✏️]         │    │     Delete + Edit
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  ☰  2. Bent Over Row           │    │
│  │     4 sets x 10 reps           │    │
│  │              [🗑️] [✏️]         │    │
│  └─────────────────────────────────┘    │
│  ...                                     │
│                                          │
│  [  + Add Exercise  ]                    │  ← Opens Exercise Library
│                                          │
│  [  💾  Save Changes  ]                  │  ← Primary CTA
└─────────────────────────────────────────┘
```

#### Interactions
- **Drag handle (☰):** Long-press or grab to reorder exercises
- **Edit (✏️):** Tap → inline expand to show sets/reps/duration inputs
- **Delete (🗑️):** Tap → confirm "Remove this exercise?"
- **Add Exercise:** Opens Exercise Library as bottom sheet; tap exercise to add to end of list
- **Save Changes:** Prominent navy button at bottom

---

### Screen 7: Workout Detail Page (Central Hub)

**Purpose:** The convergence point. Every pathway (Today's Workout, Library, Custom, History) flows here before execution.

#### Layout
```
┌─────────────────────────────────────────┐
│  ← Back       Workout Details     [⚙️]  │  ← Settings icon (Premium)
├─────────────────────────────────────────┤
│                                          │
│  Upper Body Strength                    │  ← 22px Bold
│  Build overall upper body strength      │  ← Description
│  with compound movements.               │
│                                          │
│  ┌───────────────────────────────────┐  │
│  │  ⏱ 45 min    ⚡ Intermediate      │  │  ← Info row
│  │  🏋️ Barbell + Dumbbells          │  │
│  │  🔥 ~320 kcal                    │  │
│  └───────────────────────────────────┘  │
│                                          │
│  [Chest] [Back] [Shoulders] [Arms]      │  ← Muscle group tags
│                                          │
│  Your PR                                 │  ← Section (if applicable)
│  Best: 80kg x 8 on Bench Press          │  ← PR text
│  achieved Mar 18                        │
│                                          │
│  Exercises (6)                           │  ← Section header
│  ┌─────────────────────────────────┐    │
│  │  [img]  1. Barbell Bench Press   │    │
│  │         4 sets x 8-10 reps      │    │
│  │         🏋️ Barbell              │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  [img]  2. Bent Over Row         │    │
│  │         4 sets x 10 reps        │    │
│  │         🏋️ Barbell              │    │
│  └─────────────────────────────────┘    │
│  ... (remaining exercises)               │
│                                          │
│  Notes (optional)                        │  ← Collapsible
│  "Focus on slow eccentric"               │
│                                          │
├─────────────────────────────────────────┤
│  [▶ Start] [✏️ Edit] [❤️] [📤]         │  ← Action bar (sticky bottom)
│   Free      Premium  Free  Free         │
└─────────────────────────────────────────┘
```

#### Action Bar (Sticky Bottom)
| Button | Tier | Icon | Text |
|--------|------|------|------|
| Start Workout | Free | ▶ | "Start" (navy, full-weight) |
| Edit Workout | Premium | ✏️ | "Edit" (secondary button) |
| Favorite | Free | ❤️ | Heart icon only |
| Share | Free | 📤 | Share icon only |

- **Layout:** Start button takes ~50% width; Edit ~30%; Heart + Share ~10% each
- Heart and Share are icon-only buttons (44x44px touch targets)

#### Settings Gear Icon (Top Right)
- Opens Workout Settings (Premium) — see Screen 10
- For Free users: shows "Settings available with Premium" toast

---

### Screen 8: Workout Execution Flow (Free)

**Purpose:** Full-screen, high-contrast, one-handed execution experience. Designed for use during the workout — readable at arm's length.

#### Pre-Workout: Countdown Screen

```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐  │
│  │  Getting Ready...                 │  │  ← Small label
│  │                                   │  │
│  │         3                         │  │  ← Giant number
│  │      (circular progress ring)     │  │     72px Bold
│  │                                   │  │
│  │  Upper Body Strength              │  │  ← Workout name
│  │  6 exercises  •  45 min           │  │
│  └───────────────────────────────────┘  │
│                                          │
│  [  Skip  ]                              │  ← Secondary action
└─────────────────────────────────────────┘
```

- **Background:** Dark navy (`#1A2B4A`)
- **Text:** White
- **Countdown number:** 72px Bold, with circular progress ring animation
- **Duration:** Configurable via Workout Settings (default 3 seconds)

#### In-Workout: Exercise Screen

```
┌─────────────────────────────────────────┐
│  ← Exit     3 / 6 exercises    ⏱ 12:34  │  ← Top bar: exit, progress, timer
│  ████████████████░░░░░░░░░░░░░           │  ← Progress bar (50% fill)
├─────────────────────────────────────────┤
│                                          │
│  Barbell Bench Press                     │  ← Exercise name (22px Bold)
│  Set 2 of 4                              │  ← Set counter (16px, blue)
│                                          │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │    [Exercise Image / GIF]         │  │  ← Full-width image
│  │    (demonstration)                │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                          │
│  ┌───────────────────────────────────┐  │
│  │  Target: 10 reps                  │  │  ← Rep target
│  │  Last time: 60kg x 10             │  │  ← Previous performance (muted)
│  │                                   │  │
│  │  Weight    Reps                   │  │  ← Input labels
│  │  ┌─────┐  ┌─────┐                │  │
│  │  │ 60  │  │  10 │                │  │  ← Numeric inputs
│  │  └─────┘  └─────┘                │  │
│  │  kg         reps                  │  │
│  └───────────────────────────────────┘  │
│                                          │
│  ┌─── Set Tracker ─────────────────┐    │
│  │  Set 1: 60kg x 10 ✓             │    │  ← Completed sets
│  │  Set 2: --                      │    │  ← Current set
│  │  Set 3: --                      │    │
│  │  Set 4: --                      │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Next Up ─────────────────────┐    │
│  │  [img] Bent Over Row            │    │  ← Next exercise preview
│  │         4 sets x 10 reps        │    │
│  └──────────────────────────────────┘    │
│                                          │
│  [  Complete Set  ]                      │  ← Large primary button
│  [  ◀ Prev  ]  [  Next ▶  ]             │  ← Navigation (appears after last set)
└─────────────────────────────────────────┘
```

#### Design Notes (Execution Screen)
- **Background:** Dark navy (`#1A2B4A`) — reduces glare, saves battery, distinguishes from browsing mode
- **All text:** White, minimum 16px, high contrast
- **Primary button ("Complete Set"):** Large (56px height), full-width, blue (`#3B82F6`) for visibility
- **Inputs:** Large touch targets for sweaty fingers — 56px height minimum
- **One-handed design:** "Complete Set" button in bottom third, thumb-reachable
- **Exercise image:** Central focal point, visible at arm's length

#### Rest Timer Screen (Auto-displays after set completion)

```
┌─────────────────────────────────────────┐
│                                          │
│        ┌──────┐                          │
│        │  45  │                          │  ← Large countdown circle
│        └──────┘                          │     (60px diameter)
│        Rest Timer                        │     Blue border progress
│                                          │
│  Getting ready for Set 3...              │  ← Next action hint
│                                          │
│  [  ⏭  Skip Rest  ]                      │  ← Skip button
│                                          │
└─────────────────────────────────────────┘
```

- **Pulse animation:** Timer glows/pulses when < 5 seconds remain
- **Skip button:** Always visible, large touch target
- **Auto-advance:** When timer hits 0, screen fades back to exercise view

#### Completion Summary Screen

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│                                          │
│           🎉                            │  ← Celebration icon/animation
│                                          │
│  Workout Complete!                      │  ← 24px Bold
│  Great job, [Name]!                     │  ← Personalized message
│                                          │
│  ┌───────────────────────────────────┐  │
│  │  ⏱  Total Time                    │  │
│  │  42 min                           │  │  ← Large number
│  │                                   │  │
│  │  🔥 Est. Calories                 │  │
│  │  340 kcal                         │  │
│  │                                   │  │
│  │  🏆 PRs Achieved                  │  │
│  │  New PR: Barbell Bench Press      │  │  ← PR list (if any)
│  │  65kg x 8 (was 60kg x 8)         │  │
│  └───────────────────────────────────┘  │
│                                          │
│  [  View Details  ]  [  Done  ]          │  ← Primary actions
└─────────────────────────────────────────┘
```

- **Background:** White (returns to light mode after dark execution)
- **Celebration:** Subtle confetti or glow animation (CSS/React Native animation)
- **PRs section:** Only shown if PRs were achieved during session
- **"Done"** returns to Workout Tab (Today's view)
- **"View Details"** opens full workout log entry

---

### Screen 9: Workout Settings (Premium)

**Purpose:** Configure rest timer, countdown, and other execution preferences.

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Back    Workout Settings             │
├─────────────────────────────────────────┤
│                                          │
│  Rest Timer                             │  ← Section header
│  ┌───────────────────────────────────┐  │
│  │  Default Rest Duration            │  │  ← Setting row
│  │     ○ 60s   ○ 90s   ● 120s       │  │     Radio options
│  │     ○ 180s  ○ Custom...           │  │
│  └───────────────────────────────────┘  │
│                                          │
│  ┌───────────────────────────────────┐  │
│  │  Pre-Exercise Rest Override       │  │  ← Toggle row
│  │  Extra rest before first set      │  │
│  │     [Toggle ON] → 120s            │  │
│  └───────────────────────────────────┘  │
│                                          │
│  Countdown                               │
│  ┌───────────────────────────────────┐  │
│  │  Pre-Workout Countdown            │  │  ← Radio options
│  │     ● 3 seconds   ○ 5 seconds    │  │
│  │     ○ Disabled                    │  │
│  └───────────────────────────────────┘  │
│                                          │
│  💡 Settings apply to all workouts.     │  ← Info note
│     Changes take effect immediately.    │
│                                          │
└─────────────────────────────────────────┘
```

#### Settings Detail

| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Default Rest Duration | Radio select | 60s, 90s, 120s, 180s, Custom | 90s |
| Pre-Exercise Rest Override | Toggle + duration | ON/OFF + custom duration | OFF, 120s |
| Pre-Workout Countdown | Radio select | 3s, 5s, Disabled | 3s |

- **Custom duration:** Opens numeric input with unit selector (seconds)
- Changes save automatically (no "Save" button needed)
- Free users see these settings greyed out with "Available with Premium" label

---

### Screen 10: 2 Week Schedule (Coach Activity Tab)

**Purpose:** View the full 14-day coach-generated plan. Accessible from the Coach Activity Tab (separate from the Workout Tab).

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Back    Coach Activity               │
├─────────────────────────────────────────┤
│                                          │
│  Your 2-Week Plan                       │  ← Section header
│                                          │
│  ┌─── Week 1 ──────────────────────┐    │
│  │  Mon  Tue  Wed  Thu  Fri  Sat  Sun │  │  ← Day chips row
│  │  22   23   24   25   26   27   28 │  │
│  │  🏋️  🏋️  😴  🏋️  🏋️  😴  🏋️  │  │  ← Day type indicators
│  │  ✅   ✅   😴   •    🏋️  😴  🏋️  │  │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Week 2 ──────────────────────┐    │
│  │  Mon  Tue  Wed  Thu  Fri  Sat  Sun │  │
│  │  29   30   1    2    3    4    5   │  │
│  │  🏋️  🏋️  😴  🏋️  🏋️  😴  🏋️  │  │
│  │  🏋️  🏋️  😴   ?    ?    ?    ?   │  │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Today's Plan ────────────────┐    │
│  │  Today — Tue, Apr 25            │    │
│  │  Upper Body Strength            │    │
│  │  45 min  Intermediate           │    │
│  │  [  ▶  Start Workout  ]         │    │
│  │  [Replace] [Choose Different Day]│    │  ← Premium actions
│  └──────────────────────────────────┘    │
│                                          │
│  Legend: 🏋️ Workout  😴 Rest Day  ✅ Completed │
│                                          │
│  [Home] [Workouts] [Logbook] [More]      │
└─────────────────────────────────────────┘
```

#### Day Chip Specification
- **Shape:** Circular or rounded square
- **Size:** 40x40px
- **Today:** Navy background (`#1A2B4A`), white text + indicator
- **Completed:** Dimmed navy (`#E8EDF5`), checkmark overlay (`#10B981`)
- **Rest Day:** Light background, resting icon (😴 or moon)
- **Scheduled:** Default background, workout indicator icon
- **Past (uncompleted):** Strikethrough or dashed border

#### Interaction
- **Tap day chip** → opens Workout Detail Page for that day
- **Swipe horizontally** → navigate between days
- **Premium actions** on today's card: Replace Workout, Choose Different Day
- Week headers: "Week 1" / "Week 2" or date ranges

---

### Screen 11: Log Recent Activity (Free)

**Purpose:** Quick manual log for non-scheduled activities (running, cycling, etc.).

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Back    Log Activity                 │
├─────────────────────────────────────────┤
│                                          │
│  What did you do?                       │  ← Question
│  ┌───────────────────────────────────┐  │
│  │  🏃  Running                      │  │  ← Activity type selector
│  │     [Dropdown ▼]                  │  │
│  └───────────────────────────────────┘  │
│                                          │
│  Duration                               │  ← Field label
│  ┌─────────┐  ┌─────────┐              │
│  │   30    │  │   min   │              │  ← Value + Unit
│  └─────────┘  └─────────┘              │
│                                          │
│  Distance (optional)                    │
│  ┌─────────┐  ┌─────────┐              │
│  │   5.2   │  │   km    │              │
│  └─────────┘  └─────────┘              │
│                                          │
│  Calories (optional)                    │
│  ┌──────────┐                           │
│  │   280    │                           │  ← Numeric input
│  └──────────┘                           │
│                                          │
│  [  💾  Save Activity  ]                 │  ← Primary CTA
└─────────────────────────────────────────┘
```

#### Activity Type Options
- Running, Walking, Cycling, Swimming, Hiking, Sports, Yoga, HIIT, Other
- Search/filter within dropdown

---

### Screen 12: Premium Paywall Modal

**Purpose:** Triggered when Free user attempts to access Premium features.

#### Layout

```
┌─────────────────────────────────────────┐
│  [Dimmed background - Workout Tab below] │
│                                          │
│  ┌───────────────────────────────────┐  │
│  │         🏆                        │  │  ← Premium crown icon
│  │                                   │  │
│  │  Unlock Premium                  │  │  ← 22px Bold
│  │                                   │  │
│  │  Get personalized coach plans,   │  │  ← Body text
│  │  full workout & exercise         │  │
│  │  libraries, custom building,     │  │
│  │  and more.                       │  │
│  │                                   │  │
│  │  ✓ Coach-Generated Plans         │  │  ← Feature list
│  │  ✓ Full Workout Library          │  │
│  │  ✓ Exercise Library + History    │  │
│  │  ✓ Build Custom Workouts         │  │
│  │  ✓ 2-Week Schedule               │  │
│  │  ✓ Workout Settings              │  │
│  │                                   │  │
│  │  [  Start Free Trial  ]           │  │  ← Primary CTA (navy)
│  │  [  Maybe Later  ]                │  │  ← Secondary
│  └───────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

- **Trigger context-aware:** The modal can mention the specific feature being accessed
- **Free Trial:** 7-day or 14-day trial (configurable)
- **Dismiss:** Tap outside modal or "Maybe Later"

---

## Workout Execution Flow — Full State Machine

```
[Workout Detail Page]
       │
       ▼ (tap "Start")
[3-2-1 Countdown Screen] — configurable duration
       │
       ▼ (countdown ends or skip)
[Exercise Screen — Exercise 1]
       │
       ▼ (tap "Complete Set")
[Rest Timer Screen] — auto-countdown
       │
       ├─ Skip ──────> [Exercise Screen — Exercise 1, Set 2]
       └─ Timer ends > [Exercise Screen — Exercise 1, Set 2]
       │
       ... (loop for all sets) ...
       │
       ▼ (last set completed)
[Exercise Screen — "Next Exercise" prompt]
       │
       ▼ (tap "Next")
[Exercise Screen — Exercise 2]
       │
       ... (loop for all exercises) ...
       │
       ▼ (all exercises done)
[Completion Summary Screen]
       │
       ├─ "Done" ──> [Workout Tab — Today's View]
       └─ "View Details" ──> [Workout Log Entry]
       │
       ▼ (auto-logged)
[Workout saved to history]
```

#### Exit During Workout
- User taps "Exit" (top-left) → Decision Modal:
  - **"Save & Exit"** → completes workout with what was done, auto-logs
  - **"Resume Workout"** → returns to current exercise
- **No "Discard" option** during execution — all partial workouts are saved

---

## Interactions & Animations

| Interaction | Animation | Timing |
|------------|-----------|--------|
| Card tap | Subtle scale-down (0.98) on press | 150ms |
| Navigate to Workout Detail | Slide-left push transition | 300ms ease-out |
| Filter chip selection | Background color fade + text color change | 200ms ease-out |
| Favorite heart tap | Scale bounce: 1.0 → 1.3 → 1.0 + color fill | 300ms spring |
| Start Workout button | Ripple effect on tap | 200ms |
| Countdown 3-2-1 | Number scales in (1.5 → 1.0) with fade | 300ms per number |
| Rest timer pulse | Scale oscillation (1.0 ↔ 1.08) when < 5s | 500ms loop |
| Set completion checkmark | Draw-on animation (SVG stroke) | 400ms ease-out |
| Coach generation loading | Sequential checklist items appear with check | 600ms each, staggered |
| Plan reveal (Build with Coach) | Fade-in from bottom (slide up 20px) | 400ms ease-out |
| Exercise card in execution | Swipe left/right gesture to navigate | Gesture-driven |
| Completion summary | Confetti particle burst (subtle) | 800ms |
| Day chip tap (schedule) | Scale-down (0.95) + slide to detail | 250ms |
| Premium paywall modal | Bottom sheet slide-up | 350ms ease-out |

---

## Empty States

| Screen | Empty State Message | Action |
|--------|-------------------|--------|
| Today's Workout (no schedule) | "No workout scheduled for today. Take a rest day or start a workout from your library." | "Choose a Workout" → Library (Premium) |
| Workout Library (no results) | "No workouts found matching your filters." | "Clear Filters" |
| Workout Library (empty personal) | "You haven't saved any workouts yet." | "Browse Library" / "Build Your Own" |
| Exercise Library (no results) | "No exercises found. Try a different search." | "Clear Search" |
| Build Custom (no exercises added) | "Start by adding exercises from the library below." | Scroll to Exercise Library |
| Today's Workout (coach plan not generated) | "Your coach is still building your plan. Check back soon!" | Placeholder with loading indicator |
| Schedule (no coach plan) | "Your 14-day plan will appear after your coach generates it." | "Check with Coach" |
| Workout History (empty) | "No workouts logged yet. Complete your first workout to see your history." | "Start a Workout" |

---

## Accessibility Requirements

- **Contrast (Execution Mode):** Minimum 7:1 for all text on dark navy background (white text on navy exceeds this)
- **Contrast (Browsing Mode):** Minimum 4.5:1 for body text; 3:1 for large numbers and UI components
- **Text Scaling:** Support dynamic type up to 150% without layout breaking
- **Touch Targets:** All tappable elements minimum 44x44px
- **Execution Mode Touch Targets:** Minimum 56x56px for weight/reps inputs and "Complete Set" button (sweaty fingers, arm's length)
- **ARIA Labels:** Screen reader labels for all icons, buttons, progress bars
- **Color Independence:** Don't rely on color alone for difficulty, status, or completion (use icons + text alongside color)
- **Focus Order:** Logical top-to-bottom, left-to-right navigation order
- **VoiceOver/TalkBack:** Exercise names, set counts, and timers are fully announced
- **Reduced Motion:** Disable confetti, pulse animations, and parallax for users with reduced motion preference

---

## Iconography

**Style:** Outlined, 2px stroke, consistent with SF Symbols or Material Icons.

| Feature | Icon | Notes |
|---------|------|-------|
| Workout (tab) | Dumbbell | Tab bar icon |
| Start/Play | ▶ (play triangle) | Inside circle |
| Favorite/Heart | ❤️ (heart) | Outline when empty, filled when active |
| Share | ↗️ (arrow from box) | System share |
| Edit | ✏️ (pencil) | |
| Delete | 🗑️ (trash) | |
| Search | 🔍 (magnifying glass) | |
| Settings | ⚙️ (gear) | |
| Drag/Reorder | ☰ (dots or lines) | |
| Completed | ✓ (checkmark) | |
| Premium/Lock | 🔒 (lock) | Gold/amber color |
| Rest Day | 😴 or 🌙 | Rest indicator |
| Workout Day | 🏋️ | Scheduled workout indicator |
| Calories | 🔥 (flame) | |
| Duration | ⏱️ (stopwatch) | |
| Difficulty | ⚡ (lightning) | |
| Equipment | 🏋️ (barbell) | |
| Coach | 🧠 or 👤 (person) | Coach avatar/icon |
| Exit | ← (back arrow) or ✕ (close) | Context-dependent |
| Previous | ◀ (chevron left) | |
| Next | ▶ (chevron right) | |
| Skip | ⏭️ (forward arrow) | Skip rest timer |
| Save | 💾 (floppy disk) | |
| Discard | ✕ (close) or 🗑️ | |
| Log/Activity | 📝 (clipboard + pen) | |
| Add | + (plus) | |
| Week/Schedule | 📅 (calendar) | |

---

## Premium Free vs. Premium Feature Summary (UI Level)

| UI Element | Free | Premium |
|------------|------|---------|
| Today's Workout Card | Full | Full + Coach Recommended badge + Replace/Swap |
| Start Workout / Execution | Full | Full |
| Mark Complete / Rest Day | Full | Full |
| Favorite Heart Icon | Full | Full |
| Share Workout | Full | Full |
| Log Recent Activity | Full | Full |
| Workout Library | Locked (paywall modal) | Full access |
| Exercise Library | Locked (paywall modal) | Full access |
| Search & Filter | Locked | Full |
| Build Your Own | Locked (paywall modal) | Full |
| Build with Coach | Locked (paywall modal) | Full |
| Edit Existing Workout | Locked (paywall modal) | Full |
| Exercise History | Locked | Full (30-day view + sessions) |
| Workout Settings | Locked (paywall modal) | Full |
| 2 Week Schedule | Locked (paywall modal) | Full |
| Replace Workout | Locked | Full |
| Choose Different Day | Locked | Full |
| Save Custom Workout | Locked (paywall modal) | Full |

---

## Reference Apps & Design Patterns

### Competitive Inspiration

| Reference | What to Learn |
|-----------|--------------|
| **Strong.app** | Clean exercise logging, set tracking clarity, trend data display |
| **Hevy** | Modern exercise cards, drag-to-reorder, set completion UI |
| **Fitbod** | AI-generated workout recommendations, rest timer integration |
| **Nike Training Club** | Polished countdown screens, exercise GIF demonstrations, completion celebrations |
| **Jefit** | Exercise library browsing, muscle group filtering |
| **Gymshark Training** | Workout plan structure, 14-day schedule visualization |
| **Fitbod** | "Build with AI" parameter flow — time, target, equipment, muscle groups |
| **StrongLifts 5x5** | Simple rest timer UI, large countdown numbers |

### Pinterest Design References

| Pin / Designer | Key Elements to Reference |
|----------------|--------------------------|
| **Fitnest — Fitness & Workout App (CIPHERSLAB)** | Dark-mode in-workout screens, bold exercise names (large white text on navy), set tracker with checkmarks, progress bar at top, clean exercise thumbnails |
| **Sporter — Fitness & Workout App UI Kit** | Card-based workout library layout, filter chip system, workout detail cards with muscle group tags and difficulty badges, clean list item design for exercise browsing |
| **Omofit — Fitness Tracking App** | Workout completion summary with large metric numbers (time, calories), celebration layout with centered icon and personalized message, clean stats grouping |
| **FitNook — Personal Fitness Companion** | Rest timer circular countdown design with prominent numbers, exercise card layout with image + metadata below, one-handed button placement |
| **Dynamic Fitness Mobile App UI Kit** | Workout schedule grid with day chips, completed workout indicators (checkmarks), rest day visual differentiation, weekly plan structure |
| **sandow UI Kit — AI Fitness & Nutrition** | Dark mode fitness UI with high-contrast white text on dark backgrounds, numeric input design for weight/reps logging, large touch targets for execution mode |
| **Fitness App Design Inspiration (Dribbble-style)** | Exercise library card patterns with thumbnail images, muscle group visualization, equipment type indicators |
| **14 Day Belly Fitness Plan** | 14-day plan visualization with day-by-day breakdown, completed vs. pending workout indicators, plan progress tracking |

---

## Implementation Notes

1. **Shared State Management:** The Workout Detail Page receives data from multiple sources (Today's Workout, Library, Custom, History). Use a single data model (e.g., `Workout` type) that all pathways populate.

2. **Workout Execution Caching:** If connectivity drops during execution, cache all set data locally (AsyncStorage / MMKV). Resume when connectivity returns. Never lose user data.

3. **Rest Timer Background:** The rest timer should continue running even if the app is backgrounded (use React Native's `AppState` or Flutter's `WidgetsBindingObserver`). Show a local notification when rest ends.

4. **Execution Mode Full-Screen:** During workout execution, hide status bar, disable screen auto-lock, and lock orientation to portrait. Show system UI only on exit.

5. **Build with Coach Loading:** The coach generation is async (3-5 seconds). Show sequential progress (not a spinner) to build anticipation. If generation takes >8s, show "Still working..." message.

6. **Premium Gate Timing:** Trigger paywall at the moment of intent — when user taps a Premium feature. Never show a paywall on screen load. The modal should mention the specific feature being accessed.

7. **Exercise Image Loading:** Use lazy loading for exercise images in the library. Cache thumbnails locally. During execution, preload the next exercise's image in the background.

8. **Performance:** Workout execution screen must maintain 60fps during animations (countdown, rest timer pulse, confetti). Avoid heavy re-renders during set logging.

9. **Dark Mode:** All browsing-mode screens should have dark mode equivalents. Execution mode is already dark by design. Navy primary becomes lighter (`#3B82F6`) in dark mode. Card background shifts to `#1E293B`, page background to `#0F172A`.

10. **Personalization:** Exercise history ("Last time: 60kg x 10") should pull from the user's logged workout data. Show this helper text under each exercise during execution to help users set appropriate weights.

11. **Coach Activity Tab vs. Workout Tab:** Architecturally, the 2 Week Schedule lives on the Coach Activity Tab (separate from the Workout Tab). The Coach tab is where the plan lives; the Workout tab is where execution happens.

12. **Workout Execution Progress Bar:** Show exercises completed vs. total (e.g., "3 / 6 exercises"). Update instantly when advancing to next exercise — no animation delay needed.

13. **Set Tracker Inline:** During execution, show all sets for the current exercise (e.g., "Set 1: 60kg x 10 ✓", "Set 2: --"). Completed sets show green checkmarks. Current set is highlighted. Upcoming sets are dimmed.

14. **Exercise Navigation:** Support both button taps and swipe gestures for moving between exercises. Swipe left = next, swipe right = previous (if not on first exercise).

15. **Auto-Log on Completion:** When a workout finishes (all exercises + all sets completed), the entire session is auto-logged to the user's history. This is Free — no Premium required. Users can view logged entries from the Log Recent Activity screen.
