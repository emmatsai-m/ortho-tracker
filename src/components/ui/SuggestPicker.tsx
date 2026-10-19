import ChipGroup from './ChipGroup'
import { inputClass } from './Field'

type Props = {
  id: string
  label: string
  value: string
  /** 過去用過的選項 */
  suggestions: string[]
  placeholder?: string
  onChange: (value: string) => void
}

/** 先點選用過的選項；沒有時再輸入新的 */
export default function SuggestPicker({ id, label, value, suggestions, placeholder, onChange }: Props) {
  return (
    <div className="space-y-2">
      {suggestions.length > 0 && <ChipGroup label={label} options={suggestions} value={value} onChange={onChange} />}
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={suggestions.length > 0 ? '或輸入新的' : placeholder}
        className={inputClass}
      />
    </div>
  )
}
