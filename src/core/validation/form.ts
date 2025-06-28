import { validateIranianPhone } from './phone'
import { validatePassword } from './password'
import type { AuthFormData } from '@/types/user'

export interface FormValidationResult {
  isValid: boolean
  errors: {
    phone?: string
    password?: string
    general?: string
  }
}

export const validateAuthForm = (formData: FormData): FormValidationResult => {
  const phone = formData.get("phone") as string
  const password = formData.get("password") as string
  const errors: FormValidationResult['errors'] = {}

  if (!phone) {
    errors.phone = "شماره موبایل الزامی است"
  } else if (!validateIranianPhone(phone)) {
    errors.phone = "شماره موبایل باید با 09 شروع شود و 11 رقم باشد"
  }

  const passwordValidation = validatePassword(password)
  if (!password) {
    errors.password = "رمز عبور الزامی است"
  } else if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0]
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateAuthFormData = (data: AuthFormData): FormValidationResult => {
  const errors: FormValidationResult['errors'] = {}

  if (!data.phone) {
    errors.phone = "شماره موبایل الزامی است"
  } else if (!validateIranianPhone(data.phone)) {
    errors.phone = "شماره موبایل باید با 09 شروع شود و 11 رقم باشد"
  }

  const passwordValidation = validatePassword(data.password)
  if (!data.password) {
    errors.password = "رمز عبور الزامی است"
  } else if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0]
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
} 