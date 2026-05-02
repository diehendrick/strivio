# UI Implementation Prompt: Authentication & Onboarding Screens (Strivio)

## Context

This document covers the **Authentication & Onboarding flow** for Strivio — a personalized fitness & nutrition coaching app. These screens are the user's **first impression** of the app and must balance security, accessibility, and a welcoming tone.

**Screens Covered:**
1. Splash Screen
2. Onboarding Screens (3 screens)
3. Login Screen
4. Registration Screen
5. Forgot Password Flow (2 screens)

---

## Platform
- **Type:** Mobile App (iOS & Android)
- **Recommended Framework:** React Native or Flutter
- **Orientation:** Portrait only
- **Status Bar:** Light content on dark backgrounds, dark content on light backgrounds

---

## Screen Dimensions
- **Mobile Standard:** 375px width (iPhone 13/14) × 812px height
- **Safe Area:** Account for notch (44px top) and home indicator (34px bottom)
- **Scrollable:** Content scrolls when keyboard appears

---

## Visual Design Direction

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Primary Navy** | `#1A2B4A` | Main brand color, buttons, headers |
| **Primary Navy Light** | `#2D4470` | Hover/active states |
| **Primary Navy Muted** | `#E8EDF5` | Light backgrounds, inactive states |
| **Background** | `#FFFFFF` | Screen background (light mode) |
| **Background Alt** | `#F5F6FA` | Alternate backgrounds |
| **Surface** | `#FFFFFF` | Cards, modals |
| **Text Primary** | `#1A1D26` | Main text, headings |
| **Text Secondary** | `#6B7280` | Body text, labels |
| **Text Muted** | `#9CA3AF` | Placeholders, hints |
| **Accent Green** | `#10B981` | Success states, checkmarks |
| **Accent Red** | `#EF4444` | Error states |
| **Google Blue** | `#4285F4` | Google SSO button |
| **Apple Black** | `#000000` | Apple SSO button |
| **Divider** | `#E5E7EB` | Borders, separators |
| **Shadow** | `rgba(26, 43, 74, 0.08)` | Card/button shadows |

### Typography

| Element | Font Size | Font Weight | Line Height | Usage |
|---------|-----------|-------------|-------------|-------|
| **Heading XL** | 28px | 700 (Bold) | 36px | Splash screen tagline |
| **Heading LG** | 24px | 700 (Bold) | 32px | Screen titles |
| **Heading MD** | 20px | 600 (SemiBold) | 28px | Section headers |
| **Body LG** | 16px | 400 (Regular) | 24px | Body paragraphs |
| **Body** | 14px | 400 (Regular) | 20px | Labels, descriptions |
| **Button** | 16px | 600 (SemiBold) | 24px | Button text |
| **Caption** | 12px | 400 (Regular) | 16px | Helper text, errors |
| **Link** | 14px | 500 (Medium) | 20px | Forgot password, skip |

**Font Family:** Inter (primary), SF Pro (iOS fallback), Roboto (Android fallback)

---

## Spacing System

- **Base Unit:** 8px scale
- **Values:** 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

---

## Screen 1: Splash Screen

### Purpose
Brand introduction while app initializes and checks session status.

### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Status Bar - Light Content]           │
├─────────────────────────────────────────┤
│                                         │
│           (Large Logo)                  │
│                                         │
│              STRIVIO                    │
│                                         │
│      Your Personal Fitness Coach        │  ← Tagline
│                                         │
│                                         │
│              (Loading)                  │  ← Optional spinner
│                                         │
├─────────────────────────────────────────┤
│  [Bottom Brand Mark / Version]          │
└─────────────────────────────────────────┘
```

### Components

| Element | Specification |
|---------|---------------|
| **Logo** | Centered, 120×120px minimum, SVG format |
| **Wordmark** | "STRIVIO" in brand font, 24px Bold, Navy |
| **Tagline** | "Your Personal Fitness Coach" or rotating USPs, 16px Regular, Secondary text |
| **Loading Indicator** | Optional circular spinner, 24px, Navy accent |
| **Background** | Solid Navy (`#1A2B4A`) or gradient (Navy to darker) |

### Timing
- **Display Duration:** 1.5–2 seconds maximum
- **Auto-transition:** To Onboarding (new user) or Home (existing session)
- **Fade Out:** 300ms ease-out

### Dark Mode
- Background: `#0F172A` (darker navy)
- Text: White (`#FFFFFF`)

---

## Screen 2–4: Onboarding Screens (3 Screens)

### Purpose
Introduce new users to Strivio's unique value propositions before account creation.

