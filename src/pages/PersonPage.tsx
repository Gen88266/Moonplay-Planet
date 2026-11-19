import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { bindReferrer, isSessionExpired } from '@/api/auth'
import { ApiError } from '@/api/http'
import { getUserData } from '@/api/user'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { InviteRecords } from '@/components/InviteRecords'
import { setOwnInviteCode } from '@/features/account/accountSlice'
import { parseInviteInput } from '@/features/account/invites'
import { messages } from '@/i18n/messages'

interface PersonPageProps { onSignOut: () => void }
const closeIcon = <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>

export function PersonPage({ onSignOut }: PersonPageProps) {
  const dispatch = useAppDispatch()
  const { email, accounts } = useAppSelector((state) => state.account)
  const locale = useAppSelector((state) => state.site.locale)
  const copy = messages[locale].auth
  const [inviteInput, setInviteInput] = useState('')
  const [copyError, setCopyError] = useState('')
  const [copied, setCopied] = useState<'code' | 'link' | null>(null)
  const [balanceAction, setBalanceAction] = useState<'deposit' | 'withdraw' | null>(null)
  const [signOutOpen, setSignOutOpen] = useState(false)
  const [bindOpen, setBindOpen] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [transferAsset, setTransferAsset] = useState<'activation' | 'points'>('activation')
  const [bindError, setBindError] = useState('')
  const [isBinding, setIsBinding] = useState(false)
  const balanceDialogRef = useRef<HTMLDialogElement>(null)
  const signOutDialogRef = useRef<HTMLDialogElement>(null)
  const bindDialogRef = useRef<HTMLDialogElement>(null)
  const transferDialogRef = useRef<HTMLDialogElement>(null)
  const assetHintsRef = useRef<HTMLDivElement>(null)
  const account = email ? accounts[email] : null
  const onSignOutRef = useRef(onSignOut)
  onSignOutRef.current = onSignOut

  const refreshUserData = useCallback(async () => {
    if (!email) return
    try {
      const { inviteCode } = await getUserData(email)
      dispatch(setOwnInviteCode(inviteCode))
    } catch (error) {
      if (isSessionExpired(error)) onSignOutRef.current()
    }
  }, [dispatch, email])

  useEffect(() => {
    void refreshUserData()
  }, [refreshUserData])

  useEffect(() => {
    function closeHintsOutside(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      assetHintsRef.current?.querySelectorAll<HTMLDetailsElement>('details[open]').forEach((hint) => {
        if (!hint.contains(target)) hint.open = false
      })
    }
    document.addEventListener('pointerdown', closeHintsOutside)
    return () => document.removeEventListener('pointerdown', closeHintsOutside)
  }, [])

  useEffect(() => {
    if (balanceAction) balanceDialogRef.current?.showModal()
  }, [balanceAction])
  useEffect(() => {
    if (signOutOpen) signOutDialogRef.current?.showModal()
  }, [signOutOpen])
  useEffect(() => {
    if (bindOpen && !bindDialogRef.current?.open) bindDialogRef.current?.showModal()
  }, [bindOpen])
  useEffect(() => {
    if (transferOpen && !transferDialogRef.current?.open) transferDialogRef.current?.showModal()
  }, [transferOpen])

  if (!email || !account) return null

  const ownInviteCode = account.ownInviteCode
  const inviteUrl = new URL('/', window.location.origin)
  if (ownInviteCode) inviteUrl.searchParams.set('invite_code', ownInviteCode)

  async function handleBind(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const inviteCode = parseInviteInput(inviteInput)
    if (!inviteCode || !email) {
      setBindError(copy.inviteInvalid)
      return
    }
    setIsBinding(true)
    setBindError('')
    try {
      await bindReferrer(email, inviteCode)
      await refreshUserData()
      setInviteInput('')
      setBindOpen(false)
    } catch (error) {
      if (isSessionExpired(error)) return onSignOut()
      setBindError(error instanceof ApiError && error.message ? error.message : copy.requestFailed)
    } finally {
      setIsBinding(false)
    }
  }

  function openBind() {
    setInviteInput('')
    setBindError('')
    setBindOpen(true)
  }

  async function handleCopy(value: string, kind: 'code' | 'link') {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(kind)
      setCopyError('')
    } catch {
      setCopyError(copy.copyFailed)
    }
  }

  function openTransfer(asset: 'activation' | 'points') {
    setTransferAsset(asset)
    setTransferOpen(true)
  }

  return (
    <main className="person-page">
      <div className="person-page__shell shell">
        <header className="person-page__heading"><p className="eyebrow">{copy.profileKicker}</p><h1>{copy.profileHeading}</h1></header>
        <section className="person-card" aria-label={copy.profileHeading}>
          <div className="person-card__identity">
            <span className="person-card__avatar" aria-hidden="true"><img src="/imgs/moonplay-favicon.png" alt="" /></span>
            <div><small>{copy.userType}</small><strong>{email}</strong></div>
            <button className="person-card__signout" type="button" onClick={() => setSignOutOpen(true)}>{copy.signOut}</button>
          </div>
          <div className="person-card__balance" hidden><div><span>{copy.balanceLabel}</span><strong>$0.00</strong></div><div className="person-card__balance-actions"><button type="button" onClick={() => setBalanceAction('deposit')}>{copy.deposit}</button><button type="button" onClick={() => setBalanceAction('withdraw')}>{copy.withdraw}</button></div></div>
          <div className="person-card__invite">
            {ownInviteCode ? <div className="person-card__invite-grid">
              <div className="person-card__invite-item"><span>{copy.ownInviteLabel}</span><div><strong>{ownInviteCode}</strong><button type="button" aria-label={`${copy.copy} ${copy.ownInviteLabel}`} onClick={() => handleCopy(ownInviteCode, 'code')}>{copied === 'code' ? copy.copied : copy.copy}</button></div></div>
              <div className="person-card__invite-item"><span>{copy.inviteLinkLabel}</span><div><strong title={inviteUrl.toString()}>{inviteUrl.toString()}</strong><button type="button" aria-label={`${copy.copy} ${copy.inviteLinkLabel}`} onClick={() => handleCopy(inviteUrl.toString(), 'link')}>{copied === 'link' ? copy.copied : copy.copy}</button></div></div>
            </div> : <div className="person-card__invite-grid">
              <div className="person-card__invite-item"><span>{copy.ownInviteLabel}</span><div><strong>—</strong></div></div>
              <div className="person-card__invite-item"><span>{copy.inviteLinkLabel}</span><div><strong>—</strong><button className="person-card__bind-trigger" type="button" onClick={openBind}>{copy.bindTitle}</button></div></div>
            </div>}
            {copyError && <p className="person-card__error" role="alert">{copyError}</p>}
          </div>
        </section>
        <section className="person-section" aria-labelledby="partner-title" hidden>
          <div className="person-section__heading"><div><p className="eyebrow">{copy.partnerKicker}</p><h2 id="partner-title">{copy.partnerTitle}</h2></div></div>
          <p className="person-section__lead">{copy.partnerLead}</p>
          <div className="person-assets" ref={assetHintsRef}><div><div className="person-assets__top"><div className="person-assets__label"><span>{copy.activationCodeCount}</span><details className="person-assets__hint"><summary aria-label={`${copy.activationCodes}${copy.assetHelp}`}>?</summary><p>{copy.activationHelp}</p></details></div><button type="button" onClick={() => openTransfer('activation')}>{copy.sendAsset}</button></div><strong>0 <small>{copy.codeUnit}</small></strong></div><div><div className="person-assets__top"><div className="person-assets__label"><span>{copy.bookingPoints}</span><details className="person-assets__hint"><summary aria-label={`${copy.bookingPoints}${copy.assetHelp}`}>?</summary><p>{copy.pointsHelp}</p></details></div><button type="button" onClick={() => openTransfer('points')}>{copy.sendAsset}</button></div><strong>0</strong><small>{copy.pointsRate}</small></div></div>
          <div className="person-partner__purchase"><div><strong>{copy.partnerPackage}</strong><p>{copy.partnerPayment}</p><small>{copy.packagePending}</small></div><button type="button" disabled>{copy.buyPackage}</button></div>
        </section>
        <InviteRecords email={email} onSessionExpired={onSignOut} />
      </div>
      {signOutOpen && <dialog className="balance-dialog person-signout-dialog" ref={signOutDialogRef} aria-labelledby="signout-dialog-title" aria-describedby="signout-dialog-message" onClose={() => setSignOutOpen(false)} onCancel={() => setSignOutOpen(false)}>
        <div className="balance-dialog__heading"><h2 id="signout-dialog-title">{copy.signOutTitle}</h2><button type="button" aria-label={copy.closeDialog} onClick={() => setSignOutOpen(false)}>{closeIcon}</button></div>
        <p id="signout-dialog-message">{copy.signOutMessage}</p>
        <div className="balance-dialog__footer"><button type="button" onClick={() => setSignOutOpen(false)}>{copy.cancel}</button><button type="button" onClick={() => { signOutDialogRef.current?.close(); onSignOut() }}>{copy.signOut}</button></div>
      </dialog>}
      {bindOpen && <dialog className="balance-dialog person-bind-dialog" ref={bindDialogRef} aria-labelledby="bind-dialog-title" onClose={() => setBindOpen(false)} onCancel={() => setBindOpen(false)}>
        <div className="balance-dialog__heading"><h2 id="bind-dialog-title">{copy.bindTitle}</h2><button type="button" aria-label={copy.closeDialog} onClick={() => setBindOpen(false)}>{closeIcon}</button></div>
        <div className="person-card__bind"><p>{copy.bindLead}</p><form onSubmit={handleBind}><label htmlFor="person-invite">{copy.bindTitle}</label><input id="person-invite" value={inviteInput} maxLength={512} autoComplete="off" placeholder={copy.invitePlaceholder} onChange={(event) => setInviteInput(event.target.value)} />{bindError && <p className="person-card__error" role="alert">{bindError}</p>}<div className="person-bind-dialog__actions"><button type="button" onClick={() => setBindOpen(false)}>{copy.cancel}</button><button type="submit" disabled={isBinding}>{copy.bind}</button></div></form></div>
      </dialog>}
      {transferOpen && <dialog className="balance-dialog person-transfer-dialog" ref={transferDialogRef} aria-labelledby="transfer-dialog-title" onClose={() => setTransferOpen(false)} onCancel={() => setTransferOpen(false)}>
        <div className="balance-dialog__heading"><h2 id="transfer-dialog-title">{transferAsset === 'activation' ? copy.activationTransferTitle : copy.pointsTransferTitle}</h2><button type="button" aria-label={copy.closeDialog} onClick={() => setTransferOpen(false)}>{closeIcon}</button></div>
        <p className="person-transfer-dialog__lead">{copy.transferLead}</p>
        <form className="person-transfer-dialog__form" onSubmit={(event) => event.preventDefault()}><label htmlFor="transfer-email">{copy.recipientEmail}</label><input id="transfer-email" type="email" autoComplete="email" placeholder="name@example.com" /><label htmlFor="transfer-amount">{copy.transferQuantity}</label><input id="transfer-amount" type="number" min="1" step="1" placeholder="0" /><div className="balance-dialog__footer"><button type="button" onClick={() => setTransferOpen(false)}>{copy.cancel}</button><button type="submit" disabled>{copy.confirmTransfer}</button></div></form>
      </dialog>}
      {balanceAction && <dialog className="balance-dialog" ref={balanceDialogRef} aria-labelledby="balance-dialog-title" onClose={() => setBalanceAction(null)} onCancel={() => setBalanceAction(null)}>
        <div className="balance-dialog__heading"><h2 id="balance-dialog-title">{balanceAction === 'deposit' ? copy.deposit : copy.withdraw}</h2><button type="button" aria-label={copy.closeDialog} onClick={() => setBalanceAction(null)}>{closeIcon}</button></div>
        {balanceAction === 'deposit' ? <div className="balance-dialog__content">
          <p>{copy.depositLead}</p>
          <div className="balance-dialog__network"><span>{copy.depositNetwork}</span><strong>{copy.networkPending}</strong></div>
          <label>{copy.depositAddress}</label>
          <div className="balance-dialog__address"><span>{copy.addressPending}</span><button type="button" disabled>{copy.copyAddress}</button></div>
          <p className="balance-dialog__notice">{copy.depositNotice}</p>
        </div> : <form className="balance-dialog__content balance-dialog__form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="withdraw-amount">{copy.withdrawAmount} <span>{copy.balanceLabel} $0.00</span></label>
          <div className="balance-dialog__input"><input id="withdraw-amount" type="number" min="0.01" step="0.01" inputMode="decimal" placeholder="0.00" /><span>USD</span></div>
          <div className="balance-dialog__network"><span>{copy.withdrawNetwork}</span><strong>{copy.networkPending}</strong></div>
          <label htmlFor="withdraw-address">{copy.withdrawAddress}</label>
          <input id="withdraw-address" type="text" autoComplete="off" placeholder="0x…" />
          <label htmlFor="withdraw-code">{copy.verificationCode} <span>{email}</span></label>
          <div className="balance-dialog__code"><input id="withdraw-code" inputMode="numeric" maxLength={6} placeholder={copy.codePlaceholder} /><button type="button" disabled>{copy.sendCode}</button></div>
          <p className="balance-dialog__notice">{copy.withdrawNotice}</p>
          <div className="balance-dialog__footer"><button type="button" onClick={() => setBalanceAction(null)}>{copy.cancel}</button><button type="submit" disabled>{copy.confirmWithdraw}</button></div>
        </form>}
      </dialog>}
    </main>
  )
}
