# UI Implementation Prompt: Onboarding & Intake Screens (Strivio)

## Context

This document covers the **Onboarding & Intake flow** — the most critical user journey in Strivio. It begins immediately after account creation/login and guides the user through a structured data-collection experience that powers the app's entire value proposition: personalized workout and nutrition plans.

These screens are where Strivio earns trust. Every question feels intentional, every validation gate feels helpful (not punitive), and the coach selection screen feels personal. The entire flow is designed as a **one-question-per-screen** sequence (Typeform-style), creating a focused, quiz-like experience that feels more like a conversation than a form.

**Screens Covered:**
1. Welcome / Intake Intro Screen
2. Identity & Goals (Q1–Q5)
3. Body Data (Q6–Q10) + Pace Validation
4. Preferences (Q11–Q15) + Frequency Validation
5. Cross-Question Conflict Resolution
6. Coach Selection
7. Plan Generation (Loading → Reveal)
8. Route to Home Transition

---

## Platform
- **Type:** Mobile App (iOS & Android)
- **Recommended Framework:** React Native or Flutter
- **Orientation:** Portrait only
- **Status Bar:** Dark content on light backgrounds; white content on navy sections

---

## Screen Dimensions
- **Mobile Standard:** 375px width (iPhone 13/14) × 812px height
- **Safe Area:** Notch 44px top, home indicator 34px bottom
- **Scrollable:** No — each screen is designed to fit within one viewport. No scrolling required. If content exceeds viewport on small devices, the layout compresses proportionally.

---

## Visual Design Direction

### Design Philosophy
- **One question per screen** — deep focus, no overwhelm. The screen fills with the question, options, and a single large CTA.
- **Progress-driven** — a prominent progress bar at the top shows "X of 15" to give users a sense of momentum.
- **Conversational tone** — questions read like a coach speaking to you, not a medical form.
- **Encouraging transitions** — micro-copy between questions ("Great!", "Almost there!") keeps engagement high.
- **Validation as guidance** — when something is unrealistic or conflicting, the UI feels like a helpful coach gently redirecting, not a system error.

### Overall Layout Pattern (All Intake Screens)

```
┌─────────────────────────────────────────┐
│  ████████████████████████████████████   │  ← Progress bar (navy fill)
│  ████████████████░░░░░░░░░░░░░░░░░░░   │
│  Question X of 15                       │  ← Progress text
├─────────────────────────────────────────┤
│                                         │
│  [Optional: illustration / icon area]   │  ← ~25% of screen
│         (varies per question)           │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Question Title                   │  │  ← 20-24px SemiBold
│  │                                   │  │
│  │  Supporting context/help text     │  │  ← 14px Regular (optional)
│  │  explaining why we ask.           │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Option A                   │  │  │  ← Selectable card/button
│  │  │  (description if needed)    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Option B                   │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Option C                   │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │       [  Continue  ]              │  │  ← Primary CTA (full-width)
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Primary Navy** | `#1A2B4A` | Progress bar, primary buttons, selected states |
| **Primary Navy Light** | `#2D4470` | Hover/active states |
| **Primary Navy Muted** | `#E8EDF5` | Option cards (unselected), light backgrounds |
| **Accent Green** | `#10B981` | Validation success, checkmarks, positive feedback |
| **Accent Amber** | `#F59E0B` | Warning states (unrealistic pace) |
| **Accent Red** | `#EF4444` | Error/conflict states |
| **Background** | `#FFFFFF` | Screen background |
| **Background Alt** | `#F5F6FA` | Alternate backgrounds, coach cards |
| **Surface** | `#FFFFFF` | Option cards, coach cards |
| **Text Primary** | `#1A1D26` | Question titles, main text |
| **Text Secondary** | `#6B7280` | Option descriptions, helper text |
| **Text Muted** | `#9CA3AF` | Placeholder, subtle labels |
| **Divider** | `#E5E7EB` | Card borders, separators |
| **Shadow** | `rgba(26, 43, 74, 0.06)` | Card shadows |

---

## Typography

| Element | Font Size | Font Weight | Line Height | Usage |
|---------|-----------|-------------|-------------|-------|
| **Progress Label** | 12px | 500 (Medium) | 16px | "Question X of 15" |
| **Question Title** | 22px | 600 (SemiBold) | 30px | Main question text |
| **Question Body** | 14px | 400 (Regular) | 20px | Helper text, "why we ask" |
| **Option Label** | 16px | 500 (Medium) | 24px | Primary option text |
| **Option Description** | 13px | 400 (Regular) | 18px | Supporting detail under option |
| **Button Text** | 16px | 600 (SemiBold) | 24px | CTA button labels |
| **Coach Name** | 18px | 600 (SemiBold) | 26px | Coach persona name |
| **Coach Bio** | 13px | 400 (Regular) | 18px | Coach description |
| **Plan Title** | 28px | 700 (Bold) | 36px | Plan reveal headline |
| **Metric Value** | 20px | 700 (Bold) | 28px | Calorie/macro targets |

**Font Family:** Inter (primary), SF Pro (iOS fallback), Roboto (Android fallback)

---

## Spacing System

- **Base Unit:** 8px scale
- **Values:** 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px

| Application | Value |
|-------------|-------|
| Progress bar height | 6px |
| Progress bar bottom margin | 24px |
| Question title bottom margin | 12px |
| Option card padding | 16px |
| Option card gap | 12px |
| Option card border radius | 12px |
| CTA button height | 52px |
| CTA button bottom margin | 24px (above home indicator safe area) |
| Screen horizontal padding | 24px |
| Screen top padding | 16px (below progress bar) |

