# Strivio Workout Tab — Brief

## App Context
Strivio is a personalized fitness + nutrition app with a digital coaching system. The Workout Tab is one of two main tabs on the Home screen (the other being the Tracking Tab). It is where users view, browse, create, execute, and track workouts — the core activity loop of the app.

**Monetization:** Many features are gated behind **Premium** (paid subscription), creating clear upgrade incentives. Free features are limited to core execution and favoriting. Premium unlocks: full library access, custom workout building, workout editing, coach-generated plans, workout settings, exercise history, and schedule management.

---

## Flow Overview — All Pathways

The workout tab maps a complete user journey with **nine distinct pathways**, each branching from the main tab screen. Features are color-coded by tier.

```
Home — Workout Tab
│
├── Today's Workout Card
│   ├── Scheduled workout (default)
│   ├── Rest day view
│   ├── Recommended workout (Premium)
│   │   ├── Replace workout (Premium)
│   │   └── Choose different day (Premium)
│   ├── Mark as rest day (Free)
│   └── Mark as complete (Free)
│
├── Workout Library (Premium)
│   ├── Search workouts
│   ├── Filter: muscle group / difficulty / duration / equipment
│   ├── Workout detail (name, desc, muscle groups, duration, difficulty)
│   ├── Favorite workout (Free)
│   └── Exercise history (Premium) — last 30 days + previous sessions
│
├── Exercise Library (Premium)
│   ├── Search exercises
│   ├── Filter: muscle group / difficulty / duration / equipment
│   ├── Exercise detail (name, desc, muscle groups, equipment, difficulty)
│   └── Favorite exercise (Free)
│
├── Build Custom Workout
│   ├── "Build your own" (Premium)
│   │   ├── Add exercises from library
│   │   └── Save / edit / delete (Premium)
│   │
│   └── "Build with Coach" (Premium)
│       ├── Structured plan parameters:
│       │   ├── Time available
│       │   ├── Target (goal)
│       │   ├── Goals
│       │   ├── Fitness level
│       │   ├── Weekly volume
│       │   └── Custom days
│       ├── Coach generates custom workout
│       ├── User reviews (free to edit)
│       └── User saves to library or discards
│
├── Edit Existing Workout (Premium)
│   ├── Add or remove exercises
│   ├── Change reps/sets
│   ├── Reorder exercises
│   └── Changes saved to that workout
│
├── Log Recent Activity (Free)
│   └── Open-ended input: activity type, duration, distance, calories
│       └── (No logging for non-subscribed users outside scheduled workouts)
│
├── Workout Detail Page (All paths converge here)
│   ├── Display: name, desc, muscle groups, duration, difficulty, equipment,
│   │             calories burned, PRs, notes
│   └── Actions:
│       ├── Start workout (Free)
│       ├── Edit workout (Premium)
│       ├── Favorite workout (Free)
│       └── Share workout (Free)
│
├── Workout Execution Flow (Free)
│   ├── Countdown 3-2-1 before start (Free)
│   ├── In-app workout timer
│   ├── One exercise at a time: name, image/demonstration, sets/reps
│   ├── User logs weight used + reps completed per set
│   ├── Rest timer with countdown + skip option
│   ├── Next exercise preview (name, image, sets/reps)
│   ├── Exit workout decision:
│   │   ├── Save/Update → auto-logged to history (Free)
│   │   └── Resume workout
│   └── Completion summary: time, calories, PRs
│
├── Workout Settings (Premium)
│   ├── Default rest timer duration
│   ├── Pre-exercise rest timer override
│   ├── Countdown duration before workout starts
│   └── Accessible from: workout detail page + "More" settings
│
└── 2 Week Schedule (Coach Activity Tab)
    ├── Full 14-day plan
    ├── Viewable day by day
    └── Past workouts shown as completed
```

Each pathway flows into the **Workout Details Page**, which is the central hub. From there, users enter the **Workout Execution Flow**.

---

## Stage-by-Stage Breakdown

---

### Stage 1: Today's Workout Card

