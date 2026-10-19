import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/ui/EmptyState'

export default function Home() {
  return (
    <>
      <PageHeader title="矯正紀錄" showSettings />
      <main className="space-y-6 px-4 py-5">
        <section aria-labelledby="progress-title">
          <h2 id="progress-title" className="mb-2 text-base font-bold">
            療程進度
          </h2>
          <EmptyState title="還沒有療程資料" hint="到設定填入開始日與預計結束日，這裡就會顯示進度。" />
        </section>

        <section aria-labelledby="visit-title">
          <h2 id="visit-title" className="mb-2 text-base font-bold">
            下次回診
          </h2>
          <EmptyState title="還沒有回診預約" hint="記錄回診時填入下次日期，這裡會顯示倒數天數。" />
        </section>

        <section aria-labelledby="cost-title">
          <h2 id="cost-title" className="mb-2 text-base font-bold">
            費用摘要
          </h2>
          <EmptyState title="還沒有費用紀錄" hint="新增款項後，會顯示已付、待付與總花費。" />
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
