/* ===== STRIVIO — Onboarding App Logic ===== */

// Dynamic base path detection - works regardless of deployment location
const getBasePath = () => {
  const script = document.currentScript || document.querySelector('script[src*="app.js"]');
  if (script) {
    const src = script.src;
    const match = src.match(/^(.*?)\/app\.js/);
    if (match) return match[1];
  }
  // Fallback: detect from current URL
  const path = window.location.pathname;
  if (path.includes('/screens/')) {
    return path.substring(0, path.indexOf('/screens/'));
  }
  return '';
};

const BASE_PATH = getBasePath();

// State
const state = window.__strivio_state = {
  name: 'Mike Michel',
  goals: [],
  motivations: [],
  gender: '',
  activity: '',
  age: null,
  height: null,
  weight: null,
  targetWeight: null,
  pace: 0.5,
  diet: '',
  location: '',
  fitness: '',
  frequency: 4,
  trainingDays: [],
  coach: '',
  email: '',
  password: '',
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  rememberMe: false,
  agreedToTerms: false,
  resetEmail: '',
  // Workout tab state
  isPremium: false,
  workoutRestDuration: 90,
  workoutCountdownDuration: 3,
  workoutUnits: 'metric',
  todayWorkoutId: 'w-upper-1',
  todayWorkoutState: 'scheduled',
  favoriteWorkoutIds: [],
  favoriteExerciseIds: [],
  // Settings state
  equipment: '',
  trainingStyles: [],
  workoutDuration: '',
  activityPriority: '',
  notifications: {
    workout: true,
    workoutTime: '08:00',
    meals: true,
    breakfast: true,
    lunch: true,
    dinner: true,
    snacks: false,
    sleep: false,
    streak: true,
    planChange: true
  }
};

const paceValues = [0.25, 0.5, 1.0, 1.5];
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

let currentScreen = 'splash';
const screenHistory = [];

// Screen to file path mapping (uses dynamic base path)
const screenPaths = {
  // Auth screens
  'splash': BASE_PATH + '/screens/auth/splash.html',
  'onboarding': BASE_PATH + '/screens/onboarding/splash-onboarding.html',
  'welcome': BASE_PATH + '/screens/auth/welcome.html',
  'login': BASE_PATH + '/screens/auth/login.html',
  'register': BASE_PATH + '/screens/auth/register.html',
  'forgot-password': BASE_PATH + '/screens/auth/forgot-password.html',
  'forgot-confirm': BASE_PATH + '/screens/auth/forgot-confirm.html',
  // Onboarding screens
  'intake': BASE_PATH + '/screens/onboarding/intake.html',
  'q1': BASE_PATH + '/screens/onboarding/q1.html',
  'q2': BASE_PATH + '/screens/onboarding/q2.html',
  'q3': BASE_PATH + '/screens/onboarding/q3.html',
  'q4': BASE_PATH + '/screens/onboarding/q4.html',
  'q5': BASE_PATH + '/screens/onboarding/q5.html',
  'q6': BASE_PATH + '/screens/onboarding/q6.html',
  'q7': BASE_PATH + '/screens/onboarding/q7.html',
  'q8': BASE_PATH + '/screens/onboarding/q8.html',
  'q9': BASE_PATH + '/screens/onboarding/q9.html',
  'q10': BASE_PATH + '/screens/onboarding/q10.html',
  'q11': BASE_PATH + '/screens/onboarding/q11.html',
  'q12': BASE_PATH + '/screens/onboarding/q12.html',
  'q13': BASE_PATH + '/screens/onboarding/q13.html',
  'q14': BASE_PATH + '/screens/onboarding/q14.html',
  'q15': BASE_PATH + '/screens/onboarding/q15.html',
  'conflicts': BASE_PATH + '/screens/onboarding/conflicts.html',
  'coach': BASE_PATH + '/screens/onboarding/coach.html',
  'coach-main': BASE_PATH + '/screens/coach/coach.html',
  'loading': BASE_PATH + '/screens/onboarding/loading.html',
  'reveal': BASE_PATH + '/screens/onboarding/reveal.html',
  // Home screen
  'home': BASE_PATH + '/screens/home/home.html',
  // Logbook screens (14 core screens)
  'logbook': BASE_PATH + '/screens/logbook/logbook.html',
  'logbook-empty': BASE_PATH + '/screens/logbook/logbook-empty.html',
  'calendar-sheet': BASE_PATH + '/screens/logbook/calendar-sheet.html',
  'copy-previous-day': BASE_PATH + '/screens/logbook/copy-previous-day.html',
  'meal-detail': BASE_PATH + '/screens/logbook/meal-detail.html',
  'edit-quantity-sheet': BASE_PATH + '/screens/logbook/edit-quantity-sheet.html',
  'add-food-home': BASE_PATH + '/screens/logbook/add-food-home.html',
  'food-search-results': BASE_PATH + '/screens/logbook/food-search-results.html',
  'food-detail-preview': BASE_PATH + '/screens/logbook/food-detail-preview.html',
  'log-food': BASE_PATH + '/screens/logbook/log-food.html',
  'manual-entry': BASE_PATH + '/screens/logbook/manual-entry.html',
  'optional-nutrients': BASE_PATH + '/screens/logbook/optional-nutrients.html',
  'nutrients-locked': BASE_PATH + '/screens/logbook/nutrients-locked.html',
  'nutrients-full': BASE_PATH + '/screens/logbook/nutrients-full.html',
  'micro-overview': BASE_PATH + '/screens/logbook/micro-overview.html',
  // Premium screens (10 additional screens)
  'barcode-paywall': BASE_PATH + '/screens/logbook/barcode-paywall.html',
  'barcode-scanner': BASE_PATH + '/screens/logbook/barcode-scanner.html',
  'barcode-fallback': BASE_PATH + '/screens/logbook/barcode-fallback.html',
  'ai-photo-upload': BASE_PATH + '/screens/logbook/ai-photo-upload.html',
  'ai-estimation-result': BASE_PATH + '/screens/logbook/ai-estimation-result.html',
  'custom-meals-list': BASE_PATH + '/screens/logbook/custom-meals-list.html',
  'create-custom-meal': BASE_PATH + '/screens/logbook/create-custom-meal.html',
  'add-foods-custom': BASE_PATH + '/screens/logbook/add-foods-custom.html',
  'custom-meal-review': BASE_PATH + '/screens/logbook/custom-meal-review.html',
  'custom-meal-paywall': BASE_PATH + '/screens/logbook/custom-meal-paywall.html',
  // Shared components
  'paywall-sheet': BASE_PATH + '/screens/logbook/paywall-sheet.html',
  // Workout screens
  'workout': BASE_PATH + '/screens/workout/workout.html?v=8',
  'weekly-progress': BASE_PATH + '/screens/workout/weekly-progress.html',
  'workout-library': BASE_PATH + '/screens/workout/workout-library.html',
  'exercise-library': BASE_PATH + '/screens/workout/exercise-library.html',
  'exercise-detail': BASE_PATH + '/screens/workout/exercise-detail.html',
  'workout-build': BASE_PATH + '/screens/workout/workout-build.html',
  'custom-workouts': BASE_PATH + '/screens/workout/custom-workouts.html?v=1',
  'workout-generator': BASE_PATH + '/screens/workout/workout-generator.html?v=1',
  'coach-q1': BASE_PATH + '/screens/workout/coach-q1.html?v=5',
  'coach-q2': BASE_PATH + '/screens/workout/coach-q2.html?v=5',
  'coach-q3': BASE_PATH + '/screens/workout/coach-q3.html?v=5',
  'coach-q4': BASE_PATH + '/screens/workout/coach-q4.html?v=5',
  'coach-q5': BASE_PATH + '/screens/workout/coach-q5.html?v=5',
  'coach-q6': BASE_PATH + '/screens/workout/coach-q6.html?v=5',
  'coach-generating': BASE_PATH + '/screens/workout/coach-generating.html?v=5',
  'coach-review': BASE_PATH + '/screens/workout/coach-review.html?v=5',
  'workout-edit': BASE_PATH + '/screens/workout/workout-edit.html',
  'workout-detail': BASE_PATH + '/screens/workout/workout-detail.html',
  'workout-countdown': BASE_PATH + '/screens/workout/workout-countdown.html',
  'workout-exercise': BASE_PATH + '/screens/workout/workout-exercise.html',
  'workout-rest': BASE_PATH + '/screens/workout/workout-rest.html',
  'workout-complete': BASE_PATH + '/screens/workout/workout-complete.html',
  'workout-settings': BASE_PATH + '/screens/workout/workout-settings.html',
  'workout-schedule': BASE_PATH + '/screens/workout/workout-schedule.html',
  'workout-log': BASE_PATH + '/screens/workout/workout-log.html',
  // Settings screens
  'more': BASE_PATH + '/screens/settings/more.html',
  'more-profile': BASE_PATH + '/screens/settings/more-profile.html',
  'more-goals': BASE_PATH + '/screens/settings/more-goals.html',
  'more-preferences': BASE_PATH + '/screens/settings/more-preferences.html',
  'more-coach': BASE_PATH + '/screens/settings/more-coach.html',
  'more-notifications': BASE_PATH + '/screens/settings/more-notifications.html',
  'more-password': BASE_PATH + '/screens/settings/more-password.html',
  'more-sync': BASE_PATH + '/screens/settings/more-sync.html',
  'more-export': BASE_PATH + '/screens/settings/more-export.html',
  'more-help': BASE_PATH + '/screens/settings/more-help.html',
  'more-privacy': BASE_PATH + '/screens/settings/more-privacy.html',
  'more-intake': BASE_PATH + '/screens/onboarding/q1.html',
  'more-premium': BASE_PATH + '/screens/settings/more-premium.html'
};

// ===== NAVIGATION =====
window.navigateTo = function navigateTo(screenId) {
  // Save state and current screen before navigating
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  try { localStorage.setItem('strivio_screen', screenId); } catch(e) {}
  try { localStorage.setItem('strivio_screen_history', JSON.stringify(screenHistory)); } catch(e) {}

  // Push current screen to history before navigating
  if (currentScreen && currentScreen !== screenId) {
    screenHistory.push(currentScreen);
  }

  const path = screenPaths[screenId];
  if (path) {
    currentScreen = screenId;
    window.location.href = path;
  } else {
    console.error('Unknown screen:', screenId);
  }
}

// ===== SAVE & NEXT =====
function saveAndNext(screenId, key, nextScreen) {
  // Save data from the current screen
  switch(screenId) {
    case 'q1': state.name = document.getElementById('inputName')?.value.trim() || ''; break;
    case 'q2': state.goals = getSelectedValues('goalsOptions'); break;
    case 'q3': state.motivations = getSelectedValues('motivOptions'); break;
    case 'q4': state.gender = getSelectedValue('genderOptions'); break;
    case 'q5': state.activity = getSelectedValue('activityOptions'); break;
    case 'q6': state.age = parseInt(document.getElementById('inputAge')?.value || 0) || null; break;
    case 'q7': state.height = parseInt(document.getElementById('inputHeight')?.value || 0) || null; break;
    case 'q8': state.weight = parseFloat(document.getElementById('inputWeight')?.value || 0) || null; break;
    case 'q9': state.targetWeight = parseFloat(document.getElementById('inputTargetWeight')?.value || 0) || null; break;
    case 'q10': state.pace = paceValues[parseInt(document.getElementById('paceSlider')?.value || 1)]; break;
    case 'q11': state.diet = getSelectedValue('dietOptions'); break;
    case 'q12': state.fitness = getSelectedValue('fitnessOptions'); break;
    case 'q13': state.location = getSelectedValue('locationOptions'); break;
    case 'q14': state.frequency = parseInt(document.getElementById('freqSlider')?.value || 4); break;
  }

  navigateTo(nextScreen);
}

// ===== SINGLE SELECT =====
function getSelectedValue(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return '';
  const selected = container.querySelector('.option-card.selected');
  return selected ? selected.dataset.value : '';
}

function getSelectedValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  const selected = container.querySelectorAll('.option-card.selected');
  return Array.from(selected).map(el => el.dataset.value);
}

// ===== INIT OPTION CARDS =====
function initOptionCards() {
  // Single select
  document.querySelectorAll('.single-select').forEach(container => {
    container.querySelectorAll('.option-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        // Enable CTA
        const screen = card.closest('.screen');
        const btn = screen?.querySelector('.btn-primary');
        if (btn) btn.disabled = false;
      });
    });
  });

  // Multi select
  document.querySelectorAll('.multi-select').forEach(container => {
    const max = parseInt(container.dataset.max) || 2;
    const key = container.dataset.key;

    container.querySelectorAll('.option-card').forEach(card => {
      card.addEventListener('click', () => {
        const selected = container.querySelectorAll('.option-card.selected');

        if (card.classList.contains('selected')) {
          card.classList.remove('selected');
        } else {
          if (selected.length >= max) {
            card.classList.add('max-reached');
            setTimeout(() => card.classList.remove('max-reached'), 400);
            return;
          }
          card.classList.add('selected');
        }

        // Update counter
        const count = container.querySelectorAll('.option-card.selected').length;
        const counter = document.getElementById(key === 'goals' ? 'goalsCounter' : 'motivCounter');
        if (counter) counter.textContent = `${count}/${max}`;

        // Disable/enable unselected cards
        const currentSelected = container.querySelectorAll('.option-card.selected');
        if (currentSelected.length >= max) {
          container.querySelectorAll('.option-card:not(.selected)').forEach(c => c.classList.add('disabled'));
        } else {
          container.querySelectorAll('.option-card.disabled').forEach(c => c.classList.remove('disabled'));
        }

        // Enable CTA
        const screen = card.closest('.screen');
        const btn = screen?.querySelector('.btn-primary');
        if (btn) btn.disabled = count === 0;
      });
    });
  });
}

// ===== INIT TEXT INPUT =====
function initTextInputs() {
  const nameInput = document.getElementById('inputName');
  const btnQ1 = document.getElementById('btnQ1');
  if (nameInput && btnQ1) {
    nameInput.addEventListener('input', () => {
      btnQ1.disabled = nameInput.value.trim().length < 2;
    });
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !btnQ1.disabled) btnQ1.click();
    });
  }
}

// ===== INIT NUMERIC INPUTS =====
function initNumericInputs() {
  const inputs = [
    { id: 'inputAge', btnId: 'btnQ6', min: 14, max: 100 },
    { id: 'inputHeight', btnId: 'btnQ7', min: 100, max: 220 },
    { id: 'inputWeight', btnId: 'btnQ8', min: 30, max: 300 },
    { id: 'inputTargetWeight', btnId: 'btnQ9', min: 30, max: 300 },
  ];

  inputs.forEach(({ id, btnId, min, max }) => {
    const input = document.getElementById(id);
    const btn = document.getElementById(btnId);
    if (!input || !btn) return;

    input.addEventListener('input', () => {
      const val = parseFloat(input.value);
      btn.disabled = isNaN(val) || val < min || val > max;

      if (id === 'inputTargetWeight') updateWeightRef();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !btn.disabled) btn.click();
    });
  });
}

// ===== WEIGHT REFERENCE =====
function updateWeightRef() {
  const ref = document.getElementById('weightRef');
  const currentEl = document.getElementById('weightCurrent');
  const diffEl = document.getElementById('weightDiff');
  const targetInput = document.getElementById('inputTargetWeight');

  if (!ref || !state.weight || !targetInput) return;

  const target = parseFloat(targetInput.value);
  if (isNaN(target) || target < 30) {
    ref.style.display = 'none';
    return;
  }

  ref.style.display = 'flex';
  currentEl.textContent = `Current: ${state.weight} kg`;

  const diff = target - state.weight;
  const sign = diff > 0 ? '+' : '';
  diffEl.textContent = `Difference: ${sign}${diff.toFixed(1)} kg`;
  diffEl.className = 'weight-ref-line weight-diff ' + (diff < 0 ? 'loss' : diff > 0 ? 'gain' : '');
}

// ===== SLIDERS =====
function initSliders() {
  const paceSlider = document.getElementById('paceSlider');
  const freqSlider = document.getElementById('freqSlider');

  if (paceSlider) {
    paceSlider.addEventListener('input', () => {
      const val = paceValues[parseInt(paceSlider.value)];
      state.pace = val;
      document.getElementById('paceValue').textContent = `Selected: ${val} kg/week`;
      updatePaceTimeline();
      const warning = document.getElementById('paceWarning');
      if (warning) warning.style.display = 'none';
    });
  }

  if (freqSlider) {
    freqSlider.addEventListener('input', () => {
      state.frequency = parseInt(freqSlider.value);
      document.getElementById('freqValue').textContent = `Selected: ${state.frequency} days/week`;
    });
  }
}

function updatePaceTimeline() {
  const el = document.getElementById('paceTimeline');
  if (!el) return;
  if (!state.weight || !state.targetWeight || !state.pace) {
    el.textContent = 'At this pace, you\'ll reach your goal soon';
    return;
  }
  const diff = Math.abs(state.targetWeight - state.weight);
  if (diff === 0) {
    el.textContent = 'You\'re already at your target weight!';
    return;
  }
  const weeks = Math.round(diff / state.pace);
  el.textContent = `At this pace, you'll reach your goal in ~${weeks} weeks`;
}

function validatePace() {
  state.pace = paceValues[parseInt(document.getElementById('paceSlider')?.value || 1)];

  if (!state.weight || !state.targetWeight) {
    navigateTo('q11');
    return;
  }

  const diff = Math.abs(state.targetWeight - state.weight);
  const weeks = diff / state.pace;

  if (state.pace >= 1.0 && diff > 10) {
    const warning = document.getElementById('paceWarning');
    if (warning) warning.style.display = 'flex';
    return;
  }

  navigateTo('q11');
}

function adjustPace() {
  const slider = document.getElementById('paceSlider');
  if (slider) slider.value = 1; // 0.5 kg/week
  state.pace = 0.5;
  document.getElementById('paceValue').textContent = 'Selected: 0.5 kg/week';
  updatePaceTimeline();
  document.getElementById('paceWarning').style.display = 'none';
}

function dismissPaceWarning() {
  const warning = document.getElementById('paceWarning');
  if (warning) warning.style.display = 'none';
  navigateTo('q11');
}

// ===== DAY CHIPS =====
function initDayChips() {
  document.querySelectorAll('.day-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      state.trainingDays = Array.from(document.querySelectorAll('.day-chip.selected')).map(c => c.dataset.day);
    });
  });
}

function validateDays() {
  const selectedDays = state.trainingDays.length;
  const freq = state.frequency;

  if (selectedDays > 0 && selectedDays !== freq) {
    const warning = document.getElementById('daysWarning');
    const text = document.getElementById('daysWarningText');
    if (text) text.textContent = `You selected ${freq} days/week but picked ${selectedDays} specific days.`;
    if (warning) warning.style.display = 'flex';
    return;
  }

  navigateTo('conflicts');
}

function adjustDays() {
  const warning = document.getElementById('daysWarning');
  if (warning) warning.style.display = 'none';
}

function useSuggestedDays() {
  const freq = state.frequency;
  const preferred = ['Mon', 'Wed', 'Fri', 'Tue', 'Thu', 'Sat', 'Sun'];
  state.trainingDays = preferred.slice(0, freq);

  document.querySelectorAll('.day-chip').forEach(chip => {
    chip.classList.toggle('selected', state.trainingDays.includes(chip.dataset.day));
  });

  const warning = document.getElementById('daysWarning');
  if (warning) warning.style.display = 'none';
}

function skipToConflict() {
  state.trainingDays = [];
  navigateTo('conflicts');
}

// ===== CONFLICT DETECTION =====
function checkConflicts() {
  const conflicts = [];
  const container = document.getElementById('conflictCards');
  if (container) container.innerHTML = '';

  // Sedentary + Advanced
  if (state.activity === 'sedentary' && state.fitness === 'advanced') {
    conflicts.push({
      title: 'Activity Level',
      desc: '"Sedentary" + "Advanced" seems unusual. An advanced fitness level usually means regular exercise.'
    });
  }

  // Sedentary + 6-7 days training
  if ((state.activity === 'sedentary' || state.activity === 'light') && state.frequency >= 6) {
    conflicts.push({
      title: 'Training Frequency',
      desc: `${state.frequency} days/week may be too much if you're currently sedentary. Consider starting with 3-4 days.`
    });
  }

  // Beginner + Very Active
  if (state.fitness === 'beginner' && state.activity === 'very_active') {
    conflicts.push({
      title: 'Activity vs Fitness',
      desc: '"Beginner" + "Very Active" seems unusual. Being very active usually implies some fitness experience.'
    });
  }

  if (conflicts.length === 0) {
    // Skip conflict screen, go to coach
    navigateTo('coach');
    return;
  }

  if (container) {
    conflicts.forEach(c => {
      const card = document.createElement('div');
      card.className = 'conflict-card';
      card.innerHTML = `
        <div class="conflict-card-title">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2L1 18h18L10 2z" fill="#F59E0B" opacity="0.2"/><path d="M10 2L1 18h18L10 2z" stroke="#92400E" stroke-width="1.5"/><path d="M10 7v5M10 14.5v.5" stroke="#92400E" stroke-width="2" stroke-linecap="round"/></svg>
          ${c.title}
        </div>
        <div class="conflict-card-desc">${c.desc}</div>
        <button class="btn-conflict-review">Review</button>
      `;
      container.appendChild(card);
    });
  }
}

// ===== COACH SELECTION =====
function initCoachCards() {
  document.querySelectorAll('.coach-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.coach-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.coach = card.dataset.coach;
      const btn = document.getElementById('btnCoach');
      if (btn) btn.disabled = false;
    });
  });
}

function selectCoach() {
  navigateTo('loading');
}

function skipCoach() {
  state.coach = '';
  navigateTo('loading');
}

// ===== LOADING ANIMATION =====
function startLoadingAnimation() {
  const steps = document.querySelectorAll('#loadingSteps .loading-step');
  if (!steps.length) return;

  let currentStep = 2; // Start at the 3rd step (first two are "completed")

  function advanceStep() {
    if (currentStep >= steps.length) {
      setTimeout(() => navigateTo('reveal'), 800);
      return;
    }

    // Mark current active as completed
    steps[currentStep - 1].classList.remove('active');
    steps[currentStep - 1].classList.add('completed');
    steps[currentStep - 1].querySelector('.step-icon').innerHTML = '&#x2713;';
    steps[currentStep - 1].querySelector('.step-text').style.color = '';

    // Mark next as active
    steps[currentStep].classList.remove('pending');
    steps[currentStep].classList.add('active');
    steps[currentStep].querySelector('.step-icon').innerHTML = '<span class="spinner"></span>';

    currentStep++;
    setTimeout(advanceStep, 1500);
  }

  // Reset states
  steps.forEach((step, i) => {
    step.classList.remove('completed', 'active', 'pending');
    if (i < 2) {
      step.classList.add('completed');
      step.querySelector('.step-icon').innerHTML = '&#x2713;';
    } else if (i === 2) {
      step.classList.add('active');
      step.querySelector('.step-icon').innerHTML = '<span class="spinner"></span>';
    } else {
      step.classList.add('pending');
      step.querySelector('.step-icon').innerHTML = '&#x25CB;';
    }
  });

  setTimeout(advanceStep, 1500);
}

// ===== PLAN REVEAL =====
function populateReveal() {
  // Coach intro
  const coachNames = {
    marcus: 'Coach Marcus',
    sara: 'Coach Sara',
    lena: 'Coach Lena',
    david: 'Coach David'
  };
  const coachIntro = document.getElementById('revealCoachIntro');
  if (coachIntro) {
    coachIntro.textContent = `${coachNames[state.coach] || 'Your coach'} has prepared a personalized plan to help you reach your goals.`;
  }

  // Calculate BMR (Mifflin-St Jeor)
  let bmr;
  if (state.gender === 'female') {
    bmr = 10 * (state.weight || 70) + 6.25 * (state.height || 170) - 5 * (state.age || 28) - 161;
  } else {
    bmr = 10 * (state.weight || 70) + 6.25 * (state.height || 170) - 5 * (state.age || 28) + 5;
  }

  const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
  const tdee = bmr * (activityMultipliers[state.activity] || 1.375);

  // Adjust for goal
  let calories;
  if (state.targetWeight < state.weight) {
    calories = Math.round(tdee - 500); // deficit
  } else if (state.targetWeight > state.weight) {
    calories = Math.round(tdee + 300); // surplus
  } else {
    calories = Math.round(tdee);
  }

  // Macros
  const protein = Math.round((state.weight || 70) * 2);
  const fat = Math.round(calories * 0.25 / 9);
  const carbsCalories = calories - (protein * 4) - (fat * 9);
  const carbs = Math.round(Math.max(0, carbsCalories) / 4);
  const water = Math.round((state.weight || 70) * 35);

  const kcalEl = document.getElementById('revealKcalVal');
  const waterEl = document.getElementById('revealWaterVal');
  const proteinEl = document.getElementById('revealProtein');
  const carbsEl = document.getElementById('revealCarbs');
  const fatEl = document.getElementById('revealFat');

  if (kcalEl) kcalEl.textContent = `${calories.toLocaleString()} kcal`;
  if (waterEl) waterEl.textContent = `${water.toLocaleString()} ml`;
  if (proteinEl) proteinEl.textContent = `${protein}g`;
  if (carbsEl) carbsEl.textContent = `${carbs}g`;
  if (fatEl) fatEl.textContent = `${fat}g`;

  // Workout meta
  const locationLabel = state.location === 'gym' ? 'Gym workouts' : state.location === 'home' ? 'Home workouts' : 'Gym & Home';
  const metaEl = document.getElementById('revealWorkoutMeta');
  if (metaEl) metaEl.textContent = `${state.frequency} days/week · ${locationLabel}`;

  // Week grid
  const weekGrid = document.getElementById('revealWeekGrid');
  if (weekGrid) {
    weekGrid.innerHTML = '';
    const trainingDays = state.trainingDays.length > 0
      ? state.trainingDays
      : dayNames.slice(0, state.frequency);

    dayNames.forEach(day => {
      const isWork = trainingDays.includes(day);
      const div = document.createElement('div');
      div.className = 'week-day';
      div.innerHTML = `
        <span class="week-day-label">${day.charAt(0)}</span>
        <span class="week-day-bar ${isWork ? 'work' : 'rest'}">${isWork ? 'Work' : 'Rest'}</span>
      `;
      weekGrid.appendChild(div);
    });
  }
}

// ===== HOME TRACKING TAB =====
function updateHomeGreeting() {
  const nameEl = document.getElementById('headerName');
  if (nameEl) {
    const name = state.name || 'Mike Michel';
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    nameEl.textContent = name;
  }
  const dateEl = document.getElementById('headerDate');
  if (dateEl) {
    const now = new Date();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  }
  // Populate tracking data from state if available
  if (state.weight) {
    const wv = document.getElementById('weightValue');
    if (wv) wv.textContent = state.weight;
  }
  // Animate calorie ring
  animateCalorieRing();
  // Calculate and display daily progress score
  updateProgressScore();
}

function animateCalorieRing() {
  const ring = document.getElementById('calorieRing');
  if (!ring) return;
  const consumed = parseInt(document.getElementById('calConsumed')?.textContent || '840');
  const target = parseInt(document.getElementById('calTarget')?.textContent || '2000');
  const circumference = 2 * Math.PI * 52; // r=52
  const progress = Math.min(consumed / target, 1);
  const offset = circumference * (1 - progress);
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = circumference;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ring.style.strokeDashoffset = offset;
    });
  });
}

function updateProgressScore() {
  const gauge = document.getElementById('progressGauge');
  const scoreEl = document.getElementById('progressScoreValue');
  if (!gauge || !scoreEl) return;

  // Collect progress percentages from all tracked metrics
  const metrics = [];

  // Calories consumed vs target
  const consumed = parseInt(document.getElementById('calConsumed')?.textContent || '0');
  const target = parseInt(document.getElementById('calTarget')?.textContent || '2000');
  if (target > 0) metrics.push(Math.min(consumed / target, 1));

  // Macronutrients from progress bars
  const proteinBar = document.getElementById('proteinBar');
  if (proteinBar) {
    const pct = parseFloat(proteinBar.style.width) / 100 || 0;
    metrics.push(pct);
  }
  const carbsBar = document.getElementById('carbsBar');
  if (carbsBar) {
    const pct = parseFloat(carbsBar.style.width) / 100 || 0;
    metrics.push(pct);
  }
  const fatBar = document.getElementById('fatBar');
  if (fatBar) {
    const pct = parseFloat(fatBar.style.width) / 100 || 0;
    metrics.push(pct);
  }

  // Water intake
  const waterEl = document.getElementById('waterValue');
  const waterUnitEl = document.getElementById('waterUnit');
  if (waterEl && waterUnitEl) {
    const waterVal = parseInt(waterEl.textContent.replace(/,/g, '') || '0');
    const waterMatch = waterUnitEl.textContent.match(/[\d,]+/);
    const waterTarget = waterMatch ? parseInt(waterMatch[0].replace(/,/g, '')) : 2000;
    if (waterTarget > 0) metrics.push(Math.min(waterVal / waterTarget, 1));
  }

  // Workouts completed
  const workoutEl = document.getElementById('workoutValue');
  if (workoutEl) {
    const workoutParts = workoutEl.textContent.split('/');
    if (workoutParts.length === 2) {
      const done = parseInt(workoutParts[0]) || 0;
      const total = parseInt(workoutParts[1]) || 6;
      if (total > 0) metrics.push(Math.min(done / total, 1));
    }
  }

  // Steps
  const stepsEl = document.getElementById('stepsValue');
  const stepsUnitEl = document.getElementById('stepsUnit');
  if (stepsEl && stepsUnitEl) {
    const stepsVal = parseInt(stepsEl.textContent.replace(/,/g, '') || '0');
    const stepsMatch = stepsUnitEl.textContent.match(/[\d,]+/);
    const stepsTarget = stepsMatch ? parseInt(stepsMatch[0].replace(/,/g, '')) : 10000;
    if (stepsTarget > 0) metrics.push(Math.min(stepsVal / stepsTarget, 1));
  }

  // Calculate composite score (average of all percentages)
  const score = metrics.length > 0
    ? Math.round((metrics.reduce((a, b) => a + b, 0) / metrics.length) * 100)
    : 0;

  // Update gauge text
  scoreEl.textContent = score + '%';

  // Update gauge ring
  const circumference = 2 * Math.PI * 26; // r=26
  const progress = score / 100;
  const offset = circumference * (1 - progress);
  gauge.style.strokeDasharray = circumference;
  gauge.style.strokeDashoffset = offset;
}

