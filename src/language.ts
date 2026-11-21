export type Language = 'ko' | 'en'

function initialLanguage(): Language {
  if (typeof window === 'undefined') return 'ko'
  const requested = new URL(window.location.href).searchParams.get('lang')
  if (requested === 'ko' || requested === 'en') return requested
  try {
    const saved = localStorage.getItem('cardtalk-language')
    if (saved === 'en' || saved === 'ko') return saved
  } catch { /* Device storage is optional. */ }
  for (const locale of [...(window.navigator.languages ?? []), window.navigator.language]) {
    const base = locale?.split('-')[0].toLowerCase()
    if (base === 'en' || base === 'ko') return base
  }
  return 'ko'
}

export let language = initialLanguage()
export const t = (ko: string, en: string) => language === 'en' ? en : ko
export function changeLanguage() {
  language = language === 'ko' ? 'en' : 'ko'
  const url = new URL(window.location.href)
  try {
    localStorage.setItem('cardtalk-language', language)
    url.searchParams.delete('lang')
  } catch { url.searchParams.set('lang', language) }
  if (url.href !== window.location.href) history.replaceState(history.state, '', url)
}
