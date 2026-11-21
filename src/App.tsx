import { t, changeLanguage, language } from './language'
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { App as NativeApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { ArrowRight, Bookmark, CircleHelp, Layers2, MessageCircle, Repeat2, UsersRound, X } from 'lucide-react'
import { findDeck, type Deck } from './content/decks.ts'
import { isFinished, newTable, play, restoreTable, type Table } from './game.ts'
import { readLocal, restoreSaved, savedKey, tableKey, writeLocal } from './storage.ts'
import { DeckLibrary, SavedCards } from './components/Library'
import { TableEnd, TablePlay, TableSetup } from './components/Table'
import { AdPrivacyOptions, useFinishBanner } from './components/AndroidExtras'

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
    <div className="dialog-heading"><h2 id="dialog-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label={t("닫기", "Close")}><X size={19} /></button></div>
    {children}
  </dialog>
}

interface Setup { deck: Deck; players: number; rounds: number }

export function App() {
  const hash = useSyncExternalStore(subscribeRoute, () => window.location.hash.slice(1) || 'home')
  const policy = hash.endsWith('/privacy')
  const route = policy ? hash.slice(0, -8) : hash
  const [locale, setLocale] = useState(language)
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t('카드톡 · 첫 모임을 여는 대화 카드', 'CardTalk · Conversation cards')
  }, [locale])
  const [table, setTable] = useState<Table | null>(() => restoreTable(readLocal(tableKey)))
  const [saved, setSaved] = useState(() => restoreSaved(readLocal(savedKey)))
  const [help, setHelp] = useState(false)
  const [replacement, setReplacement] = useState<Setup | null>(null)
  const [storageIssue, setStorageIssue] = useState(false)
  const setupDeck = route.startsWith('deck/') ? findDeck(route.slice(5)) : undefined
  const tableDeck = table && findDeck(table.deckId)
  const playing = route === 'table' && table && tableDeck
  const library = !playing && !setupDeck && route !== 'saved'
  useFinishBanner(Boolean(playing && isFinished(table)) && !help && !policy)

  const previousTable = useRef(table)
  const previousSaved = useRef(saved)
  useEffect(() => {
    if (previousTable.current === table) return
    previousTable.current = table
    if (!writeLocal(tableKey, table)) setStorageIssue(true)
  }, [table])
  useEffect(() => {
    if (previousSaved.current === saved) return
    previousSaved.current = saved
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
      if (policy) closePolicy()
      else if (help) setHelp(false)
      else if (replacement) setReplacement(null)
      else if (!library) window.location.hash = 'home'
      else void NativeApp.minimizeApp()
    })
    return () => { void listener.then(handle => handle.remove()) }
  }, [help, replacement, library, policy, route])

  function closePolicy() {
    if (history.state?.cardtalkPolicy) history.back()
    else window.location.replace('#' + route)
  }

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
      <a className="brand" href="#home" aria-label={t("CardTalk 홈", "CardTalk home")}><img src="/app-icon.png" width="34" height="34" alt="" />CardTalk</a>
      <nav aria-label={t("메인 메뉴", "Main menu")}>
        <a href="#home" className="home-nav" aria-current={library ? 'page' : undefined}><Layers2 /> {t("덱 고르기", "Choose a deck")}</a>
        <a href="#saved" aria-current={route === 'saved' ? 'page' : undefined}><Bookmark /> {t("보관함", "Saved")}</a>
        <button className="lang-toggle" onClick={() => { changeLanguage(); setLocale(language) }} aria-label={t("영어로 변경", "Switch to Korean")}>{t("EN", "한국어")}</button>
        <button className="help-button" aria-label={t("이용 방법", "How to play")} onClick={() => setHelp(true)}><CircleHelp /></button>
      </nav>
    </div></header>
    {storageIssue && <p className="storage-notice" role="status">{t("기기 저장 공간을 쓸 수 없어 이번 대화에서만 기록을 보관해요.", "Storage is unavailable. Progress will last for this session.")}</p>}
    {playing ? (isFinished(table) ?
      <TableEnd table={table} deck={tableDeck} onReplay={() => start({ deck: tableDeck, players: table.players, rounds: table.rounds })} /> :
      <TablePlay deck={tableDeck} table={table} saved={saved} onToggle={toggleSaved}
        onPlay={action => setTable(current => current && play(current, action))} />) :
      setupDeck ? <TableSetup key={setupDeck.id} deck={setupDeck} onStart={(players, rounds) => requestStart({ deck: setupDeck, players, rounds })} /> :
      route === 'saved' ? <SavedCards ids={saved} onToggle={toggleSaved} /> : <DeckLibrary table={table} />}
    {help && !policy && <Dialog title={t("이용 방법", "How to play")} onClose={() => setHelp(false)}>
      <div className="help-steps">
        <div><UsersRound /><p><strong>{t("한 테이블에 모여요", "Gather around")}</strong>{t("덱과 인원, 바퀴 수를 골라요. 휴대폰을 든 분이 1번 자리예요.", "Choose a deck, players and rounds. The person holding the phone is seat one.")}</p></div>
        <div><MessageCircle /><p><strong>{t("카드를 뒤집고 이야기해요", "Flip a card")}</strong>{t("더 듣고 싶으면 꼬리 질문을 열어요. 질문을 바꾸거나, 답하지 않고 다음 차례로 넘겨도 돼요.", "Open the follow-up if you’re curious. Swap the question or pass without answering.")}</p></div>
        <div><Repeat2 /><p><strong>{t("시계 방향으로 건네요", "Pass clockwise")}</strong>{t("마지막 분까지 한 번씩 이야기하면 한 바퀴예요. 마음에 든 질문은 책갈피로 보관해요.", "One turn each makes a round. Bookmark questions you’d like to revisit.")}</p></div>
      </div>
      <button className="button primary wide" onClick={() => setHelp(false)}>{t("알겠어요", "Got it")}</button>
      <div className="privacy-links"><button className="text-action" onClick={() => {
        history.pushState({ cardtalkPolicy: true }, '', '#' + route + '/privacy')
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }}>{t("개인정보처리방침", "Privacy policy")}</button><AdPrivacyOptions /></div>
    </Dialog>}
    {policy && <Dialog title={t("개인정보처리방침", "Privacy policy")} onClose={closePolicy}>
      <iframe className="policy-frame" title={t("처리방침 본문", "Policy details")} src={locale === 'en' ? './privacy-en.html#embedded' : './privacy.html#embedded'} />
      <button className="button secondary wide" onClick={closePolicy}>{t("돌아가기", "Go back")}</button>
    </Dialog>}
    {replacement && <Dialog title={t("새 대화를 시작할까요?", "Start a new conversation?")} onClose={() => setReplacement(null)}>
      <p className="dialog-copy">{t("진행 중인 판이 끝나고 새 카드를 섞어요. 보관함에 담은 질문은 계속 볼 수 있어요.", "This ends the current game and shuffles a new deck. Your saved questions stay with you.")}</p>
      <div className="dialog-actions"><button className="button secondary" onClick={() => setReplacement(null)}>{t("취소", "Cancel")}</button>
        <button className="button primary" onClick={() => start(replacement)}>{t("새로 시작 ", "Start again ")}<ArrowRight size={17} /></button></div>
    </Dialog>}
  </>
}