function populateHealthScoreSheet() {
  // Collect all metrics
  const metrics = [];

  // Calories
  const consumed = parseInt(document.getElementById('calConsumed')?.textContent || '0');
  const target = parseInt(document.getElementById('calTarget')?.textContent || '2000');
  if (target > 0) {
    metrics.push({
      label: 'Nutrition',
      current: consumed,
      total: target,
      unit: '',
      pct: Math.round(Math.min(consumed / target, 1) * 100)
    });
  }

  // Workout
  const workoutEl = document.getElementById('workoutValue');
  if (workoutEl) {
    const parts = workoutEl.textContent.split('/');
    if (parts.length === 2) {
      const done = parseInt(parts[0]) || 0;
      const total = parseInt(parts[1]) || 6;
      metrics.push({
        label: 'Workout',
        current: done,
        total: total,
        unit: 'Exercises',
        pct: total > 0 ? Math.round(Math.min(done / total, 1) * 100) : 0
      });
    }
  }

  // Steps
  const stepsEl = document.getElementById('stepsValue');
  const stepsUnitEl = document.getElementById('stepsUnit');
  if (stepsEl && stepsUnitEl) {
    const stepsVal = parseInt(stepsEl.textContent.replace(/,/g, '') || '0');
    const stepsMatch = stepsUnitEl.textContent.match(/[\d,]+/);
    const stepsTarget = stepsMatch ? parseInt(stepsMatch[0].replace(/,/g, '')) : 10000;
    metrics.push({
      label: 'Steps',
      current: stepsVal,
      total: stepsTarget,
      unit: '',
      pct: stepsTarget > 0 ? Math.round(Math.min(stepsVal / stepsTarget, 1) * 100) : 0
    });
  }

  // Water
  const waterEl = document.getElementById('waterValue');
  const waterUnitEl = document.getElementById('waterUnit');
  if (waterEl && waterUnitEl) {
    const waterVal = parseInt(waterEl.textContent.replace(/,/g, '') || '0');
    const waterMatch = waterUnitEl.textContent.match(/[\d,]+/);
    const waterTarget = waterMatch ? parseInt(waterMatch[0].replace(/,/g, '')) : 2000;
    metrics.push({
      label: 'Water',
      current: waterVal,
      total: waterTarget,
      unit: 'ml',
      pct: waterTarget > 0 ? Math.round(Math.min(waterVal / waterTarget, 1) * 100) : 0
    });
  }

  // Update each metric row
  const metricMap = { Nutrition: 0, Workout: 1, Steps: 2, Water: 3 };
  const ids = ['hsNutrition', 'hsWorkout', 'hsSteps', 'hsWater'];

  for (const m of metrics) {
    const idx = metricMap[m.label];
    if (idx === undefined) continue;

    const currentEl = document.getElementById(ids[idx] + 'Current');
    const totalEl = document.getElementById(ids[idx] + 'Total');
    const pctEl = document.getElementById(ids[idx] + 'Pct');
    const fillEl = document.getElementById(ids[idx] + 'Fill');

    if (currentEl) currentEl.textContent = m.current.toLocaleString();
    if (totalEl) totalEl.textContent = m.unit ? `/${m.total.toLocaleString()} ${m.unit}` : `/${m.total.toLocaleString()}`;
    if (pctEl) pctEl.textContent = m.pct + '%';
    if (fillEl) fillEl.style.width = m.pct + '%';
  }

  // Calculate overall score (weighted average of all metrics)
  const overallScore = metrics.length > 0
    ? Math.round(metrics.reduce((a, b) => a + b.pct, 0) / metrics.length)
    : 0;

  // Update ring
  const ring = document.getElementById('hsRingProgress');
  const scoreEl = document.getElementById('hsScoreValue');
  if (ring && scoreEl) {
    scoreEl.textContent = overallScore;
    const circumference = 2 * Math.PI * 56;
    const progress = overallScore / 100;
    const offset = circumference * (1 - progress);
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
  }

  // Update feedback message based on score
  const feedbackEl = document.getElementById('hsFeedbackText');
  if (feedbackEl) {
    if (overallScore >= 80) {
      feedbackEl.textContent = "Great job today! You're crushing your health goals. Keep up the fantastic momentum!";
    } else if (overallScore >= 60) {
      feedbackEl.textContent = "Solid progress! A little more effort on your weaker areas and you'll hit new highs.";
    } else if (overallScore >= 40) {
      feedbackEl.textContent = "Off to a steady start! A quick walk or a glass of water will keep your momentum going.";
    } else {
      feedbackEl.textContent = "Every journey starts with a single step. Let's get moving and build your healthy habits!";
    }
  }
}

// Bottom nav item click handler — active state + navigation
const navRouteMap = {
  home: 'home',
  logbook: 'logbook',
  coach: 'coach-main',
  more: 'more'
};
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const navItem = e.target.closest('.nav-item');
    if (!navItem) return;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    navItem.classList.add('active');
    const nav = navItem.getAttribute('data-nav');
    if (nav && navRouteMap[nav] && !navItem.hasAttribute('onclick')) {
      navigateTo(navRouteMap[nav]);
    }
  });
}

// ===== BOTTOM SHEETS =====
function openSheet(sheetId) {
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  sheet.classList.add('open');
  const screen = sheet.closest('.screen');
  if (screen) screen.classList.add('sheet-open');
}

function closeSheet(sheetId) {
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  sheet.classList.remove('open');
  sheet.classList.remove('show-settings');
  const screen = sheet.closest('.screen');
  if (screen && !screen.querySelector('.bottom-sheet.open')) {
    screen.classList.remove('sheet-open');
  }
}

function getIconPath(iconName) {
  return `${BASE_PATH}/assets/svg_icons/${iconName}`;
}

function ensureTrackSheet() {
  if (document.getElementById('sheetTrack') || !document.querySelector('.nav-fab')) return;

  const host = document.querySelector('.screen.active') || document.querySelector('.screen') || document.body;
  host.insertAdjacentHTML('beforeend', `
    <div class="bottom-sheet" id="sheetTrack">
      <div class="sheet-backdrop" data-close="sheetTrack"></div>
      <div class="sheet-content sheet-track-content">
        <div class="sheet-handle"></div>
        <div class="sheet-track-header">
          <h3 class="sheet-track-title">Track Your Progress</h3>
          <button class="sheet-track-close" type="button" data-close="sheetTrack" aria-label="Close">
            <img src="${getIconPath('circle-x.svg')}" class="icon-default" width="24" height="24" alt="">
          </button>
        </div>
        <div class="sheet-track-list">
          <button class="track-list-card" type="button" data-action="build-workout">
            <img src="${getIconPath('dumbbell-ray.svg')}" width="22" height="22" alt="" class="track-card-icon">
            <div class="track-card-text">
              <span class="track-card-title">Build Workout</span>
              <span class="track-card-desc">Create a custom workout</span>
            </div>
          </button>
          <button class="track-list-card" type="button" data-action="log-activity">
            <img src="${getIconPath('journal-alt.svg')}" width="22" height="22" alt="" class="track-card-icon">
            <div class="track-card-text">
              <span class="track-card-title">Log Activity</span>
              <span class="track-card-desc">Manually log a workout</span>
            </div>
          </button>
          <button class="track-list-card" type="button" data-action="log-weight">
            <img src="${getIconPath('weight.svg')}" width="22" height="22" alt="" class="track-card-icon">
            <div class="track-card-text">
              <span class="track-card-title">Log Weight</span>
              <span class="track-card-desc">Log body mass metrics</span>
            </div>
          </button>
          <button class="track-list-card" type="button" data-action="water-log">
            <img src="${getIconPath('glass-water-droplet.svg')}" width="22" height="22" alt="" class="track-card-icon">
            <div class="track-card-text">
              <span class="track-card-title">Water Log</span>
              <span class="track-card-desc">Track your water intake</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  `);
}

function openHomeSheetOrNavigate(sheetId) {
  if (document.getElementById(sheetId)) {
    openSheet(sheetId);
    return;
  }

  try {
    localStorage.setItem('strivio_pending_sheet', sheetId);
  } catch (e) {}
  navigateTo('home');
}

function openPendingSheet() {
  let pendingSheet = null;
  try {
    pendingSheet = localStorage.getItem('strivio_pending_sheet');
    if (pendingSheet) localStorage.removeItem('strivio_pending_sheet');
  } catch (e) {}

  if (pendingSheet) {
    setTimeout(() => openSheet(pendingSheet), 50);
  }
}

// Card tap → sheet mapping
const cardSheetMap = {
  weight: 'sheetWeight',
  water: 'sheetWater',
  steps: 'sheetSteps',
  workout: 'sheetSteps',
};

function initBottomSheets() {
  ensureTrackSheet();

  // Metric card taps
  document.querySelectorAll('.metric-card[data-action]').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.dataset.action;
      const sheetId = cardSheetMap[action];
      if (sheetId) openSheet(sheetId);
    });
  });

  // Overview card tap → nutrition sheet
  const overviewCard = document.querySelector('.overview-card');
  if (overviewCard) {
    overviewCard.addEventListener('click', (e) => {
      if (e.target.closest('.metric-card')) return;
      openSheet('sheetNutrition');
    });
    overviewCard.style.cursor = 'pointer';
  }

  // Burn card tap → burn sheet
  const burnCard = document.querySelector('.burn-card');
  if (burnCard) {
    burnCard.addEventListener('click', () => openSheet('sheetBurn'));
  }

  // Progress score card tap → health score sheet
  const progressScoreCard = document.querySelector('.progress-score-card');
  if (progressScoreCard) {
    progressScoreCard.addEventListener('click', () => {
      populateHealthScoreSheet();
      openSheet('sheetHealthScore');
    });
  }

  // Backdrop & close button clicks
  document.querySelectorAll('.sheet-backdrop, .sheet-close, .sheet-track-close, .hs-sheet-close').forEach(el => {
    el.addEventListener('click', () => {
      const sheetId = el.dataset.close;
      if (sheetId) closeSheet(sheetId);
    });
  });
}

// ===== FAB MENU =====
function initFabMenu() {
  ensureTrackSheet();
  const fabButtons = document.querySelectorAll('.nav-fab');
  if (!fabButtons.length || !document.getElementById('sheetTrack')) return;

  fabButtons.forEach(fabBtn => {
    fabBtn.removeAttribute('onclick');
  });

  document.addEventListener('click', (e) => {
    const fabBtn = e.target.closest('.nav-fab');
    if (!fabBtn) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    openSheet('sheetTrack');
  }, true);

  // Track sheet option actions
  document.querySelectorAll('#sheetTrack .track-list-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.dataset.action;
      closeSheet('sheetTrack');

      if (action === 'water-log') {
        openHomeSheetOrNavigate('sheetWater');
      } else if (action === 'log-weight') {
        openHomeSheetOrNavigate('sheetWeight');
      } else if (action === 'build-workout') {
        navigateTo('workout-build');
      } else if (action === 'log-activity') {
        navigateTo('workout-log');
      }
    });
  });
}

// ===== WATER +/- HANDLERS =====
let waterAmount = 1250;
let waterGoal = parseInt(localStorage.getItem('strivio_waterGoal')) || 2000;
let waterStep = parseInt(localStorage.getItem('strivio_waterStep')) || 250;
let waterStepMinus = Math.round(waterStep / 2);

function updateWaterUI() {
  const waterVal = document.getElementById('waterValue');
  const waterUnitEl = document.getElementById('waterUnit');
  if (waterVal) waterVal.textContent = waterAmount.toLocaleString();
  if (waterUnitEl) waterUnitEl.textContent = `/ ${waterGoal.toLocaleString()} ml`;

  // Update water sheet ring
  const waterRingFill = document.querySelector('.water-ring-fill');
  if (waterRingFill) {
    const circumference = 2 * Math.PI * 42;
    const progress = Math.min(waterAmount / waterGoal, 1);
    waterRingFill.style.strokeDasharray = circumference;
    waterRingFill.style.strokeDashoffset = circumference * (1 - progress);
  }

  // Update water sheet center text
  const waterRingValue = document.querySelector('.water-ring-value');
  const waterRingLabel = document.querySelector('.water-ring-label');
  if (waterRingValue) waterRingValue.textContent = waterAmount.toLocaleString();
  if (waterRingLabel) waterRingLabel.textContent = `/ ${waterGoal.toLocaleString()} ml`;

  // Update +/- button labels
  const minusBtn = document.querySelector('.water-action-btn.minus span');
  const plusBtn = document.querySelector('.water-action-btn.plus span');
  if (minusBtn) minusBtn.textContent = `-${waterStepMinus} ml`;
  if (plusBtn) plusBtn.textContent = `+${waterStep} ml`;
}

function initWaterActions() {
  const minusBtn = document.querySelector('.water-action-btn.minus');
  const plusBtn = document.querySelector('.water-action-btn.plus');

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      waterAmount = Math.max(0, waterAmount - waterStepMinus);
      updateWaterUI();
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      waterAmount = Math.min(waterGoal + 500, waterAmount + waterStep);
      updateWaterUI();
    });
  }
}

function initWaterSettings() {
  const gearBtn = document.getElementById('waterSettingsGear');
  const backBtn = document.getElementById('waterSettingsBack');
  const sheetWater = document.getElementById('sheetWater');
  const goalPresets = document.querySelectorAll('#waterGoalPresets .water-preset-btn');
  const stepPresets = document.querySelectorAll('#waterStepPresets .water-preset-btn');
  const customGoalInput = document.getElementById('waterCustomGoal');
  const saveBtn = document.getElementById('waterSettingsSave');

  if (!gearBtn || !sheetWater) return;

  function syncPresetUI() {
    goalPresets.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.goal) === waterGoal);
    });
    stepPresets.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.step) === waterStep);
    });
    if (customGoalInput) customGoalInput.value = '';
    if (saveBtn) saveBtn.classList.remove('has-value');
  }
  syncPresetUI();

  // Open settings (slide in)
  gearBtn.addEventListener('click', () => {
    sheetWater.classList.add('show-settings');
    syncPresetUI();
  });

  // Close settings (slide back)
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      sheetWater.classList.remove('show-settings');
    });
  }

  // Goal preset buttons
  let pendingGoal = waterGoal;
  goalPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      goalPresets.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pendingGoal = parseInt(btn.dataset.goal);
      if (customGoalInput) customGoalInput.value = '';
      if (saveBtn) saveBtn.classList.add('has-value');
    });
  });

  // Custom goal input — deselect presets when typing
  if (customGoalInput) {
    customGoalInput.addEventListener('input', () => {
      const val = parseInt(customGoalInput.value);
      if (val > 0) {
        goalPresets.forEach(b => b.classList.remove('active'));
        pendingGoal = val;
        if (saveBtn) saveBtn.classList.add('has-value');
      } else {
        if (saveBtn) saveBtn.classList.remove('has-value');
      }
    });
  }

  // Step preset buttons
  let pendingStep = waterStep;
  stepPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      stepPresets.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pendingStep = parseInt(btn.dataset.step);
      if (saveBtn) saveBtn.classList.add('has-value');
    });
  });

  // Save
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      waterGoal = Math.max(500, Math.min(5000, pendingGoal));
      waterStep = Math.max(50, Math.min(1000, pendingStep));
      waterStepMinus = Math.round(waterStep / 2);

      localStorage.setItem('strivio_waterGoal', waterGoal);
      localStorage.setItem('strivio_waterStep', waterStep);

      // Clamp amount to new ceiling
      if (waterAmount > waterGoal + 500) {
        waterAmount = waterGoal + 500;
      }

      updateWaterUI();
      sheetWater.classList.remove('show-settings');
    });
  }
}

// ===== WEIGHT SAVE HANDLER =====
function initWeightSave() {
  const saveBtn = document.querySelector('.weight-save-btn');
  const input = document.querySelector('.weight-input');
  if (!saveBtn || !input) return;

  // Toggle active state on save button when input has value
  input.addEventListener('input', () => {
    const val = parseFloat(input.value);
    saveBtn.classList.toggle('has-value', !isNaN(val) && val >= 30 && val <= 300);
  });

  saveBtn.addEventListener('click', () => {
    const val = parseFloat(input.value);
    if (isNaN(val) || val < 30 || val > 300) return;

    state.weight = val;
    const weightVal = document.getElementById('weightValue');
    if (weightVal) weightVal.textContent = val.toFixed(1);

    // Update sheet display
    const weightBig = document.querySelector('.weight-big');
    if (weightBig) weightBig.textContent = val.toFixed(1);

    input.value = '';
    saveBtn.classList.remove('has-value');
    closeSheet('sheetWeight');
  });
}

// ===== RESTORE STATE =====
function restoreState() {
  try {
    const saved = localStorage.getItem('strivio_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    }
  } catch(e) {}

  try {
    const history = localStorage.getItem('strivio_screen_history');
    if (history) {
      const parsed = JSON.parse(history);
      screenHistory.splice(0, screenHistory.length, ...parsed);
    }
  } catch(e) {}

  // Restore current screen from localStorage
  try {
    const savedScreen = localStorage.getItem('strivio_screen');
    if (savedScreen) {
      currentScreen = savedScreen;
    }
  } catch(e) {}
}

// ===== BACK NAVIGATION =====
window.goBack = function goBack() {
  if (screenHistory.length > 0) {
    const prev = screenHistory.pop();
    navigateTo(prev);
  }
};

// ===== WORKOUT: SHARE =====
window.shareWorkout = function shareWorkout() {
  if (navigator.share) {
    navigator.share({ title: document.title, url: window.location.href }).catch(function(){});
  }
};

// ===== WORKOUT: TOGGLE FAVORITE =====
window.toggleFavorite = function toggleFavorite() {
  var btn = document.getElementById('wkDetailFav') || document.getElementById('wkExDetailFav');
  if (!btn) return;
  var icon = btn.querySelector('iconify-icon');
  if (!icon) return;

  if (btn.id === 'wkExDetailFav' && state.currentExercise) {
    state.exerciseFavorites = state.exerciseFavorites || [];
    var exId = state.currentExercise.id;
    var exIndex = state.exerciseFavorites.indexOf(exId);
    if (exIndex >= 0) state.exerciseFavorites.splice(exIndex, 1);
    else state.exerciseFavorites.push(exId);
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    initExerciseDetail();
    return;
  }

  var isFav = icon.getAttribute('icon') === 'solar:heart-bold-duotone';
  icon.setAttribute('icon', isFav ? 'solar:heart-bold' : 'solar:heart-bold-duotone');
  if (!isFav) icon.style.color = 'var(--navy)';
  else icon.style.color = '';
};

// ===== WORKOUT: SEARCH CLEAR =====
window.clearExerciseSearch = function clearExerciseSearch() {
  var input = document.getElementById('wkExLibSearch');
  var btn = document.getElementById('wkExLibSearchClear');
  if (input) { input.value = ''; input.focus(); }
  if (btn) btn.style.display = 'none';
};
window.clearWorkoutSearch = function clearWorkoutSearch() {
  var input = document.getElementById('wkLibrarySearch');
  var btn = document.getElementById('wkLibrarySearchClear');
  if (input) { input.value = ''; input.focus(); }
  if (btn) btn.style.display = 'none';
  if (window.workoutLibraryFilters) {
    window.workoutLibraryFilters.search = '';
  }
  renderWorkoutLibrary();
};

// ===== WORKOUT: FAVORITES FILTER =====
window.toggleWorkoutFavorites = function toggleWorkoutFavorites() {
  var btn = document.getElementById('wkLibraryFavToggle');
  if (!btn) return;
  var icon = btn.querySelector('iconify-icon');
  var showingFavs = icon && icon.getAttribute('icon') === 'solar:heart-bold';
  if (icon) {
    icon.setAttribute('icon', showingFavs ? 'solar:heart-bold-duotone' : 'solar:heart-bold');
    if (!showingFavs) icon.style.color = 'var(--navy)';
    else icon.style.color = '';
  }
};

// ===== WORKOUT: LOG TYPE SELECTION =====
var workoutDistanceTypes = ['Running', 'Walking', 'Cycling', 'Swimming', 'Hiking'];

window.selectLogType = function selectLogType(type, btn) {
  var grid = document.getElementById('wkLogTypeGrid');
  if (!grid) return;
  grid.querySelectorAll('.wk-log-type-btn').forEach(function(b){
    b.classList.remove('selected');
    b.removeAttribute('data-selected');
  });
  btn.classList.add('selected');
  btn.setAttribute('data-selected', 'true');
  syncWorkoutLogFields(type);
  setWorkoutLogFeedback('');
};

function syncWorkoutLogFields(type) {
  var customField = document.getElementById('wkLogCustomField');
  var distanceField = document.getElementById('wkLogDistanceField');
  var distanceUnit = document.getElementById('wkLogDistanceUnit');
  var distanceInput = document.getElementById('wkLogDistance');
  var normalized = type || '';
  var showCustom = normalized === 'Other';
  var showDistance = workoutDistanceTypes.indexOf(normalized) >= 0;
  var units = (state.workoutSettings && state.workoutSettings.units) === 'imperial' ? 'mi' : 'km';

  if (customField) customField.style.display = showCustom ? 'block' : 'none';
  if (distanceField) distanceField.style.display = showDistance ? '' : 'none';
  if (distanceUnit) distanceUnit.textContent = units;
  if (distanceInput && !showDistance) distanceInput.value = '';
}

function setWorkoutLogFeedback(message, isSuccess) {
  var feedback = document.getElementById('wkLogFeedback');
  if (!feedback) return;
  if (!message) {
    feedback.hidden = true;
    feedback.textContent = '';
    feedback.classList.remove('success');
    return;
  }
  feedback.hidden = false;
  feedback.textContent = message;
  feedback.classList.toggle('success', !!isSuccess);
}

function setWorkoutLogNotice(message) {
  var notice = document.getElementById('wkLogNotice');
  if (!notice) return;
  if (!message) {
    notice.hidden = true;
    notice.textContent = '';
    return;
  }
  notice.hidden = false;
  notice.textContent = message;
}

function resetWorkoutLogForm() {
  var selectedBtn = document.querySelector('#wkLogTypeGrid .wk-log-type-btn.selected');
  if (selectedBtn) {
    selectedBtn.classList.remove('selected');
    selectedBtn.removeAttribute('data-selected');
  }
  if (document.getElementById('wkLogCustomType')) document.getElementById('wkLogCustomType').value = '';
  if (document.getElementById('wkLogDuration')) document.getElementById('wkLogDuration').value = '';
  if (document.getElementById('wkLogDistance')) document.getElementById('wkLogDistance').value = '';
  if (document.getElementById('wkLogCalories')) document.getElementById('wkLogCalories').value = '';
  if (document.getElementById('wkLogNotes')) document.getElementById('wkLogNotes').value = '';
  syncWorkoutLogFields('');
  setWorkoutLogFeedback('');
}

window.openWorkoutLogForm = function openWorkoutLogForm() {
  var formCard = document.getElementById('wkLogFormCard');
  if (!formCard) return;
  formCard.classList.remove('wk-log-form-card-hidden');
  setWorkoutLogNotice('');
  setWorkoutLogFeedback('');
  if (typeof formCard.scrollIntoView === 'function') {
    formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.closeWorkoutLogForm = function closeWorkoutLogForm() {
  var formCard = document.getElementById('wkLogFormCard');
  if (!formCard) return;
  formCard.classList.add('wk-log-form-card-hidden');
  resetWorkoutLogForm();
};

function getWorkoutLogEntries() {
  var manual = (state.activityLog || []).map(function(entry) {
    var dateValue = entry.date ? new Date(entry.date) : new Date();
    var displayName = entry.label || entry.customType || entry.type || 'Activity';
    var badge = entry.type === 'rest' ? 'rest' : 'manual';
    var badgeLabel = entry.type === 'rest' ? 'Recovery' : 'Manual';
    var metrics = [];
    if (entry.duration) metrics.push({ icon: 'solar:clock-circle-bold-duotone', text: entry.duration + ' min' });
    if (entry.distance) metrics.push({ icon: 'solar:ruler-cross-pen-bold-duotone', text: entry.distance + ' ' + (((state.workoutSettings && state.workoutSettings.units) === 'imperial') ? 'mi' : 'km') });
    if (entry.calories) metrics.push({ icon: 'solar:fire-bold-duotone', text: entry.calories + ' kcal' });

    return {
      kind: badge,
      badgeLabel: badgeLabel,
      title: displayName,
      subtitle: entry.type === 'rest' ? 'Recovery day logged manually' : 'Added manually to recent activity',
      note: entry.notes || '',
      timestamp: dateValue.getTime(),
      when: formatWorkoutLogWhen(dateValue),
      metrics: metrics
    };
  });

  var workouts = (state.workoutHistory || []).map(function(entry) {
    var dateValue = entry.date ? new Date(entry.date) : new Date();
    var metrics = [];
    if (entry.totalTime) metrics.push({ icon: 'solar:clock-circle-bold-duotone', text: Math.max(1, Math.round(entry.totalTime / 60)) + ' min' });
    else if (entry.duration) metrics.push({ icon: 'solar:clock-circle-bold-duotone', text: entry.duration });
    if (entry.exercises) metrics.push({ icon: 'solar:dumbbell-bold-duotone', text: entry.exercises + ' exercises' });
    if (entry.setsCompleted) metrics.push({ icon: 'solar:repeat-bold-duotone', text: entry.setsCompleted + ' sets' });
    if (entry.calories) metrics.push({ icon: 'solar:fire-bold-duotone', text: entry.calories + ' kcal' });

    return {
      kind: 'workout',
      badgeLabel: entry.completed === false ? 'In progress' : 'Workout',
      title: entry.workoutName || entry.workout || 'Workout session',
      subtitle: entry.completed === false ? 'Partial workout saved from execution flow' : 'Completed from your workout plan',
      note: '',
      timestamp: dateValue.getTime(),
      when: formatWorkoutLogWhen(dateValue),
      metrics: metrics
    };
  });

  return manual.concat(workouts).sort(function(a, b) { return b.timestamp - a.timestamp; });
}

function formatWorkoutLogWhen(dateValue) {
  if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) return 'Recent';

  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  var startOfDate = new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate()).getTime();
  var diffDays = Math.round((startOfToday - startOfDate) / 86400000);
  var timeLabel = dateValue.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  if (diffDays === 0) return 'Today - ' + timeLabel;
  if (diffDays === 1) return 'Yesterday - ' + timeLabel;
  return dateValue.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' - ' + timeLabel;
}

function renderWorkoutLogEntries() {
  var list = document.getElementById('wkLogHistoryList');
  var count = document.getElementById('wkLogStatCount');
  var countLabel = document.getElementById('wkLogStatLabel');
  if (!list) return;

  var entries = getWorkoutLogEntries();
  var thisWeekCount = entries.filter(function(entry) {
    return entry.timestamp >= (Date.now() - (7 * 24 * 60 * 60 * 1000));
  }).length;

  if (count) count.textContent = String(thisWeekCount);
  if (countLabel) countLabel.textContent = thisWeekCount === 1 ? 'entry this week' : 'entries this week';

  if (!entries.length) {
    list.innerHTML = '<div class="wk-log-history-empty"><strong>No activity yet</strong><p>Your manual activity, finished workouts, and rest days will start building a single timeline here.</p></div>';
    return;
  }

  list.innerHTML = entries.slice(0, 8).map(function(entry) {
    return '' +
      '<article class="wk-log-history-item">' +
        '<div class="wk-log-history-top">' +
          '<div class="wk-log-history-title-wrap">' +
            '<h3 class="wk-log-history-title">' + escapeHtml(entry.title) + '</h3>' +
            '<p class="wk-log-history-subtitle">' + escapeHtml(entry.subtitle) + ' - ' + escapeHtml(entry.when) + '</p>' +
          '</div>' +
          '<span class="wk-log-history-badge ' + entry.kind + '">' + escapeHtml(entry.badgeLabel) + '</span>' +
        '</div>' +
        (entry.metrics.length ? '<div class="wk-log-history-metrics">' + entry.metrics.map(function(metric) {
          return '<span class="wk-log-history-metric"><iconify-icon icon="' + metric.icon + '" width="14"></iconify-icon>' + escapeHtml(metric.text) + '</span>';
        }).join('') + '</div>' : '') +
        (entry.note ? '<p class="wk-log-history-note">' + escapeHtml(entry.note) + '</p>' : '') +
      '</article>';
  }).join('');
}

function initWorkoutLog() {
  closeWorkoutLogForm();
  setWorkoutLogNotice('');
  renderWorkoutLogEntries();
}

// ===== WORKOUT: BUILD TOGGLE =====
window.toggleAddedExercises = function toggleAddedExercises() {
  var list = document.getElementById('wkBuildAddedList');
  var icon = document.querySelector('#wkBuildAddedToggle img');
  if (!list) return;
  var isCollapsed = list.style.display === 'none';
  list.style.display = isCollapsed ? '' : 'none';
  if (icon) icon.style.transform = isCollapsed ? '' : 'rotate(180deg)';
};

// ===== WORKOUT: COUNTDOWN =====
var workoutCountdownTimer = null;
var workoutCountdownValue = 0;

window.skipCountdown = function skipCountdown() {
  if (workoutCountdownTimer) {
    clearInterval(workoutCountdownTimer);
    workoutCountdownTimer = null;
  }
  if (!state.currentExecution) createWorkoutExecution(0);
  state.currentExecution.warmedUp = true;
  state.currentExecution.warmupPhase = false;
  state.currentExecution.includeWarmupProgress = false;
  state.currentExecution.warmupIndex = 0;
  state.currentExecution.currentSet = 1;
  state.currentExecution.exerciseStartTime = Date.now();
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  navigateTo('workout-exercise');
};

function normalizeWarmupTiming(exec) {
  if (!exec) return exec;
  exec.preparationDuration = exec.preparationDuration || 20;
  exec.warmupDuration = 30;
  (exec.warmupExercises || []).forEach(function(item) {
    item.reps = '30 sec';
  });
  return exec;
}

function initWorkoutCountdown() {
  var numEl = document.getElementById('wkCountdownNum');
  var progressEl = document.getElementById('wkCountdownProgress');
  var segmentsEl = document.getElementById('wkCountdownSegments');
  if (!numEl || !progressEl) return;

  var exec = normalizeWarmupTiming(state.currentExecution || createWorkoutExecution(0));
  var duration = exec.preparationDuration || 20;
  var startedAt = Date.now();
  workoutCountdownValue = duration;
  renderLiveSegments(segmentsEl, 0, 3);

  function renderWarmupTick() {
    var elapsed = Math.min(duration, Math.floor((Date.now() - startedAt) / 1000));
    var remaining = Math.max(0, duration - elapsed);
    numEl.textContent = formatWorkoutTime(remaining);
    progressEl.innerHTML = '0:00 &bull; 0%';
    renderLiveSegments(segmentsEl, 0, 3);

    if (remaining <= 0) {
      clearInterval(workoutCountdownTimer);
      workoutCountdownTimer = null;
      exec.warmedUp = true;
      exec.warmupPhase = true;
      exec.includeWarmupProgress = true;
      exec.warmupIndex = 0;
      exec.currentSet = 1;
      exec.exerciseStartTime = Date.now();
      try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
      navigateTo('workout-exercise');
    }
  }

  renderWarmupTick();
  workoutCountdownTimer = setInterval(renderWarmupTick, 1000);
}

function formatWorkoutTime(totalSeconds) {
  var safeSeconds = Math.max(0, Math.floor(totalSeconds || 0));
  var minutes = Math.floor(safeSeconds / 60);
  var seconds = safeSeconds % 60;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function renderLiveSegments(container, percent, segmentCount) {
  if (!container) return;
  var segments = Math.max(1, segmentCount || 5);
  var activePercent = Math.max(0, Math.min(100, percent || 0));
  var html = '';
  container.style.setProperty('--wk-segment-count', segments);
  container.setAttribute('data-count', String(segments));
  for (var i = 0; i < segments; i++) {
    var segmentStart = i * (100 / segments);
    var local = Math.max(0, Math.min(100, ((activePercent - segmentStart) / (100 / segments)) * 100));
    html += '<span><i style="width:' + local + '%"></i></span>';
  }
  html += '<b style="left:' + activePercent + '%"></b>';
  container.innerHTML = html;
}

function renderGaugeBars(container, percent) {
  if (!container) return;
  var total = 44;
  var active = Math.round((Math.max(0, Math.min(100, percent || 0)) / 100) * total);
  var html = '';
  for (var i = 0; i < total; i++) {
    var angle = -90 + (180 / (total - 1)) * i;
    html += '<span class="' + (i < active ? 'active' : '') + '" style="transform: rotate(' + angle + 'deg) translateY(-96px);"></span>';
  }
  container.innerHTML = html;
}

// ===== WORKOUT MAIN: MARK COMPLETE / REST DAY =====
window.markWorkoutComplete = function markWorkoutComplete() {
  var now = new Date();
  var entry = {
    date: now.toISOString().split('T')[0],
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    workout: 'Upper Body Strength',
    duration: '45 min',
    exercises: 6,
    completed: true
  };
  if (!state.workoutHistory) state.workoutHistory = [];
  state.workoutHistory.unshift(entry);
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  alert('Workout marked as complete!');
}

window.markRestDay = function markRestDay() {
  var now = new Date();
  var entry = {
    date: now.toISOString().split('T')[0],
    type: 'rest',
    label: 'Rest Day'
  };
  if (!state.activityLog) state.activityLog = [];
  state.activityLog.unshift(entry);
  state.todayWorkoutState = 'rest';
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}

  // Toggle UI
  var workoutCard = document.getElementById('workoutCard');
  var restDayCard = document.getElementById('restDayCard');
  var rescheduledContainer = document.getElementById('rescheduledContainer');
  var workoutExtraSections = document.getElementById('workoutExtraSections');
  if (workoutCard) workoutCard.style.display = 'none';
  if (restDayCard) restDayCard.style.display = 'flex';
  if (rescheduledContainer) rescheduledContainer.style.display = 'none';
  if (workoutExtraSections) workoutExtraSections.style.display = 'block';
}

window.markRescheduled = function markRescheduled() {
  var now = new Date();
  var entry = {
    date: now.toISOString().split('T')[0],
    type: 'rescheduled',
    label: 'Rescheduled Workout'
  };
  if (!state.activityLog) state.activityLog = [];
  state.activityLog.unshift(entry);
  state.todayWorkoutState = 'rescheduled';
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}

  // Toggle UI
  var workoutCard = document.getElementById('workoutCard');
  var restDayCard = document.getElementById('restDayCard');
  var rescheduledContainer = document.getElementById('rescheduledContainer');
  var workoutExtraSections = document.getElementById('workoutExtraSections');
  if (workoutCard) workoutCard.style.display = 'none';
  if (restDayCard) restDayCard.style.display = 'none';
  if (rescheduledContainer) rescheduledContainer.style.display = 'flex';
  if (workoutExtraSections) workoutExtraSections.style.display = 'block';
}

