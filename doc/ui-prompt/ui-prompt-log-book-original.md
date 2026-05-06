# UI Implementation Prompt: Log Book (Strivio)

## Context

The Log Book is the **nutrition tracking hub** of the Strivio fitness & nutrition coaching app. It is where users view their daily food intake, search and log foods, manage meals, and monitor macro/micronutrient progress against personalized targets.

**Role in the app:** The Log Book is one of four main pages (Home, Logbook, Coach, More) and serves as the primary data-entry surface for nutrition. It must balance **quick logging** (search → assign → done in seconds) with **detailed review** (macro breakdowns, micronutrient analysis). The freemium model gates depth features (micronutrients, barcode scanning, custom meals, inline editing) while keeping core logging entirely free.

**Key differentiator:** Multiple food entry paths (API search, barcode, AI photo, manual) converge on a single, fast "assign to meal" flow. Custom meals and favorites create a speed layer for frequent loggers.

---

## Platform
- **Type:** Mobile App (iOS & Android)
- **Recommended Framework:** React Native (with native UI components) or Flutter
- **Orientation:** Portrait only
- **Status Bar:** Dark status bar (dark text on white/light background)

## Screen Dimensions
- **Mobile Standard:** 375px width (iPhone 13/14) x 812px height
- **Safe Area:** Account for notch (44px top) and home indicator (34px bottom)
- **Scrollable:** Yes — vertically scrollable in Daily Log View; full-screen modal for food search

## Visual Design Direction
- **Style:** Clean, modern card-based layout consistent with the Tracking Tab and Workout Tab — same design language, same spacing, same components
- **Primary Color Scheme:** White background with **periwinkle/purple-blue** accents (`#7F7CF0`) — warm, refined coaching aesthetic
- **Aesthetic:** Professional, data-rich but uncluttered. Nutrition tracking should feel informative and encouraging, not judgmental or restrictive
- **Card Design:** White cards with subtle periwinkle-tinted shadows, generous padding, 20px border radius
- **Spacing:** 8px base grid; 14px gap between cards; 24px screen padding
- **During Food Search:** Modal/bottom sheet with dedicated search UI and clear results

---

## Shared Design Tokens

Consistent with Tracking Tab, Workout Tab, Onboarding, and Auth screens.

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary Purple-Blue | `#7F7CF0` | Buttons, selected states, progress fills, active icons, macro bars |
| Primary Purple-Blue Light | `#9794F3` | Hover/active button states, pressed states |
| Primary Purple-Blue Muted | `#f1f0ff` | Unselected card backgrounds, inactive elements, meal slot backgrounds |
| Background | `#FFFFFF` | Primary page background |
| Background Alt | `#F5F6FA` | Secondary page background |
| Surface White | `#FFFFFF` | Card backgrounds, search modal |
| Surface Variant | `#f8f8f8` | Alternative card backgrounds |
| Text Primary | `#0f172a` | Main text, labels, numbers |
| Text Secondary | `#525252` | Captions, descriptions, secondary info |
| Text Tertiary | `#64748b` | Hints, less prominent info |
| Text Muted | `#9CA3AF` | Placeholders, disabled text |
| Premium Gold | `#F59E0B` | Premium/upgrade badges, lock icons, paywall accents |
| Premium Gold Dark | `#92400E` | Premium text on light backgrounds |
| Success Green | `#10B981` | Completed checkmarks, positive trend |
| Warning Amber | `#F59E0B` | Approaching limit warnings, macro over-target |
| Error Red | `#EF4444` | Exceeded macro limits, validation failures |
| Info Blue | `#3b82f6` | Water elements, info callouts |
| Protein Green | `#34D399` | Protein macro bar and label |
| Carbs Orange | `#FB923C` | Carbs macro bar and label |
| Fat Blue | `#60A5FA` | Fat macro bar and label |
| Calories Coral | `#F87171` | Calorie indicator, donut chart fill |
| Divider | `#E5E7EB` | Card borders, list separators |
| Border Card | `#f4f4f4` | Card borders (input fields, cards) |
| Shadow | `rgba(127, 124, 240, 0.06)` | Card shadows (periwinkle-tinted) |
| Meal-Breakfast | `#FEF3C7` | Breakfast tag background |
| Meal-Lunch | `#D1FAE5` | Lunch tag background |
| Meal-Dinner | `#DBEAFE` | Dinner tag background |
| Meal-Snacks | `#F3E8FF` | Snacks tag background |

### Typography

| Element | Font Size | Font Weight | Line Height | Font Family | Usage |
|---------|-----------|-------------|-------------|-------------|-------|
| Screen Title | 24px | 600 (SemiBold) | 30px | Outfit | "Log Book", "Food Search" |
| Date Display | 18px | 600 (SemiBold) | 24px | Outfit | "Tuesday, Apr 25" in header |
| Card Title | 15px | 600 (SemiBold) | 20px | Outfit | Section headers within cards |
| Body Text | 14px | 400 (Regular) | 20px | Inter | Descriptions, food names |
| Body Text Bold | 14px | 600 (SemiBold) | 20px | Inter | Emphasized labels, meal names |
| Large Number | 28px | 700 (Bold) | 36px | Outfit | Calorie totals, macro values |
| Metric Value | 17px | 600 (SemiBold) | 24px | Outfit | Macro grams, serving sizes |
| Caption | 12px | 400 (Regular) | 16px | Inter | Timestamps, hints, RDV % |
| Button Text | 16px | 600 (SemiBold) | 20px | Inter | CTA buttons |
| Tab Label | 14px | 600 (SemiBold) | 20px | Outfit | Tab bar labels |
| Macro Label | 11px | 600 (SemiBold) | 14px | Inter | Protein/Carbs/Fat labels on bars |
| Search Input | 16px | 400 (Regular) | 22px | Inter | Search bar text |
| Food Item Name | 15px | 500 (Medium) | 20px | Inter | Search result and logged item names |
| Empty State | 14px | 500 (Medium) | 20px | Inter | Empty state messages |

**Font Stack:** Outfit (display headings, tab labels), Inter (body, buttons, inputs), SF Pro (iOS fallback), Roboto (Android fallback)

### Spacing System

| Application | Value |
|-------------|-------|
| Screen horizontal padding | 24px |
| Screen top padding | 42px |
| Card gap | 14px |
| Card internal padding | 16px 24px |
| Card corner radius | 20px |
| Section gap | 20px |
| Icon-to-text gap | 8px |
| Element-to-element gap | 12px |
| Macro bar gap | 6px |
| Meal slot gap | 10px |
| Food list item gap | 12px |
| Bottom safe-area padding | 28px + home indicator |
| Search bar height | 44px |
| Food result item height | 64px min |

---

## Component Specifications

### Card Container
- **Background:** `#FFFFFF`
- **Border Radius:** 20px
- **Padding:** 16px 24px
- **Shadow:** `0 0 38px rgba(0, 0, 0, 0.06)`
- **Border:** `1px solid #f4f4f4` (optional, for bordered variant)