### Layout Structure (Per Screen)

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│                                         │
│           (Illustration / Image)        │
│         40% of screen height            │
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │     USP Headline (Bold, 24px)     │  │
│  │                                   │  │
│  │  Supporting description text      │  │
│  │  explaining the benefit in        │  │
│  │  2–3 sentences. Keep it clear     │  │
│  │  and motivating.                  │  │
│  │                                   │  │
│  │  •  Page indicator dots           │  │
│  │     ○ ○ ●                         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      [ Next ]  or  [Get Started]  │  │  ← CTA Button
│  │                                   │  │
│  │      [ Skip ]  (optional)         │  │  ← Secondary action
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Screen 1: USP 1 — Personalized Plans

| Element | Content |
|---------|---------|
| **Headline** | "Plans That Grow With You" |
| **Description** | "Get personalized nutrition and workout plans adapted to your goals, schedule, and progress." |
| **Illustration** | Abstract representation of a custom plan or calendar with checkmarks |
| **CTA** | "Next" |

### Screen 2: USP 2 — Digital Coach

| Element | Content |
|---------|---------|
| **Headline** | "Your Coach, Always Available" |
| **Description** | "Receive daily guidance, track your progress, and chat with your AI-powered personal coach." |
| **Illustration** | Chat interface mockup or coach avatar with notification badges |
| **CTA** | "Next" |

### Screen 3: USP 3 + CTA — All-in-One Platform

| Element | Content |
|---------|---------|
| **Headline** | "Everything You Need in One App" |
| **Description** | "Track workouts, log meals, monitor progress, and stay motivated with streaks and insights." |
| **Illustration** | Dashboard mockup showing multiple metrics (calories, steps, score) |
| **Primary CTA** | "Get Started" → Routes to Registration |
| **Secondary CTA** | "Already have an account? Log In" → Routes to Login |

### Page Indicators

| State | Style |
|-------|-------|
| **Active** | Filled circle, 8px diameter, Navy (`#1A2B4A`) |
| **Inactive** | Outlined circle, 8px diameter, Muted (`#9CA3AF`) |
| **Spacing** | 8px gap between dots |

### Interactions

| Action | Behavior |
|--------|----------|
| **Tap Next** | Slide to next screen (300ms slide animation) |
| **Swipe Left/Right** | Navigate between screens (gesture-based) |
| **Tap Skip** (if enabled) | Fade to Login screen (200ms) |
| **Tap Get Started** | Navigate to Registration (push animation) |
| **Tap Log In** | Navigate to Login (push animation) |

### Image Specifications

| Property | Value |
|----------|-------|
| **Style** | Flat illustration or 3D render, consistent with brand |
| **Color Palette** | Navy primary, with accent colors (green, blue, orange) |
| **Aspect Ratio** | 1:1 or 4:3, centered |
| **Format** | SVG or PNG @2x/@3x |

---

## Screen 5: Login Screen

### Purpose
Authenticate returning users.

### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│                                         │
│  Welcome Back                           │  ← Heading
│  Log in to continue                     │  ← Subheading |
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Email *                          │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ your@email.com              │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Password *                       │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ ••••••••••••        [👁]    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  [ ] Remember me     [Forgot?]   │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │       [  Log In  ]          │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ────────── Or ──────────         │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  [G] Continue with Google   │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  [] Continue with Apple    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Don't have an account? [Sign Up]│  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Components

#### Input Fields

| Field | Type | Validation | Keyboard |
|-------|------|------------|----------|
| **Email** | Text input | Required, email format | Email keyboard |
| **Password** | Secure text input | Required, min 8 chars | Default (hidden) |

#### Input Field Specifications

| Property | Value |
|----------|-------|
| **Height** | 48px |
| **Padding** | 12px 16px |
| **Border Radius** | 10px |
| **Border** | 1px solid `#E5E7EB` (default), `#1A2B4A` (focus), `#EF4444` (error) |
| **Background** | `#FFFFFF` |
| **Text** | 16px Regular, `#1A1D26` |
| **Placeholder** | 16px Regular, `#9CA3AF` |
| **Label** | 14px SemiBold, `#1A1D26`, 8px bottom margin |
| **Error Text** | 12px Regular, `#EF4444`, 4px top margin |

#### Password Visibility Toggle

| State | Icon |
|-------|------|
| **Hidden** | Eye icon (outline) |
| **Visible** | Eye icon with slash (outline) |

#### Remember Me Checkbox

| Property | Value |
|----------|-------|
| **Size** | 20×20px |
| **Checked** | Navy background, white checkmark |
| **Label** | 14px Regular, `#6B7280` |

#### Primary Button (Log In)

| Property | Value |
|----------|-------|
| **Height** | 52px |
| **Background** | `#1A2B4A` (Navy) |
| **Text** | White, 16px SemiBold |
| **Border Radius** | 12px |
| **Active** | `#2D4470` (darker navy) |
| **Disabled** | `#E8EDF5` background, `#9CA3AF` text |
| **Loading State** | Spinner replaces text, same dimensions |

#### SSO Buttons

