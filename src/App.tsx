import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { App as NativeApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { ArrowRight, Bookmark, CircleHelp, Layers2, MessageCircle, Repeat2, UsersRound, X } from 'lucide-react'
import { findDeck, type Deck } from './content/decks.ts'
import { isFinished, newTable, play, restoreTable, type Table } from './game.ts'
import { readLocal, restoreSaved, savedKey, tableKey, writeLocal } from './storage.ts'
import { DeckLibrary, SavedCards } from './components/Library'
import { TableEnd, TablePlay, TableSetup } from './components/Table'

function subscribeRoute(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function Dialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const node = ref.current!
    node.showModal()
    return () => node.close()
  }, [])
  return <dialog ref={ref} aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); onClose() }}>
    <div className="dialog-heading"><h2 id="dialog-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="닫기"><X size={19} /></button></div>
    {children}
  </dialog>
}

interface Setup { deck: Deck; players: number; rounds: number }

export function App() {
  const route = useSyncExternalStore(subscribeRoute, () => window.location.hash.slice(1) || 'home')
  const [table, setTable] = useState<Table | null>(() => restoreTable(readLocal(tableKey)))
  const [saved, setSaved] = useState(() => restoreSaved(readLocal(savedKey)))
  const [help, setHelp] = useState(false)
  const [replacement, setReplacement] = useState<Setup | null>(null)
  const [storageIssue, setStorageIssue] = useState(false)
  const setupDeck = route.startsWith('deck/') ? findDeck(route.slice(5)) : undefined
  const tableDeck = table && findDeck(table.deckId)
  const playing = route === 'table' && table && tableDeck
  const library = !playing && !setupDeck && route !== 'saved'

  useEffect(() => {
    if (!writeLocal(tableKey, table)) setStorageIssue(true)
  }, [table])
  useEffect(() => {
    if (!writeLocal(savedKey, saved)) setStorageIssue(true)
  }, [saved])
  useEffect(() => {
    setHelp(false)
    setReplacement(null)
    window.scrollTo(0, 0)
    const main = document.querySelector('main')
    if (main) {
      main.tabIndex = -1
      main.focus({ preventScroll: true })
    }
  }, [route])

  useEffect(() => {
    if (Capacitor.getPlatform() !== 'android') return
    const listener = NativeApp.addListener('backButton', () => {
      if (help) setHelp(false)
      else if (replacement) setReplacement(null)
      else if (!library) window.location.hash = 'home'
      else void NativeApp.minimizeApp()
    })
    return () => { void listener.then(handle => handle.remove()) }
  }, [help, replacement, library])

  function start({ deck, players, rounds }: Setup) {
    setTable(newTable(deck, players, rounds))
    setReplacement(null)
    window.location.hash = 'table'
    window.scrollTo(0, 0)
  }

  function requestStart(setup: Setup) {
    if (table && !isFinished(table)) setReplacement(setup)
    else start(setup)
  }

  function toggleSaved(id: string) {
    setSaved(previous => previous.includes(id) ? previous.filter(item => item !== id) : [id, ...previous])
  }

  return <>
    <header className="site-header"><div className="header-inner">
      <a className="brand" href="#home" aria-label="CardTalk 홈"><img src="/app-icon.png" width="34" height="34" alt="" />CardTalk</a>
      <nav aria-label="메인 메뉴">
        <a href="#home" className="home-nav" aria-current={library ? 'page' : undefined}><Layers2 /> 덱 고르기</a>
        <a href="#saved" aria-current={route === 'saved' ? 'page' : undefined}><Bookmark /> 보관함</a>
        <button className="help-button" aria-label="이용 방법" onClick={() => setHelp(true)}><CircleHelp /></button>
      </nav>
    </div></header>
    {storageIssue && <p className="storage-notice" role="status">기기 저장 공간을 쓸 수 없어 이번 대화에서만 기록을 보관해요.</p>}
    {playing ? (isFinished(table) ?
      <TableEnd table={table} deck={tableDeck} onReplay={() => start({ deck: tableDeck, players: table.players, rounds: table.rounds })} /> :
      <TablePlay deck={tableDeck} table={table} saved={saved} onToggle={toggleSaved}
        onPlay={action => setTable(current => current && play(current, action))} />) :
      setupDeck ? <TableSetup key={setupDeck.id} deck={setupDeck} onStart={(players, rounds) => requestStart({ deck: setupDeck, players, rounds })} /> :
      route === 'saved' ? <SavedCards ids={saved} onToggle={toggleSaved} /> : <DeckLibrary table={table} />}
    {help && <Dialog title="이용 방법" onClose={() => setHelp(false)}>
      <div className="help-steps">
        <div><UsersRound /><p><strong>한 테이블에 모여요</strong>덱과 인원, 바퀴 수를 골라요. 휴대폰을 든 분이 1번 자리예요.</p></div>
        <div><MessageCircle /><p><strong>카드를 뒤집고 이야기해요</strong>더 듣고 싶으면 꼬리 질문을 열어요. 질문을 바꾸거나, 답하지 않고 다음 차례로 넘겨도 돼요.</p></div>
        <div><Repeat2 /><p><strong>시계 방향으로 건네요</strong>마지막 분까지 한 번씩 이야기하면 한 바퀴예요. 마음에 든 질문은 책갈피로 보관해요.</p></div>
      </div>
      <button className="button primary wide" onClick={() => setHelp(false)}>알겠어요</button>
    </Dialog>}
    {replacement && <Dialog title="새 대화를 시작할까요?" onClose={() => setReplacement(null)}>
      <p className="dialog-copy">진행 중인 판이 끝나고 새 카드를 섞어요. 보관함에 담은 질문은 계속 볼 수 있어요.</p>
      <div className="dialog-actions"><button className="button secondary" onClick={() => setReplacement(null)}>취소</button>
        <button className="button primary" onClick={() => start(replacement)}>새로 시작 <ArrowRight size={17} /></button></div>
    </Dialog>}
  </>
}
