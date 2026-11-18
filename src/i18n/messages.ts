import type { Locale } from '@/utils/locale'
import { tw, type Copy } from './tw'
import { ko } from './ko'
import { en } from './en'

export const messages: Record<Locale, Copy> = { tw, ko, en }