| Button | Icon | Background | Text | Border |
|--------|------|------------|------|--------|
| **Google** | Google "G" logo (color) | `#FFFFFF` | `#1A1D26` | `#E5E7EB` |
| **Apple** | Apple logo (black) | `#000000` | `#FFFFFF` | None |

**SSO Button Specifications:**
- **Height:** 48px
- **Padding:** 0 20px
- **Border Radius:** 12px
- **Icon Size:** 20×20px
- **Text:** 16px SemiBold, left-aligned after icon
- **Layout:** Icon (20px) + 12px gap + Text (centered vertically)

#### Divider ("Or")

| Property | Value |
|----------|-------|
| **Line Color** | `#E5E7EB` |
| **Line Height** | 1px |
| **Text** | 12px Regular, `#9CA3AF`, 16px padding on each side |

#### Secondary Navigation

| Element | Style | Action |
|---------|-------|--------|
| **Forgot Password?** | 14px Medium, Navy (`#1A2B4A`) | Navigate to Forgot Password flow |
| **Sign Up** | 14px Medium, Navy (`#1A2B4A`) | Navigate to Registration |

### Validation & Error States

| Scenario | Error Message | Display Location |
|----------|---------------|------------------|
| Empty email | "Email is required" | Below email field |
| Invalid email format | "Please enter a valid email" | Below email field |
| Empty password | "Password is required" | Below password field |
| Invalid credentials | "Incorrect email or password" | Toast/banner above form |
| Network error | "Connection failed. Please try again." | Toast/banner |
| Too many attempts | "Too many failed attempts. Try again later." | Toast/banner |

### Interactions

| Action | Behavior |
|--------|----------|
| **Tap Input Field** | Focus, border color changes to Navy, keyboard appears |
| **Tap Password Eye** | Toggle password visibility (instant) |
| **Tap Log In** | Validate → Show loading → Authenticate → Route |
| **Tap Google SSO** | Open Google sign-in sheet → Authenticate → Route |
| **Tap Apple SSO** | Open Apple sign-in sheet → Authenticate → Route |
| **Tap Forgot Password?** | Navigate to Forgot Password screen |
| **Tap Sign Up** | Navigate to Registration screen |
| **Swipe Back Gesture** | Confirm exit or return to previous screen |

### Keyboard Behavior

| Event | Action |
|-------|--------|
| **Focus Email** | Email keyboard appears |
| **Focus Password** | Default keyboard (password mode) |
| **Tap Return/Enter** | Move focus to next field, or submit if on password field |
| **Keyboard Open** | Screen scrolls to keep focused field visible |

---

## Screen 6: Registration Screen

### Purpose
Create new user accounts.

### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│                                         │
│  Create Account                         │  ← Heading
│  Start your fitness journey             │  ← Subheading |
│                                         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Full Name *                      │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ John Doe                    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Email *                          │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ your@email.com              │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Password *                       │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ ••••••••••••        [👁]    │  │  │
│  │  │ ────────────────────────    │  │  │
│  │  │ ●●○○○  Strength             │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  [ ] I agree to Terms & Privacy  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │     [  Create Account  ]    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ────────── Or ──────────         │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  [G] Sign up with Google    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  [] Sign up with Apple     │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Already have an account? [Log In]│ │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Components

#### Input Fields

| Field | Type | Validation | Keyboard |
|-------|------|------------|----------|
| **Full Name** | Text input | Required, min 2 chars | Default |
| **Email** | Text input | Required, email format | Email keyboard |
| **Password** | Secure text input | Required, min 8 chars, 1 uppercase, 1 number | Default (hidden) |

#### Password Strength Indicator

| Strength | Visual | Color |
|----------|--------|-------|
| **Too Short** | ○○○○○ | `#EF4444` (Red) |
| **Weak** | ●○○○○ | `#EF4444` (Red) |
| **Fair** | ●●○○○ | `#F59E0B` (Amber) |
| **Good** | ●●●○○ | `#3B82F6` (Blue) |
| **Strong** | ●●●●● | `#10B981` (Green) |

**Requirements (shown as checklist, optional):**
- [ ] At least 8 characters
- [ ] One uppercase letter
- [ ] One number
- [ ] One special character (optional)

#### Terms & Privacy Checkbox

| Property | Value |
|----------|-------|
| **Size** | 20×20px |
| **Label** | "I agree to the Terms of Service and Privacy Policy" |
| **Links** | "Terms of Service" and "Privacy Policy" are clickable |
| **Validation** | Must be checked before account creation |
| **Error** | "You must agree to the terms" if unchecked on submit |

#### Primary Button (Create Account)

Same specifications as Login button.

### Validation & Error States

