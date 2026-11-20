import { decks } from './content/decks.ts'

export const tableKey = 'cardtalk.table.v1'
export const savedKey = 'cardtalk.saved.v1'

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

export function restoreSaved(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  const known = new Set(decks.flatMap(deck => deck.cards.map(card => card.id)))
  return [...new Set(value.filter((id): id is string => typeof id === 'string' && known.has(id)))]
}
