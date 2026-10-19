import { Link } from 'react-router-dom'
import type { CostSummary as Summary } from '../../utils/cost'
import { formatTWD } from '../../utils/money'

type Props = {
  summary: Summary
  totalPrice: number | null
  /** compact：首頁用的精簡版 */
  compact?: boolean
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'amber' }) {
  return (
    <div>
      <p className="text-xs text-steel">{label}</p>
      <p className={`text-lg font-bold ${tone === 'amber' ? 'text-amber' : ''}`}>{value}</p>
    </div>
  )
}

export default function CostSummary({ summary, totalPrice, compact }: Props) {
  const percent =
    totalPrice && totalPrice > 0 ? Math.min(100, Math.round((summary.paidTreatment / totalPrice) * 100)) : 0

  if (compact) {
    return (
      <Link to="/expenses" className="block rounded-2xl border border-line bg-card p-4 active:bg-tide-soft">
        <div className="grid grid-cols-3 gap-2">
          <Stat label="已付療程款" value={formatTWD(summary.paidTreatment)} />
          <Stat label="待付" value={summary.remaining === null ? '—' : formatTWD(summary.remaining)} tone="amber" />
          <Stat label="總花費" value={formatTWD(summary.total)} />
        </div>
        <p className="mt-3 text-xs text-tide-deep">查看明細</p>
      </Link>
    )
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-line bg-card p-4">
        <p className="text-sm text-steel">療程款</p>
        {totalPrice === null ? (
          <p className="mt-1 text-sm">
            尚未設定療程總價，
            <Link to="/settings" className="font-medium text-tide-deep underline">
              前往設定
            </Link>
          </p>
        ) : (
          <>
            <p className="mt-1 text-2xl font-bold">
              {formatTWD(summary.paidTreatment)}
              <span className="text-sm font-normal text-steel"> / {formatTWD(totalPrice)}</span>
            </p>
            <div
              className="mt-3 h-3 overflow-hidden rounded-full bg-tide-soft"
              role="progressbar"
              aria-label="療程款已付比例"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
            >
              <div className="h-full rounded-full bg-tide" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-2 text-sm">
              待付 <span className="font-bold text-amber">{formatTWD(summary.remaining ?? 0)}</span>
              {summary.scheduledPending > 0 && (
                <span className="text-steel">（其中已排定 {formatTWD(summary.scheduledPending)}）</span>
              )}
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-card p-4">
          <Stat label="額外牙科費用" value={formatTWD(summary.extra)} />
        </div>
        <div className="rounded-2xl border border-line bg-card p-4">
          <Stat label="總花費" value={formatTWD(summary.total)} />
        </div>
      </div>
    </div>
  )
}