window.openRescheduleDatePicker = function openRescheduleDatePicker() {
  var backdrop = document.getElementById('wkDatePickerBackdrop');
  var sheet = document.getElementById('wkDatePickerSheet');
  var applyBtn = document.getElementById('wkDatePickerApplyBtn');
  if (!backdrop || !sheet) return;

  // Initialize selected day state
  window.selectedRescheduleDay = null;
  if (applyBtn) applyBtn.disabled = true;

  // Reset grid styles
  var cells = document.querySelectorAll('.wk-date-cell');
  cells.forEach(function(cell) {
    if (cell.classList.contains('wk-date-selected')) {
      cell.classList.remove('wk-date-selected');
      cell.classList.add('wk-date-selectable');
    }
  });

  // Open UI
  backdrop.hidden = false;
  sheet.setAttribute('aria-hidden', 'false');
  window.requestAnimationFrame(function() {
    backdrop.classList.add('is-visible');
    sheet.classList.add('is-open');
  });

  // Setup click handlers for selectable days once
  if (!window.datePickerInitialized) {
    window.datePickerInitialized = true;

    // Attach click listener for grid
    var grid = document.getElementById('wkDatePickerGrid');
    if (grid) {
      grid.addEventListener('click', function(e) {
        var cell = e.target.closest('.wk-date-selectable');
        if (cell) {
          // Clear current selection
          var prevSelected = grid.querySelector('.wk-date-selected');
          if (prevSelected) {
            prevSelected.classList.remove('wk-date-selected');
            prevSelected.classList.add('wk-date-selectable');
          }

          // Select this one
          cell.classList.remove('wk-date-selectable');
          cell.classList.add('wk-date-selected');

          window.selectedRescheduleDay = cell.dataset.day;
          if (applyBtn) applyBtn.disabled = false;
        }
      });
    }

    // Attach Apply button click listener
    if (applyBtn) {
      applyBtn.addEventListener('click', function() {
        if (window.selectedRescheduleDay) {
          window.confirmReschedule(window.selectedRescheduleDay);
        }
      });
    }
  }
}

window.closeRescheduleDatePicker = function closeRescheduleDatePicker() {
  var backdrop = document.getElementById('wkDatePickerBackdrop');
  var sheet = document.getElementById('wkDatePickerSheet');
  if (!backdrop || !sheet) return;

  backdrop.classList.remove('is-visible');
  sheet.classList.remove('is-open');
  sheet.setAttribute('aria-hidden', 'true');

  window.setTimeout(function() {
    backdrop.hidden = true;
  }, 250);
}

window.confirmReschedule = function confirmReschedule(day) {
  state.rescheduledDay = day;
  state.rescheduledMonth = 'Apr';

  var entry = {
    date: '2026-04-' + (day < 10 ? '0' + day : day),
    type: 'rescheduled',
    label: 'Rescheduled Workout'
  };
  if (!state.activityLog) state.activityLog = [];
  state.activityLog.unshift(entry);
  state.todayWorkoutState = 'rescheduled';
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}

  // Update DOM card values
  var rescheduledContainer = document.getElementById('rescheduledContainer');
  if (rescheduledContainer) {
    var dayEl = rescheduledContainer.querySelector('.wk-rescheduled-day');
    var monthEl = rescheduledContainer.querySelector('.wk-rescheduled-month');
    if (dayEl) dayEl.textContent = day;
    if (monthEl) monthEl.textContent = 'Apr';
  }

  // Toggle UI
  var workoutCard = document.getElementById('workoutCard');
  var restDayCard = document.getElementById('restDayCard');
  var workoutExtraSections = document.getElementById('workoutExtraSections');
  if (workoutCard) workoutCard.style.display = 'none';
  if (restDayCard) restDayCard.style.display = 'none';
  if (rescheduledContainer) rescheduledContainer.style.display = 'flex';
  if (workoutExtraSections) workoutExtraSections.style.display = 'block';

  window.closeRescheduleDatePicker();
}

window.resetWorkoutState = function resetWorkoutState() {
  state.todayWorkoutState = 'scheduled';
  delete state.rescheduledDay;
  delete state.rescheduledMonth;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  initWorkoutHome();
}

// ===== AUTH: PASSWORD TOGGLE =====
function initPasswordToggles() {
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      const icon = btn.querySelector('img');
      if (icon) icon.setAttribute('src', isPassword ? '../assets/svg_icons/eye-crossed.svg' : '../assets/svg_icons/eye.svg');
    });
  });
}

// ===== AUTH: PASSWORD STRENGTH =====
function initPasswordStrength() {
  const input = document.getElementById('regPassword');
  if (!input) return;
  input.addEventListener('input', () => {
    const val = input.value;
    const level = getPasswordStrength(val);
    updateStrengthUI(level);
    // Clear error styling as password strengthens
    if (level.level >= 3) {
      input.classList.remove('error');
      const errEl = document.getElementById('regPasswordError');
      if (errEl) errEl.textContent = '';
    }
  });
}

function getPasswordStrength(pw) {
  if (pw.length === 0) return { level: 0, label: '' };
  if (pw.length < 8) return { level: 0, label: 'Too Short' };
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  if (hasUpper && hasNumber && hasSpecial) return { level: 4, label: 'Strong' };
  if (hasUpper && hasNumber) return { level: 3, label: 'Good' };
  if (hasUpper || hasNumber) return { level: 2, label: 'Fair' };
  return { level: 1, label: 'Weak' };
}

function updateStrengthUI(strength) {
  const container = document.getElementById('passwordStrength');
  const label = document.getElementById('strengthLabel');
  const passInput = document.getElementById('regPassword');
  if (!container || !label) return;

  container.className = `password-strength strength-level-${strength.level}`;
  label.textContent = strength.label;

  const segments = container.querySelectorAll('.strength-segment');
  segments.forEach((seg, i) => {
    seg.classList.toggle('filled', i < strength.level);
  });

  // Add/remove password-strong class for green icon state
  if (passInput) {
    passInput.classList.toggle('password-strong', strength.level >= 4);
  }
}

// ===== AUTH: VALIDATE LOGIN =====
window.validateLogin = function validateLogin() {
  let valid = true;
  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');
  const emailError = document.getElementById('loginEmailError');
  const passwordError = document.getElementById('loginPasswordError');
  const banner = document.getElementById('loginBanner');

  // Clear
  if (emailError) emailError.textContent = '';
  if (passwordError) passwordError.textContent = '';
  if (email) email.classList.remove('error');
  if (password) password.classList.remove('error');
  if (banner) banner.style.display = 'none';

  if (!email || !email.value.trim()) {
    if (emailError) emailError.textContent = 'Email is required';
    if (email) email.classList.add('error');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    if (emailError) emailError.textContent = 'Please enter a valid email';
    if (email) email.classList.add('error');
    valid = false;
  }

  if (!password || !password.value) {
    if (passwordError) passwordError.textContent = 'Password is required';
    if (password) password.classList.add('error');
    valid = false;
  } else if (password.value.length < 8) {
    if (passwordError) passwordError.textContent = 'Password must be at least 8 characters';
    if (password) password.classList.add('error');
    valid = false;
  }

  if (!valid) return;

  state.email = email.value.trim();
  state.rememberMe = document.getElementById('rememberMe')?.checked || false;

  // Navigate to home after login
  navigateTo('home');
};

// ===== AUTH: VALIDATE REGISTER =====
window.validateRegister = function validateRegister() {
  let valid = true;
  const name = document.getElementById('regName');
  const email = document.getElementById('regEmail');
  const password = document.getElementById('regPassword');
  const terms = document.getElementById('agreeTerms');
  const nameError = document.getElementById('regNameError');
  const emailError = document.getElementById('regEmailError');
  const passwordError = document.getElementById('regPasswordError');
  const termsError = document.getElementById('termsError');

  // Clear
  if (nameError) nameError.textContent = '';
  if (emailError) emailError.textContent = '';
  if (passwordError) passwordError.textContent = '';
  if (termsError) termsError.textContent = '';
  if (name) name.classList.remove('error');
  if (email) email.classList.remove('error');
  if (password) password.classList.remove('error');

  if (!name || !name.value.trim()) {
    if (nameError) nameError.textContent = 'Name is required';
    if (name) name.classList.add('error');
    valid = false;
  } else if (name.value.trim().length < 2) {
    if (nameError) nameError.textContent = 'Name must be at least 2 characters';
    if (name) name.classList.add('error');
    valid = false;
  }

  if (!email || !email.value.trim()) {
    if (emailError) emailError.textContent = 'Email is required';
    if (email) email.classList.add('error');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    if (emailError) emailError.textContent = 'Please enter a valid email';
    if (email) email.classList.add('error');
    valid = false;
  }

  const pwStrength = password ? getPasswordStrength(password.value) : { level: 0 };
  if (!password || !password.value) {
    if (passwordError) passwordError.textContent = 'Password is required';
    if (password) password.classList.add('error');
    valid = false;
  } else if (password.value.length < 8) {
    if (passwordError) passwordError.textContent = 'Password must be at least 8 characters';
    if (password) password.classList.add('error');
    valid = false;
  } else if (pwStrength.level < 2) {
    if (passwordError) passwordError.textContent = 'Please choose a stronger password';
    if (password) password.classList.add('error');
    valid = false;
  }

  if (!terms || !terms.checked) {
    if (termsError) termsError.textContent = 'You must agree to the terms';
    valid = false;
  }

  if (!valid) return;

  state.registerName = name.value.trim();
  state.registerEmail = email.value.trim();
  state.name = name.value.trim();

  // Navigate to intake welcome screen
  navigateTo('intake');
};

// ===== AUTH: FORGOT PASSWORD =====
window.sendResetLink = function sendResetLink() {
  const email = document.getElementById('forgotEmail');
  const error = document.getElementById('forgotEmailError');

  if (error) error.textContent = '';
  if (email) email.classList.remove('error');

  if (!email || !email.value.trim()) {
    if (error) error.textContent = 'Email is required';
    if (email) email.classList.add('error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    if (error) error.textContent = 'Please enter a valid email';
    if (email) email.classList.add('error');
    return;
  }

  state.resetEmail = email.value.trim();
  navigateTo('forgot-confirm');
};

window.resendResetLink = function resendResetLink() {
  // Demo: just show a visual confirmation
};

// ===== AUTH: SSO DEMO =====
window.ssoDemo = function ssoDemo(provider) {
  // Demo: navigate to welcome
  navigateTo('welcome');
};

// ===== AUTH: CLEAR FORM ERRORS ON INPUT =====
function initFormClearErrors() {
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorEl = input.closest('.form-group')?.querySelector('.form-error');
      if (errorEl) errorEl.textContent = '';
    });
  });
}

// ======================================================================
// WORKOUT & EXERCISE DATA
// ======================================================================

var workoutLibrary = [
  {
    id: 'w1', name: 'Upper Body Strength', muscle: 'chest', muscles: ['Chest', 'Shoulders', 'Triceps'],
    duration: 45, difficulty: 'intermediate', equipment: ['Dumbbells', 'Barbell'], calories: 320,
    desc: 'A comprehensive upper body workout targeting chest, shoulders, and triceps with progressive overload.',
    exercises: ['e1','e8','e12','e5','e3','e7'], favorite: true
  },
  {
    id: 'w2', name: 'Leg Day Power', muscle: 'legs', muscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    duration: 50, difficulty: 'advanced', equipment: ['Barbell', 'Machines'], calories: 420,
    desc: 'Heavy leg day focused on building raw strength and power through compound movements.',
    exercises: ['e9','e10','e11','e13'], favorite: false
  },
  {
    id: 'w3', name: 'Back & Biceps', muscle: 'back', muscles: ['Back', 'Biceps'],
    duration: 40, difficulty: 'intermediate', equipment: ['Dumbbells', 'Cables'], calories: 290,
    desc: 'Build a strong V-taper with this back and biceps focused routine.',
    exercises: ['e2','e4','e20','e21'], favorite: true
  },
  {
    id: 'w4', name: 'Core Crusher', muscle: 'core', muscles: ['Abs', 'Obliques', 'Lower Back'],
    duration: 25, difficulty: 'beginner', equipment: ['Bodyweight'], calories: 180,
    desc: 'Complete core workout to build stability, strength, and definition.',
    exercises: ['e14','e15','e16'], favorite: false
  },
  {
    id: 'w5', name: 'Full Body HIIT', muscle: 'full-body', muscles: ['Full Body'],
    duration: 30, difficulty: 'advanced', equipment: ['Bodyweight', 'Dumbbells'], calories: 380,
    desc: 'High intensity full body circuit for maximum calorie burn and conditioning.',
    exercises: ['e17','e18','e19','e1','e9'], favorite: false
  },
  {
    id: 'w6', name: 'Shoulder Builder', muscle: 'shoulders', muscles: ['Shoulders', 'Traps'],
    duration: 35, difficulty: 'intermediate', equipment: ['Dumbbells', 'Cables'], calories: 250,
    desc: 'Build broad, powerful shoulders with this focused deltoid routine.',
    exercises: ['e3','e7','e8','e5'], favorite: false
  },
  {
    id: 'w7', name: 'Push Day', muscle: 'chest', muscles: ['Chest', 'Shoulders', 'Triceps'],
    duration: 40, difficulty: 'intermediate', equipment: ['Barbell', 'Dumbbells'], calories: 310,
    desc: 'Push-focused workout emphasizing pressing movements for upper body growth.',
    exercises: ['e1','e3','e7','e12'], favorite: false
  },
  {
    id: 'w8', name: 'Pull Day', muscle: 'back', muscles: ['Back', 'Biceps', 'Rear Delts'],
    duration: 40, difficulty: 'intermediate', equipment: ['Barbell', 'Cables', 'Dumbbells'], calories: 300,
    desc: 'Pull-focused workout targeting back, biceps, and rear delts.',
    exercises: ['e2','e4','e20','e21'], favorite: false
  }
];

var exerciseLibrary = [
  { id: 'e1', name: 'Bench Press', muscle: 'chest', muscles: ['Chest', 'Triceps', 'Shoulders'], difficulty: 'intermediate', equipment: 'Barbell', duration: 5, sets: 4, reps: '8-10', video: 'bench-press' },
  { id: 'e2', name: 'Pull Ups', muscle: 'back', muscles: ['Back', 'Biceps'], difficulty: 'intermediate', equipment: 'Bodyweight', duration: 5, sets: 3, reps: '8-12', video: 'pull-ups' },
  { id: 'e3', name: 'Overhead Press', muscle: 'shoulders', muscles: ['Shoulders', 'Triceps'], difficulty: 'intermediate', equipment: 'Barbell', duration: 4, sets: 4, reps: '8-10', video: 'ohp' },
  { id: 'e4', name: 'Barbell Row', muscle: 'back', muscles: ['Back', 'Biceps'], difficulty: 'intermediate', equipment: 'Barbell', duration: 5, sets: 4, reps: '8-10', video: 'barbell-row' },
  { id: 'e5', name: 'Lateral Raise', muscle: 'shoulders', muscles: ['Shoulders'], difficulty: 'beginner', equipment: 'Dumbbells', duration: 3, sets: 3, reps: '12-15', video: 'lateral-raise' },
  { id: 'e6', name: 'Squat', muscle: 'legs', muscles: ['Quadriceps', 'Hamstrings', 'Glutes'], difficulty: 'intermediate', equipment: 'Barbell', duration: 6, sets: 4, reps: '8-10', video: 'squat' },
  { id: 'e7', name: 'Tricep Pushdown', muscle: 'arms', muscles: ['Triceps'], difficulty: 'beginner', equipment: 'Cables', duration: 3, sets: 3, reps: '12-15', video: 'tricep-pushdown' },
  { id: 'e8', name: 'Incline Dumbbell Press', muscle: 'chest', muscles: ['Chest', 'Shoulders'], difficulty: 'intermediate', equipment: 'Dumbbells', duration: 5, sets: 3, reps: '10-12', video: 'incline-press' },
  { id: 'e9', name: 'Deadlift', muscle: 'legs', muscles: ['Hamstrings', 'Glutes', 'Back'], difficulty: 'advanced', equipment: 'Barbell', duration: 6, sets: 4, reps: '5-8', video: 'deadlift' },
  { id: 'e10', name: 'Leg Press', muscle: 'legs', muscles: ['Quadriceps', 'Glutes'], difficulty: 'beginner', equipment: 'Machines', duration: 4, sets: 4, reps: '10-12', video: 'leg-press' },
  { id: 'e11', name: 'Romanian Deadlift', muscle: 'legs', muscles: ['Hamstrings', 'Glutes'], difficulty: 'intermediate', equipment: 'Dumbbells', duration: 4, sets: 3, reps: '10-12', video: 'rdl' },
  { id: 'e12', name: 'Dumbbell Fly', muscle: 'chest', muscles: ['Chest'], difficulty: 'beginner', equipment: 'Dumbbells', duration: 3, sets: 3, reps: '12-15', video: 'fly' },
  { id: 'e13', name: 'Leg Curl', muscle: 'legs', muscles: ['Hamstrings'], difficulty: 'beginner', equipment: 'Machines', duration: 3, sets: 3, reps: '12-15', video: 'leg-curl' },
  { id: 'e14', name: 'Plank', muscle: 'core', muscles: ['Abs', 'Core'], difficulty: 'beginner', equipment: 'Bodyweight', duration: 2, sets: 3, reps: '30-60s', video: 'plank' },
  { id: 'e15', name: 'Russian Twist', muscle: 'core', muscles: ['Obliques', 'Abs'], difficulty: 'beginner', equipment: 'Bodyweight', duration: 2, sets: 3, reps: '20 each', video: 'russian-twist' },
  { id: 'e16', name: 'Hanging Leg Raise', muscle: 'core', muscles: ['Abs', 'Hip Flexors'], difficulty: 'advanced', equipment: 'Bodyweight', duration: 3, sets: 3, reps: '10-15', video: 'leg-raise' },
  { id: 'e17', name: 'Burpees', muscle: 'full-body', muscles: ['Full Body'], difficulty: 'intermediate', equipment: 'Bodyweight', duration: 4, sets: 3, reps: '15', video: 'burpees' },
  { id: 'e18', name: 'Mountain Climbers', muscle: 'full-body', muscles: ['Core', 'Shoulders'], difficulty: 'beginner', equipment: 'Bodyweight', duration: 2, sets: 3, reps: '30s', video: 'mtn-climbers' },
  { id: 'e19', name: 'Box Jumps', muscle: 'legs', muscles: ['Quadriceps', 'Glutes', 'Calves'], difficulty: 'intermediate', equipment: 'Bodyweight', duration: 3, sets: 4, reps: '8-10', video: 'box-jumps' },
  { id: 'e20', name: 'Bicep Curl', muscle: 'arms', muscles: ['Biceps'], difficulty: 'beginner', equipment: 'Dumbbells', duration: 3, sets: 3, reps: '12-15', video: 'bicep-curl' },
  { id: 'e21', name: 'Face Pull', muscle: 'shoulders', muscles: ['Rear Delts', 'Rotator Cuff'], difficulty: 'beginner', equipment: 'Cables', duration: 3, sets: 3, reps: '15-20', video: 'face-pull' }
];

// ======================================================================
// WORKOUT STATE (merged into strivio_state)
// ======================================================================

// Ensure workout properties exist on state
state.workoutFavorites = state.workoutFavorites || [];
state.exerciseFavorites = state.exerciseFavorites || [];
state.customWorkouts = state.customWorkouts || [];
state.workoutHistory = state.workoutHistory || [];
state.activityLog = state.activityLog || [];
state.currentWorkout = state.currentWorkout || null;
state.currentExecution = state.currentExecution || null;
state.workoutSettings = state.workoutSettings || { restDuration: 90, countdownDuration: 3, units: 'metric' };
state.coachParams = state.coachParams || {};
state.coachWorkout = state.coachWorkout || null;
state.workoutSchedule = state.workoutSchedule || null;
state.buildExercises = state.buildExercises || [];
state.exerciseNotes = state.exerciseNotes || {};
state.exerciseHistory = state.exerciseHistory || {};
state.workoutGeneratorDraft = state.workoutGeneratorDraft || {
  duration: 30,
  targets: [],
  level: '',
  location: '',
  warmup: true,
  cooldown: true
};

// ======================================================================
// HELPER: GET EXERCISE BY ID
// ======================================================================
function getEx(id) {
  return exerciseLibrary.find(function(e) { return e.id === id; });
}

// ======================================================================
// SAVE COACH AND NEXT (Coach Q1-Q6)
// ======================================================================
window.saveCoachAndNext = function saveCoachAndNext(screenId, key, nextScreen) {
  var val;
  if (screenId === 'coach-q6') {
    val = document.getElementById('coachWorkoutName') ? document.getElementById('coachWorkoutName').value.trim() : '';
  } else if (screenId === 'coach-q3') {
    val = getSelectedValues(key + 'Options');
  } else {
    val = getSelectedValue(key + 'Options');
  }
  state.coachParams[key] = val;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  navigateTo(nextScreen);
};

// ======================================================================
// COACH Q6: ENABLE BUTTON ON TEXT INPUT
// ======================================================================
function initCoachQ6() {
  var input = document.getElementById('coachWorkoutName');
  var btn = document.getElementById('btnCoachQ6');
  if (!input || !btn) return;
  input.addEventListener('input', function() {
    btn.disabled = !input.value.trim();
  });
}

// ======================================================================
// COACH: GENERATE WORKOUT (Q6 → Generating → Review)
// ======================================================================
window.generateCoachWorkout = function generateCoachWorkout() {
  var name = document.getElementById('coachWorkoutName');
  if (!name || !name.value.trim()) return;
  state.coachParams.coachWorkoutName = name.value.trim();
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  navigateTo('coach-generating');
};

// ======================================================================
// COACH: GENERATING ANIMATION → AUTO ADVANCE TO REVIEW
// ======================================================================
function initCoachGenerating() {
  var steps = document.querySelectorAll('#coachLoadingSteps .loading-step');
  if (!steps.length) return;
  var stepIndex = 0;
  function advanceStep() {
    if (stepIndex < steps.length) {
      if (stepIndex > 0) {
        steps[stepIndex - 1].classList.remove('active');
        steps[stepIndex - 1].classList.add('completed');
        var icon = steps[stepIndex - 1].querySelector('.step-icon');
        if (icon) { icon.innerHTML = '&#x2713;'; }
      }
      if (stepIndex < steps.length) {
        steps[stepIndex].classList.remove('pending');
        steps[stepIndex].classList.add('active');
        var activeIcon = steps[stepIndex].querySelector('.step-icon');
        if (activeIcon) { activeIcon.innerHTML = '<span class="spinner"></span>'; }
      }
      stepIndex++;
      setTimeout(advanceStep, 800 + Math.random() * 600);
    } else {
      // Generate the workout based on coach params
      generateCoachPlan();
      setTimeout(function() { navigateTo('coach-review'); }, 400);
    }
  }
  setTimeout(advanceStep, 600);
}

function generateCoachPlan() {
  var params = state.coachParams;
  var targetMuscles = params.coachMuscles || ['full-body'];
  var location = params.coachLocation || '';
  if (typeof targetMuscles === 'string') targetMuscles = [targetMuscles];

  // Filter exercises by muscle and difficulty
  var matching = exerciseLibrary.filter(function(ex) {
    var muscleMatch = ex.muscle === 'full-body' || targetMuscles.some(function(m) {
      return ex.muscles.map(function(x) { return x.toLowerCase(); }).join(' ').indexOf(m) >= 0 || ex.muscle === m;
    });
    var diffMatch = !params.coachDifficulty || ex.difficulty === params.coachDifficulty ||
      (params.coachDifficulty === 'beginner' && ex.difficulty === 'beginner') ||
      (params.coachDifficulty === 'intermediate' && (ex.difficulty === 'beginner' || ex.difficulty === 'intermediate')) ||
      (params.coachDifficulty === 'advanced');
    var eqMatch = true;
    if (location === 'home') {
      eqMatch = ex.equipment === 'Bodyweight' || ex.equipment === 'Dumbbells';
    } else if (!location) {
      eqMatch = !params.coachEquipment || params.coachEquipment === 'full-gym' ||
        ex.equipment === params.coachEquipment || ex.equipment === 'Bodyweight';
    }
    return muscleMatch && diffMatch && eqMatch;
  });

  if (matching.length < 4) matching = exerciseLibrary.slice(0, 8);
  // Shuffle and pick 5-8 exercises
  matching.sort(function() { return Math.random() - 0.5; });
  var count = Math.min(Math.max(5, Math.floor(Math.random() * 4) + 5), matching.length);
  var picked = matching.slice(0, count);

  // Determine duration
  var timeMap = { '30': 30, '45': 40, '60': 50, '90': 70 };
  var duration = timeMap[params.coachTime] || 45;
  var equipmentLabels = location === 'home'
    ? ['Home']
    : location === 'gym'
      ? ['Gym']
      : location === 'both'
        ? ['Gym', 'Home']
        : params.coachEquipment === 'bodyweight'
          ? ['Bodyweight']
          : params.coachEquipment === 'dumbbells'
            ? ['Dumbbells']
            : ['Mixed'];

  state.coachWorkout = {
    id: 'coach_' + Date.now(),
    name: params.coachWorkoutName || 'Coach Workout',
    muscle: targetMuscles[0],
    muscles: targetMuscles.map(function(m) { return m.charAt(0).toUpperCase() + m.slice(1); }),
    duration: duration,
    difficulty: params.coachDifficulty || 'intermediate',
    equipment: equipmentLabels,
    location: location || '',
    calories: Math.round(duration * 7),
    desc: location
      ? 'Coach-generated workout based on your selected duration, level, location, and target areas.'
      : 'Coach-generated workout based on your preferences.',
    exercises: picked.map(function(ex) { return ex.id; }),
    favorite: false,
    warmup: params.coachWarmup !== false,
    cooldown: params.coachCooldown !== false
  };
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
}

// ======================================================================
// COACH: REVIEW SCREEN
// ======================================================================
function initCoachReview() {
  var body = document.getElementById('wkCoachReviewBody');
  if (!body || !state.coachWorkout) return;
  var w = state.coachWorkout;
  var exList = (w.exercises || []).map(function(eid) { return getEx(eid); }).filter(Boolean);
  var diffKey = String(w.difficulty || 'intermediate');
  var diffLabel = diffKey.charAt(0).toUpperCase() + diffKey.slice(1);
  var workoutName = w.name && w.name !== 'Coach Workout' ? w.name : 'Monday Exercise';
  var originCopy = w.location ? 'Generated from your workout generator selections' : 'Generated from your intake preferences';
  var targetBadges = getCoachReviewTargets(w);
  var expectationCards = getCoachReviewExpectations(w);

  var targetHTML = targetBadges.map(function(target) {
    var visual = target.visualType === 'image'
      ? '<span class="cr-target-media"><img src="' + target.asset + '" alt=""></span>'
      : '<span class="cr-target-media cr-target-media--icon"><span class="icon icon-default" style="--icon-url: url(\'' + target.asset + '\'); width: 16px; height: 16px;"></span></span>';
    return '<span class="cr-target-badge">' + visual + '<span class="cr-target-label">' + escapeHtml(target.label) + '</span></span>';
  }).join('');

  var expectationHTML = expectationCards.map(function(card) {
    return '<article class="cr-expect-card">' +
      '<span class="cr-expect-icon"><span class="icon icon-default" style="--icon-url: url(\'' + card.icon + '\'); width: 20px; height: 20px;"></span></span>' +
      '<p>' + escapeHtml(card.copy) + '</p>' +
    '</article>';
  }).join('');

  var exHTML = exList.map(function(ex) {
    return '<article class="cr-exercise-row">' +
      '<div class="cr-exercise-thumb"><img src="' + getCoachReviewExerciseImage(ex) + '" alt=""></div>' +
      '<div class="cr-exercise-copy">' +
        '<span class="cr-exercise-name">' + escapeHtml(ex.name) + '</span>' +
        '<span class="cr-exercise-meta">' + escapeHtml(String(ex.sets) + ' Sets · ' + String(ex.reps)) + '</span>' +
      '</div>' +
      '<span class="cr-exercise-arrow"><span class="icon icon-default" style="--icon-url: url(\'../../assets/svg_icons/foward.svg\'); width: 16px; height: 16px;"></span></span>' +
    '</article>';
  }).join('');

  body.innerHTML =
    '<section class="cr-plan-card">' +
      '<div class="cr-plan-pattern"></div>' +
      '<div class="cr-workout-header">' +
        '<h2 class="cr-workout-name">' + escapeHtml(workoutName) + '</h2>' +
        '<p class="cr-workout-origin">' + escapeHtml(originCopy) + '</p>' +
      '</div>' +
      '<div class="cr-badges">' +
        '<div class="cr-badge"><span class="icon icon-default" style="--icon-url: url(\'../../assets/svg_icons/clock-five.svg\'); width: 16px; height: 16px;"></span><span>' + escapeHtml(String(w.duration) + ' min') + '</span></div>' +
        '<div class="cr-badge"><span class="icon icon-default" style="--icon-url: url(\'../../assets/svg_icons/chart-simple.svg\'); width: 16px; height: 16px;"></span><span>' + escapeHtml(diffLabel) + '</span></div>' +
        '<div class="cr-badge"><span class="icon icon-default" style="--icon-url: url(\'../../assets/svg_icons/flame.svg\'); width: 16px; height: 16px;"></span><span>' + escapeHtml(String(w.calories || (w.duration * 5)) + ' cal') + '</span></div>' +
      '</div>' +
    '</section>' +
    '<section class="cr-section">' +
      '<div class="cr-section-head">' +
        '<h3 class="cr-section-title">Target Area</h3>' +
      '</div>' +
      '<div class="cr-target-list">' + targetHTML + '</div>' +
    '</section>' +
    '<section class="cr-section">' +
      '<div class="cr-section-head">' +
        '<h3 class="cr-section-title">What to Expect</h3>' +
      '</div>' +
      '<div class="cr-expect-grid">' + expectationHTML + '</div>' +
    '</section>' +
    '<section class="cr-ex-section">' +
      '<div class="cr-exercises-head">' +
        '<h3 class="cr-exercises-title">Exercises</h3>' +
        '<span class="cr-exercises-count">' + escapeHtml(String(exList.length) + ' Exercise') + '</span>' +
      '</div>' +
      '<div class="cr-exercises-list">' + exHTML + '</div>' +
    '</section>';
}