---

## Component Specifications

### Progress Bar

| Property | Value |
|----------|-------|
| **Height** | 6px |
| **Track Color** | `#E8EDF5` |
| **Fill Color** | `#1A2B4A` (Navy) |
| **Border Radius** | 3px (pill) |
| **Animation** | Smooth fill transition 300ms ease-out |
| **Position** | Fixed at top of screen, below status bar |

**Visual:** Full-width bar at the very top. The filled portion grows left-to-right as the user progresses. Below the bar, left-aligned: "Question X of 15" in 12px Medium gray text.

### Option Card (Single-Select / Multi-Select)

| Property | Value |
|----------|-------|
| **Min Height** | 52px |
| **Padding** | 16px horizontal, 14px vertical |
| **Background** | Unselected: `#FFFFFF` with `#E5E7EB` border; Selected: `#E8EDF5` with `#1A2B4A` border (2px) |
| **Border Radius** | 12px |
| **Selected Indicator** | Navy circle with white checkmark (20px, right-aligned) |
| **Text (Label)** | 16px Medium, `#1A1D26` |
| **Text (Description)** | 13px Regular, `#6B7280` |
| **Shadow** | None (flat) |
| **Active Press** | Scale 0.98, background `#2D4470` at 10% opacity |

### Slider Control (Weight Pace / Frequency)

| Property | Value |
|----------|-------|
| **Track Height** | 6px |
| **Track Color** | `#E8EDF5` |
| **Track Fill** | `#1A2B4A` |
| **Thumb** | 24px circle, Navy background, white border (3px), shadow |
| **Step Markers** | Small ticks at each step value |
| **Step Labels** | 13px Regular, `#6B7280`, below ticks |
| **Min Touch Target** | Full-width gesture area (48px height) |
| **Animation** | Thumb slides smoothly, 150ms ease |

### Numeric Input Field

| Property | Value |
|----------|-------|
| **Height** | 56px |
| **Width** | Auto (centers or fills available width) |
| **Padding** | 0 20px |
| **Background** | `#FFFFFF` |
| **Border** | 2px solid `#E5E7EB` (default), `#1A2B4A` (focus) |
| **Border Radius** | 12px |
| **Text** | 24px Bold, `#1A2B4A`, centered |
| **Unit Label** | "cm" or "kg" suffix, 16px Regular, `#9CA3AF`, right-aligned inside field |
| **Keyboard** | Numeric/decimal pad |

### Primary CTA Button

| Property | Value |
|----------|-------|
| **Height** | 52px |
| **Background** | `#1A2B4A` (Navy) |
| **Text** | White, 16px SemiBold |
| **Border Radius** | 14px |
| **Disabled** | `#E8EDF5` background, `#9CA3AF` text |
| **Active Press** | `#2D4470` |
| **Loading State** | Spinner replaces text, same dimensions |
| **Position** | Fixed to bottom of content area (above safe area) |

### Validation Banner

| Property | Value |
|----------|-------|
| **Background** | Warning: `#FEF3C7` (amber light); Error: `#FEE2E2` (red light); Success: `#D1FAE5` (green light) |
| **Text** | Warning: `#92400E`; Error: `#991B1B`; Success: `#065F46` |
| **Padding** | 12px 16px |
| **Border Radius** | 10px |
| **Icon** | 20px icon (warning triangle, error X, checkmark) — left-aligned |
| **Text Size** | 14px Medium |
| **Position** | Appears inline below the question, or as a modal overlay for conflict resolution |

---

## Interactions & Animations

| Interaction | Behavior | Duration |
|-------------|----------|----------|
| **Screen Transition** | Slide left (new screen enters from right, old exits left) | 300ms ease-out |
| **Option Tap** | Scale 0.98 on press, bounce back to 1.0; selected card fills with navy-muted background | 150ms |
| **Slider Drag** | Thumb follows finger position; value updates in real-time | Real-time |
| **Numeric Input** | Number scales up slightly (1.1x) on change, then settles | 200ms |
| **CTA Enable** | Button fades in from 50% → 100% opacity when selection made | 200ms ease-out |
| **Validation Warning** | Banner slides down from below question | 250ms ease-out |
| **Screen Exit** | Fade out (opacity 1.0 → 0.7) during transition | 150ms |
| **Progress Bar Fill** | Smooth width transition | 300ms ease-out |

---

## Screen-by-Screen Specifications

---

### Screen 1: Welcome / Intake Intro

**Purpose:** Set expectations. Let the user know what's coming, why it matters, and roughly how long it will take.

```
┌─────────────────────────────────────────┐
│                                         │
│           (Friendly illustration)       │
│         Coach + plan themed image       │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Let's Build Your                 │  │
│  │  Personalized Plan                │  │
│  │                                   │  │
│  │  We'll ask a few questions about  │  │
│  │  your goals, body, and            │  │
│  │  preferences. Based on your       │  │
│  │  answers, we'll create a custom   │  │
│  │  workout + nutrition plan just    │  │
│  │  for you.                         │  │
│  │                                   │  │
│  │  About 5 minutes · 15 questions   │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Get Started  ]            │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Title** | "Let's Build Your Personalized Plan" — 24px Bold, centered |
| **Description** | 3-4 lines explaining the intake purpose and outcome — 14px Regular, centered |
| **Metadata Line** | "About 5 minutes · 15 questions" — 14px Medium, Navy (`#1A2B4A`), with a small clock icon |
| **Illustration** | Friendly coach avatar or stylized plan/calendar illustration — 200×200px, center-aligned |
| **CTA Button** | "Get Started" — full-width primary button |
| **Progress Bar** | Not visible on this screen (appears starting Q1) |

