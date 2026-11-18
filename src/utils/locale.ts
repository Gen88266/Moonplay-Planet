export const locales = ['tw', 'ko', 'en'] as const
export type Locale = (typeof locales)[number]

const storageKey = 'moonplay-locale'

export function normalizeLocale(value: string | null): Locale | null {
  if (!value) return null
  if (value.toLowerCase() === 'zh-tw') return 'tw'
  const code = value.toLowerCase().split('-')[0]
  return locales.find((locale) => locale === code) ?? null
}

export function initialLocale(): Locale {
  if (typeof window === 'undefined') return 'tw'
  const query = new URLSearchParams(window.location.search).get('language')
  return normalizeLocale(query) ?? normalizeLocale(window.localStorage.getItem(storageKey)) ?? 'tw'
}

export function persistLocale(locale: Locale): void {
  window.localStorage.setItem(storageKey, locale)
  document.documentElement.lang = locale === 'tw' ? 'zh-Hant' : locale
}
