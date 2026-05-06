# UI Implementation Prompt: Log Book (Strivio)

## Context

The Log Book is the **daily nutrition tracking hub** of the Strivio fitness & nutrition coaching app. It is one of the four main app pages: **Home, Logbook, Coach, More**.

The Log Book allows users to:

- View daily food logs
- Track calories and macros
- Add food through search, barcode, manual entry, or AI photo estimation
- Assign food to meals
- Review daily nutrients
- Copy previous day meals
- Manage recent foods, favourites, and custom meals

**Role in the app:** The Log Book is where users manage their food and nutrition data. It is focused on daily actions and daily review, not long-term trend analysis. Long-term trend analysis, such as the 7-day nutrition chart, belongs in **Coach → Nutrition tab**. The Log Book can include a shortcut to that section, but the chart itself should not live inside the Log Book.

**Key differentiator:** The Log Book combines a simple daily nutrition dashboard with fast food logging. It supports several food entry paths — search, barcode scanner, manual entry, AI photo estimation, recent foods, favourites, and custom meals — but all paths should converge into one consistent final logging flow: **choose meal → set quantity → confirm**.

**Product principle:** The Log Book should feel fast, simple, and useful. The user's most common action is adding food, so the **Add Food CTA** must be immediately visible and easy to access.

---

## Platform

- **Type:** Mobile App (iOS & Android)
- **Recommended Framework:** React Native with native UI components, or Flutter
- **Orientation:** Portrait only
- **Status Bar:** Dark status bar with dark text on white/light background
- **Navigation:** Bottom tab navigation
- **Primary App Tabs:** Home, Logbook, Coach, More

---

## Screen Dimensions

- **Mobile Standard:** 375px width x 812px height
- **Safe Area:** Account for notch (44px top) and home indicator (34px bottom)
- **Scrollable:** Yes — main Log Book view and detail screens should support vertical scrolling
- **Bottom Navigation:** Fixed at bottom
- **Bottom Sheets:** Use for lightweight actions such as calendar picker, quantity edit, meal selector, and serving size selector

---

## Visual Design Direction

- **Style:** Clean, modern, card-based mobile UI consistent with the Strivio Home, Coach, and Workout screens
- **Primary Color Scheme:** White background with **periwinkle/purple-blue** accents (`#7F7CF0`)
- **Aesthetic:** Friendly, focused, and calm. Nutrition tracking should feel easy, not overwhelming
- **Layout Direction:** Daily dashboard first, fast food logging second, deeper nutrition detail third
- **Card Design:** White cards with subtle shadows, generous padding, and 20px border radius
- **Data Density:** Avoid spreadsheet-like layouts. Use grouped cards, short labels, progress bars, and clear hierarchy
- **Premium Treatment:** Use subtle amber/gold badges and locked previews. Do not make the interface feel aggressive or sales-heavy

---

## Shared Design Tokens

Consistent with Home, Logbook, Coach, Workout, Onboarding, and Auth screens.

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary Purple-Blue | `#7F7CF0` | Buttons, selected states, active icons, tab indicators, primary progress fills |
| Primary Purple-Blue Light | `#9794F3` | Pressed states, secondary highlights |
| Primary Purple-Blue Muted | `#F1F0FF` | Soft selected backgrounds, inactive feature preview backgrounds |
| Background | `#FFFFFF` | Primary page background |
| Background Alt | `#F5F6FA` | Secondary page background |
| Surface White | `#FFFFFF` | Card backgrounds |
| Surface Variant | `#F8F8F8` | Alternative card backgrounds, input backgrounds |
| Text Primary | `#0F172A` | Main text, food names, metric values |
| Text Secondary | `#525252` | Captions, helper text, descriptions |
| Text Tertiary | `#64748B` | Less prominent labels, secondary metadata |
| Text Muted | `#9CA3AF` | Placeholders, disabled text |
| Premium Gold | `#F59E0B` | Premium badge, lock icon, paywall accent |
| Premium Gold Light | `#FEF3C7` | Premium badge background |
| Premium Gold Dark | `#92400E` | Premium badge text |
| Success Green | `#10B981` | Good progress, within target, confirmed action |
| Warning Amber | `#F59E0B` | Under target, warning, needs attention |
| Error Red | `#EF4444` | Over target, error, exceeded macro |
| Calories Orange | `#FB923C` | Calories progress |
| Protein Blue | `#3B82F6` | Protein progress |
| Carbs Purple | `#8B5CF6` | Carbs progress |
| Fat Yellow | `#FBBF24` | Fat progress |
| Divider | `#E5E7EB` | Card borders, list dividers |
| Border Card | `#F4F4F4` | Card border |
| Shadow | `rgba(127, 124, 240, 0.06)` | Periwinkle-tinted card shadow |
| Overlay | `rgba(15, 23, 42, 0.32)` | Bottom sheet/modal dim background |

