import { useEffect, useRef } from 'react'
import { useAppSelector } from '@/app/hooks'
import { legalTitle } from '@/i18n/legal'
import { messages } from '@/i18n/messages'
import { LegalContent } from './LegalContent'

interface LegalDialogProps {
  onClose: () => void
}

/** 《全球用戶法律、合規與風險聲明》彈窗：點遮罩、按 Esc 或關閉鈕都會關閉，關閉後焦點回到觸發處。 */
export function LegalDialog({ onClose }: LegalDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const locale = useAppSelector((state) => state.site.locale)
  const closeLabel = messages[locale].close

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  return (
    <div className="legal-dialog" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="legal-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="legal-dialog-title">
        <button ref={closeRef} className="overlay__close" type="button" aria-label={closeLabel} onClick={onClose}>×</button>
        <h2 id="legal-dialog-title">{legalTitle[locale]}</h2>
        <div className="legal-dialog__scroll" tabIndex={0}><LegalContent /></div>
        <button className="button button--dark" type="button" onClick={onClose}>{closeLabel}</button>
      </section>
    </div>
  )
}
