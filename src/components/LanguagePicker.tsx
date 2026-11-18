import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setLocale } from '@/features/site/siteSlice'
import { locales, persistLocale } from '@/utils/locale'

const localeLabels = { tw: '繁體中文', ko: '한국어', en: 'English' }

interface LanguagePickerProps {
  onOpenChange?: (open: boolean) => void
}

export function LanguagePicker({ onOpenChange }: LanguagePickerProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const locale = useAppSelector((state) => state.site.locale)

  function updateOpen(next: boolean) {
    setOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
        onOpenChange?.(false)
      }
    }
    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [onOpenChange])

  function handleLocale(value: string) {
    const next = locales.find((item) => item === value)
    if (!next) return
    dispatch(setLocale(next))
    persistLocale(next)
    updateOpen(false)
    triggerRef.current?.focus()
  }

  return <div className="locale-picker" ref={menuRef} onKeyDown={(event) => {
    if (event.key === 'Escape') {
      updateOpen(false)
      triggerRef.current?.focus()
    }
  }}>
    <button className="locale-picker__trigger" ref={triggerRef} type="button" aria-label="Language" aria-expanded={open} aria-haspopup="true" onClick={() => updateOpen(!open)}>
      <svg className="locale-picker__globe" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M3 12h18M12 3c-2.3 2.5-3.5 5.5-3.5 9s1.2 6.5 3.5 9c2.3-2.5 3.5-5.5 3.5-9S14.3 5.5 12 3Z" stroke="currentColor" strokeWidth="1.5"/></svg>
      <span className="locale-picker__label">{localeLabels[locale]}</span>
      <svg className="locale-picker__chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m2 4 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
    {open && <div className="locale-picker__menu">
      {locales.map((item) => <button className={locale === item ? 'is-active' : ''} key={item} type="button" aria-pressed={locale === item} onClick={() => handleLocale(item)}>{localeLabels[item]}</button>)}
    </div>}
  </div>
}
