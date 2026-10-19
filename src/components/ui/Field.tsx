import type { ReactNode } from 'react'

type Props = {
  label: string
  /** 對應輸入欄位的 id；選項按鈕群組不需要 */
  htmlFor?: string
  hint?: string
  children: ReactNode
}

export default function Field({ label, htmlFor, hint, children }: Props) {
  return (
    <div>
      {htmlFor ? (
        <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
          {label}
        </label>
      ) : (
        <p className="mb-2 text-sm font-medium">{label}</p>
      )}
      {children}
      {hint && <p className="mt-1 text-xs text-steel">{hint}</p>}
    </div>
  )
}

export const inputClass =
  'w-full rounded-xl border border-line bg-card px-4 py-3 text-base text-ink placeholder:text-steel/60'
