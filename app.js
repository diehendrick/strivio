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
  favoriteExerciseIds: []
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
  'workout': BASE_PATH + '/screens/workout/workout.html',
  'workout-library': BASE_PATH + '/screens/workout/workout-library.html',
  'exercise-library': BASE_PATH + '/screens/workout/exercise-library.html',
  'exercise-detail': BASE_PATH + '/screens/workout/exercise-detail.html',
  'workout-build': BASE_PATH + '/screens/workout/workout-build.html',
  'coach-q1': BASE_PATH + '/screens/workout/coach-q1.html',
  'coach-q2': BASE_PATH + '/screens/workout/coach-q2.html',
  'coach-q3': BASE_PATH + '/screens/workout/coach-q3.html',
  'coach-q4': BASE_PATH + '/screens/workout/coach-q4.html',
  'coach-q5': BASE_PATH + '/screens/workout/coach-q5.html',
  'coach-q6': BASE_PATH + '/screens/workout/coach-q6.html',
  'coach-generating': BASE_PATH + '/screens/workout/coach-generating.html',
  'coach-review': BASE_PATH + '/screens/workout/coach-review.html',
  'workout-edit': BASE_PATH + '/screens/workout/workout-edit.html',
  'workout-detail': BASE_PATH + '/screens/workout/workout-detail.html',
  'workout-countdown': BASE_PATH + '/screens/workout/workout-countdown.html',
  'workout-exercise': BASE_PATH + '/screens/workout/workout-exercise.html',
  'workout-rest': BASE_PATH + '/screens/workout/workout-rest.html',
  'workout-complete': BASE_PATH + '/screens/workout/workout-complete.html',
  'workout-settings': BASE_PATH + '/screens/workout/workout-settings.html',
  'workout-schedule': BASE_PATH + '/screens/workout/workout-schedule.html',
  'workout-log': BASE_PATH + '/screens/workout/workout-log.html'
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

// Bottom nav item click handler — active state + navigation
const navRouteMap = {
  home: 'home',
  logbook: 'logbook',
  coach: 'coach-main'
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
}

function closeSheet(sheetId) {
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  sheet.classList.remove('open');
  sheet.classList.remove('show-settings');
}

// Card tap → sheet mapping
const cardSheetMap = {
  weight: 'sheetWeight',
  water: 'sheetWater',
  steps: 'sheetSteps',
  workout: 'sheetSteps',
};

function initBottomSheets() {
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

  // Backdrop & close button clicks
  document.querySelectorAll('.sheet-backdrop, .sheet-close, .sheet-track-close').forEach(el => {
    el.addEventListener('click', () => {
      const sheetId = el.dataset.close;
      if (sheetId) closeSheet(sheetId);
    });
  });
}