The primary entry point when the user opens the Workout Tab. Shows what's scheduled for today.

**Three possible views:**

| View | Description | Tier |
|------|-------------|------|
| **Scheduled workout** | Default view — the workout assigned for today by the coach or plan | Free |
| **Rest day** | No workout scheduled — shows a "Rest day" message | Free |
| **Recommended workout** | AI/coach-recommended alternative workout | **Premium** |

**For a scheduled workout, user can:**
- Tap the card → opens Workout Details Page
- Tap "Mark as Complete" → marks workout as done without executing it
- Tap "Mark as Rest Day" → skips today's workout and records it as rest

**For a recommended workout (Premium), user can additionally:**
- **Replace** the recommended workout with another selection
- **Choose a different day** — swap this workout to another date in the schedule

**For a rest day, user can:**
- View a calm "Rest day" message with motivational copy
- Optionally start a workout from the library anyway

---

### Stage 2: Workout Library (Premium)

A browsable, searchable catalog of all available workouts.

**What's displayed:**
- Workout cards in a scrollable list or grid
- Each card shows: workout name, description, muscle groups, duration, difficulty level

**Filtering & Search:**
- **Search bar** — text search across workout names
- **Filters** — toggle chips or dropdowns for:
  - Muscle group (chest, back, legs, shoulders, arms, core, full body)
  - Difficulty (beginner, intermediate, advanced)
  - Duration (short <30min, medium 30-45min, long 45-60min, extra long 60min+)
  - Equipment (bodyweight, dumbbells, barbells, machines, cables, bands, mixed)

**Interactions:**
- Tap a workout card → opens Workout Details Page
- Favorite a workout → heart icon toggle (Free — available without Premium)
- View exercise history for a workout → last 30 days of performance + previous sessions (**Premium**)

---

### Stage 3: Exercise Library (Premium)

A browsable, searchable catalog of all individual exercises.

**What's displayed:**
- Exercise cards in a scrollable list
- Each card shows: exercise name, description, target muscle groups, equipment type, difficulty

**Filtering & Search:**
- **Search bar** — text search across exercise names
- **Filters** — same structure as Workout Library:
  - Muscle group
  - Difficulty
  - Duration
  - Equipment

**Exercise Detail View** (tap any exercise):
- Exercise name
- Description / form tips
- Target muscle groups (possibly with a visual muscle diagram)
- Equipment required
- Difficulty level

**Interactions:**
- Favorite an exercise → heart icon toggle (Free)
- Use exercise in a custom workout (from Build flow)

---

### Stage 4: Build Custom Workout

Two distinct paths for creating custom workouts — self-built or coach-generated.

#### 4A. Build Your Own (Premium)

A multi-step wizard for creating workouts from scratch.

**Builder flow:**
1. **Add exercises** — browse or search the Exercise Library, tap to add each exercise
2. **Configure exercises** — for each exercise, set sets, reps, and duration
3. **Review** — see the complete workout structure
4. **Save** — save to personal library, or discard

**What's displayed:**
- Exercise selector screen with search + categories
- Parameter inputs per exercise (sets, reps, weight target, duration)
- Workout preview screen with full exercise list
- Save / Discard actions

**After saving:**
- User can **edit** or **delete** the workout later (Premium)
- Saved workouts are accessible in the personal library section

#### 4B. Build with Coach (Premium)

A guided workflow where the user provides parameters and the digital coach generates a structured plan.

**Step 1 — Provide parameters:**
| Parameter | Input Type | Description |
|-----------|-----------|-------------|
| **Time** | Duration selector | How much time per session (e.g., 30, 45, 60 min) |
| **Target** | Goal selector | Primary goal (e.g., strength, hypertrophy, endurance, fat loss) |
| **Goals** | Multi-select | Specific goals (e.g., build muscle, improve mobility) |
| **Fitness level** | Single-select | Beginner, intermediate, or advanced |
| **Weekly volume** | Slider or chip selector | How many workouts per week (e.g., 3, 4, 5, 6) |
| **Custom days** | Multi-select (Mon–Sun) | Which days to schedule workouts |

