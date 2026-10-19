import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/ui/EmptyState'

export default function Expenses() {
  return (
    <>
      <PageHeader title="費用" />
      <main className="px-4 py-5">
        <EmptyState title="還沒有費用紀錄" hint="之後可以在這裡記錄療程款、額外牙科費用，並查看已付與待付。" />
      </main>
    </>
  )
}