// ===== FAB MENU =====
function initFabMenu() {
  const fabBtn = document.getElementById('fabButton');
  if (!fabBtn) return;

  fabBtn.addEventListener('click', () => {
    openSheet('sheetTrack');
  });

  // Track sheet option actions
  document.querySelectorAll('#sheetTrack .track-list-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.dataset.action;
      closeSheet('sheetTrack');

      if (action === 'water-log') {
        openSheet('sheetWater');
      } else if (action === 'log-weight') {
        openSheet('sheetWeight');
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
  var activeFilter = document.querySelector('#wkLibraryFilters .wk-chip.active');
  renderWorkoutLibrary(activeFilter ? activeFilter.dataset.filter : null, '');
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
window.selectLogType = function selectLogType(type, btn) {
  var grid = document.getElementById('wkLogTypeGrid');
  if (!grid) return;
  grid.querySelectorAll('.wk-log-type-btn').forEach(function(b){ b.classList.remove('selected'); });
  btn.classList.add('selected');
  btn.setAttribute('data-selected', 'true');
};

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
  navigateTo('workout-exercise');
};

function initWorkoutCountdown() {
  var numEl = document.getElementById('wkCountdownNum');
  var ringEl = document.getElementById('wkCountdownRing');
  if (!numEl || !ringEl) return;

  var duration = state.workoutCountdownDuration || 3;
  workoutCountdownValue = duration;
  var circumference = 376.99; // 2 * PI * 60

  // Set initial state
  numEl.textContent = duration;
  ringEl.setAttribute('stroke-dashoffset', '0');

  workoutCountdownTimer = setInterval(function() {
    workoutCountdownValue--;
    numEl.textContent = workoutCountdownValue;

    // Animate ring
    var progress = (duration - workoutCountdownValue) / duration;
    var offset = circumference * progress;
    ringEl.setAttribute('stroke-dashoffset', offset);

    if (workoutCountdownValue <= 0) {
      clearInterval(workoutCountdownTimer);
      workoutCountdownTimer = null;
      navigateTo('workout-exercise');
    }
  }, 1000);
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
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  alert('Rest day noted. Recovery is essential!');
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
    var eqMatch = !params.coachEquipment || params.coachEquipment === 'full-gym' ||
      ex.equipment === params.coachEquipment || ex.equipment === 'Bodyweight';
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

  state.coachWorkout = {
    name: params.coachWorkoutName || 'Coach Workout',
    muscle: targetMuscles[0],
    muscles: targetMuscles.map(function(m) { return m.charAt(0).toUpperCase() + m.slice(1); }),
    duration: duration,
    difficulty: params.coachDifficulty || 'intermediate',
    equipment: params.coachEquipment === 'bodyweight' ? ['Bodyweight'] : params.coachEquipment === 'dumbbells' ? ['Dumbbells'] : ['Mixed'],
    calories: Math.round(duration * 7),
    desc: 'Coach-generated workout based on your preferences.',
    exercises: picked.map(function(ex) { return ex.id; }),
    favorite: false
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
  var diffLabel = w.difficulty.charAt(0).toUpperCase() + w.difficulty.slice(1);
  var diffClass = 'cr-diff--' + w.difficulty;

  // Build exercise list HTML
  var exHTML = exList.map(function(ex, i) {
    return '<div class="cr-exercise" style="animation-delay:' + (i * 0.06) + 's">' +
      '<div class="cr-ex-num"><span>' + (i + 1) + '</span></div>' +
      '<div class="cr-ex-body">' +
        '<span class="cr-ex-name">' + ex.name + '</span>' +
        '<span class="cr-ex-spec">' + ex.sets + ' sets <span class="cr-ex-dot">&middot;</span> ' + ex.reps + '</span>' +
      '</div>' +
      '<span class="cr-ex-equip">' + ex.equipment + '</span>' +
    '</div>';
  }).join('');

  body.innerHTML =
    '<div class="cr-workout-header">' +
      '<h2 class="cr-workout-name">' + w.name + '</h2>' +
      '<p class="cr-workout-origin">Generated from your intake preferences</p>' +
    '</div>' +
    '<div class="cr-badges">' +
      '<div class="cr-badge"><iconify-icon icon="solar:clock-circle-bold-duotone" width="16"></iconify-icon><span>' + w.duration + ' min</span></div>' +
      '<div class="cr-badge ' + diffClass + '"><iconify-icon icon="solar:chart-bold-duotone" width="16"></iconify-icon><span>' + diffLabel + '</span></div>' +
      '<div class="cr-badge"><iconify-icon icon="solar:fire-bold-duotone" width="16"></iconify-icon><span>' + (w.calories || (w.duration * 5)) + ' cal</span></div>' +
    '</div>' +
    '<div class="cr-divider"></div>' +
    '<div class="cr-exercises-head">' +
      '<h3 class="cr-exercises-title">Exercises</h3>' +
      '<span class="cr-exercises-count">' + exList.length + '</span>' +
    '</div>' +
    '<div class="cr-exercises-list">' + exHTML + '</div>';
}

window.saveCoachWorkout = function saveCoachWorkout() {
  if (!state.coachWorkout) return;
  state.customWorkouts.push(state.coachWorkout);
  state.coachWorkout = null;
  state.coachParams = {};
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  navigateTo('workout');
};

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
    w1: '../../assets/img/woman-upper-body.png',
    w2: '../../assets/img/david.jpg',
    w3: '../../assets/img/marcus.jpg',
    w4: '../../assets/img/sara.jpg',
    w5: '../../assets/img/lena.jpg',
    w6: '../../assets/img/profile.jpg',
    w7: '../../assets/img/onvboarding-1.jpg',
    w8: '../../assets/img/onvboarding-2.jpg'
  };

  if (byId[workout.id]) return byId[workout.id];

  var muscle = String(workout.muscle || '').toLowerCase();
  if (muscle === 'legs') return '../../assets/img/david.jpg';
  if (muscle === 'core') return '../../assets/img/sara.jpg';
  if (muscle === 'back') return '../../assets/img/marcus.jpg';
  if (muscle === 'full-body') return '../../assets/img/lena.jpg';
  return '../../assets/img/woman-upper-body.png';
}

function renderWorkoutLibrary(filter, search) {
  var list = document.getElementById('wkLibraryList');
  if (!list) return;
  var results = workoutLibrary.concat(state.customWorkouts || []);

  if (filter && filter !== 'all') {
    results = results.filter(function(w) {
      var primary = String(w.muscle || '').toLowerCase();
      var muscles = (w.muscles || []).map(function(m) { return String(m).toLowerCase(); });
      var matchesFilter = primary === filter || muscles.some(function(m) { return m.indexOf(filter) >= 0; });
      if (filter === 'arms') {
        return matchesFilter || muscles.some(function(m) {
          return m.indexOf('bicep') >= 0 || m.indexOf('tricep') >= 0 || m.indexOf('forearm') >= 0;
        });
      }
      return matchesFilter;
    });
  }
  if (search) {
    var q = search.toLowerCase();
    results = results.filter(function(w) {
      var haystack = [
        w.name,
        w.desc,
        w.muscle,
        (w.muscles || []).join(' '),
        w.difficulty,
        (w.equipment || []).join(' ')
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

  if (!results.length) {
    var safeQuery = escapeHtml((search || '').trim());
    var emptyTitle = safeQuery
      ? 'No workouts found for &ldquo;' + safeQuery + '&rdquo;'
      : 'No workouts found';
    list.innerHTML =
      '<div class="wk-lib-empty">' +
        '<img src="../../assets/svg_icons/not-found-alt.svg" width="36" height="36" alt="Not found">' +
        '<h3>' + emptyTitle + '</h3>' +
        '<p>We couldn\'t find any matches. Try checking your spelling or using more general keywords like "Chest" or "Yoga".</p>' +
      '</div>';
    return;
  }

  list.innerHTML = results.map(function(w) {
    var tags = (w.muscles && w.muscles.length ? w.muscles : [w.muscle || 'General']).slice(0, 3);
    var difficulty = String(w.difficulty || 'intermediate');
    var difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    return '<article class="wk-lib-card" onclick="openWorkoutDetail(\'' + w.id + '\')">' +
      '<div class="wk-lib-thumb"><img src="' + getWorkoutLibraryImage(w) + '" alt=""></div>' +
      '<div class="wk-lib-content">' +
        '<h3>' + escapeHtml(w.name) + '</h3>' +
        '<p>' + escapeHtml(w.desc || 'Structured training block tailored to your goal.') + '</p>' +
        '<div class="wk-lib-meta">' +
          '<span><img src="../../assets/svg_icons/clock-five.svg" width="12" height="12" alt=""> ' + escapeHtml(w.duration) + ' min</span>' +
          '<span><img src="../../assets/svg_icons/chart-simple.svg" width="12" height="12" alt=""> ' + escapeHtml(difficultyLabel) + '</span>' +
        '</div>' +
        '<div class="wk-lib-tags">' + tags.map(function(tag) {
          return '<span>' + escapeHtml(tag) + '</span>';
        }).join('') + '</div>' +
      '</div>' +
    '</article>';
  }).join('');
}

function initWorkoutLibrary() {
  renderWorkoutLibrary();

  // Search
  var searchInput = document.getElementById('wkLibrarySearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var clearBtn = document.getElementById('wkLibrarySearchClear');
      if (clearBtn) clearBtn.style.display = searchInput.value ? '' : 'none';
      var activeFilter = document.querySelector('#wkLibraryFilters .wk-chip.active');
      renderWorkoutLibrary(activeFilter ? activeFilter.dataset.filter : null, searchInput.value);
    });
  }

  // Filters
  var filterChips = document.querySelectorAll('#wkLibraryFilters .wk-chip');
  filterChips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      filterChips.forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      renderWorkoutLibrary(chip.dataset.filter, searchInput ? searchInput.value : '');
    });
  });
}

