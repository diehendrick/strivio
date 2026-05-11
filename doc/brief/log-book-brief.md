# Strivio Log Book — Flow Brief

## Overview

This document describes the complete Log Book user flow for the Strivio fitness & nutrition coaching app. The Log Book serves as the central hub for daily nutrition tracking, food logging, meal management, and macro/micronutrient review. It is one of the four main app pages (Home, Logbook, Coach, More) and handles all food-related data entry and historical review.

---

## Flow Diagram Summary

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           LOG BOOK FLOW                                   │
└──────────────────────────────────────────────────────────────────────────┘

Logbook (Entry Point)
    │
    ├── Daily Log View ── navigate by date (swipe or calendar picker)
    │   │
    │   ├── Copy Previous Day Log
    │   │   ├── Review screen shown before applying
    │   │   ├── User can adjust quantities or remove items
    │   │   └── Confirm → Log applied to today
    │   │
    │   ├── Daily Meal Summary (macros per meal: breakfast, lunch, dinner, snacks)
    │   │   └── Edit logged quantity directly from meal summary (Premium)
    │   │
    │   ├── Daily Macro Overview (calories, protein, carbs, fats vs targets)
    │   │
    │   ├── See All Daily Nutrients (full micronutrient breakdown vs RDV — Premium)
    │   │
    │   └── 7-Day Nutrition Chart (Coach — Nutrition tab only, not logbook)
    │
    ├── Food Search & Entry
    │   ├── Quick-add food from nav bar (main entry point)
    │   │   ├── Search via Open Food Facts API → Results list → Select food item
    │   │   ├── Barcode Scanner (Premium)
    │   │   │   ├── Recognized? YES → Auto-fill nutritional data from database
    │   │   │   └── Recognized? NO → Manual fallback (name, macros, serving size)
    │   │   ├── Manual/AI Entry (photo upload → AI calculates calories)
    │   │   │   └── Custom food entry: name, calories, macros, serving size
    │   │   │       └── Optional: micronutrient fields (if available)
    │   │   │           └── Save to personal food database
    │   │   └── Recent foods & favourites shown at top of search
    │   │       └── Mark favourite food toggle (Premium — max 3 before paywall)
    │   │
    │   └── Custom Meals (Premium — max 1 before paywall)
    │       ├── Create custom meal: group multiple foods into a named meal
    │       ├── Add component foods
    │       ├── Name and save custom meal
    │       ├── Custom meal saved for reuse
    │       └── Adding custom meal logs all component foods at once
    │
    └── Logging a Food to a Meal
        ├── Assign food to meal: breakfast, lunch, dinner, or snacks
        ├── Set quantity and serving size
        ├── Food logged to that meal
        └── Meal macros and daily totals update in real time
