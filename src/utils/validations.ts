export const isValidMonth = (month: number) =>
  /^[0-9]{1,2}$/.test(String(month)) && month > 0 && +month < 13

export const isValidYear = (year: number) => /^[0-9]{4}$/.test(String(year))

export function validaMaxLength(claimer: string): boolean {
  return claimer.length < 22
}

export function validaMinLength(claimer: string): boolean {
  return claimer.length >= 3
}