window.renderWorkoutLibrary = renderWorkoutLibrary;
window.initWorkoutLibrary = initWorkoutLibrary;

window.toggleWorkoutFav = function toggleWorkoutFav(id) {
  // Check in both libraries
  var found = workoutLibrary.find(function(w) { return w.id === id; });
  if (!found) {
    found = (state.customWorkouts || []).find(function(w) { return w.id === id; });
  }
  if (found) {
    found.favorite = !found.favorite;
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    var activeFilter = document.querySelector('#wkLibraryFilters .wk-chip.active');
    var searchInput = document.getElementById('wkLibrarySearch');
    renderWorkoutLibrary(activeFilter ? activeFilter.dataset.filter : null, searchInput ? searchInput.value : '');
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
    results = results.filter(function(e) { return e.name.toLowerCase().indexOf(q) >= 0; });
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
        return '<button class="wk-detail-ex-row" onclick="openExerciseDetail(\'' + ex.id + '\')">' +
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
  if (w) {
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
    try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
    navigateTo('exercise-detail');
  }
};

function initExerciseDetail() {
  var body = document.getElementById('wkExDetailBody');
  if (!body) return;
  var ex = state.currentExercise;
  if (!ex) { body.innerHTML = '<div class="wk-empty-state"><p>No exercise selected.</p></div>'; return; }

  var diffColor = ex.difficulty === 'beginner' ? 'var(--green)' : ex.difficulty === 'advanced' ? 'var(--red)' : 'var(--amber)';
  body.innerHTML =
    '<div class="wk-ex-detail-hero">' +
      '<div class="wk-ex-detail-img"><iconify-icon icon="solar:body-bold-duotone" width="80" style="color:var(--navy-light)"></iconify-icon></div>' +
      '<h2 class="wk-detail-name">' + ex.name + '</h2>' +
      '<div class="wk-detail-tags">' + ex.muscles.map(function(m) { return '<span class="wk-tag-chip">' + m + '</span>'; }).join('') + '</div>' +
      '<div class="wk-detail-meta-row">' +
        '<span class="wk-detail-meta"><iconify-icon icon="solar:clock-circle-bold-duotone" width="16"></iconify-icon> ' + ex.sets + ' sets</span>' +
        '<span class="wk-detail-meta"><iconify-icon icon="solar:repeat-bold-duotone" width="16"></iconify-icon> ' + ex.reps + '</span>' +
        '<span class="wk-detail-meta" style="color:' + diffColor + '"><iconify-icon icon="solar:chart-bold-duotone" width="16"></iconify-icon> ' + ex.difficulty.charAt(0).toUpperCase() + ex.difficulty.slice(1) + '</span>' +
        '<span class="wk-detail-meta"><iconify-icon icon="solar:dumbbell-bold-duotone" width="16"></iconify-icon> ' + ex.equipment + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="wk-detail-section"><div class="wk-detail-section-title">Form Tips</div>' +
      '<p class="wk-detail-desc" style="padding:0 0 16px">Focus on controlled movement and proper form. Keep your core engaged throughout the exercise. Breathe out during exertion and inhale during the release phase.</p>' +
    '</div>' +
    '<div class="wk-detail-section"><div class="wk-detail-section-title">Exercise History</div>' +
      '<div class="wk-history-msg"><iconify-icon icon="solar:history-bold-duotone" width="18"></iconify-icon> History data will appear here after your first session.</div>' +
    '</div>';

  var favBtn = document.getElementById('wkExDetailFav');
  if (favBtn) {
    var icon = favBtn.querySelector('iconify-icon');
    var isFav = (state.exerciseFavorites || []).indexOf(ex.id) >= 0;
    if (icon) {
      icon.setAttribute('icon', isFav ? 'solar:heart-bold-duotone' : 'solar:heart-bold');
      icon.style.color = isFav ? 'var(--navy)' : '';
    }
  }
}

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
  var w = findWorkout();
  if (!w) return;

  state.currentExecution = {
    workoutId: w.id,
    workoutName: w.name,
    exercises: (w.exercises || []).map(function(eid) { return getEx(eid); }).filter(Boolean),
    currentExIndex: 0,
    currentSet: 1,
    startTime: Date.now(),
    setLogs: []
  };
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}

  renderExecExercise();
}

