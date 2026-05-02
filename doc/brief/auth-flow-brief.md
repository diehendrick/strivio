# Strivio — Authentication & Onboarding Flow Brief

## Overview

This document describes the complete authentication and onboarding user flow for the Strivio fitness & nutrition coaching app. The flow handles new users, returning users, account creation, and session management.

---

## Flow Diagram Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                         │
└─────────────────────────────────────────────────────────────────┘

1. APP LAUNCH
   │
   ├──> [Active session exists?]
   │    │
   │    ├── YES ──> Route to Home
   │    │
   │    └── NO ──> Show Splash Screen
   │         │
   │         └──> [New or Returning user?]
   │              │
   │              ├── NEW ──> Onboarding Screens ──
   │              │                                │
   │              └── RETURNING ──> Login Flow ────┘
   │
   ├──> LOGIN FLOW
   ├──> REGISTRATION FLOW
   ├──> FORGOT PASSWORD FLOW
   └──> SESSION MANAGEMENT (Background)
```

---

## 1. App Launch & Session Check

### Entry Point
- **Trigger:** User opens the app
- **First Check:** Does an active session exist?

### Decision: Active Session Exists?
| Outcome | Action |
|---------|--------|
| **YES** | Route directly to Home screen |
| **NO** | Show Splash Screen, then check if new or returning user |

### Splash Screen
- Shown while session validation occurs
- Branding: Strivio logo, tagline
- Auto-transitions to next screen

---

## 2. Onboarding Screens (New Users Only)

### Purpose
Introduce first-time users to Strivio's unique value propositions (USPs) before requiring account creation or login.

### Screen Sequence (3 screens)

| Screen | Content | CTA |
|--------|---------|-----|
| **Onboarding 1** | USP 1 (Unique Selling Proposition #1) | "Next" or swipe |
| **Onboarding 2** | USP 2 | "Next" or swipe |
| **Onboarding 3** | USP 3 + Primary Call-to-Action | "Get Started" |

### Decision Point: Register or Log In?
After completing onboarding, user chooses:
- **Register** → Go to Registration Flow
- **Log In** → Go to Login Flow

### Design Notes
- Page indicators (dots) showing progress (1/3, 2/3, 3/3)
- Swipe gesture supported between screens
- "Skip" option may be provided (not specified in flow)

---

## 3. Login Flow

### Purpose
Authenticate returning users with existing accounts.

### Screen: Login
**Input Fields:**
- Email (text input, keyboard type: email)
- Password (secure text input)

**Authentication Methods:**
| Method | Button Label | Provider |
|--------|--------------|----------|
| Email/Password | "Log In" | Firebase Auth |
| Google SSO | "Continue with Google" | Google Sign-In |
| Apple SSO | "Continue with Apple" | Apple Sign-In |

**Secondary Actions:**
- "Forgot Password?" link

### Decision: Validate Credentials (Firebase Auth)
| Outcome | Action |
|---------|--------|
| **Valid** | Check if intake completed → Route to Home or Intake |
| **Invalid** | Show login error, offer password reset |

### Post-Login Routing
After successful login:
- **Intake completed before?**
  - **YES** → Route to Home
  - **NO** → Route to Intake

---

## 4. Registration Flow

### Purpose
Create new user accounts.

### Screen: Register
**Input Fields:**
- Name (text input)
- Email (text input, keyboard type: email)
- Password (secure text input, with strength indicator)

**Authentication Methods:**
| Method | Button Label | Provider |
|--------|--------------|----------|
| Email/Password | "Create Account" | Firebase Auth |
| Google SSO | "Sign up with Google" | Google Sign-In |
| Apple SSO | "Sign up with Apple" | Apple Sign-In |

### Validation Checks
Before account creation, validate:
1. **Email format** — Must be valid email syntax
2. **Password strength** — Must meet minimum requirements
3. **Duplicate check** — Email not already registered

### Decision: Validation Passes?
| Outcome | Action |
|---------|--------|
| **Invalid** | Show inline error message (field-level) |
| **Valid** | Create Firebase account → Route to Intake |

### Post-Registration Routing
- After account creation, user is **routed to Intake** (not Home)
- This ensures all new users complete the personalization intake

---

## 5. Forgot Password Flow

### Purpose
Allow users to recover access to their accounts.

### Flow Steps

1. **User taps "Forgot Password?"** on login screen
2. **Screen: Enter registered email**
   - Input field for email address
3. **Action: Send password reset link via email**
   - Confirmation message shown
4. **User receives email, clicks link**
5. **Screen: Set new password**
   - Input: New password (secure text)
   - Input: Confirm password (secure text)
6. **Action: Redirect to login**
   - User returns to login screen with success message

---

## 6. Session Management (Background)

### Purpose
Maintain user sessions securely and seamlessly.

### Behaviors

| Feature | Description |
|---------|-------------|
| **Stay logged in by default** | User sessions persist across app restarts |
| **Firebase token refresh (background)** | Authentication tokens automatically refreshed |
| **Session expiry handling** | When token expires, user prompted to re-authenticate |

### Session States
- **Active:** User is authenticated, token is valid
- **Expired:** Token expired, needs refresh or re-authentication
- **Invalid:** Token revoked or credentials changed

---

## Authentication Methods Summary

| Method | Login | Registration | Provider |
|--------|-------|--------------|----------|
| Email + Password | ✅ | ✅ | Firebase Auth |
| Google SSO | ✅ | ✅ | Google Sign-In |
| Apple SSO | ✅ | ✅ | Apple Sign-In |

**Note:** Apple SSO is **required** if the app is distributed on iOS App Store (Apple guideline 4.8).

---

## Routing Logic Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    ROUTING DECISION TREE                     │
└─────────────────────────────────────────────────────────────┘

App Launch
    │
    ├── Session exists?
    │   ├── YES ──> Home
    │   └── NO ──> Splash
    │        │
    │        └── New user?
    │            ├── YES ──> Onboarding (3 screens)
    │            │              │
    │            │              └── Register or Login?
    │            │                  ├── Register ──> Registration ──> Intake
    │            │                  └── Login ──> Login ──> (check intake)
    │            │                                      │
    │            └── NO ──> Login ──────────────────────┘
    │
    └── After Login/Register:
        ├── Intake completed?
        │   ├── YES ──> Home
        │   └── NO ──> Intake
```

