import { onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { logsCol, parseLog } from '../services/logService'
import type { Log } from '../types/models'

type State = { logs: Log[]; loading: boolean; error: string }

/** 即時讀取所有日誌，依日期由新到舊 */
export function useLogs(): State {
  const { user } = useAuth()
  const uid = user?.uid
  const [state, setState] = useState<State>({ logs: [], loading: true, error: '' })

  useEffect(() => {
    if (!uid) return
    return onSnapshot(
      query(logsCol(uid), orderBy('date', 'desc')),
      (snap) => setState({ logs: snap.docs.map((d) => parseLog(d.id, d.data())), loading: false, error: '' }),
      (err) =>
        setState({
          logs: [],
          loading: false,
          error: err.code === 'permission-denied' ? '沒有讀取權限，請檢查 Firestore 規則中的 UID。' : '讀取資料失敗，請稍後再試。',
        }),
    )
  }, [uid])

  return state
}
