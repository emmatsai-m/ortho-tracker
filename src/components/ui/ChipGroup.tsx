type Props = {
  label: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
}

/** 單選按鈕群組；再點一次已選的項目可取消 */
export default function ChipGroup({ label, options, value, onChange }: Props) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = opt === value
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(selected ? '' : opt)}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              selected ? 'border-tide bg-tide text-white' : 'border-line bg-card text-ink active:bg-tide-soft'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
