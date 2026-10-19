// 純日期一律用 YYYY-MM-DD 字串儲存，避免時區問題。

export function parseDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (!m) return null
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
}

/** 今天（本地時間 00:00） */
export function today(): Date {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

/** b 比 a 晚幾天（b 較早則為負數） */
export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000)
}

export function formatDate(s: string): string {
  const d = parseDate(s)
  if (!d) return ''
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}