```

---

## Stage-by-Stage Breakdown

---

### Stage 1: Logbook — Entry Point

The Log Book is accessed from the main bottom navigation bar (nav-book icon). It is the central location where users view, manage, and log all nutrition data.

**Primary Entry Method:**
- Tap nav-bar "Logbook" icon → Opens Daily Log View for today's date

**Navigation:**
- Swipe left/right to change dates
- Calendar picker for jumping to a specific date

---

### Stage 2: Daily Log View

The Daily Log View is the primary screen of the Log Book. It displays all logged food items and nutritional data for the selected date. From here, five distinct views or actions branch out.

#### 2A. Copy Previous Day Log

A convenience feature for users who eat similar meals day-to-day.

| Step | Action | Description |
|------|--------|-------------|
| 1 | **Initiate copy** | User taps "Copy previous day" — a review screen opens showing all items from the previous day's log |
| 2 | **Review & adjust** | User can adjust quantities or remove individual items before confirming |
| 3 | **Confirm** | Tapping confirm applies the adjusted log to today's date |

**Design Notes:**
- Quantities default to the previous day's values
- Remove action should be a swipe-to-delete or tap-trash pattern
- Confirmation should have a clear "Apply" and "Cancel" option
- This is a **Free** feature — no Premium gate

#### 2B. Daily Meal Summary

A per-meal breakdown of macronutrients across the four standard meal slots.

**What's displayed:**
| Meal Slot | Macros Shown |
|-----------|-------------|
| **Breakfast** | Calories, protein, carbs, fats |
| **Lunch** | Calories, protein, carbs, fats |
| **Dinner** | Calories, protein, carbs, fats |
| **Snacks** | Calories, protein, carbs, fats |

**Premium Feature:**
- **Edit logged quantity directly from meal summary (Premium)**
  - Free users can view the summary but cannot edit quantities inline
  - Premium users can tap a macro value to adjust the logged quantity

**Design Notes:**
- Visualize macros per meal with mini progress bars or ring charts
- Each meal slot should be visually distinct (color coding or icon)
- The edit affordance should be subtle for free users (greyed out with upgrade indicator)

#### 2C. Daily Macro Overview

The high-level summary of daily intake versus targets. This is the **most frequently viewed section** of the Log Book — users glance here to answer: *"Am I on track today?"* The design must make this answer **instantly obvious** without requiring mental math.

---

##### 2C.1 Visual Hierarchy & Layout

The macro overview uses a **two-tier hierarchy** — calories are primary (largest, most prominent), macros are secondary (grouped together below).

**Primary Tier — Calorie Ring (Center Stage):**
```
┌─────────────────────────────┐
│      ┌───────────┐          │
│      │   1,240   │  ← Consumed (large, bold)
│      │  / 2,200  │  ← Target (smaller, muted)
│      │   960     │  ← Remaining (accent color, prominent)
│      │ remaining │
│      └───────────┘          │
│    ████████░░░░  56%        │  ← Progress bar with percentage
└─────────────────────────────┘
```

**Secondary Tier — Macro Cards (Row or Grid):**
```
┌────────────┬────────────┬────────────┐
│  Protein   │   Carbs    │    Fats    │
│   82 / 150g│ 145 / 250g │  38 / 70g  │
│   68g left │ 105g left  │  32g left  │
│ ██████░░░  │ ████░░░░░  │ █████░░░░  │
│   55%      │    58%     │    54%     │
└────────────┴────────────┴────────────┘
```

**What's displayed:**
| Element | Data | Visual Treatment |
|---------|------|------------------|
| **Calories consumed** | Actual intake (e.g., 1,240) | Large, bold, primary text color |
| **Calories target** | Daily goal (e.g., 2,200) | Smaller, muted/secondary text |
| **Calories remaining** | Target − Consumed (e.g., 960) | Accent color, prominent — this is what users care about most |
| **Calorie progress** | Percentage + bar/ring | Filled proportionally, color-coded by zone |
| **Protein** | Consumed / Target + remaining | Compact card with mini progress bar |
| **Carbs** | Consumed / Target + remaining | Compact card with mini progress bar |
| **Fats** | Consumed / Target + remaining | Compact card with mini progress bar |

---

##### 2C.2 Smart Color Zones (Not Just Green/Red)

Color coding should communicate **status at a glance** using intuitive zones, not binary pass/fail:

| Zone | Calorie Range | Color | Meaning |
|------|---------------|-------|---------|
| **Under** | 0–50% of target | Blue `#3B82F6` | Plenty of room left |
| **On Track** | 50–90% of target | Green `#10B981` | Progressing well |
| **Near Limit** | 90–100% of target | Amber `#F59E0B` | Approaching daily goal |
| **At Target** | 100% | Navy `#7F7CF0` | Goal reached |
| **Over** | 100%+ | Red `#EF4444` | Exceeded daily target |

**Macro-specific colors:**
- Protein: Blue `#3B82F6` (always encouraging — more protein is generally good)
- Carbs: Green `#10B981` (neutral tracking)
- Fats: Amber `#F59E0B` (slightly cautionary — fats are calorie-dense)

**Important:** Colors should never shame the user. "Over" should be informative, not alarming. Use soft red tones, not harsh alerts.

---

##### 2C.3 Contextual Insights (The "So What?" Layer)

Numbers alone are not useful. The macro overview should answer **what the numbers mean** through contextual micro-copy:

