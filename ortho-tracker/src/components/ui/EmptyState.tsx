type Props = {
  title: string
  hint: string
}

export default function EmptyState({ title, hint }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-card px-5 py-8 text-center">
      <p className="text-base font-medium">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-steel">{hint}</p>
    </div>
  )
}