**Notes:**
- No back button visible — this is the start of a mandatory flow.
- The illustration should feel warm and encouraging, not clinical.
- Consider subtle animation: illustration gently floats or pulses.

---

### Screen 2: Question 1 — Preferred Name

**Purpose:** Collect the user's preferred name for personalization throughout the app (greetings, coach messages, plan references).

```
┌─────────────────────────────────────────┐
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│  Question 1 of 15                       │
├─────────────────────────────────────────┤
│                                         │
│         (Greeting / name icon)          │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  What should we call you?         │  │
│  │                                   │  │
│  │  Your coach will use this name    │  │
│  │  when talking to you.             │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  First name                 │  │  │
│  │  │                             │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Icon** | Chat bubble or name tag icon, 64px, Navy |
| **Title** | "What should we call you?" — 22px SemiBold |
| **Helper text** | "Your coach will use this name when talking to you." — 14px Regular, Secondary text |
| **Input field** | Standard text input, 48px height, 16px font, keyboard: default |
| **Placeholder** | "e.g. Alex" |
| **Validation** | Required, min 2 characters |
| **CTA** | "Continue" — enabled when input has ≥2 characters |

**Notes:**
- Only ask for first name. The app is casual and personal.
- Auto-focus the input field on screen load.
- Keyboard's "Return" key submits.

---

### Screen 3: Question 2 — Primary Goals (Multi-Select)

**Purpose:** Understand the user's main fitness objectives. Limited to max 2 selections to force prioritization.

```
┌─────────────────────────────────────────┐
│  ████████████░░░░░░░░░░░░░░░░░░░░░░░   │
│  Question 2 of 15                       │
├─────────────────────────────────────────┤
│                                         │
│       (Target / goal icon)              │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  What are your primary goals?     │  │
│  │                                   │  │
│  │  Select up to 2                   │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🔥  Lose weight            │☑ │  │  ← Selected
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  💪  Build muscle            │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🏃  Improve endurance       │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🧘  Increase flexibility    │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  ⚡  Get stronger            │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🎯  General fitness         │☑ │  │  ← Selected
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Icon** | Target or goal icon, 64px, Navy |
| **Title** | "What are your primary goals?" — 22px SemiBold |
| **Subtitle** | "Select up to 2" — 14px Medium, Navy accent, right-aligned below title |
| **Options** | 7 selectable cards, each with emoji/icon + label |
| **Selection count** | Counter "X/2" displayed in subtitle |
| **Max selection feedback** | When 2 selected, remaining cards show faded/disabled state with subtle "Max reached" opacity |
| **CTA** | "Continue" — enabled when ≥1 goal selected |

**Goal Options (Full List):**
1. Lose weight
2. Build muscle
3. Improve endurance
4. Increase flexibility
5. Get stronger
6. General fitness
7. Tone up

**Interaction Notes:**
- Tapping a selected card deselects it.
- Tapping a 3rd card when 2 are already selected triggers a gentle shake animation with a toast: "You can select up to 2 goals."
- Cards can wrap to multiple rows as needed.

---

### Screen 4: Question 3 — Motivations (Multi-Select)

**Purpose:** Understand the deeper "why" behind the user's goals. Informs coach messaging and motivational copy.

```
┌─────────────────────────────────────────┐
│  ████████████████░░░░░░░░░░░░░░░░░░░   │
│  Question 3 of 15                       │
├─────────────────────────────────────────┤
│                                         │
│      (Heart / motivation icon)          │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  What motivates you the most?     │  │
│  │                                   │  │
│  │  Select up to 2                   │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🏖   Look better for       │☐ │  │
│  │  │     an event                │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  ❤️  Improve my health       │☑ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🧠  Feel more confident    │☑ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🔋  Have more energy       │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🏆  Challenge myself       │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:** Same pattern as Q2 (multi-select, max 2).

**Motivation Options:**
1. Look better for an event
2. Improve my health
3. Feel more confident
4. Have more energy
5. Challenge myself
6. Manage stress
7. Live longer

---

### Screen 5: Question 4 — Gender

**Purpose:** Used for calorie/nutrition calculations (BMR formulas differ by biological sex).

```
┌─────────────────────────────────────────┐
│  █████████████████████░░░░░░░░░░░░░░   │
│  Question 4 of 15                       │
├─────────────────────────────────────────┤
│                                         │
│     (Person / gender icon)              │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  What is your gender?             │  │
│  │                                   │  │
│  │  This helps calculate your        │  │
│  │  calorie and nutrition needs.     │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Male                       │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Female                     │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Prefer not to say          │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Title** | "What is your gender?" — 22px SemiBold |
| **Helper text** | "This helps calculate your calorie and nutrition needs." — 14px Regular |
| **Options** | 3 single-select cards (full-width) |
| **Selection** | Single-select — tapping one deselects the others |
| **CTA** | "Continue" — enabled when selection made |

**Notes:**
- The "why we ask" helper text is **important** here. Sensitive questions need justification.
- "Prefer not to say" uses a generic calculation (default to male BMR or a neutral average).

---

### Screen 6: Question 5 — Activity Level

**Purpose:** Baseline daily activity for calorie calculations and plan intensity.

