const EMAIL_REGEX: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export function validateEmailWithRegex(email: string): boolean {
  return EMAIL_REGEX.test(email)
}
