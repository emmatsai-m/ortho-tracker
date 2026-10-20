import type { Log, Payment, Profile, Supply } from '../types/models'

/** 完整備份（JSON）。包含個人資料，請存放在自己的私人空間。 */
export function buildBackupJson(data: {
  profile: Profile | null
  logs: Log[]
  payments: Payment[]
  supplies: Supply[]
}): string {
  return JSON.stringify(
    {
      app: 'ortho-tracker',
      version: 1,
      exportedAt: new Date().toISOString(),
      profile: data.profile,
      logs: data.logs,
      payments: data.payments,
      supplies: data.supplies,
    },
    null,
    2,
  )
}

/** CSV 儲存格：加上引號跳脫，並避免文字被試算表當成公式執行 */
function cell(value: string | number): string {
  let s = String(value)
  if (typeof value === 'string' && /^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** 費用明細（CSV）：款項與用品合併，依日期由舊到新。開頭加 BOM，Excel 才不會亂碼。 */
export function buildExpensesCsv(payments: Payment[], supplies: Supply[]): string {
  const header = ['日期', '類別', '項目', '金額（新臺幣）', '狀態', '付款方式／購買地點', '備註']

  const rows: (string | number)[][] = [
    ...payments.map((p) => [p.date, p.kind, '', p.amount, p.status, p.method, p.note]),
    ...supplies.map((s) => [
      s.purchaseDate,
      '用品',
      [s.name, s.brand, s.spec].filter(Boolean).join(' '),
      s.totalPrice,
      '已購買',
      s.store,
      s.note,
    ]),
  ]

  rows.sort((a, b) => {
    const da = String(a[0])
    const db = String(b[0])
    if (da === db) return 0
    if (!da) return 1
    if (!db) return -1
    return da.localeCompare(db)
  })

  const lines = [header, ...rows].map((r) => r.map(cell).join(','))
  return `\uFEFF${lines.join('\r\n')}\r\n`
}