---

### Typography

| Element | Font Size | Font Weight | Line Height | Font Family | Usage |
|---------|-----------|-------------|-------------|-------------|-------|
| Screen Title | 24px | 600 (SemiBold) | 30px | Outfit | "Log Book" header |
| Section Title | 16px | 600 (SemiBold) | 22px | Outfit | Main card titles |
| Card Title | 15px | 600 (SemiBold) | 20px | Outfit | Meal names, food names |
| Body Text | 14px | 400 (Regular) | 20px | Inter | Descriptions, labels |
| Body Text Bold | 14px | 600 (SemiBold) | 20px | Inter | Emphasized labels |
| Large Number | 32px | 700 (Bold) | 40px | Outfit | Calories remaining, main metric |
| Metric Value | 17px | 600 (SemiBold) | 24px | Outfit | Macro values, calories, quantity |
| Caption | 12px | 400 (Regular) | 16px | Inter | Units, metadata, helper text |
| Button Text | 16px | 600 (SemiBold) | 20px | Inter | CTA buttons |
| Chip Text | 13px | 500 (Medium) | 18px | Inter | Meal chips, category chips |
| Badge Text | 11px | 600 (SemiBold) | 14px | Inter | Premium badge, status badge |

**Font Stack:** Outfit for headings and display metrics, Inter for body text, SF Pro as iOS fallback, Roboto as Android fallback.

---

### Spacing System

| Application | Value |
|-------------|-------|
| Screen horizontal padding | 24px |
| Screen top padding | 42px |
| Card gap | 14px |
| Card internal padding | 16px 20px |
| Card corner radius | 20px |
| Section gap | 20px |
| Icon-to-text gap | 8px |
| Element-to-element gap | 12px |
| Chart margin | 16px |
| Bottom safe-area padding | 28px + home indicator |
| Bottom sheet horizontal padding | 24px |
| Bottom sheet top radius | 24px |
| Food row vertical padding | 14px |
| Input height | 48px |
| Primary CTA height | 52px |

---

## Component Specifications

### Card Container

- **Background:** `#FFFFFF`
- **Border Radius:** 20px
- **Padding:** 16px 20px
- **Shadow:** `0 8px 32px rgba(15, 23, 42, 0.06)`
- **Border:** `1px solid #F4F4F4`

---

### Primary Button

- **Height:** 52px
- **Width:** 100%
- **Background:** `#7F7CF0`
- **Text:** White, 16px SemiBold (Inter), centered
- **Border Radius:** 9999px
- **Active State:** `#9794F3` background + scale `0.98`
- **Disabled State:** `#F1F0FF` background, `#64748B` text

---

### Secondary Button

- **Height:** 44px
- **Padding:** 0 20px
- **Background:** `#F1F0FF`
- **Text:** `#7F7CF0`, 14px Medium (Inter)
- **Border Radius:** 9999px
- **Active State:** Opacity `0.85`

---

### Text Button

- **Background:** Transparent
- **Text:** `#7F7CF0`, 14px Medium (Inter)
- **Icon:** Optional arrow-right or plus icon
- **Use Case:** "View Full Log", "View 7-Day Nutrition", "Add item"

---

### Add Food CTA

- **Position:** Floating above bottom navigation or sticky near bottom of main Log Book screen
- **Label:** `+ Add Food`
- **Height:** 52px
- **Width:** Full width inside screen padding, or floating pill button
- **Background:** `#7F7CF0`
- **Text:** White, 16px SemiBold
- **Icon:** Plus icon, 20px
- **Border Radius:** 9999px
- **Shadow:** `0 10px 24px rgba(127, 124, 240, 0.28)`
- **Requirement:** Must be immediately visible on the main Logbook screen

---

### Date Selector

- **Container:** Horizontal row below screen title
- **Content:** Previous day chevron, selected date label, next day chevron, calendar icon
- **Selected Date Example:** `Today, May 5`
- **Text:** 14px SemiBold, `#0F172A`
- **Interaction:** Tap date or calendar icon to open calendar bottom sheet
- **Gesture:** Swipe left/right on main content to change date

---

### Daily Macro Overview Card

- **Purpose:** Show high-level daily intake versus target
- **Layout:** Big remaining calories at top, macro progress bars below
- **Metrics:** Calories, Protein, Carbs, Fat
- **Progress Bar Height:** 8px
- **Progress Bar Radius:** 9999px
- **Track Color:** `#E5E7EB`
- **Fill Colors:** Calories orange, Protein blue, Carbs purple, Fat yellow
- **Status Color:** Green when close to target, amber when under, red when exceeded

---

### Meal Summary Card

