import { useParams, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import LogForm from '../components/logs/LogForm'
import { LOG_TYPES } from '../constants/options'
import { useLogs } from '../hooks/useLogs'

/** 新增（/logs/new?type=回診）與編輯（/logs/:id）共用 */
export default function LogEdit() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const { logs, loading } = useLogs()
  const existing = id ? logs.find((l) => l.id === id) : undefined

  const typeParam = params.get('type') ?? ''
  const initialType = (LOG_TYPES as readonly string[]).includes(typeParam) ? typeParam : undefined

  return (
    <>
      <PageHeader title={id ? '編輯日誌' : '新增日誌'} back />
      <main className="px-4 py-5">
        {id && loading && <p className="text-sm text-steel">載入中…</p>}
        {id && !loading && !existing && <p className="text-sm text-steel">找不到這筆日誌，可能已被刪除。</p>}
        {(!id || existing) && <LogForm key={existing?.id ?? 'new'} existing={existing} initialType={initialType} />}
      </main>
    </>
  )
}
