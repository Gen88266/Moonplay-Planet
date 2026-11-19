import { useEffect, useState, type MouseEvent } from 'react'
import { useAppSelector } from '@/app/hooks'
import { messages } from '@/i18n/messages'
import { Brand } from './Brand'
import { LanguagePicker } from './LanguagePicker'

export function Header({ loginPage = false }: { loginPage?: boolean }) {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const locale = useAppSelector((state) => state.site.locale)
  const signedInEmail = useAppSelector((state) => state.account.email)
  const copy = messages[locale]

  useEffect(() => {
    let previousY = window.scrollY
    function handleScroll() {
      const currentY = window.scrollY
      if (currentY < 96 || languageOpen) {
        setHeaderHidden(false)
        previousY = currentY
      } else if (Math.abs(currentY - previousY) > 8) {
        setHeaderHidden(currentY > previousY)
        previousY = currentY
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [languageOpen])

  function onStoreClick(event: MouseEvent<HTMLAnchorElement>) {
    const onHome = window.location.pathname === '/' && !window.location.hash.startsWith('#account') && !new URLSearchParams(window.location.search).has('invite_code')
    if (!onHome) return
    event.preventDefault()
    window.history.replaceState(null, '', '/#top')
    window.scrollTo(0, 0)
  }

  return (
      <header className={`header${headerHidden ? ' header--hidden' : ''}${loginPage ? ' header--login' : ''}`} id="top">
        <div className="header__inner shell">
          <Brand />
          <nav className="header__nav" aria-label="Main navigation">
            <a href="/#top" onClick={onStoreClick}>{copy.nav[0]}</a>
          </nav>
          <div className="header__actions">
            {signedInEmail ? <a className="header__account" href="/person" aria-label={`${copy.account}: ${signedInEmail}`} title={signedInEmail}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7"/><path d="M4.8 20c0-3.6 3-6 7.2-6s7.2 2.4 7.2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
              <span>{signedInEmail}</span>
            </a> : <a className="header__login" href="/#account">{copy.auth.login}</a>}
            <LanguagePicker onOpenChange={setLanguageOpen} />
          </div>
        </div>
      </header>
  )
}