- **Purpose:** Show per-meal macro summary
- **Meal Slots:** Breakfast, Lunch, Dinner, Snacks
- **Each Meal Row Contains:**
  - Meal icon
  - Meal name
  - Food item count
  - Calories
  - Protein, carbs, fat mini text
  - Chevron or add shortcut
- **Premium Behavior:** Inline quantity edit is Premium only
- **Free Behavior:** User can view meal details but cannot edit quantity directly from summary

---

### Food Item Row

- **Height:** Flexible, minimum 64px
- **Left:** Food name and serving size
- **Right:** Calories and more/edit icon
- **Metadata:** Protein, carbs, fat in caption text
- **Swipe Actions:** Delete, duplicate, edit quantity
- **Tap Action:** Opens food detail or edit quantity state

---

### Search Bar

- **Height:** 48px
- **Background:** `#F5F6FA`
- **Border Radius:** 14px
- **Placeholder:** `Search food...`
- **Placeholder Color:** `#9CA3AF`
- **Left Icon:** Search icon
- **Right Icon:** Barcode scanner icon
- **Input Debounce:** 300ms for food API search

---

### Food Result Row

- **Height:** Minimum 72px
- **Left:** Food name, brand, serving size
- **Right:** Calories per serving and favorite icon
- **Tap Action:** Opens Food Detail Preview
- **Data Display:** Food name, brand, calories per serving, serving size

---

### Meal Selector Chips

- **Options:** Breakfast, Lunch, Dinner, Snacks
- **Height:** 36px
- **Padding:** 0 16px
- **Active Background:** `#7F7CF0`
- **Active Text:** White
- **Inactive Background:** White
- **Inactive Border:** `1px solid #E5E7EB`
- **Inactive Text:** `#64748B`
- **Border Radius:** 9999px

---

### Quantity Selector

- **Control:** Minus button, numeric value, plus button
- **Value Example:** `1.0`
- **Unit Selector:** Serving, gram, ounce, cup, tablespoon, piece
- **Behavior:** Nutrition preview updates in real time when quantity changes

---

### Premium Badge

- **Icon:** Lock icon, 14px
- **Background:** `#FEF3C7`
- **Text:** `Premium`, 11px SemiBold, `#92400E`
- **Icon Color:** `#F59E0B`
- **Border Radius:** 6px
- **Use Case:** Barcode, full nutrient breakdown, inline edit, unlimited favourites, unlimited custom meals

---

### Toast / Snackbar

- **Position:** Above bottom navigation
- **Background:** `#0F172A`
- **Text:** White, 14px Medium
- **Radius:** 14px
- **Action:** Optional Undo text button in `#F1F0FF`
- **Duration:** 3-5 seconds
- **Example:** `Added to Lunch` + `Undo`

---

## Screen-by-Screen Specifications

---

### Screen 1: Logbook — Daily View / Filled State

**Purpose:** Main landing screen of the Log Book. Shows the selected date, daily macro overview, logged meals, nutrient shortcut, Coach nutrition shortcut, and Add Food CTA.

#### Layout

```text
┌─────────────────────────────────────────┐
│ [Status Bar]                            │
├─────────────────────────────────────────┤
│ Log Book                                │
│ Today, May 5              [Calendar]    │
│                                         │
│ ┌─── Daily Macro Overview ───────────┐  │
│ │ 350 kcal remaining                 │  │
│ │                                     │  │
│ │ Calories  1850 / 2200              │  │
│ │ ████████████░░░░                   │  │
│ │                                     │  │
│ │ Protein   85 / 120g                │  │
│ │ ████████░░░░░░░                    │  │
│ │                                     │  │
│ │ Carbs     160 / 220g               │  │
│ │ ████████░░░░░░░                    │  │
│ │                                     │  │
│ │ Fat       55 / 65g                 │  │
│ │ ████████████░░░                    │  │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Copy Previous Day]                     │
│                                         │
│ ┌─── Meals ──────────────────────────┐  │
│ │ Breakfast                          │  │
│ │ 420 kcal • P 28g • C 42g • F 12g  │  │
│ │                                     │  │
│ │ Lunch                              │  │
│ │ 650 kcal • P 35g • C 70g • F 18g  │  │
│ │                                     │  │
│ │ Dinner                             │  │
│ │ 580 kcal • P 22g • C 38g • F 20g  │  │
│ │                                     │  │
│ │ Snacks                             │  │
│ │ 200 kcal • P 8g • C 10g • F 5g    │  │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─── Daily Nutrients ────────────────┐  │
│ │ See all daily nutrients      🔒     │  │
│ │ Unlock detailed nutrient tracking  │  │
│ └─────────────────────────────────────┘ │
│                                         │
│ [View 7-Day Nutrition in Coach →]       │
│                                         │
│ [+ Add Food]                            │
│                                         │
│ [Home] [Logbook] [Coach] [More]         │
└─────────────────────────────────────────┘
```

