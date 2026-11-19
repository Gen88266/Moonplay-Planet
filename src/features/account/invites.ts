const invitePattern = /^[A-Za-z0-9-]{4,64}$/
const linkInvitePattern = /[?&#]invite_?code=([^&#\s]+)/i
const inviteCharacters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function parseInviteInput(value: string): string | null {
  const input = value.trim()
  if (invitePattern.test(input)) return input
  const match = input.match(linkInvitePattern)
  if (!match) return null
  try {
    const code = decodeURIComponent(match[1]).trim()
    return invitePattern.test(code) ? code : null
  } catch {
    return null
  }
}

export function createInviteCode(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)), (value) => inviteCharacters[value % inviteCharacters.length]).join('')
}
