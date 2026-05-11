# Strivio More & Settings - Flow Brief

## Overview

This document describes the complete More and Settings user flow for the Strivio fitness & nutrition coaching app. The More page is the account, preferences, plan-management, notification, data, and support hub. It is one of the four main app pages (Home, Logbook, Coach, More) and controls the settings that shape the user's personalized plan after onboarding.

The flow is not only a static settings list. Several settings have product-level consequences: changing goals, gym style, training preferences, or rerunning the intake can trigger plan regeneration; changing coach updates the app's coaching persona immediately; notification settings affect daily habit loops; account actions affect authentication, data export, logout, and deletion.

---

## Flow Diagram Summary

```
MORE & SETTINGS FLOW

More - Settings and Account (Entry Point)
    |
    |-- Personal Goals
    |   |-- Edit goals, target weight, pace, or motivation
    |   |-- Send plan-change alert notification on update
    |   |-- Feed changes into plan-generation logic
    |   |-- Prompt: apply new plan now or from next scheduled week?
    |       |-- Apply now -> new plan generated immediately
    |       |-- Apply next week -> current plan continues, update queued
    |
    |-- Gym Style and Preferences
    |   |-- Update equipment, training style, preferred days
    |   |-- Save changes
    |   |-- Feed changes into plan-generation logic
    |   |-- Prompt: apply new plan now or from next scheduled week?
    |       |-- Apply now -> new plan generated immediately
    |       |-- Apply next week -> current plan continues, update queued
    |
    |-- Re-run Intake
    |   |-- Full 15-question form is triggered again
    |   |-- New plan generated
    |   |-- Old plan replaced
    |
    |-- Change Coach
    |   |-- Select from coach personas
    |   |-- Applies immediately
    |
    |-- Notification Settings
    |   |-- Workout reminders + preferred time
    |   |-- Meal logging reminders
    |       |-- Breakfast reminder toggle
    |       |-- Lunch reminder toggle
    |       |-- Dinner reminder toggle
    |       |-- Snacks reminder toggle
    |   |-- Sleep log prompts
    |   |-- Streak nudges
    |   |-- Plan-change alerts
    |   |-- Coach proactive check-ins (phase 2)
    |
    |-- Change Password
    |   |-- Current password + new password + confirmation
    |   |-- Firebase Auth password update
    |
    |-- Logout
    |   |-- Confirmation dialog
    |   |-- Return to login screen
    |
    |-- Delete Account
    |   |-- Confirmation dialog with warning
    |   |-- All user data deleted from Firebase
    |   |-- Return to registration screen
    |
    |-- Profile Overview
    |   |-- Name, age, weight, goal, coach, membership status
    |
    |-- Privacy and Data Documents
    |   |-- Accessible without login
    |
    |-- Help and Support
    |   |-- FAQ or contact
    |
    |-- Sync Data
    |   |-- Manual trigger for Apple Health or Google Fit
    |
    |-- Export User Data
        |-- Downloadable file
        |-- Premium
```

---

## Stage-by-Stage Breakdown

---

### Stage 1: More - Entry Point

The More page is accessed from the main bottom navigation bar. It groups account identity, plan preferences, notification settings, data controls, support, and destructive account actions in one place.

**Primary Entry Method:**
- Tap nav-bar "More" icon -> opens More / Settings and Account

**Primary Role:**
- Review user profile and membership status
- Edit personal goals and training preferences
- Manage the active coach persona
- Control notification habits
- Sync, export, or delete data
- Change password or log out

**Information Architecture:**
- Settings should be grouped by intent, not just listed alphabetically

| Group | Purpose |
|-------|---------|
| **Profile & Plan** | Identity, membership, goals, and plan state |
| **Training Preferences** | Equipment, training style, frequency, and preferred days |
| **Coach** | Coach persona selection and coach identity |
| **Notifications** | Workout, meal, sleep, streak, and plan-change reminders |
| **Data & Privacy** | Sync, export, privacy documents, and data controls |
| **Account** | Password, logout, and delete account |
| **Help** | FAQ, contact, and troubleshooting |

