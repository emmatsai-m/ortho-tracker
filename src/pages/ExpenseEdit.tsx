import { useParams } from 'react-router-dom'
import PaymentForm from '../components/expenses/PaymentForm'
import PageHeader from '../components/layout/PageHeader'
import { usePayments } from '../hooks/usePayments'

/** 新增（/expenses/new）與編輯（/expenses/:id）共用 */
export default function ExpenseEdit() {
  const { id } = useParams()
  const { payments, loading } = usePayments()
  const existing = id ? payments.find((p) => p.id === id) : undefined

  return (
    <>
      <PageHeader title={id ? '編輯款項' : '新增款項'} back />
      <main className="px-4 py-5">
        {id && loading && <p className="text-sm text-steel">載入中…</p>}
        {id && !loading && !existing && <p className="text-sm text-steel">找不到這筆款項，可能已被刪除。</p>}
        {(!id || existing) && <PaymentForm key={existing?.id ?? 'new'} existing={existing} />}
      </main>
    </>
  )
}
