# UI Implementation Prompt: Coach (Strivio)

## Context

The Coach is the **digital personal trainer** of the Strivio fitness & nutrition coaching app. It serves as the primary touchpoint for personalized, data-driven guidance across three pillars: **Recovery**, **Nutrition**, and **Activity**. The Coach combines AI-powered conversational coaching with visual dashboards that synthesize data from Apple Health, Google Fit, the Log Book, and the Workout Tab.

**Role in the app:** The Coach is one of four main pages (Home, Logbook, Coach, More) and represents the most direct form of digital coaching. It must balance **insightful data visualization** (recovery scores, nutrition trends, workout progress) with **conversational accessibility** (the Coach Chat). The freemium model gates depth features (sleep stages, HRV, 7-day charts, Coach Chat) while keeping core overview features free.

**Key differentiator:** Three-tab structure mirrors coaching domains (Recovery/Nutrition/Activity), with a unified Coach Chat accessible from all tabs. The Recovery-first default signals a holistic coaching philosophy — the app cares about the whole athlete, not just workouts.

---

## Platform
- **Type:** Mobile App (iOS & Android)
- **Recommended Framework:** React Native (with native UI components) or Flutter
- **Orientation:** Portrait only
- **Status Bar:** Dark status bar (dark text on white/light background)

## Screen Dimensions
- **Mobile Standard:** 375px width (iPhone 13/14) x 812px height
- **Safe Area:** Account for notch (44px top) and home indicator (34px bottom)
- **Scrollable:** Yes — vertically scrollable within each tab; Coach Chat opens as slide-up panel or side drawer

## Visual Design Direction
- **Style:** Clean, modern card-based layout consistent with the Log Book, Home, and Workout Tab — same design language, same spacing, same components
- **Primary Color Scheme:** White background with **periwinkle/purple-blue** accents (`#7F7CF0`) — warm, refined coaching aesthetic
- **Aesthetic:** Professional yet approachable. Coaching should feel supportive and intelligent, not clinical or robotic
- **Card Design:** White cards with subtle periwinkle-tinted shadows, generous padding, 20px border radius
- **Spacing:** 8px base grid; 14px gap between cards; 24px screen padding
- **Tab Bar:** Three sub-tabs (Recovery | Nutrition | Activity) at top of Coach screen, with pill-style active indicator
- **Coach Chat:** Slide-up panel (75% height) or side drawer with conversational messaging UI

---

## Shared Design Tokens

Consistent with Log Book, Home, Workout Tab, Onboarding, and Auth screens.

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary Purple-Blue | `#7F7CF0` | Buttons, selected states, progress fills, active icons, tab indicators |
| Primary Purple-Blue Light | `#9794F3` | Hover/active button states, pressed states |
| Primary Purple-Blue Muted | `#f1f0ff` | Unselected card backgrounds, inactive elements, sleep stage backgrounds |
| Background | `#FFFFFF` | Primary page background |
| Background Alt | `#F5F6FA` | Secondary page background |
| Surface White | `#FFFFFF` | Card backgrounds |
| Surface Variant | `#f8f8f8` | Alternative card backgrounds |
| Text Primary | `#0f172a` | Main text, labels, numbers |
| Text Secondary | `#525252` | Captions, descriptions, secondary info |
| Text Tertiary | `#64748b` | Hints, less prominent info |
| Text Muted | `#9CA3AF` | Placeholders, disabled text |
| Premium Gold | `#F59E0B` | Premium/upgrade badges, lock icons, paywall accents |
| Premium Gold Dark | `#92400E` | Premium text on light backgrounds |
| Success Green | `#10B981` | Positive recovery score, good sleep, completed workouts |
| Warning Amber | `#F59E0B` | Moderate recovery, approaching limits |
| Error Red | `#EF4444` | Poor recovery, missed workouts, over limits |
| Info Blue | `#3b82f6` | Info callouts, HRV data |
| Sleep Deep | `#1e3a5f` | Deep sleep stage color |
| Sleep Light | `#60A5FA` | Light sleep stage color |
| Sleep REM | `#A78BFA` | REM sleep stage color |
| Sleep Awake | `#FB923C` | Awake stage color |
| Recovery Green | `#34D399` | Good recovery score |
| Recovery Yellow | `#FBBF24` | Moderate recovery score |
| Recovery Red | `#F87171` | Poor recovery score |
| Divider | `#E5E7EB` | Card borders, list separators |
| Border Card | `#f4f4f4` | Card borders |
| Shadow | `rgba(127, 124, 240, 0.06)` | Card shadows (periwinkle-tinted) |
| Chat Coach | `#f1f0ff` | Coach message bubble background |
| Chat User | `#7F7CF0` | User message bubble background |