### Primary Button
- **Height:** 52px
- **Width:** 100% (full-width)
- **Background:** `#7F7CF0`
- **Text:** White, 16px SemiBold (Inter), centered
- **Border Radius:** 9999px (pill-shaped)
- **Active State:** `#9794F3` bg + scale(0.98)
- **Disabled:** `#f1f0ff` bg, `#64748b` text

### Secondary Button
- **Height:** 44px
- **Padding:** 0 20px
- **Background:** transparent
- **Text:** `#7F7CF0`, 14px Medium (Inter)
- **Border:** none
- **Text Decoration:** underline (offset 3px)
- **Active:** opacity 0.8

### Quick-Add FAB (Floating Action Button)
- **Size:** 60x60px circle
- **Background:** `#7F7CF0`
- **Icon:** "+" (white, 24px)
- **Border:** 4.286px solid `#FFFFFF`
- **Shadow:** `0 0 8px rgba(0, 0, 0, 0.19)`
- **Position:** Bottom-right, 16px from safe area
- **Active State:** Scale 0.95

### Meal Slot Chip (Segmented Control)
- **Height:** 36px
- **Padding:** 8px 12px
- **Unselected:** transparent bg, `#64748b` text, no border
- **Selected:** `#f1f0ff` bg, `#7F7CF0` text
- **Border Radius:** 9999px (pill-shaped)
- **Font:** 14px, 600 (SemiBold), Outfit
- **Gap:** 6px between chips
- **Container:** White bg, rounded-full shadow card with 6px padding
- **Icons:** Small emoji or icon prefix (☀️ Breakfast, 🌤 Lunch, 🌙 Dinner, 🍿 Snacks)

### Food Log Item (List Row)
- **Height:** 64px min
- **Background:** White
- **Border Bottom:** `1px solid #f4f4f4` (very subtle)
- **Left:** Food name (15px Medium) + serving info (12px Caption, `#525252`)
- **Right:** Calorie count (15px SemiBold) + macro summary (12px Caption)
- **Swipe Action:** Swipe left → delete (red), swipe right → edit quantity (blue)
- **Tap:** Opens quantity/serving adjustment for that item

### Macro Progress Bar
- **Height:** 8px
- **Track:** `#E5E7EB` (grey)
- **Fill Color:** Varies by macro:
  - Protein: `#34D399` (green)
  - Carbs: `#FB923C` (orange)
  - Fat: `#60A5FA` (blue)
  - Calories: `#F87171` (coral/red)
- **Border Radius:** 4px
- **Label Left:** Macro name + grams (e.g., "Protein 85g")
- **Label Right:** Target (e.g., "/ 120g")

### Calorie Donut/Ring Chart
- **Size:** 120px diameter
- **Track Color:** `#f1f0ff` (purple-blue muted)
- **Fill Color:** `#F87171` (coral, for calories) or gradient
- **Stroke Width:** 10px
- **Center Text:** Calories consumed (28px Bold)
- **Center Subtext:** "of 2,200 kcal" (12px Caption)
- **Animation:** Ring fills on load (800ms ease-out)

### Premium Badge (Lock/Upgrade)
- **Icon:** Lock icon, 14px
- **Color:** `#F59E0B` (gold/amber)
- **Background:** `#FEF3C7` (light amber tint)
- **Border Radius:** 6px
- **Label Text:** "Premium", 11px, `#92400E`

### Search Bar
- **Height:** 44px
- **Background:** `#F5F6FA`
- **Border Radius:** 12px
- **Padding:** 0 14px
- **Placeholder:** "Search food..." (14px, `#9CA3AF`)
- **Icon:** Search icon (🔍), 16px, `#9CA3AF` (left)
- **Extra Actions (Right):** Barcode icon (Premium, with lock overlay) + Camera icon (AI photo)
- **Clear Button:** X icon, 14px, `#9CA3AF` (visible when text entered)

### Recent Food Chip
- **Height:** 40px
- **Padding:** 0 14px
- **Background:** `#f1f0ff`
- **Text:** Food name, 13px Medium (Inter), `#7F7CF0`
- **Border Radius:** 20px (pill)
- **Right Icon (if favorite):** ⭐ or ❤️, 12px, `#F59E0B`
- **Gap:** 8px between chips

### Nutrient Row (Micronutrient Detail)
- **Height:** 40px
- **Left:** Nutrient name (14px Regular)
- **Center:** Mini progress bar (partial width)
- **Right:** Value + RDV % (13px SemiBold + 11px Caption)
- **Color Coding:** Green (≥100% RDV), Amber (50-99%), Muted (1-49%), Grey (0% or N/A)

### Date Navigation Header
- **Height:** 48px
- **Left:** ← (chevron left) — previous day
- **Center:** Date display (18px SemiBold) + day name
- **Right:** → (chevron right) — next day (disabled for future dates)
- **Center Tap:** Opens calendar picker (bottom sheet)
- **Background:** White or `#F5F6FA`

### Custom Meal Card (in list)
- **Height:** 56px
- **Background:** White, subtle left border accent (`#60A5FA`, 3px)
- **Left:** Meal name (14px SemiBold) + component count (12px Caption: "4 foods")
- **Right:** Total calories (14px SemiBold) + expand chevron
- **Tap:** Expand → shows component foods inline, then "Log Meal" button

### Food Detail Modal (after selecting a food)
- **Type:** Bottom sheet (75% height)
- **Header:** Food name (18px Bold) + brand (if available, 13px Caption)
- **Serving Size Selector:** Horizontal chip row (e.g., "1 serving (100g)", "1 cup (240g)", "Custom")
- **Quantity Stepper:** Large numeric input with ± buttons
- **Macro Preview:** Compact row showing calories, protein, carbs, fat for selected quantity
- **Meal Assignment:** Segmented chips: Breakfast | Lunch | Dinner | Snacks
- **Primary CTA:** "Log to [Meal]" (purple-blue, full-width pill)
- **Secondary:** "Add to Favorites" (heart icon)

---

## Screen-by-Screen Specifications

---

### Screen 1: Daily Log View — Default State

**Purpose:** The primary screen of the Log Book. Displays all logged food items and nutritional data for the selected date. Serves as the hub from which all food entry and review branches.

