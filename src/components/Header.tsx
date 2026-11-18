import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/hooks'
import { messages } from '@/i18n/messages'
import { Brand } from './Brand'
import { LanguagePicker } from './LanguagePicker'

export function Header({ loginPage = false }: { loginPage?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [headerHidden, setHeaderHidden] = useState(false)
  const locale = useAppSelector((state) => state.site.locale)
  const signedInEmail = useAppSelector((state) => state.account.email)
  const copy = messages[locale]
  const links = ['/#products', signedInEmail ? '/person' : '/#account', '/#ai', '/#about']

  useEffect(() => {
    let previousY = window.scrollY
    function handleScroll() {
      const currentY = window.scrollY
      if (currentY < 96 || menuOpen || languageOpen) {
        setHeaderHidden(false)
        previousY = currentY
      } else if (Math.abs(currentY - previousY) > 8) {
        setHeaderHidden(currentY > previousY)
        previousY = currentY
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen, languageOpen])

  return (
      <header className={`header${headerHidden ? ' header--hidden' : ''}${loginPage ? ' header--login' : ''}`} id="top">
        <div className="header__inner shell">
          <Brand />
          <nav className={`header__nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {copy.nav.map((label, index) => <a href={links[index]} key={links[index]} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <div className="header__actions">
            {signedInEmail ? <a className="header__account" href="/person" aria-label={`${copy.account}: ${signedInEmail}`} title={signedInEmail}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7"/><path d="M4.8 20c0-3.6 3-6 7.2-6s7.2 2.4 7.2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
              <span>{signedInEmail}</span>
            </a> : <a className="header__login" href="/#account">{copy.auth.login}</a>}
            <LanguagePicker onOpenChange={setLanguageOpen} />
            <button className="icon-button menu-trigger" type="button" aria-label={menuOpen ? copy.close : copy.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
          </div>
        </div>
      </header>
  )
}
