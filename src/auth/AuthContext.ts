import type { User } from 'firebase/auth'
import { createContext } from 'react'

export type AuthState = {
  /** 目前登入的使用者；未登入為 null */
  user: User | null
  /** 正在確認登入狀態（網頁剛開啟的短暫時間） */
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthState | null>(null)
