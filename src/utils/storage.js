
const STORAGE_KEYS = {
  form: "accesspath-form",
  preferences: "accesspath-preferences",
  progress: "accesspath-progress",
};

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function saveForm(formData) {
  localStorage.setItem(STORAGE_KEYS.form, JSON.stringify(formData));
}

export function loadForm() {
  return readJSON(STORAGE_KEYS.form, {});
}

export function savePreferences(preferences) {
  localStorage.setItem(
    STORAGE_KEYS.preferences,
    JSON.stringify(preferences)
  );
}

export function loadPreferences() {
  return readJSON(STORAGE_KEYS.preferences, {
    textSize: "normal",
    highContrast: false,
  });
}

export function saveProgress(progress) {
  localStorage.setItem(
    STORAGE_KEYS.progress,
    JSON.stringify(progress)
  );
}

export function loadProgress() {
  return readJSON(STORAGE_KEYS.progress, {
    step: 0,
    submitted: false,
  });
}

export function clearApplicationData() {
  localStorage.removeItem(STORAGE_KEYS.form);
  localStorage.removeItem(STORAGE_KEYS.progress);
}
