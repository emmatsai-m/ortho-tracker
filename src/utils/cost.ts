import type { Payment } from '../types/models'

export type CostSummary = {
  /** 已付的療程款 */
  paidTreatment: number
  /** 額外牙科費用（已付） */
  extra: number
  /** 總花費 = 已付療程款 + 額外牙科費用（用品花費於用品功能完成後加入） */
  total: number
  /** 待付 = 療程總價 − 已付療程款；尚未設定總價時為 null */
  remaining: number | null
  /** 已排定、尚未付的款項合計 */
  scheduledPending: number
}

export function summarizeCost(payments: Payment[], totalPrice: number | null, suppliesTotal = 0): CostSummary {
  let paidTreatment = 0
  let extra = 0
  let scheduledPending = 0

  for (const p of payments) {
    if (p.status === '待付') {
      scheduledPending += p.amount
    } else if (p.kind === '療程款') {
      paidTreatment += p.amount
    } else {
      extra += p.amount
    }
  }

  return {
    paidTreatment,
    extra,
    total: paidTreatment + extra + suppliesTotal,
    remaining: totalPrice === null ? null : Math.max(totalPrice - paidTreatment, 0),
    scheduledPending,
  }
}