#### Layout

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│  Log Book                       [📅]    │  ← Title + Calendar icon
│                                          │
│  ←  Tuesday, Apr 25, 2026  →           │  ← Date navigation bar
│                                          │
│  ┌─── Macro Overview ──────────────┐   │
│  │         ╭──────╮                 │   │
│  │         │ 1,850 │                │   │  ← Calorie donut ring
│  │         │  kcal │                │   │
│  │         ╰──────╯                 │   │
│  │         / 2,200                  │   │
│  │                                  │   │
│  │  Protein  ███████░░░  85/120g   │   │  ← Macro bars
│  │  Carbs    ██████░░░░  160/220g  │   │
│  │  Fat      ████████░░  55/65g    │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Meals ────────────────────────┐   │
│  │                                   │   │
│  │  ☀️ Breakfast               420 kcal │  ← Meal section header
│  │  ┌──────────────────────────┐    │   │
│  │  │ Oatmeal        350 kcal  │    │   │  ← Food log items
│  │  │ 1 bowl (250g)            │    │   │
│  │  │ P 12g  C 55g  F 8g      │    │   │
│  │  └──────────────────────────┘    │   │
│  │  ┌──────────────────────────┐    │   │
│  │  │ Banana          70 kcal  │    │   │
│  │  │ 1 medium (118g)          │    │   │
│  │  │ P 1g  C 18g  F 0g       │    │   │
│  │  └──────────────────────────┘    │   │
│  │                            [+ Add]│   │  ← Add food to this meal
│  │                                   │   │
│  │  🌤 Lunch                 650 kcal │   │
│  │  ┌──────────────────────────┐    │   │
│  │  │ Chicken Salad   520 kcal │    │   │
│  │  │ 1 serving                │    │   │
│  │  │ P 45g  C 12g  F 32g     │    │   │
│  │  └──────────────────────────┘    │   │
│  │  ┌──────────────────────────┐    │   │
│  │  │ Apple Juice     130 kcal │    │   │
│  │  │ 1 glass (250ml)          │    │   │
│  │  │ P 0g  C 33g  F 0g       │    │   │
│  │  └──────────────────────────┘    │   │
│  │                            [+ Add]│   │
│  │                                   │   │
│  │  🌙 Dinner                580 kcal │   │
│  │  ┌──────────────────────────┐    │   │
│  │  │ Grilled Salmon  380 kcal │    │   │
│  │  │ 1 fillet (170g)          │    │   │
│  │  │ P 42g  C 0g  F 22g      │    │   │
│  │  └──────────────────────────┘    │   │
│  │  ┌──────────────────────────┐    │   │
│  │  │ Brown Rice      200 kcal │    │   │
│  │  │ 1 cup (195g)             │    │   │
│  │  │ P 5g  C 45g  F 2g       │    │   │
│  │  └──────────────────────────┘    │   │
│  │                            [+ Add]│   │
│  │                                   │   │
│  │  🍿 Snacks                200 kcal │   │
│  │  ┌──────────────────────────┐    │   │
│  │  │ Greek Yogurt    200 kcal │    │   │
│  │  │ 1 cup (240g)             │    │   │
│  │  │ P 20g  C 8g  F 12g      │    │   │
│  │  └──────────────────────────┘    │   │
│  │                            [+ Add]│   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Quick Actions ───────────────┐   │
│  │  [📋 Copy Yesterday]             │   │  ← Free feature
│  │  [🔬 Full Nutrients] — Premium   │   │  ← Premium link with lock
│  │  [📊 7-Day Chart] → Coach tab    │   │  ← Cross-navigation hint
│  └──────────────────────────────────┘   │
│                                          │
│                              [  +  ]     │  ← Quick-Add FAB
│                                          │
│  [Home] [Workouts] [Logbook] [More]      │  ← Bottom Tab Bar (Logbook active)
└─────────────────────────────────────────┘
```

#### States

**State A: Data Present (Default)**
- Macro overview card with live donut + bars
- Meal sections organized: Breakfast → Lunch → Dinner → Snacks
- Each meal section collapsible (tap header to collapse/expand)
- "Add" button per meal slot for contextual logging
- Quick-Add FAB in bottom-right for general food search

**State B: Empty Day (No Foods Logged)**
- Macro overview card shows targets with dashed/placeholder indicators and "—" for consumed
- Meal sections show empty states:
  - ☀️ Breakfast: "No foods logged yet" with prominent "+ Add" button
  - 🌤 Lunch: "No foods logged yet" with "+ Add" button
  - 🌙 Dinner: "No foods logged yet" with "+ Add" button
  - 🍿 Snacks: "No foods logged yet" with "+ Add" button
- Hero text at top: "Start your day — log your first meal"
- Copy Yesterday button disabled if yesterday was also empty

**State C: Copy Yesterday Available**
- "Copy Yesterday" card shown at top with preview of yesterday's items
- "Review & Apply" button
- "Dismiss" secondary action

#### Interactions
- **Date Navigation:** Swipe left/right to change dates; tap center date → calendar picker bottom sheet
- **Food Item Tap:** Opens quantity/serving adjustment for that item
- **Food Item Swipe Left:** Delete with confirmation
- **"+ Add" per meal:** Opens Food Search modal, pre-selects that meal slot
- **FAB Tap:** Opens Food Search modal (no meal pre-selected)
- **Macro Overview Tap:** Opens full Daily Macro Overview detail screen
- **"Full Nutrients" Tap:** If Premium → opens micronutrient breakdown; if Free → Premium paywall modal
- **"7-Day Chart" Tap:** Navigates to Coach → Nutrition Tab
- **"Copy Yesterday" Tap:** Opens review screen (Screen 8)

---

### Screen 2: Daily Macro Overview — Detail View

**Purpose:** Expanded view of daily macro progress with visual breakdowns and remaining targets.

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Back       Macro Overview           │
├─────────────────────────────────────────┤
│                                          │
│  ┌─── Calories ─────────────────────┐   │
│  │         ╭──────────╮             │   │
│  │         │   1,850   │             │   │  ← Large donut ring (140px)
│  │         │   kcal    │             │   │
│  │         ╰──────────╯             │   │
│  │         of 2,200                  │   │
│  │                                  │   │
│  │  350 kcal remaining             │   │  ← Remaining indicator (green)
│  │  On track — 84% of daily goal   │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Macronutrients ───────────────┐   │
│  │                                  │   │
│  │  Protein                         │   │
│  │  ████████████░░░░░░  85 / 120g  │   │  ← Filled bar
│  │  71%  •  35g remaining          │   │  ← % + remaining
│  │                                  │   │
│  │  Carbs                           │   │
│  │  ██████████░░░░░░░░  160 / 220g │   │
│  │  73%  •  60g remaining          │   │
│  │                                  │   │
│  │  Fat                             │   │
│  │  ██████████████░░░░  55 / 65g   │   │
│  │  85%  •  10g remaining          │   │
│  │                                  │   │
│  │  Fiber                           │   │
│  │  ██████░░░░░░░░░░░░  18 / 30g   │   │
│  │  60%  •  12g remaining          │   │
│  │                                  │   │
│  │  Sugar                           │   │
│  │  ██████████████████  45 / 50g   │   │
│  │  90%  •  Nearing limit          │   │  ← Warning state (amber)
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Per-Meal Breakdown ──────────┐   │
│  │                                  │   │
│  │  ☀️ Breakfast     420 kcal      │   │
│  │  P 12g    C 55g    F 8g        │   │
│  │                                  │   │
│  │  🌤 Lunch         650 kcal      │   │
│  │  P 45g    C 45g    F 32g       │   │
│  │                                  │   │
│  │  🌙 Dinner        580 kcal      │   │
│  │  P 47g    C 45g    F 24g       │   │
│  │                                  │   │
│  │  🍿 Snacks        200 kcal      │   │
│  │  P 20g    C 8g     F 12g       │   │
│  └──────────────────────────────────┘   │
│                                          │
└─────────────────────────────────────────┘
```

