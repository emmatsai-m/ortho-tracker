import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/ui/EmptyState'

export default function Settings() {
  return (
    <>
      <PageHeader title="設定" back />
      <main className="px-4 py-5">
        <EmptyState title="療程資料與備份" hint="之後可以在這裡填寫療程基本資料，並匯出備份。" />
      </main>
    </>
  )
}