```
┌─────────────────────────────────────────┐
│  ████████████████████████░░░░░░░░░░░   │
│  Question 5 of 15                       │
├─────────────────────────────────────────┤
│                                         │
│    (Activity / movement icon)           │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  How would you describe your      │  │
│  │  current activity level?          │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🪑  Sedentary              │☐ │  │
│  │  │  Little or no exercise,     │  │  │
│  │  │  desk job                   │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🚶  Light                  │☑ │  │  ← Selected
│  │  │  Light exercise 1-3 days/wk │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🏃  Moderate               │☐ │  │
│  │  │  Moderate exercise 3-5 days │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🏋️  Active                 │☐ │  │
│  │  │  Hard exercise 6-7 days/wk  │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  ⚡  Very Active            │☐ │  │
│  │  │  Intense daily exercise or  │  │  │
│  │  │  physical job               │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Title** | "How would you describe your current activity level?" — 22px SemiBold |
| **Options** | 5 single-select cards, each with icon + label + description |
| **Description** | Each option includes a brief description in 13px Regular gray text |
| **Selection** | Single-select |
| **CTA** | "Continue" — enabled when selection made |

**Activity Level Options:**
1. **Sedentary** — Little or no exercise, desk job
2. **Light** — Light exercise 1-3 days/week
3. **Moderate** — Moderate exercise 3-5 days/week
4. **Active** — Hard exercise 6-7 days/week
5. **Very Active** — Intense daily exercise or physical job

**Notes:**
- The descriptions are critical. Without them, "moderate" vs "active" is ambiguous.
- This is the last of the "easy" questions. The next section (body data) asks for more personal information.

---

### Screen 7: Question 6 — Age

**Purpose:** Age is used in BMR calculations and plan intensity adjustments.

```
┌─────────────────────────────────────────┐
│  ██████████████████████████░░░░░░░░░   │
│  Question 6 of 15                       │
├─────────────────────────────────────────┤
│                                         │
│        (Calendar / age icon)            │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  How old are you?                 │  │
│  │                                   │  │
│  │  We use this to calculate your    │  │
│  │  daily calorie needs.             │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │        28  years            │  │  │  ← Large number input
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Icon** | Calendar or birthday icon, 64px |
| **Title** | "How old are you?" — 22px SemiBold |
| **Helper text** | "We use this to calculate your daily calorie needs." — 14px Regular |
| **Numeric input** | Large centered input, 32px Bold, Navy text; placeholder "25"; suffix "years" |
| **Keyboard** | Numeric pad only |
| **Validation** | Required, range 14–100 |
| **CTA** | "Continue" — enabled when valid number entered |

**Notes:**
- Auto-focus input on screen load.
- The input field should feel large and prominent — this is a simple, quick question.

---

### Screen 8: Question 7 — Height

**Purpose:** Height is used in BMR and calorie calculations.

```
┌─────────────────────────────────────────┐
│  █████████████████████████████░░░░░░   │
│  Question 7 of 15                       │
├─────────────────────────────────────────┤
│                                         │
│       (Height / ruler icon)             │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  What is your height?             │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      175  cm                │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:** Same numeric input pattern as Q6. Suffix is "cm". Valid range: 100–220.

**Design Note:** Consider adding a visual height reference (a simple ruler graphic or person silhouette with dimension line) above the input for visual interest.

---

### Screen 9: Question 8 — Current Weight

**Purpose:** Baseline for weight change calculations and plan generation.

```
┌─────────────────────────────────────────┐
│  ████████████████████████████████░░░   │
│  Question 8 of 15                       │
├─────────────────────────────────────────┤
│                                         │
│       (Scale / weight icon)             │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  What is your current weight?     │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      78.5  kg               │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:** Same numeric input pattern. Suffix is "kg". Valid range: 30–300. Supports decimal input.

---

### Screen 10: Question 9 — Target Weight

**Purpose:** Define the end goal for plan generation and progress tracking.

```
┌─────────────────────────────────────────┐
│  ██████████████████████████████████░░   │
│  Question 9 of 15                       │
├─────────────────────────────────────────┤
│                                         │
│      (Target + scale icon)              │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  What is your target weight?      │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      72.0  kg               │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Current: 78.5 kg               │  │  ← Auto-filled reference
│  │  Difference: -6.5 kg            │  │  ← Auto-calculated
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Numeric input** | Same as Q8. Suffix "kg". |
| **Reference info** | Two lines below the input: "Current: 78.5 kg" and "Difference: -6.5 kg" — 13px Regular, Secondary text |
| **Difference display** | Updates in real-time as user types. Negative = weight loss goal (shown in green). Positive = weight gain goal (shown in blue). |
| **Validation** | Must be ≥ 30 kg. No conflict check yet (handled at Q10 validation gate). |

**Notes:**
- The real-time difference display is a powerful UX element. It gives immediate context and makes the goal feel tangible.
- Use a subtle trend arrow (↑/↓) next to the difference value.

---

### Screen 11: Question 10 — Weight Change Pace

**Purpose:** Let the user choose how fast they want to change weight. This is validated against the weight gap from Q9.

```
┌─────────────────────────────────────────┐
│  ████████████████████████████████████░   │
│  Question 10 of 15                      │
├─────────────────────────────────────────┤
│                                         │
│    (Speed / pace indicator icon)        │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  How fast would you like to       │  │
│  │  reach your goal weight?          │  │
│  │                                   │  │
│  │                                   │  │
│  │     ●─────●─────●─────●          │  │  ← Slider
│  │     0.25  0.5   1.0   1.5        │  │  ← Step labels (kg/week)
│  │                                   │  │
│  │  Selected: 0.5 kg/week            │  │  ← Current value callout
│  │                                   │  │
│  │  At this pace, you'll reach       │  │  ← Dynamic calculation
│  │  your goal in ~13 weeks           │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Title** | "How fast would you like to reach your goal weight?" — 22px SemiBold |
| **Slider** | 4-step slider with snap points |
| **Step values** | 0.25, 0.5, 1.0, 1.5 kg/week |
| **Step labels** | Displayed below the slider, 13px Regular |
| **Value callout** | "Selected: 0.5 kg/week" — 16px Bold, Navy |
| **Timeline estimate** | "At this pace, you'll reach your goal in ~13 weeks" — 14px Regular, Secondary text, updates dynamically |
| **Thumb** | 24px circle, Navy, white border |