#### Design Notes
- Each macro bar has distinct color (Protein=green, Carbs=orange, Fat=blue)
- "Remaining" text color: green (well under), amber (approaching), red (at/over limit)
- Sugar nearing limit uses amber warning color instead of red (encouraging tone)
- Per-meal breakdown is collapsible — tap any meal to expand/contract

---

### Screen 3: Full Daily Nutrients — Micronutrient Breakdown (Premium)

**Purpose:** Detailed micronutrient tracking with RDV comparisons. For health-conscious and advanced users.

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Back       Daily Nutrients          │
├─────────────────────────────────────────┤
│                                          │
│  Tuesday, Apr 25, 2026                  │
│                                          │
│  ┌─── Vitamins ─────────────────────┐   │
│  │                                  │   │
│  │  Vitamin A      ████████  90%   │   │  ← Nutrient rows
│  │                  810 / 900 µg   │   │
│  │  Vitamin C      ████████  85%   │   │
│  │                  76 / 90 mg     │   │
│  │  Vitamin D      ████░░░░  40%   │   │  ← Low — highlighted
│  │                  8 / 20 µg      │   │
│  │  Vitamin E      ██████░░  55%   │   │
│  │                  8 / 15 mg      │   │
│  │  Vitamin K      ████████  80%   │   │
│  │                  96 / 120 µg    │   │
│  │  Thiamin (B1)   ████████  75%   │   │
│  │  Riboflavin (B2) ████████  88%  │   │
│  │  Niacin (B3)    ████████  92%   │   │
│  │  Vitamin B6     ██████░░  62%   │   │
│  │  Folate (B9)    ████████  78%   │   │
│  │  Vitamin B12    ████████  95%   │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Minerals ─────────────────────┐   │
│  │                                  │   │
│  │  Calcium        ██████░░  55%   │   │  ← Low
│  │  Iron           ████████  80%   │   │
│  │  Magnesium      ████░░░░  38%   │   │  ← Low — highlighted
│  │  Potassium      ██████░░  60%   │   │
│  │  Sodium         ████████  85%   │   │
│  │  Zinc           ████████  72%   │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Other ────────────────────────┐   │
│  │  Fiber          ██████░░  60%   │   │
│  │  Sugar          ████████  90%   │   │
│  │  Sat. Fat       ████████  75%   │   │
│  │  Cholesterol    ████░░░░  42%   │   │
│  └──────────────────────────────────┘   │
│                                          │
│  💡 Nutrients highlighted in amber are   │
│     below 50% RDV — consider adding      │
│     foods rich in these nutrients.       │
│                                          │
└─────────────────────────────────────────┘
```

#### Sorting & Highlighting
- Default sort: by % RDV ascending (lowest/deficient first)
- Nutrients < 50% RDV: amber highlight on row
- Nutrients ≥ 100% RDV: green checkmark
- Nutrients with no RDV data: greyed out with "—"
- Color coding legend at bottom
- Section headers: "Vitamins", "Minerals", "Other"

#### Free User State
- Locked paywall card replacing the nutrient list
- Preview: show top 3-5 nutrients with blurred/obscured values beyond
- Upsell: "Unlock full nutrient tracking with Premium"
- "Start Free Trial" CTA

---

### Screen 4: Food Search — Main Entry Modal

**Purpose:** The primary food entry surface. Accessed via the FAB, per-meal "+ Add" buttons, or nav bar quick-add. This is the most frequently used interaction in the Log Book.

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Cancel        Food Search           │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │ 🔍  Search food...        [📷][📱]│   │  ← Search bar + barcode/camera
│  └─────────────────────────────────┘    │
│                                          │
│  ┌─── Recent ───────────────────────┐   │
│  │  [Oatmeal ⭐] [Banana] [Chicken]  │   │  ← Horizontally scrollable chips
│  │  [Salad ⭐] [Salmon] [Rice]  →   │   │     ⭐ = favorited
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Favorites ────────────────────┐   │
│  │  ❤️ Oatmeal (1 bowl)   350 kcal │   │
│  │  ❤️ Chicken Salad      520 kcal │   │
│  │  ❤️ Greek Yogurt       200 kcal │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── My Meals ─────────────────────┐   │
│  │  📋 Morning Smoothie    420 kcal │   │  ← Custom meals
│  │     4 foods • P 28g C 55g F 12g │   │
│  │  🔒 Create custom meal  (Premium)│   │  ← Premium upsell
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Search Results ───────────────┐   │
│  │  (appears when user types)        │   │
│  │                                   │   │
│  │  ┌──────────────────────────┐    │   │
│  │  │ 🥣 Oatmeal, cooked       │    │   │  ← Search result item
│  │  │   1 bowl (250g)           │    │   │
│  │  │   350 kcal  P12 C55 F8   │    │   │
│  │  │   Brand: Generic          │    │   │
│  │  └──────────────────────────┘    │   │
│  │  ┌──────────────────────────┐    │   │
│  │  │ 🥣 Instant Oatmeal       │    │   │
│  │  │   1 packet (28g)          │    │   │
│  │  │   110 kcal  P3 C22 F2    │    │   │
│  │  │   Brand: Quaker           │    │   │
│  │  └──────────────────────────┘    │   │
│  │  ...                              │   │
│  └──────────────────────────────────┘   │
│                                          │
│  (Empty state before search:             │
│   "Search for a food or scan a barcode   │
│    to get started.")                     │
│                                          │
└─────────────────────────────────────────┘
```

#### States

**State A: Before Search (Default)**
- Recent foods chips row (horizontally scrollable)
- Favorites list (capped at 3 for Free, unlimited for Premium)
- My Meals section with custom meals
- Search bar focused by default (keyboard visible)
- Empty results area with helper text

**State B: During Search**
- Results replace Recent/Favorites/My Meals sections
- Loading skeleton while API fetches
- Results from Open Food Facts API
- Each result shows: name, serving size, calories, macros, brand (if available)
- "No results" state with suggestion to try manual entry or scan barcode

**State C: After Selecting a Food**
- Bottom sheet appears (Screen 5: Assign Food to Meal)

#### Search Behavior
- **Debounce:** 300ms before API call
- **API:** Open Food Facts
- **Results Display:** 10-15 results at a time, infinite scroll
- **No Results:** "No foods found for '[query]'. Try a different search or create a custom entry."
- **Error State:** "Search unavailable. Enter food details manually." with manual entry button

---

### Screen 5: Barcode Scanner (Premium)

**Purpose:** Quick food entry via barcode scanning. Premium-gated.

#### Flow
```
┌─────────────────────────────────────────┐
│  ← Back       Scan Barcode             │
├─────────────────────────────────────────┤
│                                          │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │         [Camera Viewfinder]       │  │
│  │                                   │  │
│  │     ┌─────────────────────┐       │  │
│  │     │  Barcode alignment  │       │  │  ← Scanner overlay
│  │     │     rectangle       │       │  │
│  │     └─────────────────────┘       │  │
│  │                                   │  │
│  │  Point camera at barcode          │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                          │
│  [  📝  Enter Manually  ]                │  ← Fallback option
│                                          │
└─────────────────────────────────────────┘
```

