import { useEffect, useRef, useState } from 'react'
import { ApiError } from '@/api/http'
import { isRegister, sendLoginCode, sendRegisterCode } from '@/api/auth'
import type { Locale } from '@/utils/locale'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readError(error: unknown, fallback: string) {
  return error instanceof ApiError && error.message.trim() ? error.message : fallback
}

export function useAccountAccess(locale: Locale, requestFailed: string) {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [resendSeconds, setResendSeconds] = useState(0)
  const requestId = useRef(0)
  const normalizedEmail = email.trim().toLowerCase()
  const isEmailValid = emailPattern.test(normalizedEmail)

  useEffect(() => {
    if (resendSeconds <= 0) return
    const timer = window.setTimeout(() => setResendSeconds((value) => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [resendSeconds])

  useEffect(() => {
    setCode('')
    setCodeSent(false)
    setErrorMessage('')
    setResendSeconds(0)
    setIsRegistered(null)
    if (!isEmailValid) {
      setIsChecking(false)
      return
    }

    const currentId = ++requestId.current
    setIsChecking(true)
    const timer = window.setTimeout(() => {
      void isRegister(normalizedEmail)
        .then((registered) => {
          if (currentId !== requestId.current) return
          setIsRegistered(registered)
          setErrorMessage('')
        })
        .catch((error: unknown) => {
          if (currentId !== requestId.current) return
          setIsRegistered(null)
          setErrorMessage(readError(error, requestFailed))
        })
        .finally(() => {
          if (currentId === requestId.current) setIsChecking(false)
        })
    }, 400)

    return () => {
      window.clearTimeout(timer)
      if (requestId.current === currentId) requestId.current += 1
    }
  }, [isEmailValid, normalizedEmail, requestFailed])

  async function onSendCode() {
    if (!isEmailValid || isRegistered === null || isChecking || isSending || resendSeconds > 0) return
    const currentId = requestId.current
    setIsSending(true)
    setErrorMessage('')
    try {
      const registered = await isRegister(normalizedEmail)
      if (currentId !== requestId.current) return
      setIsRegistered(registered)
      const sendCode = registered ? sendLoginCode : sendRegisterCode
      await sendCode(normalizedEmail, locale)
      if (currentId !== requestId.current) return
      setCodeSent(true)
      setResendSeconds(60)
    } catch (error) {
      if (currentId !== requestId.current) return
      setCodeSent(false)
      setErrorMessage(readError(error, requestFailed))
    } finally {
      if (currentId === requestId.current) setIsSending(false)
    }
  }

  return {
    email,
    code,
    setCode,
    normalizedEmail,
    isEmailValid,
    isRegistered,
    isChecking,
    isSending,
    resendSeconds,
    codeSent,
    errorMessage,
    setErrorMessage,
    onEmailChange: setEmail,
    onSendCode,
  }
}
