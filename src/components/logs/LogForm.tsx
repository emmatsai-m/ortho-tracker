import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { EVENT_TAGS, LOG_TYPES, SYMPTOMS, VISIT_ITEMS } from '../../constants/options'
import { createLog, deleteLog, updateLog } from '../../services/logService'
import type { Log, LogInput } from '../../types/models'
import { parseDate, today, toDateString } from '../../utils/date'
import ChipGroup from '../ui/ChipGroup'
import ConfirmDialog from '../ui/ConfirmDialog'
import Field, { inputClass } from '../ui/Field'
import MultiChipGroup from '../ui/MultiChipGroup'
import PainScale from '../ui/PainScale'

type Props = {
  /** 有值代表編輯 */
  existing?: Log
  /** 新增時預先選好的類型 */
  initialType?: string
}

export default function LogForm({ existing, initialType }: Props) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState<LogInput>(
    existing
      ? {
          type: existing.type,
          date: existing.date,
          items: existing.items,
          painLevel: existing.painLevel,
          symptoms: existing.symptoms,
          eventTags: existing.eventTags,
          nextVisitDate: existing.nextVisitDate,
          note: existing.note,
        }
      : {
          type: initialType ?? '回診',
          date: toDateString(today()),
          items: [],
          painLevel: null,
          symptoms: [],
          eventTags: [],
          nextVisitDate: '',
          note: '',
        },
  )
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const set = <K extends keyof LogInput>(key: K, value: LogInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return
    if (!form.date) return setError('請選擇日期。')
    if (form.type === '身體感受' && form.painLevel === null) return setError('請選擇疼痛程度（沒有不舒服請選 0）。')
    if (form.type === '特殊事件' && form.eventTags.length === 0) return setError('請至少選一個事件。')
    if (form.type === '回診' && form.nextVisitDate) {
      const next = parseDate(form.nextVisitDate)
      const visit = parseDate(form.date)
      if (next && visit && next < visit) return setError('下次回診日期不能早於這次回診日期。')
    }

    // 只保留這個類型會用到的欄位，避免切換類型後留下舊資料
    const isVisit = form.type === '回診'
    const isFeeling = form.type === '身體感受'
    const isEvent = form.type === '特殊事件'
    const input: LogInput = {
      type: form.type,
      date: form.date,
      items: isVisit ? form.items : [],
      nextVisitDate: isVisit ? form.nextVisitDate : '',
      painLevel: isFeeling ? form.painLevel : null,
      symptoms: isFeeling ? form.symptoms : [],
      eventTags: isEvent ? form.eventTags : [],
      note: form.note.trim(),
    }

    setSaving(true)
    try {
      if (existing) await updateLog(user.uid, existing.id, input)
      else await createLog(user.uid, input)
      navigate('/logs', { replace: true })
    } catch {
      setError('儲存失敗，請檢查網路或 Firestore 規則後再試。')
      setSaving(false)
    }
  }

  const onDelete = async () => {
    if (!user || !existing) return
    setSaving(true)
    try {
      await deleteLog(user.uid, existing.id)
      navigate('/logs', { replace: true })
    } catch {
      setConfirmDelete(false)
      setError('刪除失敗，請稍後再試。')
      setSaving(false)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-line bg-card p-4">
        <Field label="類型">
          <ChipGroup label="類型" options={LOG_TYPES} value={form.type} onChange={(v) => v && set('type', v)} />
        </Field>

        <Field label="日期" htmlFor="date">
          <input id="date" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className={inputClass} />
        </Field>

        {form.type === '回診' && (
          <>
            <Field label="這次做了什麼（可多選）">
              <MultiChipGroup label="施作項目" options={VISIT_ITEMS} value={form.items} onChange={(v) => set('items', v)} />
            </Field>
            <Field label="下次回診日期（選填）" htmlFor="nextVisit">
              <input id="nextVisit" type="date" value={form.nextVisitDate} onChange={(e) => set('nextVisitDate', e.target.value)} className={inputClass} />
            </Field>
          </>
        )}

        {form.type === '身體感受' && (
          <>
            <Field label="疼痛程度">
              <PainScale value={form.painLevel} onChange={(v) => set('painLevel', v)} />
            </Field>
            <Field label="症狀（可多選）">
              <MultiChipGroup label="症狀" options={SYMPTOMS} value={form.symptoms} onChange={(v) => set('symptoms', v)} />
            </Field>
          </>
        )}

        {form.type === '特殊事件' && (
          <Field label="發生什麼事（可多選）">
            <MultiChipGroup label="事件" options={EVENT_TAGS} value={form.eventTags} onChange={(v) => set('eventTags', v)} />
          </Field>
        )}

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
        title="刪除這筆日誌？"
        message="刪除後無法復原。"
        confirmLabel="刪除"
        busy={saving}
        onConfirm={onDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  )
}
