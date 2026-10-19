import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CloseIcon, PlusIcon } from '../ui/Icons'

// 快速新增的入口。表單頁面會在後續階段完成，這裡先導向對應的分頁。
const actions = [
  { label: '記回診', to: `/logs/new?type=${encodeURIComponent('回診')}` },
  { label: '記感受', to: `/logs/new?type=${encodeURIComponent('身體感受')}` },
  { label: '記花費', to: '/expenses/new' },
  { label: '記用品', to: '/supplies/new' },
]

export default function QuickAddSheet() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const go = (to: string) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+5rem)] right-4 z-20 flex size-14 items-center justify-center rounded-full bg-tide text-white shadow-lg active:bg-tide-deep"
        aria-label="快速新增"
      >
        <PlusIcon width={28} height={28} />
      </button>

      {open && (
        <div className="fixed inset-0 z-30 flex items-end bg-ink/40" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="快速新增"
            className="mx-auto w-full max-w-xl rounded-t-3xl bg-card px-4 pb-[calc(env(safe-area-inset-bottom,0px)+1.25rem)] pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">要記錄什麼？</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center rounded-full text-steel active:bg-tide-soft"
                aria-label="關閉"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {actions.map((a) => (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => go(a.to)}
                  className="rounded-2xl bg-tide-soft px-4 py-5 text-base font-medium text-tide-deep active:bg-tide active:text-white"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
