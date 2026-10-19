import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { updateSupplyStatus } from '../../services/supplyService'
import type { Supply } from '../../types/models'
import { formatDate } from '../../utils/date'
import { formatTWD } from '../../utils/money'

const statusStyle: Record<string, string> = {
  未開封: 'bg-line text-steel',
  使用中: 'bg-tide-soft text-tide-deep',
  已用完: 'bg-amber/15 text-amber',
}

/** 一鍵切換到下一個狀態 */
const nextAction: Record<string, { label: string; next: string } | undefined> = {
  未開封: { label: '開始使用', next: '使用中' },
  使用中: { label: '用完了', next: '已用完' },
}

export default function SupplyListItem({ supply }: { supply: Supply }) {
  const { user } = useAuth()
  const [busy, setBusy] = useState(false)
  const action = nextAction[supply.status]

  const advance = async () => {
    if (!user || !action) return
    setBusy(true)
    try {
      await updateSupplyStatus(user.uid, supply.id, action.next)
    } finally {
      setBusy(false)
    }
  }

  const detail = [supply.brand, supply.spec].filter(Boolean).join(' · ')

  return (
    <li className="rounded-2xl border border-line bg-card">
      <Link to={`/supplies/${supply.id}`} className="block rounded-2xl px-4 py-3 active:bg-tide-soft">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-medium">{supply.name || supply.category}</p>
            {detail && <p className="truncate text-xs text-steel">{detail}</p>}
            <p className="truncate text-xs text-steel">
              {formatDate(supply.purchaseDate)}
              {supply.store && ` · ${supply.store}`}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold">{formatTWD(supply.totalPrice)}</p>
            <p className="text-xs text-steel">× {supply.quantity}</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-line px-4 py-2">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[supply.status] ?? statusStyle['未開封']}`}>
            {supply.status}
          </span>
          {supply.repurchase && <span className="text-xs text-steel">{supply.repurchase}</span>}
        </div>
        {action && (
          <button
            type="button"
            onClick={advance}
            disabled={busy}
            className="rounded-full border border-tide px-3 py-1 text-sm font-medium text-tide-deep active:bg-tide-soft disabled:opacity-50"
          >
            {action.label}
          </button>
        )}
      </div>
    </li>
  )
}