function getCoachReviewTargets(workout) {
  var source = Array.isArray(workout.muscles) && workout.muscles.length ? workout.muscles : [workout.muscle || 'Chest'];
  var seen = {};
  return source.map(function(label) {
    var target = getCoachReviewTargetVisual(label);
    var key = target.label.toLowerCase();
    if (seen[key]) return null;
    seen[key] = true;
    return target;
  }).filter(Boolean).slice(0, 3);
}

function getCoachReviewTargetVisual(label) {
  var raw = String(label || '').trim().toLowerCase();
  if (raw.indexOf('chest') !== -1) {
    return { label: 'Chest', visualType: 'image', asset: '../../assets/img/anatomical-muscles/anatomical-chest.png' };
  }
  if (raw.indexOf('shoulder') !== -1 || raw.indexOf('delt') !== -1) {
    return { label: 'Shoulders', visualType: 'image', asset: '../../assets/img/anatomical-muscles/anatomical-shoulders.png' };
  }
  if (raw.indexOf('back') !== -1) {
    return { label: 'Upper Back', visualType: 'image', asset: '../../assets/img/anatomical-muscles/anatomical-upper-back.png' };
  }
  if (raw.indexOf('bicep') !== -1) {
    return { label: 'Bicep', visualType: 'image', asset: '../../assets/img/anatomical-muscles/anatomical-bicep.png' };
  }
  if (raw.indexOf('tricep') !== -1) {
    return { label: 'Triceps', visualType: 'image', asset: '../../assets/img/anatomical-muscles/anatomical-tricep.png' };
  }
  if (raw.indexOf('arm') !== -1 || raw.indexOf('forearm') !== -1) {
    return { label: 'Forearm', visualType: 'image', asset: '../../assets/img/anatomical-muscles/anatomical-forearm.png' };
  }
  if (raw.indexOf('glute') !== -1) {
    return { label: 'Glutes', visualType: 'icon', asset: '../../assets/svg_icons/dumbbell-ray.svg' };
  }
  if (raw.indexOf('leg') !== -1 || raw.indexOf('quad') !== -1 || raw.indexOf('hamstring') !== -1 || raw.indexOf('calf') !== -1) {
    return { label: 'Legs', visualType: 'icon', asset: '../../assets/svg_icons/leg.svg' };
  }
  if (raw.indexOf('core') !== -1 || raw.indexOf('abs') !== -1 || raw.indexOf('oblique') !== -1) {
    return { label: 'Core', visualType: 'icon', asset: '../../assets/svg_icons/core.svg' };
  }
  return { label: label || 'Full Body', visualType: 'icon', asset: '../../assets/svg_icons/muscle.svg' };
}

function getCoachReviewExpectations(workout) {
  var primary = String(workout.muscle || '').toLowerCase();
  var focusCopy = 'Strength-Focused full body session';
  var mixCopy = 'Balanced compound and accessory exercises';
  if (primary === 'chest' || primary === 'back' || primary === 'shoulders' || primary === 'arms' || primary === 'triceps' || primary === 'bicep') {
    focusCopy = 'Strength-Focused upper body session';
    mixCopy = 'Mixed of push and pull exercises';
  } else if (primary === 'legs' || primary === 'glutes') {
    focusCopy = 'Strength-Focused lower body session';
    mixCopy = 'Mixed of power and stability exercises';
  } else if (primary === 'core') {
    focusCopy = 'Strength-Focused core training session';
    mixCopy = 'Mixed of strength and control exercises';
  }
  return [
    { icon: '../../assets/svg_icons/bullseye-arrow.svg', copy: focusCopy },
    { icon: '../../assets/svg_icons/exchange.svg', copy: mixCopy }
  ];
}

function getCoachReviewExerciseImage(exercise) {
  var name = String(exercise && exercise.name || '').toLowerCase();
  if (name.indexOf('bench') !== -1) return '../../assets/img/workouts/barbell_bench.png';
  if (name.indexOf('row') !== -1) return '../../assets/img/workouts/barbel_row.png';
  if (name.indexOf('overhead') !== -1 || name.indexOf('shoulder press') !== -1 || name.indexOf('press') !== -1) return '../../assets/img/workouts/overhead_press.png';
  if (name.indexOf('pull') !== -1 || name.indexOf('lat') !== -1) return '../../assets/img/workouts/Pull-Ups.png';
  if (name.indexOf('curl') !== -1) return '../../assets/img/workouts/barbell_curl.png';
  if (name.indexOf('squat') !== -1 || name.indexOf('lunge') !== -1) return '../../assets/img/workouts/barber_squat.png';
  if (name.indexOf('plank') !== -1) return '../../assets/img/workouts/plank.png';
  return '../../assets/img/workouts/strength_building.png';
}

window.saveCoachWorkout = function saveCoachWorkout() {
  if (!state.coachWorkout) return;
  if (!state.coachWorkout.id) state.coachWorkout.id = 'coach_' + Date.now();
  state.customWorkouts = state.customWorkouts || [];
  state.customWorkouts.push(state.coachWorkout);
  state.pendingWorkoutSaveToast = true;
  state.coachWorkout = null;
  state.coachParams = {};
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  navigateTo('workout');
};

var workoutGeneratorDurationValues = [15, 30, 45, 60];
var workoutGeneratorTargetDefinitions = {
  chest: { label: 'Chest', canonical: 'chest' },
  shoulders: { label: 'Shoulders', canonical: 'shoulders' },
  'upper-back': { label: 'Upper Back', canonical: 'back' },
  bicep: { label: 'Bicep', canonical: 'arms' },
  triceps: { label: 'Triceps', canonical: 'triceps' },
  glutes: { label: 'Glutes', canonical: 'glutes' },
  legs: { label: 'Legs', canonical: 'legs' },
  core: { label: 'Core', canonical: 'core' },
  forearms: { label: 'Forearms', canonical: 'arms' }
};
var workoutGeneratorLevelDefinitions = {
  beginner: { label: 'Beginer' },
  intermediate: { label: 'Intermediate' },
  advanced: { label: 'Advanced' }
};
var workoutGeneratorLocationDefinitions = {
  gym: { label: 'Gym' },
  home: { label: 'Home' },
  both: { label: 'Both' }
};

function getDefaultWorkoutGeneratorDraft() {
  return {
    duration: 30,
    targets: [],
    level: '',
    location: '',
    warmup: true,
    cooldown: true
  };
}

function normalizeWorkoutGeneratorDraft(draft) {
  var normalized = getDefaultWorkoutGeneratorDraft();
  var source = draft && typeof draft === 'object' ? draft : {};
  var duration = parseInt(source.duration, 10);
  if (workoutGeneratorDurationValues.indexOf(duration) >= 0) {
    normalized.duration = duration;
  }
  if (Array.isArray(source.targets)) {
    normalized.targets = source.targets.filter(function(key, index, list) {
      return workoutGeneratorTargetDefinitions[key] && list.indexOf(key) === index;
    });
  }
  if (workoutGeneratorLevelDefinitions[source.level]) normalized.level = source.level;
  if (workoutGeneratorLocationDefinitions[source.location]) normalized.location = source.location;
  normalized.warmup = source.warmup !== false;
  normalized.cooldown = source.cooldown !== false;
  return normalized;
}

function getWorkoutGeneratorDraft() {
  state.workoutGeneratorDraft = normalizeWorkoutGeneratorDraft(state.workoutGeneratorDraft);
  return state.workoutGeneratorDraft;
}

function persistWorkoutGeneratorDraft() {
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
}

function getWorkoutGeneratorSelectedTargets(draft) {
  return draft.targets.map(function(key) {
    return workoutGeneratorTargetDefinitions[key];
  }).filter(Boolean);
}

function getWorkoutGeneratorDurationPercent(value) {
  var index = workoutGeneratorDurationValues.indexOf(value);
  if (index <= 0) return 0;
  return (index / (workoutGeneratorDurationValues.length - 1)) * 100;
}

function buildWorkoutGeneratorRecommendation(targets) {
  var labels = targets.map(function(item) {
    return item.label.toLowerCase();
  });
  if (!labels.length) return '';
  if (labels.length === 1) {
    return 'Great choice! focusing on ' + labels[0] + ' builds strength, control and confidence.';
  }
  if (labels.length === 2) {
    return 'Great choice! focusing on ' + labels[0] + ' + ' + labels[1] + ' builds strength, power and balance.';
  }
  return 'Great choice! focusing on ' + labels.slice(0, -1).join(', ') + ' + ' + labels[labels.length - 1] + ' builds strength, control and balance.';
}

function buildWorkoutGeneratorName(draft) {
  var labels = getWorkoutGeneratorSelectedTargets(draft).map(function(item) {
    return item.label;
  });
  var focus = labels.length ? labels.slice(0, 2).join(' & ') : 'Coach';
  return draft.duration + ' Min ' + focus + ' Workout';
}

function updateWorkoutGeneratorUI() {
  var screen = document.querySelector('.screen-workout-generator');
  if (!screen) return;
  var draft = getWorkoutGeneratorDraft();
  var durationBadge = document.getElementById('wgDurationBadge');
  var durationSlider = document.getElementById('wgDurationSlider');
  var coachName = document.getElementById('wgCoachFirstName');
  var selectedTargets = getWorkoutGeneratorSelectedTargets(draft);
  var recommendation = document.getElementById('wgRecommendation');
  var recommendationText = document.getElementById('wgRecommendationText');
  var generateBtn = document.getElementById('wgGenerateBtn');

  screen.style.setProperty('--wg-duration-progress', getWorkoutGeneratorDurationPercent(draft.duration) + '%');
  if (durationBadge) durationBadge.textContent = draft.duration + ' min';
  if (durationSlider) durationSlider.value = String(draft.duration);
  if (coachName) coachName.textContent = (state.name || 'Mike Michel').split(' ')[0] || 'Mike';

  var heroDuration = document.getElementById('wgHeroDuration');
  var heroLevel = document.getElementById('wgHeroLevel');
  var heroLocation = document.getElementById('wgHeroLocation');
  var heroTargets = document.getElementById('wgHeroTargets');

  if (heroDuration) {
    heroDuration.innerHTML = '<span class="icon" style="--icon-url: url(\'../../assets/svg_icons/clock-five.svg\'); width: 16px; height: 16px; background-color: var(--color-text-tertiary);"></span>' + draft.duration + ' min';
  }
  if (heroLevel) {
    var lvl = draft.level || 'Intermediate';
    var lvlLabel = lvl.charAt(0).toUpperCase() + lvl.slice(1);
    heroLevel.innerHTML = '<span class="icon" style="--icon-url: url(\'../../assets/svg_icons/chart-simple.svg\'); width: 16px; height: 16px; background-color: var(--color-text-tertiary);"></span>' + lvlLabel;
  }
  if (heroLocation) {
    var loc = draft.location || 'Home';
    var locLabel = loc.charAt(0).toUpperCase() + loc.slice(1);
    heroLocation.innerHTML = '<span class="icon" style="--icon-url: url(\'../../assets/svg_icons/location.svg\'); width: 16px; height: 16px; background-color: var(--color-text-tertiary);"></span>' + locLabel;
  }
  if (heroTargets) {
    var targetsLabel = selectedTargets.map(function(t) { return t.label; }).join(', ') || 'Legs, Glutes';
    heroTargets.innerHTML = '<span class="icon" style="--icon-url: url(\'../../assets/svg_icons/location.svg\'); width: 16px; height: 16px; background-color: var(--color-text-tertiary);"></span>' + targetsLabel;
  }

  document.querySelectorAll('[data-wg-target]').forEach(function(button) {
    var key = button.getAttribute('data-wg-target');
    button.classList.toggle('is-selected', draft.targets.indexOf(key) >= 0);
  });

  document.querySelectorAll('[data-wg-level]').forEach(function(button) {
    var key = button.getAttribute('data-wg-level');
    button.classList.toggle('is-selected', draft.level === key);
  });

  document.querySelectorAll('[data-wg-location]').forEach(function(button) {
    var key = button.getAttribute('data-wg-location');
    button.classList.toggle('is-selected', draft.location === key);
  });

  document.querySelectorAll('[data-wg-binary]').forEach(function(button) {
    var key = button.getAttribute('data-wg-binary');
    var value = button.getAttribute('data-value') === 'true';
    button.classList.toggle('is-selected', !!draft[key] === value);
  });

  if (recommendation) recommendation.hidden = !selectedTargets.length;
  if (recommendationText) recommendationText.textContent = buildWorkoutGeneratorRecommendation(selectedTargets);
  if (generateBtn) generateBtn.disabled = !(selectedTargets.length && draft.level && draft.location);
}

function initWorkoutGenerator() {
  var screen = document.querySelector('.screen-workout-generator');
  if (!screen) return;

  getWorkoutGeneratorDraft();

  var durationSlider = document.getElementById('wgDurationSlider');
  if (durationSlider) {
    durationSlider.addEventListener('input', function() {
      state.workoutGeneratorDraft.duration = parseInt(durationSlider.value, 10) || 30;
      persistWorkoutGeneratorDraft();
      updateWorkoutGeneratorUI();
    });
  }

  document.querySelectorAll('[data-wg-target]').forEach(function(button) {
    button.addEventListener('click', function() {
      var key = button.getAttribute('data-wg-target');
      var draft = getWorkoutGeneratorDraft();
      var index = draft.targets.indexOf(key);
      if (index >= 0) {
        draft.targets.splice(index, 1);
      } else {
        draft.targets.push(key);
      }
      persistWorkoutGeneratorDraft();
      updateWorkoutGeneratorUI();
    });
  });

  document.querySelectorAll('[data-wg-level]').forEach(function(button) {
    button.addEventListener('click', function() {
      state.workoutGeneratorDraft.level = button.getAttribute('data-wg-level') || '';
      persistWorkoutGeneratorDraft();
      updateWorkoutGeneratorUI();
    });
  });

  document.querySelectorAll('[data-wg-location]').forEach(function(button) {
    button.addEventListener('click', function() {
      state.workoutGeneratorDraft.location = button.getAttribute('data-wg-location') || '';
      persistWorkoutGeneratorDraft();
      updateWorkoutGeneratorUI();
    });
  });

  document.querySelectorAll('[data-wg-binary]').forEach(function(button) {
    button.addEventListener('click', function() {
      var key = button.getAttribute('data-wg-binary');
      state.workoutGeneratorDraft[key] = button.getAttribute('data-value') === 'true';
      persistWorkoutGeneratorDraft();
      updateWorkoutGeneratorUI();
    });
  });

  updateWorkoutGeneratorUI();
}

window.generateWorkoutFromGenerator = function generateWorkoutFromGenerator() {
  var draft = getWorkoutGeneratorDraft();
  var selectedTargets = getWorkoutGeneratorSelectedTargets(draft);
  if (!selectedTargets.length || !draft.level || !draft.location) return;

  var canonicalTargets = [];
  selectedTargets.forEach(function(item) {
    if (canonicalTargets.indexOf(item.canonical) === -1) {
      canonicalTargets.push(item.canonical);
    }
  });

  state.coachParams = {
    coachTime: String(draft.duration),
    coachDifficulty: draft.level,
    coachLocation: draft.location,
    coachEquipment: draft.location === 'home' ? 'dumbbells' : 'full-gym',
    coachMuscles: canonicalTargets,
    coachWarmup: !!draft.warmup,
    coachCooldown: !!draft.cooldown,
    coachWorkoutName: buildWorkoutGeneratorName(draft)
  };
  persistWorkoutGeneratorDraft();
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  navigateTo('coach-generating');
};

function dismissWorkoutSavedToast() {
  var toast = document.getElementById('wkSaveSnackbar');
  if (!toast) return;
  toast.classList.remove('show');
  window.setTimeout(function() { toast.hidden = true; }, 180);
}

function initWorkoutHome() {
  updateHomeGreeting();

  // Toggle UI based on state
  var workoutCard = document.getElementById('workoutCard');
  var restDayCard = document.getElementById('restDayCard');
  var rescheduledContainer = document.getElementById('rescheduledContainer');
  var workoutExtraSections = document.getElementById('workoutExtraSections');

  if (state.todayWorkoutState === 'rest') {
    if (workoutCard) workoutCard.style.display = 'none';
    if (restDayCard) restDayCard.style.display = 'flex';
    if (rescheduledContainer) rescheduledContainer.style.display = 'none';
    if (workoutExtraSections) workoutExtraSections.style.display = 'block';
  } else if (state.todayWorkoutState === 'rescheduled') {
    if (workoutCard) workoutCard.style.display = 'none';
    if (restDayCard) restDayCard.style.display = 'none';
    if (rescheduledContainer) {
      rescheduledContainer.style.display = 'flex';
      var dayEl = rescheduledContainer.querySelector('.wk-rescheduled-day');
      var monthEl = rescheduledContainer.querySelector('.wk-rescheduled-month');
      if (dayEl) dayEl.textContent = state.rescheduledDay || '26';
      if (monthEl) monthEl.textContent = state.rescheduledMonth || 'Apr';
    }
    if (workoutExtraSections) workoutExtraSections.style.display = 'block';
  } else {
    if (workoutCard) workoutCard.style.display = 'flex';
    if (restDayCard) restDayCard.style.display = 'none';
    if (rescheduledContainer) rescheduledContainer.style.display = 'none';
    if (workoutExtraSections) workoutExtraSections.style.display = 'block';
  }

  if (!state.pendingWorkoutSaveToast) return;

  state.pendingWorkoutSaveToast = false;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}

  var toast = document.getElementById('wkSaveSnackbar');
  if (!toast) return;
  toast.hidden = false;
  window.requestAnimationFrame(function() { toast.classList.add('show'); });

  var ok = toast.querySelector('[data-toast-ok]');
  if (ok) ok.addEventListener('click', dismissWorkoutSavedToast, { once: true });

  window.setTimeout(dismissWorkoutSavedToast, 3600);
}

function renderCustomWorkouts(search) {
  var list = document.getElementById('customWorkoutList');
  if (!list) return;

  var workouts = (state.customWorkouts || []).slice();
  if (search) {
    var query = search.toLowerCase();
    workouts = workouts.filter(function(w) {
      return [
        w.name,
        w.desc,
        w.muscle,
        (w.muscles || []).join(' '),
        w.difficulty,
        (w.equipment || []).join(' ')
      ].join(' ').toLowerCase().indexOf(query) >= 0;
    });
  }

  if (!workouts.length) {
    list.innerHTML =
      '<section class="custom-workouts-empty">' +
        '<img src="../../assets/svg_icons/not-found-alt.svg" width="48" height="48" alt="">' +
        '<h2>No custom workouts yet</h2>' +
        '<p>Create a coach-built workout and it will appear here.</p>' +
        '<button type="button" onclick="navigateTo(\'workout-generator\')">Create Workout</button>' +
      '</section>';
    return;
  }

  list.innerHTML = workouts.map(function(w) {
    var tags = (w.muscles && w.muscles.length ? w.muscles : [w.muscle || 'General']).slice(0, 3);
    var difficulty = String(w.difficulty || 'intermediate');
    var difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    var equipment = Array.isArray(w.equipment) ? w.equipment.join(', ') : (w.equipment || 'Mixed');
    return '<article class="custom-workout-card" onclick="openWorkoutDetail(\'' + escapeHtml(w.id) + '\')">' +
      '<div class="custom-workout-thumb"><img src="' + getWorkoutLibraryImage(w) + '" alt=""></div>' +
      '<div class="custom-workout-info">' +
        '<h2>' + escapeHtml(w.name || 'Custom Workout') + '</h2>' +
        '<p>' + escapeHtml(w.desc || 'Coach-generated workout based on your preferences.') + '</p>' +
        '<div class="custom-workout-meta">' +
          '<span><img src="../../assets/svg_icons/clock-five.svg" width="12" height="12" alt=""> ' + escapeHtml(w.duration || 45) + ' min</span>' +
          '<span><img src="../../assets/svg_icons/chart-simple.svg" width="12" height="12" alt=""> ' + escapeHtml(difficultyLabel) + '</span>' +
        '</div>' +
        '<div class="custom-workout-tags">' +
          tags.map(function(tag) { return '<span>' + escapeHtml(tag) + '</span>'; }).join('') +
          '<span>' + escapeHtml(equipment) + '</span>' +
        '</div>' +
      '</div>' +
    '</article>';
  }).join('');
}

function initCustomWorkouts() {
  renderCustomWorkouts();

  var search = document.getElementById('customWorkoutSearch');
  if (search) {
    search.addEventListener('input', function() {
      renderCustomWorkouts(search.value.trim());
    });
  }
}

function initNutrientsLocked() {
  var screen = document.querySelector('.screen-nutrients-locked');
  var scroller = document.getElementById('nlLockedContent');
  if (!screen || !scroller) return;

  function syncLockedScreenShadow() {
    var scrollable = scroller.scrollHeight - scroller.clientHeight > 4;
    var atEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4;
    screen.classList.toggle('nl-at-end', !scrollable || atEnd);
  }

  scroller.addEventListener('scroll', syncLockedScreenShadow, { passive: true });
  window.addEventListener('resize', syncLockedScreenShadow);
  window.requestAnimationFrame(syncLockedScreenShadow);
}

// ======================================================================
// WORKOUT LIBRARY SCREEN
// ======================================================================
function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getWorkoutLibraryImage(workout) {
  var byId = {
    w1: '../../assets/img/workouts/barbell_bench.png',
    w2: '../../assets/img/workouts/barber_squat.png',
    w3: '../../assets/img/workouts/barbel_row.png',
    w4: '../../assets/img/workouts/plank.png',
    w5: '../../assets/img/workouts/Cardio.png',
    w6: '../../assets/img/workouts/barber_roll.png',
    w7: '../../assets/img/workouts/overhead_press.png',
    w8: '../../assets/img/workouts/Pull-Ups.png'
  };

  if (byId[workout.id]) return byId[workout.id];

  var muscle = String(workout.muscle || '').toLowerCase();
  if (muscle === 'legs') return '../../assets/img/workouts/barber_squat.png';
  if (muscle === 'core') return '../../assets/img/workouts/plank.png';
  if (muscle === 'back') return '../../assets/img/workouts/barbel_row.png';
  if (muscle === 'full-body') return '../../assets/img/workouts/Cardio.png';
  return '../../assets/img/workouts/barbell_bench.png';
}

var workoutLibraryFilters = {
  muscle: 'all',
  goal: 'all',
  duration: 'all',
  level: 'all',
  location: 'all',
  search: ''
};

var workoutLibraryGroupedFilterKeys = ['muscle', 'goal', 'duration'];
var workoutLibraryActiveSheet = null;
var workoutLibrarySheetParent = null;
var workoutLibraryFilterDraft = null;

var workoutLibraryFilterDefinitions = {
  muscle: {
    label: 'Muscle Group',
    title: 'Muscle Group',
    previewCount: 5,
    options: [
      { value: 'all', label: 'All Muscle Groups' },
      { value: 'chest', label: 'Chest', image: '../../assets/img/anatomical-muscles/anatomical-chest.png' },
      { value: 'shoulders', label: 'Shoulders', image: '../../assets/img/anatomical-muscles/anatomical-shoulders.png' },
      { value: 'upper-back', label: 'Upper Back', image: '../../assets/img/anatomical-muscles/anatomical-upper-back.png' },
      { value: 'lower-back', label: 'Lower Back', image: '../../assets/img/anatomical-muscles/anatomical-lower-back.png' },
      { value: 'rear-delts', label: 'Rear Delts', image: '../../assets/img/anatomical-muscles/anatomical-rear-delts.png' },
      { value: 'lats', label: 'Lats', image: '../../assets/img/anatomical-muscles/anatomical-lats.png' },
      { value: 'bicep', label: 'Bicep', image: '../../assets/img/anatomical-muscles/anatomical-bicep.png' },
      { value: 'triceps', label: 'Triceps', image: '../../assets/img/anatomical-muscles/anatomical-tricep.png' },
      { value: 'forearm', label: 'Forearm', image: '../../assets/img/anatomical-muscles/anatomical-forearm.png' }
    ]
  },
  goal: {
    label: 'Goals',
    title: 'Goals',
    options: [
      { value: 'all', label: 'All Goals' },
      { value: 'build-muscle', label: 'Build Muscle' },
      { value: 'burn-fat', label: 'Burn Fat' },
      { value: 'get-stronger', label: 'Get Stronger' },
      { value: 'improve-endurance', label: 'Improve Endurance' }
    ]
  },
  duration: {
    label: 'Duration',
    title: 'Duration',
    options: [
      { value: 'all', label: 'All Durations' },
      { value: '0-20', label: '0-20 min', min: 0, max: 20 },
      { value: '10-20', label: '10-20 min', min: 10, max: 20 },
      { value: '20-30', label: '20-30 min', min: 20, max: 30 },
      { value: '30-40', label: '30-40 min', min: 30, max: 40 },
      { value: '40-50', label: '40-50 min', min: 40, max: 50 },
      { value: '50-plus', label: '50+ min', min: 50, max: null }
    ]
  },
  level: {
    label: 'Level',
    title: 'Level',
    options: [
      { value: 'all', label: 'All Levels', icon: '../../assets/svg_icons/sparkles.svg', iconColor: 'var(--color-default)' },
      { value: 'beginner', label: 'Beginner', icon: '../../assets/svg_icons/meditation.svg', iconColor: 'var(--color-toq)' },
      { value: 'intermediate', label: 'Intermediate', icon: '../../assets/svg_icons/user.svg', iconColor: 'var(--color-primary)' },
      { value: 'advanced', label: 'Advanced', icon: '../../assets/svg_icons/dumbbell-ray.svg', iconColor: 'var(--color-secondary)' }
    ]
  },
  location: {
    label: 'Location',
    title: 'Location',
    options: [
      { value: 'all', label: 'All Locations', icon: '../../assets/svg_icons/location.svg', iconColor: 'var(--color-default)' },
      { value: 'home', label: 'Home', icon: '../../assets/svg_icons/house.svg', iconColor: 'var(--color-primary)' },
      { value: 'home-equipment', label: 'Home with Equipment', icon: '../../assets/svg_icons/dumbbell-ray.svg', iconColor: 'var(--color-secondary)' },
      { value: 'gym', label: 'Gym', icon: '../../assets/svg_icons/gym.svg', iconColor: 'var(--color-tertiary)' }
    ]
  }
};

function getWorkoutLibraryFilterLabel(filterType, value) {
  var config = workoutLibraryFilterDefinitions[filterType];
  if (!config) return 'All';
  var match = config.options.find(function(option) { return option.value === value; });
  return match ? match.label : config.options[0].label;
}

function normalizeWorkoutMuscleTag(value) {
  var normalized = String(value || '').toLowerCase();
  if (normalized.indexOf('chest') >= 0) return 'chest';
  if (normalized.indexOf('shoulder') >= 0) return 'shoulders';
  if (normalized.indexOf('upper back') >= 0) return 'upper-back';
  if (normalized.indexOf('lower back') >= 0) return 'lower-back';
  if (normalized.indexOf('rear delt') >= 0) return 'rear-delts';
  if (normalized.indexOf('lat') >= 0) return 'lats';
  if (normalized.indexOf('bicep') >= 0) return 'bicep';
  if (normalized.indexOf('tricep') >= 0) return 'triceps';
  if (normalized.indexOf('forearm') >= 0) return 'forearm';
  if (normalized === 'back') return 'upper-back';
  if (normalized === 'arms') return 'bicep';
  return '';
}

function getWorkoutDurationBucket(duration) {
  var minutes = Number(duration || 0);
  if (minutes < 10) return '0-20';
  if (minutes < 20) return '10-20';
  if (minutes < 30) return '20-30';
  if (minutes < 40) return '30-40';
  if (minutes < 50) return '40-50';
  return '50-plus';
}

function getWorkoutLocation(workout) {
  var byId = {
    w1: 'gym',
    w2: 'gym',
    w3: 'gym',
    w4: 'home',
    w5: 'home-equipment',
    w6: 'home-equipment',
    w7: 'gym',
    w8: 'gym'
  };

  if (byId[workout.id]) return byId[workout.id];

  var equipment = Array.isArray(workout.equipment) ? workout.equipment.join(' ').toLowerCase() : String(workout.equipment || '').toLowerCase();
  if (!equipment) return 'home';
  if (equipment.indexOf('machine') >= 0 || equipment.indexOf('barbell') >= 0 || equipment.indexOf('cable') >= 0) return 'gym';
  if (equipment.indexOf('dumbbell') >= 0) return 'home-equipment';
  return 'home';
}

function getWorkoutGoal(workout) {
  var byId = {
    w1: 'build-muscle',
    w2: 'get-stronger',
    w3: 'build-muscle',
    w4: 'get-stronger',
    w5: 'burn-fat',
    w6: 'build-muscle',
    w7: 'get-stronger',
    w8: 'build-muscle'
  };

  if (byId[workout.id]) return byId[workout.id];

  if (String(workout.muscle || '').toLowerCase() === 'full-body') return 'burn-fat';
  if (Number(workout.duration || 0) <= 30) return 'improve-endurance';
  return 'build-muscle';
}

