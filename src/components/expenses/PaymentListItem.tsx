import { Link } from 'react-router-dom'
import type { Payment } from '../../types/models'
import { formatDate } from '../../utils/date'
import { formatTWD } from '../../utils/money'

export default function PaymentListItem({ payment }: { payment: Payment }) {
  const pending = payment.status === '待付'
  const dateText = pending
    ? payment.dueDate
      ? `預計 ${formatDate(payment.dueDate)}`
      : '未訂付款日'
    : formatDate(payment.date)

  return (
    <li>
      <Link
        to={`/expenses/${payment.id}`}
        className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 active:bg-tide-soft"
      >
        <div className="min-w-0 flex-1">
          <p className="font-medium">{payment.kind}</p>
          <p className="truncate text-xs text-steel">
            {dateText}
            {payment.method && ` · ${payment.method}`}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold">{formatTWD(payment.amount)}</p>
          <span
            className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
              pending ? 'bg-amber/15 text-amber' : 'bg-tide-soft text-tide-deep'
            }`}
          >
            {payment.status}
          </span>
        </div>
      </Link>
    </li>
  )
}
