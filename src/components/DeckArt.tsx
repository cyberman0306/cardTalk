import type { DeckId } from '../content/decks.ts'

export function DeckArt({ id }: { id: DeckId }) {
  return (
    <span className={'art art-' + id} aria-hidden="true">
      {id === 'hello' && <span className="sun">
        {[0, 30, 60, 90, 120, 150].map(angle =>
          <i key={angle} style={{ transform: 'rotate(' + angle + 'deg)' }} />)}
        <b className="eyes" />
      </span>}
      {id === 'taste' && <span className="checker" />}
      {id === 'daily' && <span className="arches" />}
      {id === 'closer' && <span className="petals"><i /><i /><i /><i /></span>}
    </span>
  )
}