function matchesWorkoutLibraryDurationFilter(duration, filterValue) {
  if (!filterValue || filterValue === 'all') return true;
  var option = workoutLibraryFilterDefinitions.duration.options.find(function(item) {
    return item.value === filterValue;
  });
  if (!option) return true;
  var minutes = Number(duration || 0);
  if (option.max == null) return minutes >= option.min;
  return minutes >= option.min && minutes < option.max;
}

function getWorkoutLibraryProfile(workout) {
  var rawMuscles = (workout.muscles && workout.muscles.length ? workout.muscles : [workout.muscle || '']).map(function(item) {
    return String(item || '');
  });
  var normalizedMuscles = rawMuscles.map(normalizeWorkoutMuscleTag).filter(Boolean);
  var uniqueMuscles = normalizedMuscles.filter(function(item, index) {
    return normalizedMuscles.indexOf(item) === index;
  });

  return {
    goal: getWorkoutGoal(workout),
    goalLabel: getWorkoutLibraryFilterLabel('goal', getWorkoutGoal(workout)),
    durationBucket: getWorkoutDurationBucket(workout.duration),
    durationLabel: getWorkoutLibraryFilterLabel('duration', getWorkoutDurationBucket(workout.duration)),
    level: String(workout.difficulty || 'intermediate').toLowerCase(),
    levelLabel: String(workout.difficulty || 'Intermediate').charAt(0).toUpperCase() + String(workout.difficulty || 'Intermediate').slice(1),
    location: getWorkoutLocation(workout),
    locationLabel: getWorkoutLibraryFilterLabel('location', getWorkoutLocation(workout)),
    muscles: uniqueMuscles,
    muscleLabels: rawMuscles.filter(function(label, index) {
      return rawMuscles.indexOf(label) === index;
    })
  };
}

function cloneWorkoutLibraryGroupedFilters(source) {
  source = source || {};
  return {
    muscle: source.muscle || 'all',
    goal: source.goal || 'all',
    duration: source.duration || 'all'
  };
}

function areWorkoutLibraryGroupedFiltersEqual(a, b) {
  return workoutLibraryGroupedFilterKeys.every(function(filterType) {
    return (a && a[filterType] ? a[filterType] : 'all') === (b && b[filterType] ? b[filterType] : 'all');
  });
}

function ensureWorkoutLibraryFilterDraft() {
  if (!workoutLibraryFilterDraft) {
    workoutLibraryFilterDraft = cloneWorkoutLibraryGroupedFilters(workoutLibraryFilters);
  }
  return workoutLibraryFilterDraft;
}

function resetWorkoutLibraryFilterDraft() {
  workoutLibraryFilterDraft = cloneWorkoutLibraryGroupedFilters();
  return workoutLibraryFilterDraft;
}

function getWorkoutLibrarySelectableOptions(filterType) {
  var config = workoutLibraryFilterDefinitions[filterType];
  if (!config) return [];
  return config.options.filter(function(option) {
    return option.value !== 'all';
  });
}

function getWorkoutLibraryGroupedFilterCount(source) {
  source = source || workoutLibraryFilters;
  return workoutLibraryGroupedFilterKeys.filter(function(filterType) {
    return source[filterType] && source[filterType] !== 'all';
  }).length;
}

function hasAnyWorkoutLibraryFilters() {
  return Object.keys(workoutLibraryFilterDefinitions).some(function(filterType) {
    return workoutLibraryFilters[filterType] && workoutLibraryFilters[filterType] !== 'all';
  }) || !!String(workoutLibraryFilters.search || '').trim();
}

function renderWorkoutLibraryAppliedFilters() {
  var row = document.getElementById('wkLibraryAppliedFilters');
  var list = document.getElementById('wkLibraryAppliedFilterList');
  if (!row || !list) return;

  var pills = workoutLibraryGroupedFilterKeys.filter(function(filterType) {
    return workoutLibraryFilters[filterType] && workoutLibraryFilters[filterType] !== 'all';
  }).map(function(filterType) {
    return {
      filterType: filterType,
      label: getWorkoutLibraryFilterLabel(filterType, workoutLibraryFilters[filterType])
    };
  });

  list.innerHTML = pills.map(function(item) {
    return '<button class="wk-filter-pill" type="button" data-filter-pill-remove="' + escapeHtml(item.filterType) + '">' +
      '<span>' + escapeHtml(item.label) + '</span>' +
      '<span class="wk-filter-pill-remove" aria-hidden="true">&times;</span>' +
    '</button>';
  }).join('');

  row.hidden = !hasAnyWorkoutLibraryFilters();
  row.classList.toggle('is-empty', pills.length === 0);
}

function updateWorkoutLibraryFilterUI() {
  var groupedActiveCount = getWorkoutLibraryGroupedFilterCount(workoutLibraryFilters);
  var groupedTrigger = document.querySelector('[data-filter-sheet="filters"]');
  var groupedBadge = document.getElementById('wkFilterGroupedCount');
  if (groupedTrigger) {
    groupedTrigger.classList.toggle('is-active', groupedActiveCount > 0);
    groupedTrigger.setAttribute('aria-expanded', (workoutLibraryActiveSheet === 'filters' || workoutLibraryActiveSheet === 'muscle') ? 'true' : 'false');
  }
  if (groupedBadge) {
    groupedBadge.hidden = groupedActiveCount === 0;
    groupedBadge.textContent = groupedActiveCount;
  }

  ['level', 'location'].forEach(function(filterType) {
    var valueEl = document.getElementById('wkFilterValue-' + filterType);
    var trigger = document.querySelector('[data-filter-sheet="' + filterType + '"]');
    var isActive = workoutLibraryFilters[filterType] && workoutLibraryFilters[filterType] !== 'all';
    if (valueEl) {
      valueEl.textContent = isActive
        ? getWorkoutLibraryFilterLabel(filterType, workoutLibraryFilters[filterType])
        : workoutLibraryFilterDefinitions[filterType].label;
    }
    if (trigger) {
      trigger.classList.toggle('is-active', !!isActive);
      trigger.setAttribute('aria-expanded', workoutLibraryActiveSheet === filterType ? 'true' : 'false');
    }
  });

  var clearBtn = document.getElementById('wkLibrarySearchClear');
  if (clearBtn) clearBtn.style.display = workoutLibraryFilters.search ? '' : 'none';

  renderWorkoutLibraryAppliedFilters();
}

function renderWorkoutLibraryGroupedDraftChip(filterType, option, isSelected, withImage) {
  return '<button class="wk-filter-choice-chip' + (isSelected ? ' is-selected' : '') + (withImage ? ' wk-filter-choice-chip-muscle' : '') + '" type="button" data-filter-draft="' + escapeHtml(filterType) + '" data-filter-value="' + escapeHtml(option.value) + '">' +
    (withImage ? '<span class="wk-filter-choice-chip-icon"><img src="' + escapeHtml(option.image || '') + '" alt="' + escapeHtml(option.label) + '"></span>' : '') +
    '<span class="wk-filter-choice-chip-label">' + escapeHtml(option.label) + '</span>' +
  '</button>';
}

function renderWorkoutLibraryGroupedSheet() {
  var draft = ensureWorkoutLibraryFilterDraft();
  var canApply = getWorkoutLibraryGroupedFilterCount(draft) > 0 || !areWorkoutLibraryGroupedFiltersEqual(draft, workoutLibraryFilters);
  var muscleOptions = getWorkoutLibrarySelectableOptions('muscle').slice(0, workoutLibraryFilterDefinitions.muscle.previewCount || 5);
  var goalOptions = getWorkoutLibrarySelectableOptions('goal');
  var durationOptions = getWorkoutLibrarySelectableOptions('duration');

  return '<div class="wk-filter-sheet-panel wk-filter-sheet-panel-grouped">' +
    '<div class="wk-filter-sheet-header wk-filter-sheet-header-grouped">' +
      '<h2 class="wk-filter-sheet-title wk-filter-sheet-title-grouped">Filter</h2>' +
      '<button class="wk-filter-sheet-link" type="button" data-filter-reset-grouped>Reset</button>' +
    '</div>' +
    '<div class="wk-filter-sheet-sections">' +
      '<section class="wk-filter-sheet-section">' +
        '<div class="wk-filter-sheet-section-head">' +
          '<h3 class="wk-filter-sheet-section-title">Muscle Group</h3>' +
          '<button class="wk-filter-sheet-link" type="button" data-filter-sheet-nav="muscle">View all</button>' +
        '</div>' +
        '<div class="wk-filter-choice-grid wk-filter-choice-grid-muscle">' +
          muscleOptions.map(function(option) {
            return renderWorkoutLibraryGroupedDraftChip('muscle', option, draft.muscle === option.value, true);
          }).join('') +
        '</div>' +
      '</section>' +
      '<section class="wk-filter-sheet-section">' +
        '<div class="wk-filter-sheet-section-head">' +
          '<h3 class="wk-filter-sheet-section-title">Goals</h3>' +
        '</div>' +
        '<div class="wk-filter-choice-grid">' +
          goalOptions.map(function(option) {
            return renderWorkoutLibraryGroupedDraftChip('goal', option, draft.goal === option.value, false);
          }).join('') +
        '</div>' +
      '</section>' +
      '<section class="wk-filter-sheet-section">' +
        '<div class="wk-filter-sheet-section-head">' +
          '<h3 class="wk-filter-sheet-section-title">Duration</h3>' +
        '</div>' +
        '<div class="wk-filter-choice-grid">' +
          durationOptions.map(function(option) {
            return renderWorkoutLibraryGroupedDraftChip('duration', option, draft.duration === option.value, false);
          }).join('') +
        '</div>' +
      '</section>' +
    '</div>' +
    '<div class="wk-filter-sheet-footer">' +
      '<button class="wk-filter-sheet-apply' + (canApply ? '' : ' is-disabled') + '" type="button" data-filter-apply' + (canApply ? '' : ' disabled') + '>Find Workouts</button>' +
    '</div>' +
  '</div>';
}

function renderWorkoutLibraryMuscleSheet() {
  var draft = ensureWorkoutLibraryFilterDraft();
  var options = getWorkoutLibrarySelectableOptions('muscle');
  return '<div class="wk-filter-sheet-panel wk-filter-sheet-panel-muscle">' +
    '<div class="wk-filter-sheet-header wk-filter-sheet-header-muscle">' +
      '<h2 class="wk-filter-sheet-title wk-filter-sheet-title-muscle">Muscle Group</h2>' +
    '</div>' +
    '<div class="wk-filter-muscle-list">' +
      options.map(function(option, index) {
        return '<button class="wk-filter-muscle-option' + (draft.muscle === option.value ? ' is-selected' : '') + '" type="button" data-filter-draft="muscle" data-filter-value="' + escapeHtml(option.value) + '">' +
          '<span class="wk-filter-muscle-option-image"><img src="' + escapeHtml(option.image || '') + '" alt="' + escapeHtml(option.label) + '"></span>' +
          '<span class="wk-filter-muscle-option-label">' + escapeHtml(option.label) + '</span>' +
          '<span class="wk-filter-muscle-option-check" aria-hidden="true">' + (draft.muscle === option.value ? '&#10003;' : '') + '</span>' +
        '</button>' + (index === options.length - 1 ? '' : '<div class="wk-filter-muscle-divider"></div>');
      }).join('') +
    '</div>' +
  '</div>';
}

function renderWorkoutLibrarySingleFilterSheet(filterType) {
  var config = workoutLibraryFilterDefinitions[filterType];
  if (!config) return '';
  return '<div class="wk-filter-sheet-panel wk-filter-sheet-panel-select">' +
    '<div class="wk-filter-sheet-header wk-filter-sheet-header-select">' +
      '<h2 class="wk-filter-sheet-title wk-filter-sheet-title-grouped">' + escapeHtml(config.title) + '</h2>' +
      '<button class="wk-filter-sheet-link" type="button" data-filter-reset-single="' + escapeHtml(filterType) + '">Reset</button>' +
    '</div>' +
    '<div class="wk-filter-select-list">' +
      config.options.map(function(option) {
        var isActive = workoutLibraryFilters[filterType] === option.value;
        var iconMarkup = option.icon
          ? '<span class="icon wk-filter-select-icon" style="--icon-url: url(\'' + escapeHtml(option.icon) + '\'); background-color: ' + escapeHtml(option.iconColor || 'var(--color-default)') + ';"></span>'
          : (option.image ? '<span class="wk-filter-select-icon-image"><img src="' + escapeHtml(option.image) + '" alt="' + escapeHtml(option.label) + '"></span>' : '<span class="wk-filter-select-icon wk-filter-select-icon-empty"></span>');
        return '<button class="wk-filter-select-card' + (isActive ? ' is-selected' : '') + '" type="button" data-filter-value="' + escapeHtml(option.value) + '">' +
          iconMarkup +
          '<span class="wk-filter-select-label">' + escapeHtml(option.label) + '</span>' +
          '<span class="wk-filter-select-check" aria-hidden="true">' + (isActive ? '&#10003;' : '') + '</span>' +
        '</button>';
      }).join('') +
    '</div>' +
  '</div>';
}

function renderWorkoutLibraryFilterSheet() {
  var content = document.getElementById('wkFilterSheetContent');
  if (!content) return;
  if (!workoutLibraryActiveSheet) {
    content.innerHTML = '';
    return;
  }
  if (workoutLibraryActiveSheet === 'filters') {
    content.innerHTML = renderWorkoutLibraryGroupedSheet();
    return;
  }
  if (workoutLibraryActiveSheet === 'muscle') {
    content.innerHTML = renderWorkoutLibraryMuscleSheet();
    return;
  }
  content.innerHTML = renderWorkoutLibrarySingleFilterSheet(workoutLibraryActiveSheet);
}

window.openWorkoutLibrarySheet = function openWorkoutLibrarySheet(filterType) {
  var sheet = document.getElementById('wkFilterSheet');
  var backdrop = document.getElementById('wkFilterSheetBackdrop');
  if (!sheet || !backdrop || (filterType !== 'filters' && !workoutLibraryFilterDefinitions[filterType])) return;

  if (filterType === 'filters') {
    workoutLibraryFilterDraft = cloneWorkoutLibraryGroupedFilters(workoutLibraryFilters);
    workoutLibrarySheetParent = null;
  } else {
    workoutLibrarySheetParent = null;
  }
  workoutLibraryActiveSheet = filterType;
  backdrop.hidden = false;
  sheet.setAttribute('aria-hidden', 'false');
  renderWorkoutLibraryFilterSheet();
  updateWorkoutLibraryFilterUI();
  requestAnimationFrame(function() {
    backdrop.classList.add('is-visible');
    sheet.classList.add('is-open');
  });
};

window.closeWorkoutLibrarySheet = function closeWorkoutLibrarySheet() {
  var sheet = document.getElementById('wkFilterSheet');
  var backdrop = document.getElementById('wkFilterSheetBackdrop');
  if (workoutLibraryActiveSheet === 'muscle' && workoutLibrarySheetParent === 'filters') {
    workoutLibraryActiveSheet = 'filters';
    workoutLibrarySheetParent = null;
    renderWorkoutLibraryFilterSheet();
    updateWorkoutLibraryFilterUI();
    return;
  }
  workoutLibraryActiveSheet = null;
  workoutLibrarySheetParent = null;
  workoutLibraryFilterDraft = null;
  if (sheet) {
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
  }
  if (backdrop) {
    backdrop.classList.remove('is-visible');
    setTimeout(function() {
      if (!workoutLibraryActiveSheet) backdrop.hidden = true;
    }, 180);
  }
  renderWorkoutLibraryFilterSheet();
  updateWorkoutLibraryFilterUI();
};

window.resetWorkoutLibraryFilters = function resetWorkoutLibraryFilters() {
  Object.keys(workoutLibraryFilterDefinitions).forEach(function(filterType) {
    workoutLibraryFilters[filterType] = 'all';
  });
  workoutLibraryFilters.search = '';

  var input = document.getElementById('wkLibrarySearch');
  var clearBtn = document.getElementById('wkLibrarySearchClear');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';

  workoutLibraryFilterDraft = null;
  workoutLibrarySheetParent = null;
  workoutLibraryActiveSheet = null;
  var sheet = document.getElementById('wkFilterSheet');
  var backdrop = document.getElementById('wkFilterSheetBackdrop');
  if (sheet) {
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
  }
  if (backdrop) {
    backdrop.classList.remove('is-visible');
    backdrop.hidden = true;
  }
  renderWorkoutLibraryFilterSheet();
  renderWorkoutLibrary();
};

function renderWorkoutLibrary() {
  var list = document.getElementById('wkLibraryList');
  if (!list) return;
  var results = workoutLibrary.concat(state.customWorkouts || []);

  var search = String(workoutLibraryFilters.search || '').trim();
  results = results.filter(function(w) {
    var profile = getWorkoutLibraryProfile(w);
    if (workoutLibraryFilters.muscle !== 'all' && profile.muscles.indexOf(workoutLibraryFilters.muscle) === -1) return false;
    if (workoutLibraryFilters.goal !== 'all' && profile.goal !== workoutLibraryFilters.goal) return false;
    if (!matchesWorkoutLibraryDurationFilter(w.duration, workoutLibraryFilters.duration)) return false;
    if (workoutLibraryFilters.level !== 'all' && profile.level !== workoutLibraryFilters.level) return false;
    if (workoutLibraryFilters.location !== 'all' && profile.location !== workoutLibraryFilters.location) return false;
    return true;
  });

  if (search) {
    var q = search.toLowerCase();
    results = results.filter(function(w) {
      var profile = getWorkoutLibraryProfile(w);
      var haystack = [
        w.name,
        w.muscle,
        (w.muscles || []).join(' '),
        w.difficulty,
        (w.equipment || []).join(' '),
        profile.goalLabel,
        profile.locationLabel
      ].join(' ').toLowerCase();
      return haystack.indexOf(q) >= 0;
    });
  }

  // Handle favorites toggle
  var favBtn = document.getElementById('wkLibraryFavToggle');
  var showFavs = favBtn && favBtn.querySelector('iconify-icon') && favBtn.querySelector('iconify-icon').getAttribute('icon') === 'solar:heart-bold';
  if (showFavs) {
    results = results.filter(function(w) { return w.favorite; });
  }

  var resultsCount = document.getElementById('wkLibraryResultsCount');
  if (resultsCount) {
    resultsCount.innerHTML =
      '<span class="icon wk-default-icon" style="--icon-url: url(\'../../assets/svg_icons/dumbbell-ray.svg\'); width: 12px; height: 12px;"></span>' +
      '<span>' + results.length + ' Workout' + (results.length === 1 ? '' : 's') + '</span>';
  }

  updateWorkoutLibraryFilterUI();

  if (!results.length) {
    var hasSearch = !!search;
    var emptyTitle = hasSearch ? 'No workouts match this search' : 'No workouts match these filters';
    list.innerHTML =
      '<div class="wk-lib-empty">' +
        '<img src="../../assets/svg_icons/not-found-alt.svg" width="36" height="36" alt="Not found">' +
        '<h3>' + emptyTitle + '</h3>' +
        '<p>Adjust the dropdowns or clear the current search to browse the full workout library again.</p>' +
      '</div>';
    return;
  }

  list.innerHTML = results.map(function(w) {
    var profile = getWorkoutLibraryProfile(w);
    var primaryMuscles = (profile.muscleLabels.length ? profile.muscleLabels : [w.muscle || 'General']).slice(0, 2);
    var equipment = Array.isArray(w.equipment) ? w.equipment[0] : (w.equipment || 'Bodyweight');
    var summary = primaryMuscles.join(', ') + ' · ' + String(equipment).toLowerCase();
    return '<article class="wk-lib-card" onclick="openWorkoutDetail(\'' + w.id + '\')">' +
      '<div class="wk-lib-thumb"><img src="' + getWorkoutLibraryImage(w) + '" alt=""></div>' +
      '<div class="wk-lib-content">' +
        '<h3>' + escapeHtml(w.name) + '</h3>' +
        '<div class="wk-lib-meta">' +
          '<span class="wk-lib-meta-item"><span class="icon wk-default-icon" style="--icon-url: url(\'../../assets/svg_icons/dumbbell-ray.svg\'); width: 12px; height: 12px;"></span><span>' + escapeHtml(profile.locationLabel) + '</span></span>' +
          '<span class="wk-lib-meta-item"><span class="icon wk-default-icon" style="--icon-url: url(\'../../assets/svg_icons/clock-five.svg\'); width: 12px; height: 12px;"></span><span>' + escapeHtml(w.duration) + ' min</span></span>' +
          '<span class="wk-lib-meta-item"><span class="icon wk-default-icon" style="--icon-url: url(\'../../assets/svg_icons/chart-simple.svg\'); width: 12px; height: 12px;"></span><span>' + escapeHtml(profile.levelLabel) + '</span></span>' +
        '</div>' +
        '<p class="wk-lib-summary">' + escapeHtml(summary) + '</p>' +
        '<p class="wk-lib-goal-text">Goal: ' + escapeHtml(profile.goalLabel) + '</p>' +
      '</div>' +
    '</article>';
  }).join('');
}

function initWorkoutLibrary() {
  renderWorkoutLibrary();

  var searchInput = document.getElementById('wkLibrarySearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var clearBtn = document.getElementById('wkLibrarySearchClear');
      if (clearBtn) clearBtn.style.display = searchInput.value ? '' : 'none';
      workoutLibraryFilters.search = searchInput.value;
      renderWorkoutLibrary();
    });
  }

  var filters = document.getElementById('wkLibraryFilters');
  if (filters && !filters.dataset.ready) {
    filters.dataset.ready = 'true';
    filters.addEventListener('click', function(event) {
      var trigger = event.target.closest('[data-filter-sheet]');
      if (!trigger) return;
      window.openWorkoutLibrarySheet(trigger.getAttribute('data-filter-sheet'));
    });
  }

  var backdrop = document.getElementById('wkFilterSheetBackdrop');
  if (backdrop && !backdrop.dataset.ready) {
    backdrop.dataset.ready = 'true';
    backdrop.addEventListener('click', window.closeWorkoutLibrarySheet);
  }

  var sheetContent = document.getElementById('wkFilterSheetContent');
  if (sheetContent && !sheetContent.dataset.ready) {
    sheetContent.dataset.ready = 'true';
    sheetContent.addEventListener('click', function(event) {
      var navigateBtn = event.target.closest('[data-filter-sheet-nav]');
      if (navigateBtn) {
        workoutLibrarySheetParent = workoutLibraryActiveSheet;
        workoutLibraryActiveSheet = navigateBtn.getAttribute('data-filter-sheet-nav');
        renderWorkoutLibraryFilterSheet();
        updateWorkoutLibraryFilterUI();
        return;
      }

      var resetBtn = event.target.closest('[data-filter-reset-grouped]');
      if (resetBtn) {
        resetWorkoutLibraryFilterDraft();
        renderWorkoutLibraryFilterSheet();
        return;
      }

      var resetSingleBtn = event.target.closest('[data-filter-reset-single]');
      if (resetSingleBtn) {
        workoutLibraryFilters[resetSingleBtn.getAttribute('data-filter-reset-single')] = 'all';
        renderWorkoutLibrary();
        renderWorkoutLibraryFilterSheet();
        return;
      }

      var applyBtn = event.target.closest('[data-filter-apply]');
      if (applyBtn && !applyBtn.disabled) {
        var draft = ensureWorkoutLibraryFilterDraft();
        workoutLibraryGroupedFilterKeys.forEach(function(filterType) {
          workoutLibraryFilters[filterType] = draft[filterType];
        });
        window.closeWorkoutLibrarySheet();
        renderWorkoutLibrary();
        return;
      }

      var closeBtn = event.target.closest('[data-filter-close]');
      if (closeBtn) {
        window.closeWorkoutLibrarySheet();
        return;
      }

      var draftOption = event.target.closest('[data-filter-draft][data-filter-value]');
      if (draftOption) {
        var draftFilterType = draftOption.getAttribute('data-filter-draft');
        ensureWorkoutLibraryFilterDraft()[draftFilterType] = draftOption.getAttribute('data-filter-value');
        if (workoutLibraryActiveSheet === 'muscle') {
          workoutLibraryActiveSheet = 'filters';
          workoutLibrarySheetParent = null;
        }
        renderWorkoutLibraryFilterSheet();
        return;
      }

      var option = event.target.closest('[data-filter-value]');
      if (!option || !workoutLibraryActiveSheet || workoutLibraryActiveSheet === 'filters' || workoutLibraryActiveSheet === 'muscle') return;
      workoutLibraryFilters[workoutLibraryActiveSheet] = option.getAttribute('data-filter-value');
      window.closeWorkoutLibrarySheet();
      renderWorkoutLibrary();
    });
  }

  var appliedFilters = document.getElementById('wkLibraryAppliedFilters');
  if (appliedFilters && !appliedFilters.dataset.ready) {
    appliedFilters.dataset.ready = 'true';
    appliedFilters.addEventListener('click', function(event) {
      var removeBtn = event.target.closest('[data-filter-pill-remove]');
      if (!removeBtn) return;
      workoutLibraryFilters[removeBtn.getAttribute('data-filter-pill-remove')] = 'all';
      renderWorkoutLibrary();
    });
  }

  updateWorkoutLibraryFilterUI();
}

window.renderWorkoutLibrary = renderWorkoutLibrary;
window.initWorkoutLibrary = initWorkoutLibrary;
window.workoutLibraryFilters = workoutLibraryFilters;

window.toggleWorkoutFav = function toggleWorkoutFav(id) {
  // Check in both libraries
  var found = workoutLibrary.find(function(w) { return w.id === id; });
  if (!found) {
    found = (state.customWorkouts || []).find(function(w) { return w.id === id; });
  }
  if (found) {
    found.favorite = !found.favorite;
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    renderWorkoutLibrary();
  }
};

// ======================================================================
// EXERCISE LIBRARY SCREEN
// ======================================================================
function renderExerciseLibrary(filter, search) {
  var list = document.getElementById('wkExLibList');
  if (!list) return;
  var results = exerciseLibrary.slice();

  if (filter && filter !== 'all') {
    results = results.filter(function(e) {
      return e.muscle === filter || e.muscles.map(function(m) { return m.toLowerCase(); }).indexOf(filter) >= 0;
    });
  }
  if (search) {
    var q = search.toLowerCase();
    results = results.filter(function(e) {
      return [
        e.name,
        e.muscle,
        e.muscles.join(' '),
        e.equipment,
        e.difficulty
      ].join(' ').toLowerCase().indexOf(q) >= 0;
    });
  }

  if (!results.length) {
    list.innerHTML = '<div class="wk-empty-state"><iconify-icon icon="solar:stretching-bold-duotone" width="48"></iconify-icon><p>No exercises found</p></div>';
    return;
  }

  list.innerHTML = results.map(function(e) {
    return '<div class="wk-card" onclick="openExerciseDetail(\'' + e.id + '\')" style="cursor:pointer">' +
      '<div class="wk-card-body">' +
        '<h3 class="wk-card-title">' + e.name + '</h3>' +
        '<p class="wk-card-desc">' + e.muscles.join(', ') + ' &bull; ' + e.equipment + '</p>' +
        '<div class="wk-card-meta">' +
          '<span><iconify-icon icon="solar:chart-bold-duotone" width="14"></iconify-icon> ' + e.difficulty.charAt(0).toUpperCase() + e.difficulty.slice(1) + '</span>' +
          '<span><iconify-icon icon="solar:clock-circle-bold-duotone" width="14"></iconify-icon> ' + e.sets + '×' + e.reps + '</span>' +
        '</div>' +
      '</div>' +
      '<button class="wk-card-fav" onclick="event.stopPropagation();toggleExerciseFav(\'' + e.id + '\')" style="background:none;border:none;padding:8px;cursor:pointer">' +
        '<iconify-icon icon="' + ((state.exerciseFavorites || []).indexOf(e.id) >= 0 ? 'solar:heart-bold-duotone' : 'solar:heart-bold') + '" width="20" style="color:' + ((state.exerciseFavorites || []).indexOf(e.id) >= 0 ? 'var(--navy)' : 'var(--text-muted)') + '"></iconify-icon>' +
      '</button>' +
    '</div>';
  }).join('');
}

function renderExerciseLibrary(filter, search) {
  var list = document.getElementById('wkExLibList');
  if (!list) return;
  var results = exerciseLibrary.slice();

  if (filter && filter !== 'all') {
    results = results.filter(function(exercise) {
      return exercise.muscle === filter || exercise.muscles.map(function(muscle) {
        return muscle.toLowerCase();
      }).indexOf(filter) >= 0;
    });
  }

  if (search) {
    var query = search.toLowerCase();
    results = results.filter(function(exercise) {
      return [
        exercise.name,
        exercise.muscle,
        exercise.muscles.join(' '),
        exercise.equipment,
        exercise.difficulty
      ].join(' ').toLowerCase().indexOf(query) >= 0;
    });
  }

  if (!results.length) {
    list.innerHTML = '<div class="wk-empty-state"><iconify-icon icon="solar:stretching-bold-duotone" width="48"></iconify-icon><p>No exercises found</p></div>';
    return;
  }

  function getExerciseLibraryImage(exercise) {
    var muscle = String(exercise.muscle || '').toLowerCase();
    if (muscle === 'legs') return '../../assets/img/david.jpg';
    if (muscle === 'back') return '../../assets/img/marcus.jpg';
    if (muscle === 'core') return '../../assets/img/sara.jpg';
    return '../../assets/img/woman-upper-body.png';
  }

  function getExerciseDifficultyLabel(exercise) {
    var value = String(exercise.difficulty || 'intermediate');
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  list.innerHTML = results.map(function(exercise) {
    return '<article class="wk-ex-figma-card" onclick="openExerciseDetail(\'' + exercise.id + '\')">' +
      '<div class="wk-ex-figma-thumb">' +
        '<img src="' + getExerciseLibraryImage(exercise) + '" alt="' + escapeHtml(exercise.name) + '">' +
      '</div>' +
      '<div class="wk-ex-figma-content">' +
        '<h3>' + escapeHtml(exercise.name) + '</h3>' +
        '<p>' + escapeHtml(exercise.muscles.join(', ') + ' · ' + String(exercise.equipment || '').toLowerCase()) + '</p>' +
        '<span class="wk-ex-figma-badge ' + escapeHtml(String(exercise.difficulty || 'intermediate').toLowerCase()) + '">' + escapeHtml(getExerciseDifficultyLabel(exercise)) + '</span>' +
      '</div>' +
    '</article>';
  }).join('');
}

function initExerciseLibrary() {
  renderExerciseLibrary();

  var searchInput = document.getElementById('wkExLibSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var clearBtn = document.getElementById('wkExLibSearchClear');
      if (clearBtn) clearBtn.style.display = searchInput.value ? '' : 'none';
      var activeFilter = document.querySelector('#wkExLibFilters .wk-chip.active');
      renderExerciseLibrary(activeFilter ? activeFilter.dataset.filter : null, searchInput.value);
    });
  }

  var filterChips = document.querySelectorAll('#wkExLibFilters .wk-chip');
  filterChips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      filterChips.forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      renderExerciseLibrary(chip.dataset.filter, searchInput ? searchInput.value : '');
    });
  });
}

