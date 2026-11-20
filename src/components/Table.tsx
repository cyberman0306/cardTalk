import { useState } from 'react'
import { ArrowLeft, ArrowRight, Bookmark, Check, ChevronDown, ChevronUp, CircleCheck, Layers2, MessageCircle, Repeat2, RotateCw, UsersRound } from 'lucide-react'
import type { Deck } from '../content/decks.ts'
import { playerOptions, roundOptions, swapsLeft, totalTurns, type Table } from '../game.ts'
import { DeckArt } from './DeckArt'
import { SetupCover } from './Library'

export function BackLink({ label = '덱 고르기' }: { label?: string }) {
  return <a className="back-link" href="#home"><ArrowLeft size={17} /> {label}</a>
}

export function TableSetup({ deck, onStart }: { deck: Deck; onStart: (players: number, rounds: number) => void }) {
  const [players, setPlayers] = useState(4)
  const [rounds, setRounds] = useState(2)
  return <main className="page setup-page">
    <BackLink />
    <div className="setup-grid"><SetupCover deck={deck} />
      <div className="setup-controls">
        <h2>대화 준비</h2><p className="intro">{deck.description}</p>
        <fieldset><legend><UsersRound size={17} /> 함께하는 사람</legend>
          <div className="segmented">{playerOptions.map(value =>
            <button key={value} aria-pressed={players === value} onClick={() => setPlayers(value)}>{value}명</button>)}</div>
        </fieldset>
        <fieldset><legend><Repeat2 size={17} /> 몇 바퀴 돌까요?</legend>
          <div className="segmented">{roundOptions.map(value =>
            <button key={value} aria-pressed={rounds === value} onClick={() => setRounds(value)}>{value === 1 ? '한 바퀴' : '두 바퀴'}</button>)}</div>
        </fieldset>
        <p className="setup-note">휴대폰을 든 분부터 시계 방향으로 건네요.<br />한 사람당 {rounds}번씩, 총 {players * rounds}차례예요.</p>
        <button className="button primary wide" onClick={() => onStart(players, rounds)}>카드 섞고 시작 <ArrowRight size={18} /></button>
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
  return <main className={'page table-page theme-' + deck.id}>
    <div className="table-strip"><BackLink label="잠시 나가기" /><span>{deck.title}</span></div>
    <div className="turn-heading">
      <div aria-live="polite" aria-atomic="true"><p className="turn-round">{round} / {table.rounds} 바퀴</p><h1>{seat}번 자리 차례</h1></div>
      <div className="seats" aria-label={table.players + '명 중 ' + seat + '번째 자리'}>{Array.from({ length: table.players }, (_, idx) =>
        <span key={idx} className={idx + 1 === seat ? 'current' : ''}>{idx + 1}</span>)}</div>
    </div>
    <div className="play-card-stack">
      {table.revealed ? <article key={card.id} className="question-face face-in">
        <div className="face-top"><span className="deck-sign"><DeckArt id={deck.id} /> {deck.title}</span>
          <button className="icon-button save" aria-pressed={isSaved} aria-label={isSaved ? '질문 저장 해제' : '질문 저장'} onClick={() => onToggle(card.id)}><Bookmark fill={isSaved ? 'currentColor' : 'none'} size={21} /></button></div>
        <div className="question-body" aria-live="polite"><h2>{card.question}</h2>
          {followUpOpen && <p className="follow-up" id="follow-up">{card.followUp}</p>}</div>
        <button className="follow-button" aria-expanded={followUpOpen} onClick={() => setFollowUpFor(followUpOpen ? null : card.id)}>
          <MessageCircle size={16} /> 꼬리 질문 {followUpOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </article> : <button key={'back-' + table.turn} className="card-back face-in" onClick={() => onPlay('reveal')} aria-label={'질문 카드 뒤집기, ' + seat + '번 자리'}>
        <span className="back-top"><span>CardTalk</span><Layers2 size={18} /></span>
        <DeckArt id={deck.id} />
        <span className="flip-label"><RotateCw size={17} /> 질문 카드 뒤집기</span>
      </button>}
    </div>
    {table.revealed ? <div className="play-actions">
      <button className="button secondary" disabled={swapsLeft(table) === 0} onClick={() => onPlay('swap')}><Repeat2 size={17} /> 질문 바꾸기</button>
      <button className="button primary" onClick={() => onPlay('next')}>{isLast ? '대화 마치기' : '다음 차례'} {isLast ? <Check size={18} /> : <ArrowRight size={18} />}</button>
      {swapsLeft(table) === 0 && <small>남은 카드는 다음 차례를 위해 남겨 뒀어요. 답하지 않고 넘겨도 돼요.</small>}
    </div> : <p className="handoff-note">{seat === 1 && table.turn === 0 ? '휴대폰을 든 분이 첫 카드를 열어 주세요.' : seat + '번 자리에 휴대폰을 건네주세요.'}</p>}
  </main>
}

export function TableEnd({ table, deck, onReplay }: { table: Table; deck: Deck; onReplay: () => void }) {
  return <main className={'page end-page theme-' + deck.id}>
    <div className="end-card">
      <div className="end-art"><DeckArt id={deck.id} /></div>
      <span className="end-label"><CircleCheck size={16} /> {deck.title}</span>
      <h1>모두의 차례가 끝났어요</h1>
      <p>{table.players}명이 {table.rounds}바퀴 동안, 총 {table.turn}번 차례를 나눴어요.</p>
      <div className="end-actions"><button className="button primary" onClick={onReplay}><RotateCw size={17} /> 같은 덱으로 한 판 더</button>
        <a className="button secondary" href="#home">다른 덱 고르기 <ArrowRight size={17} /></a></div>
    </div>
  </main>
}
