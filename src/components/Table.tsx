import { t } from '../language'
import { useLayoutEffect, useRef, useState, type ReactElement } from 'react'
import { ArrowLeft, ArrowRight, Bookmark, Check, ChevronDown, ChevronUp, CircleCheck, Layers2, MessageCircle, Repeat2, RotateCw, UsersRound } from 'lucide-react'
import type { Deck } from '../content/decks.ts'
import { playerOptions, roundOptions, swapsLeft, totalTurns, type Table } from '../game.ts'
import { DeckArt } from './DeckArt'
import { SetupCover } from './Library'
import { ShareInvite } from './AndroidExtras'

export function BackLink({ label = t("덱 고르기", "Choose a deck") }: { label?: string }) {
  return <a className="back-link" href="#home"><ArrowLeft size={17} /> {label}</a>
}

export function TableSetup({ deck, onStart }: { deck: Deck; onStart: (players: number, rounds: number) => void }) {
  const [players, setPlayers] = useState(4)
  const [rounds, setRounds] = useState(2)
  return <main className="page setup-page">
    <BackLink />
    <div className="setup-grid"><SetupCover deck={deck} />
      <div className="setup-controls">
        <h2>{t("대화 준비", "Set the table")}</h2><p className="intro">{deck.description}</p>
        <fieldset><legend><UsersRound size={17} /> {t("함께하는 사람", "Players")}</legend>
          <div className="segmented">{playerOptions.map(value =>
            <button key={value} aria-pressed={players === value} onClick={() => setPlayers(value)}>{value}{t("명", "")}</button>)}</div>
        </fieldset>
        <fieldset><legend><Repeat2 size={17} /> {t("몇 바퀴 돌까요?", "How many rounds?")}</legend>
          <div className="segmented">{roundOptions.map(value =>
            <button key={value} aria-pressed={rounds === value} onClick={() => setRounds(value)}>{value === 1 ? t("한 바퀴", "One round") : t("두 바퀴", "Two rounds")}</button>)}</div>
        </fieldset>
        <p className="setup-note">{t("휴대폰을 든 분부터 시계 방향으로 건네요.", "Start with whoever has the phone, then pass clockwise.")}</p>
        <button className="button primary wide" onClick={() => onStart(players, rounds)}>{t(`총 ${players * rounds}차례 시작`, `Start ${players * rounds} turns`)} <ArrowRight size={18} /></button>
      </div>
    </div>
  </main>
}

interface TablePlayProps {
  table: Table
  deck: Deck
  saved: string[]
  onToggle: (id: string) => void
  onPlay: (action: 'reveal' | 'swap' | 'next') => void
}