#### States

**State A: Free User**
- Daily macro overview visible
- Meal summary visible
- Copy previous day available
- Daily nutrients shows locked preview
- Add Food CTA available

**State B: Premium User**
- Daily macro overview visible
- Meal summary visible
- Inline edit indicators available on meal rows
- Daily nutrients opens full breakdown
- Add Food CTA available

#### Interactions

- Swipe left/right to change dates
- Tap calendar to open date picker
- Tap meal row to open meal detail
- Tap Copy Previous Day to open review screen
- Tap Daily Nutrients to open locked preview or full breakdown
- Tap Add Food to open food search
- Tap Coach shortcut to navigate to Coach → Nutrition tab

---

### Screen 2: Logbook — Empty State

**Purpose:** Displayed when no foods are logged for the selected date.

#### Layout

```text
┌─────────────────────────────────────────┐
│ Log Book                                │
│ Today, May 5              [Calendar]    │
│                                         │
│              [Empty Icon]               │
│                                         │
│        No foods logged yet              │
│  Start tracking your meals to see       │
│  your calories and macros for today.    │
│                                         │
│              [+ Add Food]               │
│                                         │
│          [Copy Previous Day]            │
│                                         │
│ [Home] [Logbook] [Coach] [More]         │
└─────────────────────────────────────────┘
```

#### Notes

- If yesterday has no log, disable Copy Previous Day or show `No meals logged yesterday`.
- Keep this screen very clean.
- The primary CTA must be Add Food.

---

### Screen 3: Calendar Picker Bottom Sheet

**Purpose:** Allows user to jump to a specific date.

#### Layout

```text
┌─────────────────────────────────────────┐
│                 Overlay                 │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Select Date                         │ │
│ │                                     │ │
│ │ < May 2026 >                        │ │
│ │                                     │ │
│ │ Mon Tue Wed Thu Fri Sat Sun         │ │
│ │  1   2   3   4   5   6   7          │ │
│ │  8   9  10  11  12  13  14          │ │
│ │ ...                                 │ │
│ │                                     │ │
│ │ [Today]                  [Apply]    │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

#### Interactions

- Tap a date to select
- Tap Apply to update the Daily Log View
- Tap Today to jump to current date
- Swipe down or tap overlay to close

---

### Screen 4: Copy Previous Day Review

**Purpose:** Allows users to review yesterday's food log before applying it to today.

#### Layout

```text
┌─────────────────────────────────────────┐
│ Copy Previous Day                       │
│                                         │
│ Review meals from yesterday before      │
│ adding them to today.                   │
│                                         │
│ Breakfast                               │
│ ┌─────────────────────────────────────┐ │
│ │ Greek Yogurt       1 serving   [−]  │ │
│ │ Banana             1 piece     [−]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Lunch                                   │
│ ┌─────────────────────────────────────┐ │
│ │ Chicken Rice Bowl  1 serving   [−]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Dinner                                  │
│ ┌─────────────────────────────────────┐ │
│ │ Salmon Salad       1 serving   [−]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Cancel]               [Apply to Today] │
└─────────────────────────────────────────┘
```

#### Interactions

- Adjust quantities
- Remove individual food items
- Tap Apply to Today to copy the adjusted log
- Show success toast: `Copied to today`
- This is a free feature

---

### Screen 5: Meal Detail Screen

**Purpose:** Shows all food items inside one meal slot.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Breakfast                             │
│                                         │
│ 420 kcal                                │
│ Protein 28g • Carbs 42g • Fat 12g      │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Greek Yogurt                        │ │
│ │ 1 serving • 150 kcal                │ │
│ │ P 12g • C 8g • F 4g            ⋯   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Banana                              │ │
│ │ 1 piece • 105 kcal                  │ │
│ │ P 1g • C 27g • F 0g            ⋯   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [+ Add Food to Breakfast]               │
└─────────────────────────────────────────┘
```

#### States

**Free User**
- Can view meal detail
- Can delete or add foods
- Inline quantity editing is locked or routed to paywall

**Premium User**
- Can tap quantity and edit directly
- Can adjust quantity from the meal summary/detail view

---

### Screen 6: Edit Quantity Bottom Sheet

**Purpose:** Allows Premium users to quickly edit a logged food quantity.

#### Layout

