export const validateIranianPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '')
  
  if (cleanPhone.startsWith('09') && cleanPhone.length === 11) {
    return true
  }
  
  if (cleanPhone.startsWith('989') && cleanPhone.length === 12) {
    return true
  }
  
  return false
}

export const formatIranianPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '')
  
  if (cleanPhone.startsWith('989')) {
    return `+${cleanPhone}`
  }
  
  if (cleanPhone.startsWith('09')) {
    return `+98${cleanPhone.slice(1)}`
  }
  
  return phone
} 