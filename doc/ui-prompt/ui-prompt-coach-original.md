# UI Implementation Prompt: Coach (Strivio)

## Context

The Coach is the **digital personal trainer** of the Strivio fitness & nutrition coaching app. It delivers recovery insights, nutrition feedback, activity planning, and a conversational AI coaching interface. It is one of the four main app pages (Home, Logbook, Coach, More) and is the primary surface for personalized, data-driven guidance.

**Role in the app:** The Coach synthesizes data from across the app — sleep and HRV from Apple Health/Google Fit, mood from daily check-ins, nutrition from the Log Book, workouts from the Workout Tab — and presents it as actionable coaching insights. It answers three questions: How am I recovering? How am I eating? What should I do?

**Key differentiator:** A three-tab structure (Recovery, Nutrition, Activity) plus a unified Coach Chat panel. The chat uses a hybrid AI + rule-based engine that grounds every response in the user's actual plan and logged data — not generic advice. Recovery is the default landing tab, signaling a holistic coaching philosophy.

**Monetization:** Core visibility (viewing tabs, seeing today's summaries) is Free. Deep insights (recovery score, sleep stages, HRV, 7-day charts, weekly progress) and the Coach Chat are Premium-gated. The mood check-in and nutritional daily card are Free to build daily habit loops.

---

## Platform
- **Type:** Mobile App (iOS & Android)
- **Recommended Framework:** React Native (with native UI components) or Flutter
- **Orientation:** Portrait only
- **Status Bar:** Dark status bar (dark text on white/light background)

## Screen Dimensions
- **Mobile Standard:** 375px width (iPhone 13/14) x 812px height
- **Safe Area:** Account for notch (44px top) and home indicator (34px bottom)
- **Scrollable:** Yes — vertically scrollable within each sub-tab; Coach Chat is a full-screen or slide-up panel

## Visual Design Direction
- **Style:** Clean, data-rich dashboard with card-based layout. Consistent with Log Book, Workout Tab, and Home screens — same design language, spacing, and components.
- **Primary Color Scheme:** White background with **periwinkle/purple-blue** accents (`#7F7CF0`) — warm, refined coaching aesthetic. The Coach should feel approachable and intelligent, not clinical.
- **Aesthetic:** Insightful, encouraging, data-driven. Cards should surface actionable takeaways, not just raw numbers. "Your recovery is strong — today's a good day to push" rather than "Sleep: 7.5h, HRV: 48ms."
- **Card Design:** White cards with subtle periwinkle-tinted shadows, generous padding, 20px border radius
- **Spacing:** 8px base grid; 14px gap between cards; 24px screen padding
- **Coach Chat:** Conversational, warm. Chat bubbles with coach avatar. Responses feel personal and contextual.

---

## Shared Design Tokens

Consistent with Log Book, Workout Tab, Home, Onboarding, and Auth screens.

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary Purple-Blue | `#7F7CF0` | Buttons, selected states, active tab indicator, progress fills, coach avatar accent |
| Primary Purple-Blue Light | `#9794F3` | Hover/active button states, pressed states |
| Primary Purple-Blue Muted | `#f1f0ff` | Unselected tab backgrounds, inactive elements, card accent backgrounds |
| Background | `#FFFFFF` | Primary page background |
| Background Alt | `#F5F6FA` | Secondary page background, tab bar background |
| Surface White | `#FFFFFF` | Card backgrounds |
| Surface Variant | `#f8f8f8` | Alternative card backgrounds, chat input area |
| Text Primary | `#0f172a` | Main text, labels, numbers, card titles |
| Text Secondary | `#525252` | Captions, descriptions, secondary info |
| Text Tertiary | `#64748b` | Hints, less prominent info |
| Text Muted | `#9CA3AF` | Placeholders, disabled text |
| Premium Gold | `#F59E0B` | Premium/upgrade badges, lock icons, paywall accents |
| Premium Gold Dark | `#92400E` | Premium text on light backgrounds |
| Premium Gold Light | `#FEF3C7` | Premium badge backgrounds |
| Success Green | `#10B981` | Positive metrics, on-track indicators, completed checkmarks |
| Warning Amber | `#F59E0B` | Approaching limits, moderate recovery, partial RDV |
| Error Red | `#EF4444` | Poor recovery, exceeded limits, low metric warnings |
| Info Blue | `#3b82f6` | Active tab indicator, info callouts, coach chat accent |
| Recovery Teal | `#14B8A6` | Recovery-specific accents, sleep data |
| Activity Coral | `#F87171` | Activity-specific accents, calorie indicators |
| Nutrition Green | `#34D399` | Nutrition-specific accents, macro bars |
| Protein Green | `#34D399` | Protein macro bar and label |
| Carbs Orange | `#FB923C` | Carbs macro bar and label |
| Fat Blue | `#60A5FA` | Fat macro bar and label |
| HRV Purple | `#A78BFA` | HRV-specific accents, heart rate variability |
| Mood Yellow | `#FBBF24` | Mood check-in accents |
| Sleep Indigo | `#818CF8` | Sleep data accents |
| Divider | `#E5E7EB` | Card borders, list separators |
| Border Card | `#f4f4f4` | Card borders (input fields, cards) |
| Shadow | `rgba(127, 124, 240, 0.06)` | Card shadows (periwinkle-tinted) |
| Chat Bubble User | `#7F7CF0` | User message bubbles in Coach Chat |
| Chat Bubble Coach | `#f1f0ff` | Coach response bubbles in Coach Chat |
| Recovery Score High | `#10B981` | Recovery score ≥ 75 |
| Recovery Score Medium | `#F59E0B` | Recovery score 50–74 |
| Recovery Score Low | `#EF4444` | Recovery score < 50 |

### Typography

| Element | Font Size | Font Weight | Line Height | Font Family | Usage |
|---------|-----------|-------------|-------------|-------------|-------|
| Screen Title | 24px | 600 (SemiBold) | 30px | Nunito | "Coach" header |
| Tab Label | 14px | 600 (SemiBold) | 20px | Nunito | Recovery/Nutrition/Activity tab labels |
| Card Title | 15px | 600 (SemiBold) | 20px | Nunito | Section headers within cards |
| Body Text | 14px | 400 (Regular) | 20px | Nunito | Descriptions, metric labels |
| Body Text Bold | 14px | 600 (SemiBold) | 20px | Nunito | Emphasized labels, insight text |
| Large Number | 32px | 700 (Bold) | 40px | Nunito | Recovery score, large metric values |
| Metric Value | 17px | 600 (SemiBold) | 24px | Nunito | Sleep hours, HRV value, macro grams |
| Caption | 12px | 400 (Regular) | 16px | Inter | Timestamps, hints, data source labels |
| Button Text | 16px | 600 (SemiBold) | 20px | Inter | CTA buttons |
| Chat Message | 15px | 400 (Regular) | 22px | Inter | Coach Chat messages |
| Chat Timestamp | 11px | 400 (Regular) | 14px | Inter | Chat message timestamps |
| Insight Text | 14px | 500 (Medium) | 20px | Inter | Coaching insight/context lines |
| Empty State | 14px | 500 (Medium) | 20px | Inter | Empty state messages |
| Badge Label | 11px | 600 (SemiBold) | 14px | Inter | Premium badges, status labels |
| Progress Label | 13px | 500 (Medium) | 18px | Inter | Macro progress labels |

**Font Stack:** Nunito (display headings, tab labels), Inter (body, buttons, inputs), SF Pro (iOS fallback), Roboto (Android fallback)

### Spacing System

| Application | Value |
|-------------|-------|
| Screen horizontal padding | 24px |
| Screen top padding | 42px |
| Tab bar height | 48px |
| Card gap | 14px |
| Card internal padding | 16px 24px |
| Card corner radius | 20px |
| Section gap | 20px |
| Icon-to-text gap | 8px |
| Element-to-element gap | 12px |
| Metric row gap | 8px |
| Insight-to-data gap | 10px |
| Progress bar gap | 6px |
| Bottom safe-area padding | 28px + home indicator |
| Chat bubble gap | 8px |
| Chat input height | 48px |

---

## Component Specifications

### Card Container
- **Background:** `#FFFFFF`
- **Border Radius:** 20px
- **Padding:** 16px 24px
- **Shadow:** `0 0 38px rgba(0, 0, 0, 0.06)`
- **Border:** `1px solid #f4f4f4` (optional, for bordered variant)

### Tab Bar (Coach Sub-Tabs)
- **Height:** 48px
- **Background:** `#F5F6FA`
- **Border Radius:** 14px (pill-shaped container)
- **Padding:** 4px internal
- **Tab Width:** Equal distribution (3 tabs)
- **Active Tab:** `#7F7CF0` background, white text
- **Inactive Tab:** transparent background, `#64748b` text
- **Tab Font:** 14px, 600 (SemiBold), Outfit
- **Transition:** Background color + text color, 250ms ease-out
- **Tab Icons:** Optional small icon prefix per tab (🛌 Recovery, 🍎 Nutrition, 🏋️ Activity)

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

### Recovery Score Gauge
- **Size:** 140px diameter (large, prominent)
- **Track:** Full circle, `#E5E7EB` background, 12px stroke
- **Fill Arc:** Colored arc proportional to score, 12px stroke
  - ≥ 75: `#10B981` (green — ready to train hard)
  - 50–74: `#F59E0B` (amber — moderate readiness)
  - < 50: `#EF4444` (red — prioritize recovery)
- **Center Text:** Score number (32px Bold, Outfit) + "/100" (14px Caption)
- **Center Subtext:** One-word label: "Excellent", "Good", "Fair", or "Low"
- **Animation:** Arc fills on load (800ms ease-out)

### Metric Card (Recovery Metric Display)
- **Height:** 80px min
- **Left:** Metric icon (24px, color-coded) + metric name (13px Caption)
- **Center:** Metric value (17px SemiBold)
- **Right:** Trend indicator (up/down/stable arrow, 16px)
- **Subtitle:** Context text (12px Caption, `#525252`)
- **Background:** White card with subtle left border accent (3px, color-coded by metric type)

### Insight Card (Coach Context)
- **Background:** `#f1f0ff` (purple-blue muted)
- **Border Radius:** 14px
- **Padding:** 12px 16px
- **Left Icon:** Coach avatar or lightbulb icon (20px)
- **Text:** Insight/context message, 14px Medium, `#0f172a`
- **Usage:** Placed below metric cards to provide coach interpretation

### Mood Check-in Chip Group
- **Container:** Horizontal row, centered
- **Chip Size:** 56x56px (touch-friendly)
- **Shape:** Circle
- **Unselected:** `#F5F6FA` background, emoji icon (24px), label below (11px Caption)
- **Selected:** `#f1f0ff` background, `#7F7CF0` border (2px), emoji + label
- **Options:** 😊 Great, 🙂 Good, 😐 Okay, 😕 Bad, 😞 Terrible
- **Selection:** Single-tap, instant confirmation (no "Save" step)

### Macro Progress Bar (Nutrition Tab)
- **Height:** 8px
- **Track:** `#E5E7EB` (grey)
- **Fill Color:** Varies by macro:
  - Protein: `#34D399` (green)
  - Carbs: `#FB923C` (orange)
  - Fat: `#60A5FA` (blue)
  - Calories: `#F87171` (coral)
- **Border Radius:** 4px
- **Label Left:** Macro name + grams consumed (13px Medium)
- **Label Right:** Target in grams (13px, `#525252`)

### 7-Day Chart (Nutrition & Activity)
- **Height:** 180px
- **Type:** Bar chart (calories/steps) with line overlay (target/trend)
- **Bar Color:** `#7F7CF0` with 80% opacity
- **Target Line:** Dashed `#F59E0B` (amber)
- **X-Axis:** Day labels (Mon–Sun or last 7 days), 11px Caption
- **Y-Axis:** Values (hidden on mobile for cleanliness — show on bar hover/tap)
- **Empty State:** Grey placeholder bars with lock overlay (Free users)

### Workout Schedule Card (Activity Tab)
- **Layout:** Horizontal scrollable row of day chips
- **Day Chip Size:** 44x56px (rounded rectangle)
- **Today:** `#7F7CF0` background, white text, subtle glow shadow
- **Completed:** `#f1f0ff` background, `#10B981` checkmark overlay
- **Rest Day:** `#F5F6FA` background, 😴 icon, `#64748b` text
- **Scheduled:** White background, `#E5E7EB` border, workout icon
- **Past (uncompleted):** Dashed border, dimmed opacity (0.5)

### Weekly Progress Card (Activity Tab)
- **Layout:** Three metric columns side by side
- **Each Column:**
  - Icon (16px, `#7F7CF0`)
  - Value (17px SemiBold, Outfit)
  - Label (11px Caption, `#525252`)
  - Trend arrow (↑ ↓ →, 12px, color-coded)
- **Background:** White card, 16px internal padding
- **Divider:** 1px `#E5E7EB` between columns

### Steps Progress Ring
- **Size:** 100px diameter
- **Track:** `#f1f0ff` (purple-blue muted)
- **Fill:** `#7F7CF0`
- **Stroke Width:** 8px
- **Center:** Step count (20px Bold, Outfit)
- **Center Subtext:** "of 10,000" (11px Caption)
- **Animation:** Ring fills on load (600ms ease-out)

### Premium Locked Card
- **Background:** White with `#FEF3C7` (amber tint) accent bar at top
- **Icon:** Lock icon (20px, `#F59E0B`) centered
- **Title:** Feature name (15px SemiBold)
- **Subtext:** "Available with Premium" (13px, `#64748b`)
- **Preview:** Blurred or dimmed version of the data behind the lock
- **CTA:** "Unlock" pill button (amber/gold, small)

### Coach Chat Bubble
- **User Bubble:**
  - Background: `#7F7CF0`
  - Text: White, 15px Regular
  - Border Radius: 18px (top-right sharp)
  - Max Width: 75%
  - Alignment: Right
- **Coach Bubble:**
  - Background: `#f1f0ff`
  - Text: `#0f172a`, 15px Regular
  - Border Radius: 18px (top-left sharp)
  - Max Width: 75%
  - Alignment: Left
  - Avatar: Small coach avatar (24px) to the left
- **Timestamp:** 11px Caption, `#9CA3AF`, below bubble (right-aligned for user, left-aligned for coach)

### Chat Input Bar
- **Height:** 48px
- **Background:** `#f8f8f8`
- **Border Radius:** 24px (pill)
- **Padding:** 0 16px
- **Placeholder:** "Ask your coach anything..." (14px, `#9CA3AF`)
- **Send Button:** Circle (36px), `#7F7CF0` background, arrow-up icon (white, 16px)
- **Quick Reply Chips:** Horizontal scrollable row above input, 36px height pills

### Premium Badge (Lock/Upgrade)
- **Icon:** Lock icon, 14px
- **Color:** `#F59E0B` (gold/amber)
- **Background:** `#FEF3C7` (light amber tint)
- **Border Radius:** 6px
- **Padding:** 4px 10px
- **Label Text:** "Premium", 11px, `#92400E`

### Data Source Label
- **Text:** "via Apple Health" or "via Google Fit" (11px Caption, `#9CA3AF`)
- **Icon:** Small platform icon (12px) next to label
- **Position:** Below metric value, right-aligned or inline

---

## Screen-by-Screen Specifications

---

### Screen 1: Coach — Recovery Tab (Default Landing)

**Purpose:** The default tab when entering the Coach. Provides a holistic view of the user's recovery state — sleep, HRV, mood, and a composite recovery score. Sets the tone that the Coach cares about the whole athlete.

#### Layout

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│  Coach                                   │  ← Page title
│                                          │
│  ┌─────── Tab Bar ──────────────┐       │
│  │ [🛌 Recovery] [🍎 Nutrition] [🏋️ Activity] │  ← Sub-tab bar
│  └───────────────────────────────┘       │
│                                          │
│  ┌─── Recovery Score ──────────────┐    │
│  │           ╭──────────╮           │    │
│  │           │    78    │           │    │  ← Recovery score gauge
│  │           │  / 100   │           │    │     (140px diameter)
│  │           │  Good    │           │    │     Green arc (≥75)
│  │           ╰──────────╯           │    │
│  │                                  │    │
│  │  💡 You're well recovered.       │    │  ← Coach insight
│  │     Today is a good day to       │    │
│  │     push hard in your workout.   │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Today's Metrics ─────────────┐    │
│  │                                  │    │
│  │  ┌── Sleep ──────────────────┐  │    │
│  │  │  😴  7h 25m               │  │    │  ← Free: duration shown
│  │  │       via Apple Health     │  │    │
│  │  │                           │  │    │
│  │  │  ┌── Stages (Premium) ─┐  │  │    │  ← Premium: stages breakdown
│  │  │  │ Deep   ████░░  2h  │  │  │    │
│  │  │  │ Light  ███░░░  3h  │  │  │    │
│  │  │  │ REM    ██░░░░  1.5h│  │  │    │
│  │  │  │ Awake  █░░░░░ 0.5h│  │  │    │
│  │  │  │  ⓘ About sleep stages│  │  │    │  ← Premium FAQ
│  │  │  └────────────────────┘  │  │    │
│  │  └──────────────────────────┘  │    │
│  │                                  │    │
│  │  ┌── HRV ────────────────────┐  │    │
│  │  │  🫀  48 ms      ↑ 12%     │  │    │  ← Premium: HRV value + trend
│  │  │       via Apple Health     │  │    │
│  │  │       In healthy range     │  │    │
│  │  └────────────────────────────┘  │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── How are you feeling? ────────┐    │
│  │                                  │    │  ← Free: mood check-in
│  │    😊     🙂     😐     😕     😞     │
│  │  Great   Good   Okay   Bad  Terrible│
│  │                                  │    │
│  │  ✓ Mood saved for today          │    │  ← Post-selection state
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Sleep Data ──────────────────┐    │
│  │  [Decision Point]               │    │
│  │                                  │    │
│  │  ┌─ Apple Health connected ──┐  │    │
│  │  │ ✅ Sleep data imported     │  │    │
│  │  │    (auto)                  │  │    │
│  │  └────────────────────────────┘  │    │
│  │  ── OR (if no data) ──          │    │
│  │  ┌────────────────────────────┐  │    │
│  │  │ + Add sleep manually       │  │    │  ← Premium: manual entry
│  │  │   Enter bedtime & wake time│  │    │
│  │  └────────────────────────────┘  │    │
│  └──────────────────────────────────┘    │
│                                          │
│  [Home] [Logbook] [Coach] [More]         │  ← Bottom Tab Bar (Coach active)
└─────────────────────────────────────────┘
```

#### Recovery Score Card States

**State A: Score ≥ 75 (Green — Ready)**
- Gauge arc: `#10B981` (green)
- Center label: "Excellent" or "Good"
- Insight: "You're well recovered. Today is a good day to push hard in your workout."
- Background accent: subtle green glow on gauge

**State B: Score 50–74 (Amber — Moderate)**
- Gauge arc: `#F59E0B` (amber)
- Center label: "Fair"
- Insight: "Your recovery is moderate. Consider a lighter workout or focus on sleep tonight."
- Background accent: subtle amber glow

**State C: Score < 50 (Red — Low)**
- Gauge arc: `#EF4444` (red)
- Center label: "Low"
- Insight: "Your recovery is low. Prioritize rest today — your body needs it. Focus on sleep and hydration."
- Background accent: subtle red glow

**State D: Insufficient Data (New User)**
- Gauge arc: `#E5E7EB` (grey, partial)
- Center: "—" instead of number
- Center label: "Not enough data"
- Insight: "Complete your profile and connect Apple Health to start tracking recovery."
- CTA: "Connect Apple Health" button

#### Sleep Card States

**State A: Apple Health Connected + Premium**
- Sleep duration displayed prominently
- Sleep stages breakdown chart visible
- Sleep stages FAQ info icon (ⓘ) tappable
- Data source label: "via Apple Health"

**State B: Apple Health Connected + Free**
- Sleep duration displayed (Free)
- Sleep stages area replaced with locked card: "Unlock sleep stage analysis with Premium"
- Blurred preview of stages chart behind the lock

**State C: No Sleep Data Available**
- "No sleep data detected" message
- CTA: "Connect Apple Health or Google Fit" (opens device settings)
- Secondary: "Enter manually" → opens time picker (Premium)

**State D: Manual Entry (Premium, triggered when no data source)**
- "Add Sleep Data" card with two time pickers:
  - Bedtime: time picker (default 10:00 PM)
  - Wake time: time picker (default 6:00 AM)
- Auto-calculated duration displayed below
- "Save" button

#### HRV Card States

**State A: Premium + Apple Watch (Data Available)**
- HRV value in ms (e.g., "48 ms")
- Trend arrow: ↑ improving, ↓ declining, → stable
- Context: "In healthy range" or "Lower than your baseline"
- Data source: "via Apple Health"

**State B: Premium + No Apple Watch**
- "HRV Not Available" message
- Explanation: "Heart rate variability data requires an Apple Watch."
- Subtle card (dimmed) — doesn't show a lock since it's a hardware limitation, not a paywall

**State C: Free User**
- Locked card: "Unlock HRV tracking with Premium"
- Blurred preview of sample HRV data
- Upsell CTA

**State D: Android User (Google Fit — no HRV support)**
- Card hidden entirely or shows "Not available on Android"

#### Mood Check-in States

**State A: Not Yet Checked In (Default)**
- Prompt: "How are you feeling today?"
- Five mood chips: 😊 Great, 🙂 Good, 😐 Okay, 😕 Bad, 😞 Terrible
- All unselected, equal weight

**State B: After Selection**
- Selected chip: `#f1f0ff` bg, `#7F7CF0` border (2px)
- Other chips: dimmed (opacity 0.4)
- Confirmation text appears: "✓ Mood saved for today"
- Subtle checkmark animation on selected chip

**State C: Already Checked In (Return Visit)**
- Shows today's mood with the selected chip highlighted
- "Change" link below (tap to re-open selection)
- No duplicate entries

#### Interactions
- **Tab Switch:** Tap tab labels or swipe left/right between Recovery, Nutrition, Activity
- **Recovery Score Tap:** Expand to show contributing factor breakdown (sleep contribution, mood contribution, HRV contribution, activity contribution) — each with individual score and weight
- **Sleep Stages Tap:** Expand/collapse stages breakdown
- **Sleep FAQ Tap (ⓘ):** Open educational overlay explaining each sleep stage
- **HRV Tap:** Show HRV trend over last 7 days (mini line chart in expanded view)
- **Mood Chip Tap:** Single tap → instant selection + confirmation
- **Manual Sleep Entry Tap:** Open time pickers (Premium check first for Free users)
- **Locked Cards Tap:** Trigger Premium paywall modal

---

### Screen 2: Coach — Nutrition Tab

**Purpose:** Coaching-layer view of the user's dietary intake. Pulls data from the Log Book and presents it as trends, patterns, and insights — not raw food logs (that's the Log Book's job).

#### Layout

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│  Coach                                   │
│                                          │
│  ┌─────── Tab Bar ──────────────┐       │
│  │ [🛌 Recovery] [🍎 Nutrition] [🏋️ Activity] │  ← Nutrition active
│  └───────────────────────────────┘       │
│                                          │
│  ┌─── Today's Nutrition ───────────┐    │
│  │                                  │    │  ← Free
│  │  Calories                        │    │
│  │  ██████████████░░░░  1,850      │    │  ← Progress bars
│  │  84%  •  350 remaining          │    │
│  │                                  │    │
│  │  Protein                         │    │
│  │  ████████████░░░░░░  85 / 120g  │    │
│  │  71%  •  35g remaining          │    │
│  │                                  │    │
│  │  Carbs                           │    │
│  │  ██████████░░░░░░░░  160 / 220g │    │
│  │  73%  •  60g remaining          │    │
│  │                                  │    │
│  │  Fat                             │    │
│  │  ██████████████░░░░  55 / 65g   │    │
│  │  85%  •  10g remaining          │    │
│  │                                  │    │
│  │  [  View Full Log Book  →  ]     │    │  ← Cross-navigation
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Coach Insight ───────────────┐    │
│  │  💡 You're doing great on        │    │  ← Contextual insight
│  │     protein today. Try adding    │    │     based on actual data
│  │     more carbs at lunch to       │    │
│  │     fuel your afternoon workout. │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── 7-Day Nutrition ─────────────┐    │
│  │  ┌─── Calorie Intake ──────┐    │    │  ← Premium
│  │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │    │    │     Bar chart
│  │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ▓▓ │    │    │
│  │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ▓▓ │    │    │
│  │  │  M  T  W  T  F  S  S   │    │    │
│  │  │  —— Target (2,200)      │    │    │     Dashed target line
│  │  │  🔒 Unlock with Premium  │    │    │  ← Free user: blurred + lock
│  │  └──────────────────────────┘    │    │
│  │                                  │    │
│  │  💡 Your calorie intake is       │    │
│  │     consistent. You average      │    │
│  │     1,920 cal/day this week.     │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Ask Your Coach ──────────────┐    │
│  │  💬                              │    │  ← Premium
│  │  "Am I getting enough protein?"  │    │  ← Quick reply chips
│  │  "How to adjust for rest days?"  │    │
│  │  "Suggest a high-protein snack"  │    │
│  │                                  │    │
│  │  [  Chat with Coach  →  ]        │    │  ← Opens Coach Chat
│  └──────────────────────────────────┘    │
│                                          │
│  [Home] [Logbook] [Coach] [More]         │
└─────────────────────────────────────────┘
```

#### Today's Nutrition Card
- Mirrors the Log Book's Daily Macro Overview but with coaching context
- Macro bars use the same colors: Protein=green, Carbs=orange, Fat=blue, Calories=coral
- "Remaining" text in green (well under), amber (approaching), or red (at/over limit)
- "View Full Log Book →" link navigates to Log Book daily view

#### Coach Insight Card
- AI or rule-based contextual message based on the day's nutrition data
- Examples:
  - "You're doing great on protein today. Try adding more carbs at lunch to fuel your afternoon workout."
  - "You're under your calorie target — consider a nutrient-dense snack before dinner."
  - "Your fat intake is approaching the limit. Try leaner protein sources for dinner."
- Tone: encouraging, helpful, never judgmental
- Background: `#f1f0ff` (purple-blue muted) to distinguish from data cards

#### 7-Day Nutrition Chart States

**State A: Premium User (Full Access)**
- Bar chart: daily calorie intake for last 7 days
- Target line: dashed amber line at daily target (e.g., 2,200)
- Bars colored by relation to target: green (within 10%), amber (10-25% off), red (>25% off)
- Tap a bar → tooltip with exact calories and macro breakdown for that day
- Insight text below chart: summary of weekly pattern

**State B: Free User (Locked)**
- Blurred or greyed-out chart with lock overlay
- "Unlock 7-day nutrition trends with Premium"
- "Start Free Trial" CTA
- Preview: maybe show last 2-3 days of data (unblurred) to demonstrate value

#### Ask Your Coach Card
- Quick-reply chips for common nutrition questions
- 3-4 chips shown, horizontally scrollable if more
- Each chip: `#f1f0ff` background, `#7F7CF0` text, 13px Medium
- "Chat with Coach →" button opens Coach Chat (Premium check first for Free users)

#### Interactions
- **Macro Bar Tap:** Expands to show per-meal macro breakdown (same as Log Book detail)
- **"View Full Log Book →":** Navigates to Log Book daily view
- **7-Day Chart Bar Tap:** Show daily detail tooltip (Premium only)
- **Quick Reply Chip Tap:** Pre-fills that question in Coach Chat and opens chat panel
- **"Chat with Coach" Tap:** Opens Coach Chat panel

---

### Screen 3: Coach — Activity Tab

**Purpose:** The coaching hub for workout planning and activity insights. Shows the user's schedule, progress, and activity metrics from a coaching perspective.

#### Layout

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│  Coach                                   │
│                                          │
│  ┌─────── Tab Bar ──────────────┐       │
│  │ [🛌 Recovery] [🍎 Nutrition] [🏋️ Activity] │  ← Activity active
│  └───────────────────────────────┘       │
│                                          │
│  ┌─── Next Workout ────────────────┐    │
│  │  📅 Today — Tuesday, Apr 25     │    │  ← Free
│  │                                  │    │
│  │  Upper Body Strength             │    │  ← 18px Bold
│  │  45 min  Intermediate  Dumbbells │    │  ← Metadata
│  │  [Chest] [Back] [Shoulders]      │    │  ← Muscle group tags
│  │                                  │    │
│  │  [  ▶  Start Workout  ]          │    │  ← Primary CTA
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── 2-Week Schedule ─────────────┐    │
│  │                                  │    │  ← Free
│  │  ◀ Week 1              Week 2 ▶ │    │  ← Week toggle
│  │                                  │    │
│  │  Mon  Tue  Wed  Thu  Fri  Sat  Sun│   │  ← Day chips row
│  │  ✅   ✅   😴   🏋️   🏋️   😴   🏋️  │    │
│  │  22   23   24   25   26   27   28 │    │
│  │                                  │    │
│  │  ✅ Completed  🏋️ Scheduled  😴 Rest │  ← Legend
│  │                                  │    │
│  │  [  View Full Plan  ]            │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Weekly Progress ─────────────┐    │
│  │  ┌────────┬────────┬────────┐   │    │  ← Premium
│  │  │  80%   │ 5 days │ 12,450 │   │    │
│  │  │complet.│ active │ kg vol │   │    │
│  │  │  ↑5%   │  →     │  ↑8%   │   │    │
│  │  └────────┴────────┴────────┘   │    │
│  │                                  │    │
│  │  🔒 Unlock weekly progress       │    │  ← Free user: locked
│  │     insights with Premium        │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── 7-Day Activity ──────────────┐    │
│  │  ┌── Calories Burned ──────┐    │    │  ← Premium
│  │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │    │    │
│  │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ▓▓ │    │    │
│  │  │  M  T  W  T  F  S  S   │    │    │
│  │  │  🔒 Unlock with Premium  │    │    │
│  │  └──────────────────────────┘    │    │
│  │                                  │    │
│  │  ┌── Daily Steps ───────────┐   │    │  ← Free
│  │  │      ╭──────────╮         │   │    │
│  │  │      │  8,450   │         │   │    │  ← Steps progress ring
│  │  │      │  steps   │         │   │    │
│  │  │      ╰──────────╯         │   │    │
│  │  │      of 10,000  (85%)     │   │    │
│  │  │      via Apple Health     │   │    │
│  │  └──────────────────────────┘    │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Past Workouts ───────────────┐    │
│  │                                  │    │  ← Free
│  │  Mon, Apr 24 — Lower Body       │    │
│  │  42 min  •  320 kcal  •  6 exercises│  │
│  │                                  │    │
│  │  Sat, Apr 22 — Push Day         │    │
│  │  38 min  •  280 kcal  •  5 exercises│  │
│  │                                  │    │
│  │  [  View All Workouts  →  ]      │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌─── Ask Your Coach ──────────────┐    │
│  │  💬                              │    │  ← Premium
│  │  "Should I increase weights?"    │    │
│  │  "My legs are still sore"        │    │
│  │  "Suggest an alternative"        │    │
│  │                                  │    │
│  │  [  Chat with Coach  →  ]        │    │
│  └──────────────────────────────────┘    │
│                                          │
│  [Home] [Logbook] [Coach] [More]         │
└─────────────────────────────────────────┘
```

#### Next Workout Card States

**State A: Workout Scheduled (Default)**
- Workout name, duration, difficulty, equipment, muscle group tags
- "Start Workout" CTA → navigates to Workout Detail Page
- Same data as the Workout Tab's Today card, but presented from a coaching perspective

**State B: Rest Day**
- Calm card: "Rest Day"
- Icon: 😴 or moon
- Subtext: "Recovery is part of the plan. Your next workout: Upper Body Strength — Tomorrow"
- "Start a workout anyway" secondary link → opens Workout Library

**State C: No Schedule**
- "No workouts scheduled" empty state
- CTA: "Build a workout with your coach" (Premium) or "Browse workout library" (Premium)

#### 2-Week Schedule Card

- Horizontal scrollable row of day chips
- Each chip: 44x56px rounded rectangle
- **Today:** `#7F7CF0` bg, white text, brighter glow
- **Completed:** `#f1f0ff` bg, `#10B981` checkmark, dimmed text
- **Rest Day:** `#F5F6FA` bg, 😴 icon, `#64748b` date
- **Scheduled:** White with `#E5E7EB` border, 🏋️ icon
- **Past (uncompleted):** Dashed border, 50% opacity
- Week toggle: "◀ Week 1 | Week 2 ▶" to flip between weeks
- Tap any day → opens Workout Detail Page for that day
- Legend row below chips: ✅ Completed  🏋️ Scheduled  😴 Rest

#### Weekly Progress Card States

**State A: Premium User (Full Access)**
- Three columns: Completion Rate, Days Active, Volume
- Each with trend arrow and percentage change vs. previous week
- Background: white card, subtle periwinkle shadow

**State B: Free User (Locked)**
- Locked card with amber accent bar
- "Unlock weekly progress insights with Premium"
- Blurred numbers behind lock overlay
- Upsell CTA

#### 7-Day Activity Chart States

**State A: Premium User (Full Access)**
- Two chart sections:
  - Top: Calories burned bar chart (7 days)
  - Bottom: Steps progress ring (today only)
- Steps ring: `#7F7CF0` fill, center value + "of 10,000"
- Data source label: "via Apple Health"

**State B: Free User**
- Calories chart: blurred with lock overlay
- Steps ring: fully visible (Free feature)
- "Unlock full activity analytics with Premium" on chart section

#### Past Workouts Card
- Scrollable list of recent completed workouts (last 7 days)
- Each entry: day + date, workout name, duration, calories, exercise count
- Tappable → opens completed workout detail/log
- "View All Workouts →" link
- Empty state: "No workouts completed yet. Your completed workouts will appear here."

#### Interactions
- **Next Workout Tap:** Opens Workout Detail Page
- **"Start Workout" CTA:** Enters Workout Execution Flow
- **Day Chip Tap:** Opens Workout Detail Page for that day
- **Week Toggle:** Flips between Week 1 and Week 2 of schedule
- **Progress Metric Tap:** Expands to show daily breakdown for that metric
- **Chart Bar Tap:** Shows tooltip with exact value (Premium only)
- **Past Workout Tap:** Opens completed workout detail
- **Quick Reply Chip Tap:** Pre-fills Coach Chat with that question
- **Locked Cards Tap:** Premium paywall modal

---

### Screen 4: Coach Chat Panel

**Purpose:** A conversational interface for personalized coaching. Uses a hybrid AI + rule-based engine that grounds every response in the user's actual plan data, logged meals, workout history, and recovery metrics.

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Close     Coach Chat                 │
├─────────────────────────────────────────┤
│                                          │
│  ┌─── Chat Header ─────────────────┐    │
│  │  [Coach Avatar]                 │    │  ← Coach persona avatar
│  │  Coach Marcus                   │    │  ← Coach name
│  │  AI + rule-based coaching       │    │  ← Subtitle
│  │  Based on your plan & data      │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ──────── Chat Messages ────────────     │
│                                          │
│  ┌──────────────────────────────┐       │
│  │  [Coach]  How can I help     │       │  ← Coach opening message
│  │  with your nutrition today?  │       │     (contextual to entry tab)
│  │                    10:30 AM  │       │
│  └──────────────────────────────┘       │
│                                          │
│  ┌─── Quick Replies ─────────────┐      │
│  │ ["How's my nutrition?"]       │      │  ← Tappable suggestion chips
│  │ ["What's my next workout?"]   │      │
│  │ ["How's my recovery?"]        │      │
│  │ ["Suggest a meal plan"]       │      │
│  └────────────────────────────────┘      │
│                                          │
│  ┌──────────────────────────────┐       │
│  │              [User]          │       │  ← User message (right-aligned)
│  │    Am I getting enough       │       │     Purple-blue bubble
│  │    protein today?            │       │
│  │                    10:31 AM  │       │
│  └──────────────────────────────┘       │
│                                          │
│  ┌──────────────────────────────┐       │
│  │  [Coach]  You've logged      │       │  ← Coach response (left-aligned)
│  │  85g of protein so far       │       │     Muted purple-blue bubble
│  │  today. Your daily target    │       │
│  │  is 120g.                     │       │
│  │                               │       │
│  │  You're at 71% — doing       │       │
│  │  well! Aim for 35g more at   │       │
│  │  dinner. Here are some       │       │
│  │  high-protein ideas:         │       │
│  │  • Grilled chicken (25g)     │       │
│  │  • Greek yogurt (20g)        │       │
│  │                    10:31 AM  │       │
│  └──────────────────────────────┘       │
│                                          │
│  ... (conversation continues) ...         │
│                                          │
├─────────────────────────────────────────┤
│  ┌─── Quick Replies ─────────────┐      │
│  │ ["Thanks!"] ["More ideas"]    │      │  ← Contextual quick replies
│  └────────────────────────────────┘      │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │  Ask your coach anything...   ▶ │    │  ← Chat input (pill)
│  └─────────────────────────────────┘    │
│                                          │
└─────────────────────────────────────────┘
```

#### Chat Entry Context
- The coach's opening message adapts based on which tab the user entered from:
  - From Recovery: "How can I help with your recovery today?"
  - From Nutrition: "How can I help with your nutrition today?"
  - From Activity: "How can I help with your training today?"
- Coach has access to the relevant data context:
  - From Recovery: sleep data, HRV, mood, recovery score
  - From Nutrition: today's macros, recent meals, calorie trends
  - From Activity: next workout, schedule, weekly progress

#### Quick Reply Chips
- Initial chips (pre-first-message): 3-4 common topic starters
- Contextual chips (post-response): 2-3 follow-up suggestions based on coach's last response
- Chip style: `#f1f0ff` bg, `#7F7CF0` text, 13px Medium, pill shape, 36px height
- Tapping a chip sends it as a user message immediately

#### Message States

**State A: Typing Indicator**
- Animated three-dot indicator in coach bubble
- "Coach is typing..." subtitle (optional)
- Dots pulse sequentially (300ms stagger, 1s loop)

**State B: AI Generation Failed**
- Coach bubble: "I'm having trouble answering that right now. Try asking about your nutrition, workouts, or recovery."
- Fallback to rule-based suggestions: "In the meantime, you can check your daily nutrition card or next workout for updates."

**State C: Off-Topic Query**
- Coach bubble: "I'm here to help with your fitness and nutrition! Try asking about your meals, workouts, recovery, or goals."
- Suggests on-topic examples via quick reply chips

**State D: Data Not Available**
- Coach bubble: "I don't have enough data to answer that yet. Try logging a few meals or completing a workout first, and I'll have more to work with!"
- Relevant CTA: "Log your first meal" or "Start a workout"

#### Conversation Data Context
The hybrid engine draws from these data sources to personalize responses:

| Data Source | Accessed For |
|-------------|-------------|
| User profile & goals | Baseline personalization, goal-aware recommendations |
| Today's food log (Log Book) | Nutrition questions, macro analysis, meal suggestions |
| Workout schedule & history | Training questions, progress analysis, workout advice |
| Recovery data (sleep, HRV, mood) | Recovery questions, training readiness, lifestyle advice |
| Activity data (steps, calories) | Activity questions, energy balance, daily movement |

#### Free User State
- Chat panel accessible but read-only
- Coach greeting visible
- Message input and quick replies replaced with paywall:
  - "Chat with your personal coach — unlock with Premium"
  - "Start Free Trial" CTA
  - Feature list: "✓ Personalized nutrition advice, ✓ Workout recommendations, ✓ Recovery insights, ✓ Real-time answers based on your data"

#### Interactions
- **Message Send:** Text input + send button, or tap quick reply chip
- **Chat Scroll:** Auto-scroll to bottom on new messages
- **Quick Reply Chip:** Tap → instantly sent as user message → coach responds
- **Close Chat:** ← back to the Coach tab user came from
- **Long Press Message:** Copy text (no edit/delete in MVP)

---

### Screen 5: Premium Paywall Modal (Coach)

**Purpose:** Triggered when Free user attempts to access Premium features in the Coach.

#### Layout

```
┌─────────────────────────────────────────┐
│  [Dimmed background — Coach tab]         │
│                                          │
│  ┌───────────────────────────────────┐  │
│  │         🧠                        │  │  ← Contextual icon (changes per feature)
│  │                                   │  │
│  │  Unlock Premium Coaching          │  │  ← 22px Bold
│  │                                   │  │
│  │  Get personalized insights,       │  │  ← Feature-specific copy
│  │  recovery tracking, AI chat       │  │
│  │  coaching, and more.              │  │
│  │                                   │  │
│  │  ✓ Full Recovery Score            │  │  ← Feature list
│  │  ✓ Sleep Stage Analysis            │  │
│  │  ✓ HRV Tracking                   │  │
│  │  ✓ 7-Day Nutrition Charts         │  │
│  │  ✓ 7-Day Activity Charts          │  │
│  │  ✓ Weekly Progress Insights       │  │
│  │  ✓ Coach Chat — AI Coaching       │  │
│  │  ✓ Nutrition Coach Access         │  │
│  │  ✓ Activity Coach Access          │  │
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
| Full Recovery Score | "Unlock Recovery Insights" | 🛌 | "See your complete recovery picture — sleep, HRV, mood, and activity combined" |
| Sleep Stages | "Unlock Sleep Analysis" | 😴 | "Understand your sleep quality with deep, light, REM, and awake stage breakdowns" |
| HRV Tracking | "Unlock HRV Monitoring" | 🫀 | "Track your heart rate variability to optimize training intensity" |
| 7-Day Nutrition Chart | "Unlock Nutrition Trends" | 📊 | "See your weekly calorie and macro patterns to stay on track" |
| 7-Day Activity Chart | "Unlock Activity Analytics" | 📊 | "Track calories burned and steps over time to measure progress" |
| Weekly Progress | "Unlock Progress Insights" | 📈 | "Monitor completion rate, consistency, and training volume week over week" |
| Coach Chat | "Unlock AI Coach Chat" | 💬 | "Chat with your personal AI coach powered by your actual plan and data" |

#### Design Notes
- Modal: centered card, 320px width, 20px border radius
- Backdrop: `rgba(0, 0, 0, 0.5)` dim
- Dismissable by tapping backdrop or "Maybe Later"
- Feature list: checkmark icons in `#10B981` (green)
- "Start Free Trial": full-width purple-blue pill (52px height)
- "Maybe Later": text link, `#64748b`, centered below CTA

---

## Coach — Full State Machine

```
[Bottom Nav — Coach Tab]
         │
         ▼
[Coach — Recovery Tab (default)]
    │    │         │
    │    ├─────────┼────────── [Swipe or tap tab]
    │    ▼         ▼              ▼
    │  [Nutrition Tab]  [Activity Tab]
    │
    ├── Recovery Score tap → [Score Breakdown: sleep/mood/HRV/activity contributions]
    ├── Sleep card → [Sleep Stages expanded / Sleep FAQ overlay]
    ├── HRV card → [HRV 7-day trend mini chart]
    ├── Mood chip → [Mood saved confirmation]
    ├── Manual Sleep → [Time pickers] → Save
    ├── Locked card → [Premium Paywall Modal]
    │                   ├── "Start Free Trial" → Subscription flow
    │                   └── "Maybe Later" → Dismiss
    │
    ├── Nutrition Tab:
    │   ├── Macro bar → [Expanded per-meal breakdown]
    │   ├── "View Full Log Book" → [Navigate: Log Book daily view]
    │   ├── 7-Day Chart bar → [Daily detail tooltip]
    │   ├── Quick reply chip → [Coach Chat with pre-filled question]
    │   ├── "Chat with Coach" → [Coach Chat Panel]
    │   └── Locked chart → [Premium Paywall Modal]
    │
    ├── Activity Tab:
    │   ├── Next Workout card → [Workout Detail Page]
    │   ├── "Start Workout" → [Workout Execution Flow]
    │   ├── Day chip → [Workout Detail Page for that day]
    │   ├── Progress metric → [Metric daily breakdown]
    │   ├── Chart bar → [Daily detail tooltip]
    │   ├── Past Workout → [Completed workout detail]
    │   ├── Quick reply chip → [Coach Chat with pre-filled question]
    │   ├── "Chat with Coach" → [Coach Chat Panel]
    │   └── Locked cards → [Premium Paywall Modal]
    │
    └── Coach Chat Panel:
        ├── User types/sends message → [AI + rule-based response engine]
        │   ├── Response generated → [Coach message displayed]
        │   └── Generation failed → [Fallback message + rule-based suggestions]
        ├── Quick reply chip → [Sent as user message → coach responds]
        ├── "Close" → [Return to originating Coach tab]
        └── Free user → [Read-only with paywall overlay]
```

---

## Interactions & Animations

| Interaction | Animation | Timing |
|------------|-----------|--------|
| Tab switch (Recovery/Nutrition/Activity) | Content cross-fade + tab indicator slide | 250ms ease-out |
| Recovery score gauge fill | SVG stroke-dashoffset arc animation | 800ms ease-out |
| Sleep stages expand/collapse | Height transition (slide-down) | 300ms ease-out |
| Mood chip selection | Scale bounce (1.0 → 0.9 → 1.1 → 1.0) + border color transition | 300ms spring |
| Mood saved confirmation | Checkmark draw-on + fade-in text | 400ms ease-out |
| Macro progress bar update | Smooth width transition | 400ms ease-out |
| 7-Day chart bar tap | Bar highlight + tooltip fade-in | 200ms ease-out |
| Day chip selection | Scale-down (0.95) + background color transition | 200ms ease-out |
| Week toggle (schedule) | Slide-out + slide-in (direction-aware) | 250ms ease-out |
| Steps ring fill | SVG stroke-dashoffset animation | 600ms ease-out |
| Coach Chat open | Slide-up from bottom (full-screen or 85% height panel) | 300ms ease-out |
| Quick reply chip tap | Brief scale-down (0.95) + background darken | 150ms |
| Chat message send | Message bubble slide-up from input area | 200ms ease-out |
| Coach typing indicator | Three-dot sequential pulse | 300ms stagger, 1s loop |
| Coach response appear | Fade-in + slide-up (10px) | 300ms ease-out |
| Premium paywall modal | Scale-in (0.9 → 1.0) + backdrop fade | 350ms ease-out |
| Data refresh (pull-to-refresh) | Spinner + content update | Pull-gesture driven |
| Insight card update | Subtle background pulse (highlight new insight) | 500ms ease-out |

---

## Empty States

| Screen / State | Empty State Message | Action |
|---------------|-------------------|--------|
| Recovery Tab (no data) | "Connect Apple Health or Google Fit to start tracking your recovery." | "Connect" CTA |
| Recovery Score (insufficient data) | "Not enough data yet. Complete your profile and connect Apple Health to get your recovery score." | "Connect Apple Health" button |
| Sleep (no data source) | "No sleep data detected. Connect Apple Health or Google Fit, or enter manually." | "Connect" + "Enter Manually" (Premium) |
| Sleep (manual entry, no entries) | "No sleep entries yet. Add your bedtime and wake time to start tracking." | "Add Sleep Data" button |
| HRV (no Apple Watch) | "HRV data requires an Apple Watch. Data will appear here when available." | Informational only |
| Mood (already checked in) | "You're feeling Good today. Come back tomorrow for your next check-in." | "Change" link |
| Nutrition Tab (no foods logged) | "Start logging meals in the Log Book to see your nutrition summary here." | "Go to Log Book" button |
| Nutrition Tab (7-day chart, no data) | "Log meals for a few days to see your weekly nutrition trends." | "Log Your First Meal" CTA |
| Activity Tab (no workouts scheduled) | "No workouts scheduled. Build a plan with your coach to get started." | "Build with Coach" (Premium) or "Browse Library" |
| Activity Tab (no past workouts) | "No workouts completed yet. Your completed workouts will appear here." | "Start a Workout" CTA |
| Activity Tab (no steps data) | "Connect Apple Health or Google Fit to track your daily steps." | "Connect" CTA |
| Coach Chat (no messages) | "Ask your coach anything about your nutrition, workouts, or recovery!" | Quick reply chips |
| Coach Chat (Free user) | "Chat with your personal coach — unlock with Premium" | "Start Free Trial" CTA |

---

## Accessibility Requirements

- **Contrast:** Minimum 4.5:1 for body text; 3:1 for large numbers and UI components
- **Recovery Score:** Always show text label ("Good", "Fair", "Low") alongside the colored gauge — don't rely on color alone
- **Macro Colors + Labels:** Always show macro name text alongside colored bars (Protein/Carbs/Fat)
- **Mood Chips:** Each mood chip must have a text label ("Great", "Good", etc.) — don't rely on emoji alone
- **Text Scaling:** Support dynamic type up to 150% without layout breaking
- **Touch Targets:** All tappable elements minimum 44x44px; mood chips 56x56px
- **ARIA Labels:**
  - Recovery score gauge: "Recovery score: 78 out of 100. Good."
  - Sleep stages: "Deep sleep: 2 hours. Light sleep: 3 hours. REM: 1.5 hours. Awake: 0.5 hours."
  - HRV: "Heart rate variability: 48 milliseconds. Up 12 percent from yesterday."
  - Mood chips: "Mood: Great", "Mood: Good", etc.
  - Steps ring: "Steps: 8,450 of 10,000. 85 percent complete."
  - Progress metrics: "Completion rate: 80 percent. Up 5 percent from last week."
  - Coach Chat messages: Announce sender ("Coach says:" or "You said:") before message content
- **Focus Order:** Tab bar → Recovery score → Sleep → HRV → Mood → Nutrition/Activity cards → Quick actions → Bottom nav
- **Coach Chat Focus Order:** Chat header → Message list (chronological) → Quick replies → Input field
- **Reduced Motion:** Disable gauge fill animations, ring animations, pulse effects, and chat bubble slide-ups for users with reduced motion preference
- **Screen Reader Announcements:** Announce recovery score, mood confirmation, new chat messages, and tab switches
- **VoiceOver/TalkBack during Chat:** Auto-focus new messages. Announce typing indicator as "Coach is typing."

---

## Iconography

**Style:** Outlined, 2px stroke, consistent with SF Symbols or Material Icons.

| Feature | Icon | Notes |
|---------|------|-------|
| Coach (tab) | 🧠 or 👤 (person/brain) | Tab bar icon, filled when active |
| Recovery (sub-tab) | 🛌 or ♥ (heart/sleep) | Recovery tab icon |
| Nutrition (sub-tab) | 🍎 or 🥗 (apple/salad) | Nutrition tab icon |
| Activity (sub-tab) | 🏋️ or ⚡ (barbell/lightning) | Activity tab icon |
| Recovery Score | Gauge/donut | Custom gauge graphic |
| Sleep | 😴 or 🌙 (moon) | Sleep data |
| Sleep — Deep | 💤 | Deep sleep stage |
| Sleep — Light | 🌓 | Light sleep stage |
| Sleep — REM | 🧠 | REM sleep stage |
| Sleep — Awake | 👁️ | Awake during sleep |
| HRV | 🫀 or 📊 (heart/ecg) | Heart rate variability |
| Mood — Great | 😊 | Mood emoji |
| Mood — Good | 🙂 | Mood emoji |
| Mood — Okay | 😐 | Mood emoji |
| Mood — Bad | 😕 | Mood emoji |
| Mood — Terrible | 😞 | Mood emoji |
| Calories | 🔥 | Calorie indicator |
| Protein | 🥩 or egg | Protein macro |
| Carbs | 🍞 or wheat | Carbs macro |
| Fat | 🧈 or droplet | Fat macro |
| Chart | 📊 | 7-day charts |
| Progress | 📈 | Progress insights, trends |
| Steps | 👣 | Steps tracking |
| Workout | 🏋️ | Scheduled workout |
| Rest Day | 😴 | Rest day indicator |
| Completed | ✓ or ✅ | Completed workout/check-in |
| Schedule | 📅 | 2-week schedule |
| Coach Chat | 💬 | Chat access |
| Chat Send | ▶ or ↗️ | Send message (inside circle) |
| Quick Reply | 💬 or chip | Quick reply suggestion |
| Premium/Lock | 🔒 | Premium feature lock |
| Data Source | Apple Health / Google Fit icon | Small platform icon |
| Trend Up | ↑ | Improving metric |
| Trend Down | ↓ | Declining metric |
| Trend Stable | → | Stable metric |
| Info | ⓘ | FAQ, explanations, tooltips |
| Insights | 💡 | Coach context/insight card |
| Close | ✕ | Close modal or chat |
| Settings | ⚙️ | Connect health platforms |
| Add | + | Manual entry, add data |

---

## Premium Free vs. Premium Feature Summary (UI Level)

| UI Element | Free | Premium |
|------------|------|---------|
| Recovery Tab — view | Full | Full |
| Nutrition Tab — view | Full | Full |
| Activity Tab — view | Full | Full |
| Tab switching | Full | Full |
| Recovery Score Gauge | View (full) | View + contributing factor breakdown |
| Sleep Duration Display | Full | Full |
| Sleep Stages Breakdown | Locked (blurred preview) | Full + FAQ access |
| Manual Sleep Entry | Locked | Full |
| HRV Display | Locked | Full (if Apple Watch available) |
| Mood Check-in | Full | Full |
| Mood Saved to Log | Full | Full |
| Today's Nutrition Card (macros) | Full | Full |
| 7-Day Nutrition Chart | Locked (blurred preview) | Full |
| Coach Insight Cards | Full (basic) | Full (enhanced, more data-driven) |
| Next Workout Card | Full | Full |
| 2-Week Workout Schedule | Full | Full |
| Weekly Progress Insights | Locked | Full |
| 7-Day Calories & Steps Chart | Steps only (Free) | Full calories + steps |
| Past Workouts | Full | Full |
| Daily Steps Insights | Full | Full |
| Coach Chat — View entry point | Full (read-only) | Full |
| Coach Chat — Send messages | Locked | Full |
| Coach Chat — Receive AI responses | Locked | Full |
| Coach Chat — Quick reply chips | Locked | Full |
| Data source labels | Full | Full |

---

## Reference Apps & Design Patterns

### Competitive Inspiration

| Reference | What to Learn |
|-----------|--------------|
| **Whoop** | Recovery score visualization, sleep stage breakdown UI, strain/recovery balance presentation |
| **Oura** | Readiness score gauge, sleep stage chart, HRV trend display, mood/readiness correlation |
| **Fitbod** | Recovery-based workout recommendations, "ready to train" indicator, weekly progress metrics |
| **Freeletics** | Coach tab structure, digital coach persona, AI-generated workout plans, coach chat interface |
| **MyFitnessPal** | Nutrition macro progress bars, daily calorie ring, weekly nutrition charts |
| **Cronometer** | Micronutrient breakdown vs RDV, daily nutrition summary cards, macro trend charts |
| **Apple Health** | Sleep data import UI, HRV display, steps and activity rings, data source attribution |
| **Strong.app** | Workout schedule calendar view, completed workout list, weekly volume tracking |
| **Hevy** | Weekly progress insights (consistency, volume), past workout summaries |
| **Whoop Coach / Oura Advisor** | AI coaching chat UX, personalized responses based on wearable data, quick reply suggestions |

### Pinterest Design References

| Pin / Designer | Key Elements to Reference |
|----------------|--------------------------|
| **Whoop Dashboard Redesign Concepts** | Recovery score gauge (large arc with score center), sleep stage horizontal bar breakdown, strain/recovery balance with color coding |
| **Oura Readiness Score UI** | Circular readiness gauge with contributing factor rings, sleep stage timeline visualization, HRV trend mini chart |
| **Fitbod Recovery & Training Readiness** | Recovery-based workout recommendation card, "ready to train" / "focus on recovery" messaging, weekly progress metric cards |
| **AI Fitness Coach Chat Interfaces** | Chat bubble design for coach/user, quick reply suggestion chips above input, contextual greeting messages based on user state |
| **CIPHERSLAB NutritionHub / Nutrisee** | Daily nutrition summary cards with macro progress bars, weekly calorie trend bar charts, coaching insight cards with lightbulb icon |
| **Fitness Dashboard UI Kits (dark + light)** | Tab bar design (Recovery/Nutrition/Activity), data-rich metric cards with trend indicators, card-based dashboard layout |
| **Health & Wellness App Dashboard Designs** | Sleep stages visualization (horizontal stacked bar), mood check-in emoji chip selector, recovery score gauge with contributing factors |
| **Workout Schedule Calendar UI** | 2-week schedule with day chips, completed/scheduled/rest day indicators, week toggle navigation |
| **Steps & Activity Ring Designs** | Steps progress ring with center value, calories burned bar chart, Apple Health / Google Fit data source badges |
| **Mobile Coach / AI Assistant Chat Screens** | Coach avatar in chat header, personalized greeting context, AI response formatting with bullet points and suggestions |

---

## Implementation Notes

1. **Shared State Management:** All three Coach sub-tabs pull from shared data sources. The Recovery Tab reads from Apple Health/Google Fit + local mood log. The Nutrition Tab reads from the Log Book's daily food state. The Activity Tab reads from the Workout Tab's schedule and history state. Use a centralized data access layer with reactive bindings.

2. **Recovery Score Calculation:** The composite score is derived from multiple weighted inputs (sleep, HRV, mood, previous day's activity). Implement as a pure function: `calculateRecoveryScore(sleep, hrv, mood, activity) → { score, label, insight, contributingFactors }`. This runs client-side on data refresh.

3. **Health Platform Integration:** Apple Health (HealthKit) and Google Fit require platform-specific native modules. Implement a unified abstraction: `HealthDataProvider.getSleepData()`, `HealthDataProvider.getHRV()`, `HealthDataProvider.getSteps()`. Handle permissions, background refresh, and data staleness gracefully.

4. **Real-Time Data Refresh:** When the user logs food (in Log Book) or completes a workout (in Workout Tab), the Coach's Nutrition and Activity tabs should reflect the update on next visit. Use a pub/sub or shared state store to notify the Coach of relevant changes.

5. **Coach Chat Response Engine:** The hybrid AI + rule-based engine requires:
   - **Intent detection:** Classify user message into recovery, nutrition, activity, or general category
   - **Data lookup:** Fetch relevant user data for the detected intent
   - **Response generation:** AI model (LLM) generates a response grounded in the fetched data + coaching rules
   - **Fallback:** If AI fails or confidence is low, use rule-based templated responses
   - **Context window:** Include recent conversation history + essential user data in the AI prompt

6. **Mood Check-in Persistence:** Mood is saved as a simple record: `{ date, mood, timestamp }`. One entry per day. Store locally and sync to backend. The mood chip UI should check for an existing entry on load.

7. **Sleep Stages Chart:** Render as a horizontal stacked bar. Each stage (Deep, Light, REM, Awake) is a colored segment proportional to its duration. Total width = total sleep duration. Premium users see the full chart; Free users see only the total duration number.

8. **HRV Data Limitations:** HRV is only available from Apple Health (requires Apple Watch). Android users (Google Fit) won't have HRV data. Hide the HRV card entirely for Android users rather than showing an error, or show a platform-appropriate message.

9. **7-Day Charts:** Both the Nutrition calorie chart and Activity calories chart use the same bar chart component. The Nutrition chart overlays a calorie target line; the Activity chart optionally overlays steps (as a second chart or line). Reuse the same chart component with different data configurations.

10. **2-Week Schedule Sync:** The Activity Tab's 2-Week Schedule reads from the same data source as the Workout Tab's 2-Week Schedule (Coach Activity Tab). They should always be in sync — changes in one reflect in the other.

11. **Weekly Progress Calculation:** Completion rate = workouts completed / workouts scheduled (as %). Consistency = days with any logged activity / 7. Volume = sum of (sets × reps × weight) or similar metric. Calculate these weekly and compare to the previous week for trend arrows.

12. **Coach Chat Session Management:** MVP implements single-session context (no long-term memory). Conversation context persists within a session but resets when the chat panel is closed. Future iterations can add persistent conversation history.

13. **Premium Feature Gating:** Each Premium-gated card should check subscription status before rendering. Use a single `isPremium` check that gates the data fetch + UI rendering. Free users see locked card variants with appropriate upsell copy.

14. **Data Source Attribution:** Always show where data came from ("via Apple Health", "via Google Fit", "Manual entry"). This builds transparency and helps users troubleshoot missing data.

15. **Coach Persona Consistency:** The coach avatar, name, and tone should be consistent across all three tabs and the chat. Pull the user's selected coach persona from onboarding state. Different personas may have subtly different language styles but the same underlying response engine.

16. **Offline Support:** Cache the last successful data fetch for each tab. Show cached data with a "Last updated: [timestamp]" label when offline. Coach Chat requires connectivity — show "Offline — chat unavailable" when disconnected.

17. **Performance — Chart Rendering:** Use native chart libraries (e.g., `react-native-chart-kit`, `Victory Native`, or `fl_chart` for Flutter) for smooth 60fps chart rendering. Avoid SVG-based charts on mobile if performance is a concern.

18. **Accessibility — Recovery Score:** The recovery score gauge should be accompanied by a text alternative: "Your recovery score is 78 out of 100. This is considered Good." VoiceOver/TalkBack should read this, not just "78 percent."

19. **Dark Mode:** All Coach screens should have dark mode equivalents. In dark mode:
   - Background: `#0F172A`
   - Card background: `#1E293B`
   - Tab bar background: `#1E293B`
   - Text primary: `#F1F5F9`
   - Text secondary: `#94A3B8`
   - Purple-blue muted (`#f1f0ff`) → `#312E81` (dark indigo)
   - Recovery score gauge track: `#374151`
   - Coach chat coach bubble: `#312E81`, text: `#E0E7FF`
   - Coach chat user bubble: `#7F7CF0` (unchanged), text: white
   - Chart bars: `#7F7CF0` (unchanged)
