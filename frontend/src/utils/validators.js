export function validateEmail(email) {
  if (!email) return 'Email is required'
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) return 'Invalid email address'
  return null
}

export function validatePassword(password) {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter'
  if (!/[0-9]/.test(password)) return 'Password must contain a number'
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain a special character'
  return null
}

export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`
  }
  return null
}

export function validateCEFR(level) {
  const valid = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  if (!valid.includes(level)) return 'Invalid CEFR level'
  return null
}

export function getFormErrors(fields, validations) {
  const errors = {}
  validations.forEach(({ field, validate }) => {
    const error = validate(fields[field])
    if (error) errors[field] = error
  })
  return errors
}
