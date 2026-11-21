import assert from 'node:assert/strict'
import test from 'node:test'
import { decks } from '../src/content/decks.ts'
import { isFinished, newTable, play, playerOptions, restoreTable, roundOptions, swapsLeft, totalTurns } from '../src/game.ts'
import { restoreSaved } from '../src/storage.ts'

test('each deck has enough distinct questions for six people, two rounds and a swap', () => {
  const all = decks.flatMap(deck => deck.cards)
  assert.equal(new Set(all.map(card => card.id)).size, all.length)
  assert.equal(new Set(all.map(card => card.question)).size, all.length)
  assert.ok(all.every(card => card.question.endsWith('?') && card.followUp.endsWith('?')))
  for (const deck of decks) assert.equal(deck.cards.length, 20)
})

test('swapping preserves the seat and reserves a unique card for every remaining turn', () => {
  for (const deck of decks) for (const players of playerOptions) for (const rounds of roundOptions) {
    let table = newTable(deck, players, rounds)
    assert.deepEqual(new Set(table.order), new Set(deck.cards.map(card => card.id)))
    const seen = new Set()
    const seats = Array(players).fill(0)
    while (!isFinished(table)) {
      assert.equal(table.revealed, false)
      assert.equal(play(table, 'next'), table)
      table = play(table, 'reveal')
      seen.add(table.order[table.cursor])
      const turn = table.turn
      while (swapsLeft(table) > 0) {
        table = play(table, 'swap')
        assert.equal(table.turn, turn)
        assert.ok(!seen.has(table.order[table.cursor]))
        seen.add(table.order[table.cursor])
      }
      assert.equal(play(table, 'swap'), table)
      seats[table.turn % players]++
      table = play(table, 'next')
      assert.deepEqual(restoreTable(JSON.parse(JSON.stringify(table))), table)
    }
    assert.equal(seen.size, deck.cards.length)
    assert.deepEqual(seats, Array(players).fill(rounds))
    assert.equal(table.turn, totalTurns(table))
    assert.equal(play(table, 'next'), table)
  }
})

test('invalid or stale device data cannot open an unplayable table or saved card', () => {
  const table = newTable(decks[0], 4, 2)
  assert.deepEqual(restoreTable(table), table)
  for (const value of [null, {}, { ...table, players: 1 }, { ...table, turn: -1 }, { ...table, cursor: 15 },
    { ...table, order: ['retired'] }, { ...table, order: Array(16).fill(table.order[0]) }]) {
    assert.equal(restoreTable(value), null)
  }
  assert.deepEqual(restoreSaved([table.order[2], 'retired', null, table.order[2]]), [table.order[2]])
  assert.deepEqual(restoreSaved({}), [])
})