**Validation Gate (In-Screen):**
After the user taps "Continue," the system validates:

| Condition | Behavior |
|-----------|----------|
| **Pace is realistic** (within 0.25–1.5 kg/week, reasonable for weight gap) | Proceed to Q11 |
| **Pace is unrealistic** (e.g., 1.5 kg/week for a 20 kg gap = impossible timeline) | Show amber warning banner below slider: "That pace may be too aggressive. We recommend 0.5 kg/week for sustainable results." Offer "Adjust" button or "Continue anyway" secondary link. |

**Warning Banner Style:**

```
┌──────────────────────────────────────────┐
│  ⚠  That pace may be too aggressive.    │
│  We recommend 0.5 kg/week for           │
│  sustainable results.                    │
│                                          │
│  [ Adjust pace ]    [ Continue anyway ]  │
└──────────────────────────────────────────┘
```

- **Background:** `#FEF3C7` (amber light)
- **Text:** `#92400E` (amber dark)
- **Icon:** Warning triangle, 20px
- **Primary button:** Navy background, white text
- **Secondary link:** Navy text, underlined

---

### Screen 12: Question 11 — Diet Preference

**Purpose:** Determines nutrition plan constraints and meal suggestions.

```
┌─────────────────────────────────────────┐
│  █████████████████████████████████████░   │
│  Question 11 of 15                      │
├─────────────────────────────────────────┤
│                                         │
│    (Food / meal icon)                   │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Do you follow a specific diet?   │  │
│  │                                   │  │
│  │  We'll tailor your meal plan      │  │
│  │  to match your preference.        │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🍽  No preference          │☑ │  │  ← Selected
│  │  │  I eat a balanced diet      │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🥩  Low-carb / Keto        │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🌱  Vegetarian             │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🥬  Vegan                  │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🚫  Gluten-free            │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🐟  Pescatarian            │☐ │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Title** | "Do you follow a specific diet?" — 22px SemiBold |
| **Helper text** | "We'll tailor your meal plan to match your preference." — 14px Regular |
| **Options** | 6-7 single-select cards with icon + label + optional description |
| **"No preference"** | Default/first option, describes a balanced diet |
| **Selection** | Single-select |

**Diet Options:**
1. No preference — I eat a balanced diet
2. Low-carb / Keto
3. Vegetarian
4. Vegan
5. Gluten-free
6. Pescatarian
7. Paleo (optional)

---

### Screen 13: Question 12 — Training Location

**Purpose:** Determines available equipment and workout environment.

```
┌─────────────────────────────────────────┐
│  ████████████████████████████████████████░│
│  Question 12 of 15                      │
├─────────────────────────────────────────┤
│                                         │
│   (Location / equipment icon)           │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Where will you mostly train?     │  │
│  │                                   │  │
│  │  This helps us suggest the right  │  │
│  │  exercises based on available     │  │
│  │  equipment.                       │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🏋️  Gym                    │☐ │  │
│  │  │  Full equipment, machines,  │  │  │
│  │  │  free weights               │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🏠  Home                   │☑ │  │
│  │  │  Minimal equipment, body-   │  │  │
│  │  │  weight, resistance bands   │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  ⚖️  Both equally           │☐ │  │
│  │  │  Mix of gym and home        │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:** 3 single-select cards with descriptions. The "Both equally" option suggests a hybrid approach.

---

### Screen 14: Question 13 — Fitness Level

**Purpose:** Determines workout difficulty, exercise complexity, and volume.

```
┌─────────────────────────────────────────┐
│  ██████████████████████████████████████████│
│  Question 13 of 15                      │
├─────────────────────────────────────────┤
│                                         │
│   (Level / progress icon)               │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  How would you rate your          │  │
│  │  current fitness level?           │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🌱  Beginner               │☑ │  │  ← Selected
│  │  │  I'm new to exercise or     │  │  │
│  │  │  haven't trained regularly  │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🌿  Intermediate           │☐ │  │
│  │  │  I exercise regularly but   │  │  │
│  │  │  am not following a program │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🌳  Advanced               │☐ │  │
│  │  │  I follow a structured      │  │  │
│  │  │  training program already   │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:** 3 single-select cards with icon + label + description.

**Notes:**
- Descriptions are important to help users self-assess accurately.
- This is a "soft" question — no wrong answers. The tone should be encouraging.

---

### Screen 15: Question 14 — Training Frequency

**Purpose:** How many days per week the user wants to train. Drives the workout plan structure.

```
┌─────────────────────────────────────────┐
│  ██████████████████████████████████████████│
│  Question 14 of 15                      │
├─────────────────────────────────────────┤
│                                         │
│  (Calendar / frequency icon)            │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  How many days per week would you │  │
│  │  like to train?                   │  │
│  │                                   │  │
│  │                                   │  │
│  │  ●──●──●──●──●──●──●──●          │  │  ← Slider
│  │  1  2  3  4  5  6  7             │  │  ← Step labels
│  │                                   │  │
│  │  Selected: 4 days/week           │  │  ← Current value |  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Slider** | 7-step slider, snap to integers |
| **Range** | 1 to 7 days/week |
| **Value callout** | "Selected: 4 days/week" — 16px Bold, Navy |
| **Step labels** | Numbered 1–7 below the slider |

