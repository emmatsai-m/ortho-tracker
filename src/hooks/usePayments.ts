import { onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { parsePayment, paymentsCol } from '../services/paymentService'
import type { Payment } from '../types/models'

type State = { payments: Payment[]; loading: boolean; error: string }

/** 即時讀取所有款項，依日期由新到舊 */
export function usePayments(): State {
  const { user } = useAuth()
  const uid = user?.uid
  const [state, setState] = useState<State>({ payments: [], loading: true, error: '' })

  useEffect(() => {
    if (!uid) return
    return onSnapshot(
      query(paymentsCol(uid), orderBy('date', 'desc')),
      (snap) =>
        setState({ payments: snap.docs.map((d) => parsePayment(d.id, d.data())), loading: false, error: '' }),
      (err) =>
        setState({
          payments: [],
          loading: false,
          error: err.code === 'permission-denied' ? '沒有讀取權限，請檢查 Firestore 規則中的 UID。' : '讀取資料失敗，請稍後再試。',
        }),
    )
  }, [uid])

  return state
}
