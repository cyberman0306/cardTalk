import test from 'node:test'
import assert from 'node:assert/strict'
import { decks } from '../src/content/decks.ts'
import { changeLanguage, setLanguage, supportedLanguages } from '../src/language.ts'

test('switching locale translates every deck and card across all supported languages and preserves every ID', t => {
  const snapshot = () => decks.map(({ id, title, mood, description, cards }) => ({
    id, title, mood, description, cards: cards.map(card => ({ ...card })),
  }))
  const ko = snapshot()
  globalThis.window = { location: { href: 'http://localhost/#table' } }
  const preference = new Map()
  globalThis.localStorage = { setItem: (key, value) => preference.set(key, value) }
  t.after(() => {
    setLanguage('ko')
    delete globalThis.window
    delete globalThis.localStorage
  })

  changeLanguage()
  assert.equal(preference.get('cardtalk-language'), 'en')

  for (const { code } of supportedLanguages) {
    if (code === 'ko') continue
    setLanguage(code)
    assert.equal(preference.get('cardtalk-language'), code)
    const localized = snapshot()
    assert.equal(localized.length, 4)
    for (const [index, deck] of localized.entries()) {
      const original = ko[index]
      assert.equal(deck.id, original.id)
      for (const field of ['title', 'mood', 'description']) {
        assert.ok(deck[field].length > 0)
        assert.notEqual(deck[field], original[field])
      }
      assert.equal(deck.cards.length, 20)
      for (const [i, card] of deck.cards.entries()) {
        assert.equal(card.id, original.cards[i].id)
        assert.ok(card.question.length > 0 && card.followUp.length > 0)
        assert.notEqual(card.question, original.cards[i].question)
        assert.notEqual(card.followUp, original.cards[i].followUp)
      }
    }
  }
})
