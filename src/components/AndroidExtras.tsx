import { language, t } from '../language'
import { useEffect, useState } from 'react'
import { Capacitor, registerPlugin, type PluginListenerHandle } from '@capacitor/core'
import { Share2 } from 'lucide-react'

interface PrivacyState { required: boolean }
interface AndroidTools {
  setCompletedScreen(options: { visible: boolean }): Promise<void>
  getPrivacyState(): Promise<PrivacyState>
  showPrivacyOptions(): Promise<void>
  addListener(name: 'privacyChanged', listener: (state: PrivacyState) => void): Promise<PluginListenerHandle>
  shareInvite(options: { question: string; language: string }): Promise<void>
}

const native = Capacitor.getPlatform() === 'android' && Capacitor.isPluginAvailable('CardTalkAndroid')
  ? registerPlugin<AndroidTools>('CardTalkAndroid') : null

export function useFinishBanner(visible: boolean) {
  useEffect(() => {
    if (!native) return
    void native.setCompletedScreen({ visible }).catch(() => {})
    if (visible) return () => { void native.setCompletedScreen({ visible: false }).catch(() => {}) }
  }, [visible])
}

export function AdPrivacyOptions() {
  const [required, setRequired] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!native) return
    let mounted = true
    const update = (state: PrivacyState) => { if (mounted) setRequired(state.required) }
    const listener = native.addListener('privacyChanged', update)
    void listener.then(() => native.getPrivacyState()).then(update).catch(() => {})
    return () => {
      mounted = false
      void listener.then(handle => handle.remove()).catch(() => {})
    }
  }, [])
  if (!native || !required) return null
  async function openOptions() {
    setError('')
    try { await native!.showPrivacyOptions() }
    catch { setError(t("광고 개인정보 선택을 열 수 없어요. 잠시 후 다시 시도해 주세요.", "Ad privacy choices are unavailable. Try again shortly.")) }
  }
  return <>
    <button className="text-action" onClick={openOptions}>{t("광고 개인정보 선택", "Ad privacy choices")}</button>
    {error && <small role="status">{error}</small>}
  </>
}

export function ShareInvite({ question }: { question: string }) {
  const [error, setError] = useState(false)
  if (!native) return null
  async function share() {
    setError(false)
    try { await native!.shareInvite({ question, language }) }
    catch { setError(true) }
  }
  return <>
    <button className="text-action" onClick={share}><Share2 size={16} /> {t("다음 모임에 카드톡 공유", "Share CardTalk")}</button>
    {error && <small role="status">{t("공유 창을 열 수 없어요. 잠시 후 다시 시도해 주세요.", "Sharing is unavailable. Try again shortly.")}</small>}
  </>
}
