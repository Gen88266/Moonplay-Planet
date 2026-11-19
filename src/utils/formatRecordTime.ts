import { getdata } from '@/utils/getdata'

/** 统一格式化接口时间：兼容秒、毫秒时间戳和日期字符串。英文 Oct 19 2026 21:51:28，其他语言 2026-10-19 21:51:28。 */
export function formatRecordTime(raw: unknown, locale: unknown): string {
  if (raw == null || raw === '') return '--'
  const input =
    typeof raw === 'number' && Number.isFinite(raw)
      ? raw > 1e12
        ? raw
        : raw * 1000
      : String(raw).trim()
  if (input === '') return '--'
  const date = getdata(input)
  return String(locale) === 'en' ? date.langEnStr : date.timeDetail
}