```text
┌─────────────────────────────────────────┐
│                 Overlay                 │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Edit Quantity                       │ │
│ │                                     │ │
│ │ Greek Yogurt                        │ │
│ │                                     │ │
│ │ Quantity                            │ │
│ │ [-]        1.0        [+]           │ │
│ │                                     │ │
│ │ Serving Size                        │ │
│ │ [1 serving                   v]     │ │
│ │                                     │ │
│ │ Updated Calories                    │ │
│ │ 150 kcal                            │ │
│ │                                     │ │
│ │ [Save Changes]                      │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

#### Notes

- For free users, tapping edit opens premium upsell.
- Use this as a bottom sheet, not a full screen.
- Nutrition preview updates immediately when quantity changes.

---

### Screen 7: Add Food Search Home

**Purpose:** Main entry point for adding food.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Add Food                              │
│                                         │
│ [Search food...                  scan] │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Scan Barcode                 🔒     │ │
│ │ Instant nutrition data              │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Manual Entry                        │ │
│ │ Add custom food manually            │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ AI Photo Estimate                   │ │
│ │ Upload a photo to estimate calories │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Recent Foods                            │
│ [Chicken Rice] [Banana] [Greek Yogurt]  │
│                                         │
│ Favourites                              │
│ [Oatmeal] [Protein Shake] [Eggs]        │
└─────────────────────────────────────────┘
```

#### Interactions

- Typing in search bar starts food search
- Tap barcode opens scanner or premium paywall
- Tap Manual Entry opens custom food form
- Tap AI Photo opens photo upload flow
- Tap recent/favourite food opens Food Detail Preview

---

### Screen 8: Food Search Results

**Purpose:** Shows Open Food Facts search results.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Add Food                              │
│                                         │
│ [chicken rice                    scan] │
│                                         │
│ Results                                 │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Chicken Rice Bowl              ☆    │ │
│ │ Brand name                          │ │
│ │ 420 kcal • 1 serving                │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Grilled Chicken Breast         ☆    │ │
│ │ Brand name                          │ │
│ │ 165 kcal • 100g                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Brown Rice                     ☆    │ │
│ │ Brand name                          │ │
│ │ 216 kcal • 1 cup                    │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

#### States

**Loading State**
- Show skeleton rows while API results load

**No Results State**
- Message: `No foods found`
- CTA: `Create custom food`

**API Unavailable State**
- Message: `Search unavailable — enter manually`
- CTA: `Manual Entry`

---

### Screen 9: Food Detail Preview

**Purpose:** Previews selected food before the user logs it.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Food Detail                           │
│                                         │
│ Chicken Rice Bowl                       │
│ Brand name                              │
│                                         │
│ 420 kcal                                │
│ Per 1 serving                           │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Protein                        32g  │ │
│ │ Carbs                          48g  │ │
│ │ Fat                            12g  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Serving Size                            │
│ [1 serving                      v]      │
│                                         │
│ [Log This Food]                         │
│ [Save to Favourites]                    │
└─────────────────────────────────────────┘
```

#### Premium Logic

- Free users can favourite up to 3 foods.
- Attempting to favourite a 4th food opens paywall.
- Premium users have unlimited favourites.

---

### Screen 10: Log Food to Meal

**Purpose:** Final step before adding food to the daily log.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Log Food                              │
│                                         │
│ Chicken Rice Bowl                       │
│                                         │
│ Choose Meal                             │
│ [Breakfast] [Lunch] [Dinner] [Snacks]   │
│                                         │
│ Quantity                                │
│ [-]        1.0        [+]               │
│                                         │
│ Serving Size                            │
│ [1 serving                      v]      │
│                                         │
│ Nutrition Preview                       │
│ 420 kcal                                │
│ P 32g • C 48g • F 12g                  │
│                                         │
│ [Add to Log]                            │
└─────────────────────────────────────────┘
```

#### Interactions

- Meal defaults based on time of day
- Quantity changes update nutrition preview in real time
- Tap Add to Log confirms entry
- Show toast: `Added to Lunch` + `Undo`
- Daily macro totals update instantly

---

### Screen 11: Manual Food Entry