#### Post-Scan States

**Recognized:**
- Success animation (subtle green flash + checkmark)
- Barcode data auto-populated
- Proceeds directly to "Assign Food to Meal" (Screen 6)

**Not Recognized:**
- "Barcode not found in database" message
- Auto-transitions to manual entry form
- Manual form pre-fills nothing — user enters name, calories, macros, serving size

**Free User Attempting to Access:**
- Scanner icon shows lock badge
- Tap → Premium paywall modal: "Scan barcodes for instant nutrition data"
- "Start Free Trial" CTA

---

### Screen 6: Manual / AI Photo Food Entry

**Purpose:** Fallback entry when food not found via search or barcode. Also used when user doesn't know nutritional values.

#### Layout — Manual Entry Form

```
┌─────────────────────────────────────────┐
│  ← Back       Add Food Manually        │
├─────────────────────────────────────────┤
│                                          │
│  Don't know the nutrition info?          │
│  ┌───────────────────────────────────┐  │
│  │  📸  Upload a photo               │  │  ← AI photo option
│  │  Let AI estimate the calories      │  │
│  └───────────────────────────────────┘  │
│                                          │
│  ── OR ──                                │
│                                          │
│  Name                                    │
│  ┌───────────────────────────────────┐  │
│  │  Enter food name...               │  │
│  └───────────────────────────────────┘  │
│                                          │
│  Serving Size                            │
│  ┌──────────┐  ┌──────────┐            │
│  │    1     │  │  serving │  ▼         │  ← Quantity + unit selector
│  └──────────┘  └──────────┘            │
│  (100g, 1 cup, 1 piece, custom...)      │
│                                          │
│  ┌─── Macros ──────────────────────┐    │
│  │  Calories                         │    │
│  │  ┌──────────┐                    │    │
│  │  │   350    │  kcal              │    │
│  │  └──────────┘                    │    │
│  │                                  │    │
│  │  Protein     Carbs      Fat      │    │
│  │  ┌─────┐   ┌─────┐   ┌─────┐    │    │
│  │  │ 12  │   │ 55  │   │  8  │    │    │
│  │  └─────┘   └─────┘   └─────┘    │    │
│  │    g          g         g        │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Micronutrients (Optional) ────┐   │
│  │  ▶ Tap to expand                 │   │  ← Collapsed by default
│  │  (Fiber, Sugar, Vitamins, etc.)  │   │
│  └──────────────────────────────────┘    │
│                                          │
│  [  💾  Save & Log  ]                    │  ← CTA: saves to DB + logs
│  [  💾  Save to My Foods  ]              │  ← Secondary: save without logging
│                                          │
└─────────────────────────────────────────┘
```

#### AI Photo Upload Flow
1. User taps "Upload a photo"
2. Camera/gallery picker opens
3. Photo captured/selected → loading state: "Analyzing your food..."
4. AI returns estimated: food name, calories, macros
5. Pre-fills the manual form with AI estimates
6. User reviews and adjusts before saving
7. Confidence indicator: "AI estimate — 85% confidence" badge on pre-filled values

#### Design Notes
- Manual form should be quick to fill — large touch targets, numeric keypad for macros
- Serving size unit selector: dropdown with common units (g, ml, cup, oz, piece, tablespoon, teaspoon, serving)
- "Save & Log" vs "Save to My Foods" — first logs immediately and saves, second adds to personal database for future use
- Micronutrient section collapsed by default — this is power-user territory

---

### Screen 7: Assign Food to Meal — Logging Modal

**Purpose:** The final step after selecting/creating a food. Sets quantity, serving, and meal slot before logging.

#### Layout (Bottom Sheet, 60% height)

```
┌─────────────────────────────────────────┐
│  [Dimmed Daily Log View background]      │
│                                          │
│  ┌───────────────────────────────────┐  │
│  │  ─── drag handle ───              │  │  ← Bottom sheet indicator
│  │                                   │  │
│  │  Oatmeal, cooked                  │  │  ← Food name (18px Bold)
│  │  Generic • 350 kcal/serving       │  │  ← Brand + cal per serving
│  │                                   │  │
│  │  ┌─── Quantity ──────────────┐    │  │
│  │  │   Serving Size             │    │  │
│  │  │  [1 bowl (250g)] [Custom] │    │  │  ← Preset + custom toggle
│  │  │                           │    │  │
│  │  │   Quantity                 │    │  │
│  │  │   [ — ]   1.5   [ + ]     │    │  │  ← Stepper
│  │  │   (375g total)            │    │  │
│  │  └───────────────────────────┘    │  │
│  │                                   │  │
│  │  ┌─── Macros Preview ────────┐    │  │
│  │  │  525 kcal                  │    │  │  ← Calculated from quantity
│  │  │  ████████░░  18g Protein  │    │  │
│  │  │  ████████░░  83g Carbs    │    │  │
│  │  │  ████████░░  12g Fat      │    │  │
│  │  └───────────────────────────┘    │  │
│  │                                   │  │
│  │  ┌─── Assign to Meal ────────┐    │  │
│  │  │                           │    │  │
│  │  │  [☀️ Breakfast]  [🌤 Lunch] │    │  │  ← Meal slot chips
│  │  │  [🌙 Dinner]    [🍿 Snacks]│    │  │     (selected = muted bg)
│  │  │                           │    │  │
│  │  └───────────────────────────┘    │  │
│  │                                   │  │
│  │  ┌─── Options ───────────────┐    │  │
│  │  │  ❤️  Add to Favorites      │    │  │
│  │  └───────────────────────────┘    │  │
│  │                                   │  │
│  │  [  Log to Breakfast  ]           │  │  ← Dynamic CTA (changes with selection)
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

#### Smart Defaults
- Meal slot defaults to the most likely based on time of day:
  - 5:00–10:59 → Breakfast
  - 11:00–15:59 → Lunch
  - 16:00–20:59 → Dinner
  - 21:00–4:59 → Snacks
- If "+ Add" was tapped on a specific meal section, that meal is pre-selected

#### Quantity Interaction
- Preset serving sizes shown as tappable chips
- Custom toggle switches to free-form numeric input
- Quantity stepper: continuous press on +/− increments rapidly
- Macro preview updates in real-time as quantity changes

#### Post-Logging
- Bottom sheet dismisses with animation
- Snackbar/toast: "Oatmeal logged to Breakfast ✓  [Undo]" (5 second undo window)
- Daily Log View animates: affected meal section updates, macro overview ring/bars animate to new values
- Quick checkmark pulse on the meal slot that received the food

---

### Screen 8: Copy Previous Day Log

**Purpose:** Convenience feature to quickly copy and adjust yesterday's log.

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Back       Copy Yesterday           │
├─────────────────────────────────────────┤
│                                          │
│  Review items from yesterday             │
│  (Tuesday, Apr 24) before applying       │
│  to today (Wednesday, Apr 25).          │
│                                          │
│  ┌─── Yesterday's Meals ───────────┐    │
│  │                                  │    │
│  │  ☀️ Breakfast (420 kcal)        │    │
│  │  ┌──────────────────────────┐   │    │
│  │  │ ✓  Oatmeal      350 kcal │   │    │  ← Checked = will copy
│  │  │    1.5 bowls (375g)      │   │    │
│  │  │    [—]  1.5  [+]        │   │    │  ← Adjustable quantity
│  │  └──────────────────────────┘   │    │
│  │  ┌──────────────────────────┐   │    │
│  │  │ ✓  Banana        70 kcal │   │    │
│  │  │    1 medium (118g)       │   │    │
│  │  └──────────────────────────┘   │    │
│  │                                  │    │
│  │  🌤 Lunch (650 kcal)            │    │
│  │  ┌──────────────────────────┐   │    │
│  │  │ ✗  Chicken Salad 520 kcal│   │    │  ← Unchecked = won't copy
│  │  │    1 serving              │   │    │     (tapped to toggle)
│  │  └──────────────────────────┘   │    │
│  │  ┌──────────────────────────┐   │    │
│  │  │ ✓  Apple Juice   130 kcal│   │    │
│  │  └──────────────────────────┘   │    │
│  │  ...                             │    │
│  └──────────────────────────────────┘    │
│                                          │
│  By default, all items are selected.     │
│  Tap to exclude, adjust quantities,      │
│  or remove items.                        │
│                                          │
│  [  ✓  Apply 4 items to Today  ]         │  ← CTA (shows item count)
│  [  Cancel  ]                            │
│                                          │
└─────────────────────────────────────────┘
```

