
const STORAGE_KEY = "accesspath-scholarship-form";

export function saveForm(formData) {
  try {
    if (
      !formData ||
      typeof formData !== "object" ||
      Array.isArray(formData)
    ) {
      return false;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    return true;
  } catch (error) {
    console.error("Unable to save form data:", error);
    return false;
  }
}

export function loadForm() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) return null;

    const parsedData = JSON.parse(savedData);

    if (
      !parsedData ||
      typeof parsedData !== "object" ||
      Array.isArray(parsedData)
    ) {
      return null;
    }

    return parsedData;
  } catch (error) {
    console.error("Unable to load form data:", error);
    return null;
  }
}

export function clearForm() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Unable to clear form data:", error);
    return false;
  }
}

// Alternative names for compatibility with other components.
export const saveFormData = saveForm;
export const loadFormData = loadForm;
export const clearFormData = clearForm;
