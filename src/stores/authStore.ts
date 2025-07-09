import Cookies from 'js-cookie'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { LoginResponse, useApiStore } from './apiStore'

const ACCESS_TOKEN = 'toca-cookie'

interface AuthState {
  auth: {
    user: LoginResponse['user'] | null
    setUser: (user: LoginResponse['user'] | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => {
    const cookieState = Cookies.get(ACCESS_TOKEN)
    const initToken = cookieState ? JSON.parse(cookieState) : ''
    if (initToken) {
      useApiStore.getState().setAuthHeader()
    }
    return {
      auth: {
        user: null,
        setUser: (user) =>
          set((state) => ({ ...state, auth: { ...state.auth, user } })),
        accessToken: initToken,
        setAccessToken: (accessToken) =>
          set((state) => {
            Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken))
            return { ...state, auth: { ...state.auth, accessToken } }
          }),
        resetAccessToken: () =>
          set((state) => {
            Cookies.remove(ACCESS_TOKEN)
            return { ...state, auth: { ...state.auth, accessToken: '' } }
          }),
        reset: () =>
          set((state) => {
            Cookies.remove(ACCESS_TOKEN)
            return {
              ...state,
              auth: { ...state.auth, user: null, accessToken: '' },
            }
          }),
      },
    }
  })
)