#### Behavior
- All items checked by default
- Tap checkbox to toggle inclusion
- Quantity stepper inline per item
- "Apply" logs all checked items to today, preserving their original meal assignments
- "Cancel" returns to Daily Log View with no changes
- Empty state if yesterday had no foods: "Nothing to copy — yesterday had no logged foods."

---

### Screen 9: Custom Meals — Create & Manage (Premium)

**Purpose:** Build reusable meal templates by grouping multiple foods. Premium feature with 1 free usage.

#### Layout — Create Custom Meal

```
┌─────────────────────────────────────────┐
│  ← Back       Create Meal              │
├─────────────────────────────────────────┤
│                                          │
│  Meal Name                               │
│  ┌───────────────────────────────────┐  │
│  │  Morning Smoothie                 │  │  ← Editable name
│  └───────────────────────────────────┘  │
│                                          │
│  ┌─── Foods in This Meal ──────────┐    │
│  │                                  │    │
│  │  ┌──────────────────────────┐   │    │
│  │  │ 🥛 Oat Milk      120 kcal│ ✕ │    │  ← Added foods with remove
│  │  │   1 cup (240ml)           │   │    │
│  │  │   P 3g  C 16g  F 5g     │   │    │
│  │  └──────────────────────────┘   │    │
│  │  ┌──────────────────────────┐   │    │
│  │  │ 🍌 Banana          70 kcal│ ✕ │    │
│  │  │   1 medium (118g)         │   │    │
│  │  │   P 1g  C 18g  F 0g     │   │    │
│  │  └──────────────────────────┘   │    │
│  │  ┌──────────────────────────┐   │    │
│  │  │ 🫐 Frozen Berries  80 kcal│ ✕ │    │
│  │  │   1 cup (140g)            │   │    │
│  │  │   P 1g  C 20g  F 0g     │   │    │
│  │  └──────────────────────────┘   │    │
│  │  ┌──────────────────────────┐   │    │
│  │  │ 🥄 Protein Powder 150 kcal│ ✕ │    │
│  │  │   1 scoop (30g)           │   │    │
│  │  │   P 25g  C 3g  F 3g     │   │    │
│  │  └──────────────────────────┘   │    │
│  │                                  │    │
│  │  [  + Add Food  ]               │    │  ← Opens Food Search
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Meal Totals ─────────────────┐    │
│  │  🔥 420 kcal                    │    │  ← Auto-calculated
│  │  🥩 30g Protein                 │    │
│  │  🍞 57g Carbs                   │    │
│  │  🧈 8g Fat                      │    │
│  └──────────────────────────────────┘    │
│                                          │
│  [  💾  Save Meal  ]                      │  ← Primary CTA
│                                          │
└─────────────────────────────────────────┘
```

#### Managing Custom Meals
- Saved meals appear in "My Meals" section of Food Search
- Tap a saved meal → expands inline to show component foods + total macros
- "Log Meal" button → logs ALL component foods at once to the selected meal slot
- Long-press → context menu: "Edit Meal", "Delete Meal"
- Edit mode: same screen as Create, with existing data pre-filled

#### Premium Gate
- Free users: 1 custom meal allowed, "Create Custom Meal" visible with "1 free" badge
- Creating a 2nd meal triggers paywall: "Unlock unlimited custom meals with Premium"
- Upsell copy: "Create and save your go-to meals for one-tap logging"

---

### Screen 10: Premium Paywall Modal (Log Book)

**Purpose:** Triggered when Free user attempts to access Premium features in the Log Book.

#### Layout

```
┌─────────────────────────────────────────┐
│  [Dimmed background — Daily Log View]    │
│                                          │
│  ┌───────────────────────────────────┐  │
│  │         🔬                        │  │  ← Contextual icon (changes per feature)
│  │                                   │  │
│  │  Unlock Premium Nutrition         │  │  ← 22px Bold
│  │  Tracking                         │  │
│  │                                   │  │
│  │  Get detailed micronutrient       │  │  ← Feature-specific copy
│  │  tracking, barcode scanning,      │  │
│  │  custom meals, and more.          │  │
│  │                                   │  │
│  │  ✓ Full Micronutrient Breakdown  │  │  ← Feature list
│  │  ✓ Barcode Scanner               │  │
│  │  ✓ Unlimited Custom Meals        │  │
│  │  ✓ Unlimited Favorite Foods      │  │
│  │  ✓ Inline Macro Editing          │  │
│  │  ✓ AI Photo Calorie Estimation   │  │
│  │                                   │  │
│  │  [  Start Free Trial  ]           │  │  ← Primary CTA (purple-blue pill)
│  │  [  Maybe Later  ]                │  │  ← Secondary
│  └───────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

#### Context-Aware Paywall Triggers

| Feature Accessed | Paywall Header | Icon | Feature-Specific Copy |
|-----------------|----------------|------|----------------------|
| Barcode Scanner | "Scan Barcodes Instantly" | 📱 | "Point, scan, log — get nutrition data in seconds" |
| Micronutrients | "Unlock Nutrient Tracking" | 🔬 | "See your full vitamin and mineral breakdown" |
| Custom Meals (2nd) | "Unlimited Custom Meals" | 📋 | "Save all your go-to meals for one-tap logging" |
| Favorites (4th) | "Unlimited Favorites" | ❤️ | "Keep all your most-logged foods at your fingertips" |
| Inline Editing | "Edit Meal Quantities" | ✏️ | "Adjust logged portions directly from your meal summary" |
| AI Photo Entry | "AI Calorie Estimation" | 📸 | "Snap a photo, let AI estimate the nutrition" |

---

## Log Book — Full State Machine

```
[Bottom Nav — Log Book Tab]
         │
         ▼
