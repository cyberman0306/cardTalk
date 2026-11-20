import { ArrowRight, ArrowUpRight, Bookmark, ChevronRight, GalleryVerticalEnd, Layers2, Play, Sparkles, UsersRound } from 'lucide-react'
import { decks, findDeck, type Deck } from '../content/decks.ts'
import { isFinished, totalTurns, type Table } from '../game.ts'
import { DeckArt } from './DeckArt'

export function DeckLibrary({ table }: { table: Table | null }) {
  const featured = decks[0]
  return <main className="page home">
    {table && !isFinished(table) && <a className="resume" href="#table">
      <span className="resume-icon"><Play size={17} fill="currentColor" /></span>
      <span><strong>진행 중인 대화</strong><small>{findDeck(table.deckId)?.title} · {table.turn + 1}/{totalTurns(table)}번째 차례</small></span>
      <span className="resume-link">이어 하기 <ChevronRight size={16} /></span>
    </a>}
    <section className="feature" aria-labelledby="feature-title">
      <div className="feature-copy">
        <span className="feature-label"><Sparkles size={15} /> 추천 덱</span>
        <h1 id="feature-title">{featured.title}</h1>
        <p>{featured.description}</p>
        <a className="button featured-button" href={'#deck/' + featured.id}>이 덱으로 시작 <ArrowRight size={18} /></a>
      </div>
      <img className="feature-photo" src="/images/card-table.jpg" alt="" fetchPriority="high" />
    </section>
    <section className="deck-section" aria-labelledby="decks-title">
      <div className="section-heading">
        <h2 id="decks-title">덱 고르기</h2>
        <span><GalleryVerticalEnd size={15} /> {decks.length}개 덱 · {decks.reduce((sum, deck) => sum + deck.cards.length, 0)}장</span>
      </div>
      <div className="deck-grid">
        {decks.map(deck => <a className={'deck-tile theme-' + deck.id} key={deck.id} href={'#deck/' + deck.id}>
          <div className="tile-print"><DeckArt id={deck.id} /><span className="tile-count"><Layers2 size={13} /> {deck.cards.length}장</span></div>
          <div className="tile-caption"><span><small>{deck.mood}</small><strong>{deck.title}</strong></span><ArrowUpRight size={19} /></div>
        </a>)}
      </div>
    </section>
  </main>
}

export function SavedCards({ ids, onToggle }: { ids: string[]; onToggle: (id: string) => void }) {
  const cards = ids.flatMap(id => {
    for (const deck of decks) {
      const card = deck.cards.find(item => item.id === id)
      if (card) return [{ deck, card }]
    }
    return []
  })
  return <main className="page saved-page">
    <div className="section-heading"><h1>보관함</h1><span><Bookmark size={15} /> {cards.length}장</span></div>
    {cards.length ? <div className="saved-grid">{cards.map(({ deck, card }) =>
      <article key={card.id} className={'saved-card theme-' + deck.id}>
        <div className="saved-top"><span className="deck-sign"><DeckArt id={deck.id} />{deck.title}</span>
          <button className="icon-button" onClick={() => onToggle(card.id)} aria-label={card.question + ' 저장 해제'}><Bookmark size={19} fill="currentColor" /></button></div>
        <h2>{card.question}</h2>
        <details><summary>꼬리 질문</summary><p>{card.followUp}</p></details>
      </article>
    )}</div> : <div className="empty-state">
      <div className="empty-icon"><Bookmark size={28} /></div><h2>아직 저장한 카드가 없어요</h2>
      <p>대화 중 다시 꺼내 보고 싶은 질문에<br />책갈피를 눌러 두세요.</p>
      <a className="button primary" href="#home">덱 고르기 <ArrowRight size={17} /></a>
    </div>}
  </main>
}

export function SetupCover({ deck }: { deck: Deck }) {
  return <div className={'setup-cover theme-' + deck.id}>
    <div className="cover-top"><span>CardTalk</span><Layers2 size={18} /></div>
    <DeckArt id={deck.id} />
    <div className="cover-bottom"><span>{deck.mood}</span><h1>{deck.title}</h1>
      <p><span><Layers2 size={15} /> {deck.cards.length}장</span><span><UsersRound size={15} /> 2~6명</span></p>
    </div>
  </div>
}
