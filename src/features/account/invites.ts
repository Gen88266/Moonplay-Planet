const invitePattern = /^[A-Za-z0-9-]{4,64}$/
const inviteCharacters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function parseInviteInput(value: string): string | null {
  const input = value.trim()
  if (invitePattern.test(input)) return input.toUpperCase()
  try {
    const code = new URL(input).searchParams.get('invite_code')
    return code && invitePattern.test(code) ? code.toUpperCase() : null
  } catch {
    return null
  }
}

export function createInviteCode(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)), (value) => inviteCharacters[value % inviteCharacters.length]).join('')
}