**Design Notes:**
- This is a utility surface, so it should feel calm, scannable, and predictable
- Destructive actions should be visually separated from everyday preferences
- Premium-only settings should remain visible when they help explain upgrade value

---

### Stage 2: Profile Overview

The profile overview gives the user a compact snapshot of the account and plan identity.

**What's displayed:**
| Field | Description |
|-------|-------------|
| **Name** | User's preferred name from onboarding or account profile |
| **Age** | Current age used for plan and nutrition calculations |
| **Weight** | Current weight used for calorie, protein, and progress calculations |
| **Goal** | Primary personal goal, such as lose weight, build muscle, maintain fitness |
| **Coach** | Selected digital coach persona |
| **Membership status** | Free or Premium, with renewal/status details if applicable |

**Interactions:**
- Tap profile area -> opens editable profile details
- Tap membership status -> opens Premium management or upgrade screen
- Tap coach row -> opens Change Coach flow

**Design Notes:**
- Keep this section short and above the fold
- Use the coach avatar as a visual anchor
- Do not overload this card with every metric; detailed goal changes belong in Personal Goals

---

### Stage 3: Personal Goals

Personal Goals lets the user update the outcome targets that drive Strivio's plan generation.

**Editable settings:**
| Setting | Description |
|---------|-------------|
| **Primary goal** | Lose weight, gain muscle, maintain fitness, improve health, etc. |
| **Target weight** | Desired target weight, if relevant to the goal |
| **Goal pace** | Rate of loss/gain or intensity of change |
| **Motivation** | User's underlying reason, used for coaching language |
| **Activity priority** | Optional emphasis, such as strength, cardio, mobility, or general fitness |

**Flow:**
| Step | Action | Description |
|------|--------|-------------|
| 1 | Open Personal Goals | User taps "Personal Goals" from More |
| 2 | Edit values | User updates goal-related settings |
| 3 | Save changes | App validates the changes |
| 4 | Plan-change alert | Notification or inline alert explains that plan recommendations may change |
| 5 | Plan-generation logic | New goal data is fed into plan generation |
| 6 | Apply timing prompt | User chooses whether changes apply now or next scheduled week |

**Plan Apply Decision:**
| Option | Result |
|--------|--------|
| **Apply now** | New plan is generated immediately and replaces relevant current recommendations |
| **Apply next week** | Current plan continues; new plan is queued for the next scheduled week |

**Design Notes:**
- This flow should avoid surprise plan changes. Always explain when a change affects the user's plan.
- "Apply next week" should be the calmer default when the user is mid-week or has workouts already scheduled.
- Goal changes may affect nutrition targets, workout schedule, coach messaging, and progress expectations.

---

### Stage 4: Gym Style and Preferences

Gym Style and Preferences controls the training environment and workout plan constraints.

**Editable settings:**
| Setting | Description |
|---------|-------------|
| **Equipment access** | Full gym, dumbbells, bands, bodyweight, home equipment, etc. |
| **Training style** | Strength, hypertrophy, cardio, mixed, mobility, HIIT, etc. |
| **Preferred days** | Days of week the user wants to train |
| **Training frequency** | Weekly workout count |
| **Workout duration** | Preferred session length |
| **Workout location** | Gym, home, outdoor, hybrid |

**Flow:**
| Step | Action | Description |
|------|--------|-------------|
| 1 | Open Gym Style and Preferences | User taps the settings row |
| 2 | Update constraints | User edits equipment, style, and preferred days |
| 3 | Save changes | App validates schedule feasibility |
| 4 | Feed into plan generation | Preferences update the workout generator |
| 5 | Apply timing prompt | User chooses now or next week |

**Design Notes:**
- Changes here primarily affect the Workout Tab and Coach Activity Tab
- If preferred days conflict with training frequency, guide the user before saving
- If equipment is removed, future workouts should avoid unavailable equipment; past logged workouts remain unchanged
- Show a preview of impacted schedule changes when possible

---

### Stage 5: Plan Regeneration Decision Point