---

## Error States

| Scenario | Error Display | Recovery Action |
|----------|---------------|-----------------|
| Invalid login credentials | "Show login error, offer reset" | Password reset link |
| Invalid registration data | "Show inline error" | Field-level validation messages |
| Network failure | Toast/snackbar message | Retry option |
| SSO provider unavailable | Disabled button, help text | Use alternate method |

---

## Key User Journeys

### Journey 1: First-Time User (Complete Flow)
```
App Launch → Splash → Onboarding (3 screens) → Register → Intake → Home
```

### Journey 2: Returning User (With Session)
```
App Launch → Home (immediate access)
```

### Journey 3: Returning User (Session Expired)
```
App Launch → Splash → Login → (Intake check) → Home
```

### Journey 4: Forgot Password Recovery
```
Login Screen → Forgot Password → Enter Email → Receive Reset Link → Set New Password → Login
```

---

## Technical Dependencies

| Dependency | Purpose |
|------------|---------|
| **Firebase Authentication** | Email/password auth, account management |
| **Google Sign-In SDK** | Google SSO integration |
| **Apple Sign-In SDK** | Apple SSO integration (iOS) |
| **Firebase Token Management** | Session persistence, token refresh |

---

## Accessibility Requirements

- **Input Labels:** All fields must have visible labels or aria-labels
- **Error Messages:** Announced to screen readers, linked to input fields
- **Touch Targets:** All buttons minimum 44×44px
- **Contrast:** Minimum 4.5:1 for text and interactive elements
- **Keyboard Navigation:** Full flow accessible via keyboard (iPad/external keyboard)

---

## Next Steps

- [ ] Create UI prompts for each authentication screen
- [ ] Design high-fidelity mockups
- [ ] Implement Firebase Auth configuration
- [ ] Set up Google/Apple SSO credentials
- [ ] Implement session management logic
- [ ] Write unit tests for auth flows

---

## Related Documents

- `brief.md` — Overall app brief summary
- `project_goal.png` — Project goals
- `homescreen - tracking tab.jpg` — Home screen flow
- `ui-prompt-tracking-tab.md` — Home screen UI prompt
- `brief-analysis.md` — Design analysis and inspiration
