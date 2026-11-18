import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { initialLocale, type Locale } from '@/utils/locale'

interface SiteState {
  locale: Locale
  cartOpen: boolean
  notice: string | null
}

const initialState: SiteState = { locale: initialLocale(), cartOpen: false, notice: null }

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) { state.locale = action.payload },
    setCartOpen(state, action: PayloadAction<boolean>) { state.cartOpen = action.payload },
    setNotice(state, action: PayloadAction<string | null>) { state.notice = action.payload },
  },
})

export const { setLocale, setCartOpen, setNotice } = siteSlice.actions
export default siteSlice.reducer