Plan regeneration appears after meaningful Personal Goals or Gym Style changes.

**Triggering changes:**
- Primary goal changes
- Target weight or pace changes
- Equipment availability changes
- Training style changes
- Training frequency changes
- Preferred training days changes
- Full intake rerun

**Decision Prompt:**
```
Apply updated plan now or from next scheduled week?

[Apply now]        [Apply next week]
```

**Branch A - Apply Now:**
- New plan generated immediately
- Existing future schedule is replaced
- Current-day workout may be replaced if not already completed
- Nutrition targets may update immediately
- Plan-change notification is sent or shown

**Branch B - Apply Next Week:**
- Current plan remains active through the current schedule period
- New settings are saved as pending plan inputs
- New plan starts next week or the next plan cycle
- User sees a queued-change status

**Design Notes:**
- This is one of the most important trust moments in the settings flow
- The app should clearly state what will change and what will not
- If a workout is already completed, it must not be overwritten
- If the user is in an active workout, plan changes should be queued automatically until after completion

---

### Stage 6: Re-run Intake

Re-run Intake restarts the full onboarding intake questionnaire.

**Flow:**
| Step | Action | Description |
|------|--------|-------------|
| 1 | User taps Re-run Intake | App explains that the full 15-question form will run again |
| 2 | User confirms | Full intake sequence starts |
| 3 | User completes q1-q15 | New profile, goal, body, diet, and training answers are collected |
| 4 | Plan generation runs | New plan is generated from the full response set |
| 5 | Old plan replaced | Existing active plan is replaced by the newly generated plan |

**Design Notes:**
- This should feel like a reset of personalization, not a minor edit
- Warn that the active plan may be replaced
- Preserve historical logs; only future plan recommendations should change
- Consider offering "review before replacing" after plan generation

---

### Stage 7: Change Coach

Change Coach lets the user switch digital coach personas.

**Flow:**
| Step | Action | Description |
|------|--------|-------------|
| 1 | Open Change Coach | User taps Change Coach from More |
| 2 | Browse coach personas | User sees available coach cards |
| 3 | Select coach | User picks a persona |
| 4 | Apply immediately | Coach identity updates throughout the app |

**What's affected:**
- Coach avatar
- Coach name
- Coach Chat greeting and tone
- Coach cards and plan explanations
- Reveal / plan copy where the coach is referenced

**Design Notes:**
- Changing coach should not regenerate the user's plan by itself
- The selection should apply immediately after confirmation
- If the selected coach has a specialty, show it clearly so the choice feels meaningful

---

### Stage 8: Notification Settings

Notification Settings controls the reminders and nudges that support daily habits.

**Notification Categories:**
| Category | Controls | Purpose |
|----------|----------|---------|
| **Workout reminders** | Toggle + preferred time | Remind user before scheduled workouts |
| **Meal logging reminders** | Master toggle + meal toggles | Prompt food logging at relevant times |
| **Sleep log prompts** | Toggle | Remind user to enter sleep manually if not synced |
| **Streak nudges** | Toggle | Encourage continuity without over-notifying |
| **Plan-change alerts** | Toggle | Notify when a plan changes or queued plan becomes active |
| **Coach proactive check-ins** | Toggle | Phase 2 feature for coach-initiated messages |

#### 8A. Workout Reminders

Workout reminders help the user keep their training schedule.

**Settings:**
- Enable/disable workout reminders
- Set preferred reminder time
- Optional: remind relative to workout time, such as 30 minutes before

**Design Notes:**
- If no workout is scheduled, do not send a generic reminder unless the user explicitly opts into it
- Respect rest days
- If notification permissions are disabled, show an OS settings CTA

#### 8B. Meal Logging Reminders

Meal logging reminders are split by meal slot.

**Meal toggles:**
| Meal | Behavior |
|------|----------|
| **Breakfast** | Morning reminder to log breakfast |
| **Lunch** | Midday reminder to log lunch |
| **Dinner** | Evening reminder to log dinner |
| **Snacks** | Flexible reminder for snack logging |