| Scenario | Error Message | Display Location |
|----------|---------------|------------------|
| Empty name | "Name is required" | Below name field |
| Name too short | "Name must be at least 2 characters" | Below name field |
| Empty email | "Email is required" | Below email field |
| Invalid email | "Please enter a valid email" | Below email field |
| Email exists | "An account with this email already exists" | Below email field |
| Weak password | Password strength bar shows "Weak" or "Too Short" | Inline in password field |
| Terms not checked | "You must agree to the terms" | Below checkbox |
| Network error | "Connection failed. Please try again." | Toast/banner |

---

## Screen 7–8: Forgot Password Flow

### Screen 7: Enter Email

```
┌─────────────────────────────────────────┐
│  [← Back]                               │
├─────────────────────────────────────────┤
│                                         │
│  Reset Password                         │
│                                         │
│  Enter your email address and we'll     │
│  send you a link to reset your          │
│  password.                              │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Email Address *                  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ your@email.com              │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │     [  Send Reset Link  ]   │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Remember your password? [Log In] │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Screen 8: Confirmation

```
┌─────────────────────────────────────────┐
│  [✓] (Green checkmark icon, 64px)       │
├─────────────────────────────────────────┤
│                                         │
│  Check Your Email                       │
│                                         │
│  We've sent a password reset link to:   │
│  your@email.com                         │
│                                         │
│  Didn't receive it?                     │
│  [Resend Link]  or  [Use Different Email]│
│                                         │
│  [  Back to Login  ]                    │
│                                         │
└─────────────────────────────────────────┘
```

### Flow Behavior

| Step | Action | Result |
|------|--------|--------|
| 1 | User taps "Forgot Password?" on Login | Navigate to Enter Email screen |
| 2 | User enters email, taps "Send Reset Link" | Validate email → Send email → Show Confirmation |
| 3 | User clicks link in email | Open app (or web) to "Set New Password" screen |
| 4 | User enters new password | Validate → Update → Redirect to Login with success message |

---

## Accessibility Requirements

- **Labels:** All inputs have visible labels and aria-labels
- **Error Messages:** Linked to inputs via `aria-describedby`, announced to screen readers
- **Focus Order:** Logical top-to-bottom, left-to-right
- **Touch Targets:** All buttons and inputs minimum 44×44px
- **Contrast:** Minimum 4.5:1 for text, 3:1 for UI components
- **Dynamic Type:** Support text scaling up to 150%
- **Reduced Motion:** Respect system setting for reduced animations

---

## Animations & Transitions

| Transition | Type | Duration | Easing |
|------------|------|----------|--------|
| Splash → Onboarding | Fade out / Fade in | 300ms | ease-out |
| Onboarding Swipe | Slide left/right | 300ms | ease-out |
| Login → Forgot Password | Slide left | 300ms | ease-out |
| Input Focus | Border color transition | 150ms | ease |
| Button Press | Scale 0.98 | 100ms | ease |
| Loading State | Spinner rotation | 1000ms | linear (infinite) |
| Error Shake | Horizontal shake | 400ms | ease-in-out |
| Success Checkmark | Scale + fade in | 300ms | ease-out |

---

## Implementation Notes

1. **Firebase Integration:**
   - Use Firebase Auth for email/password and SSO
   - Handle token persistence automatically
   - Implement session check on app launch

2. **SSO Configuration:**
   - Google: Configure OAuth client ID for iOS and Android
   - Apple: Set up Sign in with Apple capability (iOS only)
   - Handle SSO errors gracefully with fallback options

3. **Security:**
   - Never log passwords or tokens
   - Use HTTPS for all API calls
   - Implement rate limiting for failed login attempts

4. **State Management:**
   - Use a global auth state (Redux, Zustand, Riverpod)
   - Persist session across app restarts
   - Clear state on logout

5. **Deep Linking:**
   - Support password reset deep links
   - Handle SSO callback URLs
   - Route to appropriate screen based on link type

6. **Testing:**
   - Write unit tests for validation logic
   - Integration tests for full auth flows
   - Manual testing on both iOS and Android

---

## Assets Needed

| Asset | Format | Size | Notes |
|-------|--------|------|-------|
| Strivio Logo | SVG + PNG | 120×120px, 240×240px, 360×360px | For splash screen |
| Onboarding Illustrations | SVG + PNG | 300×300px (@2x), 450×450px (@3x) | 3 unique images |
| Google Logo | SVG | 20×20px | Official brand colors |
| Apple Logo | SVG | 20×20px | White for dark button |
| Eye Icon (Visibility) | SVG | 20×20px | Outline style |
| Checkmark Icon | SVG | 20×20px | For success states |
| Back Arrow | SVG | 24×24px | For navigation |

---

## Related Documents

- `auth-flow-brief.md` — Authentication flow documentation
- `ui-prompt-tracking-tab.md` — Home screen (Tracking Tab) UI prompt
- `brief-analysis.md` — Design analysis and inspiration