**Time-Aware Pacing Messages:**
| Time of Day | Scenario | Message |
|-------------|----------|---------|
| 10 AM | 40% calories consumed | "Good pace for morning" |
| 10 AM | 70% calories consumed | "Ahead of typical pace — light lunch ahead?" |
| 2 PM | 50% calories consumed | "Half your calories left for dinner and snacks" |
| 2 PM | 85% calories consumed | "Most of your budget used — consider a light dinner" |
| 8 PM | 95% calories consumed | "Almost at your daily target" |
| 8 PM | 110% calories consumed | "120 cal over target — that's okay, tomorrow is fresh!" |

**Meal-Budget Guidance:**
When the user has remaining meals in the day, show **per-meal budget**:

```
┌─────────────────────────────────────┐
│ Remaining meal budget               │
│                                     │
│   Dinner:  ~450 cal                 │
│   Snacks:  ~200 cal                 │
│                                     │
│ Based on your typical patterns      │
└─────────────────────────────────────┘
```

**Protein Emphasis (Fitness-Focused):**
For users with fitness goals, protein is the most important macro. Highlight it:

```
┌─────────────────────────────────────┐
│ Protein Check                       │
│                                     │
│   82g of 150g logged                │
│   68g remaining                     │
│                                     │
│   Tip: A chicken breast (30g) +     │
│   Greek yogurt (15g) gets you       │
│   halfway there                     │
└─────────────────────────────────────┘
```

---

##### 2C.4 Progressive Disclosure Design

Not all users want the same level of detail. Use **progressive disclosure** to serve both casual and power users:

**Level 1 — At a Glance (Always Visible):**
- Calorie ring with consumed/target/remaining
- Three macro mini-bars with percentages
- Color-coded status

**Level 2 — Tap to Expand (Tap calorie ring or any macro card):**
```
┌─────────────────────────────────────┐
│ Today's Nutrition Details        X  │
│                                     │
│ --- CALORIES ---                    │
│ Consumed:    1,240 cal              │
│ Target:      2,200 cal              │
│ Remaining:     960 cal              │
│ Burned:        320 cal (BMR+activity)|
│ Net:           920 cal              │
│                                     │
│ --- MACROS ---                      │
│ Protein:  82g / 150g  (55%)        │
│   -> 328 cal from protein           │
│ Carbs:   145g / 250g  (58%)        │
│   -> 580 cal from carbs             │
│ Fats:     38g / 70g   (54%)        │
│   -> 342 cal from fats              │
│                                     │
│ --- MEAL BREAKDOWN ---              │
│ Breakfast:  380 cal  (31%)         │
│ Lunch:      520 cal  (42%)         │
│ Dinner:     240 cal  (19%)         │
│ Snacks:     100 cal   (8%)         │
│                                     │
│ --- PACE ---                        │
│ You're on track! Typical at this   │
│ time: 1,180 cal consumed            │
└─────────────────────────────────────┘
```

**Level 3 — See All Nutrients (Premium — tap "Full Nutrients"):**
- Navigates to the micronutrient breakdown view (Section 2D)

---

##### 2C.5 Macro Card Interaction Patterns

Each macro card is **tappable** and provides quick actions:

**Tap Protein Card:**
- Expands to show protein sources breakdown
- "Top protein foods today: Chicken breast (30g), Eggs (12g), Greek yogurt (15g)"
- Quick action: "Log protein-rich snack" -> opens food search filtered by high-protein foods

**Tap Carbs Card:**
- Expands to show carb timing distribution
- "Carbs by meal: Breakfast 45g, Lunch 60g, Dinner 30g, Snacks 10g"
- Quick action: "Log carb source" -> opens food search

**Tap Fats Card:**
- Expands to show fat type breakdown (if available)
- "Saturated: 12g, Unsaturated: 26g"
- Quick action: "Log healthy fat" -> opens food search

---

##### 2C.6 Empty State (No Food Logged)

When no food has been logged yet, show an **encouraging, action-oriented** empty state:

```
┌─────────────────────────────────────┐
│                                     │
│        [icon]                       │
│                                     │
│   Start tracking your nutrition     │
│                                     │
│   Log your first meal to see your   │
│   daily macro progress              │
│                                     │
│   + Add Food                        │
│                                     │
│   Your daily targets:               │
│   2,200 cal  |  150g protein        │
│                                     │
└─────────────────────────────────────┘
```

---

##### 2C.7 Real-Time Update Behavior