**Design Notes:**
- Meal toggles should sit under a master "Meal logging reminders" toggle
- Turning off the master toggle disables all meal-specific toggles
- Reminder times should default to typical meal windows but be editable later

#### 8C. Sleep Log Prompts

Sleep log prompts remind users to enter bedtime and wake time if sleep is not synced from Apple Health or Google Fit.

**Design Notes:**
- Only show this as useful if manual sleep entry exists in the product
- If health sync is connected and sleep data is reliable, reduce prompt frequency

#### 8D. Streak Nudges

Streak nudges encourage consistency across logging, workouts, or check-ins.

**Design Notes:**
- These should be low-pressure and easy to disable
- Avoid guilt-based copy
- Pair with user-visible streak logic in Home or Coach if the feature is active

#### 8E. Plan-Change Alerts

Plan-change alerts notify users when settings changes produce new plan recommendations.

**Triggered by:**
- Personal Goals update
- Gym Style and Preferences update
- Re-run Intake
- Queued plan becoming active next week

#### 8F. Coach Proactive Check-ins (Phase 2)

Coach proactive check-ins are a future feature where the coach initiates messages based on user behavior.

**Potential triggers:**
- Missed workouts
- Several days without food logging
- Low recovery score
- Strong streak continuation
- Plan adherence milestones

**Design Notes:**
- The flow labels this as phase 2, so MVP can show disabled or hidden controls until supported
- If visible before launch, label clearly as "coming soon" or omit it from production

---

### Stage 9: Change Password

Change Password updates the user's authentication credentials.

**Flow:**
| Step | Action | Description |
|------|--------|-------------|
| 1 | User opens Change Password | Form displays current password, new password, confirmation |
| 2 | User enters current password | Required for security re-authentication |
| 3 | User enters new password | Validate strength and minimum length |
| 4 | User confirms new password | Must match new password |
| 5 | Submit | Firebase Auth password update runs |
| 6 | Success state | Confirmation shown; user remains logged in |

**Validation:**
- Current password required
- New password minimum length and strength rules
- New password cannot equal current password
- Confirmation must match

**Design Notes:**
- Password fields should support show/hide toggles
- Errors should be field-level and specific
- On Firebase re-auth failure, ask user to retry current password

---

### Stage 10: Logout

Logout ends the current session.

**Flow:**
| Step | Action | Description |
|------|--------|-------------|
| 1 | User taps Logout | Confirmation dialog opens |
| 2 | User confirms | Session token/local auth state is cleared |
| 3 | App redirects | User returns to login screen |

**Design Notes:**
- Use a simple confirmation dialog
- Keep "Cancel" visually safer than "Logout"
- Do not clear stored account data that belongs to the authenticated profile unless requested

---

### Stage 11: Delete Account

Delete Account permanently removes the user's account and stored data.

**Flow:**
| Step | Action | Description |
|------|--------|-------------|
| 1 | User taps Delete Account | Warning dialog opens |
| 2 | App explains consequences | All user data will be deleted from Firebase |
| 3 | User confirms intentionally | Require strong confirmation, such as typing DELETE |
| 4 | Backend deletion runs | Account and associated user data are deleted |
| 5 | App redirects | User returns to registration screen |

**Data affected:**
- Account profile
- Onboarding answers
- Active plan and queued plan inputs
- Food logs
- Workout history
- Coach settings
- Notification settings
- Health sync tokens, if stored

**Design Notes:**
- This must be visually separated from Logout and Change Password
- Use explicit permanent-deletion language
- Offer data export before deletion when possible

---

### Stage 12: Privacy and Data Documents

Privacy and data documents are accessible without login.

**Content:**
- Privacy Policy
- Terms of Service
- Data processing explanation
- Health data usage explanation
- Account deletion/data rights explanation

**Design Notes:**
- These documents should be readable even after logout
- Avoid blocking document access behind authentication
- Link them from auth screens as well as More

---

### Stage 13: Help and Support

Help and Support provides FAQ and contact options.

