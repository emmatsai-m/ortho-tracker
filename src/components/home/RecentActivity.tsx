import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/date'
import type { RecentItem } from '../../utils/recent'
import EmptyState from '../ui/EmptyState'

const labelStyle: Record<string, string> = {
  回診: 'bg-tide-soft text-tide-deep',
  身體感受: 'bg-line text-steel',
  特殊事件: 'bg-amber/15 text-amber',
  費用: 'bg-ink/10 text-ink',
  用品: 'bg-ink/10 text-ink',
}

export default function RecentActivity({ items }: { items: RecentItem[] }) {
  if (items.length === 0) {
    return <EmptyState title="還沒有紀錄" hint="按右下角的「＋」，快速記下回診、感受、花費或用品。" />
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.key}>
          <Link to={item.to} className="block rounded-2xl border border-line bg-card px-4 py-3 active:bg-tide-soft">
            <div className="flex items-center justify-between gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${labelStyle[item.label] ?? labelStyle['費用']}`}>
                {item.label}
              </span>
              <span className="text-xs text-steel">{formatDate(item.date)}</span>
            </div>
            <p className="mt-1.5 font-medium">{item.title}</p>
            {item.subtitle && <p className="truncate text-xs text-steel">{item.subtitle}</p>}
          </Link>
        </li>
      ))}
    </ul>
  )
}