function renderExecExercise() {
  var exec = state.currentExecution;
  if (!exec || !exec.exercises || !exec.exercises.length) return;

  var ex = exec.exercises[exec.currentExIndex];
  var progress = document.getElementById('wkExecProgress');
  var progressFill = document.getElementById('wkExecProgressFill');
  var body = document.getElementById('wkExecBody');
  var completeBtn = document.getElementById('wkExecCompleteBtn');
  var navBtns = document.getElementById('wkExecNavBtns');

  if (progress) progress.textContent = (exec.currentExIndex + 1) + ' / ' + exec.exercises.length + ' exercises';
  if (progressFill) progressFill.style.width = ((exec.currentExIndex) / exec.exercises.length * 100) + '%';
  if (completeBtn) completeBtn.style.display = '';
  if (navBtns) navBtns.style.display = 'none';

  if (body) {
    body.innerHTML =
      '<div class="wk-exec-exercise-card">' +
        '<div class="wk-exec-ex-name">' + ex.name + '</div>' +
        '<div class="wk-exec-set-indicator">Set <strong>' + exec.currentSet + '</strong> of ' + ex.sets + '</div>' +
        '<div class="wk-exec-rep-target">Target: ' + ex.reps + ' &bull; ' + ex.equipment + '</div>' +
        '<div class="wk-exec-input-row">' +
          '<div class="wk-exec-input-group"><label>Weight (' + (state.workoutSettings.units === 'imperial' ? 'lbs' : 'kg') + ')</label><input type="number" class="form-input" id="execWeight" placeholder="40" min="0"></div>' +
          '<div class="wk-exec-input-group"><label>Reps</label><input type="number" class="form-input" id="execReps" placeholder="' + ex.reps + '" min="0"></div>' +
        '</div>' +
        '<div class="wk-exec-next-preview"><span class="wk-exec-next-label">Next: </span>' + (exec.exercises[exec.currentExIndex + 1] ? exec.exercises[exec.currentExIndex + 1].name + ' &bull; ' + exec.exercises[exec.currentExIndex + 1].sets + '×' + exec.exercises[exec.currentExIndex + 1].reps : 'Last exercise!') + '</div>' +
      '</div>';
  }

  updateExecTimer();
  if (!exec._timerInterval) {
    exec._timerInterval = setInterval(updateExecTimer, 1000);
  }
}