**Content:**
| Area | Examples |
|------|----------|
| **FAQ** | Plan generation, food logging, workout schedule, Premium, sync |
| **Contact** | Email support, support form, bug report |
| **Troubleshooting** | Notifications, Health sync, password reset, missing logs |

**Design Notes:**
- FAQ should be searchable or grouped by topic
- Include app version and user ID in support metadata when available
- Keep support accessible from auth states for account recovery

---

### Stage 14: Sync Data

Sync Data manually refreshes Apple Health or Google Fit data.

**Flow:**
| Step | Action | Description |
|------|--------|-------------|
| 1 | User taps Sync Data | App checks connected provider |
| 2 | Sync starts | Sleep, steps, activity, and related health metrics are refreshed |
| 3 | Success state | App shows last synced time |
| 4 | Dependent views update | Coach Recovery, Coach Activity, Home, and plan context refresh |

**Data sources:**
- Apple Health
- Google Fit

**Design Notes:**
- Show last sync timestamp
- If not connected, show provider setup CTA
- If permissions are partial, explain which data types are missing

---

### Stage 15: Export User Data (Premium)

Export User Data lets Premium users download their data.

**Export contents:**
- Profile data
- Onboarding answers
- Goals and plan settings
- Food logs
- Workout history
- Coach preferences
- Notification settings
- Health sync metadata, where legally appropriate

**Format:**
- Downloadable file
- Recommended MVP format: JSON or CSV bundle

**Premium Gate:**
- Export user data is Premium in the flow
- Free users see a locked row or paywall prompt

**Design Notes:**
- This feature overlaps with data rights expectations; product/legal should decide whether export can remain Premium in all markets
- Show export generation progress if the file is large
- Provide a clear success state when the file is ready

---

## Free vs. Premium Feature Matrix

| Feature | Free | Premium |
|---------|------|---------|
| More page access | Yes | Yes |
| Profile overview | Yes | Yes |
| View membership status | Yes | Yes |
| Edit personal goals | Yes | Yes |
| Plan regeneration from goal changes | Yes | Yes |
| Apply plan now / next week prompt | Yes | Yes |
| Edit gym style and preferences | Yes | Yes |
| Update equipment, training style, preferred days | Yes | Yes |
| Re-run full 15-question intake | Yes | Yes |
| Change coach persona | Yes | Yes |
| Notification settings | Yes | Yes |
| Workout reminders | Yes | Yes |
| Meal logging reminders | Yes | Yes |
| Sleep log prompts | Yes | Yes |
| Streak nudges | Yes | Yes |
| Plan-change alerts | Yes | Yes |
| Coach proactive check-ins | No / Phase 2 | Phase 2 |
| Change password | Yes | Yes |
| Logout | Yes | Yes |
| Delete account | Yes | Yes |
| Privacy and data documents | Yes | Yes |
| Help and support | Yes | Yes |
| Manual Apple Health / Google Fit sync | Yes | Yes |
| Export user data | No | Yes |

---

## Integration Points

### External APIs & Platforms

| API / Service | Purpose | Used In |
|---------------|---------|---------|
| **Firebase Auth** | Password update, logout, account identity | Change Password, Logout, Delete Account |
| **Firebase / Backend Database** | Store user profile, preferences, logs, plan state | Personal Goals, Preferences, Delete Account, Export |
| **Apple Health / HealthKit** | Manual sync for sleep, steps, activity, HRV | Sync Data, Coach Recovery, Coach Activity |
| **Google Fit** | Manual sync for sleep, steps, activity | Sync Data, Coach Recovery, Coach Activity |
| **Push Notification Service** | Reminders, nudges, plan-change alerts | Notification Settings |
| **Plan Generation Engine** | Rebuilds or queues personalized plans | Goals, Preferences, Re-run Intake |

### Internal Data Dependencies

| Data Source | Consumed By |
|-------------|-------------|
| **Onboarding answers** | Profile overview, Personal Goals, Re-run Intake |
| **Personal goals** | Plan generation, Coach messaging, Nutrition targets |
| **Gym preferences** | Workout plan generation, Coach Activity, Workout Tab |
| **Selected coach** | Coach Chat, Coach cards, onboarding reveal copy |
| **Notification preferences** | Reminder scheduler and habit prompts |
| **Health sync data** | Home Tracking, Coach Recovery, Coach Activity |
| **Membership status** | Premium gates, export access, advanced features |

