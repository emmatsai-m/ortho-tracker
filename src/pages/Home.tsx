import PageHeader from '../components/layout/PageHeader'
import CostSummary from '../components/expenses/CostSummary'
import NextVisitCard from '../components/home/NextVisitCard'
import ProgressCard from '../components/home/ProgressCard'
import EmptyState from '../components/ui/EmptyState'
import { useLogs } from '../hooks/useLogs'
import { usePayments } from '../hooks/usePayments'
import { useProfile } from '../hooks/useProfile'
import { useSupplies } from '../hooks/useSupplies'
import { summarizeCost } from '../utils/cost'
import { findNextVisit } from '../utils/logs'

export default function Home() {
  const { profile } = useProfile()
  const { payments } = usePayments()
  const { supplies } = useSupplies()
  const { logs } = useLogs()
  const suppliesTotal = supplies.reduce((sum, s) => sum + s.totalPrice, 0)
  const totalPrice = profile?.totalPrice ?? null
  const hasCost = payments.length > 0 || supplies.length > 0 || totalPrice !== null
  return (
    <>
      <PageHeader title="矯正紀錄" showSettings />
      <main className="space-y-6 px-4 py-5">
        <section aria-labelledby="progress-title">
          <h2 id="progress-title" className="mb-2 text-base font-bold">
            療程進度
          </h2>
          <ProgressCard profile={profile} />
        </section>

        <section aria-labelledby="visit-title">
          <h2 id="visit-title" className="mb-2 text-base font-bold">
            下次回診
          </h2>
          <NextVisitCard log={findNextVisit(logs)} />
        </section>

        <section aria-labelledby="cost-title">
          <h2 id="cost-title" className="mb-2 text-base font-bold">
            費用摘要
          </h2>
          {hasCost ? (
            <CostSummary compact summary={summarizeCost(payments, totalPrice, suppliesTotal)} totalPrice={totalPrice} />
          ) : (
            <EmptyState title="還沒有費用紀錄" hint="新增款項後，會顯示已付、待付與總花費。" />
          )}
        </section>

        <section aria-labelledby="recent-title">
          <h2 id="recent-title" className="mb-2 text-base font-bold">
            最近紀錄
          </h2>
          <EmptyState title="還沒有紀錄" hint="按右下角的「＋」，快速記下回診、感受、花費或用品。" />
        </section>
      </main>
    </>
  )
}