When a food is logged, the macro overview should **visibly react** to confirm the update:

1. **Number animation**: Values count up/down smoothly (300ms duration)
2. **Progress bar fill**: Animated fill transition to new percentage
3. **Brief highlight**: The updated macro card gets a subtle glow/pulse (200ms)
4. **Haptic feedback**: Light vibration on mobile when logging confirms

**Example sequence:**
```
User logs "Chicken breast - 150 cal, 30g protein"

Before:                    After (animated):
Calories: 1,090 / 2,200    Calories: 1,240 / 2,200
Remaining: 1,110           Remaining: 960
Protein: 52 / 150g         Protein: 82 / 150g
                           [Protein card pulses green briefly]
```

---

##### 2C.8 Accessibility Considerations

- **Color is never the only indicator**: Each zone has a label + icon + color
- **Screen reader support**: Announce "1,240 calories consumed out of 2,200 target, 960 remaining, 56 percent"
- **Large text mode**: Numbers remain readable at 200% zoom
- **High contrast mode**: Progress bars have pattern fills (stripes/dots) in addition to color
- **Reduced motion**: Respect `prefers-reduced-motion` - disable number animations and pulses

---

##### 2C.9 Design Notes Summary

| Principle | Implementation |
|-----------|----------------|
| **Instant comprehension** | User should understand their status in <2 seconds |
| **Remaining > Consumed** | Show "what's left" more prominently than "what's done" |
| **Context over raw numbers** | Add pacing messages, meal budgets, tips |
| **Progressive disclosure** | Simple view default, details on tap |
| **Encouraging, not shaming** | Positive language even when over target |
| **Real-time feedback** | Animate updates to confirm logging worked |
| **Actionable** | Every insight should suggest a next step |
| **This is a Free feature** | No Premium gate on any part of the macro overview |

---

##### 2C.10 Data Sources & Calculations

**Displayed values are calculated from:**
```
Calories consumed  = Sum of (food calories x quantity) for all logged foods today
Protein consumed   = Sum of (food protein x quantity) for all logged foods today
Carbs consumed     = Sum of (food carbs x quantity) for all logged foods today
Fats consumed      = Sum of (food fats x quantity) for all logged foods today

Remaining          = Target - Consumed (floor at 0 for display)
Percentage         = (Consumed / Target) x 100 (rounded to nearest integer)

Net calories       = Consumed - Exercise calories burned (if tracked)
```

**Targets come from:**
- User's personalized plan (calculated during onboarding)
- Stored in `window.__strivio_state` under nutrition targets
- Can be manually adjusted in Settings (Premium feature)

#### 2D. See All Daily Nutrients (Premium)

A detailed micronutrient breakdown view.

**What's displayed:**
- Full micronutrient list (vitamins, minerals, fiber, sugar, saturated fat, etc.)
- Each nutrient shown with actual intake vs. Recommended Daily Value (RDV)
- Percentage of RDV achieved

**Premium Gate:**
- Free users see a locked/paywall state with a preview of available data
- Premium users access the full breakdown
- Upsell copy: "Unlock detailed nutrient tracking"

**Design Notes:**
- Sort nutrients by % RDV (lowest first — highlights deficiencies)
- Group by category: Vitamins, Minerals, Other
- Color code: green (met), yellow (partial), red (exceeded or low)

#### 2E. 7-Day Nutrition Chart

**Important architectural note:** This chart lives on the **Coach — Nutrition tab**, NOT in the Log Book. The flow references it here as a cross-navigation hint.

- Provides a 7-day trend view of calories and macros
- Accessible from: Coach tab → Nutrition sub-tab
- The Log Book should include a link or shortcut to navigate there

---

### Stage 3: Food Search & Entry

This is the primary mechanism for adding food items to the daily log. It supports four entry methods plus a custom meal builder.

#### 3A. Quick-Add Food (Main Entry Point)

Accessed from the nav bar within the Log Book. This is the primary CTA for logging food.

**What's displayed:**
- Search bar at top with placeholder: "Search food..."
- Recent foods and favorites shown below search (before searching)
- Four entry method options available

#### 3B. API Search Path (Open Food Facts)

