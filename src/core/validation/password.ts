export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("رمز عبور باید حداقل 8 کاراکتر باشد")
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("رمز عبور باید شامل حروف بزرگ باشد")
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("رمز عبور باید شامل حروف کوچک باشد")
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push("رمز عبور باید شامل اعداد باشد")
  }

  if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
    errors.push("رمز عبور باید شامل کاراکترهای خاص باشد")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' | 'very strong' => {
  let score = 0

  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1

  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 2

  if (score < 3) return 'weak'
  if (score < 5) return 'medium'
  if (score < 7) return 'strong'
  return 'very strong'
} 