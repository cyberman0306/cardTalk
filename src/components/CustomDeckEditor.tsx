import { t } from '../language'
import { useState } from 'react'
import { ArrowRight, Check, Layers2, ListPlus, Plus, Trash2 } from 'lucide-react'
import { type CustomDeckTheme, type Deck } from '../content/decks.ts'
import { customDeckThemes } from '../storage.ts'
import { DeckArt } from './DeckArt'
import { BackLink } from './Table'

interface DraftCard {
  id: string
  question: string
  followUp: string
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

function themeLabel(theme: CustomDeckTheme) {
  switch (theme) {
    case 'terracotta': return t('테라코타', 'Terracotta')
    case 'sage': return t('세이지', 'Sage')
    case 'cobalt': return t('코발트', 'Cobalt')
    case 'plum': return t('플럼', 'Plum')
    case 'ochre': return t('오커', 'Ochre')
  }
}

interface CustomDeckEditorProps {
  initial?: Deck
  onSave: (deck: Deck, openAfter: boolean) => void
  onDelete?: (deck: Deck) => void
}

export function CustomDeckEditor({ initial, onSave, onDelete }: CustomDeckEditorProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [mood, setMood] = useState(initial?.mood ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [theme, setTheme] = useState<CustomDeckTheme>(initial?.theme ?? 'terracotta')
  const [cards, setCards] = useState<DraftCard[]>(() =>
    initial?.cards.length
      ? initial.cards.map(c => ({ id: c.id, question: c.question, followUp: c.followUp }))
      : [
          { id: makeId('card'), question: '', followUp: '' },
          { id: makeId('card'), question: '', followUp: '' },
        ]
  )
  const [bulkOpen, setBulkOpen] = useState(false)
  const [bulkText, setBulkText] = useState('')
  const [error, setError] = useState('')

  const filledCount = cards.filter(c => c.question.trim().length > 0).length
  const canSave = title.trim().length > 0 && filledCount >= 2

  function updateCard(index: number, field: 'question' | 'followUp', value: string) {
    setError('')
    setCards(prev => prev.map((card, i) => i === index ? { ...card, [field]: value } : card))
  }

  function addCard() {
    setCards(prev => [...prev, { id: makeId('card'), question: '', followUp: '' }])
  }

  function removeCard(index: number) {
    setCards(prev => {
      if (prev.length <= 1) return [{ id: makeId('card'), question: '', followUp: '' }]
      return prev.filter((_, i) => i !== index)
    })
  }

  function applyBulk() {
    const lines = bulkText
      .split(/\r?\n/)
      .map(line => line.replace(/^\s*[-*•\d.)]+\s*/, '').trim())
      .filter(Boolean)
    if (!lines.length) return
    setError('')
    setCards(prev => {
      const next = [...prev]
      let cursor = 0
      for (let i = 0; i < next.length && cursor < lines.length; i++) {
        if (!next[i].question.trim() && !next[i].followUp.trim()) {
          next[i] = { ...next[i], question: lines[cursor++] }
        }
      }
      while (cursor < lines.length) {
        next.push({ id: makeId('card'), question: lines[cursor++], followUp: '' })
      }
      return next
    })
    setBulkText('')
    setBulkOpen(false)
  }

  function buildDeck(): Deck | null {
    const cleanTitle = title.trim()
    if (!cleanTitle) {
      setError(t('카드팩 이름을 입력해 주세요.', 'Please enter a pack title.'))
      return null
    }
    const validCards = cards
      .map(c => ({ id: c.id, question: c.question.trim(), followUp: c.followUp.trim() }))
      .filter(c => c.question.length > 0)
    if (validCards.length < 2) {
      setError(t('질문 카드를 최소 2장 이상 적어 주세요.', 'Add at least 2 question cards.'))
      return null
    }
    return {
      id: initial?.id ?? makeId('custom'),
      title: cleanTitle,
      mood: mood.trim(),
      description: description.trim(),
      theme,
      custom: true,
      cards: validCards,
    }
  }

  function handleSave(openAfter: boolean) {
    const built = buildDeck()
    if (!built) return
    onSave(built, openAfter)
  }

  const previewMood = mood.trim() || t('커스텀', 'Custom')
  const previewTitle = title.trim() || t('새 카드팩', 'Untitled pack')

  return <main className="page editor-page">
    <div className="editor-topbar">
      <BackLink />
      {initial && onDelete && (
        <button type="button" className="text-danger" onClick={() => onDelete(initial)}>
          <Trash2 size={16} /> {t('팩 삭제', 'Delete pack')}
        </button>
      )}
    </div>

    <div className="editor-header">
      <div>
        <h1>{initial ? t('커스텀 카드팩 수정', 'Edit custom pack') : t('커스텀 카드팩 만들기', 'Create a custom pack')}</h1>
        <p className="intro">{t('우리 모임만의 질문으로 나만의 카드팩을 만들어 보세요. 기기에 저장되어 언제든 다시 꺼낼 수 있어요.', 'Write your own questions for any gathering. Packs are saved on this device.')}</p>
      </div>
      <div className={'editor-preview theme-' + theme} aria-hidden="true">
        <span className="tile-heading"><small>{previewMood}</small><strong>{previewTitle}</strong></span>
        <DeckArt id={theme} />
        <span className="tile-footer"><span>{filledCount}{t('장', filledCount === 1 ? ' card' : ' cards')}</span><Layers2 size={15} /></span>
      </div>
    </div>

    <section className="editor-section" aria-labelledby="pack-info-heading">
      <h2 id="pack-info-heading">{t('기본 정보', 'Pack details')}</h2>
      <div className="field-grid">
        <label className="field">
          <span>{t('팩 이름 *', 'Pack title *')}</span>
          <input
            type="text"
            maxLength={32}
            value={title}
            onChange={e => { setTitle(e.target.value); setError('') }}
            placeholder={t('예: 우리 팀 회식, 제주도 여행', 'e.g. Friday dinner, Road trip')}
          />
        </label>
        <label className="field">
          <span>{t('분위기 태그', 'Mood label')}</span>
          <input
            type="text"
            maxLength={16}
            value={mood}
            onChange={e => setMood(e.target.value)}
            placeholder={t('예: 유쾌하게, 속마음', 'e.g. Playful, Deep')}
          />
        </label>
      </div>
      <label className="field">
        <span>{t('한 줄 설명', 'Short description')}</span>
        <input
          type="text"
          maxLength={80}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder={t('이 카드팩으로 어떤 이야기를 나누고 싶나요?', 'What kind of stories is this pack for?')}
        />
      </label>
      <div className="field">
        <span>{t('커버 색상', 'Cover color')}</span>
        <div className="theme-picker" role="radiogroup" aria-label={t('커버 색상 선택', 'Choose cover color')}>
          {customDeckThemes.map(option => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={theme === option}
              className={'theme-swatch theme-' + option}
              onClick={() => setTheme(option)}
            >
              <span className="swatch-dot">{theme === option && <Check size={14} />}</span>
              <span>{themeLabel(option)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>

    <section className="editor-section" aria-labelledby="pack-cards-heading">
      <div className="editor-cards-head">
        <div>
          <h2 id="pack-cards-heading">{t('질문 카드', 'Question cards')} <span className="count-pill">{filledCount}{t('장', '')}</span></h2>
          <p className="field-hint">{t('최소 2장 이상 적으면 바로 시작할 수 있어요. 꼬리 질문은 비워 두어도 돼요.', 'Add at least 2 questions to play. Follow-ups are optional.')}</p>
        </div>
        <button type="button" className="button secondary small-button" onClick={() => setBulkOpen(open => !open)}>
          <ListPlus size={16} /> {t('여러 줄 추가', 'Add multiple')}
        </button>
      </div>

      {bulkOpen && (
        <div className="bulk-box">
          <label className="field">
            <span>{t('한 줄에 질문 하나씩 붙여넣으세요', 'Paste one question per line')}</span>
            <textarea
              rows={4}
              value={bulkText}
              onChange={e => setBulkText(e.target.value)}
              placeholder={t('요즘 가장 자주 듣는 노래는?\n올해 안에 꼭 가 보고 싶은 곳은?', 'What song have you had on repeat?\nWhere do you want to travel this year?')}
            />
          </label>
          <div className="bulk-actions">
            <button type="button" className="button secondary small-button" onClick={() => setBulkOpen(false)}>{t('닫기', 'Cancel')}</button>
            <button type="button" className="button primary small-button" onClick={applyBulk} disabled={!bulkText.trim()}>{t('목록에 추가', 'Add to list')}</button>
          </div>
        </div>
      )}

      <div className="card-draft-list">
        {cards.map((card, index) => (
          <div key={card.id} className="card-draft">
            <div className="card-draft-top">
              <span className="card-index">{t(`카드 ${index + 1}`, `Card ${index + 1}`, { ja: `カード ${index + 1}`, zh: `卡牌 ${index + 1}`, es: `Carta ${index + 1}` })}</span>
              <button
                type="button"
                className="icon-button subtle-icon"
                onClick={() => removeCard(index)}
                aria-label={t(`카드 ${index + 1} 삭제`, `Delete card ${index + 1}`, { ja: `カード ${index + 1} を削除`, zh: `删除卡牌 ${index + 1}`, es: `Eliminar carta ${index + 1}` })}
              >
                <Trash2 size={17} />
              </button>
            </div>
            <label className="field">
              <span className="sr-only">{t('질문', 'Question')}</span>
              <input
                type="text"
                maxLength={140}
                value={card.question}
                onChange={e => updateCard(index, 'question', e.target.value)}
                placeholder={t('질문을 입력하세요', 'Write a question')}
              />
            </label>
            <label className="field">
              <span className="sr-only">{t('꼬리 질문 (선택)', 'Follow-up (optional)')}</span>
              <input
                type="text"
                maxLength={140}
                className="followup-input"
                value={card.followUp}
                onChange={e => updateCard(index, 'followUp', e.target.value)}
                placeholder={t('꼬리 질문 (선택)', 'Follow-up question (optional)')}
              />
            </label>
          </div>
        ))}
      </div>

      <button type="button" className="button secondary wide add-card-button" onClick={addCard}>
        <Plus size={18} /> {t('질문 카드 추가', 'Add a card')}
      </button>
    </section>

    {error && <p className="editor-error" role="alert">{error}</p>}

    <div className="editor-footer">
      <button type="button" className="button secondary" onClick={() => handleSave(false)} disabled={!canSave}>
        {t('저장하기', 'Save pack')}
      </button>
      <button type="button" className="button primary" onClick={() => handleSave(true)} disabled={!canSave}>
        {t('저장하고 시작하기', 'Save & open')} <ArrowRight size={18} />
      </button>
    </div>
  </main>
}