function updateExecTimer() {
  var timerEl = document.getElementById('wkExecTimer');
  if (!timerEl || !state.currentExecution) return;
  var elapsed = Math.floor((Date.now() - state.currentExecution.startTime) / 1000);
  var m = Math.floor(elapsed / 60);
  var s = elapsed % 60;
  timerEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
}

// Complete a set
window.completeSet = function completeSet() {
  var exec = state.currentExecution;
  if (!exec) return;
  var ex = exec.exercises[exec.currentExIndex];

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
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  renderExecExercise();
};

window.exitWorkout = function exitWorkout() {
  var exec = state.currentExecution;
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
  var duration = document.getElementById('wkLogDuration') ? parseInt(document.getElementById('wkLogDuration').value) || 0 : 0;
  var distance = document.getElementById('wkLogDistance') ? parseFloat(document.getElementById('wkLogDistance').value) || 0 : 0;
  var calories = document.getElementById('wkLogCalories') ? parseInt(document.getElementById('wkLogCalories').value) || 0 : 0;

  if (!type || !duration) return;

  var entry = {
    date: new Date().toISOString(),
    type: type,
    duration: duration,
    distance: distance,
    calories: calories
  };
  state.activityLog = state.activityLog || [];
  state.activityLog.unshift(entry);
  try { localStorage.setItem('strivio_state', JSON.stringify(state)); } catch(e) {}
  goBack();
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
  body.innerHTML = state.workoutSchedule.map(function(day, i) {
    var isToday = new Date(new Date().getTime() + i * 86400000).toDateString() === today;
    var cardClass = 'wk-schedule-card' + (isToday ? ' wk-schedule-today' : '') + (day.completed ? ' wk-schedule-done' : '') + (day.isRest ? ' wk-schedule-rest' : '');
    var content = day.isRest
      ? '<div class="wk-schedule-rest-icon"><iconify-icon icon="solar:moon-sleep-bold-duotone" width="24"></iconify-icon></div><span class="wk-schedule-rest-label">Rest Day</span>'
      : '<h3 class="wk-schedule-title">' + day.workout.name + '</h3><div class="wk-schedule-meta"><span>' + day.workout.duration + ' min</span><span>' + day.workout.difficulty.charAt(0).toUpperCase() + day.workout.difficulty.slice(1) + '</span></div>';

    return '<div class="' + cardClass + '" ' + (day.workout ? 'onclick="openWorkoutDetail(\'' + day.workout.id + '\')"' : '') + '>' +
      '<div class="wk-schedule-day"><span class="wk-schedule-day-label">' + day.label + '</span><span class="wk-schedule-day-date">' + day.date + '</span>' + (isToday ? '<span class="wk-schedule-today-badge">Today</span>' : '') + (day.completed ? '<iconify-icon icon="solar:check-circle-bold" width="18" style="color:var(--green)"></iconify-icon>' : '') + '</div>' +
      content +
    '</div>';
  }).join('');
}

