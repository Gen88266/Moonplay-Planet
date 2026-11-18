import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Header } from '@/components/Header'
import { Overlay } from '@/components/Overlay'
import { persistAccount, signOut } from '@/features/account/accountSlice'
import { messages } from '@/i18n/messages'
import { AccountPage } from '@/pages/AccountPage'
import { HomePage } from '@/pages/HomePage'
import { PersonPage } from '@/pages/PersonPage'
import { persistLocale } from '@/utils/locale'

export default function App() {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.site.locale)
  const account = useAppSelector((state) => state.account)
  const copy = messages[locale]
  const [pathname, setPathname] = useState(window.location.pathname)
  const [hash, setHash] = useState(window.location.hash)
  const hasInviteCode = new URLSearchParams(window.location.search).has('invite_code')
  const isAccountPage = pathname === '/person' || hash.startsWith('#account') || hasInviteCode
  const isLoginPage = isAccountPage && pathname !== '/person' && hash !== '#account/terms' && hash !== '#account/privacy'

  useEffect(() => {
    persistLocale(locale)
    document.title = pathname === '/person' ? `Moonplay Planet｜${copy.auth.profileHeading}` : `Moonplay Planet｜${copy.announcement}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `Moonplay Planet｜${copy.announcement}`)
  }, [locale, copy, pathname])
  useEffect(() => { persistAccount(account) }, [account])
  useEffect(() => {
    function handleLocationChange() {
      setPathname(window.location.pathname)
      setHash(window.location.hash)
    }
    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])
  useEffect(() => {
    if (!isAccountPage) requestAnimationFrame(() => document.getElementById(hash.slice(1) || 'top')?.scrollIntoView())
    else window.scrollTo(0, 0)
  }, [hash, isAccountPage])
  useEffect(() => {
    if (pathname === '/person' && !account.email) {
      window.history.replaceState(null, '', '/#account')
      setPathname('/')
      setHash('#account')
    }
  }, [pathname, account.email])

  function navigateTo(path: string) {
    window.history.pushState(null, '', path)
    setPathname(window.location.pathname)
    setHash(window.location.hash)
    window.scrollTo(0, 0)
  }

  function handleSignOut() {
    dispatch(signOut())
    navigateTo('/')
  }

  return (
    <>
      <Header loginPage={isLoginPage} />
      {pathname === '/person' && account.email
        ? <PersonPage onSignOut={handleSignOut} />
        : isAccountPage
          ? <AccountPage legal={hash === '#account/terms' ? 'terms' : hash === '#account/privacy' ? 'privacy' : null} onSignedIn={() => navigateTo('/person')} />
          : <HomePage />}
      <Overlay />
    </>
  )
}
