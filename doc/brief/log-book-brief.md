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

The high-level summary of daily intake versus targets.

**What's displayed:**
| Macro | Target vs. Actual |
|-------|-------------------|
| **Calories** | Actual / Target (e.g., 1850 / 2200) |
| **Protein** | Actual / Target (g) |
| **Carbs** | Actual / Target (g) |
| **Fats** | Actual / Target (g) |

**Design Notes:**
- Progress rings or bars for each macro
- Color coding: green when close to target, red when exceeding, yellow when under
- Remaining values shown prominently (e.g., "350 cal remaining")
- This is a **Free** feature

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
