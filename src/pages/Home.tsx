import CostSummary from '../components/expenses/CostSummary'
import NextVisitCard from '../components/home/NextVisitCard'
import ProgressCard from '../components/home/ProgressCard'
import RecentActivity from '../components/home/RecentActivity'
import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/ui/EmptyState'
import LoadingCard from '../components/ui/LoadingCard'
import { useLogs } from '../hooks/useLogs'
import { usePayments } from '../hooks/usePayments'
import { useProfile } from '../hooks/useProfile'
import { useSupplies } from '../hooks/useSupplies'
import { summarizeCost } from '../utils/cost'
import { findNextVisit } from '../utils/logs'
import { buildRecent } from '../utils/recent'

export default function Home() {
  const profileState = useProfile()
  const paymentsState = usePayments()
  const suppliesState = useSupplies()
  const logsState = useLogs()

  const { profile } = profileState
  const { payments } = paymentsState
  const { supplies } = suppliesState
  const { logs } = logsState

  const error = profileState.error || paymentsState.error || suppliesState.error || logsState.error

  const suppliesTotal = supplies.reduce((sum, s) => sum + s.totalPrice, 0)
  const totalPrice = profile?.totalPrice ?? null
  const hasCost = payments.length > 0 || supplies.length > 0 || totalPrice !== null

  return (
    <>
      <PageHeader title="矯正紀錄" showSettings />
      <main className="space-y-6 px-4 py-5">
        {error && (
          <p role="alert" className="rounded-xl bg-amber/10 px-4 py-3 text-sm text-amber">
            {error}
          </p>
        )}

        <section aria-labelledby="progress-title">
          <h2 id="progress-title" className="mb-2 text-base font-bold">
            療程進度
          </h2>
          {profileState.loading ? <LoadingCard /> : <ProgressCard profile={profile} />}
        </section>

        <section aria-labelledby="visit-title">
          <h2 id="visit-title" className="mb-2 text-base font-bold">
            下次回診
          </h2>
          {logsState.loading ? <LoadingCard /> : <NextVisitCard log={findNextVisit(logs)} />}
        </section>

        <section aria-labelledby="cost-title">
          <h2 id="cost-title" className="mb-2 text-base font-bold">
            費用摘要
          </h2>
          {profileState.loading || paymentsState.loading || suppliesState.loading ? (
            <LoadingCard />
          ) : hasCost ? (
            <CostSummary compact summary={summarizeCost(payments, totalPrice, suppliesTotal)} totalPrice={totalPrice} />
          ) : (
            <EmptyState title="還沒有費用紀錄" hint="新增款項後，會顯示已付、待付與總花費。" />
          )}
        </section>

        <section aria-labelledby="recent-title">
          <h2 id="recent-title" className="mb-2 text-base font-bold">
            最近紀錄
          </h2>
          {logsState.loading || paymentsState.loading || suppliesState.loading ? (
            <LoadingCard />
          ) : (
            <RecentActivity items={buildRecent(logs, payments, supplies)} />
          )}
        </section>
      </main>
    </>
  )
}
