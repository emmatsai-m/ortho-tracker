import { useParams } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import SupplyForm from '../components/supplies/SupplyForm'
import { useSupplies } from '../hooks/useSupplies'

/** 新增（/supplies/new）與編輯（/supplies/:id）共用 */
export default function SupplyEdit() {
  const { id } = useParams()
  const { supplies, loading } = useSupplies()
  const existing = id ? supplies.find((s) => s.id === id) : undefined

  return (
    <>
      <PageHeader title={id ? '編輯用品' : '新增用品'} back />
      <main className="px-4 py-5">
        {id && loading && <p className="text-sm text-steel">載入中…</p>}
        {id && !loading && !existing && <p className="text-sm text-steel">找不到這筆用品，可能已被刪除。</p>}
        {(!id || existing) && <SupplyForm key={existing?.id ?? 'new'} existing={existing} />}
      </main>
    </>
  )
}
