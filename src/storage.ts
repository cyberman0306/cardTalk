import { decks, type CustomDeckTheme, type Deck, type QuestionCard } from './content/decks.ts'

export const tableKey = 'cardtalk.table.v1'
export const savedKey = 'cardtalk.saved.v1'
export const customDecksKey = 'cardtalk.custom-decks.v1'

export const customDeckThemes: CustomDeckTheme[] = ['terracotta', 'sage', 'cobalt', 'plum', 'ochre']

export function readLocal(key: string): unknown {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? null : JSON.parse(raw)
  } catch {
    return null
  }
}

export function writeLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function restoreCustomDecks(value: unknown): Deck[] {
  if (!Array.isArray(value)) return []
  const seenDecks = new Set<string>()
  const result: Deck[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') continue
    const { id, title, mood, description, theme, cards } = item as Record<string, unknown>
    if (typeof id !== 'string' || !id.startsWith('custom-') || seenDecks.has(id)) continue
    if (typeof title !== 'string' || !title.trim()) continue
    if (!Array.isArray(cards)) continue
    const seenCards = new Set<string>()
    const validCards: QuestionCard[] = []
    for (const card of cards) {
      if (!card || typeof card !== 'object') continue
      const { id: cardId, question, followUp } = card as Record<string, unknown>
      if (typeof cardId !== 'string' || !cardId || seenCards.has(cardId)) continue
      if (typeof question !== 'string' || !question.trim()) continue
      seenCards.add(cardId)
      validCards.push({
        id: cardId,
        question: question.trim(),
        followUp: typeof followUp === 'string' ? followUp.trim() : '',
      })
    }
    if (validCards.length < 2) continue
    seenDecks.add(id)
    const validTheme: CustomDeckTheme = typeof theme === 'string' && customDeckThemes.includes(theme as CustomDeckTheme)
      ? (theme as CustomDeckTheme)
      : 'terracotta'
    result.push({
      id,
      title: title.trim(),
      mood: typeof mood === 'string' ? mood.trim() : '',
      description: typeof description === 'string' ? description.trim() : '',
      theme: validTheme,
      custom: true,
      cards: validCards,
    })
  }
  return result
}

export function restoreSaved(value: unknown, extraDecks: Deck[] = []): string[] {
  if (!Array.isArray(value)) return []
  const known = new Set([...decks, ...extraDecks].flatMap(deck => deck.cards.map(card => card.id)))
  return [...new Set(value.filter((id): id is string => typeof id === 'string' && known.has(id)))]
}