| Step | Description |
|------|-------------|
| 1 | User types search query in food search bar |
| 2 | App queries Open Food Facts API |
| 3 | Results displayed in a scrollable list |
| 4 | User taps a result to select it |
| 5 | Proceeds to **Logging a Food to a Meal** (Stage 4) |

**Design Notes:**
- Show loading state during API call
- Display: food name, brand, calories per serving, serving size
- Handle "no results" state with option to create a custom entry
- Debounce search input (300ms) to reduce API calls

#### 3C. Barcode Scanner (Premium)

| Step | Description |
|------|-------------|
| 1 | User taps barcode icon → camera opens with barcode scanner overlay |
| 2 | App scans barcode and queries product database |
| 3a | **Recognized:** Auto-fill nutritional data from database → proceed to logging |
| 3b | **Not recognized:** Fallback to manual entry — user inputs name, macros, serving size → proceed to optional micronutrient fields |

**Premium Gate:**
- Barcode scanner is Premium-only
- Free users see a paywall prompt when tapping the barcode icon
- Upsell copy: "Scan barcodes for instant nutrition data"

**Design Notes:**
- Scanner should support common barcode formats (EAN-13, UPC-A, Code 128)
- Provide haptic feedback on successful scan
- Show camera permissions rationale upfront

#### 3D. Manual / AI Photo Entry

This path handles cases where the food is not found in the API or barcode database, or the user doesn't know the nutritional information.

| Step | Description |
|------|-------------|
| 1 | User opts for manual entry or taps "Don't know calories?" |
| 2 | Option: **Upload photo** → AI estimates calories from image |
| 3 | Manual/custom food entry form: name, calories, macros, serving size |
| 4 | **Optional:** Micronutrient fields (user fills in if available, not required) |
| 5 | Save to personal food database for future reuse |

**Design Notes:**
- AI photo estimation should show a confidence indicator
- Manual entry form should have sensible default serving sizes
- Micronutrient fields should be collapsed by default (expandable)
- Saved custom foods appear in "Recent Foods" and search results
- This is a **Free** feature (manual entry), but AI photo analysis could be Premium

#### 3E. Recent Foods & Favourites

Displayed at the top of the food search screen for quick access.

**What's displayed:**
- Horizontal scrollable row of recently logged foods
- Favorited foods with a visible heart/star indicator

**Premium Gate:**
- **Mark favourite food toggle (Premium — max 3 saves before paywall)**
  - Free users can favorite up to 3 foods
  - Attempting to favorite a 4th triggers the Premium paywall
  - Premium users have unlimited favorites

**Design Notes:**
- Recent foods: sorted by recency, show last 10-15 items
- Favorites: sorted by frequency of use or alphabetically
- Long-press on a recent food to add it to favorites
- Clear visual distinction between recent and favorited items

#### 3F. Custom Meals (Premium — max 1 before paywall)

Allows users to group multiple foods into a reusable named meal template.

| Step | Description |
|------|-------------|
| 1 | **Create custom meal:** User initiates creation, names the meal (e.g., "Morning Smoothie", "Post-Workout Bowl") |
| 2 | **Add component foods:** Search and select individual foods to include |
| 3 | **Name and save:** Finalize the meal name and save |
| 4 | **Custom meal saved for reuse:** Meal appears in a "My Meals" section |
| 5 | **Log custom meal:** Adding a custom meal logs all component foods at once |

**Premium Gate:**
- **Free users:** 1 custom meal allowed before paywall
- **Premium users:** Unlimited custom meals
- Creating a second custom meal triggers the paywall
- Upsell copy: "Create unlimited custom meals with Premium"

**Design Notes:**
- Editing a custom meal: add/remove component foods, rename
- Deleting a custom meal should be possible
- Custom meals auto-calculate total macros from component foods
- When logging, allow user to adjust quantities per component

---

### Stage 4: Logging a Food to a Meal

The final stage of any food entry path. Once a food item (from search, barcode, manual, or custom meal) is selected, it must be assigned and configured.

| Step | Description |
|------|-------------|
| 1 | **Assign food to meal:** User selects breakfast, lunch, dinner, or snacks |
| 2 | **Set quantity and serving size:** Adjust the amount (e.g., 1.5 servings, 200g, 2 pieces) |
| 3 | **Food logged to that meal:** Confirmation — item appears in the day's log |
| 4 | **Meal macros and daily totals update in real time:** All aggregates refresh immediately |

