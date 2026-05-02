# Strivio Onboarding & Intake Flow — Brief

## App Context
Strivio is a personalized fitness + nutrition app that replaces the need for a personal trainer. Users complete a mandatory intake after signup, after which the app auto-generates a 2-week workout plan and daily nutrition targets. Revenue model: **freemium**.

---

## Flow Overview (8 Stages)

### 1. Entry
After registration/login, user enters the onboarding flow. No skip option.

### 2. Q1–Q5: Identity & Goals
| Q | Field | Input | Notes |
|---|-------|-------|-------|
| Q1 | Preferred name | Text | Personalization |
| Q2 | Primary goals | Multi-select (max 2) | e.g. weight loss, muscle gain |
| Q3 | Motivations | Multi-select (max 2) | |
| Q4 | Gender | Single-select | |
| Q5 | Activity level | Single-select (with descriptions) | Self-assessed |

### 3. Q6–Q10: Body Data
| Q | Field | Input | Notes |
|---|-------|-------|-------|
| Q6 | Age | Numeric | |
| Q7 | Height | Numeric (cm) | |
| Q8 | Current weight | Numeric (kg) | |
| Q9 | Target weight | Numeric (kg) | |
| Q10 | Weight change pace | Slider (0.25–1.5 kg/wk) | Validated |

**Validation gate:** System checks if pace is *realistic* given the weight gap. Unrealistic → user must adjust.

### 4. Q11–Q15: Preferences
| Q | Field | Input | Notes |
|---|-------|-------|-------|
| Q11 | Diet preference | Single-select | |
| Q12 | Training location | Single-select | Gym, home, etc. |
| Q13 | Fitness level | Single-select | Self-assessed |
| Q14 | Training frequency | Slider (1–7 days/wk) | |
| Q15 | Preferred training days | Multi-select (Mon–Sun) | **Optional** |

**Validation gate:** Do selected days match chosen frequency? Mismatch → warning + prompt to adjust.

### 5. Cross-Question Conflict Validation
Full conflict check across all 15 answers. Conflicts detected → show warning, highlight conflicting answers, user adjusts.

### 6. Coach Selection
User browses digital coach personas and selects one. This coach becomes their personal guide throughout the app.

### 7. Plan Generation
Backend generates 2-week workout plan + daily nutrition targets. UX: loading animation → plan reveal screen.

### 8. Route to Home
User enters the main app. Onboarding complete.

---

## Key Observations

**Design pattern** — Linear one-question-per-screen format (Typeform-style). All 15 questions are mandatory except Q15. Three validation gates ensure data quality before plan generation.

**Data purpose** — Every answer feeds the personalization algorithm. The onboarding *is* the core value proposition; the generated plan depends entirely on intake accuracy.

**Coach persona** — Instead of a generic "app," the user selects a digital coach, adding emotional investment and brand personality.

**Visual style** — White background with dark blue accents (per project brief). Flowchart is color-coded: green for start/end, yellow for input screens, blue for decision points, red for warnings.

---

## UX Considerations

- **Length:** 15+ questions is a long flow. Drop-off risk is notable. Consider grouping or progressive profiling.
- **Context micro-copy:** Explaining "why" behind sensitive questions (body measurements) could improve completion rates.
- **Validation friction:** Three validation loops need careful UX — users should feel guided, not corrected.
- **Coach selection screen:** This is an opportunity for differentiation — coach bios, personality, and expertise should feel meaningful, not cosmetic.

---

## Related App Patterns
| App | Similar Pattern |
|-----|----------------|
| Freeletics | Fitness quiz → generated coaching |
| Fitbod | Body data + goals → personalized workouts |
| MacroFactor | Intake → personalized nutrition targets |
| Strong.app | Minimal onboarding, tracking-first (contrast: Strivio is more thorough) |
