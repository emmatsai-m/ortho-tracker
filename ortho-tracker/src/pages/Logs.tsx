import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/ui/EmptyState'

export default function Logs() {
  return (
    <>
      <PageHeader title="療程日誌" />
      <main className="px-4 py-5">
        <EmptyState title="還沒有日誌" hint="之後可以在這裡記錄回診、身體感受與特殊事件。" />
      </main>
    </>
  )
}