### Cross-Tab Navigation

| From | To | Purpose |
|------|----|---------|
| More -> Personal Goals | Coach / Workout / Logbook data model | Goal changes update plan, nutrition targets, and coaching context |
| More -> Gym Preferences | Workout Tab | Equipment and preferred days shape future workouts |
| More -> Re-run Intake | Onboarding intake q1-q15 | Full personalization reset |
| More -> Change Coach | Coach persona selection | Switch coach identity across the app |
| More -> Sync Data | Coach Recovery / Activity, Home Tracking | Refresh health data displayed elsewhere |
| More -> Notification Settings | Device notification layer | Control reminders and nudges |
| More -> Privacy Documents | Auth screens and public docs | Legal/data access without login |

### Data Flow

```
User edits goals or gym preferences
    -> Settings saved
        -> Plan-generation inputs updated
            -> User chooses apply now or next week
                -> New plan generated immediately OR queued
                    -> Workout schedule, nutrition targets, Coach context update

User reruns intake
    -> Full q1-q15 answers collected again
        -> Plan generation runs
            -> Old active plan replaced

User updates notifications
    -> Reminder preferences saved
        -> Scheduler updates workout, meal, sleep, streak, and plan-change notifications

User syncs health data
    -> Apple Health / Google Fit refresh
        -> Sleep, steps, activity metrics update
            -> Home, Coach Recovery, Coach Activity refresh

User deletes account
    -> Confirmation completed
        -> Firebase Auth account and user data deleted
            -> App returns to registration screen
```

---

## Key Design Patterns & Observations

**More is the control center for personalization** - unlike a simple account menu, this flow directly changes the plan-generation inputs. Goal and preference edits must be treated as high-impact actions because they can change workouts, nutrition targets, and coach advice.

**Plan-change timing is the critical trust pattern** - the flow explicitly asks whether to apply a new plan now or next week. This prevents the app from unexpectedly replacing a user's current schedule after a small settings change.

**Re-run Intake is the deepest reset path** - Personal Goals and Gym Preferences are targeted edits; Re-run Intake is a full personalization reset. It should be framed as a broader recalibration and not mixed with quick settings.

**Coach changes are identity changes, not plan changes** - selecting a new coach applies immediately but should not regenerate the plan. The coach affects tone, avatar, and messaging, while goals and preferences affect the plan logic.

**Notifications support habit loops** - workout reminders, meal reminders, sleep prompts, streak nudges, and plan-change alerts map directly to the app's main recurring behaviors. The settings should help users tune reminders instead of feeling spammed.

**Meal reminder granularity matters** - the flow breaks meal logging reminders into breakfast, lunch, dinner, and snacks. This is important because users may only need reminders for specific weak spots.

**Plan-change alerts close the loop** - because goal and preference edits can generate or queue new plans, alerts help users understand when a plan has changed and why.

**Data and privacy are part of trust** - sync, export, documents, and delete account all live in More. They should be easy to find and written plainly.

**Export is marked Premium, but needs product/legal review** - the flow labels downloadable export as Premium. In some markets, data portability obligations may require a free account-data export path. Treat this as a product/legal decision, not only monetization.

**Destructive account actions need isolation** - Logout and Delete Account are visually adjacent in the flow but should not feel equivalent. Delete Account needs stronger confirmation, warning copy, and ideally an export prompt.

---

## Error States & Edge Cases

