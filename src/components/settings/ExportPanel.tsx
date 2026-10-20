import { useLogs } from '../../hooks/useLogs'
import { usePayments } from '../../hooks/usePayments'
import { useProfile } from '../../hooks/useProfile'
import { useSupplies } from '../../hooks/useSupplies'
import { buildBackupJson, buildExpensesCsv } from '../../utils/backup'
import { today, toDateString } from '../../utils/date'
import { downloadTextFile } from '../../utils/download'
import LoadingCard from '../ui/LoadingCard'

export default function ExportPanel() {
  const profileState = useProfile()
  const logsState = useLogs()
  const paymentsState = usePayments()
  const suppliesState = useSupplies()

  const loading = profileState.loading || logsState.loading || paymentsState.loading || suppliesState.loading
  const error = profileState.error || logsState.error || paymentsState.error || suppliesState.error

  if (loading) return <LoadingCard />

  const stamp = toDateString(today())
  const { profile } = profileState
  const { logs } = logsState
  const { payments } = paymentsState
  const { supplies } = suppliesState

  const exportJson = () =>
    downloadTextFile(
      `ortho-tracker-backup-${stamp}.json`,
      buildBackupJson({ profile, logs, payments, supplies }),
      'application/json',
    )

  const exportCsv = () =>
    downloadTextFile(`ortho-tracker-expenses-${stamp}.csv`, buildExpensesCsv(payments, supplies), 'text/csv')

  const btn =
    'w-full rounded-xl border border-line py-3 text-base font-medium text-ink active:bg-tide-soft disabled:opacity-50'

  return (
    <div className="space-y-3 rounded-2xl border border-line bg-card p-4">
      <p className="text-sm text-steel">
        目前有：日誌 {logs.length} 筆、款項 {payments.length} 筆、用品 {supplies.length} 筆
      </p>

      {error && (
        <p role="alert" className="rounded-xl bg-amber/10 px-4 py-3 text-sm text-amber">
          {error}
        </p>
      )}

      <button type="button" onClick={exportJson} disabled={Boolean(error)} className={btn}>
        匯出完整備份（JSON）
      </button>
      <button type="button" onClick={exportCsv} disabled={Boolean(error)} className={btn}>
        匯出費用明細（CSV）
      </button>

      <p className="text-xs leading-relaxed text-steel">
        匯出的檔案包含個人資料，請存放在自己的私人空間，不要上傳到公開的地方。CSV 可用 Excel 或 Google 試算表開啟。
      </p>
    </div>
  )
}
