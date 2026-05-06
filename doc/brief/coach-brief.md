# Strivio Coach — Flow Brief

## Overview

This document describes the complete Coach user flow for the Strivio fitness & nutrition coaching app. The Coach serves as the user's digital personal trainer — providing recovery insights, nutrition feedback, activity planning, and a conversational chat interface. It is one of the four main app pages (Home, Logbook, Coach, More) and is the primary touchpoint for personalized, data-driven guidance.

The Coach is organized into **three sub-tabs**: Recovery, Nutrition, and Activity. A **Coach Chat** panel is accessible from multiple tabs, providing an AI + rule-based hybrid response engine that generates personalized coaching based on the user's plan and logged data.

---

## Flow Diagram Summary

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              COACH FLOW                                    │
└──────────────────────────────────────────────────────────────────────────┘

Coach (Entry Point — 3 Tabs)
    │
    ├── Recovery Tab
    │   ├── Sleep Data Display
    │   │   ├── Sleep duration imported from Apple Health / Google Fit (Free)
    │   │   └── Sleep stages breakdown (Premium)
    │   │       └── FAQ: tap info icon for sleep stage explanations (Premium)
    │   │
    │   ├── Sleep Data Decision Point
    │   │   ├── Available? YES → Show sleep duration and stages (Premium)
    │   │   └── Available? NO → Prompt manual entry: bedtime and wake time (Premium)
    │   │
    │   ├── HRV Display
    │   │   └── Read-only value from Apple Health if available (Premium)
    │   │
    │   ├── Mood Check-in
    │   │   ├── Single prompt: "How are you feeling today?" (Free)
    │   │   └── Mood saved to daily log (Free)
    │   │
    │   └── Full Recovery Score
    │       └── Composite: sleep + mood + HRV + activity (Premium)
    │
    ├── Nutrition Tab
    │   ├── Daily Nutrition Card
    │   │   └── Macros consumed vs. targets for today (Free)
    │   │       ├── Calories, protein, carbs, fats with progress bars
    │   │       └── Links to Log Book for detailed view
    │   │
    │   ├── 7-Day Nutrition Chart
    │   │   └── Daily calorie intake vs. targets over 7 days (Premium)
    │   │
    │   └── Coach Chat Accessible for Nutrition Questions (Premium)
    │       └── Opens Coach Chat panel for personalized nutrition advice
    │
    ├── Activity Tab
    │   ├── Next Workout Card
    │   │   └── What is coming up next (Free)
    │   │
    │   ├── 2-Week Workout Schedule
    │   │   └── Full 14-day plan visible (Free)
    │   │
    │   ├── Weekly Progress Insights
    │   │   └── Completion rate, consistency, volume (Premium)
    │   │
    │   ├── 7-Day Burned Calories & Steps Chart (Premium)
    │   │
    │   ├── Daily Steps Insights
    │   │   └── Steps vs. goal (Free)
    │   │
    │   ├── Past Workouts
    │   │   └── Shown up to recent days (Free)
    │   │
    │   └── Coach Chat Accessible for Activity Questions (Premium)
    │       └── Opens Coach Chat panel for workout/program advice
    │
    └── Coach Chat Panel (accessible from all tabs)
        ├── Chat header: "Coach Chat — Basic MVP"
        ├── AI + Rule-Based Hybrid Response Engine
        │   └── Combines user's plan data with coaching rules
        ├── Responses Based on User Plan and Logged Data (Free)
        │   └── Personalized to the individual user's goals and history
        ├── User Sends Message
        │   └── Free-text input for questions about nutrition, activity, or recovery
        └── Coach Generates Response
            └── Contextual reply drawing from plan data, logged meals, and workout history