---

### Screen 16: Question 15 — Preferred Training Days (Optional)

**Purpose:** Fine-tune the workout schedule with specific day preferences.

```
┌─────────────────────────────────────────┐
│  █████████████████████████████████████████████│
│  Question 15 of 15                      │
├─────────────────────────────────────────┤
│                                         │
│   (Week / calendar icon)                │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Which days do you prefer to      │  │
│  │  train?                           │  │
│  │                                   │  │
│  │  Optional — we can schedule       │  │
│  │  automatically if you prefer      │  │
│  │                                   │  │
│  │  ┌─────┐  ┌─────┐  ┌─────┐       │  │  ← Day chips
│  │  │ Mon │  │ Tue │☑ │ Wed │       │  │
│  │  └─────┘  └─────┘  └─────┘       │  │
│  │  ┌─────┐  ┌─────┐  ┌─────┐       │  │
│  │  │ Thu │☑ │ Fri │  │ Sat │☑ │    │  │
│  │  └─────┘  └─────┘  └─────┘       │  │
│  │  ┌─────┐                          │  │
│  │  │ Sun │                          │  │
│  │  └─────┘                          │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  │                                   │  │
│  │  [  Skip this question ]          │  │  ← Secondary link |  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Title** | "Which days do you prefer to train?" — 22px SemiBold |
| **Subtitle** | "Optional — we can schedule automatically if you prefer" — 14px Regular, Secondary text |
| **Day chips** | 7 circular/square toggle buttons arranged in a 3×3 or 4×2 grid |
| **Chip size** | 48×48px circles or 52×52px rounded squares |
| **Unselected** | `#FFFFFF` with `#E5E7EB` border, `#6B7280` text |
| **Selected** | `#1A2B4A` Navy fill, white text, checkmark inside |
| **CTA** | "Continue" — always enabled (question is optional) |
| **Skip link** | "Skip this question" — 14px Medium, Navy text below CTA |

**Notes:**
- This is the only optional question in the entire intake.
- The skip link provides an escape hatch but should not be emphasized.
- Selected days should align with the frequency from Q14. If there's a mismatch (e.g., selected 6 days on slider but only picked 3 days here), a validation gate fires.

---

### Validation Gate: Frequency vs. Days Mismatch

After the user submits Q15 (or skips), the system checks alignment:

```
┌──────────────────────────────────────────┐
│  ⚠  You selected 4 days/week but        │
│  picked 3 specific days.                │
│                                          │
│  What would you like to do?              │
│                                          │
│  [  Adjust my selections  ]              │
│  [  Use suggested days for the rest  ]   │
│  [  Continue with what I picked  ]       │
└──────────────────────────────────────────┘
```

- **Background:** `#FEF3C7` (amber light) overlay banner
- **Text:** `#92400E` (amber dark)
- **Primary option:** "Adjust my selections" — go back to Q15
- **Secondary option 1:** "Use suggested days" — auto-fill remaining days
- **Secondary option 2:** "Continue with what I picked" — proceed anyway

---

### Screen 17: Cross-Question Conflict Resolution

**Purpose:** System-level validation across all answers. Checks for impossible or contradictory combinations (e.g., "sedentary" + "advanced" + "1 day/week" + "get stronger").

**If no conflicts detected:**
- Skip this screen entirely. Proceed to Coach Selection with a brief transition message: "Looking good!" (shown as a 1-second interstitial).

**If conflicts detected:**
- Display a conflict resolution screen:

