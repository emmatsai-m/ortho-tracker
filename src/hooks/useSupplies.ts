import { onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { parseSupply, suppliesCol } from '../services/supplyService'
import type { Supply } from '../types/models'

type State = { supplies: Supply[]; loading: boolean; error: string }

/** 即時讀取所有用品，依購買日期由新到舊 */
export function useSupplies(): State {
  const { user } = useAuth()
  const uid = user?.uid
  const [state, setState] = useState<State>({ supplies: [], loading: true, error: '' })

  useEffect(() => {
    if (!uid) return
    return onSnapshot(
      query(suppliesCol(uid), orderBy('purchaseDate', 'desc')),
      (snap) =>
        setState({ supplies: snap.docs.map((d) => parseSupply(d.id, d.data())), loading: false, error: '' }),
      (err) =>
        setState({
          supplies: [],
          loading: false,
          error: err.code === 'permission-denied' ? '沒有讀取權限，請檢查 Firestore 規則中的 UID。' : '讀取資料失敗，請稍後再試。',
        }),
    )
  }, [uid])

  return state
}
