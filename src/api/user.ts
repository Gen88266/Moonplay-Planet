import { authHeaders } from '@/api/auth'
import { postJson } from '@/api/http'

export interface UserData {
  inviteCode: string
}

function asRecord(value: unknown) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : undefined
}

export async function getUserData(email: string): Promise<UserData> {
  const result = asRecord(await postJson('/user/user/getUserData', {}, authHeaders(email)))
  const root = asRecord(result?.data)
  const nested = asRecord(root?.data)
  const records = [root?.user_data, nested?.user_data, root?.user, nested?.user, root, nested].map(asRecord)
  for (const record of records) {
    const value = record?.invite_code ?? record?.inviteCode
    if (typeof value === 'string' && value.trim()) return { inviteCode: value.trim() }
  }
  return { inviteCode: '' }
}

export interface DirectInvitee {
  id: string
  email: string
  createTime: number
  isValid: boolean
}

function readInvitee(value: unknown, index: number): DirectInvitee {
  const record = asRecord(value) ?? {}
  const createTime = Number(record.create_time ?? 0)
  return {
    id: String(record.id ?? `${record.email ?? ''}-${index}`),
    email: typeof record.email === 'string' ? record.email.trim() : '',
    createTime: Number.isFinite(createTime) ? createTime : 0,
    isValid: record.is_valid === 1 || record.is_valid === '1' || record.is_valid === true,
  }
}

export async function getDirectRecommendationUserList(email: string, start: number, limit: number) {
  const result = asRecord(await postJson('/user/user/getDirectRecommendationUserList', { start, limit }, authHeaders(email)))
  const data = result?.data
  const box = asRecord(data)
  const list = Array.isArray(data) ? data : box?.list ?? box?.records ?? box?.rows ?? box?.data
  const users = Array.isArray(list) ? list.map(readInvitee) : []
  const total = Number(box?.total ?? box?.total_count ?? box?.count ?? result?.total ?? users.length)
  return { users, total: Number.isFinite(total) ? total : users.length }
}
