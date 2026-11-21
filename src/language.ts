export type Language = 'ko' | 'en'

function initialLanguage(): Language {
  if (typeof window === 'undefined') return 'ko'
  const requested = new URL(window.location.href).searchParams.get('lang')
  if (requested === 'ko' || requested === 'en') return requested
  try {
    const saved = localStorage.getItem('cardtalk-language')
    if (saved === 'en' || saved === 'ko') return saved
  } catch { /* Device storage is optional. */ }
  return window.navigator.language.startsWith('en') ? 'en' : 'ko'
}

export const language = initialLanguage()
export const t = (ko: string, en: string) => language === 'en' ? en : ko
export function changeLanguage() {
  const next = language === 'ko' ? 'en' : 'ko'
  const url = new URL(window.location.href)
  try {
    localStorage.setItem('cardtalk-language', next)
    url.searchParams.delete('lang')
  } catch { url.searchParams.set('lang', next) }
  if (url.href === window.location.href) window.location.reload()
  else window.location.replace(url.href)
}
if (typeof document !== 'undefined') {
  document.documentElement.lang = language
  if (language === 'en') document.title = 'CardTalk · Conversation cards'
}
