import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import LogListItem from '../components/logs/LogListItem'
import ChipGroup from '../components/ui/ChipGroup'
import EmptyState from '../components/ui/EmptyState'
import { LOG_TYPES } from '../constants/options'
import { useLogs } from '../hooks/useLogs'
import type { Log } from '../types/models'

/** 依月份分組（資料已由新到舊排序） */
function groupByMonth(logs: Log[]): { month: string; items: Log[] }[] {
  const groups: { month: string; items: Log[] }[] = []
  for (const log of logs) {
    const key = log.date.slice(0, 7)
    const last = groups[groups.length - 1]
    if (last && last.month === key) last.items.push(log)
    else groups.push({ month: key, items: [log] })
  }
  return groups
}

function monthLabel(key: string): string {
  const [y, m] = key.split('-')
  return y && m ? `${y}年${Number(m)}月` : '日期未填'
}

export default function Logs() {
  const { logs, loading, error } = useLogs()
  const [filter, setFilter] = useState('')

  const shown = filter ? logs.filter((l) => l.type === filter) : logs

  return (
    <>
      <PageHeader title="療程日誌" />
      <main className="space-y-4 px-4 py-5">
        {error && (
          <p role="alert" className="rounded-xl bg-amber/10 px-4 py-3 text-sm text-amber">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">所有紀錄</h2>
          <Link to="/logs/new" className="rounded-full bg-tide px-4 py-2 text-sm font-bold text-white active:bg-tide-deep">
            ＋ 新增日誌
          </Link>
        </div>

        {logs.length > 0 && <ChipGroup label="類型篩選" options={LOG_TYPES} value={filter} onChange={setFilter} />}

        {loading && <p className="text-sm text-steel">載入中…</p>}
        {!loading && logs.length === 0 && !error && (
          <EmptyState title="還沒有日誌" hint="按「新增日誌」記錄回診、身體感受與特殊事件。" />
        )}
        {!loading && logs.length > 0 && shown.length === 0 && (
          <EmptyState title={`沒有「${filter}」的紀錄`} hint="再點一次上方已選的按鈕，可回到全部。" />
        )}

        {groupByMonth(shown).map((g) => (
          <section key={g.month} aria-label={monthLabel(g.month)}>
            <h3 className="mb-2 text-sm font-medium text-steel">{monthLabel(g.month)}</h3>
            <ul className="space-y-2">
              {g.items.map((log) => (
                <LogListItem key={log.id} log={log} />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  )
}
