type Props = {
  label: string
  options: readonly string[]
  value: string[]
  onChange: (value: string[]) => void
}

/** 多選按鈕群組 */
export default function MultiChipGroup({ label, options, value, onChange }: Props) {
  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(opt)}
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
