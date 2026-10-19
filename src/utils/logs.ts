import type { Log } from '../types/models'
import { parseDate, today } from './date'

/** 找出今天（含）之後最近的一次預約回診；沒有則為 undefined */
export function findNextVisit(logs: Log[]): Log | undefined {
  const now = today()
  return logs
    .filter((l) => {
      const d = parseDate(l.nextVisitDate)
      return d !== null && d >= now
    })
    .sort((a, b) => a.nextVisitDate.localeCompare(b.nextVisitDate))[0]
}

/** 列表上的一句話摘要 */
export function summarizeLog(log: Log): string {
  switch (log.type) {
    case '回診':
      return log.items.length > 0 ? log.items.join('、') : '回診'
    case '身體感受': {
      const pain = log.painLevel === null ? '' : `疼痛 ${log.painLevel}/5`
      return [pain, log.symptoms.join('、')].filter(Boolean).join(' · ') || '身體感受'
    }
    default:
      return log.eventTags.length > 0 ? log.eventTags.join('、') : '特殊事件'
  }
}
