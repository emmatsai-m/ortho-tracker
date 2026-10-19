import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import SupplyListItem from '../components/supplies/SupplyListItem'
import ChipGroup from '../components/ui/ChipGroup'
import EmptyState from '../components/ui/EmptyState'
import { SUPPLY_STATUSES } from '../constants/options'
import { useSupplies } from '../hooks/useSupplies'
import { formatTWD } from '../utils/money'

export default function Supplies() {
  const { supplies, loading, error } = useSupplies()
  const [filter, setFilter] = useState('')

  const total = supplies.reduce((sum, s) => sum + s.totalPrice, 0)
  const count = (status: string) => supplies.filter((s) => s.status === status).length
  const shown = filter ? supplies.filter((s) => s.status === filter) : supplies

  return (
    <>
      <PageHeader title="用品" />
      <main className="space-y-5 px-4 py-5">
        {error && (
          <p role="alert" className="rounded-xl bg-amber/10 px-4 py-3 text-sm text-amber">
            {error}
          </p>
        )}

        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-line bg-card p-4">
          <div>
            <p className="text-xs text-steel">用品花費</p>
            <p className="text-lg font-bold">{formatTWD(total)}</p>
          </div>
          <div>
            <p className="text-xs text-steel">使用中</p>
            <p className="text-lg font-bold">{count('使用中')} 項</p>
          </div>
          <div>
            <p className="text-xs text-steel">未開封</p>
            <p className="text-lg font-bold">{count('未開封')} 項</p>
          </div>
        </div>

        <section aria-labelledby="supplies-title">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="supplies-title" className="text-base font-bold">
              採購紀錄
            </h2>
            <Link to="/supplies/new" className="rounded-full bg-tide px-4 py-2 text-sm font-bold text-white active:bg-tide-deep">
              ＋ 新增用品
            </Link>
          </div>

          {supplies.length > 0 && (
            <div className="mb-3">
              <ChipGroup label="狀態篩選" options={SUPPLY_STATUSES} value={filter} onChange={setFilter} />
            </div>
          )}

          {loading && <p className="text-sm text-steel">載入中…</p>}
          {!loading && supplies.length === 0 && !error && (
            <EmptyState title="還沒有用品紀錄" hint="按「新增用品」記錄牙間刷、沖牙機等採購與使用狀態。" />
          )}
          {!loading && supplies.length > 0 && shown.length === 0 && (
            <EmptyState title={`沒有「${filter}」的用品`} hint="再點一次上方已選的按鈕，可回到全部。" />
          )}
          {shown.length > 0 && (
            <ul className="space-y-3">
              {shown.map((s) => (
                <SupplyListItem key={s.id} supply={s} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}
