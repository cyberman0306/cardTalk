import { uiTranslations, type ExtraLanguage } from './i18n/ui.ts'

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es'

export const supportedLanguages: { code: Language; label: string }[] = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
]

function normalizeLanguage(raw: string | null | undefined): Language | null {
  if (!raw) return null
  const base = raw.split('-')[0].toLowerCase()
  if (base === 'ko' || base === 'en' || base === 'ja' || base === 'zh' || base === 'es') return base
  return null
}

function initialLanguage(): Language {
  if (typeof window === 'undefined') return 'ko'
  const requested = normalizeLanguage(new URL(window.location.href).searchParams.get('lang'))
  if (requested) return requested
  try {
    const saved = normalizeLanguage(localStorage.getItem('cardtalk-language'))
    if (saved) return saved
  } catch { /* Device storage is optional. */ }
  for (const locale of [...(window.navigator.languages ?? []), window.navigator.language]) {
    const matched = normalizeLanguage(locale)
    if (matched) return matched
  }
  return 'ko'
}

export let language: Language = initialLanguage()

export function t(ko: string, en: string, extra?: Partial<Record<ExtraLanguage, string>>): string {
  if (language === 'ko') return ko
  if (language === 'en') return en
  return extra?.[language] ?? uiTranslations[en]?.[language] ?? en
}

export function setLanguage(next: Language) {
  language = next
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  try {
    localStorage.setItem('cardtalk-language', language)
    url.searchParams.delete('lang')
  } catch { url.searchParams.set('lang', language) }
  if (url.href !== window.location.href) history.replaceState(history.state, '', url)
}

export function changeLanguage(next?: Language) {
  setLanguage(next ?? (language === 'ko' ? 'en' : 'ko'))
}