### Typography

| Element | Font Size | Font Weight | Line Height | Font Family | Usage |
|---------|-----------|-------------|-------------|-------------|-------|
| Screen Title | 24px | 600 (SemiBold) | 30px | Outfit | "Coach" header |
| Tab Label | 14px | 600 (SemiBold) | 20px | Outfit | Recovery/Nutrition/Activity tabs |
| Card Title | 15px | 600 (SemiBold) | 20px | Outfit | Section headers within cards |
| Body Text | 14px | 400 (Regular) | 20px | Inter | Descriptions, labels |
| Body Text Bold | 14px | 600 (SemiBold) | 20px | Inter | Emphasized labels |
| Large Number | 32px | 700 (Bold) | 40px | Outfit | Recovery score, big metrics |
| Metric Value | 17px | 600 (SemiBold) | 24px | Outfit | HRV, sleep hours, steps |
| Caption | 12px | 400 (Regular) | 16px | Inter | Timestamps, hints, units |
| Button Text | 16px | 600 (SemiBold) | 20px | Inter | CTA buttons |
| Chat Message | 15px | 400 (Regular) | 22px | Inter | Chat bubble text |
| Score Label | 11px | 600 (SemiBold) | 14px | Inter | Recovery score label |

**Font Stack:** Outfit (display headings, tab labels), Inter (body, buttons, chat), SF Pro (iOS fallback), Roboto (Android fallback)

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
| Tab gap | 8px |
| Chart margin | 16px |
| Bottom safe-area padding | 28px + home indicator |
| Chat bubble padding | 12px 16px |
| Chat bubble radius | 16px (coach), 16px 16px 4px 16px (user) |

---

## Component Specifications

### Card Container
- **Background:** `#FFFFFF`
- **Border Radius:** 20px
- **Padding:** 16px 24px
- **Shadow:** `0 0 38px rgba(0, 0, 0, 0.06)`
- **Border:** `1px solid #f4f4f4` (optional)

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

### Tab Bar (Three Sub-Tabs)
- **Container:** White bg, 44px height, pill-shaped container
- **Tab Item:** 14px SemiBold, Outfit
- **Active Tab:** `#7F7CF0` text + `#f1f0ff` bg pill
- **Inactive Tab:** `#64748b` text, transparent bg
- **Active Indicator:** 4px height pill, smooth slide animation between tabs
- **Gap:** 8px between tabs

### Recovery Score Gauge
- **Size:** 140px diameter
- **Track:** `#f1f0ff` (background ring)
- **Fill:** Gradient from `#34D399` (good) → `#FBBF24` (moderate) → `#F87171` (poor)
- **Stroke Width:** 12px
- **Center Text:** Score number (32px Bold) + "Recovery" label (11px Caption)
- **Animation:** Ring fills on load (1000ms ease-out)

### Sleep Stage Bar Chart
- **Height:** 120px
- **Bar Width:** Proportional to time spent in stage
- **Colors:** Deep=`#1e3a5f`, Light=`#60A5FA`, REM=`#A78BFA`, Awake=`#FB923C`
- **Labels:** Stage name below, duration above
- **Total Duration:** Displayed at top (e.g., "7h 42m")

### Progress Ring (Steps, Daily Goals)
- **Size:** 80px diameter
- **Track:** `#E5E7EB`
- **Fill:** `#7F7CF0` or `#34D399`
- **Stroke Width:** 8px
- **Center:** Value (17px SemiBold) + unit (11px Caption)