**Purpose:** Allows users to create a custom food manually.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Manual Food Entry                     │
│                                         │
│ Food Name                               │
│ [Input]                                 │
│                                         │
│ Serving Size                            │
│ [Input]                                 │
│                                         │
│ Calories                                │
│ [Input]                                 │
│                                         │
│ Protein                                 │
│ [Input]                                 │
│                                         │
│ Carbs                                   │
│ [Input]                                 │
│                                         │
│ Fat                                     │
│ [Input]                                 │
│                                         │
│ [Optional Nutrients         v]          │
│                                         │
│ [Save Food]                             │
└─────────────────────────────────────────┘
```

#### Notes

- Manual entry is free.
- Saved custom foods appear in Recent Foods and search results.
- Optional nutrients should stay collapsed by default.

---

### Screen 12: Optional Nutrients Expanded

**Purpose:** Allows users to add optional micronutrient data for custom foods.

#### Layout

```text
┌─────────────────────────────────────────┐
│ Optional Nutrients                      │
│                                         │
│ Fiber                                   │
│ [Input]                                 │
│                                         │
│ Sugar                                   │
│ [Input]                                 │
│                                         │
│ Saturated Fat                           │
│ [Input]                                 │
│                                         │
│ Sodium                                  │
│ [Input]                                 │
│                                         │
│ Vitamin A                               │
│ [Input]                                 │
│                                         │
│ Vitamin C                               │
│ [Input]                                 │
│                                         │
│ Calcium                                 │
│ [Input]                                 │
│                                         │
│ Iron                                    │
│ [Input]                                 │
│                                         │
│ [Save Food]                             │
└─────────────────────────────────────────┘
```

#### Notes

- These fields are optional.
- Do not block save if micronutrient fields are empty.
- Use clear units and helper text when needed.

---

### Screen 13: Daily Nutrients Locked Preview

**Purpose:** Premium upsell for detailed nutrient tracking.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Daily Nutrients                       │
│                                         │
│ Unlock detailed nutrient tracking       │
│ See vitamins, minerals, fiber, sugar,   │
│ saturated fat, and RDV progress.        │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Vitamin C                  65% RDV  │ │
│ │ Iron                       42% RDV  │ │
│ │ Fiber                      50% RDV  │ │
│ │ Sodium                     80% RDV  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Blurred nutrient preview rows]         │
│                                         │
│ [Unlock Premium]                        │
└─────────────────────────────────────────┘
```

#### Notes

- Use soft blur or faded locked rows.
- Upsell copy: `Unlock detailed nutrient tracking`.
- Show enough preview to explain the value.

---

### Screen 14: Daily Nutrients Full Breakdown

**Purpose:** Premium screen showing full micronutrient breakdown versus RDV.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Daily Nutrients                       │
│                                         │
│ Sort by: Lowest RDV first         [v]   │
│                                         │
│ Vitamins                                │
│ Vitamin C        ███████░░░ 65% RDV     │
│ Vitamin A        ████████░░ 80% RDV     │
│ Vitamin D        ███░░░░░░░ 30% RDV     │
│                                         │
│ Minerals                                │
│ Iron             ████░░░░░░ 42% RDV     │
│ Calcium          ███████░░░ 70% RDV     │
│ Sodium           ██████████ 110% RDV    │
│                                         │
│ Other                                   │
│ Fiber            █████░░░░░ 50% RDV     │
│ Sugar            35g                    │
│ Saturated Fat    12g                    │
└─────────────────────────────────────────┘
```

#### Notes

- Group by category: Vitamins, Minerals, Other.
- Sort by lowest % RDV first by default.
- Color code:
  - Green = met
  - Yellow = partial
  - Red = exceeded or very low

---

## Additional Full-Version Screens

Create these screens if designing the complete Log Book experience beyond MVP.

---

### Screen 15: Barcode Scanner Paywall

**Purpose:** Shown when a free user taps the barcode scanner.

#### Layout

```text
┌─────────────────────────────────────────┐
│ Scan Barcodes Faster                    │
│                                         │
│ [Barcode Illustration]                  │
│                                         │
│ Scan barcodes for instant nutrition     │
│ data and log packaged foods faster.     │
│                                         │
│ [Unlock Premium]                        │
│ [Not Now]                               │
└─────────────────────────────────────────┘
```

---

### Screen 16: Barcode Scanner Camera View

**Purpose:** Allows Premium users to scan product barcodes.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Scan Barcode                          │
│                                         │
│        [Camera View]                    │
│                                         │
│     ┌───────────────────────┐           │
│     │                       │           │
│     │   Scan barcode here   │           │
│     │                       │           │
│     └───────────────────────┘           │
│                                         │
│ Align the barcode inside the frame.     │
│                                         │
│ [Enter Manually Instead]                │
└─────────────────────────────────────────┘
```

---

### Screen 17: Barcode Not Recognized Fallback

**Purpose:** Handles failed barcode recognition and routes user to manual entry.

#### Layout

```text
┌─────────────────────────────────────────┐
│ Barcode Not Found                       │
│                                         │
│ We couldn't find this product in the    │
│ database. You can add it manually.      │
│                                         │
│ [Add Manually]                          │
│ [Try Scanning Again]                    │
└─────────────────────────────────────────┘
```

---

### Screen 18: AI Photo Upload

