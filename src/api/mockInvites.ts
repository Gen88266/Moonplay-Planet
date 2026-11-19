import type { DirectInvitee } from './user'

// 仅开发环境预览分页用：在地址后加 ?mockInvites=25 即生成对应数量的假数据
export function getMockInviteCount(): number {
  if (!import.meta.env.DEV) return 0
  const count = Number(new URLSearchParams(window.location.search).get('mockInvites'))
  return Number.isInteger(count) && count > 0 ? Math.min(count, 500) : 0
}

export function getMockInvitees(total: number, start: number, limit: number) {
  const dayMs = 24 * 60 * 60 * 1000
  const users: DirectInvitee[] = Array.from({ length: Math.max(Math.min(limit, total - start), 0) }, (_, offset) => {
    const index = start + offset + 1
    return {
      id: `mock-${index}`,
      email: `moon.user${String(index).padStart(2, '0')}@example.com`,
      createTime: Math.floor((Date.now() - index * dayMs) / 1000),
      isValid: index % 3 !== 0,
    }
  })
  return { users, total }
}
