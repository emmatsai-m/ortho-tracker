import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/ui/EmptyState'

export default function Supplies() {
  return (
    <>
      <PageHeader title="用品" />
      <main className="px-4 py-5">
        <EmptyState title="還沒有用品紀錄" hint="之後可以在這裡記錄牙間刷、沖牙機等採購與使用狀態。" />
      </main>
    </>
  )
}
