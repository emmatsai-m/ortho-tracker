/** 從過去的紀錄整理出常用選項，依使用次數由多到少 */
export function frequentValues(values: string[]): string[] {
  const counts = new Map<string, number>()
  for (const v of values) {
    const t = v.trim()
    if (t) counts.set(t, (counts.get(t) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([v]) => v)
}
