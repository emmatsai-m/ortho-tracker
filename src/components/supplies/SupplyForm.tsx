import { useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { REPURCHASE_OPTIONS, SUPPLY_CATEGORIES, SUPPLY_STATUSES } from '../../constants/options'
import { useSupplies } from '../../hooks/useSupplies'
import { createSupply, deleteSupply, updateSupply } from '../../services/supplyService'
import type { Supply, SupplyInput } from '../../types/models'
import { today, toDateString } from '../../utils/date'
import { formatTWD } from '../../utils/money'
import { frequentValues } from '../../utils/suggestions'
import ChipGroup from '../ui/ChipGroup'
import ConfirmDialog from '../ui/ConfirmDialog'
import Field, { inputClass } from '../ui/Field'
import Stepper from '../ui/Stepper'
import SuggestPicker from '../ui/SuggestPicker'

export default function SupplyForm({ existing }: { existing?: Supply }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { supplies } = useSupplies()

  const brandSuggestions = useMemo(() => frequentValues(supplies.map((s) => s.brand)), [supplies])
  const storeSuggestions = useMemo(() => frequentValues(supplies.map((s) => s.store)), [supplies])

  const [form, setForm] = useState<SupplyInput>(
    existing
      ? {
          name: existing.name,
          category: existing.category,
          brand: existing.brand,
          spec: existing.spec,
          quantity: existing.quantity,
          unitPrice: existing.unitPrice,
          totalPrice: existing.totalPrice,
          purchaseDate: existing.purchaseDate,
          store: existing.store,
          status: existing.status,
          repurchase: existing.repurchase,
          note: existing.note,
        }
      : {
          name: '',
          category: '',
          brand: '',
          spec: '',
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0,
          purchaseDate: toDateString(today()),
          store: '',
          status: '未開封',
          repurchase: '',
          note: '',
        },
  )
  const [priceText, setPriceText] = useState(existing ? String(existing.unitPrice) : '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const set = <K extends keyof SupplyInput>(key: K, value: SupplyInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  const total = form.quantity * form.unitPrice

  const onPriceChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 9)
    setPriceText(digits)
    set('unitPrice', digits === '' ? 0 : Number(digits))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return
    if (!form.category) return setError('請選擇分類。')
    if (!form.purchaseDate) return setError('請選擇購買日期。')

    const input: SupplyInput = {
      ...form,
      name: form.name.trim() || form.category,
      brand: form.brand.trim(),
      spec: form.spec.trim(),
      store: form.store.trim(),
      note: form.note.trim(),
      totalPrice: total,
    }

    setSaving(true)
    try {
      if (existing) await updateSupply(user.uid, existing.id, input)
      else await createSupply(user.uid, input)
      navigate('/supplies', { replace: true })
    } catch {
      setError('儲存失敗，請檢查網路或 Firestore 規則後再試。')
      setSaving(false)
    }
  }

  const onDelete = async () => {
    if (!user || !existing) return
    setSaving(true)
    try {
      await deleteSupply(user.uid, existing.id)
      navigate('/supplies', { replace: true })
    } catch {
      setConfirmDelete(false)
      setError('刪除失敗，請稍後再試。')
      setSaving(false)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-line bg-card p-4">
        <Field label="分類">
          <ChipGroup label="分類" options={SUPPLY_CATEGORIES} value={form.category} onChange={(v) => set('category', v)} />
        </Field>

        <Field label="品牌（選填）" htmlFor="brand">
          <SuggestPicker id="brand" label="品牌" value={form.brand} suggestions={brandSuggestions} onChange={(v) => set('brand', v)} />
        </Field>

        <Field label="規格（選填）" htmlFor="spec" hint="例如 0.7mm、30 支">
          <input id="spec" type="text" value={form.spec} onChange={(e) => set('spec', e.target.value)} className={inputClass} />
        </Field>

        <Field label="名稱（選填）" htmlFor="name" hint="不填的話，會使用分類名稱">
          <input id="name" type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} />
        </Field>

        <Field label="數量">
          <Stepper label="數量" value={form.quantity} onChange={(v) => set('quantity', v)} />
        </Field>

        <Field label="單價（新臺幣）" htmlFor="unitPrice">
          <input
            id="unitPrice"
            type="text"
            inputMode="numeric"
            value={priceText}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="輸入單價"
            className={inputClass}
          />
          <p className="mt-1 text-sm">
            總價 <span className="font-bold">{formatTWD(total)}</span>
          </p>
        </Field>

        <Field label="購買日期" htmlFor="purchaseDate">
          <input id="purchaseDate" type="date" value={form.purchaseDate} onChange={(e) => set('purchaseDate', e.target.value)} className={inputClass} />
        </Field>

        <Field label="購買地點（選填）" htmlFor="store">
          <SuggestPicker id="store" label="購買地點" value={form.store} suggestions={storeSuggestions} onChange={(v) => set('store', v)} />
        </Field>

        <Field label="使用狀態">
          <ChipGroup label="使用狀態" options={SUPPLY_STATUSES} value={form.status} onChange={(v) => v && set('status', v)} />
        </Field>

        <Field label="要不要回購（選填）">
          <ChipGroup label="回購" options={REPURCHASE_OPTIONS} value={form.repurchase} onChange={(v) => set('repurchase', v)} />
        </Field>

        <Field label="備註（選填）" htmlFor="note">
          <input id="note" type="text" value={form.note} onChange={(e) => set('note', e.target.value)} className={inputClass} />
        </Field>

        {error && (
          <p role="alert" className="rounded-xl bg-amber/10 px-4 py-3 text-sm text-amber">
            {error}
          </p>
        )}

        <div className="space-y-3">
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-tide py-3 text-base font-bold text-white active:bg-tide-deep disabled:opacity-60"
          >
            {saving ? '儲存中…' : existing ? '儲存變更' : '新增'}
          </button>
          {existing && (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              disabled={saving}
              className="w-full rounded-xl border border-line py-3 text-base font-medium text-amber active:bg-amber/10"
            >
              刪除這筆
            </button>
          )}
        </div>
      </form>

      <ConfirmDialog
        open={confirmDelete}
        title="刪除這筆用品？"
        message="刪除後無法復原，用品花費會一併更新。"
        confirmLabel="刪除"
        busy={saving}
        onConfirm={onDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  )
}
