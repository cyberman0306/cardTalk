import { t } from '../language'
import { ArrowRight, ArrowUpRight, Bookmark, ChevronRight, GalleryVerticalEnd, Layers2, Play, Plus, Sparkles, UsersRound } from 'lucide-react'
import { decks, deckTheme, findDeck, type Deck } from '../content/decks.ts'
import { isFinished, totalTurns, type Table } from '../game.ts'
import { DeckArt } from './DeckArt'

export function DeckLibrary({ table, customDecks }: { table: Table | null; customDecks: Deck[] }) {
  const featured = decks[0]
  return <main className="page home">
    {table && !isFinished(table) && <a className="resume" href="#table">
      <span className="resume-icon"><Play size={17} fill="currentColor" /></span>
      <span><strong>{t("진행 중인 대화", "Conversation in progress")}</strong><small>{findDeck(table.deckId, customDecks)?.title} · {table.turn + 1}/{totalTurns(table)}{t("번째 차례", " turns")}</small></span>
      <span className="resume-link">{t("이어 하기 ", "Resume ")}<ChevronRight size={16} /></span>
    </a>}
    <section className="feature" aria-labelledby="feature-title">
      <div className="feature-copy">
        <span className="feature-label">{t("추천 덱 · ", "Featured · ")}{featured.title}</span>
        <h1 id="feature-title">{featured.cards[0].question}</h1>
        <p>{t("2~6명이 휴대폰 한 대를 돌려 가며 이야기해요.", "Pass one phone around a table of 2–6.")}</p>
      </div>
      <a className="button featured-button" href={'#deck/' + featured.id}>{t("이 덱 열기 ", "Open deck ")}<ArrowRight size={18} /></a>
      <div className="feature-cards" aria-hidden="true">
        <div className="hero-card hero-card-back theme-closer"><DeckArt id="closer" /></div>
        <div className="hero-card hero-card-mid theme-daily"><DeckArt id="daily" /></div>
        <div className="hero-card hero-card-front theme-taste">
          <span className="hero-card-top"><span>CardTalk</span><Layers2 size={15} /></span>
          <DeckArt id="taste" />
          <span className="hero-card-dots"><i /><i /><i /></span>
        </div>
      </div>
    </section>
    <section className="deck-section" aria-labelledby="decks-title">
      <div className="section-heading">
        <h2 id="decks-title">{t("덱 고르기", "Choose a deck")}</h2>
        <span><GalleryVerticalEnd size={15} /> {decks.length}{t("개 덱 · ", " decks · ")}{decks.reduce((sum, deck) => sum + deck.cards.length, 0)}{t("장", " cards")}</span>
      </div>
      <div className="deck-grid">
        {decks.map(deck => <a className={'deck-tile theme-' + deckTheme(deck)} key={deck.id} href={'#deck/' + deck.id}>
          <span className="tile-heading"><small>{deck.mood}</small><strong>{deck.title}</strong></span>
          <DeckArt id={deckTheme(deck)} />
          <span className="tile-footer"><span>{deck.cards.length}{t("장", " cards")}</span><ArrowUpRight size={17} /></span>
        </a>)}
      </div>
    </section>
    <section className="deck-section custom-section" aria-labelledby="custom-decks-title">
      <div className="section-heading">
        <h2 id="custom-decks-title">{t("커스텀 카드팩", "Custom packs")}</h2>
        <span><Sparkles size={15} /> {customDecks.length ? `${customDecks.length}${t("개 팩 · ", customDecks.length === 1 ? " pack · " : " packs · ", { ja: 'パック · ', zh: '个卡牌包 · ', es: customDecks.length === 1 ? ' mazo · ' : ' mazos · ' })}${customDecks.reduce((sum, deck) => sum + deck.cards.length, 0)}${t("장", " cards")}` : t("직접 만들기", "Make your own")}</span>
      </div>
      {customDecks.length > 0 ? (
        <div className="deck-grid">
          {customDecks.map(deck => <a className={'deck-tile theme-' + deckTheme(deck)} key={deck.id} href={'#deck/' + deck.id}>
            <span className="tile-heading"><small>{deck.mood || t('커스텀', 'Custom')}</small><strong>{deck.title}</strong></span>
            <DeckArt id={deckTheme(deck)} />
            <span className="tile-footer"><span>{deck.cards.length}{t("장", deck.cards.length === 1 ? " card" : " cards")}</span><ArrowUpRight size={17} /></span>
          </a>)}
          <a className="deck-tile add-tile" href="#custom/new">
            <span className="tile-heading"><small>{t("커스텀 모드", "Custom mode")}</small><strong>{t("새 카드팩", "New pack")}</strong></span>
            <span className="add-tile-icon" aria-hidden="true"><Plus size={34} /></span>
            <span className="tile-footer"><span>{t("질문 직접 쓰기", "Write questions")}</span><ArrowUpRight size={17} /></span>
          </a>
        </div>
      ) : (
        <div className="custom-banner">
          <div className="custom-banner-copy">
            <strong>{t("우리 모임만의 질문으로 카드팩을 만들어 보세요", "Create a card pack for your own table")}</strong>
            <p>{t("친구, 팀, 가족과 나누고 싶은 질문을 2장 이상 적으면 바로 플레이할 수 있어요.", "Add two or more questions for friends, family, or teammates and start playing right away.")}</p>
          </div>
          <a className="button primary" href="#custom/new"><Plus size={18} /> {t("카드팩 만들기", "Create a pack")}</a>
        </div>
      )}
    </section>
  </main>
}

