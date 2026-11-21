import type { DeckId } from '../content/decks.ts'

export function DeckArt({ id }: { id: DeckId }) {
  return (
    <span className={'art art-' + id} aria-hidden="true">
      {id === 'taste' && <span className="checker" />}
      {id === 'daily' && <span className="arches" />}
      {id === 'closer' && <span className="petals"><i /><i /><i /><i /></span>}
    </span>
  )
}