| Scenario | Handling |
|----------|----------|
| **User changes goals mid-week** | Show apply timing prompt. Recommend "Apply next week" if scheduled workouts are already in progress. |
| **User has completed today's workout before applying new plan** | Preserve completed workout log; only future plan items change. |
| **User is currently in an active workout** | Queue plan changes until workout completion or next plan cycle. |
| **Goal changes create unrealistic target pace** | Show validation guidance and ask user to choose a safer pace. |
| **Preferred days conflict with frequency** | Prevent save or ask user to add more days/reduce frequency. |
| **Equipment changes invalidate future workouts** | Regenerate or swap future workouts that require unavailable equipment. |
| **Plan generation fails** | Keep current plan active and show retry option. Do not leave user without a plan. |
| **Queued plan exists and user edits settings again** | Update pending plan inputs or ask whether to replace the queued change. |
| **Notification permissions disabled at OS level** | Show local settings state and CTA to open device notification settings. |
| **Health provider not connected during manual sync** | Show provider connection CTA instead of failed-sync error. |
| **Partial health permissions granted** | Sync available data and explain missing permissions clearly. |
| **Firebase password update requires re-authentication** | Ask for current password again and keep new password fields intact where safe. |
| **Logout fails due to network** | Clear local session if safe; otherwise show retry and current account state. |
| **Delete account fails halfway** | Show recoverable error, keep user signed in if account still exists, and avoid partial local cleanup. |
| **Export generation fails** | Show retry option and support link. |
| **Privacy documents opened while logged out** | Allow access without auth and provide return-to-login navigation. |

---

## UX Considerations

- **Group settings by user intent:** Users should not need to know implementation categories. Use plain groups like Profile, Plan, Coach, Notifications, Data, Account.
- **Confirm before high-impact changes:** Goal, preference, intake, and delete actions need clear confirmation because they can affect plans or data.
- **Explain plan impact before applying:** If workouts, calories, macros, or coach advice will change, say so before the user confirms.
- **Preserve history:** Changing preferences should affect future recommendations, not rewrite completed food logs, workout logs, or historical recovery data.
- **Make queued changes visible:** If a plan update starts next week, show a "Queued for next week" status somewhere in More and Coach Activity.
- **Use calm reminder language:** Notification copy should feel supportive and easy to disable.
- **Separate destructive actions:** Delete Account belongs in a danger zone with stronger styling and spacing.
- **Use exact sync timestamps:** "Last synced 2 hours ago" is more trustworthy than a generic connected state.
- **Avoid surprise paywalls in account basics:** Export is Premium in the flow, but privacy documents, delete account, logout, password change, and support should remain accessible.
- **Support recovery paths:** Help and privacy docs must be accessible without login for users who cannot access their account.

---

## Competitive Context

| Pattern | Used By | Strivio Implementation |
|---------|---------|----------------------|
| Plan preference editing | Freeletics, Fitbod, Centr | Personal Goals and Gym Preferences feed plan regeneration |
| Apply plan now/later | TrainingPeaks, coaching apps | User chooses immediate replacement or next-week queue |
| Full onboarding retake | Noom, Freeletics | Re-run full 15-question intake to rebuild personalization |
| Coach persona switching | Freeletics-style digital coaching | Change coach persona applies immediately across app tone and visuals |
| Granular meal reminders | MyFitnessPal, Lose It!, Yazio | Breakfast, lunch, dinner, and snack reminder toggles |
| Workout reminder timing | Fitbod, Strong, Apple Fitness | Workout reminders with preferred time |
| Manual health sync | Apple Health-connected fitness apps | Manual refresh for Apple Health / Google Fit data |
| Data export | Fitbit, Apple Health, MyFitnessPal | Downloadable user data file (Premium in flow) |
| Account deletion | Most consumer health apps | Confirmation dialog with Firebase deletion and redirect |
| Proactive coach nudges | Whoop Coach, Oura Advisor, Freeletics | Phase 2 proactive coach check-ins |

---

## Related Documents

- `brief.md` - Overall app brief summary
- `auth-flow-brief.md` - Authentication flow and account entry points
- `onboarding-intake-brief.md` - Intake questions and initial personalization
- `coach-brief.md` - Coach flow, recovery, nutrition, activity, and chat
- `log-book-brief.md` - Nutrition logging and macro data source
- `workout-tab-brief.md` - Workout plan, execution, settings, and schedule management
- `brief-analysis.md` - Design analysis and inspiration