### Nutrition Chart (7-Day)
- **Height:** 180px
- **Bar Chart:** Daily calories as bars
- **Target Line:** Horizontal dashed line across chart
- **Colors:** Under target=`#7F7CF0`, Over target=`#F87171`
- **X-Axis:** Day labels (Mon, Tue, Wed...)
- **Y-Axis:** Calorie scale

### Workout Schedule Card
- **Height:** 72px per day row
- **Left:** Day indicator (circle with date or checkmark for completed)
- **Center:** Workout name (14px SemiBold) + muscle groups (12px Caption)
- **Right:** Duration or status badge
- **Today:** Highlighted with `#7F7CF0` left border
- **Completed:** Checkmark icon, dimmed text

### Coach Chat Bubble — Coach
- **Background:** `#f1f0ff`
- **Text:** `#0f172a`, 15px Regular
- **Border Radius:** 16px 16px 16px 4px
- **Padding:** 12px 16px
- **Max Width:** 80%
- **Avatar:** Coach persona image/icon, 32px circle, left of bubble

### Coach Chat Bubble — User
- **Background:** `#7F7CF0`
- **Text:** White, 15px Regular
- **Border Radius:** 16px 16px 4px 16px
- **Padding:** 12px 16px
- **Max Width:** 80%
- **Alignment:** Right

### Chat Input Bar
- **Height:** 56px
- **Background:** White
- **Border Top:** `1px solid #E5E7EB`
- **Input Field:** `#F5F6FA` bg, 44px height, 12px radius
- **Placeholder:** "Ask your coach..." (14px, `#9CA3AF`)
- **Send Button:** `#7F7CF0` circle, 40px, paper airplane icon

### Quick-Reply Chip
- **Height:** 36px
- **Padding:** 0 16px
- **Background:** White
- **Border:** `1px solid #E5E7EB`
- **Text:** `#7F7CF0`, 13px Medium
- **Border Radius:** 9999px (pill)
- **Active:** `#f1f0ff` bg

### Premium Badge (Lock/Upgrade)
- **Icon:** Lock icon, 14px
- **Color:** `#F59E0B` (gold/amber)
- **Background:** `#FEF3C7` (light amber tint)
- **Border Radius:** 6px
- **Label Text:** "Premium", 11px, `#92400E`

### Mood Check-in Selector
- **Container:** White card with 5 mood options
- **Option Size:** 56px x 56px
- **Emoji Size:** 28px
- **Label:** 11px Caption below emoji
- **Selected:** `#f1f0ff` bg, scale(1.05)
- **Options:** 😊 Great | 🙂 Good | 😐 Okay | 😕 Bad | 😞 Terrible

---

## Screen-by-Screen Specifications

---

### Screen 1: Coach — Recovery Tab (Default)

**Purpose:** The default landing view when entering the Coach. Aggregates sleep, HRV, mood, and activity data to provide a holistic recovery picture. The Recovery-first approach signals that the app prioritizes the whole athlete's wellbeing.

