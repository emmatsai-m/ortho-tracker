import { Link } from 'react-router-dom'
import type { Log } from '../../types/models'
import { formatDate } from '../../utils/date'
import { summarizeLog } from '../../utils/logs'

const typeStyle: Record<string, string> = {
  回診: 'bg-tide-soft text-tide-deep',
  身體感受: 'bg-line text-steel',
  特殊事件: 'bg-amber/15 text-amber',
}

export default function LogListItem({ log }: { log: Log }) {
  return (
    <li>
      <Link
        to={`/logs/${log.id}`}
        className="block rounded-2xl border border-line bg-card px-4 py-3 active:bg-tide-soft"
      >
        <div className="flex items-center justify-between gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeStyle[log.type] ?? typeStyle['身體感受']}`}>
            {log.type}
          </span>
          <span className="text-xs text-steel">{formatDate(log.date)}</span>
        </div>
        <p className="mt-1.5 font-medium">{summarizeLog(log)}</p>
        {log.nextVisitDate && <p className="text-xs text-steel">下次回診 {formatDate(log.nextVisitDate)}</p>}
        {log.note && <p className="mt-0.5 truncate text-xs text-steel">{log.note}</p>}
      </Link>
    </li>
  )
}
