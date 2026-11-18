import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createInviteCode } from './invites'

interface AccountRecord {
  invitedBy: string
  ownInviteCode: string | null
  registeredAt: string | null
  activated: boolean
}

interface AccountState {
  email: string | null
  accounts: Record<string, AccountRecord>
}

const storageKey = 'moonplay-account-preview'

function loadAccount(): AccountState {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}') as { email?: unknown; accounts?: unknown }
    const accounts: AccountState['accounts'] = {}
    if (saved.accounts && typeof saved.accounts === 'object' && !Array.isArray(saved.accounts)) {
      for (const [address, value] of Object.entries(saved.accounts)) {
        const record = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null
        const invitedBy = typeof value === 'string' ? value : typeof record?.invitedBy === 'string' ? record.invitedBy : ''
        accounts[address] = {
          invitedBy,
          ownInviteCode: typeof record?.ownInviteCode === 'string' ? record.ownInviteCode : invitedBy ? createInviteCode() : null,
          registeredAt: typeof record?.registeredAt === 'string' && !Number.isNaN(Date.parse(record.registeredAt)) ? record.registeredAt : null,
          activated: record?.activated === true,
        }
      }
    }
    const email = typeof saved.email === 'string' && Object.prototype.hasOwnProperty.call(accounts, saved.email) ? saved.email : null
    return { accounts, email }
  } catch {
    return { email: null, accounts: {} }
  }
}

const accountSlice = createSlice({
  name: 'account',
  initialState: loadAccount,
  reducers: {
    signIn(state, action: PayloadAction<{ email: string; inviteCode: string; registeredAt: string }>) {
      const { email, inviteCode, registeredAt } = action.payload
      if (!Object.prototype.hasOwnProperty.call(state.accounts, email)) state.accounts[email] = { invitedBy: inviteCode, ownInviteCode: inviteCode ? createInviteCode() : null, registeredAt, activated: false }
      state.email = email
    },
    bindInvite(state, action: PayloadAction<string>) {
      if (state.email && state.accounts[state.email] && !state.accounts[state.email].ownInviteCode) {
        state.accounts[state.email].invitedBy = action.payload
        state.accounts[state.email].ownInviteCode = createInviteCode()
      }
    },
    signOut(state) { state.email = null },
  },
})

export function persistAccount(state: AccountState) {
  try { localStorage.setItem(storageKey, JSON.stringify(state)) } catch { /* Storage may be unavailable. */ }
}

export const { signIn, bindInvite, signOut } = accountSlice.actions
export default accountSlice.reducer