[Daily Log View]
         │
         ├─ Tap date ──> [Calendar Picker] ──> [Daily Log View (new date)]
         ├─ Swipe L/R ──> [Daily Log View (adjacent date)]
         │
         ├─ Tap FAB ──> [Food Search Modal]
         │                │
         │                ├─ Text search ──> [Open Food Facts API] ──> [Results List]
         │                ├─ Barcode icon ──> [Premium check]
         │                │                    ├─ Premium OK ──> [Barcode Scanner]
         │                │                    │    ├─ Recognized ──> [Assign Food]
         │                │                    │    └─ Not found ──> [Manual Entry]
         │                │                    └─ Free ──> [Paywall Modal]
         │                ├─ Camera icon ──> [AI Photo Upload]
         │                │                    └─> [Manual Entry (pre-filled)]
         │                ├─ Recent chip ──> [Assign Food (pre-selected)]
         │                ├─ Favorite item ──> [Assign Food (pre-selected)]
         │                └─ Custom Meal ──> [Assign Food (all components)]
         │
         ├─ Tap "+ Add" (per meal) ──> [Food Search (meal pre-selected)] ──> ...
         │
         ├─ Tap food item ──> [Edit Quantity / Reassign Meal]
         ├─ Swipe food item ──> [Delete Confirmation] ──> Item removed
         │
         ├─ Tap Macro Overview ──> [Screen 2: Macro Detail View]
         ├─ Tap "Full Nutrients" ──> [Premium check]
         │                            ├─ Premium OK ──> [Screen 3: Micronutrients]
         │                            └─ Free ──> [Paywall Modal]
         │
         ├─ Tap "7-Day Chart" ──> [Navigate: Coach → Nutrition Tab]
         │
         └─ Tap "Copy Yesterday" ──> [Screen 8: Copy Review]
                                       └─> [Apply] ──> [Daily Log View (updated)]
