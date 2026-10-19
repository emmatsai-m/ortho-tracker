import type { Log, Payment, Supply } from '../types/models'
import { formatTWD } from './money'
import { summarizeLog } from './logs'

export type RecentItem = {
  key: string
  /** 標籤：回診、身體感受、特殊事件、費用、用品 */
  label: string
  title: string
  subtitle: string
  /** YYYY-MM-DD，用來排序與顯示 */
  date: string
  /** 點開後前往的編輯頁 */
  to: string
}

/** 把日誌、款項、用品合併，依日期由新到舊取前 limit 筆 */
export function buildRecent(logs: Log[], payments: Payment[], supplies: Supply[], limit = 5): RecentItem[] {
  const items: RecentItem[] = [
    ...logs.map((l) => ({
      key: `log-${l.id}`,
      label: l.type,
      title: summarizeLog(l),
      subtitle: l.note,
      date: l.date,
      to: `/logs/${l.id}`,
    })),
    ...payments.map((p) => ({
      key: `payment-${p.id}`,
      label: '費用',
      title: `${p.kind} ${formatTWD(p.amount)}`,
      subtitle: [p.status === '待付' ? '待付' : '', p.method].filter(Boolean).join(' · '),
      date: p.date,
      to: `/expenses/${p.id}`,
    })),
    ...supplies.map((s) => ({
      key: `supply-${s.id}`,
      label: '用品',
      title: s.name || s.category,
      subtitle: [s.brand, `× ${s.quantity}`, formatTWD(s.totalPrice)].filter(Boolean).join(' · '),
      date: s.purchaseDate,
      to: `/supplies/${s.id}`,
    })),
  ]

  // 沒有日期的排在最後
  return items
    .sort((a, b) => (a.date === b.date ? 0 : !a.date ? 1 : !b.date ? -1 : b.date.localeCompare(a.date)))
    .slice(0, limit)
}