window.toggleExerciseFav = function toggleExerciseFav(id) {
  var idx = (state.exerciseFavorites || []).indexOf(id);
  if (idx >= 0) {
    state.exerciseFavorites.splice(idx, 1);
  } else {
    state.exerciseFavorites.push(id);
  }
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  var activeFilter = document.querySelector('#wkExLibFilters .wk-chip.active');
  var searchInput = document.getElementById('wkExLibSearch');
  renderExerciseLibrary(activeFilter ? activeFilter.dataset.filter : null, searchInput ? searchInput.value : '');
};

var exerciseLibraryFilters = state.exerciseLibraryFilters || {
  muscle: 'all',
  level: 'all',
  location: 'all',
  search: ''
};
state.exerciseLibraryFilters = exerciseLibraryFilters;
var exerciseLibraryActiveSheet = null;

var exerciseLibraryFilterDefinitions = {
  muscle: {
    label: 'Muscle Area',
    title: 'Select Muscle Area',
    options: [
      { value: 'all', label: 'All Muscle Areas' },
      { value: 'chest', label: 'Chest', image: '../../assets/img/anatomical-muscles/anatomical-chest.png' },
      { value: 'back', label: 'Back', image: '../../assets/img/anatomical-muscles/anatomical-upper-back.png' },
      { value: 'legs', label: 'Legs', image: '../../assets/img/icon-gym.png' },
      { value: 'shoulders', label: 'Shoulders', image: '../../assets/img/anatomical-muscles/anatomical-shoulders.png' },
      { value: 'arms', label: 'Arms', image: '../../assets/img/anatomical-muscles/anatomical-bicep.png' },
      { value: 'core', label: 'Core', image: '../../assets/img/icon-flame-burn.png' },
      { value: 'full-body', label: 'Full Body', image: '../../assets/img/woman-upper-body.png' }
    ]
  },
  level: {
    label: 'Level',
    title: 'Select Level',
    options: [
      { value: 'all', label: 'All Levels' },
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ]
  },
  location: {
    label: 'Location',
    title: 'Select Location',
    options: [
      { value: 'all', label: 'All Locations' },
      { value: 'home', label: 'Home' },
      { value: 'home-equipment', label: 'Home With Equipment' },
      { value: 'gym', label: 'Gym' }
    ]
  }
};

function getExerciseLibraryFilterLabel(filterType, value) {
  var config = exerciseLibraryFilterDefinitions[filterType];
  if (!config) return 'All';
  var option = config.options.find(function(item) { return item.value === value; });
  return option ? option.label : config.options[0].label;
}

function getExerciseLibraryLocation(exercise) {
  var equipment = String(exercise.equipment || '').toLowerCase();
  if (!equipment || equipment.indexOf('bodyweight') >= 0) return 'home';
  if (equipment.indexOf('dumbbell') >= 0) return 'home-equipment';
  if (equipment.indexOf('barbell') >= 0 || equipment.indexOf('machine') >= 0 || equipment.indexOf('cable') >= 0) return 'gym';
  return 'home-equipment';
}

function getExerciseLibraryImage(exercise) {
  var byMuscle = {
    chest: '../../assets/img/anatomical-muscles/anatomical-chest.png',
    back: '../../assets/img/anatomical-muscles/anatomical-upper-back.png',
    legs: '../../assets/img/icon-gym.png',
    shoulders: '../../assets/img/anatomical-muscles/anatomical-shoulders.png',
    arms: '../../assets/img/anatomical-muscles/anatomical-bicep.png',
    core: '../../assets/img/icon-flame-burn.png',
    'full-body': '../../assets/img/woman-upper-body.png'
  };
  return byMuscle[String(exercise.muscle || '').toLowerCase()] || '../../assets/img/woman-upper-body.png';
}

function getExerciseLibraryProfile(exercise) {
  var muscle = String(exercise.muscle || '').toLowerCase();
  var level = String(exercise.difficulty || 'intermediate').toLowerCase();
  var location = getExerciseLibraryLocation(exercise);
  return {
    muscle: muscle,
    muscleLabel: getExerciseLibraryFilterLabel('muscle', muscle),
    level: level,
    levelLabel: level.charAt(0).toUpperCase() + level.slice(1),
    location: location,
    locationLabel: getExerciseLibraryFilterLabel('location', location)
  };
}

function updateExerciseLibraryFilterUI() {
  Object.keys(exerciseLibraryFilterDefinitions).forEach(function(filterType) {
    var valueEl = document.getElementById('wkExFilterValue-' + filterType);
    var trigger = document.querySelector('[data-ex-filter-sheet="' + filterType + '"]');
    var isActive = exerciseLibraryFilters[filterType] && exerciseLibraryFilters[filterType] !== 'all';
    if (valueEl) valueEl.textContent = getExerciseLibraryFilterLabel(filterType, exerciseLibraryFilters[filterType]);
    if (trigger) {
      trigger.classList.toggle('is-active', !!isActive);
      trigger.setAttribute('aria-expanded', exerciseLibraryActiveSheet === filterType ? 'true' : 'false');
    }
  });

  var resetBtn = document.getElementById('wkExLibraryResetFilters');
  var hasFilters = Object.keys(exerciseLibraryFilterDefinitions).some(function(filterType) {
    return exerciseLibraryFilters[filterType] !== 'all';
  }) || !!exerciseLibraryFilters.search;
  if (resetBtn) resetBtn.hidden = !hasFilters;

  var clearBtn = document.getElementById('wkExLibSearchClear');
  if (clearBtn) clearBtn.style.display = exerciseLibraryFilters.search ? '' : 'none';
}

function renderExerciseLibrarySheet(filterType) {
  var config = exerciseLibraryFilterDefinitions[filterType];
  var title = document.getElementById('wkExFilterSheetTitle');
  var optionsRoot = document.getElementById('wkExFilterSheetOptions');
  if (!config || !title || !optionsRoot) return;

  title.textContent = config.title;
  optionsRoot.innerHTML = config.options.map(function(option) {
    var selected = exerciseLibraryFilters[filterType] === option.value;
    return '<button class="wk-filter-option' + (selected ? ' is-selected' : '') + '" type="button" data-ex-filter-option="' + escapeHtml(option.value) + '">' +
      (option.image ? '<span class="wk-filter-option-image"><img src="' + escapeHtml(option.image) + '" alt="' + escapeHtml(option.label) + '"></span>' : '') +
      '<span class="wk-filter-option-copy">' +
        '<strong>' + escapeHtml(option.label) + '</strong>' +
        '<small>' + escapeHtml(config.label) + '</small>' +
      '</span>' +
      (selected ? '<span class="wk-filter-option-check"><iconify-icon icon="solar:check-circle-bold" width="18"></iconify-icon></span>' : '') +
    '</button>';
  }).join('');
}

window.openExerciseLibrarySheet = function openExerciseLibrarySheet(filterType) {
  var sheet = document.getElementById('wkExFilterSheet');
  var backdrop = document.getElementById('wkExFilterSheetBackdrop');
  if (!sheet || !backdrop || !exerciseLibraryFilterDefinitions[filterType]) return;
  exerciseLibraryActiveSheet = filterType;
  renderExerciseLibrarySheet(filterType);
  updateExerciseLibraryFilterUI();
  backdrop.hidden = false;
  sheet.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(function() {
    backdrop.classList.add('is-visible');
    sheet.classList.add('is-open');
  });
};

window.closeExerciseLibrarySheet = function closeExerciseLibrarySheet() {
  var sheet = document.getElementById('wkExFilterSheet');
  var backdrop = document.getElementById('wkExFilterSheetBackdrop');
  exerciseLibraryActiveSheet = null;
  updateExerciseLibraryFilterUI();
  if (!sheet || !backdrop) return;
  sheet.classList.remove('is-open');
  backdrop.classList.remove('is-visible');
  sheet.setAttribute('aria-hidden', 'true');
  setTimeout(function() {
    backdrop.hidden = true;
  }, 180);
};

window.applyExerciseLibraryFilter = function applyExerciseLibraryFilter(filterType, value) {
  if (!exerciseLibraryFilterDefinitions[filterType]) return;
  exerciseLibraryFilters[filterType] = value;
  state.exerciseLibraryFilters = exerciseLibraryFilters;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  closeExerciseLibrarySheet();
  renderExerciseLibrary();
};

window.resetExerciseLibraryFilters = function resetExerciseLibraryFilters() {
  exerciseLibraryFilters.muscle = 'all';
  exerciseLibraryFilters.level = 'all';
  exerciseLibraryFilters.location = 'all';
  exerciseLibraryFilters.search = '';
  state.exerciseLibraryFilters = exerciseLibraryFilters;
  var searchInput = document.getElementById('wkExLibSearch');
  if (searchInput) searchInput.value = '';
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  closeExerciseLibrarySheet();
  renderExerciseLibrary();
};

renderExerciseLibrary = function renderExerciseLibrary() {
  var list = document.getElementById('wkExLibList');
  if (!list) return;
  var results = exerciseLibrary.slice().filter(function(exercise) {
    var profile = getExerciseLibraryProfile(exercise);
    if (exerciseLibraryFilters.muscle !== 'all' && profile.muscle !== exerciseLibraryFilters.muscle) return false;
    if (exerciseLibraryFilters.level !== 'all' && profile.level !== exerciseLibraryFilters.level) return false;
    if (exerciseLibraryFilters.location !== 'all' && profile.location !== exerciseLibraryFilters.location) return false;
    if (exerciseLibraryFilters.search) {
      var query = exerciseLibraryFilters.search.toLowerCase();
      var haystack = [
        exercise.name,
        exercise.muscle,
        exercise.muscles.join(' '),
        exercise.equipment,
        exercise.difficulty,
        profile.locationLabel
      ].join(' ').toLowerCase();
      if (haystack.indexOf(query) < 0) return false;
    }
    return true;
  });

  updateExerciseLibraryFilterUI();

  var countEl = document.getElementById('wkExLibraryResultsCount');
  if (countEl) countEl.textContent = results.length + ' exercise' + (results.length === 1 ? '' : 's');

  if (!results.length) {
    list.innerHTML = '<div class="wk-empty-state"><iconify-icon icon="solar:stretching-bold-duotone" width="48"></iconify-icon><p>No exercises found</p></div>';
    return;
  }

  list.innerHTML = results.map(function(exercise) {
    var profile = getExerciseLibraryProfile(exercise);
    return '<article class="wk-ex-figma-card" onclick="openExerciseDetail(\'' + exercise.id + '\')">' +
      '<div class="wk-ex-figma-thumb">' +
        '<img src="' + getExerciseLibraryImage(exercise) + '" alt="' + escapeHtml(exercise.name) + '">' +
      '</div>' +
      '<div class="wk-ex-figma-content">' +
        '<div class="wk-ex-figma-topline">' +
          '<div>' +
            '<h3>' + escapeHtml(exercise.name) + '</h3>' +
            '<p>' + escapeHtml(profile.muscleLabel + ' · ' + String(exercise.equipment || '').toLowerCase()) + '</p>' +
          '</div>' +
          '<button class="wk-ex-figma-fav" type="button" onclick="event.stopPropagation();toggleExerciseFav(\'' + exercise.id + '\')" aria-label="Toggle favorite">' +
            '<iconify-icon icon="' + ((state.exerciseFavorites || []).indexOf(exercise.id) >= 0 ? 'solar:heart-bold-duotone' : 'solar:heart-bold') + '" width="18" style="color:' + ((state.exerciseFavorites || []).indexOf(exercise.id) >= 0 ? 'var(--navy)' : '#94a3b8') + '"></iconify-icon>' +
          '</button>' +
        '</div>' +
        '<div class="wk-ex-figma-meta-row">' +
          '<span class="wk-ex-figma-badge ' + escapeHtml(profile.level) + '">' + escapeHtml(profile.levelLabel) + '</span>' +
          '<span class="wk-ex-figma-info">' + escapeHtml(profile.locationLabel) + '</span>' +
          '<span class="wk-ex-figma-info">' + escapeHtml(exercise.sets + ' × ' + exercise.reps) + '</span>' +
        '</div>' +
      '</div>' +
    '</article>';
  }).join('');
};

initExerciseLibrary = function initExerciseLibrary() {
  var searchInput = document.getElementById('wkExLibSearch');
  if (searchInput) {
    searchInput.value = exerciseLibraryFilters.search || '';
    searchInput.addEventListener('input', function() {
      exerciseLibraryFilters.search = searchInput.value.trim();
      state.exerciseLibraryFilters = exerciseLibraryFilters;
      try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
      renderExerciseLibrary();
    });
  }

  var triggers = document.querySelectorAll('[data-ex-filter-sheet]');
  triggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      window.openExerciseLibrarySheet(trigger.getAttribute('data-ex-filter-sheet'));
    });
  });

  var backdrop = document.getElementById('wkExFilterSheetBackdrop');
  if (backdrop) backdrop.addEventListener('click', window.closeExerciseLibrarySheet);

  var sheetOptions = document.getElementById('wkExFilterSheetOptions');
  if (sheetOptions) {
    sheetOptions.addEventListener('click', function(event) {
      var option = event.target.closest('[data-ex-filter-option]');
      if (!option || !exerciseLibraryActiveSheet) return;
      window.applyExerciseLibraryFilter(exerciseLibraryActiveSheet, option.getAttribute('data-ex-filter-option'));
    });
  }

  renderExerciseLibrary();
};

window.toggleExerciseFav = function toggleExerciseFav(id) {
  var idx = (state.exerciseFavorites || []).indexOf(id);
  if (idx >= 0) state.exerciseFavorites.splice(idx, 1);
  else state.exerciseFavorites.push(id);
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  renderExerciseLibrary();
};

window.clearExerciseSearch = function clearExerciseSearch() {
  var input = document.getElementById('wkExLibSearch');
  if (input) {
    input.value = '';
    input.focus();
  }
  exerciseLibraryFilters.search = '';
  state.exerciseLibraryFilters = exerciseLibraryFilters;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  renderExerciseLibrary();
};

// ======================================================================
// WORKOUT DETAIL SCREEN
// ======================================================================
function findWorkout() {
  // Try to find currently selected workout from state
  var w = state.currentWorkout;
  if (w) return w;
  // Default to first workout
  return workoutLibrary[0];
}

function getWorkoutExerciseList(workout) {
  var exercises = ((workout && workout.exercises) || []).map(function(item) {
    return typeof item === 'string' ? getEx(item) : item;
  }).filter(Boolean);
  if (exercises.length) return exercises;
  return ['e1', 'e8', 'e12', 'e3', 'e7'].map(function(id) { return getEx(id); }).filter(Boolean);
}

function createWorkoutExecution(startIndex) {
  var workout = findWorkout();
  var exercises = getWorkoutExerciseList(workout);
  var safeIndex = Math.max(0, Math.min(startIndex || 0, exercises.length - 1));
  state.currentWorkout = workout;
  state.currentExecution = {
    workoutId: workout ? workout.id : 'workout',
    workoutName: workout ? workout.name : 'Workout',
    exercises: exercises,
    currentExIndex: safeIndex,
    currentSet: 1,
    startTime: Date.now(),
    exerciseStartTime: Date.now(),
    exerciseDuration: 20,
    preparationDuration: 20,
    isPaused: false,
    pausedAt: null,
    warmupDuration: 30,
    warmupExercises: [
      { id: 'warmup-knee-hug', name: 'Knee Hug', sets: 1, reps: '30 sec', equipment: 'Bodyweight' },
      { id: 'warmup-squat', name: 'Squat', sets: 1, reps: '30 sec', equipment: 'Bodyweight' },
      { id: 'warmup-butt-kick', name: 'Butt Kick', sets: 1, reps: '30 sec', equipment: 'Bodyweight' }
    ],
    warmupIndex: 0,
    warmupPhase: false,
    warmupComplete: false,
    includeWarmupProgress: safeIndex === 0,
    setLogs: [],
    warmedUp: safeIndex > 0
  };
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  return state.currentExecution;
}

window.startWorkoutExerciseFromDetail = function startWorkoutExerciseFromDetail(id, index) {
  var workout = findWorkout();
  var exercises = getWorkoutExerciseList(workout);
  var foundIndex = exercises.findIndex(function(ex) { return ex && ex.id === id; });
  var startIndex = foundIndex >= 0 ? foundIndex : (index || 0);
  var exec = createWorkoutExecution(startIndex);
  if (exec.currentExIndex === 0) {
    exec.warmedUp = false;
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    navigateTo('workout-countdown');
  } else {
    exec.warmedUp = true;
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    navigateTo('workout-exercise');
  }
};

window.openWorkoutDetail = function openWorkoutDetail(id) {
  var found = workoutLibrary.find(function(w) { return w.id === id; });
  if (!found) {
    found = (state.customWorkouts || []).find(function(w) { return w.id === id; });
  }
  if (found) {
    state.currentWorkout = found;
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    navigateTo('workout-detail');
  }
};

function initWorkoutDetail() {
  var body = document.getElementById('wkDetailBody');
  if (!body) return;
  var w = findWorkout();
  if (!w) { body.innerHTML = '<div class="wk-empty-state"><p>No workout selected.</p></div>'; return; }

  state.currentWorkout = w;
  var exList = (w.exercises || []).map(function(eid) { return getEx(eid); }).filter(Boolean);
  if (!exList.length && w.exercises && w.exercises.length) {
    exList = w.exercises.map(function(ex, i) {
      return {
        id: 'generated-' + i,
        name: ex.name || 'Exercise',
        sets: ex.sets || 3,
        reps: ex.reps || '10',
        equipment: ex.equipment || 'Bodyweight'
      };
    });
  }

  var difficultyLabel = String(w.difficulty || 'intermediate');
  difficultyLabel = difficultyLabel.charAt(0).toUpperCase() + difficultyLabel.slice(1);
  var heroImg = getWorkoutLibraryImage(w);

  body.innerHTML =
    '<section class="wk-detail-hero-card">' +
      '<div class="wk-detail-hero-bg"></div>' +
      '<div class="wk-detail-hero-date"><img src="../../assets/svg_icons/calendar.svg" width="16" height="16" alt=""> Today, May 23</div>' +
      '<h2>' + escapeHtml(w.name) + '</h2>' +
      '<div class="wk-detail-hero-meta">' +
        '<span><img src="../../assets/svg_icons/clock-five.svg" width="16" height="16" alt=""> ' + escapeHtml(w.duration) + ' min</span>' +
        '<span><img src="../../assets/svg_icons/chart-simple.svg" width="16" height="16" alt=""> ' + escapeHtml(difficultyLabel) + '</span>' +
      '</div>' +
      '<div class="wk-detail-hero-image"><img src="' + heroImg + '" alt=""></div>' +
    '</section>' +
    '<h3 class="wk-detail-exercises-title">Exercises</h3>' +
    '<section class="wk-detail-exercises-card">' +
      exList.map(function(ex, i) {
        return '<button class="wk-detail-ex-row" onclick="startWorkoutExerciseFromDetail(\'' + ex.id + '\',' + i + ')">' +
          '<span class="wk-detail-ex-num">' + (i + 1) + '</span>' +
          '<span class="wk-detail-ex-info">' +
            '<span class="wk-detail-ex-name">' + escapeHtml(ex.name) + '</span>' +
            '<span class="wk-detail-ex-params">' + escapeHtml(ex.sets) + ' sets &middot; ' + escapeHtml(ex.reps) + ' reps</span>' +
          '</span>' +
          '<span class="wk-detail-ex-arrow"><img src="../../assets/svg_icons/foward.svg" width="14" height="14" alt=""></span>' +
        '</button>';
      }).join('') +
    '</section>';

  // Edit visibility (always show since paywall inactive)
  var editBtn = document.getElementById('wkDetailEdit');
  if (editBtn) editBtn.style.display = '';
}

window.initWorkoutDetail = initWorkoutDetail;

// Override toggleFavorite for detail screen
var _origToggleFav = window.toggleFavorite;
window.toggleFavorite = function() {
  var w = state.currentWorkout;
  if (w && !document.getElementById('wkExDetailFav')) {
    w.favorite = !w.favorite;
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  }
  _origToggleFav();
};

// ======================================================================
// EXERCISE DETAIL SCREEN
// ======================================================================
window.openExerciseDetail = function openExerciseDetail(id) {
  var ex = getEx(id);
  if (ex) {
    state.currentExercise = ex;
    state.exerciseDetailTab = 'overview';
    state.exerciseNoteSheet = { mode: 'compose', noteId: null };
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    navigateTo('exercise-detail');
  }
};

function initExerciseDetail() {
  var body = document.getElementById('wkExDetailBody');
  if (!body) return;
  var ex = state.currentExercise;
  if (!ex) { body.innerHTML = '<div class="wk-empty-state"><p>No exercise selected.</p></div>'; return; }

  state.exerciseDetailTab = state.exerciseDetailTab || 'overview';
  state.exerciseNotes = state.exerciseNotes || {};
  state.exerciseHistory = state.exerciseHistory || {};

  function getExerciseDetailImage(exercise) {
    var muscle = String(exercise.muscle || '').toLowerCase();
    if (muscle === 'legs') return '../../assets/img/david.jpg';
    if (muscle === 'back') return '../../assets/img/marcus.jpg';
    if (muscle === 'core') return '../../assets/img/sara.jpg';
    return '../../assets/img/woman-upper-body.png';
  }

  function getExerciseAnatomyImage(label) {
    var normalized = String(label || '').toLowerCase();
    if (normalized.indexOf('chest') >= 0) return '../../assets/img/anatomical-muscles/anatomical-chest.png';
    if (normalized.indexOf('shoulder') >= 0) return '../../assets/img/anatomical-muscles/anatomical-shoulders.png';
    if (normalized.indexOf('upper back') >= 0 || normalized === 'back') return '../../assets/img/anatomical-muscles/anatomical-upper-back.png';
    if (normalized.indexOf('lower back') >= 0) return '../../assets/img/anatomical-muscles/anatomical-lower-back.png';
    if (normalized.indexOf('rear delt') >= 0) return '../../assets/img/anatomical-muscles/anatomical-rear-delts.png';
    if (normalized.indexOf('lat') >= 0) return '../../assets/img/anatomical-muscles/anatomical-lats.png';
    if (normalized.indexOf('bicep') >= 0) return '../../assets/img/anatomical-muscles/anatomical-bicep.png';
    if (normalized.indexOf('tricep') >= 0) return '../../assets/img/anatomical-muscles/anatomical-tricep.png';
    if (normalized.indexOf('forearm') >= 0) return '../../assets/img/anatomical-muscles/anatomical-forearm.png';
    return '../../assets/img/anatomical-muscles/anatomical-shoulders.png';
  }

  function getExerciseFormTip(exercise) {
    var formTips = {
      chest: 'Lie flat on bench, feet planted. Lower bar to mid-chest, press up explosively. Keep shoulder blades retracted.',
      back: 'Brace your core and keep your chest proud. Pull with your elbows, then lower under control without rounding your back.',
      legs: 'Keep your weight through mid-foot and heel. Maintain a tall chest and steady knee tracking through the full rep.',
      shoulders: 'Keep your ribs down and core tight. Press in a straight line overhead and avoid shrugging through the movement.',
      core: 'Keep your spine neutral and move with control. Focus on tension through your midline rather than rushing the reps.',
      arms: 'Lock your elbows in place and control the lowering phase. Avoid swinging so the working muscle stays under tension.'
    };
    return formTips[exercise.muscle] || formTips.arms;
  }

  function formatExerciseHistoryDate(dateString) {
    var dateValue = new Date(dateString);
    if (isNaN(dateValue.getTime())) return 'Recent';
    return dateValue.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  function formatExerciseHistoryLongDate(dateString) {
    var dateValue = new Date(dateString);
    if (isNaN(dateValue.getTime())) return 'Recent';
    return dateValue.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function ensureExerciseHistory(exercise) {
    var existing = state.exerciseHistory[exercise.id];
    if (existing && existing.length && existing[0].sets) return existing;

    var isBodyweight = String(exercise.equipment || '').toLowerCase() === 'bodyweight';
    var templates = isBodyweight
      ? [
          { daysAgo: 2, workoutName: 'Upper Body Strength', sets: [{ reps: 10 }, { reps: 8 }, { reps: 6 }] },
          { daysAgo: 9, workoutName: 'Push Day', sets: [{ reps: 8 }, { reps: 7 }, { reps: 6 }] },
          { daysAgo: 16, workoutName: 'Chest Builder', sets: [{ reps: 6 }, { reps: 5 }, { reps: 5 }] }
        ]
      : [
          { daysAgo: 2, workoutName: 'Upper Body Strength', sets: [{ weight: 40, reps: 10 }, { weight: 50, reps: 8 }, { weight: 55, reps: 6 }] },
          { daysAgo: 9, workoutName: 'Push Day', sets: [{ weight: 40, reps: 10 }, { weight: 45, reps: 10 }, { weight: 50, reps: 8 }] },
          { daysAgo: 16, workoutName: 'Chest Builder', sets: [{ weight: 35, reps: 12 }, { weight: 40, reps: 10 }, { weight: 45, reps: 8 }] }
        ];

    state.exerciseHistory[exercise.id] = templates.map(function(template, index) {
      var created = new Date();
      created.setDate(created.getDate() - template.daysAgo);
      return {
        id: exercise.id + '_history_' + index,
        createdAt: created.toISOString(),
        workoutName: template.workoutName,
        sets: template.sets
      };
    });
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    return state.exerciseHistory[exercise.id];
  }

  function getHistoryStats(entries) {
    if (!entries.length) return null;
    var sorted = entries.slice().sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
    var lastDone = sorted[0];
    var bestWeight = 0;
    var bestReps = 0;
    sorted.forEach(function(entry) {
      (entry.sets || []).forEach(function(set) {
        if (set.weight && set.weight > bestWeight) bestWeight = set.weight;
        if (set.reps && set.reps > bestReps) bestReps = set.reps;
      });
    });
    return {
      lastDone: lastDone,
      bestWeight: bestWeight,
      bestReps: bestReps,
      totalSessions: sorted.length
    };
  }

  function renderHistoryChart(entries) {
    if (!entries.length) return '';
    var sorted = entries.slice().sort(function(a, b) { return new Date(a.createdAt) - new Date(b.createdAt); });
    var isWeighted = sorted.some(function(entry) {
      return (entry.sets || []).some(function(set) { return typeof set.weight === 'number'; });
    });
    var points = sorted.map(function(entry, index) {
      var maxValue = 0;
      (entry.sets || []).forEach(function(set) {
        var value = isWeighted ? (set.weight || 0) : (set.reps || 0);
        if (value > maxValue) maxValue = value;
      });
      return {
        label: formatExerciseHistoryDate(entry.createdAt),
        value: maxValue || 0,
        index: index
      };
    });
    var max = Math.max.apply(null, points.map(function(point) { return point.value; }));
    var min = Math.min.apply(null, points.map(function(point) { return point.value; }));
    var paddedMin = Math.max(0, Math.floor((min - (isWeighted ? 10 : 2)) / (isWeighted ? 10 : 2)) * (isWeighted ? 10 : 2));
    var paddedMax = Math.ceil((max + (isWeighted ? 5 : 2)) / (isWeighted ? 10 : 2)) * (isWeighted ? 10 : 2);
    var range = Math.max(1, paddedMax - paddedMin);
    var graphWidth = 430;
    var graphHeight = 140;
    var baseX = 32;
    var stepX = points.length > 1 ? (graphWidth - 64) / (points.length - 1) : 0;
    var polyline = points.map(function(point, index) {
      var x = baseX + (stepX * index);
      var y = graphHeight - (((point.value - paddedMin) / range) * 88) - 18;
      point.x = x;
      point.y = y;
      return x + ',' + y;
    }).join(' ');
    var yTicks = [0, 1, 2].map(function(step) {
      var value = paddedMax - ((range / 2) * step);
      var y = 18 + (44 * step);
      return {
        value: Math.round(value),
        y: y
      };
    });
    return '' +
      '<section class="wk-ex-history-section">' +
        '<h3>Progress</h3>' +
        '<div class="wk-ex-history-chart-card">' +
          '<div class="wk-ex-history-chart-head">' +
            '<strong>' + (isWeighted ? 'Weight Progress' : 'Rep Progress') + '</strong>' +
            '<span>' + (isWeighted ? 'kg' : 'reps') + '</span>' +
          '</div>' +
          '<div class="wk-ex-history-chart">' +
            '<svg viewBox="0 0 430 140" preserveAspectRatio="none" aria-hidden="true">' +
              yTicks.map(function(tick) {
                return '<line x1="32" y1="' + tick.y + '" x2="398" y2="' + tick.y + '" class="wk-ex-chart-grid"></line>' +
                  '<text x="0" y="' + (tick.y + 4) + '" class="wk-ex-chart-axis">' + tick.value + '</text>';
              }).join('') +
              '<polyline points="' + polyline + '" class="wk-ex-chart-line"></polyline>' +
              points.map(function(point) {
                return '<circle cx="' + point.x + '" cy="' + point.y + '" r="4" class="wk-ex-chart-dot"></circle>';
              }).join('') +
            '</svg>' +
            '<div class="wk-ex-chart-labels">' + points.map(function(point) {
              return '<span>' + escapeHtml(point.label) + '</span>';
            }).join('') + '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  var diffLabel = String(ex.difficulty || 'intermediate');
  var equipmentLabel = String(ex.equipment || '').toLowerCase();
  var notes = state.exerciseNotes[ex.id] || [];
  var history = ensureExerciseHistory(ex);
  var historyStats = getHistoryStats(history);
  var isAdded = (state.buildExercises || []).some(function(item) { return item.id === ex.id; });
  var isFav = (state.exerciseFavorites || []).indexOf(ex.id) >= 0;

  function renderOverviewTab() {
    return '' +
      '<section class="wk-ex-detail-section">' +
        '<h3>Form Tips</h3>' +
        '<p>' + escapeHtml(getExerciseFormTip(ex)) + '</p>' +
      '</section>' +
      '<section class="wk-ex-detail-section">' +
        '<h3>Target Muscles</h3>' +
        '<div class="wk-ex-detail-target-list">' + ex.muscles.map(function(muscle) {
          return '<div class="wk-ex-detail-target-item">' +
            '<div class="wk-ex-detail-target-media"><img src="' + escapeHtml(getExerciseAnatomyImage(muscle)) + '" alt="' + escapeHtml(muscle) + '"></div>' +
            '<div class="wk-ex-detail-target-copy">' +
              '<strong>' + escapeHtml(muscle) + '</strong>' +
              '<span>Primary area engaged in this movement</span>' +
            '</div>' +
          '</div>';
        }).join('') + '</div>' +
      '</section>' +
      (isAdded ? '<section class="wk-ex-detail-added-card"><strong>Added to workout</strong><p>' + escapeHtml(ex.name) + ' is now in your current custom workout list.</p></section>' : '');
  }

  function renderHistoryTab() {
    if (!history.length) {
      return '<div class="wk-log-history-empty"><strong>No exercise history yet</strong><p>Your completed sets, technique logs, and progress notes for ' + escapeHtml(ex.name) + ' will appear here.</p></div>';
    }
    return '' +
      '<section class="wk-ex-history-section">' +
        '<h3>Performance Summary</h3>' +
        '<div class="wk-ex-history-summary-grid">' +
          '<article class="wk-ex-history-summary-card">' +
            '<div class="wk-ex-history-summary-icon"><iconify-icon icon="solar:calendar-bold-duotone" width="18"></iconify-icon></div>' +
            '<div><span>Last done</span><strong>' + escapeHtml(formatExerciseHistoryDate(historyStats.lastDone.createdAt)) + '</strong></div>' +
          '</article>' +
          '<article class="wk-ex-history-summary-card">' +
            '<div class="wk-ex-history-summary-icon"><iconify-icon icon="solar:cup-star-bold-duotone" width="18"></iconify-icon></div>' +
            '<div><span>Best weight</span><strong>' + escapeHtml(historyStats.bestWeight ? (historyStats.bestWeight + ' kg') : 'Bodyweight') + '</strong></div>' +
          '</article>' +
          '<article class="wk-ex-history-summary-card">' +
            '<div class="wk-ex-history-summary-icon"><iconify-icon icon="solar:repeat-bold-duotone" width="18"></iconify-icon></div>' +
            '<div><span>Best reps</span><strong>' + escapeHtml(String(historyStats.bestReps) + ' reps') + '</strong></div>' +
          '</article>' +
          '<article class="wk-ex-history-summary-card">' +
            '<div class="wk-ex-history-summary-icon"><iconify-icon icon="solar:chart-2-bold-duotone" width="18"></iconify-icon></div>' +
            '<div><span>Total sessions</span><strong>' + escapeHtml(String(historyStats.totalSessions)) + '</strong></div>' +
          '</article>' +
        '</div>' +
      '</section>' +
      renderHistoryChart(history) +
      '<section class="wk-ex-history-section">' +
        '<h3>Recent Sessions</h3>' +
        '<div class="wk-ex-session-list">' + history.slice().sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); }).map(function(entry) {
          return '<article class="wk-ex-session-card">' +
            '<div class="wk-ex-session-date">' +
              '<div class="wk-ex-history-summary-icon"><iconify-icon icon="solar:calendar-bold-duotone" width="18"></iconify-icon></div>' +
              '<div><strong>' + escapeHtml(formatExerciseHistoryLongDate(entry.createdAt)) + '</strong><span>' + escapeHtml(entry.workoutName) + '</span></div>' +
            '</div>' +
            '<div class="wk-ex-session-sets">' + (entry.sets || []).map(function(set, setIndex) {
              return '<div class="wk-ex-session-set"><span>Set ' + (setIndex + 1) + '</span><strong>' + escapeHtml((set.weight ? (set.weight + ' kg × ') : '') + set.reps) + '</strong></div>';
            }).join('') + '</div>' +
            '<div class="wk-ex-session-arrow"><img src="../../assets/svg_icons/foward.svg" width="14" height="14" alt=""></div>' +
          '</article>';
        }).join('') + '</div>' +
      '</section>';
  }

  function renderNotesTab() {
    return '' +
      '<section class="wk-ex-detail-notes-head">' +
        '<div>' +
          '<h3>Exercise Notes</h3>' +
          '<p>Keep cues, setup reminders, and progress observations for ' + escapeHtml(ex.name) + '.</p>' +
        '</div>' +
        '<button class="wk-ex-detail-note-trigger" type="button" onclick="openExerciseNoteSheet(\'compose\')">Add Note</button>' +
      '</section>' +
      (notes.length ? '<div class="wk-log-history-list">' + notes.map(function(note) {
        return '<button class="wk-log-history-item wk-ex-note-card" type="button" onclick="openExerciseNoteSheet(\'view\', \'' + escapeHtml(note.id) + '\')">' +
          '<div class="wk-log-history-top">' +
            '<div class="wk-log-history-title-wrap">' +
              '<h3 class="wk-log-history-title">' + escapeHtml(ex.name + ' note') + '</h3>' +
              '<p class="wk-log-history-subtitle">' + escapeHtml(formatExerciseHistoryDate(note.createdAt)) + ' · personal reminder</p>' +
            '</div>' +
            '<span class="wk-log-history-badge manual">Note</span>' +
          '</div>' +
          '<p class="wk-log-history-note">' + escapeHtml(note.text.length > 96 ? (note.text.slice(0, 96) + '...') : note.text) + '</p>' +
        '</button>';
      }).join('') + '</div>' : '<div class="wk-log-history-empty"><strong>No notes yet</strong><p>Add an exercise-specific note so you can remember cues, loads, or technique reminders next time.</p></div>');
  }

  var tabContent = state.exerciseDetailTab === 'history'
    ? renderHistoryTab()
    : state.exerciseDetailTab === 'notes'
      ? renderNotesTab()
      : renderOverviewTab();

  body.innerHTML =
    '<div class="wk-ex-detail-figma-content">' +
      '<div class="wk-ex-detail-main">' +
        '<div class="wk-ex-detail-hero-media">' +
          '<img src="' + getExerciseDetailImage(ex) + '" alt="' + escapeHtml(ex.name) + '">' +
        '</div>' +
        '<div class="wk-ex-detail-copy">' +
          '<h2 class="wk-ex-detail-title">' + escapeHtml(ex.name) + '</h2>' +
          '<div class="wk-ex-detail-meta-inline">' +
            '<span class="wk-ex-detail-difficulty ' + escapeHtml(diffLabel) + '">' + escapeHtml(diffLabel) + '</span>' +
            '<span class="wk-ex-detail-equipment"><iconify-icon icon="solar:dumbbell-bold-duotone" width="16"></iconify-icon>' + escapeHtml(equipmentLabel) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="tab-bar-wrap wk-ex-detail-tabs-wrap">' +
          '<div class="tab-bar wk-ex-detail-tabs">' +
            '<button class="tab-item' + (state.exerciseDetailTab === 'overview' ? ' active' : '') + '" type="button" onclick="setExerciseDetailTab(\'overview\')">Overview</button>' +
            '<button class="tab-item' + (state.exerciseDetailTab === 'history' ? ' active' : '') + '" type="button" onclick="setExerciseDetailTab(\'history\')">History</button>' +
            '<button class="tab-item' + (state.exerciseDetailTab === 'notes' ? ' active' : '') + '" type="button" onclick="setExerciseDetailTab(\'notes\')">Notes</button>' +
          '</div>' +
        '</div>' +
        '<div class="wk-ex-detail-tab-panel">' + tabContent + '</div>' +
      '</div>' +
      '<div class="wk-ex-detail-cta-wrap">' +
        '<button class="wk-ex-detail-cta-btn' + (isAdded ? ' is-added' : '') + '" type="button" onclick="addExerciseDetailToWorkout()">' + (isAdded ? 'Added to Workout' : 'Add to Workout') + '</button>' +
      '</div>' +
    '</div>';

  var favBtn = document.getElementById('wkExDetailFav');
  if (favBtn) {
    var icon = favBtn.querySelector('iconify-icon');
    if (icon) {
      icon.setAttribute('icon', isFav ? 'solar:heart-bold-duotone' : 'solar:heart-bold');
      icon.style.color = isFav ? 'var(--navy)' : '';
    }
  }

  renderExerciseNoteSheet();
}