```
┌─────────────────────────────────────────┐
│                                         │
│        (Alert / review icon)            │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Let's Review Your Answers        │  │
│  │                                   │  │
│  │  A few of your answers seem       │  │
│  │  to conflict. Let's make sure     │  │
│  │  everything looks right.          │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  ⚠  Activity level          │  │  │  ← Conflict card
│  │  │  "Sedentary" + "Advanced"   │  │  │
│  │  │  seems unusual.             │  │  │
│  │  │  [  Review  ]               │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  ⚠  Weight pace             │  │  │
│  │  │  1.5 kg/week for a 20 kg    │  │  │
│  │  │  gap may be too aggressive. │  │  │
│  │  │  [  Review  ]               │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  [  All looks good, continue  ]   │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Title** | "Let's Review Your Answers" — 22px SemiBold |
| **Helper text** | Brief explanation of what was flagged and why |
| **Conflict cards** | Each conflict gets a card with warning icon, description, and a "Review" button |
| **"Review" action** | Tapping opens a mini-modal showing the original question, allowing the user to adjust that specific answer |
| **Confirmation button** | "All looks good, continue" — Navy primary button, always visible even if conflicts exist (respects user autonomy) |

**Design Philosophy:**
- Never block the user. Always allow "continue anyway."
- Frame conflicts as "let's make sure" rather than "your answers are wrong."
- The user owns their data — the system suggests, the user decides.

---

### Screen 18: Coach Selection

**Purpose:** Let the user choose a digital coach persona that matches their goals and personality. This coach becomes their guide throughout the app.

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Choose Your Coach                │  │
│  │                                   │  │
│  │  Your coach will guide your       │  │
│  │  workouts, nutrition, and         │  │
│  │  recovery. Pick someone you       │  │
│  │  connect with.                    │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌──── Coach Card 1 ──────────────┐    │
│  │  [Avatar]  Coach Marcus        │☐ │  │
│  │         Strength &             │  │  │
│  │         Muscle Building        │  │  │
│  │         "I believe in building  │  │  │
│  │          strong foundations."   │  │  │
│  │  Specialty badges:              │  │  │
│  │  [💪 Strength] [🏋️ Hypertrophy]│  │  │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌──── Coach Card 2 ──────────────┐    │
│  │  [Avatar]  Coach Sara          │☑ │  │  ← Selected
│  │         Weight Loss &          │  │  │
│  │         Endurance              │  │  │
│  │         "Small steps lead to   │  │  │
│  │          big results."         │  │  │
│  │  Specialty badges:              │  │  │
│  │  [🔥 Fat Loss] [🏃 Endurance]  │  │  │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌──── Coach Card 3 ──────────────┐    │
│  │  [Avatar]  Coach Alex          │☐ │  │
│  │         Balanced Fitness       │  │  │
│  │         "Balance is key to     │  │  │
│  │          lasting change."      │  │  │
│  │  Specialty badges:              │  │  │
│  │  [⚖️ General] [🧘 Recovery]    │  │  │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Continue  ]               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Title** | "Choose Your Coach" — 24px Bold, centered |
| **Helper text** | "Your coach will guide your workouts, nutrition, and recovery. Pick someone you connect with." — 14px Regular, centered |
| **Coach cards** | 3-5 selectable cards, vertical stack |
| **Card layout** | Avatar (left, 56px circle) + Name/Info (right) + Bio quote + Specialty badges |
| **Avatar** | 56px circle, stylized illustration or photo, Navy border when selected |
| **Coach name** | 18px SemiBold, `#1A1D26` |
| **Coach specialty** | 14px Medium, Navy (`#1A2B4A`) |
| **Coach bio** | 13px Regular, `#6B7280`, italic |
| **Specialty badges** | Small pills: 24px height, Navy-muted background, Navy text, 8px radius |
| **Selection indicator** | Navy circle with white checkmark, right-aligned on card |
| **CTA** | "Continue" — enabled when coach selected |

**Coach Persona Examples:**

| Name | Specialty | Bio Quote | Badges |
|------|-----------|-----------|--------|
| Coach Marcus | Strength & Muscle Building | "I believe in building strong foundations." | Strength, Hypertrophy |
| Coach Sara | Weight Loss & Endurance | "Small steps lead to big results." | Fat Loss, Endurance |
| Coach Alex | Balanced Fitness | "Balance is key to lasting change." | General, Recovery |
| Coach Lena | HIIT & Functional Training | "Every movement counts." | HIIT, Functional |
| Coach David | Bodybuilding & Nutrition | "Train hard, eat right, recover smart." | Bodybuilding, Nutrition |

**Notes:**
- Coach avatars should be diverse in appearance, gender, and style.
- The bio quote should reflect the coach's personality and coaching philosophy.
- Consider adding a "coach preview" — tapping a coach card could expand it to show more details (training philosophy, favorite exercises, typical coaching style).
- The coach selected here influences the tone and content of in-app messaging.

---

### Screen 19: Plan Generation (Loading State)

**Purpose:** Create anticipation and communicate that personalized work is happening in the background.

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│           (Animated logo)               │
│            with pulse                   │
│                                         │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Building Your Plan...            │  │
│  │                                   │  │
│  │  Your coach is putting together   │  │
│  │  a personalized workout and       │  │
│  │  nutrition plan based on your     │  │
│  │  goals.                           │  │
│  │                                   │  │
│  │  ─────────────────────────────    │  │
│  │                                   │  │
│  │  ✓ Your profile is ready          │  │
│  │  ✓ Nutrition targets calculated   │  │
│  │  ⠿ Generating workout schedule... │  │
│  │  ☐ Final plan review              │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Title** | "Building Your Plan..." — 24px Bold, centered |
| **Helper text** | "Your coach is putting together a personalized workout and nutrition plan based on your goals." — 14px Regular |
| **Progress checklist** | Sequential list of steps with state indicators |
| **Completed step** | Green checkmark (✓) + green text |
| **Active step** | Spinner icon (⠿) + Navy text, subtle pulse animation |
| **Pending step** | Empty circle (☐) + muted text |
| **Animation** | Steps complete sequentially (not all at once). Each step takes ~1.5 seconds. Total loading time: ~6-8 seconds. |
| **Background** | Subtle navy gradient or animated pattern |

**Progress Steps:**
1. Your profile is ready ✓
2. Nutrition targets calculated ✓
3. Generating workout schedule... ⠿ (active)
4. Final plan review ☐ (pending)

**Notes:**
- The sequential animation creates a feeling of real work being done.
- Do not allow the user to skip or cancel this screen.
- After all steps complete, auto-transition to Plan Reveal (1 second delay).

---

### Screen 20: Plan Reveal

**Purpose:** Deliver the personalized plan with excitement and clarity. Show the user exactly what they got.

