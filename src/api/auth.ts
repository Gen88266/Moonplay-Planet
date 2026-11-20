import { ApiError, postJson } from '@/api/http'
import type { Locale } from '@/utils/locale'
import { clearUserInfo, readUserInfo, updateUserInfo } from '@/utils/userInfoStorage'

interface RegistrationBody {
  data?: boolean | { is_register?: boolean }
  registered?: boolean
}

export async function isRegister(email: string) {
  const result = await postJson('/user/login/isRegister', { email })
  if (typeof result === 'boolean') return result
  if (!result || typeof result !== 'object') throw new ApiError(0, 'Invalid registration status response')

  const body = result as RegistrationBody
  if (typeof body.data === 'boolean') return body.data
  if (typeof body.data?.is_register === 'boolean') return body.data.is_register
  if (typeof body.registered === 'boolean') return body.registered
  throw new ApiError(0, 'Invalid registration status response')
}

export async function sendRegisterCode(email: string, lang: Locale) {
  await postJson('/user/login/sendSes', { email, module: 'register', lang })
}

export async function sendLoginCode(email: string, lang: Locale) {
  await postJson('/user/login/sendSes', { email, module: 'login', lang })
}

function readToken(result: unknown) {
  if (!result || typeof result !== 'object') return ''
  const data = (result as { data?: unknown }).data
  if (typeof data === 'string') return data.trim()
  if (!data || typeof data !== 'object') return ''
  const record = data as Record<string, unknown>
  const nested = record.data && typeof record.data === 'object' ? record.data as Record<string, unknown> : undefined
  const token = record.token ?? record.access_token ?? nested?.token ?? nested?.access_token
  return typeof token === 'string' ? token.trim() : ''
}

export function authHeaders(email: string): Record<string, string> {
  const token = readUserInfo().token.trim()
  return token ? { Token: token, Wallet: email } : { Wallet: email }
}

export function clearToken() {
  clearUserInfo()
}

export function isSessionExpired(error: unknown) {
  return error instanceof ApiError && error.code === 3
}

function storeToken(email: string, result: unknown) {
  const token = readToken(result)
  if (token) updateUserInfo({ auth: true, email, token })
}

export async function registerAccount(email: string, code: string, inviteCode: string) {
  storeToken(email, await postJson('/user/login/register', { email, code, invite_code: inviteCode }))
}

export async function loginAccount(email: string, loginCode: string) {
  storeToken(email, await postJson('/user/login/login', { email, login_code: loginCode }))
}

export async function bindReferrer(email: string, inviteCode: string) {
  await postJson('/user/login/bindReferrer', { invite_code: inviteCode }, authHeaders(email))
}
