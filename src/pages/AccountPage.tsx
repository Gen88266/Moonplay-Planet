import { useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { signIn } from '@/features/account/accountSlice'
import { parseInviteInput } from '@/features/account/invites'
import { LegalContent } from '@/components/LegalContent'
import { LegalDialog } from '@/components/LegalDialog'
import { legalTitle } from '@/i18n/legal'
import { messages } from '@/i18n/messages'

type LegalPage = 'terms' | 'privacy' | null

interface AccountPageProps { legal: LegalPage; onSignedIn: () => void }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function AccountPage({ legal, onSignedIn }: AccountPageProps) {
  const dispatch = useAppDispatch()
  const accounts = useAppSelector((state) => state.account.accounts)
  const locale = useAppSelector((state) => state.site.locale)
  const copy = messages[locale].auth
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [issuedCode, setIssuedCode] = useState('')
  const [isLegalOpen, setIsLegalOpen] = useState(false)
  const [inviteCode, setInviteCode] = useState(() => new URLSearchParams(window.location.search).get('invite_code') ?? '')
  const inviteQuery = new URLSearchParams(window.location.search).get('invite_code')
  const accountHref = inviteQuery ? `/?invite_code=${encodeURIComponent(inviteQuery)}#account` : '/#account'
  const normalizedEmail = email.trim().toLowerCase()
  const isEmailValid = emailPattern.test(normalizedEmail)
  const isRegistered = Object.prototype.hasOwnProperty.call(accounts, normalizedEmail)

  function handleSendCode() {
    if (!isEmailValid) return
    setIssuedCode('123456')
    setCode('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const accountEmail = isEmailValid ? normalizedEmail : 'visitor@moonplay.example'
    dispatch(signIn({ email: accountEmail, inviteCode: isRegistered ? '' : parseInviteInput(inviteCode) ?? '', registeredAt: new Date().toISOString() }))
    onSignedIn()
  }

  if (legal) return (
    <main className="account-page account-page--legal">
      <div className="account-page__shell shell">
        <a className="account-page__back" href={accountHref}>← {copy.back}</a>
        <div className="account-page__legal">
          <p className="eyebrow">{copy.legalKicker}</p>
          <h1>{legalTitle[locale]}</h1>
          <LegalContent />
        </div>
      </div>
    </main>
  )

  return (
    <main className="account-page">
      <div className="account-page__shell shell">
        <div className="account-page__grid">
          <div className="account-page__intro">
            <p className="eyebrow">{copy.spaceKicker}</p>
            <h1>{copy.title}</h1>
            <p>{copy.lead}</p>
            <span className="account-page__planet" aria-hidden="true" />
          </div>

          <section className="account-panel" aria-labelledby="account-panel-title">
            <span className="account-panel__kicker">{copy.kicker}</span>
            <h2 id="account-panel-title">{isEmailValid && !isRegistered ? copy.registerTitle : copy.loginTitle}</h2>
            <p className="account-panel__description">{isEmailValid && !isRegistered ? copy.registerLead : copy.loginLead}</p>
            <form className="account-form" noValidate onSubmit={handleSubmit}>
              <label htmlFor="account-email">{copy.email}</label>
              <input id="account-email" type="email" value={email} autoComplete="email" placeholder="you@example.com" onChange={(event) => { setEmail(event.target.value); setCode(''); setIssuedCode('') }} />
              <label htmlFor="account-code">{copy.verificationCode}</label>
              <div className="account-form__inline"><input id="account-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} autoComplete="one-time-code" placeholder={copy.codePlaceholder} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} /><button type="button" disabled={!isEmailValid} onClick={handleSendCode}>{copy.sendCode}</button></div>
              {issuedCode && <p className="account-form__hint" role="status">{copy.codeHint}: <strong>{issuedCode}</strong></p>}
              {isEmailValid && !isRegistered && <><label htmlFor="account-invite">{copy.inviteOptional}</label><input id="account-invite" value={inviteCode} maxLength={512} autoComplete="off" placeholder={copy.invitePlaceholder} onChange={(event) => setInviteCode(event.target.value)} /></>}
              <button className="account-form__submit" type="submit">{isEmailValid && !isRegistered ? copy.register : copy.login} <span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span></button>
              <p className="account-form__consent">{copy.legalPrefix}<button type="button" onClick={() => setIsLegalOpen(true)}>{copy.legalLink}</button>{copy.legalSuffix}</p>
            </form>
          </section>
        </div>
      </div>
      <img className="account-page__mobile-art" src="/imgs/account-mobile-illustration.webp" alt="" aria-hidden="true" />
      {isLegalOpen && <LegalDialog onClose={() => setIsLegalOpen(false)} />}
    </main>
  )
}
