// ─── Primitive helpers ────────────────────────────────────────────────────────

/**
 * Returns true when the value is a non-empty string after trimming.
 */
export function isRequired(value) {
  return String(value ?? '').trim().length > 0;
}

/**
 * Returns true when the string looks like a valid e-mail address.
 */
export function isValidEmail(value) {
  return /\S+@\S+\.\S+/.test(String(value ?? '').trim());
}

/**
 * Returns true when the string meets the minimum length requirement.
 * @param {string} value
 * @param {number} [minLength=6]
 */
export function isMinLength(value, minLength = 6) {
  return String(value ?? '').trim().length >= minLength;
}

/**
 * Returns true when two values are strictly equal (used for confirm-password).
 */
export function isMatching(value, reference) {
  return value === reference;
}

/**
 * Returns true when the value is a positive integer or zero.
 */
export function isPositiveNumber(value) {
  const num = Number(value);
  return !isNaN(num) && num >= 0;
}

// ─── Form-level validators ────────────────────────────────────────────────────

/**
 * Validates the login form.
 * @param {{ email: string, password: string }} formData
 * @returns {Record<string, string>} errors – empty object means valid
 */
export function validateLogin(formData) {
  const errors = {};

  if (!isRequired(formData.email)) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!isRequired(formData.password)) {
    errors.password = 'Password is required.';
  } else if (!isMinLength(formData.password, 6)) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

/**
 * Validates the registration form.
 * @param {{ name: string, email: string, password: string, confirmPassword: string }} formData
 * @returns {Record<string, string>}
 */
export function validateRegister(formData) {
  const errors = {};

  if (!isRequired(formData.name)) {
    errors.name = 'Full name is required.';
  }

  if (!isRequired(formData.email)) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!isRequired(formData.password)) {
    errors.password = 'Password is required.';
  } else if (!isMinLength(formData.password, 6)) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (!isRequired(formData.confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (!isMatching(formData.confirmPassword, formData.password)) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

/**
 * Validates the user profile form.
 * @param {object} formData
 * @returns {Record<string, string>}
 */
export function validateProfile(formData) {
  const errors = {};

  if (!isRequired(formData.fullName)) {
    errors.fullName = 'Full name is required.';
  }

  if (!isRequired(formData.age)) {
    errors.age = 'Age is required.';
  } else if (!isPositiveNumber(formData.age) || Number(formData.age) < 1 || Number(formData.age) > 120) {
    errors.age = 'Enter a valid age between 1 and 120.';
  }

  if (!isRequired(formData.state)) {
    errors.state = 'State is required.';
  }

  if (!isRequired(formData.education)) {
    errors.education = 'Education level is required.';
  }

  if (!isRequired(formData.occupation)) {
    errors.occupation = 'Occupation is required.';
  }

  if (!isRequired(formData.annualIncome)) {
    errors.annualIncome = 'Annual income is required.';
  } else if (!isPositiveNumber(formData.annualIncome)) {
    errors.annualIncome = 'Enter a valid income amount (numbers only).';
  }

  return errors;
}
