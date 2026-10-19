import { Link, useNavigate } from 'react-router-dom'
import { BackIcon, GearIcon } from '../ui/Icons'

type Props = {
  title: string
  /** 顯示返回鈕（用在子頁面） */
  back?: boolean
  /** 顯示右上角設定齒輪（用在首頁） */
  showSettings?: boolean
}

export default function PageHeader({ title, back, showSettings }: Props) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-line bg-enamel/95 px-4 pb-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] backdrop-blur">
      {back && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="-ml-2 flex size-10 items-center justify-center rounded-full text-steel active:bg-tide-soft"
          aria-label="返回"
        >
          <BackIcon />
        </button>
      )}
      <h1 className="flex-1 text-xl font-bold">{title}</h1>
      {showSettings && (
        <Link
          to="/settings"
          className="-mr-2 flex size-10 items-center justify-center rounded-full text-steel active:bg-tide-soft"
          aria-label="設定"
        >
          <GearIcon />
        </Link>
      )}
    </header>
  )
}
