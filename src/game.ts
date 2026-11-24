import { findDeck, type Deck, type DeckId } from './content/decks.ts'

export interface Table {
  deckId: DeckId
  players: number
  rounds: number
  order: string[]
  turn: number
  cursor: number
  revealed: boolean
}

export const playerOptions = [2, 3, 4, 5, 6]
export const roundOptions = [1, 2]

export function newTable(deck: Deck, players: number, rounds: number): Table {
  if (!playerOptions.includes(players) || !roundOptions.includes(rounds) || deck.cards.length < players * rounds) {
    throw new Error('이 인원과 바퀴 수로 시작할 수 없어요.')
  }
  const order = deck.cards.map(card => card.id)
  for (let end = order.length - 1; end > 0; end--) {
    const pick = Math.floor(Math.random() * (end + 1))
    const last = order[end]
    order[end] = order[pick]
    order[pick] = last
  }
  return { deckId: deck.id, players, rounds, order, turn: 0, cursor: 0, revealed: false }
}

export function totalTurns(table: Table) {
  return table.players * table.rounds
}

export function isFinished(table: Table) {
  return table.turn === totalTurns(table)
}

// Keep one unused question for each remaining seat, including the current one.
export function swapsLeft(table: Table) {
  return table.order.length - table.cursor - (totalTurns(table) - table.turn)
}

export function play(table: Table, action: 'reveal' | 'swap' | 'next'): Table {
  if (isFinished(table)) return table
  if (action === 'reveal') return { ...table, revealed: true }
  if (!table.revealed) return table
  if (action === 'swap') {
    return swapsLeft(table) > 0 ? { ...table, cursor: table.cursor + 1 } : table
  }
  return { ...table, turn: table.turn + 1, cursor: table.cursor + 1, revealed: false }
}

function isInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value)
}

// A previous app version may have shuffled cards that no longer exist.
export function restoreTable(value: unknown, extraDecks: Deck[] = []): Table | null {
  if (!value || typeof value !== 'object') return null
  const { deckId, players, rounds, turn, cursor, order, revealed } = value as Record<string, unknown>
  const deck = typeof deckId === 'string' ? findDeck(deckId, extraDecks) : undefined
  if (!deck || !isInteger(players) || !playerOptions.includes(players) ||
      !isInteger(rounds) || !roundOptions.includes(rounds) || typeof revealed !== 'boolean') return null
  if (!isInteger(turn) || turn < 0 || turn > players * rounds || !isInteger(cursor) || cursor < turn) return null
  if (!Array.isArray(order) || new Set(order).size !== order.length ||
      !order.every(id => deck.cards.some(card => card.id === id))) return null
  const table = { deckId: deck.id, players, rounds, turn, cursor, order, revealed }
  return swapsLeft(table) >= 0 ? table : null
}
