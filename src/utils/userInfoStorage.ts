export interface StoredUserInfo {
  auth: boolean
  email: string
  token: string
}

const storageKey = 'user-info'
const legacyTokenKey = 'moonplay-token'

function parseUserInfo(raw: string | null): StoredUserInfo | null {
  if (!raw) return null
  try {
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null
    const info = value as Record<string, unknown>
    return {
      auth: info.auth === true,
      email: typeof info.email === 'string' ? info.email : '',
      token: typeof info.token === 'string' ? info.token : '',
    }
  } catch {
    return null
  }
}

function writeUserInfo(info: StoredUserInfo) {
  try {
    if (!info.auth && !info.email && !info.token) localStorage.removeItem(storageKey)
    else localStorage.setItem(storageKey, JSON.stringify(info))
  } catch { /* Storage may be unavailable. */ }
}

export function readUserInfo(): StoredUserInfo {
  try {
    const saved = parseUserInfo(localStorage.getItem(storageKey))
    if (saved) return saved
    const legacyToken = localStorage.getItem(legacyTokenKey)?.trim()
    if (!legacyToken) return { auth: false, email: '', token: '' }
    const migrated = { auth: true, email: '', token: legacyToken }
    writeUserInfo(migrated)
    localStorage.removeItem(legacyTokenKey)
    return migrated
  } catch {
    return { auth: false, email: '', token: '' }
  }
}

export function updateUserInfo(patch: Partial<StoredUserInfo>) {
  writeUserInfo({ ...readUserInfo(), ...patch })
}

export function clearUserInfo() {
  try {
    localStorage.removeItem(storageKey)
    localStorage.removeItem(legacyTokenKey)
  } catch { /* Storage may be unavailable. */ }
}
