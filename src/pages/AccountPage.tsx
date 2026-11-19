import { useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ApiError } from '@/api/http'
import { loginAccount, registerAccount } from '@/api/auth'
import { signIn } from '@/features/account/accountSlice'
import { parseInviteInput } from '@/features/account/invites'
import { useAccountAccess } from '@/hooks/useAccountAccess'
import { LegalContent } from '@/components/LegalContent'
import { LegalDialog } from '@/components/LegalDialog'
import { legalTitle } from '@/i18n/legal'
import { messages } from '@/i18n/messages'

type LegalPage = 'terms' | 'privacy' | null

interface AccountPageProps { legal: LegalPage; onSignedIn: () => void }

export function AccountPage({ legal, onSignedIn }: AccountPageProps) {
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.site.locale)
  const copy = messages[locale].auth
  const access = useAccountAccess(locale, copy.requestFailed)
  const [isLegalOpen, setIsLegalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inviteError, setInviteError] = useState('')
  const [inviteCode, setInviteCode] = useState(() => new URLSearchParams(window.location.search).get('invite_code') ?? '')
  const inviteQuery = new URLSearchParams(window.location.search).get('invite_code')
  const accountHref = inviteQuery ? `/?invite_code=${encodeURIComponent(inviteQuery)}#account` : '/#account'
  const { email, code, isEmailValid, isRegistered, isChecking, isSending, resendSeconds, codeSent, errorMessage } = access
  const showRegister = isRegistered === false
  const emailHint = access.isEmailTouched && !isEmailValid ? copy.emailInvalid : ''

  async function completeSignIn(request: () => Promise<void>, invite: string) {
    setIsSubmitting(true)
    access.setErrorMessage('')
    try {
      await request()
      dispatch(signIn({ email: access.normalizedEmail, inviteCode: invite, registeredAt: new Date().toISOString() }))
      onSignedIn()
    } catch (error) {
      const message = error instanceof ApiError && error.message.trim() ? error.message : copy.requestFailed
      access.setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isEmailValid || isRegistered === null || isSubmitting || !/^\d{6}$/.test(code)) return
    if (isRegistered) {
      await completeSignIn(() => loginAccount(access.normalizedEmail, code), '')
      return
    }
    const rawInvite = inviteCode.trim()
    const invite = rawInvite ? parseInviteInput(rawInvite) : ''
    if (rawInvite && !invite) {
      setInviteError(copy.inviteInvalid)
      return
    }
    setInviteError('')
    await completeSignIn(() => registerAccount(access.normalizedEmail, code, invite ?? ''), invite ?? '')
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
            <h2 id="account-panel-title">{showRegister ? copy.registerTitle : copy.loginTitle}</h2>
            <p className="account-panel__description">{showRegister ? copy.registerLead : copy.loginLead}</p>
            <form className="account-form" noValidate onSubmit={handleSubmit}>
              <label htmlFor="account-email">{copy.email}</label>
              <div className={`account-form__field${isChecking ? ' is-checking' : ''}`}>
                <input id="account-email" type="email" value={email} autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(emailHint)} aria-describedby={emailHint ? 'account-email-error' : undefined} onChange={(event) => access.onEmailChange(event.target.value)} onBlur={() => email.trim() && access.touchEmail()} />
                {isChecking && <span className="account-form__status" role="status">{copy.checkingAccount}</span>}
              </div>
              {emailHint && <p className="account-form__hint account-form__hint--error" id="account-email-error" role="alert">{emailHint}</p>}
              <label htmlFor="account-code">{copy.verificationCode}</label>
              <div className="account-form__inline"><input id="account-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} autoComplete="one-time-code" placeholder={copy.codePlaceholder} onChange={(event) => access.setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} /><button type="button" disabled={!isEmailValid || isRegistered === null || isChecking || isSending || resendSeconds > 0} onClick={() => void access.onSendCode()}>{isSending ? copy.sendingCode : resendSeconds > 0 ? `${resendSeconds}s` : copy.sendCode}</button></div>
              {errorMessage && <p className="account-form__hint" role="alert">{errorMessage}</p>}
              {codeSent && !errorMessage && <p className="account-form__hint" role="status">{copy.codeSent}</p>}
              {showRegister && <><label htmlFor="account-invite">{copy.inviteOptional}</label><input id="account-invite" value={inviteCode} maxLength={512} autoComplete="off" placeholder={copy.invitePlaceholder} onChange={(event) => { setInviteCode(event.target.value); setInviteError('') }} />{inviteError && <p className="account-form__hint" role="alert">{inviteError}</p>}</>}
              <button className="account-form__submit" type="submit" disabled={isRegistered === null || !isEmailValid || isChecking || isSubmitting || code.length !== 6}>{showRegister ? copy.register : copy.login} <span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span></button>
              <p className="account-form__consent">{showRegister ? copy.legalPrefix : copy.loginLegalPrefix}<button type="button" onClick={() => setIsLegalOpen(true)}>{copy.legalLink}</button>{showRegister ? copy.legalSuffix : copy.loginLegalSuffix}</p>
            </form>
          </section>
        </div>
      </div>
      <img className="account-page__mobile-art" src="/imgs/account-mobile-illustration.webp" alt="" aria-hidden="true" />
      {isLegalOpen && <LegalDialog onClose={() => setIsLegalOpen(false)} />}
    </main>
  )
}