**Step 2 — Coach generates:**
- The digital coach creates a complete workout based on all parameters
- Displays the generated workout for user review

**Step 3 — User review:**
- User can freely edit the generated workout (change exercises, adjust sets/reps)
- User can **save to library** or **discard** and regenerate

**Save decision:**
- If subscribed → workout saves directly to personal library
- If not subscribed → "Subscribe to save this workout" paywall prompt
- Saved workouts are accessible in the library for future execution

---

### Stage 5: Edit Existing Workout (Premium)

Modify any saved or scheduled workout after creation.

**What the user can do:**
- **Add exercises** — browse library and insert new exercises into the workout
- **Remove exercises** — delete exercises from the workout
- **Change reps/sets** — edit the set and rep scheme for any exercise
- **Reorder exercises** — drag to change exercise order

**After editing:**
- Changes are saved to that specific workout
- If the workout was on the schedule, the updated version appears for the next execution

---

### Stage 6: Log Recent Activity (Free)

A free-text log entry for recording non-scheduled physical activities.

**What's displayed:**
- Open-ended input form with fields for:
  - **Activity type** — e.g., running, cycling, swimming, hiking, sports
  - **Duration** — how long the activity lasted
  - **Distance** — optional distance input (e.g., km, miles)
  - **Calories** — optional estimated calories burned

**Interactions:**
- Select or type activity type
- Enter duration, distance, and calories
- Submit → activity is logged to the user's history

**Limitation:**
- Users without a subscription cannot log standalone workouts — only scheduled workout completions are auto-logged. This is a deliberate Premium upsell.

---

### Stage 7: Workout Detail Page

