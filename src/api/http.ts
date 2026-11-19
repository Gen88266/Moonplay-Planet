export class ApiError extends Error {
  constructor(readonly code: number, message: string) {
    super(message)
  }
}

interface ApiBody {
  code?: number
  msg?: string
}

export async function postJson(path: string, payload: object, headers: Record<string, string> = {}): Promise<unknown> {
  const response = await fetch(`/api/${path.replace(/^\/+/, '')}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(payload),
  })
  const text = await response.text()
  if (!text) {
    if (!response.ok) throw new ApiError(response.status, `Request failed: ${response.status}`)
    return {}
  }

  const result: unknown = JSON.parse(text)
  if (!result || typeof result !== 'object') {
    if (!response.ok) throw new ApiError(response.status, `Request failed: ${response.status}`)
    return result
  }

  const body = result as ApiBody
  const message = body.msg?.trim() || `Request failed: ${response.status}`
  if (typeof body.code === 'number' && body.code !== 0 && body.code !== 200) throw new ApiError(body.code, message)
  if (!response.ok) throw new ApiError(response.status, message)
  return result
}