```

---

## Stage-by-Stage Breakdown

---

### Stage 1: Coach — Entry Point

The Coach is accessed from the main bottom navigation bar (coach icon). It is the user's digital personal trainer, providing data-driven insights, recovery tracking, nutrition feedback, activity planning, and conversational coaching.

**Primary Entry Method:**
- Tap nav-bar "Coach" icon → Opens the Coach with three sub-tabs: Recovery, Nutrition, Activity

**Tab Navigation:**
- Three sub-tabs at the top of the Coach screen
- Swipe left/right between tabs or tap to switch
- Default active tab: Recovery (shown on first visit)

**Coach Chat Access:**
- The Coach Chat panel is accessible from all three sub-tabs
- Positioned as a persistent entry point (side panel or slide-up drawer)
- Tapping "Coach chat accessible" cards opens the chat interface

---

### Stage 2: Recovery Tab

The Recovery Tab is the default landing view when entering the Coach. It aggregates sleep, heart rate variability (HRV), mood, and activity data to provide a holistic picture of the user's recovery state.

#### 2A. Sleep Data Display

Sleep duration is imported from Apple Health (iOS) or Google Fit (Android).

| Tier | What's Displayed |
|------|-----------------|
| **Free** | Sleep duration (total hours) imported from connected health platform |
| **Premium** | Sleep duration + sleep stages breakdown (deep, light, REM, awake) |

**Premium Additions:**
- **Sleep stages breakdown** — visual chart showing time spent in each sleep stage
- **Sleep stages FAQ** — tapping an info icon opens an educational overlay explaining each sleep stage, why it matters for recovery, and what ideal ranges look like

**Design Notes:**
- Sleep duration should display prominently with a moon or bed icon
- Sleep stages chart should use distinct colors per stage (e.g., deep = dark blue, light = light blue, REM = purple, awake = orange)
- FAQ content should be concise and educational, not medical advice

#### 2B. Sleep Data Decision Point

A branching logic point that adapts the experience based on whether the user has sleep data available.

| Step | Condition | Action |
|------|-----------|--------|
| 1 | App checks for sleep data from Apple Health / Google Fit | Automatic — no user action required |
| 2a | **Data available:** YES | Show "Sleep duration and stages" card (Premium) with full breakdown |
| 2b | **Data available:** NO | Show "Prompt manual entry" card — user manually enters bedtime and wake time |

**Manual Sleep Entry (Premium, triggered when no data source):**
- User taps "Add sleep data"
- Enters bedtime (time picker) and wake time (time picker)
- App calculates sleep duration from the two values
- Data is saved to the daily recovery log

**Design Notes:**
- The decision point should feel seamless — not a disruptive prompt
- When no data is available, show a helpful empty state: "Connect Apple Health or Google Fit to auto-track sleep, or enter it manually"
- Manual entry should be quick: two time pickers and a save button

#### 2C. HRV Display (Premium)

Heart Rate Variability is a key recovery metric. It is imported read-only from Apple Health (iOS only — Google Fit does not natively support HRV).

**What's displayed:**
- Current day's HRV value in milliseconds (ms)
- Trend indicator: up arrow (improving), down arrow (declining), or dash (stable)
- Contextual interpretation: "Your HRV is in a healthy range" or "Your HRV is lower than usual — consider a lighter workout today"

**Design Notes:**
- HRV is a Premium-only metric — free users see a locked card with a preview blur or paywall overlay
- If Apple Health is not connected, prompt the user to connect it
- HRV values are highly individual; display trend relative to the user's own baseline, not population averages

#### 2D. Mood Check-in (Free)

A simple daily mood prompt that helps users track their subjective well-being.

| Step | Description |
|------|-------------|
| 1 | Coach displays the prompt: "How are you feeling today?" |
| 2 | User selects from mood options: Great, Good, Okay, Bad, Terrible (or emoji-based scale) |
| 3 | Selection is saved to the daily log with a timestamp |
| 4 | Confirmation: "Mood saved" with the selected mood displayed |

**Design Notes:**
- Use emoji or icon + label for each mood option (e.g., 😊 Great, 🙂 Good, 😐 Okay, 😕 Bad, 😞 Terrible)
- Single-tap selection — no confirmation step needed
- Mood data feeds into the Full Recovery Score (Premium)
- Show a subtle confirmation animation after selection
- This is a **Free** feature — no Premium gate

#### 2E. Full Recovery Score (Premium)

A composite score that synthesizes all recovery inputs into a single, actionable number.

**Inputs:**
| Metric | Source |
|--------|--------|
| **Sleep** | Apple Health / Google Fit or manual entry |
| **Mood** | Daily mood check-in |
| **HRV** | Apple Health (if available) |
| **Activity** | Previous day's workout data (intensity, duration) |

**Output:**
- A recovery score (e.g., 0–100 scale)
- Color-coded: green (ready to train hard), yellow (moderate readiness), red (prioritize recovery)
- Contextual recommendation: "You're well recovered — go hard today" or "Your recovery is low. Consider a lighter workout or rest day."

**Design Notes:**
- The recovery score should be visually prominent — large number or gauge
- Each contributing factor should be individually expandable to see its impact
- Premium-only — free users see a locked card with upsell copy: "Unlock full recovery insights with Premium"

---

### Stage 3: Nutrition Tab

The Nutrition Tab provides a coach's-eye view of the user's dietary intake. It aggregates data from the Log Book and presents it as actionable insights rather than raw logs.

#### 3A. Daily Nutrition Card (Free)

A summary card showing today's macro intake versus targets.

**What's displayed:**
| Macro | Display Format |
|-------|---------------|
| **Calories** | Actual / Target with progress bar (e.g., 1,850 / 2,200) |
| **Protein** | Actual / Target in grams with progress bar |
| **Carbs** | Actual / Target in grams with progress bar |
| **Fats** | Actual / Target in grams with progress bar |

**Design Notes:**
- Progress bars with color coding: green (on track), yellow (under), red (over)
- "X remaining" label under each macro for quick scanning
- Tapping the card navigates to the Log Book for detailed view
- This data mirrors the Daily Macro Overview in the Log Book but presented from a coaching/insight perspective

#### 3B. 7-Day Nutrition Chart (Premium)

A weekly trend view of calorie intake versus targets.

**What's displayed:**
- Bar or line chart showing daily calorie intake for the last 7 days
- Target line overlaid for comparison
- Days where the user was over/under target are highlighted

**Design Notes:**
- Premium-only — free users see a blurred/locked chart preview
- Upsell copy: "See your 7-day nutrition trends with Premium"
- The same chart is reference-linked from the Log Book (see log-book-brief.md, Section 2E)

#### 3C. Coach Chat — Nutrition Context (Premium)

From the Nutrition Tab, users can access the Coach Chat specifically for nutrition-related questions.

**Example interactions:**
- "Am I getting enough protein?"
- "Why am I always over my carb target?"
- "Suggest a high-protein dinner under 500 calories"
- "How should I adjust my macros for my rest days?"

**Design Notes:**
- Coach Chat is contextual — when opened from the Nutrition Tab, the coach is primed with nutrition data
- Free users can see the chat entry point but tapping it triggers the Premium paywall
- See Stage 5 for full Coach Chat specification

---

### Stage 4: Activity Tab

The Activity Tab is the coaching hub for workout planning, progress tracking, and activity insights. It works in tandem with the Workout Tab (which handles execution) by providing the plan overview and performance analysis.

#### 4A. Next Workout Card (Free)

Shows the user's next scheduled workout for quick reference.

**What's displayed:**
- Workout name (e.g., "Upper Body Strength")
- Scheduled date and time
- Brief summary: muscle groups, estimated duration
- Tap to open the Workout Detail Page

**Design Notes:**
- Card should be prominent — this is the most actionable item
- If today is a rest day, show "Rest Day" with a calming visual
- Syncs with the Workout Tab's "Today's Workout Card"

#### 4B. 2-Week Workout Schedule (Free)

A full 14-day plan viewable day by day.

**What's displayed:**
- 14-day calendar strip or scrollable list
- Each day shows: workout name or "Rest Day"
- Past days shown as completed (checkmark, dimmed, or strikethrough)
- Future days shown as scheduled
- Today is highlighted

**Interactions:**
- Tap any day → opens Workout Details Page for that day's workout
- Horizontal swipe or day-chip navigation between days
- Premium users can swap or replace workouts (via Workout Tab)

**Design Notes:**
- This is the plan overview — execution happens in the Workout Tab
- Clear visual distinction between completed, today, and upcoming days
- Past workouts link to their logged results (if completed)

#### 4C. Weekly Progress Insights (Premium)

A weekly summary of workout performance metrics.

**What's displayed:**
| Metric | Description |
|--------|-------------|
| **Completion rate** | % of scheduled workouts completed this week (e.g., 4/5 = 80%) |
| **Consistency** | Days active this week vs. planned (e.g., 5/7 days) |
| **Volume** | Total sets, reps, or weight lifted this week with trend arrow |

**Design Notes:**
- Visualize with mini progress rings or bar charts
- Compare to previous week with trend indicators (↑ improved, ↓ declined, → stable)
- Premium-only with upsell: "Track your weekly progress and consistency with Premium"

#### 4D. 7-Day Burned Calories & Steps Chart (Premium)

A weekly trend chart for activity metrics.

**What's displayed:**
- Bar chart: daily calories burned (from workouts + general activity)
- Line overlay: daily steps
- 7-day window with day labels

**Data sources:**
- Calories burned: calculated from logged workouts (auto-logged completions)
- Steps: imported from Apple Health / Google Fit (if connected)

**Design Notes:**
- Premium-only with locked preview for free users
- Days with workouts should be visually distinct (e.g., highlighted bar) from rest days
- Tap a day to see detailed breakdown

#### 4E. Daily Steps Insights (Free)

A simple daily steps progress display.

**What's displayed:**
- Current step count vs. daily goal (e.g., "8,450 / 10,000 steps")
- Progress ring or bar
- Percentage of goal achieved

**Design Notes:**
- Steps data requires Apple Health / Google Fit connection
- If not connected, prompt: "Connect Apple Health to track steps"
- This is Free — basic activity tracking without Premium gate

#### 4F. Past Workouts (Free)

A summary of recently completed workouts.

**What's displayed:**
- List of completed workouts up to a configurable number of recent days
- Each entry shows: workout name, date, duration, and key result (e.g., calories, PR achieved)
- Tap to view full workout results

**Design Notes:**
- Default: show last 7 days of completed workouts
- Empty state: "No completed workouts yet. Start your first workout!"
- Links to the Workout Tab's exercise history for detailed per-exercise data

#### 4G. Coach Chat — Activity Context (Premium)

From the Activity Tab, users can access the Coach Chat specifically for workout and programming questions.

**Example interactions:**
- "Should I increase my weights this week?"
- "My legs are still sore — should I skip today?"
- "How do I progress on bench press?"
- "Suggest an alternative to squats for my knee"

**Design Notes:**
- Contextual priming: when opened from Activity Tab, the coach has access to workout history and schedule
- Free users see entry point but tapping triggers Premium paywall
- See Stage 5 for full Coach Chat specification

---

### Stage 5: Coach Chat Panel

The Coach Chat is a conversational interface that provides personalized coaching by combining AI with rule-based logic. It is accessible from all three Coach sub-tabs and represents the most direct form of digital coaching in the app.

#### 5A. Chat Architecture

The chat uses a **hybrid AI + rule-based response engine**:

| Component | Description |
|-----------|-------------|
| **Rule-based layer** | Predefined coaching logic triggered by specific queries or data states (e.g., "You missed 3 workouts this week — here's a suggestion to get back on track") |
| **AI layer** | Natural language understanding and generation for open-ended questions and personalized responses |
| **Data context** | Responses are grounded in the user's plan data, logged meals, workout history, recovery metrics, and goals |

#### 5B. Chat Flow

| Step | Description |
|------|-------------|
| 1 | User opens Coach Chat from any Coach sub-tab |
| 2 | Chat interface opens (slide-up drawer, side panel, or full-screen) |
| 3 | Coach greeting: contextual based on which tab the user came from (e.g., "How can I help with your nutrition today?") |
| 4 | User types a message (free-text input) |
| 5 | Response engine processes: intent detection → data lookup → response generation |
| 6 | Coach generates and displays a personalized response |
| 7 | Conversation continues naturally with context retained |

#### 5C. Response Personalization

Responses are based on the user's actual plan and logged data:

| Data Source | Used For |
|-------------|----------|
| **User profile & goals** | Weight target, fitness level, diet type, pace |
| **Nutrition plan** | Daily calorie/macro targets, logged meals |
| **Workout plan** | 2-week schedule, workout history, exercise data |
| **Recovery data** | Sleep, mood, HRV, recovery score |
| **Activity data** | Steps, calories burned, consistency metrics |

#### 5D. MVP Scope

The initial release (MVP) implements a basic chat:

- User asks a question → Coach responds
- Responses are generated by the hybrid engine
- Context is limited to the current session (no long-term conversation memory in MVP)
- Free users receive responses based on plan and logged data
- Premium may unlock deeper coaching (more detailed responses, proactive outreach)

**What MVP does NOT include:**
- Proactive coach messages (coach initiates conversation)
- Multi-turn complex reasoning
- Conversation history beyond the current session
- Voice input/output

#### 5E. Premium Gate

| Tier | Access |
|------|--------|
| **Free** | Can view the chat entry point but cannot send messages. Sees upsell prompt. |
| **Premium** | Full access: send messages, receive personalized coaching responses |

**Upsell copy:** "Chat with your personal coach — unlock with Premium"

**Design Notes:**
- Chat UI should follow standard messaging patterns: user messages on the right, coach responses on the left
- Coach avatar/icon should match the user's selected digital coach persona
- Typing indicator while the coach "thinks"
- Responses should feel conversational, not robotic
- Quick-reply chips for common questions (e.g., "How's my nutrition?", "What's my workout today?", "Am I on track?")
- Handle "I don't know" gracefully — the coach should acknowledge limitations rather than fabricate answers

---

## Free vs. Premium Feature Matrix

| Feature | Free | Premium |
|---------|------|---------|
| Recovery Tab — view | Yes | Yes |
| Sleep duration display (from Health platforms) | Yes | Yes |
| Sleep stages breakdown | No | Yes |
| Sleep stages FAQ (info icon) | No | Yes |
| Manual sleep entry (bedtime/wake time) | No | Yes |
| HRV display (from Apple Health) | No | Yes |
| Mood check-in (daily prompt) | Yes | Yes |
| Mood saved to daily log | Yes | Yes |
| Full recovery score (sleep + mood + HRV + activity) | No | Yes |
| Nutrition Tab — view | Yes | Yes |
| Daily nutrition card (macros vs. targets) | Yes | Yes |
| 7-day nutrition chart (calorie trends) | No | Yes |
| Activity Tab — view | Yes | Yes |
| Next workout card | Yes | Yes |
| 2-week workout schedule | Yes | Yes |
| Weekly progress insights (completion, consistency, volume) | No | Yes |
| 7-day burned calories & steps chart | No | Yes |
| Daily steps insights (steps vs. goal) | Yes | Yes |
| Past workouts (recent days) | Yes | Yes |
| Coach Chat — view entry point | Yes | Yes |
| Coach Chat — send messages and receive responses | No | Yes |
| AI + rule-based personalized coaching | No | Yes |

---

## Integration Points

### External APIs & Platforms

| API / Service | Purpose | Used In |
|---------------|---------|---------|
| **Apple Health (HealthKit)** | Sleep data, HRV, steps, activity | Recovery Tab, Activity Tab |
| **Google Fit** | Sleep data, steps, activity | Recovery Tab, Activity Tab |
| **AI / LLM Service** | Natural language coaching responses | Coach Chat |
| **Open Food Facts API** | Nutrition data (via Log Book) | Nutrition Tab (aggregated data) |

### Internal Data Dependencies

| Data Source | Consumed By |
|-------------|-------------|
| **Log Book — daily food logs** | Nutrition Tab (daily card, 7-day chart) |
| **Workout Tab — completed workouts** | Activity Tab (past workouts, progress insights, calories chart) |
| **Workout Tab — 2-week schedule** | Activity Tab (schedule display, next workout) |
| **Onboarding — user profile & goals** | All Coach features (personalization baseline) |
| **Apple Health / Google Fit** | Recovery Tab (sleep, HRV), Activity Tab (steps) |

### Cross-Tab Navigation

| From | To | Purpose |
|------|----|---------|
| Coach → Nutrition Tab | Log Book | View detailed food log and macro breakdown |
| Coach → Activity Tab | Workout Tab (Workout Details) | Start or review a scheduled workout |
| Coach → Recovery Tab | More → Settings | Connect Apple Health / Google Fit |
| Log Book | Coach → Nutrition Tab | View 7-day nutrition chart |
| Home → Tracking Tab | Coach → Recovery Tab | View recovery score |

### Data Flow

```
Apple Health / Google Fit
    → Sleep data, HRV, steps imported
        → Recovery Tab: sleep display, HRV, recovery score
        → Activity Tab: steps insights, calories chart