export function TablePlay({ table, deck, saved, onToggle, onPlay }: TablePlayProps) {
  const [followUpFor, setFollowUpFor] = useState<string | null>(null)
  const card = deck.cards.find(card => card.id === table.order[table.cursor])!
  const isSaved = saved.includes(card.id)
  const followUpOpen = followUpFor === card.id
  const round = Math.floor(table.turn / table.players) + 1
  const seat = table.turn % table.players + 1
  const isLast = table.turn + 1 === totalTurns(table)
  const canSwap = swapsLeft(table) > 0
  const [motion, setMotion] = useState<{ action: 'reveal' | 'swap' | 'next'; previous: ReactElement } | null>(null)
  const liveCard = useRef<HTMLDivElement>(null)
  const locked = useRef(false)

  useLayoutEffect(() => {
    if (!motion || !liveCard.current) return
    const node = liveCard.current
    if (motion.action !== 'swap' || document.activeElement === document.body) {
      node.querySelector<HTMLElement>(motion.action === 'next' ? '.card-back' : 'h2')?.focus({ preventScroll: true })
    }
    let active = true
    const animations = node.getAnimations()
    function settle() {
      if (active) {
        locked.current = false
        setMotion(null)
      }
    }
    if (animations.length) void Promise.allSettled(animations.map(animation => animation.finished)).then(settle)
    else settle()
    return () => { active = false }
  }, [motion])

  function act(action: 'reveal' | 'swap' | 'next') {
    if (locked.current) return
    locked.current = true
    setMotion({ action, previous: face })
    onPlay(action)
  }

  const face = table.revealed ? <article key={card.id} className="question-face">
    <div className="face-top"><span className="deck-sign"><DeckArt id={deck.id} /> {deck.title}</span>
      <button className="icon-button save" aria-pressed={isSaved} aria-label={isSaved ? t("질문 저장 해제", "Remove bookmark") : t("질문 저장", "Save question")} onClick={() => onToggle(card.id)}><Bookmark fill={isSaved ? 'currentColor' : 'none'} size={21} /></button></div>
    <div className="question-body" aria-live="polite"><h2 tabIndex={-1}>{card.question}</h2>
      {followUpOpen && <p className="follow-up">{card.followUp}</p>}</div>
    <button className="follow-button" aria-expanded={followUpOpen} onClick={() => setFollowUpFor(followUpOpen ? null : card.id)}>
      <MessageCircle size={16} /> {t("꼬리 질문 ", "Follow-up ")}{followUpOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
    </button>
  </article> : <button key={'back-' + table.turn} className="card-back" onClick={() => act('reveal')} aria-label={t(`질문 카드 뒤집기, ${seat}번 자리`, `Flip the card for seat ${seat}`)}>
    <span className="back-top"><span>CardTalk</span><Layers2 size={18} /></span>
    <DeckArt id={deck.id} />
    <span className="flip-label"><RotateCw size={17} /> {t("질문 카드 뒤집기", "Flip the card")}</span>
  </button>

  return <main className={'page table-page theme-' + deck.id}>
    <div className="table-strip"><BackLink label={t("잠시 나가기", "Pause")} /><span>{deck.title}</span></div>
    <div className="turn-heading">
      <div aria-live="polite" aria-atomic="true"><p className="turn-round">{round} / {table.rounds} {t("바퀴", table.rounds === 1 ? "round" : "rounds")}</p><h1>{t(`${seat}번 자리 차례`, `Seat ${seat}’s turn`)}</h1></div>
      <div className="seats" aria-label={t(`${table.players}명 중 ${seat}번째 자리`, `Seat ${seat} of ${table.players}`)}>{Array.from({ length: table.players }, (_, idx) =>
        <span key={idx} className={idx + 1 === seat ? 'current' : ''}>{idx + 1}</span>)}</div>
    </div>
    <div className="play-card-stack" data-motion={motion?.action}>
      {motion && <div className="card-outgoing" inert aria-hidden="true">{motion.previous}</div>}
      <div ref={liveCard} className="card-live">{face}</div>
    </div>
    {table.revealed ? <div className="play-actions">
      <button className="button secondary" disabled={!canSwap} onClick={() => act('swap')}><Repeat2 size={17} /> {t("질문 바꾸기", "Swap question")}</button>
      <button className="button primary" onClick={() => act('next')}>{isLast ? t("대화 마치기", "Finish") : t("다음 사람에게", "Pass the phone")} {isLast ? <Check size={18} /> : <ArrowRight size={18} />}</button>
      <small>
        {!canSwap && (isLast ? t("바꿀 질문을 모두 봤어요. ", "You’ve seen all the swaps. ") : t("남은 카드는 다음 자리 몫이에요. ", "The remaining cards are for the next players. "))}
        {isLast ? t("답하지 않고 마쳐도 돼요.", "You can finish without answering.") : t("답하지 않고 건네도 돼요.", "You can pass without answering.")}
      </small>
    </div> : <p className="handoff-note">{seat === 1 && table.turn === 0 ? t("휴대폰을 든 분이 첫 카드를 열어 주세요.", "Whoever has the phone opens the first card.") : t(`${seat}번 자리에 휴대폰을 건네주세요.`, `Pass the phone to seat ${seat}.`)}</p>}
  </main>
}

export function TableEnd({ table, deck, onReplay }: { table: Table; deck: Deck; onReplay: () => void }) {
  return <main className={'page end-page theme-' + deck.id}>
    <div className="end-card">
      <div className="end-art"><DeckArt id={deck.id} /></div>
      <span className="end-label"><CircleCheck size={16} /> {deck.title}</span>
      <h1>{t("모두의 차례가 끝났어요", "Everyone’s had a turn")}</h1>
      <p>{t(`${table.players}명이 ${table.rounds}바퀴 동안, 총 ${table.turn}번 차례를 나눴어요.`, `${table.players} players shared ${table.turn} turns over ${table.rounds === 1 ? "one round" : "two rounds"}.`)}</p>
      <div className="end-actions"><button className="button primary" onClick={onReplay}><RotateCw size={17} /> {t("같은 덱으로 한 판 더", "Play this deck again")}</button>
        <a className="button secondary" href="#home">{t("다른 덱 고르기 ", "Choose another deck ")}<ArrowRight size={17} /></a>
        <ShareInvite question={deck.cards[0].question} /></div>
    </div>
  </main>
}
