import { Link } from 'react-router-dom'
import type { Profile } from '../../types/models'
import { daysBetween, formatDate, parseDate, today } from '../../utils/date'
import EmptyState from '../ui/EmptyState'

export default function ProgressCard({ profile }: { profile: Profile | null }) {
  const start = profile ? parseDate(profile.startDate) : null
  const end = profile ? parseDate(profile.expectedEndDate) : null

  if (!profile || !start) {
    return (
      <div>
        <EmptyState title="還沒有療程資料" hint="到設定填入開始日與預計結束日，這裡就會顯示進度。" />
        <Link to="/settings" className="mt-3 block rounded-xl bg-tide-soft py-3 text-center text-base font-medium text-tide-deep active:bg-tide active:text-white">
          前往設定
        </Link>
      </div>
    )
  }

  const now = today()
  const elapsed = daysBetween(start, now)
  const notStarted = elapsed < 0

  let percent = 0
  let summary = ''
  if (notStarted) {
    summary = `距離開始還有 ${-elapsed} 天`
  } else if (end && end >= start) {
    const total = Math.max(daysBetween(start, end), 1)
    percent = Math.min(100, Math.round((elapsed / total) * 100))
    const remaining = daysBetween(now, end)
    summary = remaining >= 0 ? `剩餘 ${remaining} 天` : `已超過預計結束日 ${-remaining} 天`
  } else {
    summary = '尚未填寫預計結束日'
  }

  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      {profile.treatmentType && <p className="text-sm text-steel">{profile.treatmentType}</p>}
      <p className="mt-1 text-2xl font-bold">{notStarted ? '尚未開始' : `第 ${elapsed + 1} 天`}</p>
      <p className="text-sm text-steel">{summary}</p>

      {end && !notStarted && (
        <div
          className="mt-3 h-3 overflow-hidden rounded-full bg-tide-soft"
          role="progressbar"
          aria-label="療程進度"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div className="h-full rounded-full bg-tide" style={{ width: `${percent}%` }} />
        </div>
      )}

      <p className="mt-3 text-xs text-steel">
        {formatDate(profile.startDate)}
        {profile.expectedEndDate && ` → ${formatDate(profile.expectedEndDate)}`}
      </p>
    </div>
  )
}