window.setExerciseDetailTab = function setExerciseDetailTab(tab) {
  state.exerciseDetailTab = tab;
  initExerciseDetail();
};

window.addExerciseDetailToWorkout = function addExerciseDetailToWorkout() {
  var ex = state.currentExercise;
  if (!ex) return;
  state.buildExercises = state.buildExercises || [];
  if (!state.buildExercises.some(function(item) { return item.id === ex.id; })) {
    state.buildExercises.push(Object.assign({}, ex));
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  }
  initExerciseDetail();
};

function renderExerciseNoteSheet() {
  var sheetTitle = document.getElementById('wkExerciseNoteSheetTitle');
  var sheetBody = document.getElementById('wkExerciseNoteSheetBody');
  var sheetActions = document.getElementById('wkExerciseNoteSheetActions');
  var ex = state.currentExercise;
  if (!sheetTitle || !sheetBody || !sheetActions || !ex) return;

  state.exerciseNoteSheet = state.exerciseNoteSheet || { mode: 'compose', noteId: null };
  var notes = state.exerciseNotes[ex.id] || [];
  var selectedNote = notes.find(function(note) { return note.id === state.exerciseNoteSheet.noteId; }) || null;

  if (state.exerciseNoteSheet.mode === 'view' && selectedNote) {
    sheetTitle.textContent = 'View Note';
    sheetBody.innerHTML =
      '<div class="wk-ex-note-view">' +
        '<div class="wk-ex-note-view-meta">' + escapeHtml(formatExerciseHistoryLongDate(selectedNote.createdAt)) + ' · ' + escapeHtml(ex.name) + '</div>' +
        '<p>' + escapeHtml(selectedNote.text) + '</p>' +
      '</div>';
    sheetActions.innerHTML = '<button class="sheet-btn-primary" type="button" onclick="closeExerciseNoteSheet()">Done</button>';
    return;
  }

  sheetTitle.textContent = 'Add Note';
  sheetBody.innerHTML =
    '<div class="wk-ex-note-editor">' +
      '<p class="wk-ex-note-editor-copy">Add an exercise-specific reminder for ' + escapeHtml(ex.name) + '.</p>' +
      '<textarea class="form-input wk-log-textarea" id="wkExerciseNoteInput" rows="5" placeholder="Example: Keep elbows tucked and pause one second at the bottom for better control."></textarea>' +
    '</div>';
  sheetActions.innerHTML = '' +
    '<button class="sheet-btn-secondary" type="button" onclick="closeExerciseNoteSheet()">Cancel</button>' +
    '<button class="sheet-btn-primary" type="button" onclick="saveExerciseNote()">Save Note</button>';
}

window.openExerciseNoteSheet = function openExerciseNoteSheet(mode, noteId) {
  state.exerciseNoteSheet = { mode: mode || 'compose', noteId: noteId || null };
  renderExerciseNoteSheet();
  var sheet = document.getElementById('wkExerciseNoteSheet');
  if (!sheet) return;
  sheet.setAttribute('aria-hidden', 'false');
  openSheet('wkExerciseNoteSheet');
};

window.closeExerciseNoteSheet = function closeExerciseNoteSheet() {
  var sheet = document.getElementById('wkExerciseNoteSheet');
  if (sheet) sheet.setAttribute('aria-hidden', 'true');
  closeSheet('wkExerciseNoteSheet');
};

window.saveExerciseNote = function saveExerciseNote() {
  var ex = state.currentExercise;
  var input = document.getElementById('wkExerciseNoteInput');
  if (!ex || !input) return;
  var text = input.value.trim();
  if (!text) return;

  state.exerciseNotes = state.exerciseNotes || {};
  state.exerciseNotes[ex.id] = state.exerciseNotes[ex.id] || [];
  state.exerciseNotes[ex.id].unshift({
    id: ex.id + '_note_' + Date.now(),
    text: text,
    createdAt: new Date().toISOString()
  });
  state.exerciseDetailTab = 'notes';
  state.exerciseNoteSheet = { mode: 'compose', noteId: null };
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  closeExerciseNoteSheet();
  initExerciseDetail();
};

// ======================================================================
// BUILD CUSTOM WORKOUT SCREEN
// ======================================================================
function initWorkoutBuild() {
  state.buildExercises = state.buildExercises || [];
  renderBuildAdded();
  renderBuildExercises();
  updateBuildSaveBtn();

  var searchInput = document.getElementById('wkBuildSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      renderBuildExercises(this.value);
    });
  }
}

function renderBuildAdded() {
  var list = document.getElementById('wkBuildAddedList');
  var count = document.getElementById('wkBuildCount');
  if (!list || !count) return;

  var buildEx = state.buildExercises || [];
  count.textContent = buildEx.length;

  if (!buildEx.length) {
    list.innerHTML = '<div class="wk-empty-state" style="padding:12px"><p style="font-size:13px">Add exercises from the list below</p></div>';
    return;
  }

  list.innerHTML = buildEx.map(function(ex, i) {
    return '<div class="wk-build-added-item">' +
      '<div class="wk-build-added-info"><span class="wk-build-added-name">' + ex.name + '</span><span class="wk-build-added-meta">' + ex.sets + ' sets × ' + ex.reps + '</span></div>' +
      '<button class="wk-build-added-remove" onclick="removeFromBuild(' + i + ')" style="background:none;border:none;padding:8px;cursor:pointer"><iconify-icon icon="solar:trash-bin-trash-bold-duotone" width="18" style="color:var(--red)"></iconify-icon></button>' +
    '</div>';
  }).join('');
}

function renderBuildExercises(search) {
  var list = document.getElementById('wkBuildExList');
  if (!list) return;
  var results = exerciseLibrary.slice();
  if (search) {
    var q = search.toLowerCase();
    results = results.filter(function(e) { return e.name.toLowerCase().indexOf(q) >= 0; });
  }

  var buildIds = (state.buildExercises || []).map(function(ex) { return ex.id; });

  if (!results.length) {
    list.innerHTML = '<div class="wk-empty-state"><p>No exercises found</p></div>';
    return;
  }

  list.innerHTML = results.map(function(e) {
    var added = buildIds.indexOf(e.id) >= 0;
    return '<div class="wk-card' + (added ? ' wk-card-added' : '') + '" onclick="' + (added ? 'removeFromBuildById(\'' + e.id + '\')' : 'addToBuild(\'' + e.id + '\')') + '" style="cursor:pointer">' +
      '<div class="wk-card-body">' +
        '<h3 class="wk-card-title">' + e.name + '</h3>' +
        '<p class="wk-card-desc">' + e.muscles.join(', ') + ' &bull; ' + e.equipment + '</p>' +
        '<div class="wk-card-meta"><span>' + e.sets + ' sets × ' + e.reps + '</span><span>' + e.difficulty.charAt(0).toUpperCase() + e.difficulty.slice(1) + '</span></div>' +
      '</div>' +
      '<span style="color:' + (added ? 'var(--green)' : 'var(--navy)') + ';font-size:20px;font-weight:700">' + (added ? '&#x2713;' : '+') + '</span>' +
    '</div>';
  }).join('');
}

window.addToBuild = function addToBuild(id) {
  var ex = getEx(id);
  if (!ex) return;
  state.buildExercises = state.buildExercises || [];
  if (state.buildExercises.some(function(e) { return e.id === id; })) return;
  state.buildExercises.push(Object.assign({}, ex));
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  renderBuildAdded();
  renderBuildExercises(document.getElementById('wkBuildSearch') ? document.getElementById('wkBuildSearch').value : '');
  updateBuildSaveBtn();
};

window.removeFromBuild = function removeFromBuild(index) {
  state.buildExercises.splice(index, 1);
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  renderBuildAdded();
  renderBuildExercises(document.getElementById('wkBuildSearch') ? document.getElementById('wkBuildSearch').value : '');
  updateBuildSaveBtn();
};

window.removeFromBuildById = function removeFromBuildById(id) {
  var idx = (state.buildExercises || []).findIndex(function(e) { return e.id === id; });
  if (idx >= 0) {
    state.buildExercises.splice(idx, 1);
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    renderBuildAdded();
    renderBuildExercises(document.getElementById('wkBuildSearch') ? document.getElementById('wkBuildSearch').value : '');
    updateBuildSaveBtn();
  }
};

function updateBuildSaveBtn() {
  var btn = document.getElementById('wkBuildSave');
  if (btn) btn.disabled = (state.buildExercises || []).length === 0;
}

window.saveCustomWorkout = function saveCustomWorkout() {
  if (!state.buildExercises || state.buildExercises.length === 0) return;
  var w = {
    id: 'custom_' + Date.now(),
    name: 'Custom Workout ' + ((state.customWorkouts || []).length + 1),
    muscle: 'full-body',
    muscles: [],
    duration: state.buildExercises.reduce(function(s, e) { return s + (e.duration || 3); }, 0),
    difficulty: 'intermediate',
    equipment: [],
    calories: state.buildExercises.length * 50,
    desc: 'Custom workout with ' + state.buildExercises.length + ' exercises.',
    exercises: state.buildExercises.map(function(e) { return e.id; }),
    favorite: false
  };
  state.customWorkouts = state.customWorkouts || [];
  state.customWorkouts.push(w);
  state.buildExercises = [];
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  navigateTo('workout');
};

window.discardBuild = function discardBuild() {
  state.buildExercises = [];
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  navigateTo('workout');
};

// ======================================================================
// EDIT WORKOUT SCREEN
// ======================================================================
function initWorkoutEdit() {
  var w = state.currentWorkout;
  if (!w) { goBack(); return; }

  // Copy exercises for editing
  state.editExercises = (w.exercises || []).map(function(eid) { return Object.assign({}, getEx(eid)); }).filter(Boolean);

  renderEditAdded();
  renderEditExercises();

  var searchInput = document.getElementById('wkEditSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      renderEditExercises(this.value);
    });
  }
}

function renderEditAdded() {
  var list = document.getElementById('wkEditAddedList');
  var count = document.getElementById('wkEditCount');
  if (!list || !count) return;
  count.textContent = (state.editExercises || []).length;

  if (!state.editExercises || !state.editExercises.length) {
    list.innerHTML = '<div class="wk-empty-state" style="padding:12px"><p style="font-size:13px">No exercises in this workout</p></div>';
    return;
  }

  list.innerHTML = state.editExercises.map(function(ex, i) {
    return '<div class="wk-build-added-item">' +
      '<div class="wk-build-added-info"><span class="wk-build-added-name">' + ex.name + '</span><span class="wk-build-added-meta">' + ex.sets + ' sets × ' + ex.reps + '</span></div>' +
      '<button onclick="removeEditEx(' + i + ')" style="background:none;border:none;padding:8px;cursor:pointer"><iconify-icon icon="solar:trash-bin-trash-bold-duotone" width="18" style="color:var(--red)"></iconify-icon></button>' +
    '</div>';
  }).join('');
}

function renderEditExercises(search) {
  var list = document.getElementById('wkEditExList');
  if (!list) return;
  var results = exerciseLibrary.slice();
  if (search) {
    var q = search.toLowerCase();
    results = results.filter(function(e) { return e.name.toLowerCase().indexOf(q) >= 0; });
  }
  var editIds = (state.editExercises || []).map(function(e) { return e.id; });

  if (!results.length) {
    list.innerHTML = '<div class="wk-empty-state"><p>No exercises found</p></div>';
    return;
  }

  list.innerHTML = results.map(function(e) {
    var added = editIds.indexOf(e.id) >= 0;
    return '<div class="wk-card' + (added ? ' wk-card-added' : '') + '" onclick="' + (added ? 'removeEditExById(\'' + e.id + '\')' : 'addToEdit(\'' + e.id + '\')') + '" style="cursor:pointer">' +
      '<div class="wk-card-body">' +
        '<h3 class="wk-card-title">' + e.name + '</h3>' +
        '<p class="wk-card-desc">' + e.muscles.join(', ') + '</p>' +
        '<div class="wk-card-meta"><span>' + e.sets + '×' + e.reps + '</span></div>' +
      '</div>' +
      '<span style="color:' + (added ? 'var(--green)' : 'var(--navy)') + ';font-size:20px;font-weight:700">' + (added ? '&#x2713;' : '+') + '</span>' +
    '</div>';
  }).join('');
}

window.addToEdit = function addToEdit(id) {
  var ex = getEx(id);
  if (!ex) return;
  if ((state.editExercises || []).some(function(e) { return e.id === id; })) return;
  state.editExercises.push(Object.assign({}, ex));
  renderEditAdded();
  renderEditExercises(document.getElementById('wkEditSearch') ? document.getElementById('wkEditSearch').value : '');
};

window.removeEditEx = function removeEditEx(index) {
  state.editExercises.splice(index, 1);
  renderEditAdded();
  renderEditExercises(document.getElementById('wkEditSearch') ? document.getElementById('wkEditSearch').value : '');
};

window.removeEditExById = function removeEditExById(id) {
  var idx = (state.editExercises || []).findIndex(function(e) { return e.id === id; });
  if (idx >= 0) {
    state.editExercises.splice(idx, 1);
    renderEditAdded();
    renderEditExercises(document.getElementById('wkEditSearch') ? document.getElementById('wkEditSearch').value : '');
  }
};

window.saveEditChanges = function saveEditChanges() {
  var w = state.currentWorkout;
  if (!w || !state.editExercises) return;
  w.exercises = state.editExercises.map(function(e) { return e.id; });
  w.duration = state.editExercises.reduce(function(s, e) { return s + (e.duration || 3); }, 0);
  state.editExercises = [];
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  goBack();
};

// ======================================================================
// WORKOUT EXECUTION FLOW
// ======================================================================
function initWorkoutExec() {
  var exec = normalizeWarmupTiming(state.currentExecution || createWorkoutExecution(0));
  if (!exec.warmupComplete) {
    exec.exerciseStartTime = Date.now();
  }
  exec.exerciseDuration = exec.exerciseDuration || 20;
  exec.setLogs = exec.setLogs || [];
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}

  renderExecExercise();
}

function renderExecExercise() {
  var exec = state.currentExecution;
  if (!exec || !exec.exercises || !exec.exercises.length) return;

  var ex = getCurrentLiveExercise(exec);
  if (exec.warmupComplete) {
    renderWarmupSuccess();
    return;
  }

  var progress = document.getElementById('wkExecProgress');
  var segments = document.getElementById('wkExecProgressSegments');
  var body = document.getElementById('wkExecBody');
  var nameEl = document.getElementById('wkExecExerciseName');
  var setLabel = document.getElementById('wkExecSetLabel');

  exec.isPaused = false;
  exec.pausedAt = null;
  var screen = document.querySelector('.screen-exec-counter');
  if (screen) screen.classList.remove('show-warmup-success');
  if (nameEl) nameEl.textContent = ex.name || 'Exercise';
  if (setLabel) setLabel.textContent = 'Set ' + (exec.currentSet || 1) + ' of ' + (ex.sets || 1);
  if (progress) progress.innerHTML = '0:00 &bull; ' + getExecBasePercent(exec) + '%';
  renderLiveSegments(segments, getExecBasePercent(exec), exec.warmupPhase ? 3 : 5);

  if (body) {
    body.innerHTML = '';
  }

  renderWorkoutPauseState();
  updateExecTimer();
  if (window._execInterval) clearInterval(window._execInterval);
  window._execInterval = setInterval(updateExecTimer, 1000);
  exec._timerInterval = window._execInterval;
}

function getCurrentLiveExercise(exec) {
  if (exec && exec.warmupPhase) {
    var warmups = exec.warmupExercises || [];
    return warmups[exec.warmupIndex || 0] || warmups[0] || { name: 'Warmup', sets: 1, reps: '20 sec' };
  }
  return exec.exercises[exec.currentExIndex] || exec.exercises[0];
}

function getExecBasePercent(exec) {
  if (!exec || !exec.exercises || !exec.exercises.length) return 0;
  if (exec.warmupPhase) {
    var warmups = exec.warmupExercises || [];
    return warmups.length ? Math.round(((exec.warmupIndex || 0) / warmups.length) * 100) : 0;
  }
  var warmupCount = exec.includeWarmupProgress ? (exec.warmupExercises || []).length : 0;
  var total = warmupCount + exec.exercises.length;
  var index = exec.warmupPhase ? (exec.warmupIndex || 0) : warmupCount + (exec.currentExIndex || 0);
  return total ? Math.round((index / total) * 100) : 0;
}

function getExecOverallProgress(exec) {
  if (!exec || !exec.exercises || !exec.exercises.length) return { elapsed: 0, percent: 0, remaining: 0, exercisePercent: 0, segmentCount: 5 };
  var duration = exec.warmupPhase ? (exec.warmupDuration || 30) : (exec.exerciseDuration || 20);
  var elapsedExercise = Math.min(duration, Math.floor((Date.now() - (exec.exerciseStartTime || Date.now())) / 1000));
  var warmupCount = exec.includeWarmupProgress ? (exec.warmupExercises || []).length : 0;
  var segmentCount = exec.warmupPhase ? Math.max(1, (exec.warmupExercises || []).length) : 5;
  var totalSteps = exec.warmupPhase ? segmentCount : warmupCount + exec.exercises.length;
  var currentStep = exec.warmupPhase ? (exec.warmupIndex || 0) : warmupCount + (exec.currentExIndex || 0);
  var totalDuration = totalSteps * duration;
  var overallElapsed = (currentStep * duration) + elapsedExercise;
  var percent = totalDuration ? Math.min(100, Math.round((overallElapsed / totalDuration) * 100)) : 0;
  return {
    elapsed: overallElapsed,
    percent: percent,
    remaining: Math.max(0, duration - elapsedExercise),
    exercisePercent: Math.min(100, Math.round((elapsedExercise / duration) * 100)),
    segmentCount: segmentCount
  };
}

function syncExecProgressUI() {
  var exec = state.currentExecution;
  if (!exec) return;
  if (exec.isPaused) {
    renderWorkoutPauseState();
    return;
  }
  var live = getExecOverallProgress(exec);
  var progress = document.getElementById('wkExecProgress');
  var segments = document.getElementById('wkExecProgressSegments');
  var gaugeTime = document.getElementById('wkExecGaugeTime');
  var gaugeBars = document.getElementById('wkExecGaugeBars');
  var timerEl = document.getElementById('wkExecTimer');
  var progressFill = document.getElementById('wkExecProgressFill');

  if (progress) progress.innerHTML = formatWorkoutTime(live.elapsed) + ' &bull; ' + live.percent + '%';
  if (timerEl) timerEl.textContent = formatWorkoutTime(live.elapsed);
  if (progressFill) progressFill.style.width = live.percent + '%';
  if (gaugeTime) gaugeTime.textContent = formatWorkoutTime(live.remaining);
  renderLiveSegments(segments, live.percent, live.segmentCount);
  renderGaugeBars(gaugeBars, live.exercisePercent);

  if (live.remaining <= 0 && window._execInterval) {
    clearInterval(window._execInterval);
    window._execInterval = null;
    exec._timerInterval = null;
    setTimeout(function() {
      if (state.currentExecution && !state.currentExecution.isPaused) completeSet();
    }, 250);
  }
}

function updateExecTimer() {
  syncExecProgressUI();
}

function renderWorkoutPauseState() {
  var exec = state.currentExecution;
  var screen = document.querySelector('.screen-exec-counter');
  var title = document.getElementById('wkPauseTitle');
  var label = document.getElementById('wkPauseLabel');
  var button = document.getElementById('wkPauseButton');
  if (!exec || !screen || !title || !label || !button) return;

  screen.classList.toggle('is-paused', !!exec.isPaused);
  title.textContent = exec.isPaused ? 'Pause' : '';
  label.textContent = exec.isPaused ? 'Play' : 'Pause';
  button.classList.toggle('is-play', !!exec.isPaused);
}

function renderWarmupSuccess() {
  var exec = state.currentExecution;
  var screen = document.querySelector('.screen-exec-counter');
  var copy = document.getElementById('wkWarmupSuccessCopy');
  var next = exec && exec.exercises ? exec.exercises[exec.currentExIndex || 0] : null;
  if (window._execInterval) {
    clearInterval(window._execInterval);
    window._execInterval = null;
  }
  if (exec) {
    exec.isPaused = false;
    exec.pausedAt = null;
    exec._timerInterval = null;
  }
  if (screen) {
    screen.classList.remove('is-paused');
    screen.classList.add('show-warmup-success');
  }
  if (copy) copy.textContent = 'You are ready for ' + ((next && next.name) || 'your first exercise') + '.';
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
}

window.continueAfterWarmup = function continueAfterWarmup(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  var exec = state.currentExecution || createWorkoutExecution(0);
  exec.warmupComplete = false;
  exec.warmupPhase = false;
  exec.warmupIndex = 0;
  exec.includeWarmupProgress = false;
  exec.warmedUp = true;
  exec.currentSet = 1;
  exec.exerciseStartTime = Date.now();
  exec.isPaused = false;
  exec.pausedAt = null;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  renderExecExercise();
};

window.toggleWorkoutPause = function toggleWorkoutPause(event) {
  if (event && event.target && event.target.closest('.wk-live-back')) return;
  if (event && event.target && event.target.closest('.wk-warmup-success')) return;
  var exec = state.currentExecution;
  if (!exec || exec.warmupComplete) return;
  if (exec.isPaused) {
    resumeWorkoutTimer();
  } else {
    pauseWorkoutTimer();
  }
};

function pauseWorkoutTimer() {
  var exec = state.currentExecution;
  if (!exec || exec.isPaused) return;
  exec.isPaused = true;
  exec.pausedAt = Date.now();
  if (window._execInterval) {
    clearInterval(window._execInterval);
    window._execInterval = null;
  }
  exec._timerInterval = null;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  renderWorkoutPauseState();
}

function resumeWorkoutTimer() {
  var exec = state.currentExecution;
  if (!exec || !exec.isPaused) return;
  var pausedFor = Date.now() - (exec.pausedAt || Date.now());
  exec.exerciseStartTime = (exec.exerciseStartTime || Date.now()) + pausedFor;
  exec.isPaused = false;
  exec.pausedAt = null;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  renderWorkoutPauseState();
  updateExecTimer();
  if (window._execInterval) clearInterval(window._execInterval);
  window._execInterval = setInterval(updateExecTimer, 1000);
  exec._timerInterval = window._execInterval;
}

// Complete a set
window.completeSet = function completeSet() {
  var exec = state.currentExecution;
  if (!exec) return;
  var ex = getCurrentLiveExercise(exec);

  if (exec.warmupPhase) {
    exec.setLogs.push({
      exercise: ex.name,
      set: 1,
      weight: 0,
      reps: parseInt(ex.reps) || 20
    });

    if ((exec.warmupIndex || 0) < (exec.warmupExercises || []).length - 1) {
      exec.warmupIndex = (exec.warmupIndex || 0) + 1;
      exec.exerciseStartTime = Date.now();
      exec.isPaused = false;
      exec.pausedAt = null;
      try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
      renderExecExercise();
    } else {
      exec.warmupComplete = true;
      exec.warmupPhase = false;
      exec.warmupIndex = 0;
      exec.currentSet = 1;
      exec.exerciseStartTime = null;
      exec.isPaused = false;
      exec.pausedAt = null;
      try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
      renderWarmupSuccess();
    }
    return;
  }

  var weightEl = document.getElementById('execWeight');
  var repsEl = document.getElementById('execReps');
  exec.setLogs.push({
    exercise: ex.name,
    set: exec.currentSet,
    weight: weightEl ? parseFloat(weightEl.value) || 0 : 0,
    reps: repsEl ? parseInt(repsEl.value) || parseInt(ex.reps) : parseInt(ex.reps)
  });

  if (exec.currentSet < ex.sets) {
    // Move to next set → show rest timer
    exec.currentSet++;
    exec.exerciseStartTime = Date.now();
    exec.isPaused = false;
    exec.pausedAt = null;
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    navigateTo('workout-rest');
  } else {
    // Move to next exercise
    advanceToNextExercise();
  }
};

