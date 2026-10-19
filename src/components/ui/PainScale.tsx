import { PAIN_LABELS } from '../../constants/options'

type Props = {
  value: number | null
  onChange: (value: number | null) => void
}

/** 疼痛程度 0～5；再點一次已選的可取消 */
export default function PainScale({ value, onChange }: Props) {
  return (
    <div role="radiogroup" aria-label="疼痛程度" className="grid grid-cols-6 gap-1.5">
      {PAIN_LABELS.map((label, level) => {
        const selected = value === level
        return (
          <button
            key={level}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(selected ? null : level)}
            className={`flex flex-col items-center rounded-xl border py-2 ${
              selected ? 'border-tide bg-tide text-white' : 'border-line bg-card text-ink active:bg-tide-soft'
            }`}
          >
            <span className="text-lg font-bold">{level}</span>
            <span className="text-[11px] leading-tight">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
