import { useState, type FormEvent } from 'react'
import { useAuth } from '../../auth/useAuth'
import { PAYMENT_METHODS, TREATMENT_TYPES } from '../../constants/options'
import { saveProfile } from '../../services/profileService'
import type { Profile } from '../../types/models'
import { parseDate } from '../../utils/date'
import ChipGroup from '../ui/ChipGroup'
import Field, { inputClass } from '../ui/Field'

type Status = { kind: 'idle' } | { kind: 'saving' } | { kind: 'saved' } | { kind: 'error'; message: string }

export default function ProfileForm({ initial }: { initial: Profile }) {
  const { user } = useAuth()
  const [form, setForm] = useState<Profile>(initial)
  const [priceText, setPriceText] = useState(initial.totalPrice === null ? '' : String(initial.totalPrice))
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setStatus({ kind: 'idle' })
  }

  const onPriceChange = (text: string) => {
    // 只保留數字，金額一律為整數
    const digits = text.replace(/\D/g, '').slice(0, 9)
    setPriceText(digits)
    set('totalPrice', digits === '' ? null : Number(digits))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    const start = parseDate(form.startDate)
    const end = parseDate(form.expectedEndDate)
    if (start && end && end < start) {
      setStatus({ kind: 'error', message: '預計結束日不能早於開始日。' })
      return
    }

    setStatus({ kind: 'saving' })
    try {
      await saveProfile(user.uid, {
        ...form,
        clinicName: form.clinicName.trim(),
        doctorName: form.doctorName.trim(),
      })
      setStatus({ kind: 'saved' })
    } catch (err) {
      const denied = typeof err === 'object' && err !== null && 'code' in err && err.code === 'permission-denied'
      setStatus({
        kind: 'error',
        message: denied ? '沒有寫入權限，請檢查 Firestore 規則中的 UID。' : '儲存失敗，請稍後再試。',
      })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-line bg-card p-4">
      <Field label="矯正類型">
        <ChipGroup label="矯正類型" options={TREATMENT_TYPES} value={form.treatmentType} onChange={(v) => set('treatmentType', v)} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="開始日" htmlFor="startDate">
          <input id="startDate" type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} className={inputClass} />
        </Field>
        <Field label="預計結束日" htmlFor="endDate">
          <input id="endDate" type="date" value={form.expectedEndDate} onChange={(e) => set('expectedEndDate', e.target.value)} className={inputClass} />
        </Field>
      </div>

      <Field label="診所名稱" htmlFor="clinic">
        <input id="clinic" type="text" value={form.clinicName} onChange={(e) => set('clinicName', e.target.value)} className={inputClass} />
      </Field>

      <Field label="醫師姓名" htmlFor="doctor">
        <input id="doctor" type="text" value={form.doctorName} onChange={(e) => set('doctorName', e.target.value)} className={inputClass} />
      </Field>

      <Field label="療程總價（新臺幣）" htmlFor="price" hint={form.totalPrice === null ? undefined : `NT$ ${form.totalPrice.toLocaleString('zh-TW')}`}>
        <input
          id="price"
          type="text"
          inputMode="numeric"
          value={priceText}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="例如 120000"
          className={inputClass}
        />
      </Field>

      <Field label="付款方式">
        <ChipGroup label="付款方式" options={PAYMENT_METHODS} value={form.paymentMethod} onChange={(v) => set('paymentMethod', v)} />
      </Field>

      <div>
        <button
          type="submit"
          disabled={status.kind === 'saving'}
          className="w-full rounded-xl bg-tide py-3 text-base font-bold text-white active:bg-tide-deep disabled:opacity-60"
        >
          {status.kind === 'saving' ? '儲存中…' : '儲存'}
        </button>
        <p role="status" className={`mt-2 min-h-5 text-center text-sm ${status.kind === 'error' ? 'text-amber' : 'text-tide-deep'}`}>
          {status.kind === 'saved' && '已儲存'}
          {status.kind === 'error' && status.message}
        </p>
      </div>
    </form>
  )
}
