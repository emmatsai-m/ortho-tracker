import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { parseProfile, profileRef } from '../services/profileService'
import type { Profile } from '../types/models'

type State = { profile: Profile | null; loading: boolean; error: string }

/** 即時讀取療程基本資料；尚未填寫時 profile 為 null */
export function useProfile(): State {
  const { user } = useAuth()
  const uid = user?.uid
  const [state, setState] = useState<State>({ profile: null, loading: true, error: '' })

  useEffect(() => {
    if (!uid) return
    return onSnapshot(
      profileRef(uid),
      (snap) => setState({ profile: snap.exists() ? parseProfile(snap.data()) : null, loading: false, error: '' }),
      (err) =>
        setState({
          profile: null,
          loading: false,
          error: err.code === 'permission-denied' ? '沒有讀取權限，請檢查 Firestore 規則中的 UID。' : '讀取資料失敗，請稍後再試。',
        }),
    )
  }, [uid])

  return state
}