export function SavedCards({ ids, customDecks, onToggle }: { ids: string[]; customDecks: Deck[]; onToggle: (id: string) => void }) {
  const allDecks = [...decks, ...customDecks]
  const cards = ids.flatMap(id => {
    for (const deck of allDecks) {
      const card = deck.cards.find(item => item.id === id)
      if (card) return [{ deck, card }]
    }
    return []
  })
  return <main className="page saved-page">
    <div className="section-heading"><h1>{t("보관함", "Saved")}</h1><span><Bookmark size={15} /> {cards.length}{t("장", cards.length === 1 ? " card" : " cards")}</span></div>
    {cards.length ? <div className="saved-grid">{cards.map(({ deck, card }) =>
      <article key={card.id} className={'saved-card theme-' + deckTheme(deck)}>
        <div className="saved-top"><span className="deck-sign"><DeckArt id={deckTheme(deck)} />{deck.title}</span>
          <button className="icon-button" onClick={() => onToggle(card.id)} aria-label={card.question + t(" — 저장 해제", " — remove bookmark")}><Bookmark size={19} fill="currentColor" /></button></div>
        <h2>{card.question}</h2>
        {card.followUp && <details><summary>{t("꼬리 질문", "Follow-up")}</summary><p>{card.followUp}</p></details>}
      </article>
    )}</div> : <div className="empty-state">
      <div className="empty-icon"><Bookmark size={28} /></div><h2>{t("아직 저장한 카드가 없어요", "Your bookmarks start here")}</h2>
      <p>{t("대화 중 다시 꺼내 보고 싶은 질문에", "Tap the bookmark on a question")}<br />{t("책갈피를 눌러 두세요.", "to find it here later.")}</p>
      <a className="button primary" href="#home">{t("덱 고르기 ", "Choose a deck ")}<ArrowRight size={17} /></a>
    </div>}
  </main>
}

export function SetupCover({ deck }: { deck: Deck }) {
  const maxPlayers = Math.min(6, deck.cards.length)
  return <div className={'setup-cover theme-' + deckTheme(deck)}>
    <div className="cover-top"><span>CardTalk</span><Layers2 size={18} /></div>
    <DeckArt id={deckTheme(deck)} />
    <div className="cover-bottom"><span>{deck.mood || t('커스텀', 'Custom')}</span><h1>{deck.title}</h1>
      <p><span><Layers2 size={15} /> {deck.cards.length}{t("장", " cards")}</span><span><UsersRound size={15} /> {maxPlayers === 2 ? t("2명", "2 players") : t(`2~${maxPlayers}명`, `2–${maxPlayers} players`, { ja: `2〜${maxPlayers}人`, zh: `2～${maxPlayers}人`, es: `2–${maxPlayers} jugadores` })}</span></p>
    </div>
  </div>
}