**Purpose:** Allows user to upload or take a food photo for AI calorie estimation.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← AI Photo Estimate                     │
│                                         │
│ [Photo Upload Area]                     │
│                                         │
│ Take or upload a clear photo of your    │
│ meal. We'll estimate calories and       │
│ macros for you.                         │
│                                         │
│ [Take Photo]                            │
│ [Upload from Gallery]                   │
└─────────────────────────────────────────┘
```

---

### Screen 19: AI Estimation Result

**Purpose:** Shows estimated calories and macros from the uploaded photo.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← AI Estimate Result                    │
│                                         │
│ [Food Photo Preview]                    │
│                                         │
│ Estimated Nutrition                     │
│ 540 kcal                                │
│ Protein 32g • Carbs 58g • Fat 18g      │
│                                         │
│ Confidence: Medium                      │
│                                         │
│ [Edit Details]                          │
│ [Log This Food]                         │
└─────────────────────────────────────────┘
```

#### Notes

- Always allow user to edit AI results.
- AI estimation may be Premium depending on API cost.

---

### Screen 20: Custom Meals List

**Purpose:** Shows saved reusable meals.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← My Meals                              │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Morning Smoothie                    │ │
│ │ 420 kcal • P 28g • C 42g • F 10g   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Post-Workout Bowl                   │ │
│ │ 650 kcal • P 40g • C 72g • F 18g   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [+ Create Custom Meal]                  │
└─────────────────────────────────────────┘
```

---

### Screen 21: Create Custom Meal

**Purpose:** Allows user to name a reusable meal.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Create Custom Meal                    │
│                                         │
│ Meal Name                               │
│ [Morning Smoothie]                      │
│                                         │
│ [Continue]                              │
└─────────────────────────────────────────┘
```

---

### Screen 22: Add Foods to Custom Meal

**Purpose:** Allows user to add component foods to the custom meal.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Add Foods                             │
│                                         │
│ [Search food...]                        │
│                                         │
│ Added Foods                             │
│ - Banana                                │
│ - Greek Yogurt                          │
│ - Protein Powder                        │
│                                         │
│ Running Total                           │
│ 420 kcal • P 28g • C 42g • F 10g       │
│                                         │
│ [Review Meal]                           │
└─────────────────────────────────────────┘
```

---

### Screen 23: Custom Meal Review / Edit

**Purpose:** Final review before saving a custom meal.

#### Layout

```text
┌─────────────────────────────────────────┐
│ ← Review Meal                           │
│                                         │
│ Morning Smoothie                        │
│                                         │
│ Total Nutrition                         │
│ 420 kcal                                │
│ P 28g • C 42g • F 10g                  │
│                                         │
│ Components                              │
│ Banana              1 piece        ⋯    │
│ Greek Yogurt        1 serving      ⋯    │
│ Protein Powder      1 scoop        ⋯    │
│                                         │
│ [+ Add More Food]                       │
│ [Save Custom Meal]                      │
└─────────────────────────────────────────┘
```

---

### Screen 24: Custom Meal Paywall

**Purpose:** Shown when a free user tries to create a second custom meal.

#### Layout

```text
┌─────────────────────────────────────────┐
│ Create Unlimited Custom Meals           │
│                                         │
│ You've used your free custom meal.      │
│ Upgrade to create unlimited reusable    │
│ meals and log faster every day.         │
│                                         │
│ [Unlock Premium]                        │
│ [Not Now]                               │
└─────────────────────────────────────────┘
```

---

## Free vs Premium UI States

| Feature | Free State | Premium State |
|---------|------------|---------------|
| Daily Log View | Available | Available |
| Date Navigation | Available | Available |
| Copy Previous Day Log | Available | Available |
| Daily Meal Summary | View only | View + inline quantity edit |
| Daily Macro Overview | Available | Available |
| Full Micronutrient Breakdown | Locked preview | Full access |
| Quick-add Food Search | Available | Available |
| Barcode Scanner | Paywall | Full scanner access |
| Manual Food Entry | Available | Available |
| AI Photo Calorie Estimation | TBD / possible paywall | TBD / possible full access |
| Save Custom Foods | Available | Available |
| Recent Foods | Available | Available |
| Favourite Foods | Max 3 | Unlimited |
| Custom Meals | Max 1 | Unlimited |
| Assign Food to Meal | Available | Available |
| Quantity and Serving Size | Available | Available |
| Real-time Macro Updates | Available | Available |
| 7-Day Nutrition Chart | Shortcut to Coach | Shortcut to Coach |

---

## Error States & Edge Cases

| Scenario | UI Handling |
|----------|-------------|
| Open Food Facts API unavailable | Show cached results if available; otherwise show manual entry fallback with message `Search unavailable — enter manually` |
| Barcode not recognized | Show fallback screen with Add Manually CTA |
| AI photo analysis fails | Show error message: `Couldn't analyze photo — enter details manually` |
| No foods logged for selected date | Empty state with Add Food CTA |
| Copy previous day with empty log | Disable button or show `No meals logged yesterday` |
| Network failure during logging | Queue the log locally, sync when connection returns, show offline indicator |
| Micronutrient data unavailable | Show `—` or `N/A`; do not block user |
| Favourite limit reached | Show paywall when user tries to favourite the 4th food |
| Custom meal limit reached | Show paywall when user tries to create a second custom meal |
| Invalid manual entry | Highlight missing required fields and show helper text |
| Serving size missing | Use default serving size and allow custom input |
| User accidentally logs food | Show Undo snackbar for 3-5 seconds |

