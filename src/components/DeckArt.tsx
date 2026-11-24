import type { DeckTheme } from '../content/decks.ts'

export function DeckArt({ id }: { id: DeckTheme }) {
  const isCustom = id !== 'hello' && id !== 'taste' && id !== 'daily' && id !== 'closer'
  return (
    <span className={'art art-' + (isCustom ? 'custom' : id)} aria-hidden="true">
      {id === 'taste' && <span className="checker" />}
      {id === 'daily' && <span className="arches" />}
      {id === 'closer' && <span className="petals"><i /><i /><i /><i /></span>}
      {isCustom && <span className="custom-mark"><i /><i /></span>}
    </span>
  )
}
