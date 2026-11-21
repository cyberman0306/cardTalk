import { t } from '../language'
import { ArrowRight, ArrowUpRight, Bookmark, ChevronRight, GalleryVerticalEnd, Layers2, Play, UsersRound } from 'lucide-react'
import handoffPrint from '../assets/phone-handoff.webp'
import { decks, findDeck, type Deck } from '../content/decks.ts'
import { isFinished, totalTurns, type Table } from '../game.ts'
import { DeckArt } from './DeckArt'

export function DeckLibrary({ table }: { table: Table | null }) {
  const featured = decks[0]
  return <main className="page home">
    {table && !isFinished(table) && <a className="resume" href="#table">
      <span className="resume-icon"><Play size={17} fill="currentColor" /></span>
      <span><strong>{t("진행 중인 대화", "Conversation in progress")}</strong><small>{findDeck(table.deckId)?.title} · {table.turn + 1}/{totalTurns(table)}{t("번째 차례", " turns")}</small></span>
      <span className="resume-link">{t("이어 하기 ", "Resume ")}<ChevronRight size={16} /></span>
    </a>}
    <section className="feature" aria-labelledby="feature-title">
      <div className="feature-copy">
        <span className="feature-label">{t("추천 덱 · ", "Featured · ")}{featured.title}</span>
        <h1 id="feature-title">{featured.cards[0].question}</h1>
        <p>{t("2~6명이 휴대폰 한 대를 돌려 가며 이야기해요.", "Pass one phone around a table of 2–6.")}</p>
      </div>
      <a className="button featured-button" href={'#deck/' + featured.id}>{t("이 덱 열기 ", "Open deck ")}<ArrowRight size={18} /></a>
      <img className="feature-illustration" src={handoffPrint} width={1280} height={853}
        alt={t("질문이 뜬 휴대폰을 맞은편 사람에게 건네는 두 손의 판화", "Two hands passing a phone across the table")} fetchPriority="high" />
    </section>
    <section className="deck-section" aria-labelledby="decks-title">
      <div className="section-heading">
        <h2 id="decks-title">{t("덱 고르기", "Choose a deck")}</h2>
        <span><GalleryVerticalEnd size={15} /> {decks.length}{t("개 덱 · ", " decks · ")}{decks.reduce((sum, deck) => sum + deck.cards.length, 0)}{t("장", " cards")}</span>
      </div>
      <div className="deck-grid">
        {decks.map(deck => <a className={'deck-tile theme-' + deck.id} key={deck.id} href={'#deck/' + deck.id}>
          <span className="tile-heading"><small>{deck.mood}</small><strong>{deck.title}</strong></span>
          <DeckArt id={deck.id} />
          <span className="tile-footer"><span>{deck.cards.length}{t("장", " cards")}</span><ArrowUpRight size={17} /></span>
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
    <div className="section-heading"><h1>{t("보관함", "Saved")}</h1><span><Bookmark size={15} /> {cards.length}{t("장", " cards")}</span></div>
    {cards.length ? <div className="saved-grid">{cards.map(({ deck, card }) =>
      <article key={card.id} className={'saved-card theme-' + deck.id}>
        <div className="saved-top"><span className="deck-sign"><DeckArt id={deck.id} />{deck.title}</span>
          <button className="icon-button" onClick={() => onToggle(card.id)} aria-label={card.question + t("저장 해제", " — remove bookmark")}><Bookmark size={19} fill="currentColor" /></button></div>
        <h2>{card.question}</h2>
        <details><summary>{t("꼬리 질문", "Follow-up")}</summary><p>{card.followUp}</p></details>
      </article>
    )}</div> : <div className="empty-state">
      <div className="empty-icon"><Bookmark size={28} /></div><h2>{t("아직 저장한 카드가 없어요", "Your bookmarks start here")}</h2>
      <p>{t("대화 중 다시 꺼내 보고 싶은 질문에", "Tap the bookmark on a question")}<br />{t("책갈피를 눌러 두세요.", "to find it here later.")}</p>
      <a className="button primary" href="#home">{t("덱 고르기 ", "Choose a deck ")}<ArrowRight size={17} /></a>
    </div>}
  </main>
}

export function SetupCover({ deck }: { deck: Deck }) {
  return <div className={'setup-cover theme-' + deck.id}>
    <div className="cover-top"><span>CardTalk</span><Layers2 size={18} /></div>
    <DeckArt id={deck.id} />
    <div className="cover-bottom"><span>{deck.mood}</span><h1>{deck.title}</h1>
      <p><span><Layers2 size={15} /> {deck.cards.length}{t("장", " cards")}</span><span><UsersRound size={15} /> {t("2~6명", "2–6 players")}</span></p>
    </div>
  </div>
}