```

---

## Interactions & Animations

| Interaction | Animation | Timing |
|------------|-----------|--------|
| Date swipe (L/R) | Slide-out + slide-in with direction | 250ms ease-out |
| Calendar picker open | Bottom sheet slide-up | 300ms ease-out |
| FAB tap | Scale down (0.9) + rotate 45° | 150ms spring |
| Food Search modal open | Full-screen modal slide-up | 300ms ease-out |
| Search result appear | Staggered fade-in from bottom (list items) | 50ms stagger, 200ms each |
| Food item tap | Subtle scale-down (0.98) | 100ms |
| Assign Food bottom sheet | Slide-up from bottom | 300ms ease-out |
| Meal slot chip select | Background color transition + subtle scale (1.0→0.95→1.05→1.0) | 250ms spring |
| Quantity stepper +/− | Number roll transition | 150ms |
| Macro bar fill update | Smooth width transition | 400ms ease-out |
| Calorie donut ring update | Smooth SVG stroke-dashoffset animation | 600ms ease-out |
| Log confirmation | Toast slide-in from top + auto-dismiss | 200ms in, 3s display, 200ms out |
| Undo snackbar | Same as log confirmation | Same timing |
| Food item delete (swipe) | Slide-out left + height collapse | 200ms ease-out |
| Copy Yesterday item toggle | Checkmark draw-on animation (SVG stroke) | 250ms ease-out |
| Premium paywall modal | Bottom sheet slide-up with backdrop dim | 350ms ease-out |
| AI photo analyzing | Pulsing shimmer on photo placeholder | 800ms loop, ~3s duration |
| Barcode scan success | Green flash + checkmark + auto-dismiss | 500ms total |

---

## Empty States

| Screen / State | Empty State Message | Action |
|---------------|-------------------|--------|
| Daily Log View (no foods) | "No foods logged for [date]. Tap + to add your first meal." | FAB tap opens Food Search |
| Meal section (empty) | "No foods logged for Breakfast" with "+ Add Food" button | "+ Add" opens Food Search |
| Food Search (no results) | "No foods found for '[query]'. Try a different search or create a custom entry." | "Create Custom Entry" button |
| Food Search (no recent) | "Your recently logged foods will appear here." | Placeholder with search prompt |
| Favorites (empty) | "Tap the heart icon on any food to add it to your favorites." | Dismissable hint |
| Custom Meals (empty) | "Group your go-to foods into a meal for one-tap logging. Your first custom meal is free!" | "Create Custom Meal" CTA |
| Copy Yesterday (empty) | "Nothing to copy — yesterday had no logged foods." | "Back to Log" button |
| Micronutrients (Free user) | "Unlock full nutrient tracking with Premium" with blurred preview | "Start Free Trial" CTA |
| Barcode scanner (no camera) | "Camera access is required to scan barcodes." | "Open Settings" button |
| AI photo (upload failed) | "Couldn't analyze photo. Enter details manually." | Manual entry form |

---

## Accessibility Requirements

- **Contrast:** Minimum 4.5:1 for body text; 3:1 for large numbers and UI components
- **Macro Colors + Labels:** Always show macro name text alongside colored bars (don't rely on color alone)
- **Text Scaling:** Support dynamic type up to 150% without layout breaking
- **Touch Targets:** All tappable elements minimum 44x44px; quantity stepper buttons minimum 48x48px
- **ARIA Labels:** Screen reader labels for all icons, progress bars, meal slot chips
- **Focus Order:** Logical top-to-bottom flow: date nav → macro overview → meals (breakfast through snacks) → quick actions → FAB
- **Search Accessibility:** Announce "X results found for [query]" to screen readers
- **Undo Timeout:** Screen reader should announce "Undo available for 5 seconds" after logging
- **Reduced Motion:** Disable ring fill animations, search result stagger, and pulse effects for users with reduced motion preference
- **Keyboard Navigation:** Full flow accessible via keyboard (iPad/external keyboard) — tab through meal sections, food items, search results

---

## Iconography

**Style:** Outlined, 2px stroke, consistent with SF Symbols or Material Icons.

| Feature | Icon | Notes |
|---------|------|-------|
| Logbook (tab) | 📋 or book | Tab bar icon, filled when active |
| Calendar | 📅 | Date picker trigger |
| Chevron Left/Right | ◀ / ▶ | Date navigation |
| Add (FAB) | + | Quick-add food |
| Search | 🔍 | Search bar |
| Barcode | 📱 or barcode icon | Premium with lock overlay |
| Camera / AI Photo | 📸 | AI photo entry |
| Breakfast | ☀️ | Morning meal slot |
| Lunch | 🌤 | Midday meal slot |
| Dinner | 🌙 | Evening meal slot |
| Snacks | 🍿 | Snack meal slot |
| Calories | 🔥 | Calorie indicator |
| Protein | 🥩 or egg | Protein macro |
| Carbs | 🍞 or wheat | Carbs macro |
| Fat | 🧈 or droplet | Fat macro |
| Favorite (empty) | ♡ | Outline heart |
| Favorite (filled) | ❤️ | Filled heart, red or green |
| Premium Lock | 🔒 | Gold/amber color |
| Custom Meal | 📋 | Meal template |
| Copy | 📋 | Copy yesterday |
| Nutrients | 🔬 | Microscope for detailed nutrients |
| Chart | 📊 | 7-day chart cross-link |
| Delete | 🗑️ | Remove food item |
| Edit | ✏️ | Edit quantity / inline editing |
| Checkmark | ✓ | Confirmation, applied |
| Undo | ↩️ | Undo log action |
| Settings | ⚙️ | Settings |
| Stepper Minus | − | Decrease quantity |
| Stepper Plus | + | Increase quantity |
| Info | ⓘ | RDV explanation, tooltips |

---

## Premium Free vs. Premium Feature Summary (UI Level)

| UI Element | Free | Premium |
|------------|------|---------|
| Date Navigation | Full | Full |
| Daily Macro Overview | Full | Full |
| Food Search (API) | Full | Full |
| Manual Food Entry | Full | Full |
| AI Photo Calorie Estimation | TBD | TBD |
| Assign Food to Meal | Full | Full |
| Set Quantity & Serving | Full | Full |
| Real-time Macro Updates | Full | Full |
| Copy Previous Day Log | Full | Full |
| Recent Foods | Full | Full |
| Favorite Foods (up to 3) | Full | Full |
| Favorite Foods (unlimited) | Locked | Full |
| Custom Meals (1 max) | Full | Full |
| Custom Meals (unlimited) | Locked | Full |
| Barcode Scanner | Locked (paywall modal) | Full |
| Full Micronutrient Breakdown | Locked (blurred preview) | Full |
| Edit Quantity from Meal Summary | Locked (greyed out) | Full |
| 7-Day Chart (Coach Tab) | Full | Full |

---

## Reference Apps & Design Patterns

### Competitive Inspiration

| Reference | What to Learn |
|-----------|--------------|
| **MyFitnessPal** | Food search UX, barcode scanner integration, meal slot assignment, macro overview cards |
| **Lose It!** | Quick-add patterns, serving size selection, recent foods carousel |
| **Cronometer** | Micronutrient breakdown UI, RDV comparison rows, nutrient color coding |
| **Yazio** | Meal slot segmentation, "copy previous day" flow, custom meal builder |
| **Yuka** | Open Food Facts API integration, barcode scan success/fallback handling |
| **SnapCalorie** | AI photo-to-calorie estimation UI, confidence indicators |
| **FoodVisor** | AI food recognition, photo upload flow, manual fallback |

### Pinterest Design References

| Pin / Designer | Key Elements to Reference |
|----------------|--------------------------|
| **Noot — AI Cal & Macro Track** | Large calorie ring with "X calories left", 3-color macro bars, recently logged list with food thumbnails and macro summaries |
| **Nutrisee** | Large progress arc (1,515 cal / 1,010 left), 3 mini circles for macro breakdown, weekly bar chart |
| **CIPHERSLAB NutritionHub** | Meal logging flow with breakfast/lunch cards, fire icon calorie indicators, side-by-side metric cards |
| **FitBite** | Greeting header, meal entries with fire icons + calorie ranges, weekly progress ring |
| **NutriMate (dark mode)** | Dark charcoal theme with lime green accents, segmented macro tabs (Calories/Protein/Fat/Carbs), calendar date header |
| **Calorie Counter & Diet Tracker Apps** | Clean food search UI, barcode scanner overlay, serving size selection patterns |
| **Meal Planner & Nutrition App UI Kits** | Custom meal builder flows, component food lists, meal total auto-calculation |
| **Food Diary iOS App Designs** | Daily log view with date navigation, meal section cards, food item list items with swipe actions |

---

## Implementation Notes

1. **Shared State Management:** The Daily Log View, Macro Overview, and Micronutrient screens all read from the same daily nutrition state. A single store (e.g., `dailyLog` with date as key) should drive all views reactively.

2. **Open Food Facts API Integration:** Cache search results locally (keyed by query string) to reduce API calls. The API returns large result sets — paginate client-side at 20 items per page. Handle rate limiting gracefully.

3. **Real-Time Macro Updates:** When a food is logged, all macro bars, donut charts, and per-meal totals must update immediately. Use a reactive state layer (Redux/Zustand/Riverpod) with derived/computed values for totals.

4. **Offline Support:** Queue food logs when offline. Show a subtle "Offline — changes will sync when connected" indicator. On reconnect, sync queued logs and refresh totals from server.

5. **Personal Food Database:** User-created custom foods (from manual entry) should be saved to a local/remote database and indexed for future searches. These appear alongside API results in food search.

6. **Custom Meal Data Model:** A custom meal is a named collection of `{foodId, quantity, servingSize}` tuples. When logged, each component food is logged individually — the meal is a convenience wrapper, not a distinct data type.

7. **Favorites Cap (3 Free):** Track favorite count client-side. On the 4th favorite attempt, trigger the Premium paywall. Display remaining favorite slots: "2 of 3 favorites used."

8. **Custom Meals Cap (1 Free):** Track custom meal count. On 2nd creation attempt, trigger the Premium paywall. Display: "1 of 1 free custom meal created."

9. **Undo Logging:** After a food is logged, show a 5-second undo snackbar. The undo removes the item from the daily log and recalculates macros. Simple state stack: push log action, pop on undo.

10. **Date Navigation Performance:** Preload adjacent days' data (±1 day from current) to enable smooth swipe transitions. Load further dates on demand.

11. **Calendar Picker:** Use a bottom sheet calendar component. Mark dates with logged foods (subtle dot indicator). Today is highlighted. Future dates are tappable but won't have data.

12. **Barcode Scanner:** Use the device camera with a barcode detection library (e.g., `react-native-camera` with barcode mode, or ML Kit Barcode Scanning). The scanner overlay should show a semi-transparent frame with alignment guides.

13. **AI Photo Integration:** The AI calorie estimation is an async process (2-5 seconds). Show a shimmer/skeleton on the photo placeholder during analysis. If the AI returns low confidence (<60%), show a warning: "Low confidence estimate — please verify."

14. **Custom Meal Edit vs. Log:** Editing a custom meal changes the template for future use. Past logs using that meal are NOT retroactively updated. Make this clear in the UI: "Editing this meal won't change past logs."

15. **Macro Bar Color Consistency:** Protein=green, Carbs=orange, Fat=blue — use these same colors consistently across ALL screens (Daily Log View, Macro Overview, Assign Food modal, Search results).

16. **Meal Collapse State Persistence:** Remember which meal sections the user has collapsed/expanded. Persist to local storage and restore on next visit.

17. **Accessibility — VoiceOver Order on Daily Log:** Date nav → Macro Overview card → Breakfast section (header + items + add button) → Lunch section → Dinner section → Snacks section → Quick Actions → FAB. Each food item should announce: "[Food name], [calories] calories, [serving info]."

18. **Dark Mode:** All screens should have dark mode equivalents. In dark mode, macro bar tracks darken to `#374151`, meal slot backgrounds shift to `#1E293B`, card backgrounds to `#1E293B`, page to `#0F172A`. Macro bar fill colors remain the same for consistency.
