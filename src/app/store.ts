import { configureStore } from '@reduxjs/toolkit'
import site from '@/features/site/siteSlice'
import account from '@/features/account/accountSlice'

export const store = configureStore({ reducer: { site, account } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