#### Layout

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│  Coach                                  │  ← Screen title
│  ┌─────────────────────────────────┐    │
│  │  Recovery • Nutrition • Activity │   │  ← Tab bar (Recovery active)
│  └─────────────────────────────────┘    │
│                                          │
│  ┌─── Recovery Score ──────────────┐   │
│  │                                  │   │
│  │         ╭──────────╮             │   │
│  │        ╱     78     ╲            │   │  ← Large gauge (0-100)
│  │       │   RECOVERY   │           │   │
│  │        ╲   Good     ╱            │   │  ← Color-coded label
│  │         ╰──────────╯             │   │
│  │                                  │   │
│  │  "You're well recovered —        │   │
│  │   ready to train hard today"     │   │  ← Contextual recommendation
│  │                                  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Sleep ──────────────────────┐   │
│  │  🌙 Sleep Duration              │   │
│  │     7h 42m                     │   │  ← From Apple Health/Google Fit
│  │     [████████████░░░░] 85%     │   │  ← Progress to ideal (8h)
│  │                                  │   │
│  │  📊 Sleep Stages — Premium 🔒   │   │  ← Premium gate
│  │     [Locked preview with blur]  │   │
│  │     Upgrade to see deep, light, │   │
│  │     REM breakdown                │   │
│  │                                  │   │
│  │  [+ Add Sleep Manually] — Premium│  │  ← Manual entry (Premium)
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Heart Rate Variability ─────┐   │
│  │  💓 HRV — Premium 🔒            │   │
│  │     [Locked card with preview]  │   │
│  │     Connect Apple Watch to      │   │
│  │     unlock HRV insights         │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Mood Check-in ──────────────┐   │
│  │  How are you feeling today?     │   │
│  │                                  │   │
│  │  😊  🙂  😐  😕  😞             │   │  ← Mood selector
│  │ Great Good Okay Bad Terrible    │   │
│  │                                  │   │
│  │  [Mood saved: Good ✓]           │   │  ← After selection
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Talk to Coach ──────────────┐   │
│  │  💬 Have questions about your   │   │
│  │     recovery or today's workout?│   │
│  │     [Chat with Coach — Premium] │   │  ← Opens Coach Chat
│  └──────────────────────────────────┘   │
│                                          │
│  [Home] [Workouts] [Logbook] [Coach] [More] │ ← Bottom nav (Coach active)
└─────────────────────────────────────────┘
```

#### States

**State A: Premium User with Full Data**
- Recovery score gauge with color-coded fill
- Sleep stages bar chart (deep/light/REM/awake)
- HRV value with trend indicator (↑ improving)
- Mood already saved shows selected state
- Coach Chat button active

**State B: Free User**
- Recovery score shows locked state with preview blur
- Sleep stages locked with upgrade prompt
- HRV card locked
- Mood check-in fully functional (Free feature)
- Coach Chat shows Premium gate

**State C: No Health Data Connected**
- Sleep card shows: "Connect Apple Health or Google Fit"
- HRV shows: "HRV requires Apple Watch"
- Manual sleep entry available (Premium)
- Prompt to connect health platforms

#### Interactions
- **Tab Swipe:** Swipe left → Nutrition Tab, Swipe right → Activity Tab
- **Recovery Score Tap:** Expand to see breakdown (sleep % + mood % + HRV % + activity %)
- **Sleep Card Tap:** If Premium → expand to full sleep details; if Free → paywall modal
- **Mood Selection:** Single tap, immediate save, subtle animation
- **Coach Chat Tap:** Opens slide-up chat panel (Premium) or paywall (Free)

---

### Screen 2: Coach — Nutrition Tab

**Purpose:** The coach's-eye view of dietary intake. Aggregates data from the Log Book and presents it as actionable insights rather than raw logs. Links to Log Book for detailed view.

#### Layout

```
┌─────────────────────────────────────────┐
│  ← Back (if from Log Book link)         │
│  Coach                                  │
│  ┌─────────────────────────────────┐    │
│  │  Recovery • Nutrition • Activity │   │  ← Nutrition active
│  └─────────────────────────────────┘    │
│                                          │
│  ┌─── Today's Nutrition ───────────┐   │
│  │  📊 Macros vs Targets           │   │
│  │                                  │   │
│  │  Calories                        │   │
│  │  ████████████░░░░  1,850/2,200 │   │
│  │  84% • 350 kcal remaining       │   │
│  │                                  │   │
│  │  Protein                         │   │
│  │  ████████░░░░░░░░  85/120g     │   │
│  │  71% • 35g remaining            │   │
│  │                                  │   │
│  │  Carbs                           │   │
│  │  ████████░░░░░░░░  160/220g    │   │
│  │  73% • 60g remaining            │   │
│  │                                  │   │
│  │  Fat                             │   │
│  │  ████████████░░░░  55/65g      │   │
│  │  85% • 10g remaining            │   │
│  │                                  │   │
│  │  [View Full Log →]              │   │  ← Links to Log Book
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── 7-Day Nutrition Chart ──────┐   │
│  │  📈 Calorie Trends — Premium 🔒 │   │
│  │                                  │   │
│  │     ┌┐ ┌┐ ┌┐ ┌┐ ┌┐ ┌┐ ┌┐       │   │  ← Bar chart preview
│  │     ││ ││ ││ ││ ││ ││ ││       │   │     (blurred for Free)
│  │     └┘ └┘ └┘ └┘ └┘ └┘ └┘       │   │
│  │     M  T  W  T  F  S  S         │   │
│  │                                  │   │
│  │  Upgrade to see your weekly     │   │
│  │  nutrition patterns and trends  │   │
│  │                                  │   │
│  │  [Start Free Trial]             │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Nutrition Insights ─────────┐   │
│  │  💡 Coach Tip                   │   │
│  │  "You're consistently hitting   │   │
│  │   your protein goal. Great      │   │
│  │   work on recovery nutrition!"  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Talk to Coach ──────────────┐   │
│  │  💬 Ask about your nutrition    │   │
│  │     "Am I getting enough        │   │
│  │      protein?"                  │   │
│  │     [Chat with Coach — Premium] │   │
│  └──────────────────────────────────┘   │
│                                          │
└─────────────────────────────────────────┘
```

#### States

**State A: Data Present (Free)**
- Today's nutrition card with live macro bars
- 7-day chart locked with preview
- Quick tip based on recent data
- Coach Chat entry point visible but gated

**State B: Premium User**
- Full 7-day bar chart with target line
- Days over/under target color-coded
- Tap any bar → see that day's details
- Coach Chat fully functional

**State C: No Foods Logged**
- Macro bars show 0/0 with "Start logging"
- Empty chart with CTA to Log Book
- Tip: "Log your first meal to get nutrition insights"

#### Interactions
- **Macro Bar Tap:** Opens Log Book for that macro's detailed view
- **7-Day Chart Bar Tap:** (Premium) Show that day's calorie breakdown
- **"View Full Log" Tap:** Navigate to Log Book
- **Coach Chat Tap:** Opens chat primed with nutrition context

---

### Screen 3: Coach — Activity Tab

**Purpose:** The coaching hub for workout planning and progress tracking. Shows upcoming workouts, 2-week schedule, and activity insights. Works with Workout Tab (execution) and Log Book (nutrition).

#### Layout

```
┌─────────────────────────────────────────┐
│  Coach                                  │
│  ┌─────────────────────────────────┐    │
│  │  Recovery • Nutrition • Activity │   │  ← Activity active
│  └─────────────────────────────────┘    │
│                                          │
│  ┌─── Next Workout ───────────────┐   │
│  │  🏋️ Upper Body Strength         │   │
│  │     Today, 5:00 PM              │   │
│  │     Chest, Shoulders, Triceps   │   │
│  │     ~45 minutes                 │   │
│  │                                  │   │
│  │  [Start Workout →]              │   │  ← Links to Workout Tab
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── 2-Week Schedule ────────────┐   │
│  │  📅 Your Workout Plan           │   │
│  │                                  │   │
│  │  ┌──────────────────────────┐  │   │
│  │  │ ● Mon  Upper Body    ✓   │  │   │  ← Completed
│  │  │ ● Tue  Rest Day          │  │   │
│  │  │ ● Wed  Lower Body    ✓   │  │   │
│  │  │ ● Thu  Rest Day          │  │   │
│  │  │ ● Fri  HIIT Cardio   ✓   │  │   │
│  │  │ ● Sat  Full Body     ▶   │  │   │  ← Today (highlighted)
│  │  │ ○ Sun  Rest Day          │  │   │
│  │  │ ○ Mon  Upper Body          │  │   │  ← Upcoming
│  │  │ ○ Tue  Rest Day          │  │
│  │  │ ... (scrollable)           │  │
│  │  └──────────────────────────┘  │   │
│  │                                  │   │
│  │  [View Full Schedule →]         │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Weekly Progress ────────────┐   │
│  │  📊 This Week — Premium 🔒      │   │
│  │                                  │   │
│  │  Completion    ████████░░  80% │   │
│  │  Consistency   █████████░  90% │   │
│  │  Volume        ↑ 5% vs last week│  │
│  │                                  │   │
│  │  [Unlock Full Insights]         │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Activity Stats ─────────────┐   │
│  │  👟 Steps Today                 │   │
│  │     8,450 / 10,000 steps        │   │
│  │     [████████████░░░░] 84%     │   │
│  │                                  │   │
│  │  🔥 7-Day Burned Calories — 🔒  │   │  ← Premium
│  │     [Locked chart preview]      │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Past Workouts ──────────────┐   │
│  │  📝 Recent Activity             │   │
│  │  ┌──────────────────────────┐  │   │
│  │  │ Upper Body Strength      │  │   │
│  │  │ Yesterday • 48 min • ✓   │  │   │
│  │  └──────────────────────────┘  │   │
│  │  ┌──────────────────────────┐  │   │
│  │  │ HIIT Cardio              │  │   │
│  │  │ Wed • 32 min • ✓         │  │   │
│  │  └──────────────────────────┘  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌─── Talk to Coach ──────────────┐   │
│  │  💬 Ask about your training     │   │
│  │     "Should I increase weight?" │   │
│  │     [Chat with Coach — Premium] │   │
│  └──────────────────────────────────┘   │
│                                          │
└─────────────────────────────────────────┘
```

#### States

**State A: Workouts Scheduled**
- Next workout card prominently displayed
- 2-week schedule scrollable
- Past workouts shown (last 7 days)
- Steps progress if Health connected

**State B: Rest Day Today**
- Next workout shows tomorrow's workout
- Today highlighted as "Rest Day" with calming visual
- Recovery tip: "Enjoy your rest day — recovery is when gains happen"

**State C: No Workouts Completed Yet**
- Past workouts shows empty state
- Encouraging message: "Complete your first workout to see progress"

#### Interactions
- **Next Workout Card Tap:** Navigate to Workout Tab → Today's Workout
- **Schedule Day Tap:** Open Workout Details for that day
- **Past Workout Tap:** View workout results/history
- **Steps Card Tap:** (if not connected) Prompt to connect Health
- **Coach Chat Tap:** Opens chat primed with activity context

---

### Screen 4: Coach Chat Panel

**Purpose:** The conversational interface for personalized coaching. Accessible from all three tabs via slide-up panel or side drawer. Hybrid AI + rule-based engine generates responses grounded in user data.

#### Layout

```
┌─────────────────────────────────────────┐
│  ─────── (drag handle)                  │  ← Slide-up panel
│  💬 Coach Chat — Basic MVP              │  ← Header
│  [×]                                    │  ← Close button
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  👤 Coach Avatar                  │   │
│  │  Hey Alex! How can I help you     │   │  ← Coach greeting
│  │  with your fitness today?         │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  Quick questions:                 │   │
│  │  [How's my recovery?] [Nutrition tips]│ ← Quick-reply chips
│  │  [Today's workout] [Adjust plan]  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ─────────────────────────────────────  │
│                                          │
│  ┌────────────────────────┐ ─┐ ─┐      │
│  │ 👤 How's my nutrition  │  │  │      │  ← User message
│  │    looking this week?  │  │  │      │
│  └────────────────────────┘ ─┘ ─┘      │
│                                          │
│  ┌──┐ ┌─────────────────────────────┐   │
│  │👤│ │ Your protein intake has been│   │  ← Coach response
│  │  │ │ consistently on target —    │   │     with avatar
│  │  │ │ great job! 💪               │   │
│  │  │ │                             │   │
│  │  │ │ One suggestion: try adding  │   │
│  │  │ │ more leafy greens to hit    │   │
│  │  │ │ your micronutrient goals.   │   │
│  │  │ │                             │   │
│  │  │ │ Want specific meal ideas?   │   │
│  └──┘ └─────────────────────────────┘   │
│                                          │
│  ┌────────────────────────┐ ─┐ ─┐      │
│  │ 👤 Yes please!         │  │  │      │
│  └────────────────────────┘ ─┘ ─┘      │
│                                          │
│  ┌──┐ ┌─────────────────────────────┐   │
│  │👤│ │ Here are 3 quick options:   │   │
│  │  │ │                             │   │
│  │  │ │ 1. Spinach smoothie with    │   │
│  │  │ │    your morning protein     │   │
│  │  │ │ 2. Kale salad at lunch      │   │
│  │  │ │ 3. Broccoli with dinner     │   │
│  │  │ │                             │   │
│  │  │ │ Which sounds doable?        │   │
│  └──┘ └─────────────────────────────┘   │
│                                          │
│  ··· (typing indicator)                  │
│                                          │
├─────────────────────────────────────────┤
│  ┌──────────────────────────────────┐   │
│  │  Ask your coach...          [➤] │   │  ← Input + Send
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

#### States

**State A: Empty Chat (Just Opened)**
- Contextual greeting based on originating tab
- Quick-reply chips for common questions
- Empty message history
- Input focused

**State B: Active Conversation**
- Message history scrollable
- User messages (right, purple)
- Coach messages (left, light purple, with avatar)
- Typing indicator during response generation
- Quick-replies after coach responses

**State C: Free User (Paywall)**
- Chat entry point visible from tabs
- Tapping opens paywall modal instead of chat
- Preview: "Unlock personalized coaching with Premium"

#### Interactions
- **Drag Handle:** Drag down to close panel
- **Quick-Reply Tap:** Auto-sends that message
- **Text Input:** Type and tap send or hit enter
- **Send Button:** Submits message, shows typing indicator
- **Coach Response:** Appears after 1-3 seconds (simulated thinking)
- **Scroll:** Messages scroll to bottom on new content

---

## Free vs Premium UI States

| Feature | Free State | Premium State |
|---------|-----------|---------------|
| Recovery Score | Locked preview with "Unlock insights" | Full gauge with breakdown |
| Sleep Stages | Blurred preview, upgrade CTA | Full bar chart with stages |
| HRV | Locked card, Apple Watch prompt | Value with trend indicator |
| Manual Sleep Entry | Not available | Time pickers for bedtime/wake |
| 7-Day Nutrition Chart | Blurred bars, upgrade CTA | Interactive bar chart |
| Weekly Progress | Locked metrics | Completion, consistency, volume |
| 7-Day Calories Chart | Locked preview | Bar chart with workout highlights |
| Coach Chat | Entry point → paywall | Full conversational interface |

---

## Error States & Edge Cases

| Scenario | UI Handling |
|----------|-------------|
| **Apple Health not connected** | Card shows "Connect Apple Health" with setup CTA |
| **No sleep data available** | "No sleep data from last night" + manual entry option (Premium) |
| **HRV unavailable (Android)** | "HRV requires Apple Watch" + hide card for Android users |
| **No workouts scheduled** | Empty schedule with "Set up your workout plan" CTA |
| **No completed workouts** | Past workouts empty state with encouraging message |
| **Chat AI fails** | "I'm having trouble with that. Try asking about your nutrition, workouts, or recovery." |
| **Network failure** | "Waiting for connection..." with retry option |
| **Mood already checked in** | Show saved mood with "Change" option |

---

## Animation & Micro-interactions

1. **Tab Switch:** Smooth horizontal slide, 300ms ease-out
2. **Recovery Score Gauge:** Ring fills on load, 1000ms ease-out
3. **Mood Selection:** Scale bounce (1.0 → 1.1 → 1.05) on tap
4. **Chat Open:** Slide up from bottom, 400ms spring
5. **Coach Typing:** Pulsing dots animation
6. **Message Send:** User bubble slides in from right, 200ms
7. **Coach Response:** Message fades in, 300ms
8. **Premium Card Tap:** Subtle shake + paywall modal fade in

---

## Related Documents

- `brief.md` — Overall app brief summary
- `coach-brief.md` — Coach flow specification
- `log-book-brief.md` — Log Book (nutrition data source)
- `workout-tab-brief.md` — Workout Tab (activity data source)
- `ui-prompt-log-book.md` — Log Book UI (shared components)