---

## UX Considerations

- **Add Food CTA must be immediately visible.** This is the most frequent user action.
- **Daily Log should feel like a dashboard, not a spreadsheet.** Use cards, short summaries, and clear hierarchy.
- **Meal slots should be easy to scan.** Breakfast, Lunch, Dinner, and Snacks should be clearly separated.
- **Serving size adjustment should be fast.** Use steppers, presets, and custom input.
- **Default meal should be smart.** Morning defaults to Breakfast, midday to Lunch, evening to Dinner.
- **Real-time macro updates should animate.** Use subtle progress bar fills and number transitions.
- **Copy Previous Day must include review.** Do not copy blindly without allowing adjustments.
- **Micronutrient details should be deeper in the flow.** Keep the main dashboard focused on calories and macros.
- **Premium gates should appear at the moment of need.** Example: show favourite paywall only when user tries to save the 4th favourite.
- **Barcode scanner must have a fallback.** If not recognized, route to manual entry.
- **AI results must be editable.** AI calorie estimation should never be treated as final without user control.

---

## Animation & Micro-interactions

1. **Date Swipe:** Smooth horizontal transition between days, 300ms ease-out
2. **Macro Update:** Progress bars animate after food is added
3. **Add Food Success:** Small checkmark animation after successful log
4. **Undo Toast:** Slides up from bottom and stays visible for 3-5 seconds
5. **Meal Card Tap:** Soft scale down on press, then open detail
6. **Bottom Sheet Open:** Slide up from bottom with dimmed overlay
7. **Premium Lock Tap:** Light shake animation, then paywall modal fade in
8. **Search Loading:** Skeleton rows while Open Food Facts results load
9. **Barcode Success:** Haptic feedback and brief success flash
10. **Favourite Tap:** Heart/star bounce animation
11. **Quantity Change:** Nutrition preview number animates smoothly
12. **Copy Success:** Toast message with success checkmark

---

## Recommended MVP Screen Set

If designing only the first prototype, create these 14 core screens first:

| No | Screen |
|----|--------|
| 1 | Logbook — Daily View / Filled State |
| 2 | Logbook — Empty State |
| 3 | Calendar Picker Bottom Sheet |
| 4 | Copy Previous Day Review |
| 5 | Meal Detail Screen |
| 6 | Edit Quantity Bottom Sheet |
| 7 | Add Food Search Home |
| 8 | Food Search Results |
| 9 | Food Detail Preview |
| 10 | Log Food to Meal |
| 11 | Manual Food Entry |
| 12 | Optional Nutrients Expanded |
| 13 | Daily Nutrients Locked Preview |
| 14 | Daily Nutrients Full Breakdown |

---

## Complete Screen Set

For the full product experience, create 24 screens:

| No | Screen |
|----|--------|
| 1 | Logbook — Daily View / Filled State |
| 2 | Logbook — Empty State |
| 3 | Calendar Picker Bottom Sheet |
| 4 | Copy Previous Day Review |
| 5 | Meal Detail Screen |
| 6 | Edit Quantity Bottom Sheet |
| 7 | Add Food Search Home |
| 8 | Food Search Results |
| 9 | Food Detail Preview |
| 10 | Log Food to Meal |
| 11 | Manual Food Entry |
| 12 | Optional Nutrients Expanded |
| 13 | Daily Nutrients Locked Preview |
| 14 | Daily Nutrients Full Breakdown |
| 15 | Barcode Scanner Paywall |
| 16 | Barcode Scanner Camera View |
| 17 | Barcode Not Recognized Fallback |
| 18 | AI Photo Upload |
| 19 | AI Estimation Result |
| 20 | Custom Meals List |
| 21 | Create Custom Meal |
| 22 | Add Foods to Custom Meal |
| 23 | Custom Meal Review / Edit |
| 24 | Custom Meal Paywall |

---

## Related Documents

- `brief.md` — Overall app brief summary
- `log-book-brief.md` — Log Book flow specification
- `ui-prompt-coach.md` — Reference UI prompt format
- `coach-brief.md` — Coach flow specification
- `workout-tab-brief.md` — Workout tab flow
- `onboarding-intake-brief.md` — Onboarding and intake flow
- `brief-analysis.md` — Design analysis and inspiration