The central convergence point. Every pathway (today's workout, library, custom, history) flows here before execution.

**What's displayed — Header section:**
- Workout name
- Description
- Muscle groups targeted (tag chips)
- Estimated duration
- Difficulty level
- Equipment required (icon or tag list)
- Estimated calories burned
- Personal records (PRs) — "Your PR for this workout: X kg on [date]" (if applicable)
- User notes (if previously added)

**What's displayed — Exercise list:**
- Scrollable list of all exercises in the workout
- Each exercise shows: name, sets x reps, equipment icon

**Actions (bottom of screen):**
| Action | Tier | Description |
|--------|------|-------------|
| **Start Workout** | Free | Enters Workout Execution Flow |
| **Edit Workout** | Premium | Opens Edit Existing Workout screen |
| **Favorite Workout** | Free | Toggle heart icon to favorite/unfavorite |
| **Share Workout** | Free | Share workout details via system share sheet |

**Error state:**
- "Unable to load workout" — shown when data fails to fetch, with a retry button

---

### Stage 8: Workout Execution Flow (Free)

The full-screen, in-workout experience. This is where the user actually performs the workout, guided step-by-step.

**Pre-workout:**
- **3-2-1 countdown** — before the workout starts, a countdown animation plays (Free)

**During the workout:**
- One exercise fills the screen at a time
- **Display elements:**
  - Exercise name
  - Image or demonstration (static image or GIF/video loop)
  - Current set / total sets (e.g., "Set 2 of 4")
  - Reps target (e.g., "10 reps")
  - Weight input field — user logs weight used per set
  - Reps completed — user logs actual reps per set
  - Workout progress bar (exercises completed vs. total)
  - In-app workout timer (tracks total elapsed time)
  - **Next exercise preview** — name, image, sets/reps (shown below the current exercise)

**Set completion:**
- User taps "Complete" or "Done" to mark a set as finished
- **Rest timer** starts automatically:
  - Countdown with remaining seconds displayed prominently
  - **Skip option** — user can tap to skip the rest timer
  - Configurable duration via Workout Settings (Premium)

**Navigation:**
- Tap "Next" to advance to the next exercise
- "Previous" to go back (for re-doing or reviewing)
- Swipe gestures (left/right) as alternative navigation

**Pause / End / Exit:**
- User can exit the workout at any time via a decision point:
  - **Save/Update** → completes what was done, auto-logs to history (Free)
  - **Resume** → returns to the current exercise

**Completion summary** (when all exercises are finished):
- Total workout time
- Estimated calories burned
- PRs achieved during this session (if any)
- Celebratory visual feedback

**Post-completion:**
- Workout is auto-logged to the user's history (Free)
- User can view the logged entry from Log Recent Activity

---

### Stage 9: Workout Settings (Premium)

Configuration options for customizing the workout execution experience.

**Settings available:**
| Setting | Description | Example |
|---------|-------------|---------|
| **Default rest timer duration** | How long the rest timer runs between sets | 60s, 90s, 120s, 180s, custom |
| **Pre-exercise rest timer override** | Different rest timer for the first set of an exercise | Longer rest before starting (e.g., 120s) |
| **Countdown duration before workout starts** | How long the 3-2-1 countdown lasts | 3 seconds (default), 5 seconds, disabled |

**Where settings are accessible:**
- From the workout detail page (gear icon or settings link)
- From the "More" page settings section

**Note:** These settings are Premium-only. Free users use default values.

---

### Stage 10: 2 Week Schedule (Coach Activity Tab)

A structured 14-day workout plan accessible from the **Coach Activity Tab** (separate from the Workout Tab). This is where the user sees their complete coach-generated plan.

**What's displayed:**
- Full 14-day plan, viewable day by day
- Each day shows: workout name or "Rest day"
- Past workouts are shown as completed (strikethrough, dimmed, or checkmark)
- Future workouts are shown as scheduled
- Today is highlighted

**Interactions:**
- Tap any day → opens Workout Details Page for that day's workout
- Navigate between days via horizontal swipe or day chips
- Premium users can swap workouts between days or replace a workout entirely

**Relationship to Workout Tab:**
- The Coach Activity Tab provides the plan structure
- The Workout Tab provides execution
- Together they form the complete coaching loop: plan → execute → track

---

## Free vs. Premium Feature Matrix

| Feature | Free | Premium |
|---------|------|---------|
| View today's workout | Yes | Yes |
| Mark as complete / rest day | Yes | Yes |
| Workout execution flow | Yes | Yes |
| 3-2-1 countdown | Yes | Yes |
| Favorite workouts/exercises | Yes | Yes |
| Share workout | Yes | Yes |
| Log recent activity | Yes | Yes |
| Auto-log completed workouts | Yes | Yes |
| Recommended workout (Today's view) | No | Yes |
| Replace workout / choose different day | No | Yes |
| Browse workout library | No | Yes |
| Browse exercise library | No | Yes |
| Search & filter (workouts/exercises) | No | Yes |
| Exercise history (last 30 days) | No | Yes |
| Build your own workout | No | Yes |
| Build with Coach | No | Yes |
| Edit existing workout | No | Yes |
| Save custom workout | No | Yes |
| Workout settings (rest timer, countdown) | No | Yes |
| Workout settings override | No | Yes |
| 2 Week Schedule (Coach Activity Tab) | No | Yes |

---

## Key Design Patterns & Observations

**Freemium gating is deeply woven into the flow** — the app carefully distinguishes Free and Premium features. Core execution (starting and completing a scheduled workout) is Free, but anything beyond that — library access, customization, editing, settings, coaching — is Premium. This creates a compelling upgrade path.

**"Build with Coach" is a key differentiator** — unlike competitors where the user builds from scratch, Strivio's coach generates a structured plan based on user-defined parameters (time, target, goals, fitness level, weekly volume, custom days). The user retains full editing freedom, making it collaborative rather than rigid.

**Workout Details as central hub** — every pathway funnels through the same detail screen before execution. This is efficient architecture: one screen to maintain, consistent UX, clear mental model.

**Favorite system is Free** — a smart choice. Encouraging users to build a favorites collection creates stickiness and provides data for personalization, even on the free tier.

**Rest timer configurability (Premium)** — offering default rest timer, pre-exercise override, and countdown duration settings gives power users fine-grained control over their training pace.

**2 Week Schedule is on the Coach Activity Tab** — this is architecturally separate from the Workout Tab. The Coach tab is where the plan lives; the Workout tab is where execution happens. This separation is intentional: planning and doing are distinct user mindsets.

**Non-subscribed users cannot log standalone workouts** — only scheduled workout completions are auto-logged. "Log Recent Activity" is Free, but logging full custom workouts requires a subscription. This is a deliberate upsell mechanism.

---

## Competitive Inspiration Context

| Pattern | Used By | Strivio Implementation |
|---------|---------|----------------------|
| Today's workout as default card | Strong, Fitbod, Nike Training Club | Scheduled workout shown prominently on tab open |
| Recommended workout (Premium) | Fitbod (auto-generated), Freeletics (coach picks) | AI/coach-recommended alternative for today |
| Workout library with filters | Fitbod, Hevy, Freeletics | Browse catalog filtered by muscle group, difficulty, duration, equipment |
| Exercise library with detail | Hevy, Strong, Gymshark | Full exercise catalog with muscle group, equipment, difficulty |
| Custom workout builder | Strong, Hevy, Fitbod | Multi-step wizard: add exercises → configure → save |
| "Build with Coach" (AI-generated) | Fitbod (AI workout), Freeletics (coach plan) | User sets parameters → coach generates → user reviews/edits |
| Edit existing workout | Strong, Hevy | Add/remove exercises, change reps/sets, reorder |
| Workout history / log | Strong, Hevy, Fitbod | Auto-logged completions + manual activity log |
| Exercise history (last 30 days) | Strong, Hevy | Previous sessions with weight/reps data |
| Rest timer with countdown | Strong, Hevy, Fitbod | Auto-starts after set completion, configurable |
| Countdown before workout | Nike Training Club, Freeletics | 3-2-1 countdown animation |
| Completion summary (time, calories, PRs) | Fitbod, Nike Training Club | Post-workout screen with key metrics |
| Next exercise preview | Strong, Hevy | Shown below current exercise during execution |
| Workout settings (rest timer, countdown) | Strong, Hevy | Premium-only configuration |
| 2 Week Schedule (Coach Activity Tab) | Freeletics (coach program), Fitbod (plan view) | 14-day plan, day-by-day, past workouts marked complete |
| Favorite system (Free) | All major apps | Heart icon on workouts and exercises |
| Share workout | Strong, Hevy | System share sheet integration |

---

## UX Considerations

- **Glanceability in execution mode:** All text should be readable at arm's length. Large fonts (18px+), high contrast, and minimal UI chrome.
- **One-handed interaction:** During execution, primary actions (complete, next, rest) should be reachable with one thumb.
- **Rest timer should be passive but visible:** Small countdown badge that pulses when rest is ending — don't force users to stare at it.
- **Weight log accuracy:** Show "Last time: 40kg x 10" as helper text under each exercise.
- **Build with Coach clarity:** The parameter input screen (Time, Target, Goals, Fitness level, Weekly volume, Custom days) should feel like a conversation, not a form. Use one question per screen pattern (matching the onboarding flow style).
- **Paywall timing:** The "Subscribe to save this workout" prompt should appear at the moment of peak value — right after the user has invested effort in creating or reviewing a workout.
- **2 Week Schedule navigation:** The Coach Activity Tab should make it easy to see the full 14-day plan at a glance while still allowing day-by-day drill-down.
- **Error recovery:** If a workout fails to load during execution, cache the current state and allow resumption when connectivity returns.

---

## Related Documents

- `brief.md` — Overall app brief summary
- `project_goal.png` — Project goals
- `homescreen - tracking tab.jpg` — Tracking tab flow
- `strivio_onboarding_n_intake.jpg` — Onboarding & intake flow
- `strivio_authentication.jpg` — Authentication flow
- `ui-prompt-tracking-tab.md` — Tracking tab UI prompt
- `ui-prompt-onboarding-intake.md` — Onboarding & intake UI prompt
- `brief-analysis.md` — Design analysis and inspiration
- `auth-flow-brief.md` — Authentication flow documentation
