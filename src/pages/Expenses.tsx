import { Link } from 'react-router-dom'
import CostSummary from '../components/expenses/CostSummary'
import PaymentListItem from '../components/expenses/PaymentListItem'
import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/ui/EmptyState'
import { usePayments } from '../hooks/usePayments'
import { useProfile } from '../hooks/useProfile'
import { useSupplies } from '../hooks/useSupplies'
import { summarizeCost } from '../utils/cost'

export default function Expenses() {
  const { payments, loading, error } = usePayments()
  const { profile } = useProfile()
  const { supplies } = useSupplies()
  const suppliesTotal = supplies.reduce((sum, s) => sum + s.totalPrice, 0)
  const summary = summarizeCost(payments, profile?.totalPrice ?? null, suppliesTotal)

  return (
    <>
      <PageHeader title="費用" />
      <main className="space-y-6 px-4 py-5">
        {error && (
          <p role="alert" className="rounded-xl bg-amber/10 px-4 py-3 text-sm text-amber">
            {error}
          </p>
        )}

        <CostSummary summary={summary} totalPrice={profile?.totalPrice ?? null} />

        <section aria-labelledby="list-title">
          <div className="mb-2 flex items-center justify-between">
            <h2 id="list-title" className="text-base font-bold">
              款項明細
            </h2>
            <Link to="/expenses/new" className="rounded-full bg-tide px-4 py-2 text-sm font-bold text-white active:bg-tide-deep">
              ＋ 新增款項
            </Link>
          </div>

          {loading && <p className="text-sm text-steel">載入中…</p>}
          {!loading && payments.length === 0 && !error && (
            <EmptyState title="還沒有費用紀錄" hint="按「新增款項」記錄療程款、回診費或其他牙科費用。" />
          )}
          {payments.length > 0 && (
            <ul className="space-y-2">
              {payments.map((p) => (
                <PaymentListItem key={p.id} payment={p} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}