// ======================================================================
// COACH MAIN SCREEN
// ======================================================================
function initCoachMain() {
  var screen = document.querySelector('.screen-coach-main');
  if (!screen) return;

  state.coachMood = state.coachMood || 'Good';
  state.healthConnected = typeof state.healthConnected === 'boolean' ? state.healthConnected : false;

  function renderCoachPremiumState() {
    screen.classList.toggle('premium-unlocked', !!state.isPremium);
    var premiumToggle = document.getElementById('coachPremiumToggle');
    if (premiumToggle) {
      premiumToggle.classList.toggle('active', !!state.isPremium);
      premiumToggle.setAttribute('aria-pressed', state.isPremium ? 'true' : 'false');
      premiumToggle.textContent = state.isPremium ? 'Premium On' : 'Premium';
    }
    screen.querySelectorAll('.coach-premium-badge').forEach(function(badge) {
      badge.textContent = state.isPremium ? 'Unlocked' : 'Premium';
    });
    screen.querySelectorAll('[data-open-coach-chat]').forEach(function(btn) {
      btn.textContent = state.isPremium ? 'Chat with Coach' : 'Unlock Chat';
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
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.getAttribute('data-coach-tab');
      tabs.forEach(function(item) {
        var active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach(function(panel) {
        panel.classList.toggle('active', panel.getAttribute('data-coach-panel') === target);
      });
    });
  });

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

  screen.querySelectorAll('[data-coach-edge]').forEach(function(el) {
    el.addEventListener('click', function() {
      var edge = el.getAttribute('data-coach-edge');
      if (edge === 'paywall') {
        if (state.isPremium) return;
        showCoachToast('Premium unlocks deeper trends, charts, and coaching breakdowns.');
      } else if (edge === 'health') {
        showCoachToast(state.healthConnected ? 'Health data is connected.' : 'Connect Apple Health or Google Fit to replace demo data.');
      } else if (edge === 'breakdown') {
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

  if (!state.healthConnected) {
    var empty = document.getElementById('coachHealthEmpty');
    if (empty) empty.style.display = 'flex';
  }

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
    var answer = 'I am having trouble with that. Try asking about your nutrition, workouts, or recovery.';
    if (q.indexOf('nutrition') >= 0 || q.indexOf('meal') >= 0 || q.indexOf('protein') >= 0) {
      answer = 'Your protein is pacing well today. Keep dinner lean and add greens or berries to improve micronutrient coverage.';
    } else if (q.indexOf('workout') >= 0 || q.indexOf('training') >= 0 || q.indexOf('adjust') >= 0) {
      answer = 'Today supports normal training volume. If your warm-up feels heavy, reduce the first two working sets by one rep.';
    } else if (q.indexOf('recovery') >= 0 || q.indexOf('sleep') >= 0 || q.indexOf('hrv') >= 0) {
      answer = 'Recovery is good. Sleep duration is close to target, so the main focus is staying hydrated before your session.';
    }
    addCoachMessage(answer, 'coach');
  }, 900);
}

// ======================================================================
// INIT =====
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    restoreState();

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

    // Screen-specific initialization based on current page
    const currentPath = window.location.pathname;
    if (currentPath.includes('home')) {
      updateHomeGreeting();
    } else if (currentPath.includes('/coach/coach')) {
      initCoachMain();
    } else if (currentPath.endsWith('/workout/workout.html')) {
      updateHomeGreeting();
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
    } else if (currentPath.includes('coach-q6')) {
      initCoachQ6();
    } else if (currentPath.includes('coach-generating')) {
      initCoachGenerating();
    } else if (currentPath.includes('coach-review')) {
      initCoachReview();
    }
  });
}