Log Book (food entries)
    → Macros aggregated
        → Nutrition Tab: daily card, 7-day chart

Workout Tab (completions + schedule)
    → Activity Tab: next workout, past workouts, progress insights

All data sources
    → Coach Chat context
        → AI + rule-based engine
            → Personalized coaching responses
```

---

## Key Design Patterns & Observations

**Three-tab structure mirrors the coaching domains** — Recovery, Nutrition, and Activity represent the three pillars of holistic fitness coaching. This organization is intuitive: each tab answers a different question (How am I recovering? How am I eating? What should I do?).

**Coach Chat as a unified interface** — rather than scattering coaching advice across cards and notifications, the chat provides a single conversational surface. It's accessible from any tab, creating a consistent "ask the coach" mental model. The hybrid AI + rule-based engine ensures responses are grounded in user data rather than generic advice.

**Recovery is the default landing tab** — placing Recovery first signals its importance. Many fitness apps prioritize activity; Strivio's choice to lead with recovery reflects a more holistic coaching philosophy. Recovery data (sleep, HRV, mood) contextualizes the activity and nutrition recommendations that follow.

**Sleep data decision point is adaptive** — the branch between auto-imported sleep data and manual entry prevents dead-ends. Users without Apple Health / Google Fit can still participate. The Premium gate on both paths (auto stages display and manual entry) creates consistent monetization.

**Mood check-in is simple and free** — a single daily prompt with no friction. This is strategically Free because it builds a daily habit loop (checking in with the Coach) and provides valuable subjective data that enriches the Premium recovery score.

**Full Recovery Score as Premium anchor** — the composite score is the most valuable recovery feature and is appropriately Premium-gated. It synthesizes data from multiple sources into a single actionable output, demonstrating the value of the Premium tier.

**Nutrition Tab is insights, not logging** — unlike the Log Book which handles data entry, the Coach Nutrition Tab provides the coaching layer on top: trends, patterns, and recommendations. The daily card and 7-day chart pull from the Log Book; they do not duplicate functionality.

**Activity Tab is plan overview, not execution** — the Activity Tab shows the 2-week schedule, progress metrics, and past workouts. Actual workout execution happens in the Workout Tab. This separation (planning vs. doing) is intentional and mirrors the Recovery/Nutrition split from their respective logging interfaces.

**Coach Chat is the Premium centerpiece** — while free users can see the chat entry point, actually conversing with the coach requires Premium. This is the strongest upsell driver: the promise of a personal digital coach that knows your data and gives personalized advice.

**Health platform integration is essential but fallback-ready** — sleep, HRV, and steps depend on Apple Health / Google Fit. The design handles the absence of these connections gracefully with manual entry fallbacks and clear connection prompts.

---

## Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| **Apple Health / Google Fit not connected** | Show connection prompt on sleep, HRV, and steps cards. Recovery features that require data show empty state with setup CTA. |
| **Apple Health connected but no sleep data** | Show manual entry prompt (Premium). Free users see: "Connect a sleep tracker or upgrade to Premium for manual entry." |
| **HRV data unavailable** (Android user or no Apple Watch) | HRV card shows "Not available" with explanation that HRV requires an Apple Watch. Consider hiding entirely for Android users. |
| **No workouts completed yet** | Past Workouts shows empty state: "No workouts completed yet. Your completed workouts will appear here." |
| **No foods logged for today** | Daily Nutrition Card shows targets with zero intake: "Start logging meals to see your nutrition summary." |
| **Coach Chat AI fails to generate response** | Fallback to rule-based response or show: "I'm having trouble answering that right now. Try asking about your nutrition, workouts, or recovery." |
| **Network failure during chat** | Queue message locally, show "Waiting for connection..." indicator, send when connectivity returns |
| **User has not completed onboarding** | Coach features that depend on plan data show: "Complete your profile to unlock personalized coaching." |
| **Mood check-in already completed for today** | Show today's mood with option to change it (edit, not duplicate) |
| **Multiple health data sources conflict** | Prioritize Apple Health over Google Fit on iOS; show data source label for transparency |

---

## UX Considerations

- **Coach persona consistency:** The Coach should feel like a single, coherent personality across all three tabs and the chat. Tone, language, and visual identity should match the user's selected coach persona from onboarding.
- **Recovery-first default tab:** Opening on Recovery sets the tone that the Coach cares about the whole athlete — not just workouts. The recovery score should be the most visually prominent element.
- **Mood check-in should be frictionless:** Single tap, no confirmation. Position it prominently on the Recovery Tab. Consider a notification reminder if the user hasn't checked in by midday.
- **Coach Chat should feel immediate:** Fast response times are critical. If AI generation takes more than 2-3 seconds, show a typing indicator or interim state.
- **Quick-reply chips reduce friction:** Suggest common questions as tappable chips in the chat interface: "How's my nutrition?", "What's my next workout?", "How's my recovery?"
- **Tab state should persist:** If the user switches away from Coach and returns, restore the last active sub-tab.
- **Premium paywalls should be contextual:** Don't show all Premium gates at once. Trigger them when the user attempts to access a Premium feature, at the moment of peak intent.
- **Data freshness indicators:** Show when data was last synced (e.g., "Sleep data updated 2 hours ago"). This builds trust and explains stale data.
- **Empty states should be helpful, not empty:** Every empty state should include a clear CTA to resolve it (connect Health, log a meal, start a workout).
- **Recovery score explainability:** Users should understand WHY their score is what it is. Expandable breakdowns for each contributing factor build trust in the coach's recommendations.

---

## Competitive Context

| Pattern | Used By | Strivio Implementation |
|---------|---------|----------------------|
| Recovery / readiness score | Whoop, Oura, Fitbod | Composite recovery score: sleep + mood + HRV + activity (Premium) |
| Sleep tracking with stages | Whoop, Oura, Apple Health | Auto-imported with stages breakdown and FAQ (Premium) |
| HRV monitoring | Whoop, Oura, Apple Health | Read-only HRV from Apple Health (Premium) |
| Daily mood check-in | Whoop (journal), Oura (tags) | Single-tap daily mood prompt (Free) |
| Nutrition macro summary | MyFitnessPal, Cronometer | Daily card with progress bars (Free) + 7-day chart (Premium) |
| 2-week workout schedule | Freeletics (coach program), Fitbod | Full 14-day plan from Coach Activity Tab (Free) |
| Weekly progress insights | Fitbod, Strong, Hevy | Completion rate, consistency, volume with trends (Premium) |
| Steps tracking with goal | Apple Health, Google Fit, Fitbit | Steps vs. goal with progress ring (Free) |
| AI coaching chat | Freeletics (digital coach), Fitbod (AI), Whoop (AI coach) | Hybrid AI + rule-based engine grounded in user data (Premium) |
| Multi-tab coach dashboard | Freeletics, Fitbod | Three tabs: Recovery, Nutrition, Activity |
| Cross-feature data synthesis | Whoop, Oura | Recovery score combines sleep, mood, HRV, and activity |

---

## Related Documents

- `brief.md` — Overall app brief summary
- `log-book-brief.md` — Log Book flow (nutrition data source for Coach Nutrition Tab)
- `workout-tab-brief.md` — Workout Tab flow (activity data source for Coach Activity Tab)
- `auth-flow-brief.md` — Authentication & onboarding flow
- `onboarding-intake-brief.md` — Onboarding & intake flow (coach selection, profile data)
- `brief-analysis.md` — Design analysis and inspiration