```
┌─────────────────────────────────────────┐
│                                         │
│    (Celebration / success icon)         │
│       with subtle animation             │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Your Plan is Ready!              │  │
│  │                                   │  │
│  │  Coach Sara has prepared a        │  │
│  │  personalized plan to help you    │  │
│  │  reach your goals.                │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌── Daily Nutrition Targets ──────┐    │
│  │                                 │    │
│  │  🔥 2,150 kcal    💧 2,500 ml   │    │
│  │                                 │    │
│  │  Protein: 160g   Carbs: 215g    │    │
│  │  Fat: 72g                        │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌── Workout Schedule ────────────┐     │
│  │                                 │     │
│  │  4 days/week · Home workouts   │     │
│  │  Beginning in 2 days           │     │
│  │                                 │     │
│  │  Mon    Tue    Wed    Thu       │     │
│  │  [Work] [Rest] [Work] [Work]   │     │
│  │                                 │     │
│  │  Fri    Sat    Sun              │     │
│  │  [Rest] [Work] [Rest]          │     │
│  │                                 │     │
│  └─────────────────────────────────┘     │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [  Start My Plan  ]          │  │  ← Primary CTA
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**

| Element | Specification |
|---------|---------------|
| **Celebration icon** | Animated checkmark, star burst, or coach avatar with confetti — 80px |
| **Title** | "Your Plan is Ready!" — 28px Bold, Navy, centered |
| **Coach intro** | "Coach Sara has prepared a personalized plan..." — 14px Regular |
| **Nutrition card** | White card with Navy header bar; shows calorie, macro, and water targets |
| **Calorie value** | 20px Bold, Navy |
| **Macro breakdown** | 14px Medium, color-coded (protein green, carbs orange, fat blue) |
| **Workout card** | White card with weekly schedule grid |
| **Schedule grid** | 7-day row with [Work] (Navy) and [Rest] (muted) chips |
| **Workout metadata** | "4 days/week · Home workouts · Beginning in 2 days" — 13px Regular |
| **CTA** | "Start My Plan" — full-width primary button |

**Notes:**
- This is the payoff moment. Make it feel rewarding.
- Consider a subtle confetti or sparkle animation on screen load.
- The plan reveal summarizes what was generated without overwhelming detail.
- Tapping "Start My Plan" navigates to the Home screen (Tracking tab).

---

### Screen 21: Route to Home (Transition)

**Purpose:** Seamless transition into the main app experience.

**Transition Behavior:**
- User taps "Start My Plan"
- Button enters loading state (brief)
- App navigates with a push-left animation to the **Home Screen → Tracking Tab**
- A success toast appears at top: "Plan ready — you're all set!"
- Bottom tab bar appears for the first time (it was hidden during onboarding)

---

## Accessibility Requirements

- **Contrast:** Minimum 4.5:1 for all text; 3:1 for large numbers and interactive elements
- **Dynamic Type:** Support text scaling up to 150% — layout compresses but doesn't break
- **Touch Targets:** All tappable elements minimum 44×44px
- **Screen Reader:** Logical reading order: progress bar → question → options → CTA
- **Keyboard Navigation:** Tab through options, Enter/Space to select, Enter to submit
- **Reduced Motion:** Respect system setting — disable confetti, reduce slide animations to fades
- **Color Independence:** Selected state uses both color AND a checkmark indicator, not color alone

---

## Implementation Notes

1. **State Persistence:** Save every answer immediately to local storage. If the user exits mid-flow, resume from the last answered question.

2. **Navigation Guards:** No back button visible during intake. The flow is mandatory. Consider allowing swipe-back for the first 3 questions only.

3. **Keyboard Handling:** Numeric input screens (Q6-Q10) auto-focus the input field. The keyboard should push the CTA button above the keyboard, not hide it.

4. **Validation Strategy:**
   - Q10: Pace vs. weight gap — checked when CTA is tapped
   - Q15: Frequency vs. selected days — checked when CTA is tapped (or on skip)
   - Cross-question: Full check after Q15 is submitted, before Coach Selection
   - All validation should feel helpful, never blocking

5. **Coach Selection API:** Coach data should come from a configurable endpoint. The number of coaches and their details should be updatable without an app release.

6. **Plan Generation Timeout:** The loading screen should handle long API responses gracefully. If generation takes >15 seconds, show a secondary message: "Creating a great plan takes a moment..."

7. **Analytics:** Track drop-off rate per question. If Q8 (current weight) has a 20%+ drop-off, investigate and potentially add more reassurance copy.

8. **Error Recovery:** If plan generation fails, show an error screen with "Try Again" and "Contact Support" options. Never leave the user stranded.

---

## Assets Needed

| Asset | Format | Size | Notes |
|-------|--------|------|-------|
| Welcome Illustration | SVG + PNG | 200×200px (@2x, @3x) | Coach + plan themed |
| Question Icons | SVG | 64×64px | 15 unique icons (one per question category) |
| Coach Avatars | SVG + PNG | 56×56px (@2x, @3x) | 3-5 diverse coach personas |
| Celebration Icon | Lottie/JSON | 80×80px | Animated confetti/checkmark |
| Loading Steps Animation | Lottie/JSON | Full screen | Sequential progress animation |
| Plan Reveal Celebration | Lottie/JSON | Full screen | Sparkle/confetti effect |

---

## Related Documents

- `auth-flow-brief.md` — Authentication flow documentation
- `onboarding-intake-brief.md` — Intake flow breakdown and analysis
- `ui-prompt-auth-screens.md` — Auth screens (login, registration, forgot password)
- `ui-prompt-tracking-tab.md` — Home screen (Tracking Tab) UI prompt
- `brief-analysis.md` — Design analysis and Pinterest inspiration
