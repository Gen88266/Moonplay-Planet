import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setCartOpen, setNotice } from '@/features/site/siteSlice'
import { messages } from '@/i18n/messages'

export function Overlay() {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const { locale, cartOpen, notice } = useAppSelector((state) => state.site)
  const copy = messages[locale]

  useEffect(() => {
    if (!cartOpen && !notice) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeRef.current?.focus()
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') { dispatch(setCartOpen(false)); dispatch(setNotice(null)) }
    }
    window.addEventListener('keydown', handleKey)
    return () => { window.removeEventListener('keydown', handleKey); previousFocus?.focus() }
  }, [cartOpen, notice, dispatch])

  if (!cartOpen && !notice) return null

  return (
    <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) { dispatch(setCartOpen(false)); dispatch(setNotice(null)) } }}>
      <section className="overlay__panel" role="dialog" aria-modal="true" aria-label={cartOpen ? copy.cartTitle : copy.soon}>
        <button ref={closeRef} className="overlay__close" type="button" aria-label={copy.close} onClick={() => { dispatch(setCartOpen(false)); dispatch(setNotice(null)) }}>×</button>
        {cartOpen ? <><span className="overlay__icon" aria-hidden="true">✦</span><h2>{copy.cartTitle}</h2><p>{copy.cartEmpty}</p><small>{copy.cartNote}</small></> : <><span className="overlay__icon" aria-hidden="true">✦</span><h2>MOONPLAY PLANET</h2><p>{notice}</p></>}
      </section>
    </div>
  )
}