**Design Notes:**
- Meal selection: segmented control, dropdown, or chip selector (breakfast | lunch | dinner | snacks)
- Serving size: should support preset options (1 serving, 100g, 1 cup, etc.) AND custom input
- Real-time update: the daily macro overview should visibly animate/update as items are logged
- Undo: provide a brief "Undo" toast/snackbar after logging (3-5 second window)
- Confirmation: subtle animation or checkmark to confirm the log was successful

---

## Free vs. Premium Feature Matrix

| Feature | Free | Premium |
|---------|------|---------|
| Daily Log View (date navigation) | Yes | Yes |
| Copy previous day log | Yes | Yes |
| Daily meal summary (view) | Yes | Yes |
| Edit logged quantity from meal summary | No | Yes |
| Daily macro overview | Yes | Yes |
| Full micronutrient breakdown vs RDV | No | Yes |
| Quick-add food (search via Open Food Facts) | Yes | Yes |
| Barcode scanner | No | Yes |
| Manual food entry | Yes | Yes |
| AI photo calorie estimation | TBD | TBD |
| Save custom foods to personal database | Yes | Yes |
| Recent foods access | Yes | Yes |
| Mark favorite foods (up to 3) | Yes | Yes |
| Mark favorite foods (unlimited) | No | Yes |
| Custom meals (1 max) | Yes | Yes |
| Custom meals (unlimited) | No | Yes |
| Assign food to meal | Yes | Yes |
| Set quantity & serving size | Yes | Yes |
| Real-time macro updates | Yes | Yes |
| 7-day nutrition chart (Coach tab) | Yes | Yes |

---

## Integration Points

### External APIs

| API / Service | Purpose | Used In |
|---------------|---------|---------|
| **Open Food Facts API** | Food search database (barcode + text search) | Food Search, Barcode Scanner |
| **AI Calorie Estimation** | Photo-to-nutrition estimation | Manual/AI Entry |

### Cross-Tab Navigation

| From | To | Purpose |
|------|----|---------|
| Log Book | Coach → Nutrition Tab | View 7-day nutrition chart |
| Home → Tracking Tab | Log Book | View daily log details |
| Log Book | Home | Return after logging |

### Data Flow
```
Food Entry (any path)
    → Assign to meal + set quantity
        → Food logged to daily record
            → Macros recalculate (real-time)
                → Daily totals update
                    → Coach tab aggregates updated (async)
```

---

## Key Design Patterns & Observations

**"Quick-add from nav bar" is the primary pattern** — food entry is designed as a prominent, always-accessible action. The nav bar within the Log Book hosts the main "Add Food" entry point, establishing a clear mental model: Log Book = view, Add Food = action.

**Multiple entry paths converge on one logging screen** — regardless of whether a food comes from API search, barcode scan, manual entry, AI photo, or custom meal, all paths funnel into the same "Assign food to meal → Set quantity → Confirm" flow. This is architecturally efficient and maintains a consistent UX.

**Premium features are carefully layered** — the paywall strategy distinguishes between convenience (barcode scanner), depth (micronutrient breakdown), and power-user features (custom meals, unlimited favorites, inline editing). Core logging (search, manual entry, assign, quantity) remains free, ensuring the free tier is genuinely usable.

**"Copy previous day" is a smart convenience feature** — many users eat consistent meals. This feature reduces friction for returning users without requiring any AI or intelligence — it's purely a data-copy operation.

**Real-time macro updates are fundamental** — the flow specifies that meal macros and daily totals must update in real time upon logging. This means the Log Book is not a static view but a reactive dashboard.

**Custom meals solve the repetition problem** — for users with consistent meal patterns (smoothie every morning, same post-workout shake), creating a named custom meal turns a multi-step logging process into a single tap. This is Premium-gated with one free usage to demonstrate value.

**Recent foods + favorites create a speed layer** — the combination of recency-based and user-curated quick-access lists reduces search friction for frequently logged items. The favorite cap (3 free, unlimited Premium) is a gentle upsell.

