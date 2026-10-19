import { Link } from 'react-router-dom'
import type { Log } from '../../types/models'
import { daysBetween, formatDate, parseDate, today } from '../../utils/date'
import EmptyState from '../ui/EmptyState'

export default function NextVisitCard({ log }: { log: Log | undefined }) {
  const date = log ? parseDate(log.nextVisitDate) : null
  if (!log || !date) {
    return <EmptyState title="還沒有回診預約" hint="記錄回診時填入下次日期，這裡會顯示倒數天數。" />
  }

  const days = daysBetween(today(), date)
  const countdown = days === 0 ? '就是今天' : days === 1 ? '明天' : `還有 ${days} 天`

  return (
    <Link to={`/logs/${log.id}`} className="block rounded-2xl border border-line bg-card p-4 active:bg-tide-soft">
      <p className="text-2xl font-bold">{countdown}</p>
      <p className="text-sm text-steel">{formatDate(log.nextVisitDate)}</p>
    </Link>
  )
}
