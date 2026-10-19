import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { BoxIcon, HomeIcon, LogIcon, WalletIcon } from '../ui/Icons'

type Tab = { to: string; label: string; icon: ReactNode; end?: boolean }

// 第一版先四個分頁；照片分頁等照片功能完成後再加入。
const tabs: Tab[] = [
  { to: '/', label: '首頁', icon: <HomeIcon />, end: true },
  { to: '/logs', label: '日誌', icon: <LogIcon /> },
  { to: '/expenses', label: '費用', icon: <WalletIcon /> },
  { to: '/supplies', label: '用品', icon: <BoxIcon /> },
]

export default function BottomTabBar() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="主要分頁"
    >
      <ul className="mx-auto flex max-w-xl">
        {tabs.map((tab) => (
          <li key={tab.to} className="flex-1">
            <NavLink
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 text-xs font-medium ${
                  isActive ? 'text-tide-deep' : 'text-steel'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-7 w-14 items-center justify-center rounded-full transition-colors ${
                      isActive ? 'bg-tide-soft' : ''
                    }`}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