// Rest timer
function initWorkoutRest() {
  var numEl = document.getElementById('wkRestNum');
  var ringEl = document.getElementById('wkRestRing');
  var hintEl = document.getElementById('wkRestHint');
  if (!numEl || !ringEl) return;

  var duration = state.workoutSettings.restDuration || 90;
  var remaining = duration;
  var circumference = 439.82; // 2 * PI * 70

  numEl.textContent = remaining;
  ringEl.setAttribute('stroke-dasharray', circumference);
  ringEl.setAttribute('stroke-dashoffset', '0');

  if (hintEl) hintEl.textContent = 'Next: ' + (state.currentExecution.exercises[state.currentExecution.currentExIndex] ? state.currentExecution.exercises[state.currentExecution.currentExIndex].name : '');

  window._restInterval = setInterval(function() {
    remaining--;
    numEl.textContent = remaining;
    var offset = circumference * ((duration - remaining) / duration);
    ringEl.setAttribute('stroke-dashoffset', offset);

    if (remaining <= 0) {
      clearInterval(window._restInterval);
      window._restInterval = null;
      navigateTo('workout-exercise');
    }
  }, 1000);
}

window.skipRest = function skipRest() {
  if (window._restInterval) {
    clearInterval(window._restInterval);
    window._restInterval = null;
  }
  navigateTo('workout-exercise');
};

// Next exercise
window.advanceToNextExercise = function advanceToNextExercise() {
  var exec = state.currentExecution;
  if (!exec) return;
  exec.currentSet = 1;
  if (exec.currentExIndex < exec.exercises.length - 1) {
    exec.currentExIndex++;
    exec.exerciseStartTime = Date.now();
    exec.isPaused = false;
    exec.pausedAt = null;
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    renderExecExercise();
  } else {
    // Workout complete
    finishWorkout();
  }
};

window.goToPreviousExercise = function goToPreviousExercise() {
  var exec = state.currentExecution;
  if (!exec || exec.currentExIndex === 0) return;
  exec.currentExIndex--;
  exec.currentSet = 1;
  exec.exerciseStartTime = Date.now();
  exec.isPaused = false;
  exec.pausedAt = null;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  renderExecExercise();
};

window.exitWorkout = function exitWorkout() {
  var exec = state.currentExecution;
  if (window._execInterval) {
    clearInterval(window._execInterval);
    window._execInterval = null;
  }
  if (exec && exec._timerInterval) {
    clearInterval(exec._timerInterval);
    exec._timerInterval = null;
  }
  if (window._restInterval) {
    clearInterval(window._restInterval);
    window._restInterval = null;
  }
  // Save partial progress
  if (exec && exec.setLogs.length > 0) {
    saveToHistory(exec, false);
  }
  state.currentExecution = null;
  navigateTo('workout');
};

function finishWorkout() {
  var exec = state.currentExecution;
  if (!exec) return;

  if (exec._timerInterval) {
    clearInterval(exec._timerInterval);
    exec._timerInterval = null;
  }

  exec.totalTime = Math.floor((Date.now() - exec.startTime) / 1000);
  saveToHistory(exec, true);
  state.currentExecution = null;
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  navigateTo('workout-complete');
}

function saveToHistory(exec, completed) {
  var w = findWorkout();
  var entry = {
    date: new Date().toISOString(),
    workoutName: exec.workoutName,
    exercises: exec.exercises.length,
    setsCompleted: exec.setLogs.length,
    totalTime: exec.totalTime || 0,
    calories: w ? Math.round((w.calories || 300) * (completed ? 1 : exec.setLogs.length / (exec.exercises.reduce(function(s, e) { return s + (e.sets || 3); }, 0) || 1))) : 200,
    completed: completed
  };
  state.workoutHistory = state.workoutHistory || [];
  state.workoutHistory.unshift(entry);
  if (state.workoutHistory.length > 50) state.workoutHistory = state.workoutHistory.slice(0, 50);
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
}

// ======================================================================
// WORKOUT COMPLETE SCREEN
// ======================================================================
function initWorkoutComplete() {
  var hist = (state.workoutHistory || [])[0];
  var nameEl = document.getElementById('wkCompleteName');
  var statsEl = document.getElementById('wkCompleteStats');

  if (nameEl && hist) nameEl.textContent = hist.workoutName || 'Great job!';

  if (statsEl && hist) {
    var m = Math.floor(hist.totalTime / 60);
    var s = hist.totalTime % 60;
    statsEl.innerHTML =
      '<div class="wk-complete-stat"><span class="wk-complete-stat-val">' + m + ':' + (s < 10 ? '0' : '') + s + '</span><span class="wk-complete-stat-label">Duration</span></div>' +
      '<div class="wk-complete-stat"><span class="wk-complete-stat-val">' + hist.calories + '</span><span class="wk-complete-stat-label">Calories</span></div>' +
      '<div class="wk-complete-stat"><span class="wk-complete-stat-val">' + hist.exercises + '</span><span class="wk-complete-stat-label">Exercises</span></div>' +
      '<div class="wk-complete-stat"><span class="wk-complete-stat-val">' + hist.setsCompleted + '</span><span class="wk-complete-stat-label">Sets</span></div>';
  }
}

// ======================================================================
// LOG ACTIVITY SCREEN
// ======================================================================
window.saveLoggedActivity = function saveLoggedActivity() {
  var selectedBtn = document.querySelector('#wkLogTypeGrid .wk-log-type-btn.selected');
  var type = selectedBtn ? selectedBtn.dataset.type : '';
  var customType = document.getElementById('wkLogCustomType') ? document.getElementById('wkLogCustomType').value.trim() : '';
  var duration = document.getElementById('wkLogDuration') ? parseInt(document.getElementById('wkLogDuration').value) || 0 : 0;
  var distance = document.getElementById('wkLogDistance') ? parseFloat(document.getElementById('wkLogDistance').value) || 0 : 0;
  var calories = document.getElementById('wkLogCalories') ? parseInt(document.getElementById('wkLogCalories').value) || 0 : 0;
  var notes = document.getElementById('wkLogNotes') ? document.getElementById('wkLogNotes').value.trim() : '';
  var label = type === 'Other' ? customType : type;

  if (!type) {
    setWorkoutLogFeedback('Choose an activity type before saving.');
    return;
  }

  if (type === 'Other' && !customType) {
    setWorkoutLogFeedback('Add a name for your activity so it appears clearly in history.');
    return;
  }

  if (!duration) {
    setWorkoutLogFeedback('Add the duration to save this activity.');
    return;
  }

  var entry = {
    date: new Date().toISOString(),
    type: type,
    label: label,
    customType: customType,
    duration: duration,
    distance: distance,
    calories: calories,
    notes: notes,
    source: 'manual'
  };
  state.activityLog = state.activityLog || [];
  state.activityLog.unshift(entry);
  if (state.activityLog.length > 50) state.activityLog = state.activityLog.slice(0, 50);
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}

  renderWorkoutLogEntries();
  closeWorkoutLogForm();
  setWorkoutLogNotice((label || 'Activity') + ' added to recent activity.');
};

// ======================================================================
// WORKOUT SETTINGS SCREEN
// ======================================================================
function initWorkoutSettings() {
  // Load saved settings
  var settings = state.workoutSettings || { restDuration: 90, countdownDuration: 3, units: 'metric' };

  // Rest duration radios
  var restRadios = document.querySelectorAll('#wkRestDuration input[name="restDur"]');
  restRadios.forEach(function(r) {
    if (parseInt(r.value) === settings.restDuration) r.checked = true;
    r.addEventListener('change', function() {
      if (this.checked) {
        state.workoutSettings.restDuration = parseInt(this.value);
        try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
      }
    });
  });

  // Countdown radios
  var cdRadios = document.querySelectorAll('#wkCountdownDur input[name="countdownDur"]');
  cdRadios.forEach(function(r) {
    if (parseInt(r.value) === settings.countdownDuration) r.checked = true;
    r.addEventListener('change', function() {
      if (this.checked) {
        state.workoutSettings.countdownDuration = parseInt(this.value);
        state.workoutCountdownDuration = parseInt(this.value);
        try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
      }
    });
  });

  // Units radios
  var unitRadios = document.querySelectorAll('#wkUnits input[name="wkUnits"]');
  unitRadios.forEach(function(r) {
    if (r.value === settings.units) r.checked = true;
    r.addEventListener('change', function() {
      if (this.checked) {
        state.workoutSettings.units = this.value;
        try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
      }
    });
  });
}

// ======================================================================
// WORKOUT SCHEDULE (2-WEEK PLAN) SCREEN
// ======================================================================
function initWorkoutSchedule() {
  var body = document.getElementById('wkScheduleBody');
  if (!body) return;

  // Generate 14-day schedule if not exists
  if (!state.workoutSchedule) {
    var days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun',
                'Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var plan = [];
    for (var i = 0; i < 14; i++) {
      var d = new Date();
      d.setDate(d.getDate() + i);
      var isRest = i === 3 || i === 7 || i === 11;
      plan.push({
        day: i + 1,
        label: days[i],
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isRest: isRest,
        workout: isRest ? null : workoutLibrary[i % workoutLibrary.length],
        completed: i < Math.floor(Math.random() * 4) // random for demo
      });
    }
    state.workoutSchedule = plan;
  }

  var today = new Date().toDateString();
  var completedCount = state.workoutSchedule.filter(function(day) { return day.completed; }).length;
  var restCount = state.workoutSchedule.filter(function(day) { return day.isRest; }).length;
  var weekGroups = [
    { title: 'Week 1', days: state.workoutSchedule.slice(0, 7) },
    { title: 'Week 2', days: state.workoutSchedule.slice(7, 14) }
  ];

  var weeksHtml = weekGroups.map(function(group, groupIndex) {
    var daysHtml = group.days.map(function(day, dayIndex) {
      var absoluteIndex = groupIndex * 7 + dayIndex;
      var isToday = new Date(new Date().getTime() + absoluteIndex * 86400000).toDateString() === today;
      var cardClass = 'wk-schedule-card' + (isToday ? ' wk-schedule-today' : '') + (day.completed ? ' wk-schedule-done' : '') + (day.isRest ? ' wk-schedule-rest' : '');
      var content = day.isRest
        ? '<div class="wk-schedule-rest-icon"><img src="../../assets/svg_icons/day.svg" alt=""></div><div class="wk-schedule-rest-copy"><span class="wk-schedule-rest-label">Rest Day</span><p>Recovery and mobility focus</p></div>'
        : '<div class="wk-schedule-workout-copy"><h3 class="wk-schedule-title">' + day.workout.name + '</h3><p class="wk-schedule-desc">' + escapeHtml(day.workout.desc || 'Progressive strength session') + '</p><div class="wk-schedule-meta"><span>' + day.workout.duration + ' min</span><span>' + day.workout.difficulty.charAt(0).toUpperCase() + day.workout.difficulty.slice(1) + '</span><span>' + escapeHtml(day.workout.muscle || 'Full Body') + '</span></div></div>';

      return '<article class="' + cardClass + '" ' + (day.workout ? 'onclick="openWorkoutDetail(\'' + day.workout.id + '\')"' : '') + '>' +
        '<div class="wk-schedule-day"><div><span class="wk-schedule-day-label">' + day.label + '</span><span class="wk-schedule-day-date">' + day.date + '</span></div><div class="wk-schedule-day-status">' + (isToday ? '<span class="wk-schedule-today-badge">Today</span>' : '') + (day.completed ? '<span class="wk-schedule-complete-badge">Done</span>' : '') + '</div></div>' +
        content +
      '</article>';
    }).join('');

    return '<section class="wk-schedule-week-block">' +
      '<div class="wk-schedule-week-head"><h2>' + group.title + '</h2><span>' + group.days.filter(function(day) { return !day.isRest; }).length + ' training days</span></div>' +
      '<div class="wk-schedule-stack">' + daysHtml + '</div>' +
    '</section>';
  }).join('');

  body.innerHTML =
    '<section class="wk-schedule-hero">' +
      '<div class="wk-schedule-hero-copy">' +
        '<span class="wk-schedule-kicker">Current cycle</span>' +
        '<h2>Two-week training rhythm</h2>' +
        '<p>Your schedule balances lifting days with recovery so the week stays consistent.</p>' +
      '</div>' +
      '<div class="wk-schedule-hero-stats">' +
        '<div><strong>' + completedCount + '</strong><span>Completed</span></div>' +
        '<div><strong>' + (14 - restCount) + '</strong><span>Sessions</span></div>' +
        '<div><strong>' + restCount + '</strong><span>Recovery</span></div>' +
      '</div>' +
    '</section>' +
    weeksHtml;
}

// ======================================================================
// COACH MAIN SCREEN
// ======================================================================
function initCoachMain() {
  var screen = document.querySelector('.screen-coach-main');
  if (!screen) return;

  state.coachMood = state.coachMood || 'Good';
  state.isPremium = true;
  state.healthConnected = typeof state.healthConnected === 'boolean' ? state.healthConnected : true;
  state.coachActiveTab = state.coachActiveTab || localStorage.getItem('strivio_coach_tab') || 'recovery';
  if (state.coachManualSleep && state.coachManualSleep.durationMinutes) {
    var initialSleepMetric = document.getElementById('coachSleepMetric');
    var initialSleepHours = Math.floor(state.coachManualSleep.durationMinutes / 60);
    var initialSleepMins = state.coachManualSleep.durationMinutes % 60;
    if (initialSleepMetric) initialSleepMetric.textContent = initialSleepHours + 'h ' + String(initialSleepMins).padStart(2, '0') + 'm';
  }

  function renderCoachPremiumState() {
    screen.classList.toggle('premium-unlocked', !!state.isPremium);
    var premiumToggle = document.getElementById('coachPremiumToggle');
    var breakdownNote = document.getElementById('coachBreakdownNote');
    if (premiumToggle) {
      premiumToggle.classList.toggle('active', !!state.isPremium);
      premiumToggle.setAttribute('aria-pressed', state.isPremium ? 'true' : 'false');
      premiumToggle.textContent = state.isPremium ? 'Premium On' : 'Premium';
    }
    if (breakdownNote) {
      breakdownNote.classList.toggle('visible', !!state.isPremium);
    }
    screen.querySelectorAll('[data-premium-content]').forEach(function(node) {
      node.hidden = !state.isPremium;
    });
    screen.querySelectorAll('[data-premium-lock]').forEach(function(node) {
      node.hidden = !!state.isPremium;
    });
    screen.querySelectorAll('.coach-premium-badge').forEach(function(badge) {
      badge.textContent = state.isPremium ? 'Unlocked' : 'Premium';
    });
    screen.querySelectorAll('[data-open-coach-chat]').forEach(function(btn) {
      btn.textContent = 'Chat with Coach';
    });
  }

  var premiumToggle = document.getElementById('coachPremiumToggle');
  if (premiumToggle) {
    premiumToggle.addEventListener('click', function() {
      state.isPremium = !state.isPremium;
      try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
      renderCoachPremiumState();
      showCoachToast(state.isPremium ? 'Premium unlocked. Full Coach insights are visible.' : 'Premium preview mode restored.');
    });
  }

  var tabs = screen.querySelectorAll('[data-coach-tab]');
  var panels = screen.querySelectorAll('[data-coach-panel]');
  function activateCoachTab(target) {
    tabs.forEach(function(item) {
      var active = item.getAttribute('data-coach-tab') === target;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(function(panel) {
      panel.classList.toggle('active', panel.getAttribute('data-coach-panel') === target);
    });
    state.coachActiveTab = target;
    try {
      localStorage.setItem('strivio_coach_tab', target);
      localStorage.setItem('strivio_state', JSON.stringify(state));
    } catch(e) {}
  }
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      activateCoachTab(tab.getAttribute('data-coach-tab'));
    });
  });
  activateCoachTab(state.coachActiveTab);

  var touchStartX = 0;
  screen.addEventListener('touchstart', function(e) {
    touchStartX = e.touches && e.touches.length ? e.touches[0].clientX : 0;
  }, { passive: true });
  screen.addEventListener('touchend', function(e) {
    if (!touchStartX || !e.changedTouches || !e.changedTouches.length) return;
    var delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 60) return;
    var order = ['recovery', 'nutrition', 'activity'];
    var index = order.indexOf(state.coachActiveTab || 'recovery');
    if (delta < 0 && index < order.length - 1) activateCoachTab(order[index + 1]);
    if (delta > 0 && index > 0) activateCoachTab(order[index - 1]);
  }, { passive: true });

  var moodButtons = screen.querySelectorAll('.coach-mood-row button');
  var savedMood = document.getElementById('coachSavedMood');
  function renderMood(mood) {
    moodButtons.forEach(function(btn) {
      btn.classList.toggle('selected', btn.getAttribute('data-mood') === mood);
    });
    if (savedMood) savedMood.textContent = 'Mood saved: ' + mood;
  }
  renderMood(state.coachMood);

  moodButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      state.coachMood = btn.getAttribute('data-mood');
      renderMood(state.coachMood);
      try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
      showCoachToast('Mood check-in saved.');
    });
  });

  var moodChange = document.getElementById('coachMoodChange');
  if (moodChange) {
    moodChange.addEventListener('click', function() {
      showCoachToast('Select a different mood to update today.');
    });
  }

  function renderCoachHealthState() {
    var empty = document.getElementById('coachHealthEmpty');
    var connected = document.getElementById('coachHealthConnected');
    var healthBtn = screen.querySelector('.coach-health-btn span');
    if (empty) empty.hidden = !!state.healthConnected;
    if (connected) connected.hidden = !state.healthConnected;
    if (healthBtn) healthBtn.textContent = state.healthConnected ? 'Synced' : 'Health';
  }
  renderCoachHealthState();

  screen.querySelectorAll('[data-coach-edge]').forEach(function(el) {
    el.addEventListener('click', function() {
      var edge = el.getAttribute('data-coach-edge');
      if (edge === 'paywall') {
        if (state.isPremium) return;
        showCoachToast('Premium unlocks deeper trends, charts, and coaching breakdowns.');
      } else if (edge === 'health') {
        state.healthConnected = !state.healthConnected;
        try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
        renderCoachHealthState();
        showCoachToast(state.healthConnected ? 'Apple Health sample connected.' : 'Health sample disconnected.');
      } else if (edge === 'breakdown') {
        if (!state.isPremium) {
          showCoachToast('Unlock Premium to see the recovery score breakdown.');
          return;
        }
        var note = document.getElementById('coachBreakdownNote');
        if (note) note.classList.toggle('visible');
      }
    });
  });

  screen.querySelectorAll('[data-open-coach-chat]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var context = btn.getAttribute('data-chat-context') || 'recovery';
      if (!state.isPremium) {
        showCoachToast('Coach Chat is a Premium feature. Upgrade to unlock personalized answers.');
        return;
      }
      openCoachChat(context);
    });
  });

  var closeBtn = document.getElementById('coachChatClose');
  var backdrop = document.getElementById('coachChatBackdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeCoachChat);
  if (backdrop) backdrop.addEventListener('click', closeCoachChat);

  var form = document.getElementById('coachChatForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var input = document.getElementById('coachChatInput');
      var text = input ? input.value.trim() : '';
      if (!text) return;
      if (input) input.value = '';
      addCoachMessage(text, 'user');
      respondAsCoach(text);
    });
  }

  document.querySelectorAll('[data-chat-question]').forEach(function(chip) {
    chip.addEventListener('click', function() {
      var q = chip.getAttribute('data-chat-question');
      addCoachMessage(q, 'user');
      respondAsCoach(q);
    });
  });

  var sleepSheet = document.getElementById('coachSleepSheet');
  var sleepBackdrop = document.getElementById('coachSleepSheetBackdrop');
  var faqSheet = document.getElementById('coachFaqSheet');
  var faqBackdrop = document.getElementById('coachFaqBackdrop');
  function setCoachSheetState(open) {
    screen.classList.toggle('sheet-open', !!open);
  }
  function openCoachSheet(sheet, backdrop) {
    if (sheet) {
      sheet.classList.add('open');
      sheet.setAttribute('aria-hidden', 'false');
    }
    if (backdrop) backdrop.classList.add('open');
    setCoachSheetState(true);
  }
  function closeCoachSheet(sheet, backdrop) {
    if (sheet) {
      sheet.classList.remove('open');
      sheet.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) backdrop.classList.remove('open');
    if (!screen.querySelector('.coach-small-sheet.open') && !screen.querySelector('.coach-chat-sheet.open')) {
      setCoachSheetState(false);
    }
  }
  var sleepManualBtn = document.getElementById('coachSleepManualBtn');
  if (sleepManualBtn) sleepManualBtn.addEventListener('click', function() {
    openCoachSheet(sleepSheet, sleepBackdrop);
  });
  var sleepFaqBtn = document.getElementById('coachSleepFaqBtn');
  if (sleepFaqBtn) sleepFaqBtn.addEventListener('click', function() {
    openCoachSheet(faqSheet, faqBackdrop);
  });
  var sleepClose = document.getElementById('coachSleepClose');
  var faqClose = document.getElementById('coachFaqClose');
  if (sleepClose) sleepClose.addEventListener('click', function() { closeCoachSheet(sleepSheet, sleepBackdrop); });
  if (sleepBackdrop) sleepBackdrop.addEventListener('click', function() { closeCoachSheet(sleepSheet, sleepBackdrop); });
  if (faqClose) faqClose.addEventListener('click', function() { closeCoachSheet(faqSheet, faqBackdrop); });
  if (faqBackdrop) faqBackdrop.addEventListener('click', function() { closeCoachSheet(faqSheet, faqBackdrop); });
  var sleepSave = document.getElementById('coachSleepSave');
  if (sleepSave) sleepSave.addEventListener('click', function() {
    var bed = document.getElementById('coachBedtime');
    var wake = document.getElementById('coachWakeTime');
    if (!bed || !wake || !bed.value || !wake.value) return;
    var bedParts = bed.value.split(':').map(Number);
    var wakeParts = wake.value.split(':').map(Number);
    var bedMins = bedParts[0] * 60 + bedParts[1];
    var wakeMins = wakeParts[0] * 60 + wakeParts[1];
    var duration = wakeMins - bedMins;
    if (duration <= 0) duration += 24 * 60;
    var hours = Math.floor(duration / 60);
    var mins = duration % 60;
    var metric = document.getElementById('coachSleepMetric');
    if (metric) metric.textContent = hours + 'h ' + String(mins).padStart(2, '0') + 'm';
    state.coachManualSleep = { bedtime: bed.value, wakeTime: wake.value, durationMinutes: duration };
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    closeCoachSheet(sleepSheet, sleepBackdrop);
    showCoachToast('Manual sleep data saved.');
  });

  renderCoachPremiumState();
}

function showCoachToast(message) {
  var toast = document.getElementById('coachToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showCoachToast._timer);
  showCoachToast._timer = setTimeout(function() {
    toast.classList.remove('visible');
  }, 2400);
}

function openCoachChat(context) {
  var sheet = document.getElementById('coachChatSheet');
  var backdrop = document.getElementById('coachChatBackdrop');
  var label = document.getElementById('coachChatContext');
  var input = document.getElementById('coachChatInput');
  if (label) {
    var copy = {
      recovery: 'Recovery context',
      nutrition: 'Nutrition context',
      activity: 'Activity context'
    };
    label.textContent = copy[context] || 'Coach context';
  }
  if (sheet) {
    sheet.classList.add('open');
    sheet.setAttribute('aria-hidden', 'false');
    var screen = sheet.closest('.screen');
    if (screen) screen.classList.add('sheet-open');
  }
  if (backdrop) backdrop.classList.add('open');
  setTimeout(function() {
    if (input) input.focus();
  }, 320);
}

function closeCoachChat() {
  var sheet = document.getElementById('coachChatSheet');
  var backdrop = document.getElementById('coachChatBackdrop');
  if (sheet) {
    sheet.classList.remove('open');
    sheet.setAttribute('aria-hidden', 'true');
    var screen = sheet.closest('.screen');
    if (screen && !screen.querySelector('.coach-small-sheet.open')) screen.classList.remove('sheet-open');
  }
  if (backdrop) backdrop.classList.remove('open');
}

function addCoachMessage(text, sender) {
  var messages = document.getElementById('coachChatMessages');
  if (!messages) return;
  var row = document.createElement('div');
  row.className = sender === 'user' ? 'coach-message coach-message-user' : 'coach-message coach-message-coach';
  if (sender !== 'user') {
    var avatar = document.createElement('div');
    avatar.className = 'coach-message-avatar';
    avatar.textContent = 'C';
    row.appendChild(avatar);
  }
  var bubble = document.createElement('p');
  bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function respondAsCoach(question) {
  var messages = document.getElementById('coachChatMessages');
  if (!messages) return;

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    addCoachMessage('Waiting for connection. Try again when you are back online.', 'coach');
    return;
  }

  var typing = document.createElement('div');
  typing.className = 'coach-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(function() {
    if (typing.parentNode) typing.parentNode.removeChild(typing);
    var q = question.toLowerCase();
    var goal = Array.isArray(state.goals) && state.goals.length ? state.goals.join(', ') : (state.goal || 'your current goal');
    var mood = state.coachMood || 'Good';
    var sleep = state.coachManualSleep && state.coachManualSleep.durationMinutes ?
      Math.floor(state.coachManualSleep.durationMinutes / 60) + 'h ' + String(state.coachManualSleep.durationMinutes % 60).padStart(2, '0') + 'm' :
      '7h 42m';
    var healthCopy = state.healthConnected ? 'Apple Health sample data is synced' : 'health data is not connected yet';
    var answer = 'I am having trouble with that. Try asking about your nutrition, workouts, or recovery.';
    if (q.indexOf('nutrition') >= 0 || q.indexOf('meal') >= 0 || q.indexOf('protein') >= 0) {
      answer = 'For ' + goal + ', today looks close to plan: 1,850 of 2,200 calories and 85g of 120g protein. Keep dinner lean, add vegetables, and aim for about 35g more protein.';
    } else if (q.indexOf('workout') >= 0 || q.indexOf('training') >= 0 || q.indexOf('adjust') >= 0) {
      answer = 'Your next session is Upper Body Strength. With mood marked ' + mood + ' and recovery trending good, normal volume is fine. If the warm-up feels heavy, reduce the first two working sets by one rep.';
    } else if (q.indexOf('recovery') >= 0 || q.indexOf('sleep') >= 0 || q.indexOf('hrv') >= 0) {
      answer = 'Recovery is good. Sleep is ' + sleep + ', mood is ' + mood + ', and ' + healthCopy + '. Hydrate before training and keep the warm-up deliberate.';
    }
    addCoachMessage(answer, 'coach');
  }, 900);
}

// ===== PWA INITIALIZATION =====
function initPWA() {
  if (typeof document === 'undefined') return;

  // 1. Inject Manifest Link if not already present
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = BASE_PATH + '/manifest.json';
    document.head.appendChild(manifestLink);
  }

  // 2. Inject PWA and iOS Meta Tags
  const metaTags = [
    { name: 'theme-color', content: '#0056D8' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'Strivio' }
  ];

  metaTags.forEach(tag => {
    if (!document.querySelector(`meta[name="${tag.name}"]`)) {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    }
  });

  // 3. Inject Apple Touch Icon
  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = BASE_PATH + '/assets/icon-192.png';
    document.head.appendChild(appleIcon);
  }

  // 4. Register Service Worker
  if ('serviceWorker' in navigator) {
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' || 
                        window.location.hostname === '[::1]';

    if (isLocalhost) {
      // Unregister service worker on localhost to avoid caching issues during local development
      navigator.serviceWorker.getRegistrations().then(registrations => {
        if (registrations.length > 0) {
          Promise.all(registrations.map(reg => reg.unregister()))
            .then(results => {
              const anySuccess = results.some(success => success);
              if (anySuccess) {
                console.log('[PWA] Unregistered active service worker for local development.');
                caches.keys().then(keys => {
                  return Promise.all(keys.map(key => caches.delete(key)));
                }).then(() => {
                  console.log('[PWA] Cleared service worker caches.');
                  window.location.reload();
                });
              }
            });
        }
      });
    } else {
      const registerSW = () => {
        const swUrl = BASE_PATH + '/sw.js';
        navigator.serviceWorker.register(swUrl)
          .then(reg => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope);
          })
          .catch(err => {
            console.error('[PWA] Service Worker registration failed:', err);
          });
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
      }
    }
  }
}

// ======================================================================
// INIT =====
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    restoreState();
    initPWA();


    // Sync workout settings to state
    if (state.workoutSettings) {
      state.workoutCountdownDuration = state.workoutSettings.countdownDuration || 3;
    }

    // Splash auto-redirect — only fire on the actual splash page, not splash-onboarding
    if (window.location.pathname.endsWith('/auth/splash.html') || window.location.pathname.endsWith('/splash.html')) {
      currentScreen = 'splash';
      setTimeout(() => navigateTo('onboarding'), 1500);
    }

    initOptionCards();
    initTextInputs();
    initNumericInputs();
    initSliders();
    initDayChips();
    initCoachCards();
    initPasswordToggles();
    initPasswordStrength();
    initFormClearErrors();
    initBottomSheets();
    initFabMenu();
    initWaterActions();
    initWaterSettings();
    initWeightSave();
    openPendingSheet();

    // Screen-specific initialization based on current page
    const currentPath = window.location.pathname;
    if (currentPath.includes('home')) {
      updateHomeGreeting();
    } else if (currentPath.includes('/coach/coach')) {
      initCoachMain();
    } else if (currentPath.endsWith('/workout/workout.html')) {
      initWorkoutHome();
    } else if (currentPath.includes('reveal')) {
      populateReveal();
    } else if (currentPath.includes('loading')) {
      startLoadingAnimation();
    } else if (currentPath.includes('conflicts')) {
      checkConflicts();
    } else if (currentPath.includes('q9')) {
      updateWeightRef();

    // WORKOUT SCREEN INITIALIZERS
    } else if (currentPath.includes('workout-library')) {
      initWorkoutLibrary();
    } else if (currentPath.includes('workout-generator')) {
      initWorkoutGenerator();
    } else if (currentPath.includes('custom-workouts')) {
      initCustomWorkouts();
    } else if (currentPath.includes('workout-detail')) {
      initWorkoutDetail();
    } else if (currentPath.includes('exercise-library')) {
      initExerciseLibrary();
    } else if (currentPath.includes('exercise-detail')) {
      initExerciseDetail();
    } else if (currentPath.includes('workout-build')) {
      initWorkoutBuild();
    } else if (currentPath.includes('workout-edit')) {
      initWorkoutEdit();
    } else if (currentPath.includes('workout-exercise')) {
      initWorkoutExec();
    } else if (currentPath.includes('workout-rest')) {
      initWorkoutRest();
    } else if (currentPath.includes('workout-complete')) {
      initWorkoutComplete();
    } else if (currentPath.includes('workout-settings')) {
      initWorkoutSettings();
    } else if (currentPath.includes('workout-schedule')) {
      initWorkoutSchedule();
    } else if (currentPath.includes('workout-countdown')) {
      initWorkoutCountdown();
    } else if (currentPath.includes('workout-log')) {
      initWorkoutLog();
    } else if (currentPath.includes('coach-q6')) {
      initCoachQ6();
    } else if (currentPath.includes('coach-generating')) {
      initCoachGenerating();
    } else if (currentPath.includes('coach-review')) {
      initCoachReview();
    } else if (currentPath.includes('nutrients-locked')) {
      initNutrientsLocked();
    }
  });
}
