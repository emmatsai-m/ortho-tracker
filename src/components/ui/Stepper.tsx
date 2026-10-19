type Props = {
  label: string
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
}

/** 數量加減鈕 */
export default function Stepper({ label, value, min = 1, max = 999, onChange }: Props) {
  const btn =
    'flex size-12 items-center justify-center rounded-full border border-line bg-card text-2xl active:bg-tide-soft disabled:opacity-40'
  return (
    <div className="flex items-center gap-4">
      <button type="button" className={btn} aria-label={`${label}減少`} disabled={value <= min} onClick={() => onChange(value - 1)}>
        −
      </button>
      <span className="min-w-10 text-center text-xl font-bold" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} aria-label={`${label}增加`} disabled={value >= max} onClick={() => onChange(value + 1)}>
        ＋
      </button>
    </div>
  )
}