**The micronutrient breakdown (Premium) is a depth feature** — most casual users track only macros. The full micronutrient view serves health-conscious and advanced users who care about vitamin/mineral intake relative to RDVs. It's correctly gated as a Premium feature.

**The 7-day chart lives on the Coach tab, not Log Book** — this is an intentional architectural decision. The Log Book shows daily snapshots; trends and analysis belong to the Coach. A reference/link keeps the user aware without duplicating functionality.

**Barcode scanner has a manual fallback** — the flow explicitly handles the "barcode not recognized" case with a manual entry fallback. This prevents dead-ends and ensures the user can always complete their logging task.

**AI photo entry is an emerging feature** — the flow mentions uploading a photo for AI calorie calculation. This is currently positioned as an alternative to manual entry when the user doesn't know nutritional values. Whether this is Free or Premium should be decided based on AI API costs.

---

## Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| **Open Food Facts API unavailable** | Show cached results if available; fallback to manual entry with message "Search unavailable — enter manually" |
| **Barcode not recognized** | Manual fallback: name, macros, serving size entry form |
| **AI photo analysis fails** | Show error message: "Couldn't analyze photo — enter details manually" |
| **No foods logged for selected date** | Empty state: "No foods logged for [date]. Tap + to add your first meal." |
| **Copy previous day with empty log** | Disable "Copy previous day" button or show "No meals logged yesterday" |
| **Network failure during logging** | Queue the log locally, sync when connectivity returns; show offline indicator |
| **Micronutrient data unavailable** | Show "—" or "N/A" for unavailable values; don't block the user |

---

## UX Considerations

- **Swipe between dates should be smooth and responsive** — date changes should preload adjacent days for instant transitions.
- **Real-time macro updates should animate** — use subtle number transitions or progress ring fills rather than jarring jumps.
- **The "Add Food" CTA must be immediately visible** — position it as a floating action button or prominent nav bar item; this is the most frequent user action in the Log Book.
- **Meal slot assignment should be fast** — default to the most likely meal slot based on time of day (morning → breakfast, noon → lunch, evening → dinner).
- **Serving size should support common units** — grams, ounces, cups, tablespoons, pieces, and "serving" as defined on the package.
- **Custom meals should preview total macros** — when building a custom meal, show a running total of calories, protein, carbs, fats as foods are added.
- **Favorite cap paywall should appear at the right moment** — when user taps the favorite icon for the 4th time (not before), show: "You've favorited 3 foods. Unlock unlimited favorites with Premium."
- **Undo logging is essential** — accidental food entries are common. A 3-5 second undo snackbar prevents frustration.

---

## Competitive Context

| Pattern | Used By | Strivio Implementation |
|---------|---------|----------------------|
| Barcode scanner | MyFitnessPal, Lose It!, Yazio | Premium-gated scanner with manual fallback |
| Open Food Facts API | Yuka, FoodVisor, Open Food Facts apps | Primary food search database |
| Meal slot assignment | MyFitnessPal, Lose It!, Cronometer | Breakfast/Lunch/Dinner/Snacks |
| Copy previous day | MyFitnessPal, Cronometer | Review-and-adjust before applying |
| Custom meals | MyFitnessPal, Lose It! | Group multiple foods, Premium (max 1 free) |
| AI photo calorie estimation | SnapCalorie, Calorie Mama, Bite AI | Photo upload → AI calculates |
| Macro progress rings/bars | MyFitnessPal, Cronometer, Yazio | Calories/protein/carbs/fats vs targets |
| Micronutrient breakdown | Cronometer | Full breakdown vs RDV (Premium) |
| Recent foods + favorites | MyFitnessPal, Lose It! | Recent scroll row + favorites (max 3 free) |
| Real-time daily totals | All major nutrition apps | Instant update on log |
| 7-day nutrition chart | MyFitnessPal, Cronometer | Coach → Nutrition tab (not Log Book) |

---

## Related Documents

- `brief.md` — Overall app brief summary
- `auth-flow-brief.md` — Authentication & onboarding flow
- `workout-tab-brief.md` — Workout tab flow
- `onboarding-intake-brief.md` — Onboarding & intake flow
- `ui-prompt-tracking-tab.md` — Tracking tab UI prompt
- `brief-analysis.md` — Design analysis and inspiration
