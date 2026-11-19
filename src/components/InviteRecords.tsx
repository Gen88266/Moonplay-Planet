import { useEffect, useRef, useState } from 'react'
import { isSessionExpired } from '@/api/auth'
import { getDirectRecommendationUserList, type DirectInvitee } from '@/api/user'
import { useAppSelector } from '@/app/hooks'
import { messages } from '@/i18n/messages'
import { formatRecordTime } from '@/utils/formatRecordTime'

interface InviteRecordsProps {
  email: string
  onSessionExpired: () => void
}

const pageSize = 10

export function InviteRecords({ email, onSessionExpired }: InviteRecordsProps) {
  const locale = useAppSelector((state) => state.site.locale)
  const copy = messages[locale].auth
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState<DirectInvitee[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const onSessionExpiredRef = useRef(onSessionExpired)
  onSessionExpiredRef.current = onSessionExpired

  useEffect(() => {
    let isActive = true
    setIsLoading(true)
    setHasError(false)
    getDirectRecommendationUserList(email, (page - 1) * pageSize, pageSize)
      .then((result) => {
        if (!isActive) return
        setUsers(result.users)
        setTotal(result.total)
      })
      .catch((error: unknown) => {
        if (!isActive) return
        if (isSessionExpired(error)) return onSessionExpiredRef.current()
        setHasError(true)
      })
      .finally(() => { if (isActive) setIsLoading(false) })
    return () => { isActive = false }
  }, [email, page])

  const pageCount = Math.max(Math.ceil(total / pageSize), 1)
  const formatDate = (seconds: number) => seconds > 0 ? formatRecordTime(seconds, locale) : '—'

  return (
    <section className="person-section person-section--invite-records" aria-labelledby="invite-records-title" aria-busy={isLoading}>
      <div className="person-section__heading"><div><p className="eyebrow">{copy.inviteRecordsKicker}</p><h2 id="invite-records-title">{copy.inviteRecordsTitle}</h2></div><strong>{total} {copy.peopleUnit}</strong></div>
      {hasError && !users.length ? <p className="person-section__empty" role="alert">{copy.requestFailed}</p>
        : users.length ? <>
          <div className="person-records">
            <div className="person-records__head"><span>{copy.inviteeAddress}</span><span>{copy.registeredAt}</span></div>
            {users.map((user) => <div className="person-records__row" key={user.id}><strong><i className="person-records__label">{copy.accountLabel}</i>{user.email || '—'}</strong><span><i className="person-records__label">{copy.registeredAt}</i>{formatDate(user.createTime)}</span></div>)}
          </div>
          {pageCount > 1 && <nav className="person-records__pagination" aria-label={copy.inviteRecordsTitle}>
            <button type="button" disabled={page === 1 || isLoading} onClick={() => setPage(page - 1)}>{copy.previousPage}</button>
            <span>{page} / {pageCount}</span>
            <button type="button" disabled={page >= pageCount || isLoading} onClick={() => setPage(page + 1)}>{copy.nextPage}</button>
          </nav>}
        </> : <p className="person-section__empty">{copy.noInviteRecords}</p>}
    </section>
  )
}
