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
  'loading': BASE_PATH + '/screens/onboarding/loading.html',
  'reveal': BASE_PATH + '/screens/onboarding/reveal.html',
  // Home screen
  'home': BASE_PATH + '/screens/home/home.html',
  // Logbook screen
  'logbook': BASE_PATH + '/screens/logbook/logbook.html',
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
  coach: 'workout'
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

// ===== INIT =====
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    restoreState();

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
    } else if (currentPath.includes('/workout/workout')) {
      updateHomeGreeting();
    } else if (currentPath.includes('reveal')) {
      populateReveal();
    } else if (currentPath.includes('loading')) {
      startLoadingAnimation();
    } else if (currentPath.includes('conflicts')) {
      checkConflicts();
    } else if (currentPath.includes('q9')) {
      updateWeightRef();
    } else if (currentPath.includes('workout-countdown')) {
      initWorkoutCountdown();
    }
  });
}
