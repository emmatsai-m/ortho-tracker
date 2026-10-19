import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { EXPENSE_METHODS, PAYMENT_KINDS, PAYMENT_STATUSES, QUICK_AMOUNTS } from '../../constants/options'
import { createPayment, deletePayment, updatePayment } from '../../services/paymentService'
import type { Payment, PaymentInput } from '../../types/models'
import { today, toDateString } from '../../utils/date'
import ConfirmDialog from '../ui/ConfirmDialog'
import ChipGroup from '../ui/ChipGroup'
import Field, { inputClass } from '../ui/Field'

type Props = {
  /** 有值代表編輯，沒有代表新增 */
  existing?: Payment
}

export default function PaymentForm({ existing }: Props) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState<PaymentInput>(
    existing
      ? { kind: existing.kind, amount: existing.amount, date: existing.date, status: existing.status, dueDate: existing.dueDate, method: existing.method, note: existing.note }
      : { kind: '療程款', amount: 0, date: toDateString(today()), status: '已付', dueDate: '', method: '', note: '' },
  )
  const [amountText, setAmountText] = useState(existing ? String(existing.amount) : '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const set = <K extends keyof PaymentInput>(key: K, value: PaymentInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  const setAmount = (n: number) => {
    setAmountText(n === 0 ? '' : String(n))
    set('amount', n)
  }

  const onAmountChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 9)
    setAmountText(digits)
    set('amount', digits === '' ? 0 : Number(digits))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return
    if (form.amount <= 0) return setError('請輸入大於 0 的金額。')
    if (!form.date) return setError('請選擇日期。')

    const input: PaymentInput = {
      ...form,
      dueDate: form.status === '待付' ? form.dueDate : '',
      note: form.note.trim(),
    }

    setSaving(true)
    try {
      if (existing) await updatePayment(user.uid, existing.id, input)
      else await createPayment(user.uid, input)
      navigate('/expenses', { replace: true })
    } catch {
      setError('儲存失敗，請檢查網路或 Firestore 規則後再試。')
      setSaving(false)
    }
  }

  const onDelete = async () => {
    if (!user || !existing) return
    setSaving(true)
    try {
      await deletePayment(user.uid, existing.id)
      navigate('/expenses', { replace: true })
    } catch {
      setConfirmDelete(false)
      setError('刪除失敗，請稍後再試。')
      setSaving(false)
    }
  }

  const pending = form.status === '待付'

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-line bg-card p-4">
        <Field label="種類">
          <ChipGroup label="種類" options={PAYMENT_KINDS} value={form.kind} onChange={(v) => v && set('kind', v)} />
        </Field>

        <Field label="金額（新臺幣）" htmlFor="amount" hint={form.amount > 0 ? `NT$ ${form.amount.toLocaleString('zh-TW')}` : undefined}>
          <input
            id="amount"
            type="text"
            inputMode="numeric"
            value={amountText}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="輸入金額"
            className={inputClass}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setAmount(n)}
                className="rounded-full border border-line bg-enamel px-3 py-1.5 text-sm active:bg-tide-soft"
              >
                {n.toLocaleString('zh-TW')}
              </button>
            ))}
          </div>
        </Field>

        <Field label="狀態">
          <ChipGroup label="狀態" options={PAYMENT_STATUSES} value={form.status} onChange={(v) => v && set('status', v)} />
        </Field>

        <Field label={pending ? '登記日期' : '付款日期'} htmlFor="date">
          <input id="date" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className={inputClass} />
        </Field>

        {pending && (
          <Field label="預計付款日（選填）" htmlFor="dueDate">
            <input id="dueDate" type="date" value={form.dueDate} onChange={(e) => set('dueDate', e.target.value)} className={inputClass} />
          </Field>
        )}

        <Field label="付款方式（選填）">
          <ChipGroup label="付款方式" options={EXPENSE_METHODS} value={form.method} onChange={(v) => set('method', v)} />
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
        title="刪除這筆款項？"
        message="刪除後無法復原，費用總覽會一併更新。"
        confirmLabel="刪除"
        busy={saving}
        onConfirm={onDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  )
}
